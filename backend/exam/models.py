# Create your models here.
from django.db import models
from core.models import User

class Test(models.Model):
    date_taken = models.DateTimeField(auto_now_add=True)
    is_positive = models.BooleanField(default=False)
    taken_by = models.ForeignKey(User, on_delete=models.CASCADE)
    processed = models.BooleanField(default=False)