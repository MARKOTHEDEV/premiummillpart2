from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,UserManager


class customUserManager(UserManager):
    
    def create_user(self,first_name,email,password=None):
        "this is to create a user Object in the Database"
        user = self.model(email=email,first_name=first_name)
        user.set_password(password)
     
        user.save()

        return user

    def create_superuser(self,first_name,email,password):
        "this is to create a Super user Object in the Database"
        superUser = self.create_user(first_name,email,password)
        superUser.is_superuser= True
        superUser.is_staff = True
        superUser.save()
        return superUser
    
class User(AbstractBaseUser,PermissionsMixin):
    
    class UserGender(models.TextChoices):
        MALE = 'MALE'
        FEMALE = 'FEMALE'

    email = models.EmailField(unique=True)
    gender = models.CharField(choices=UserGender.choices,max_length=30)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['first_name']

    objects = customUserManager()


    def __str__(self):
        return self.first_name