# Generated by Django 4.2.5 on 2024-05-26 09:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0011_appointment_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="hospital",
            name="latitude",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="hospital",
            name="longitude",
            field=models.FloatField(blank=True, null=True),
        ),
    ]
