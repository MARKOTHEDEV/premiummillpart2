from django.contrib import admin
from main_website.models import (User,UserPayment,Enquiry,PhoneNumber,BitcoinAddresse,User_Editable_Balance)

admin.site.site_header = "Premium Mill Admin"
admin.site.site_title = "Premium Mill Admin Portal"
admin.site.index_title = "Welcome to Premium MillPortal"

admin.site.register(User)
admin.site.register(UserPayment)
admin.site.register(User_Editable_Balance)
admin.site.register(Enquiry)
admin.site.register(PhoneNumber)
admin.site.register(BitcoinAddresse)
