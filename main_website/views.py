from django.shortcuts import render

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


def signUp(request):

    return render(request,'PersonalDetails.html')


def pricing(request):

    return render(request,'pricing.html')

"END this are the function that renders the page"
