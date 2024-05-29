from django.utils.translation import gettext_lazy as _
from django.contrib import admin
from .models import Hospital, Service, Appointment, Feedback

admin.site.register(Hospital)
admin.site.register(Service)
admin.site.register(Appointment)
admin.site.register(Feedback)
