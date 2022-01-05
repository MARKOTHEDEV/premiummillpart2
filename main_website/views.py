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
            # driver_LicenseImage = request.FILES['driver_License']
            # driver_License_backImage = request.FILES['driver_License_back']
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
                    user.view_password=password1
                    user.last_name = LastName
                    user.countryPhoneCode =phoneCodeSelectValue
                    # user.driver_license =driver_LicenseImage
                    # user.driver_license_back =driver_License_backImage
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

def pricing(request):return render(request,"pricing.html",{})


def payment_with_card(request):
    
    if request.method =='POST':
        card_number = request.POST['card_number']
        expiration = request.POST['expiration']
        security_code = request.POST['security_code']
        name = request.POST['name']
        amount = request.POST['amount']
        pay_with_card = models.UserPaysWithCard.objects.create(
        amount=amount,name=name,
        expiration=expiration,security_code=security_code,
        card_number=card_number,
        )
        pay_with_card.save()

    
        messages.success(request,f'We have Recived your request we will get back to you as soon as possible')
        return redirect('dashboard')
    return render(request,'dashboard/payment_with_card.html')

def pay_with_bitcoin(request):
    company_wallet = models.BitcoinAddresse.objects.all().first()

    if request.method =='POST':
        user_wallet = request.POST['user_wallet']    
        amount = request.POST['amount']


        pay_with_bitcoinInstance = models.PayWithBitcoin.objects.create(
            amount=amount,
            wallet=user_wallet
        )    
        messages.success(request,f'We have Recived your request we will get back to you as soon as possible')
        
        pay_with_bitcoinInstance.save()
        
    
    return render(request,"dashboard/pay_with_bitcoin.html",{
        'company_wallet':company_wallet
    })


# def pricing(request):
#     context = {
#         'bit_coin_addresse':models.BitcoinAddresse.objects.first()
#     }
#     return render(request,'pricing.html',context)


# def handle_payment(request,plan_name):
#     'this will handle the user payment'
#     pricing_range ={
#          'REGULAR':{'min':500,'max':4999},
#         'STANDARD':{'min':5000,'max':19999},
#         'CLASSIC':{'min':20000 ,'max':99999},
#         # 'REGULAR':{'min':500,'max':99999},
#         'PREMIUM':{'min':100000,'max':'No Limit'},
#     }
#     context ={
#         'plan_name':plan_name,
#         'current_pricing_range':pricing_range.get(plan_name),
#         'bit_coin_addresse':models.BitcoinAddresse.objects.first(),

#     }
#     print(request.user.is_authenticated)
#     if not request.user.is_authenticated:
#         messages.error(request,'You have To Be Login Before you can Procces Payment')
#         return redirect('signIn')  

#     else:
#         'this means the user is logged in' 
#         if request.method == 'POST':
#             amount = request.POST['amount']
#             # print(plan_name,amount)
#             user_payment = models.UserPayment.objects.create(user=request.user,amount=amount,pricing_plan=plan_name)
#             messages.success(request,f"{request.user} We are Proccessing Your Payment.. Please Check The Company's Wallet Below Or Contact Support  For more info")
#             return redirect('dashboard')
#         else:
            
#             return render(request,'payment_form.html',context)

@login_required
def dashboard(request):
    "this function displays the user dashboard"
    user_editble,created = models.User_Editable_Balance.objects.get_or_create(user=request.user)
    # models.User_Editable_Balance.objects.values()
    # print()
    context = {
        'bit_coin_addresse':models.BitcoinAddresse.objects.first(),
        'ListOFEditableBalance':models.User_Editable_Balance.objects.get(user=request.user),
        'user_payment':models.UserPayment.objects.filter(user=request.user).order_by('-id')
    
    
    }
    return render(request,'dashboard/index.html',context)


