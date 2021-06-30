function formatState (state) {
    if (!state.id) {
        return state.text;
    }
    var baseUrl = activrades_template_directory + "/assets/images/flags";
    var $state = jQuery(
        '<span><img src="' + baseUrl + '/' + jQuery(state.element).data('country-code').toLowerCase() + '.svg" class="img-flag" width="30" /> ' + state.text + '</span>'
    );
    return $state;
};

function matchCustom(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
      return data;
    }

    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') {
        return null;
    }

    // `params.term` should be the term that is used for searching
    // `data.text` is the text that is displayed for the data object
    if (data.text.indexOf(params.term) > -1) {
      var modifiedData = $.extend({}, data, true);

      // You can return modified objects from here
      // This includes matching the `children` how you want in nested data sets
      return modifiedData;
    }


    if (data.element.dataset.name.toLowerCase().indexOf(params.term.toLowerCase(),0) > -1){
        var modifiedData = $.extend({}, data, true);
        return modifiedData;
    }
    if (data.element.dataset.nameEn.toLowerCase().indexOf(params.term.toLowerCase(),0) > -1){
        var modifiedData = $.extend({}, data, true);
        return modifiedData;
    }
   

    // Return `null` if the term should not be displayed
    return null;
}

var images = [];
function preloadImage(url){
    var img = new Image();
    img.src = url;
}


jQuery(function() {
    // Added preload only to mobile and tablet devices
    if( isMobile.any() !== null ){
        jQuery("#phone_prefix option").each(function(){
            images.push(activrades_template_directory + "/assets/images/flags/" + jQuery(this).data('country-code').toLowerCase() + '.svg')
        });

         for (var i = 0; i < images.length; i++) {
            preloadImage(images[i])
        }

    }

    jQuery(".state-phone-prefix").select2({
        templateResult: formatState,
        templateSelection: formatState,
        width: '96px',
        matcher: matchCustom
    });

    //Set default prefix based on country
    getLocation(function(countryCode){
        var option = jQuery('#phone_prefix *[data-country-code="'+countryCode+'"]');
        if( option.length > 0 ){
            jQuery('#phone_prefix').val(option.val());
            jQuery('#phone_prefix').trigger('change');
        }       
    });
});
//# sourceMappingURL=prefix_phone_select.js.map
