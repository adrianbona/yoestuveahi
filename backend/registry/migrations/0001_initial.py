# Generated by Django 3.1.2 on 2020-10-21 14:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('location', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Registry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entrance_time', models.DateTimeField()),
                ('exit_time', models.DateTimeField(blank=True)),
                ('included_in', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='location.location')),
                ('registered_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
