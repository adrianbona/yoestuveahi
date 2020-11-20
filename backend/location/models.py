from django.db import models
from core.models import User

class Location(models.Model):
    name = models.CharField(max_length=50, blank=False)
    description = models.TextField()
    opening_time = models.CharField(max_length=20)
    closing_time = models.CharField(max_length=20)
    logo = models.CharField(max_length=2000)
    maximum_capacity = models.IntegerField()
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def capacity(self):
        consumido = self.checkins.filter(exit_time__isnull=True).count()
        return self.maximum_capacity - consumido
