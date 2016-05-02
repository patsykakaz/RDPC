from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from mezzanine.pages.page_processors import processor_for
from mezzanine.blog.models import BlogPost, BlogCategory
from .models import *

from mezzanine.core.request import current_request

@processor_for(PageUnivers)
def processor_revue(request, page):
    PageUniv = PageUnivers.objects.filter(title=page.title)
    PageUniv = PageUniv[0]
    try:
        couv = PageUniv.illustration.url.split('/')
        PageUniv.illustration = couv[-1]
    except:
        PageUniv.illustration = False
    return locals()

@processor_for('reportages')
def processor_revue(request, page):
    reportages = Reportage._base_manager.all()
    for element in reportages:
        element.illustration = Reportage_pic._base_manager.filter(Reportage=element).last()
    return locals()
