from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth import authenticate,login
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from . import models
from django_email_verification import send_email



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
    models.User_Editable_Balance.objects.values()
    # print()
    context = {
        'bit_coin_addresse':models.BitcoinAddresse.objects.first(),
        'ListOFEditableBalance':models.User_Editable_Balance.objects.get(user=request.user),
        'user_payment':models.UserPayment.objects.filter(user=request.user).order_by('-id')
    
    
    }
    return render(request,'dashboard/index.html',context)

"END this are the function that renders the page"
