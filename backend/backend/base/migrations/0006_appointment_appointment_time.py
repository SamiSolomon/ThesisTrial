# Generated by Django 4.2.5 on 2024-05-25 05:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0005_appointment"),
    ]

    operations = [
        migrations.AddField(
            model_name="appointment",
            name="appointment_time",
            field=models.TimeField(default=datetime.time(12, 0)),
        ),
    ]
