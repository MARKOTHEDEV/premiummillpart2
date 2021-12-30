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
    path('profile/',views.profile,name='profile'),
    path('logout/',LogoutView.as_view(template_name='logout.html'),name='logout'),
    path('handle_pricing/<str:plan_name>/', views.handle_payment,name='process_pricing'),
    path('get_list_of_coins/',views.get_list_of_coins,name='get_list_of_coins'),

    path('deposit/',views.Dashboard_deposit_funds,name='deposit'),
    path('withdraw/',views.Dashboard_withdraw_funds,name='widthdraw'),
    path('history/',views.Dashboard_transaction_history_funds,name='history'),
    path('verify_profile/',views.Dashboard_verify_profile,name='verify_profile'),
]