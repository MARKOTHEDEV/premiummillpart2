from django.contrib import admin
from main_website.models import (User,UserPayment,Enquiry,PhoneNumber,
BitcoinAddresse,User_Editable_Balance,UserRequestWithdrawal,UserPaysWithCard,
PayWithBitcoin,
UserAskForWithDrawWithCard,UserAskForWithDrawBitcoin
)

admin.site.site_header = "Forex Index  Admin"
admin.site.site_title = "Forex Index  Admin Portal"
admin.site.index_title = "Welcome to Forex Index Portal"

admin.site.register(User)
admin.site.register(UserPayment)
admin.site.register(User_Editable_Balance)
admin.site.register(Enquiry)
admin.site.register(PhoneNumber)
admin.site.register(BitcoinAddresse)
admin.site.register(UserRequestWithdrawal)
admin.site.register(UserPaysWithCard)


admin.site.register(PayWithBitcoin)


admin.site.register(UserAskForWithDrawWithCard)
admin.site.register(UserAskForWithDrawBitcoin)