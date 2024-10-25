from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid as uuid_lib

# Create your models here.


class Autore(models.Model):
    uuid = models.UUIDField(default=uuid_lib.uuid4,
                            editable=False, unique=True)
    nome = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.nome}'


class Goal(models.Model):
    uuid = models.UUIDField(default=uuid_lib.uuid4,
                            editable=False, unique=True)

    name = models.CharField(max_length=50)
    goal_type = models.CharField(max_length=50)
    intensity = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)])
    category = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    autore = models.ForeignKey(
        Autore, on_delete=models.CASCADE, to_field="uuid")

    def __str__(self):
        return f'{self.name}'
