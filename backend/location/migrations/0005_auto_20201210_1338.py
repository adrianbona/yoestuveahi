# Generated by Django 3.1.4 on 2020-12-10 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0004_location_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='external_id',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='location',
            name='site_source',
            field=models.IntegerField(default=1),
        ),
    ]