# Generated by Django 3.2.2 on 2022-07-26 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_de_publicaciones', '0004_auto_20220726_1213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publicacion',
            name='fecha',
            field=models.CharField(max_length=50),
        ),
    ]
