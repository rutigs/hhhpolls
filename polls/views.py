from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from polls.models import Choice, Poll, Voter
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import praw
import config
from youtube import poll_video_ids, video_id


def index(request):
    context_dict = {}
    polls = Poll.objects.order_by('-creation_date')
    context_dict['open_polls'] = [poll for poll in polls if poll.open]
    context_dict['closed_polls'] = [poll for poll in polls if poll.open == False]

    return render(request, 'index.html', context_dict)


@login_required
def poll(request, poll_slug):
    context_dict = {}

    try:
        current_poll = Poll.objects.get(slug=poll_slug)
        choice_ids = poll_video_ids(current_poll.choice_set.all().order_by('-name'))
        context_dict['poll'] = current_poll
        context_dict['choice_ids'] = choice_ids
    except Poll.DoesNotExist:
        return render(request, 'index.html', {
            'error_message': "Something went wrong. Try again later.",
        })

    try:
        if Voter.objects.filter(user=request.user, poll=current_poll).exists():
            context_dict['error_message'] = "You have already voted"
            context_dict['poll_slug'] = poll_slug
            return render(request, 'voted.html', context_dict)
    except Voter.DoesNotExist:
        return HttpResponseRedirect('/')

    if request.method == 'POST':
        try:
            selected_choice = current_poll.choice_set.get(name=request.POST['choice'])
        except (KeyError, Choice.DoesNotExist):
            return render(request, 'poll.html', {
                'poll': current_poll,
                'error_message': "You didn't select a choice.",
            })
        else:
            selected_choice.votes += 1
            selected_choice.save()
            v = Voter(user=request.user, poll=current_poll)
            v.save()
            return HttpResponseRedirect('results')

    return render(request, 'poll.html', context_dict)


def poll_results(request, poll_slug):
    context_dict = {}
    current_poll = Poll.objects.get(slug=poll_slug)
    context_dict['poll'] = current_poll
    choices_in_order = current_poll.choice_set.order_by('-name')
    context_dict['choices'] = choices_in_order
    context_dict['number1'] = choices_in_order[0]
    return render(request, 'results.html', context_dict)


def reddit_login(request):
    context_dict = {}
    user_agent = "HipHopHead Polls by /u/rutigs"
    r = praw.Reddit(user_agent=user_agent)
    r.set_oauth_app_info(client_id=config.REDDIT_ID_KEY,
                         client_secret=config.REDDIT_SECRET_KEY,
                         redirect_uri='http://127.0.0.1:8000/loggedin/')

    if request.method == 'POST':
        url = r.get_authorize_url(config.STATEKEY, 'identity mysubreddits', True)
        return HttpResponseRedirect(url)

    return render(request, 'login.html', context_dict)


def loggedin(request):
    context_dict = {}
    code = request.GET.get('code')
    state = request.GET.get('state')
    if state != config.STATEKEY:
        HttpResponseRedirect('/loginfailed/')

    user_agent = 'HipHopHead Polls by /u/rutigs'
    r = praw.Reddit(user_agent=user_agent)
    r.set_oauth_app_info(client_id=config.REDDIT_ID_KEY,
                         client_secret=config.REDDIT_SECRET_KEY,
                         redirect_uri='http://127.0.0.1:8000/loggedin/')
    access_information = r.get_access_information(code)
    r.set_access_credentials(**access_information)

    reddit_user = r.get_me()
    subreddits = r.get_my_subreddits(limit=None)
    subbed = False
    for item in subreddits:
        if item.display_name == 'hiphopheads':
            subbed = True

    if not subbed:
        return HttpResponseRedirect('/notsubbed/')

    if User.objects.filter(username=reddit_user.name).exists():
        user = authenticate(username=reddit_user.name, password=config.PASSKEY)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return HttpResponseRedirect('/loginfailed/')
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            return HttpResponseRedirect('/loginfailed/')
    else:
        user = User.objects.create_user(reddit_user.name)
        user.set_password(config.PASSKEY)
        user.save()
        user = authenticate(username=reddit_user.name, password=config.PASSKEY)
        login(request, user)
        return HttpResponseRedirect('/')

    context_dict['user_name'] = reddit_user.name
    return render(request, 'loggedin.html', context_dict)


def reddit_logout(request):
    logout(request)
    return HttpResponseRedirect('/')


def loginfailed(request):
    context_dict = {'error_message': 'Invalid login request'}
    return render(request, 'loginfailed.html', context_dict)


def notsubbed(request):
    context_dict = {'error_message': 'You must subbed to /r/HipHopHeads to use this app'}
    return render(request, 'loginfailed.html', context_dict)