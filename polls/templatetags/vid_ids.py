from django import template
from urlparse import urlparse
register = template.Library()

@register.filter
def video_id(value):
    query = urlparse(value)
    if query.hostname == 'youtu.be':
        return query.path[1:]
    if query.hostname in ('www.youtube.com', 'youtube.com'):
        if query.path == '/watch':
            p = parse_qs(query.query)
            return p['v'][0]
    if query.path[:7] == '/embed/':
        return query.path.split('/')[2]
    if query.path[:3] == '/v/':
        return query.path.split('/')[2]
    # fail?
    return None

def poll_video_ids(choices):
    video_ids = []
    for choice in choices:
        video_ids.append(video_id(choice.url))
    return video_ids