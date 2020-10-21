from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    dni = models.CharField(max_length=12, blank=False)