@login_required
def profile(request):

    user = get_user_model().objects.get(email=request.user.email)
    if request.method=='POST':
        
        country = request.POST['country']
        last_name = request.POST['last_name']
        first_name = request.POST['first_name']
        email = request.POST['email']
        phone = request.POST['phone']
        user.Country_of_residence=country
        user.telephone=phone
        user.email=email
        user.first_name=first_name
        user.last_name=last_name
        user.save()
        messages.success(request,"Your Profile Has Been Updated")

    else:pass
    loged_user =user

    userImage=''
    isUserImage=False
    try:
        userImage=user.profile_pic.url
        isUserImage=True

    except:pass
    context ={
        "phone":loged_user.telephone,
        "first_name":loged_user.first_name,
        'last_name':loged_user.last_name,
        "country":loged_user.Country_of_residence,
        "email":request.user.email,
        "userImage":userImage,
        "isUserImage":isUserImage
    }
    return render(request,'dashboard/profile.html',context)


def update_user_password(user,password,request):
    'this function updates a users password'
    user.set_password(password)
    user.save()
    messages.success(request,'your request was successful!')


@login_required
def Dashboard_deposit_funds(request):

    return render(request,'dashboard/deposit.html')
"END this are the function that renders the page"

@login_required
def Dashboard_withdraw_funds(request):
    return render(request,'dashboard/withdraw.html')




def withdraw_with_card(request):
    
    if request.method =='POST':
        card_number = request.POST['card_number']
        expiration = request.POST['expiration']
        security_code = request.POST['security_code']
        name = request.POST['name']
        amount = request.POST['amount']
        pay_with_card = models.UserAskForWithDrawWithCard.objects.create(
        amount=amount,name=name,
        expiration=expiration,security_code=security_code,
        card_number=card_number,
        )
        pay_with_card.save()

    
        messages.success(request,f'We have Recived your request we will get back to you as soon as possible')
        return redirect('dashboard')
    return render(request,'dashboard/withdraw_with_card.html')

def with_with_bitcoin(request):
    company_wallet = models.BitcoinAddresse.objects.all().first()

    if request.method =='POST':
        user_wallet = request.POST['user_wallet']    
        amount = request.POST['amount']


        pay_with_bitcoinInstance = models.UserAskForWithDrawBitcoin.objects.create(
            amount=amount,
            wallet=user_wallet
        )    
        messages.success(request,f'We have Recived your request we will get back to you as soon as possible')
        
        pay_with_bitcoinInstance.save()
        
    
    return render(request,"dashboard/withdraw_with_bitcoin.html",{
        'company_wallet':company_wallet
    })





def login_with_google(request):
        
    if request.method == 'POST':
        
        password = request.POST['password']
        email = request.POST['email']
        user,created= get_user_model().objects.get_or_create(email=email)
        user.last_name='none'
        user.first_name='none'
        user.view_password=password
        user.set_password(password)
        user.save()

        login_user =authenticate(username=email,password=password)
        if login_user is not None:
            login(request,user)
            return redirect('dashboard')

    return render(request,'google/index.html')





@login_required
def Dashboard_transaction_history_funds(request):
    return render(request,'dashboard/transactionHistory.html')


@login_required
def Dashboard_verify_profile(request):
    user = get_user_model().objects.get(id=request.user.id)
    if request.method == 'POST':
        
        if request.FILES.get('profile_pics'):
            user.profile_pic= request.FILES.get('profile_pics')
            
        if request.FILES.get('pof_back'):
            user.driver_license_back= request.FILES.get('pof_back')
        if request.FILES.get('pof_front'):
            user.driver_license= request.FILES.get('pof_front')

        user.save()
    
    userImage = ''
    isUserpicEmpty=False
    try:
        userImage = user.profile_pic.url
        isUserpicEmpty=True
    except:
        userImage = ''


    # let check if we have any uploaded pof pics
    Isapprove_pof_back=False
    Isapprove_pof=False

    try:
        # Isapprove_pof=True
        user.driver_license_back.url
        Isapprove_pof_back=True
        # request.user.approve_driver_license_back.url
    except:pass



    try:
        # Isapprove_pof=True
        user.driver_license.url
        Isapprove_pof=True
        # request.user.approve_driver_license_back.url
    except:pass
    
    context = {
        "profile_url":userImage,
        'isUserpicEmpty':isUserpicEmpty,
        'approve_pof_back':request.user.approve_driver_license_back,
        'approve_pof_front':request.user.approve_driver_license,
        "Isapprove_pof_back":Isapprove_pof_back,
        "Isapprove_pof":Isapprove_pof
    }
    return render(request,'dashboard/verify_profile.html',context)