from django.contrib import admin
from main_website.models import User,Enquiry,PhoneNumber,BitcoinAddresse

admin.site.register(User)
admin.site.register(Enquiry)
admin.site.register(PhoneNumber)
admin.site.register(BitcoinAddresse)
