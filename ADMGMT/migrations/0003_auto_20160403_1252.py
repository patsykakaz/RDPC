# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-03 12:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ADMGMT', '0002_auto_20160223_1033'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publicite',
            name='media',
            field=models.ImageField(null=True, upload_to='/home/patsykakaz/RDPC/MAIN/static/media/publicite'),
        ),
    ]
