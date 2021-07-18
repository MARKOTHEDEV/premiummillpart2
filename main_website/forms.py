from django import forms
from django.contrib.auth import get_user_model




class UserImage(forms.forms):
    driver_license = forms.ImageField()
