# Generated by Django 3.1.2 on 2020-11-05 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20201105_0021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(blank=True, choices=[('Healthy', 'Healthy'), ('Contagion Risk', 'Contagion Risk'), ('COVID Positive', 'COVID Positive')], max_length=200),
        ),
    ]