from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth import authenticate
from django.shortcuts import redirect
# Create your views here.



"this are the function that renders the page"
def indexPage(request):

    return render(request,'index.html')


def about(request):

    return render(request,'about.html')


def contact(request):

    return render(request,'contact.html')


def signIn(request):

    return render(request,'signUp.html')


#  'countrySelectValue',request.POST['countrySelectValue'],

            
def signUp(request):
    "this view Registe the User To The dataBase"
    if request.method == 'POST':
        countrySelectValue = request.POST['countrySelectValue']
        FirstName = request.POST['FirstName']
        LastName = request.POST['LastName']
        Email = request.POST['Email']
        driver_LicenseImage = request.FILES['driver_License']
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
                user.telephone =UserPhoneNumber
                user.Country_of_residence =countrySelectValue
                # after The Whole Filling Of Data We Save The User
                user.save()
                messages.success(request,f'{FirstName} {LastName} Your Account Has Been Successfully Created')
                "If Every Thing Goes Well Redirect The User To His Dashboard"
                return redirect('signIn')
            else:
                "this means There Is a User That Has That Email Already In the DataBase"
                messages.error(request,f'{FirstName}! This Email:"{Email}" Already Exits')
        else:
            messages.error(request,f'{FirstName}! Please Enter Correct Password(the Two Password did Not Match)')
            
    # return render(request,'signupTest.html')
    return render(request,'PersonalDetails.html')


def pricing(request):

    return render(request,'pricing.html')


def dashboard(request):
    "this function displays the user dashboard"
    return render(request,'dashboard/index.html')

"END this are the function that renders the page"
