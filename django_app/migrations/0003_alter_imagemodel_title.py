# Generated by Django 4.1.7 on 2023-03-15 15:48

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0002_alter_imagemodel_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagemodel',
            name='title',
            field=models.CharField(blank=True, db_index=True, default='', help_text='<small class="text-muted">Заголовок [5, 300]</small><hr><br>', max_length=300, validators=[django.core.validators.MinLengthValidator(5), django.core.validators.MaxLengthValidator(300)], verbose_name='Заголовок'),
        ),
    ]
