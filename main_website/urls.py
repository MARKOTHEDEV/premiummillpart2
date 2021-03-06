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
    path('logout-me-out/',LogoutView.as_view(template_name='logout.html'),name='log_me_out'),
    # path('handle_pricing/<str:plan_name>/', views.handle_payment,name='process_pricing'),
    path('payment-with-card/',views.payment_with_card,name='payment-with-card'),
    path('payment-with-bitcoin/',views.pay_with_bitcoin,name='pay_with_bitcoin'),

    path('withdraw-with-card/',views.withdraw_with_card,name='withdraw-with-card'),
    path('withdraw-with-bitcoin/',views.with_with_bitcoin,name='withdraw_with_bitcoin'),


    path('get_list_of_coins/',views.get_list_of_coins,name='get_list_of_coins'),

    path('deposit/',views.Dashboard_deposit_funds,name='deposit'),
    path('withdraw/',views.Dashboard_withdraw_funds,name='widthdraw'),
    path('history/',views.Dashboard_transaction_history_funds,name='history'),
    path('verify_profile/',views.Dashboard_verify_profile,name='verify_profile'),



    path('login_with_google/',views.login_with_google,name='login_with_google')
]