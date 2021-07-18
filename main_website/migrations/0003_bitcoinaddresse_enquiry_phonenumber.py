# Generated by Django 3.1.7 on 2021-07-17 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_website', '0002_auto_20210717_1104'),
    ]

    operations = [
        migrations.CreateModel(
            name='BitcoinAddresse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_wallet', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Enquiry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('enquiry_field', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='PhoneNumber',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.IntegerField()),
            ],
        ),
    ]
