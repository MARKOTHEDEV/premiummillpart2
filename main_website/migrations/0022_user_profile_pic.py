# Generated by Django 3.1.7 on 2022-01-04 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_website', '0021_auto_20220104_1138'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(null=True, upload_to='profile_pic/%d/'),
        ),
    ]
