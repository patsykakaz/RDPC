# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20150527_1555'),
        ('MAIN', '0004_remove_reportage_illustration'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='archive',
            name='page_ptr',
        ),
        migrations.DeleteModel(
            name='Archive',
        ),
    ]
