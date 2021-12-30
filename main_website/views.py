from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth import authenticate,login
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from . import models
from django_email_verification import send_email
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json,requests,os

apiKey = os.environ['coin_rank_apiKey']
baseUrl = 'https://api.coinranking.com/v2/coins'
proxyUrl = "https://cors-anywhere.herokuapp.com/"










@api_view(['GET'])
def get_list_of_coins(request):
    "we make a request to coin ranking"
    resp  = requests.get(baseUrl,headers={
     'Content-Type':'application/json',
        'x-access-token': apiKey
    })
    "we get the response and store it in a data varaible"
    def returns_formated_coin_data(data):
        "this fuction works direclty to the map function it returns a more arranged data for coin ranking"
        # if u see this format '{:.2f}'.format(float(data['price'])) what am basically doing i rounding the decimal values to two decimal numbers
        return {'iconUrl':data['iconUrl'],'name':data['symbol'],'price':'{:.2f}'.format(float(data['price'])),'percentage_of_change':'{:.2f}'.format(float(data['change']))}

    "this  varable below contains the list of arranged coins data with the help of the map function"
    list_of_coins_info = list(map(returns_formated_coin_data,resp.json().get('data')['coins']))
 
    return Response(list_of_coins_info)



"this are the function that renders the page"
def indexPage(request):

    return render(request,'index.html')


def about(request):

    return render(request,'about.html')


