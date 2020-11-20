from django.db import models
from core.models import User
from location.models import Location

class Registry(models.Model):
    entrance_time = models.DateTimeField(auto_now_add=True)
    exit_time = models.DateTimeField(blank=True, null=True)
    registered_by = models.ForeignKey(User, on_delete=models.CASCADE)
    included_in = models.ForeignKey(Location, related_name='checkins', on_delete=models.CASCADE)