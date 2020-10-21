from django.db import models
from core.models import User
from location.models import Location

class Registry(models.Model):
    entrance_time = models.DateTimeField()
    exit_time = models.DateTimeField(blank=True)
    registered_by = models.ForeignKey(User, on_delete=models.CASCADE)
    included_in = models.ForeignKey(Location, on_delete=models.CASCADE)