def contact(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            "if the person is not authenticated we will get his email"
            email = request.POST.get('email')
        else:
            'we just get the logged in user email'
            email = request.user.email
        
        print(request.POST.get('enquiry_form'))
        if request.POST.get('enquiry_form') != None:
            "we will check if the form we submitti "
            # once we have gotten the email we get the enqueries the oerson submited
            enquires = request.POST['enquires']
            # NOW WE register the data in the data base
            enquiry_db =models.Enquiry.objects.create(email=email,enquiry_field=enquires)

            enquiry_db.save()
        else:
            "this will mean the data sent is from Phone No Form"
            # phone_number
            phone_number = models.PhoneNumber.objects.create(phone_number=request.POST['phone_number'])
            phone_number.save()
        
        # after all the Saving of the contanct form data We will send The User Message
        messages.success(request,'Hey We Have Received Your Informations and We Will Get Back To You!!')


    

    return render(request,'contact.html')


def signIn(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email,password=password)

        if user is not None:
            login(request,user)
            return redirect('dashboard')
        else:
            messages.error(request,'Hey The Credentials Are Incorrect Try Again')



    return render(request,'signUp.html')


#  'countrySelectValue',request.POST['countrySelectValue'],

            
def signUp(request):
    "this view Registe the User To The dataBase"
    try:
        if request.method == 'POST':
            countrySelectValue = request.POST['countrySelectValue']
            FirstName = request.POST['FirstName']
            LastName = request.POST['LastName']
            Email = request.POST['Email']
            driver_LicenseImage = request.FILES['driver_License']
            driver_License_backImage = request.FILES['driver_License_back']
            password1 = request.POST['password1']
            password2 = request.POST['password2']
            UserPhoneNumber = request.POST['MarkoPhoneNumber']
            phoneCodeSelectValue = request.POST['phoneCodeSelectValue']
            if password1 == password2:
                # this will create a user and return a user instance we can add More Stuff to it
                if not get_user_model().objects.filter(email=Email).exists():
                    user = get_user_model().objects.create_user(
                        first_name =FirstName,
                        email =Email,
                        password = password1)
                    user.last_name = LastName
                    user.countryPhoneCode =phoneCodeSelectValue
                    user.driver_license =driver_LicenseImage
                    user.driver_license_back =driver_License_backImage
                    user.telephone =UserPhoneNumber
                    user.Country_of_residence =countrySelectValue
                    # after The Whole Filling Of Data We Save The User
                    user.save()
                    send_email(user)
                    user_editable_balance,created = models.User_Editable_Balance.objects.get_or_create(user=user)
                    user_editable_balance.save()
                    messages.success(request,f'{FirstName}!  Your Account Has Been Successfully Created, Please check your email  for  Verification')
                    "If Every Thing Goes Well Redirect The User To His Dashboard"
                    
                    return redirect('signIn')
                else:
                    "this means There Is a User That Has That Email Already In the DataBase"
                    messages.error(request,f'{FirstName}! This Email:"{Email}" Already Exits')
            else:
                messages.error(request,f'{FirstName}! Please Enter Correct Password(the Two Password did Not Match)')
                
        # return render(request,'signupTest.html')
        return render(request,'PersonalDetails.html')
    except:

        if get_user_model().objects.filter(email=Email).exists():
            "sinnce we have an exception there is 100% channce the user Data Was already Save"
            "# we have to delte it"
            incompleteModelInstance = get_user_model().objects.get(email=Email)
            print(incompleteModelInstance)
        
            incompleteModelInstance.delete()
        messages.error(request,f'We face Some Error This May Be Network Error! ')
        return render(request,'PersonalDetails.html') 


def pricing(request):
    context = {
        'bit_coin_addresse':models.BitcoinAddresse.objects.first()
    }
    return render(request,'pricing.html',context)


def handle_payment(request,plan_name):
    'this will handle the user payment'
    pricing_range ={
         'REGULAR':{'min':500,'max':4999},
        'STANDARD':{'min':5000,'max':19999},
        'CLASSIC':{'min':20000 ,'max':99999},
        # 'REGULAR':{'min':500,'max':99999},
        'PREMIUM':{'min':100000,'max':'No Limit'},
    }
    context ={
        'plan_name':plan_name,
        'current_pricing_range':pricing_range.get(plan_name),
        'bit_coin_addresse':models.BitcoinAddresse.objects.first(),

    }
    print(request.user.is_authenticated)
    if not request.user.is_authenticated:
        messages.error(request,'You have To Be Login Before you can Procces Payment')
        return redirect('signIn')  

    else:
        'this means the user is logged in' 
        if request.method == 'POST':
            amount = request.POST['amount']
            # print(plan_name,amount)
            user_payment = models.UserPayment.objects.create(user=request.user,amount=amount,pricing_plan=plan_name)
            messages.success(request,f"{request.user} We are Proccessing Your Payment.. Please Check The Company's Wallet Below Or Contact Support  For more info")
            return redirect('dashboard')
        else:
            
            return render(request,'payment_form.html',context)

@login_required
def dashboard(request):
    "this function displays the user dashboard"
    # user_editble,created = models.User_Editable_Balance.objects.get_or_create(user=request.user)
    # models.User_Editable_Balance.objects.values()
    # print()
    context = {
        # 'bit_coin_addresse':models.BitcoinAddresse.objects.first(),
        # 'ListOFEditableBalance':models.User_Editable_Balance.objects.get(user=request.user),
        # 'user_payment':models.UserPayment.objects.filter(user=request.user).order_by('-id')
    
    
    }
    return render(request,'dashboard/index.html',context)


@login_required
def profile(request):
    # user = request.user
    # if request.method == 'POST':
    #     # for password changiung
    #     password = request.POST.get('password')
    #     # for Requesting withdrawal changiung
    #     amount_requested = request.POST.get('amount_requested')
    #     wallet_address = request.POST.get('wallet_address')
        

    #     # for Changing User Profile 
    #     country = request.POST.get('country')
    #     gender = request.POST.get('gender')
    #     email = request.POST.get('email')
    #     telephone = request.POST.get('telephone')
        
    #     if password is not None and request.POST.get('changePassword') is not None:
    #         "this will help handle password changing"
    #         update_user_password(user,password,request)

    #     if  request.POST.get('requestWidthdrawal') is not None:
    #         user_request_withdrawal = models.UserRequestWithdrawal.objects.create(user=user,amount_requested=amount_requested,bitcoin_addresse=wallet_address)
    #         user_request_withdrawal.save()
    #         messages.success(request,'your request was successful! our support will get back to you!!')

    #     if  request.POST.get('changeProfileDetails') is not None:
    #         "this helps to change the user profile details"
    #         user = get_user_model().objects.get(id=request.user.id)
    #         user.email =email
    #         user.gender =gender
    #         user.telephone =telephone
    #         user.Country_of_residence =country
    #         user.save()
    #         messages.success(request,f'{user} your profile was successfully updated')
    #         return redirect('profile')
        
    # context = {
    # 'bit_coin_addresse':models.BitcoinAddresse.objects.first(),
    # 'ListOFEditableBalance':models.User_Editable_Balance.objects.get(user=request.user),
    # 'user_payment':models.UserPayment.objects.filter(user=request.user).order_by('-id')}
    return render(request,'dashboard/profile.html',{})


def update_user_password(user,password,request):
    'this function updates a users password'
    user.set_password(password)
    user.save()
    messages.success(request,'your request was successful!')



def Dashboard_deposit_funds(request):

    return render(request,'dashboard/deposit.html')
"END this are the function that renders the page"


def Dashboard_withdraw_funds(request):
    return render(request,'dashboard/withdraw.html')

def Dashboard_transaction_history_funds(request):
    return render(request,'dashboard/transactionHistory.html')

def Dashboard_verify_profile(request):
    return render(request,'dashboard/verify_profile.html')