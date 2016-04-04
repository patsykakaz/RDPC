#-*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from . import views


urlpatterns = patterns('',
    url(r'login/$', views.connect, name='connect'),
    url(r'logout/$', views.killUser, name='killUser'),
    url(r'abonnement/$', views.ask_abo, name='ask_abo'),
    url(r'display/$', views.showUser, name='showUser'),
    url(r'modification/$', views.changeUser, name='changeUser'),
    url(r'newPassword/$', views.newPassword, name='newPassword'),
    url(r'forgottenPassword/$', views.forgottenPassword, name='forgottenPassword'),
)
