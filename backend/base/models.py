from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import User
from datetime import time

class Hospital(models.Model):
    name = models.CharField(_('name'), max_length=100)
    email = models.EmailField(_('email'), null=True, blank=True)
    latitude = models.FloatField(_('latitude'), null=True, blank=True)  # Allowing null values
    longitude = models.FloatField(_('longitude'), null=True, blank=True)  
    contact = models.CharField(_('contact'), max_length=20)
    location = models.CharField(_('location'), max_length=500)
    information = models.TextField(_('information'))
    image = models.ImageField(_('image'), null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_services(self):
        return self.services.all()

class Service(models.Model):
    name = models.CharField(_('name'), max_length=100)
    hospital = models.ForeignKey(Hospital, related_name='services', on_delete=models.CASCADE)
    description = models.TextField(_('description'))

    def __str__(self):
        return f"{self.name}"

class Appointment(models.Model):
    hospital = models.ForeignKey(Hospital, related_name='appointments', on_delete=models.CASCADE)
    service = models.ForeignKey(Service, related_name="appointments", on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(_('first name'), max_length=100)
    last_name = models.CharField(_('last name'), max_length=100)
    email = models.EmailField(_('email'), null=True, blank=True)  # Correctly defined EmailField
    appointment_date = models.DateField(_('appointment date'))
    appointment_time = models.TimeField(_('appointment time'), default=time(12, 0))

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.appointment_date} {self.appointment_time}"
    
class Feedback(models.Model):
    name = models.CharField(_('name'), max_length=100)
    familyname = models.CharField(_('family name'), max_length=100)
    email = models.EmailField(_('email'))
    phone = models.CharField(_('phone'), max_length=20, blank=True, null=True)
    hospital = models.CharField(_('hospital'), max_length=100)
    message = models.TextField(_('message'))

    def __str__(self):
        return f'{self.name} {self.familyname}'
