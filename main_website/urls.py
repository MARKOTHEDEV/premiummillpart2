from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('', views.indexPage,name='home'),
    path('about/', views.about,name='about'),
    path('contact/', views.contact,name='contact'),
    path('pricing/', views.pricing,name='pricing'),
    path('signin/', views.signIn,name='signIn'),
    path('signup/', views.signUp,name='signUp'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('logout/',LogoutView.as_view(template_name='logout.html'),name='logout')
]