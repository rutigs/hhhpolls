from django.conf.urls import patterns, include, url
from django.contrib import admin
from polls import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hhhpolls.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/', views.reddit_login),
    url(r'^loggedin/', views.loggedin),
    url(r'^logout/', views.reddit_logout),
    url(r'^loginfailed/', views.loginfailed),
    url(r'^notsubbed/', views.notsubbed),
    url(r'^$', views.index),
    url(r'^(?P<poll_slug>[\w\-]+)/$', views.poll),
    url(r'^(?P<poll_slug>[\w\-]+)/results/', views.poll_results),
)
