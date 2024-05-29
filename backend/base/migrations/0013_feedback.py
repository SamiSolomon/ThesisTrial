# Generated by Django 4.2.5 on 2024-05-26 17:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0012_hospital_latitude_hospital_longitude"),
    ]

    operations = [
        migrations.CreateModel(
            name="Feedback",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("familyname", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=20, null=True)),
                ("hospital", models.CharField(max_length=100)),
                ("message", models.TextField()),
            ],
        ),
    ]
