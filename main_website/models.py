from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,UserManager
from django.db.models.base import Model
from django.conf import settings
# from django.contrib.auth import get_user_model


class customUserManager(UserManager):
    
    def create_user(self,first_name,email,password=None):
        "this is to create a user Object in the Database"
        if password == None:
            raise ValueError("The Password Field Should Not Be None")
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
    Country_of_residence = models.CharField(max_length=100,null=True)
    driver_license = models.ImageField(upload_to='driver_license/%d/',null=True)
    driver_license_back = models.ImageField(upload_to='driver_license_back/%d/',null=True)
    telephone = models.CharField(max_length=200,null=True)
    countryPhoneCode = models.CharField(max_length=200,null=True)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
#   extra colomn
    amount_made = models.CharField(max_length=200,blank=True,null=True,default=0.00)
    amount_deposited = models.CharField(max_length=200,blank=True,null=True,default=0.00)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['first_name']

    objects = customUserManager()


    def __str__(self):
        return self.first_name

class User_Editable_Balance(models.Model):
    user = models.OneToOneField(User,on_delete=models.SET_NULL,null=True)
    # bonus_profit = models.IntegerField(default=0.00)
    previous_balance  = models.IntegerField(default=0.00)
    closed_tradePL = models.IntegerField(default=0.00)
    deposite_withdrawal = models.IntegerField(default=0.00)
    balance = models.IntegerField(default=0.00)
    total_credit_faculty = models.IntegerField(default=0.00)
    equity = models.IntegerField(default=0.00)
    margin_Requirement = models.IntegerField(default=0.00)
    available_margin  = models.IntegerField(default=0.00)
    # ac_summary  = models.IntegerField(default=0.00)
    # estimated_24gr_revenue  = models.IntegerField(default=0.00)

    def __str__(self):
        return f"{self.user}'s Editable Balance"

    class Meta:
        verbose_name = 'User Editable Balance'
        



class Enquiry(models.Model):
    email = models.EmailField()
    enquiry_field = models.TextField()
    
    def __str__(self):
        return f'{self.email} Made Enquiry'


class PhoneNumber(models.Model):
    phone_number = models.CharField(max_length=30)
    
    def __str__(self):
        return f'{self.id}) Submited Phone Number'


class BitcoinAddresse(models.Model):
    company_wallet = models.CharField(max_length=200)
    

class Purchase(models.Model):
    plan = models.CharField(max_length=100)
    btc_amount_purchased = models.CharField(max_length=100)
    price = models.IntegerField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} purchased {self.btc_amount_purchased}'


class UserPayment(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    amount = models.IntegerField(blank=True,null=True,default=0.00)
    pricing_plan = models.TextField()
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user} paid For {self.pricing_plan}'



class  UserRequestWithdrawal(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    amount_requested = models.CharField(max_length=1000000000000,blank=True,default='0.00')

    def __str__(self):
        return f'{self.user} Requested For ${self.amount_requested}'
 