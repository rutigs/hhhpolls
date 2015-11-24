<a href="http://www.hhhpolls.com">HipHopHeads Polls</a>
==========================================

HipHopHeads Polls is an application for the community over at <a href="https://www.reddit.com/r/HipHopHeads">/r/HipHopHeads</a> on Reddit.

Goals for the project:

1. Provide a service where only the community (those who are subbed to the subreddit) can vote by using the Reddit API.
2. Mobile-friendly and look good
3. Learn Django/Python and other web development technologies

The project was done in Python with Django and hosted on Heroku.


Goal 1. Community Exclusivity
==========================================
This was primarily achieved using <a href="https://github.com/praw-dev/praw">PRAW</a> (Python Reddit API Wrapper).
From the website, the user is redirected to reddit where they authorize the application to their subreddit information to determine whether or not they are subbed to the community. If so they are then ready to vote!

Goal 2. Mobile Friendly and Dashing looks 
==========================================
To achieve this I did several things.
- <a href="http://getbootstrap.com/">Bootstrap</a> was used to give the application responsiveness and style
- Used CDN's to minimize requests to the server and maximize the chance of the user having the items cached already (ie. JQuery, Bootstrap CSS/JS)
- Optimized images using <a href="https://imageoptim.com/">ImageOptim</a>, which uses things like JPEGTran for progressive and efficient JPEGs
- Iframes are expensive to load when you have an entire poll of them. The workaround to this involves only using thumbnails until the user clicks on the video itself and then the video is then loaded using JS. 

inside main.js
<code>

    (function() {
        var v = document.getElementsByClassName("youtube-player");
        for (var n = 0; n < v.length; n++) {
            var p = document.createElement("div");
            p.innerHTML = ytThumb(v[n].dataset.id);
            p.onclick = ytIframe;
            v[n].appendChild(p);
        }
    })();
    
    function ytThumb(id) {
        return '\<img class="youtube-thumb" src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
    }
    
    function ytIframe() {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("id", "youtube-iframe");
        this.parentNode.replaceChild(iframe, this);
    }

</code>

Goal 3. Learn Django/Python/Web Development
==========================================
This application was a lot of firsts for me and a lot of learning including:
- How models -> views -> templates interact with one another
- Django templating engine
- Using Oauth API's
- Templatetags (functions used by the template engine)
- many more oh my god I can't believe I finished this thing


