# Generated by Django 4.2.5 on 2024-05-25 16:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0008_remove_appointment_service"),
    ]

    operations = [
        migrations.AddField(
            model_name="appointment",
            name="service",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="appointments",
                to="base.service",
            ),
            preserve_default=False,
        ),
    ]
