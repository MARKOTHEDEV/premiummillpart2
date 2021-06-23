/**
 * Main action Handler
 */
function showTollFreeNum($internationalBlock, countryCode){
    // *tollFreeJson - variable is from footer.php
    var countryNumData  = tollFreeJson[activtrades_lang].country_code[countryCode];

    if( countryNumData != undefined ){
        var tollFreeText = tollFreeJson[activtrades_lang].disclaimer;
        //e.g. check if value is object type => it contains multiple values (multiple carriers)
        if(typeof(countryNumData) == 'object'){
            var hasCarrierMultiNumbers = false;
            var numDataList = Object.values(countryNumData);

            //Do further check - loop through values and see if 1 carrier contains multiple values (multiple carrier numbers)
            jQuery.each(numDataList, function (index, value) {
                if( Array.isArray(value) ){
                    hasCarrierMultiNumbers = true;
                    return false;
                }
            });

            if(hasCarrierMultiNumbers == true){
                //carrier - contains multiple numbers
                updateMultiListNumIB($internationalBlock, countryNumData);
            }else{
                //List contains multiple carriers with a single number each.
                updateSingleListNumIB($internationalBlock, countryNumData);
            }
        }//It is just a single value (just the number itself)
        else{
            updateSingleNumIB($internationalBlock, countryNumData);
        }

        //Once the data is on page. Check if not mobile devices or is tablet device -> disable hyperlinks
        if( !isMobile.any() || navigator.userAgent.match(/iPad/i) ){
            $internationalBlock.find('a').addClass('disable-link');
        }
        //After data has been updated for international block -> make it visible!
        $internationalBlock.fadeIn("slow");
        showTollFreeDisclaimer($internationalBlock, tollFreeText);
    }
}

function showTollFreeDisclaimer($internationalBlock, tollFreeText){
    var tollFreeTextHtml = '<div id="toll-free-disclaimer" class="col-xs-12 col-sm-12">' + tollFreeText + '</div>';
    var phoneBlockWrapper = $internationalBlock.parents('.overview-block-type');
    phoneBlockWrapper.append(tollFreeTextHtml);
    jQuery('#toll-free-disclaimer').fadeIn("slow");
}
/**
 * Common functions Contact page Toll-free nums
 */
function removeWhiteSpace(value){
    return value.replace(/\s+/g, '');
}

//Each languages will vary. Set Col-width 'colWidthIB' depending on lang.
function expandColWidthIB($internationalBlock, colWidthIB){
    $internationalBlock.removeClass('col-md-3').addClass(colWidthIB);
}

//Update International Block - with just a single number 
function updateSingleNumIB($internationalBlock, number){
    var telLink = '<a href="tel:'+ removeWhiteSpace(number) +'">'+ number +'</a>';
    updateHTMLBlock($internationalBlock, telLink);
}

//Update International Block - with single numbers list. e.g. single number per key
function updateSingleListNumIB($internationalBlock, numbersList){
    var telLinks = '';
    var listCount = 0;
    jQuery.each(numbersList, function (index, number) {
        listCount++;
        telLinks += '<li><strong class="carrier">'+ index +':</strong> <a href="tel:'+ removeWhiteSpace(number) +'">'+ number +'</a></li>';
    });
    var colClass = (listCount >= 3) ? 'cols-3' : '';
    var telListHtml = '<div class='+colClass+'><ul>' + telLinks + '</ul></div>';

    updateHTMLBlock($internationalBlock, telListHtml);
}

//Update International Block - with multi numbers list. e.g. multi numbers per key
function updateMultiListNumIB($internationalBlock, numbersList){
    var telLinks = '';
    var listCount = 0;
    jQuery.each(numbersList, function (index, value) {
        listCount++;
        if(Array.isArray(value)){
            var multiNumbers = '';
            jQuery.each(value, function(key, val){
                multiNumbers +=  '<a href="tel:'+ removeWhiteSpace(val) +'">'+val+'</a>' + ((key == value.length-1 ) ? '' : ', ' );
            });
            telLinks += '<li class="multi-numbers"><strong class="carrier">'+ index +':</strong> '+ multiNumbers +'</li>';
        }else{
            telLinks += '<li><strong class="carrier">'+ index +':</strong> <a href="tel:'+ removeWhiteSpace(value) +'">'+ value +'</a></li>';
        }
    });    
    var colClass = (listCount >= 3) ? 'cols-3' : '';
    var telListHtml = '<div class='+colClass+'><ul>' + telLinks + '</ul></div>';

    updateHTMLBlock($internationalBlock, telListHtml);
}

function updateHTMLBlock($internationalBlock, content){
    var pTagPosition = 1;
    //Check if toll-free block text field has value. If has value: target p-position (1), if not, target p-position (0)
    if( $internationalBlock.find('p:eq(1)').length == 0 ){
        pTagPosition = 0;
    }
    $internationalBlock.find('p:eq('+pTagPosition+')').addClass('margin-top').html(content);
}