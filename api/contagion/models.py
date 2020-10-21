# Create your models here.
from django.db import models
from core.models import User

class Contagion(models.Model):
    reported_on = models.DateTimeField(auto_now_add=True)
    discharged_on = models.DateTimeField(blank=True)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE)

class ContagionRisk(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    shown = models.CharField(max_length=100)
    content = models.CharField(max_length=100)
    informed_by = models.ForeignKey(User, on_delete=models.CASCADE)