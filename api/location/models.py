from django.db import models
from core.models import User

class Location(models.Model):
    name = models.CharField(max_length=50, blank=False)
    description = models.TextField()
    opening_time = models.CharField(max_length=20)
    closing_time = models.CharField(max_length=20)
    logo = models.CharField(max_length=250)
    maximum_capacity = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
