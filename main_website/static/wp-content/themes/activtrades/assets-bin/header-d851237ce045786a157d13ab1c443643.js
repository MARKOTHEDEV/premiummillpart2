/*
	Combination of all header JS files.
 */

// Global variables
window._at = {
	paDomain: document.documentElement.getAttribute('data-pa') || 'https://secure.activtrades.com',
    paBranch: document.documentElement.getAttribute('data-pa-branch') || 'uk',
    at_Site: document.documentElement.getAttribute('data-at-site') || 'COM',
    at_Entity: document.documentElement.getAttribute('data-at-entity') || 'CORP',
    at_Domain: document.documentElement.getAttribute('data-at-domain')
}

function thisSubdomain() {
    return _at.at_Domain.split(".").shift(); // e.g. www
}

function thisDomain() {
    var thisDomain = _at.at_Domain.split(".");
    thisDomain.shift();
    thisDomain = thisDomain.join('.');
    return thisDomain; //e.g. activtrades.com
}

// DEPRICATED
function isCorp(){
    // CORP entity websites
    return window._at.at_Entity.indexOf('CORP') > -1; // We need this for now to allow passing the pa_branch via cookies.
}

function isPlc() {
    // PLC entity websites
    return window._at.at_Entity.indexOf('PLC') > -1;
}

function isEurope() {
    // EUROUPE entity websites
    return window._at.at_Entity.indexOf('EUROPE') > -1;
}

function isBRSite(){
    return window._at.at_Site.indexOf('BR_SITE') > -1;
}
function writeCookie(key, value, days, mainDomain) {
    var date = new Date();
    days = days || 365;
    date.setTime(+date + (days * 86400000));
    
    var extraCookie = '';

    if( mainDomain !== undefined ){
        extraCookie += '; domain=' + '.'+thisDomain();
    }

    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/" + extraCookie;
    return value;
}

function getTrace(callback){
    jQuery.ajax({
        contentType: 'application/text; charset=utf-8',
        crossBrowser: true,
        type: 'GET',
        url: '/cdn-cgi/trace',
    }).done(function(d){

        try{
            var data = d.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
                data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
            var jsondata = $.parseJSON(data);

            callback(jsondata);

        }catch(error){
            callback(false);
            console.log('Trace error.',error);
        }

    });
}

function getLocation(cb) {
    var countryCode = getCookie('countryCode');

    if(countryCode) {
        cb(countryCode);
    } else {
        var callback_location = cb;

        getTrace(function(response){

            if( response && response.loc !== 'undefined' ){
                console.log('Country from Trace: ' + response.loc);
                writeCookie("countryCode", response.loc, 1);
                callback_location(response.loc);
            }else{
                console.log('Trace error. Return default GB');
                console.log(response)
                callback_location('GB');
            }

        });

    }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) 
    return parts.pop().split(";").shift();
  else 
    return false;
}

function get_previous_week(addDay){
    
    // Check arguments
    if ( !addDay ) addDay = 0;

    var today, todayNumber, previousWeek, week, mondayNumber, monday;
    today = new Date();
    todayNumber = today.getDay();
    previousWeek = -1; //For every week you want to go back the past fill in a lower number.
    week = previousWeek * 7;
    mondayNumber = 1 - todayNumber + week;
    monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()+mondayNumber);

    // Add day
    monday.setDate(monday.getDate() + addDay);


    return ("0" + monday.getDate()).slice(-2) + '/' + (monday.getMonth()+1) + '/' + monday.getFullYear();
}

function nearestMinutes(){
    var x = new Date();
    var minutes = ( Math.round(x.getMinutes() / 10) + "0").slice(-2);
    if( minutes == "60" ) minutes--;
    x.setMinutes(minutes);
    x.setSeconds('00');
    x.setMilliseconds('000');

    return x;
}

/**
 * Wrapper of console.log
 */
var log = function() {
    if( show_log ) {
      console.log.apply(console, arguments);
    }
}

/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.4 - 2015-03-05
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2015 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return $}var n=/^(https?:)?\/\//i;var o=/^get|post$/i;var p=new RegExp('^(\/\/|'+location.protocol+')','i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}});return $}));
/**
 * Show Disclaimer block
 */

/* We need to permanently show the disclaimer block as of task ATB-859
 jQuery(document).ready(function () {

    // If is not accepted show the dislaimer
    if( getCookie('DisclaimerAccepted') === false ){
        jQuery('.footer-third-disclaimer').addClass('disclaimer-box');
    }

    // On accept disclaimer
    jQuery('.accept-disclaimer').on('click',function(e){
        e.preventDefault();

        // If the class is setted 
        // means that the button is visible
        if( jQuery('body').hasClass('bc-show-button') ){
            // Fix boldchat
            jQuery('#boldchat-button').css('bottom','0');
        }
        
        jQuery('.footer-third-disclaimer').removeClass('disclaimer-box');
        
        // Set cookie
        writeCookie('DisclaimerAccepted', 'true', 365, true);
    });
    
});
*/
var europeList = new Array(
    'AT', // Austria
    'BE', // Belgium
    'BG', // Bulgaria
    'HR', // Croatia
    'CY', // Cyprus
    'CZ', // Czech Republic
    'DK', // Denmark
    'EE', // Estonia
    'FI', // Finland
    'FR', // France
    'DE', // Germany
    'GR', // Greece
    'HU', // Hungary
    'IE', // Ireland
    'IT', // Italy
    'LV', // Latvia
    'LT', // Lithuania
    'LU', // Luxembourg
    'MT', // Malta
    'NL', // Netherlands
    'PL', // Poland
    'PT', // Portugal
    'RO', // Romania
    'SK', // Slovakia
    'SI', // Slovenia
    'ES', // Spain
    'SE' // Sweden
);

function isEuropean(location){
	return jQuery.inArray(location, europeList) > -1;
}

function isNotEuropean(location){
	return !isEuropean(location);
}

//Outside EU countries for PLC welcome popup
var outsideEUCountriesForWelcomePopup = new Array(
    'SA',//Saudi Arabia
    'AE',//UAE
    'LB',//Lebanon
    'QA',//Qatar
    'KW',//Kuwait
    'JO',//Jordan
    'EG',//Egypt
    'BH',//Bahrain
    'OM',//Oman
    'CO',//Colombia
    'MY',//Malaysia
    'MX',//Mexico
    'UA',//Ukraine
    'EC',//Ecuador
    'UY',//Uruguay
    'PA',//Panama
    'PY',//Paraguay
    'CR',//Costa Rica
    'DO',//Dominic Republic
    'AR',//Argentina
    'PE',//Peru
    'BO',//Bolivia
    'CL',//Chile
    'SV',//El Salvador
    'VE'//Venezuela
);

function isOutsideEUCountriesForWelcomePopup(location){
    return jQuery.inArray(location, outsideEUCountriesForWelcomePopup) > -1;
}
/* iFrame Form Management Scripts */
// Global
var boostrapenv = 'lg';
var disablePop = ['cn']; // disable popup for these languages

var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ipad = /ipad/.test( userAgent ),
    iphone = /iphone/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );

// Cookies to store
var cookies_to_store = {
    'ib':           { name: 'IB-ID',        days: 365 },
    'gclid':        { name: 'gclid',        days: 60 },
    'utm_source':   { name: 'utm_source',   days: 90 },
    'utm_campaign': { name: 'utm_campaign', days: 90 },
    'utm_medium':   { name: 'utm_medium',   days: 90 },
    'utm_term':     { name: 'utm_term',     days: 90 },
    'utm_content':  { name: 'utm_content',  days: 90 },
    'branch':       { name: 'branch', value: _at.paBranch, days: 90 },

}

// Conver the query params to an object
var queryParams = getQueryParams(window.location.search);

//traders talk - videoId tracker
var ytVideoId = "";

// Loop through each of the values in cookies_to_store, and if they are set as a parameter,
// Add them as a cookie
set_activtrades_cookies();

// Event listener, the PA iframe form sends events back such as
// a notification the form is open and a close form instruction
window.addEventListener('message',function(event){
    // console.log(event.data);
    // console.log(typeof(event.data));

    if (typeof(event.data) != 'object'){
        // if (event.data.indexOf("height") > -1){
        //     var jsonevent = jQuery.parseJSON(event.data);

        //     jQuery.each( jsonevent, function( key, val ) {
        //         if (key == "height"){
        //             iframeFormSetHeight(val);
        //         }
        //     });
        // }
        if (event.data == "close overlay") {
            iframeFormIsOpen();
        }
        if (event.data == "close popup") {
            if(ipad){
                jQuery('html, body').removeAttr("style");
            }
            if( iphone ) {
                //reset and display all elements on the page 
                jQuery('html,body').css('height','auto');
                jQuery('body').css('background-color','transparent');
                jQuery('.header, .wrapper-ctos, .section, .page-content, .homepage-advantages, .footer-first, .footer-second, .footer-third, #riskwarning, #header-sub-bar, .flat-header-ctos, .header-button').show();
            }
            iframeFormClose();
        }
    }

});

// http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    var jQueryel = jQuery('<div>');
    jQueryel.appendTo(jQuery('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        jQueryel.addClass('hidden-'+env);
        if (jQueryel.is(':hidden')) {
            jQueryel.remove();
            return env;
        }
    }
}

function genericIframeForm(formtype, redirect){
    // On iOS, when demo registration is requested, instead forward the user to this special 
    // registration page.
    var lang = activtrades_lang === 'ar' ? 'ae' : activtrades_lang;

    var currentSite = _at.at_Entity.toLowerCase();

    if (formtype === 'clicktocall') {
        history.pushState({}, "", window.location.href);
        c2c_subdomain = jQuery("html").attr("data-pa") == "https://secure.activtrades.com" ? "callback.activtrades.com" : "callback-stg.activtrades.com";
        clicktocallURL = "https://" +c2c_subdomain+"/app.html?lang="+activtrades_lang+"&site="+currentSite;
        iframetag = "<iframe id='click-to-call' src='" + clicktocallURL + "' style=''></iframe>";
        if (jQuery("#click-to-call").length < 1) { // check if the iframe already exist, if not add it.
            jQuery("body").append(iframetag);
            jQuery("#click-to-call").addClass('visible');
            window.addEventListener('message', function (event) {
                if (event.data == "close popup") {
                    console.log('::: Message: ' + event.data);
                    jQuery("#click-to-call", top.document).removeClass("visible");
                    jQuery("html", top.document).css("overflow", "auto");
                }
            });
        }
        return false;
    }
    
    if( ios && formtype === 'demoregisterpopup') {
        history.pushState({}, "", window.location.href);
        window.location.href = _at.paDomain + '/personalarea/account/freedemoregister?lang=' + lang + "&" + get_activtrades_cookies_as_str();;
        return false;
    }

    if( ios && formtype === 'loginpopup') {
        history.pushState({}, "", window.location.href);
        window.location.href = _at.paDomain + '/personalarea/account?lang=' + lang + "&" + get_activtrades_cookies_as_str();;
        return false;
    }

    var useActivTraderParam = false;


    if(formtype === 'demoregisterpopup' && jQuery('.header-image-container').data('cta-activtrader') == '1') {
        useActivTraderParam = true;
    }

    console.log('loading popup:', formtype, jQuery('.header-image-container').data('cta-activtrader'), useActivTraderParam);

    // Set container sizing
    iframeformstyles = "height: 100%; width: 100%;";

    // Open iframe form
    var paramchar = "?";
    if (formtype.indexOf("?") >= 0) {
        paramchar = "&";
    }
    
    iframesrc = activtrades_pa_domain_for_forms + "/personalarea/popup/"  + formtype + paramchar + "lang=" + lang + (useActivTraderParam ? '&lpage=at' : '') + "&backpage=" + window.location.protocol + "//" + window.location.host + "&" + get_activtrades_cookies_as_str();
    if (formtype == "test"){
        iframesrc =  activrades_template_directory + "/iframetest.php";
    }
    //Trader's talk popup
    if (formtype === 'EducationalTraderTalkVideos') {
        console.log("** vid id" + ytVideoId);
        iframesrc = activtrades_pa_domain_for_forms + "/personalarea/popup/LoginPopup/" + formtype + paramchar + "returnurl=https://youtu.be/" + ytVideoId + "&isForLiveOnly=true&prefLang=" + lang + "&Lang=" + lang + "&backpage=" + window.location.protocol + "//" + window.location.host + "&" + get_activtrades_cookies_as_str();
        console.log("** iframeSRC -> " + iframesrc);
    }

    if(redirect) {
        console.log('Redirecting: ' + iframesrc);
        window.location.href = iframesrc;
        return false;
    }
    console.log('Opening popup: ' + iframesrc);

    iframetag = "<iframe src='" + iframesrc + "' style='" + iframeformstyles + "'></iframe>";
    jQuery("body").addClass("no-overflow");
    jQuery("#iframe-form-content").html(iframetag);
    jQuery("#iframe-form-wrapper").fadeIn();
    jQuery('#close-button').show();
    jQuery("#iframe-form-wrapper").removeClass("loaded");

    //we want to hide all other page elems and just keep the iframe popup visible
    if( ipad ){
        jQuery('html').css('overflow', 'hidden');
        jQuery('body').css('-webkit-overflow-scrolling', 'touch');
        jQuery("html, body, #iframe-form-wrapper, #iframe-form-wrapper, #iframe-form, #iframe-form-content, #iframe-form-content iframe").css('height','-webkit-fill-available');
    }

    if( iphone ){
        jQuery('body').css({
            'overflow' : 'auto',
            '-webkit-overflow-scrolling': 'touch',
            'background-color' : 'rgba(0, 66, 145, 0.3)'
        });
        jQuery('html,body').css('height','100%');
        
        jQuery('.header, .wrapper-ctos, .section, .page-content, .homepage-advantages, .footer-first, .footer-second, .footer-third, #riskwarning, #header-sub-bar, .flat-header-ctos, .header-button').hide();

        var argsIframeWrapper = {
            'position': 'static',
            'height': 'auto',
            'background-color' : 'transparent',
        }

        if( formtype == "loginpopup" ){
            delete argsIframeWrapper['height'];
        }
        jQuery('html').removeClass('touch');
        jQuery('#iframe-form-wrapper').css(argsIframeWrapper);
    }


    if (boostrapenv == "xs" || boostrapenv == "sm") {
        jQuery("#iframe-form-content").scrollToMe();
    }

    return false;
}

/**
 * Gets all the query parameters and converts to an object
 */
function getQueryParams(qs) {

    // Convert '+' to spaces
    qs = qs.split('+').join(' ');

    var params = {};
    var tokens;

    // Split params string
    // [?&]? - ignore initial '?' or '&'
    // ([^=]+) - param key
    // ([^&]*) - param value
    var re = /[?&]?([^=]+)=([^&]*)/g; 

    while (tokens = re.exec(qs)) {
        // For each parameter, store in the form of
        // { key: value }
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}



function set_activtrades_cookies() {
    console.log('AT :: Setting ActivTrades cookies');

    var branch = cookies_to_store.branch;
    writeCookie(branch.name, branch.value, branch.days);


    for(var param in queryParams) {
        if(cookies_to_store.hasOwnProperty(param)) {
            var cookie = cookies_to_store[param];

            if(param.toLowerCase().indexOf('utm_') === 0) {
                if(queryParams.hasOwnProperty('utm_source')) {
                    writeCookie(cookie.name, queryParams[param], cookie.days);
                }
            } else {
                writeCookie(cookie.name, queryParams[param], cookie.days);
            }
        }
    }
}

function get_activtrades_cookie(key) {
    if(cookies_to_store.hasOwnProperty(key)) {
        return getCookie(cookies_to_store[key]);
    }

    return false;
}

// This function returns activtrades specific cookies as a string,
// it does a round trip to the server to get the cookie information
// which keeps cookie handling server-side and ensures future caching
// compatibility
function get_activtrades_cookies_as_str(){
    // Return string
    var cookie_str = "";

    // get the cookies
    for(var cookie in cookies_to_store) {
        if(cookies_to_store.hasOwnProperty(cookie)) {
            var cookieValue = getCookie(cookies_to_store[cookie].name);

            if(cookieValue !== false) {
                cookie_str += cookie_str === '' ? '' : '&';

                cookie_str += cookie + '=' + encodeURIComponent(cookieValue);
            }
        }
    }

    // Return result
    return cookie_str;
}

// This function is called by the iframe with a parent.iframeFormIsOpen(); call, it is executed
// when the iframe is open so the parent knows to remove its own close button etc
function iframeFormIsOpen(){
    jQuery('#close-button').hide();
    jQuery("#iframe-form-wrapper").addClass("loaded");
}

// This function is called by the iframe with a parent.iframeFormIsOpen(); call, it is executed
// when the user clicks on the close button in the iframe
function iframeFormClose(){
    jQuery("#iframe-form-wrapper").fadeOut();
    jQuery("#iframe-form-wrapper").removeClass("loaded");
    jQuery("body").removeClass("no-overflow");
}

// Set iframe hieght
function iframeFormSetHeight(value){
    // jQuery("#iframe-form-wrapper").attr("style", "display:block; height:" + value + "; width: 100%");
    // jQuery("#iframe-form-wrapper iframe").attr("style", "height:" + value + "; width: 100%");
}

jQuery.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

jQuery( document ).ready(function() {
    // Bootstrap environment
    var boostrapenv = findBootstrapEnvironment();

    jQuery.fn.extend({
        scrollToMe: function (offsetVal) {
            offsetVal = typeof offsetVal !== 'undefined' ? offsetVal : 100;
            var movePosition = jQuery(this).offset().top - offsetVal;
            jQuery('html,body').animate({scrollTop: movePosition}, 500);
        }
    });


    // Login button(s)
    jQuery(".menu-item a[href='#login']").click(function() {
        if(disablePop.indexOf(activtrades_lang) < 0) {
            return genericIframeForm("loginpopup");
        }
        else {
            console.log('Popups disabled, forwarding');
            window.location = _at.paDomain + "/personalarea?lang="+activtrades_lang + "&" + get_activtrades_cookies_as_str();
        }
    });

    jQuery(".btn-login").click(function() {
        if(disablePop.indexOf(activtrades_lang) < 0) {
            return genericIframeForm("loginpopup");
        }
        else {
            console.log('Popups disabled, forwarding');
            window.location = _at.paDomain + "/personalarea?lang="+activtrades_lang + "&" + get_activtrades_cookies_as_str();
        }
    });
    jQuery(".btn-login-campaign").click(function() {
        return genericIframeForm("loginpopup?CampaignId=" + jQuery(this).data('campaignid'));
    });

    jQuery(".btn-login-campaign-live").click(function() {
        return genericIframeForm("loginpopup/webinars?CampaignId=" + jQuery(this).data('campaignid') + '&isForLiveOnly=true');
    });

    // ActivTrades Card buttons - We have to add a class in the HTML for this to pick up.
    jQuery(".login-popup-cto").click(function() {
        if(disablePop.indexOf(activtrades_lang) < 0) {
            return genericIframeForm("loginpopup");
        }
        else {
            console.log('Popups disabled, forwarding');
            window.location = _at.paDomain + "/personalarea?lang="+activtrades_lang + "&" + get_activtrades_cookies_as_str();
        }
    });

    jQuery(".new-account-cto").click(function() {
        window.location = _at.paDomain + "/personalarea/OnlineApplication/Step1?Lang="+activtrades_lang + "&"; 
    });

    // Menu items
    // If a menu item has one of the following as it's href attribute, then it will open the corresponding popup
    var callmeframe = "iframecontact?type=call";    // default option
    clicktocallEnabledFor = ['en', 'es', 'fr', 'it', 'de', 'ru', 'bg', 'ar', 'tw', 'hk', 'ms'];
    if (clicktocallEnabledFor.indexOf(activtrades_lang) > -1) {                 // enable new click-to-call for certain languages only
        callmeframe = "clicktocall";
    }

    var itemsPopups = {
        '#bankwire' :       'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/BankWire',
        '#creditcard' :     'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/CreditCard',
        '#neteller' :       'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/Neteller',
        '#skrill' :         'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/Skrill',
        '#sofort' :         'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/Sofort',
        '#netbanx' :        'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Payment/Netbanx',
        '#tobankwire' :     'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Withdrawal/ToBankWire',
        '#todebitcredit' :  'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Withdrawal/ToCreditCard',
        '#toneteller' :     'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Withdrawal/ToNeteller',
        '#toskrill' :       'LoginPopup?returnurl=' + _at.paDomain + '/personalarea/Withdrawal/ToSkrill',
        '#webinarspecial' :       'LoginPopup/Archive?isForLiveOnly=true',
        '#enquiriespop' :       'iframecontact?type=enquery',
        '#callmepop' :       callmeframe //
    };

    // Elements in right bar
    var floatingButtons = {
        '#callmepop' :       callmeframe,
        '#enquiriespop' :       'iframecontact?type=enquery',
    };

    // jQuery('a[href*="#callmepop"]').click(function () { // for any links with the #callmepop element ID
    //     if (activtrades_lang != "en") {
    //         return genericIframeForm("iframecontact?type=call");
    //     } else {
    //         jQuery("html", top.document).css("overflow", "hidden");
    //         console.log('showing-002');
    //         jQuery('#click-to-call').toggleClass('visible');
    //         return genericIframeForm("clicktocall");
    //     }
    // });

    // Href for <LI>
    var hrefAnchorsPopupLi = Object.keys(floatingButtons).map(function(k){
        return 'li[href="'+k+'"]';
    }).join(", ");


    // Href for <A>
    var hrefAnchorsPopupA = Object.keys(itemsPopups).map(function(k){
        return 'a[href="'+k+'"]';
    }).join(", ");

    // Trigger click for A and LI tags
    jQuery(hrefAnchorsPopupA + ", " + hrefAnchorsPopupLi).click(function(evt) {
        evt.preventDefault();
        var popupUrl = itemsPopups[jQuery(this).attr('href')];
        return genericIframeForm(popupUrl);
    });

    // console.log('Checking menu items...');
   

    // Real account buttons
    // Loop through each, adding the cookie parameters to the href
    jQuery('.btn-cto-primary, .cta-buttons .btn-cta-primary').each(function() {
        var href = jQuery(this).attr('href');
        // Check if is an anchor link
        if( href.indexOf('#') === 0 ){
            return true;
        }

        if(href) {
            var start = href.split('?').length;
            var last = href[href.length - 1];
            var char;

            if(start > 1) {
                if(last === '&') {
                    char = '';
                } else {
                    char = '&';
                }
            } else {
                char = '?';
            }
            href += char + get_activtrades_cookies_as_str();
        }

        jQuery(this).attr('href', href);
        console.log('AT :: Primary button params');
    });

    

    // Attach click listeners to any buttons we have on the page
    // which have an iframe-request type id
    //run normal popup if the current activtrades_lang != disablePop (see top)
    // if(disablePop.indexOf(activtrades_lang) < 0) {
        jQuery("[role^='iframe-request'], a[href^='" + _at.paDomain + "/personalarea/popup/']").each(function(){
            jQuery(this).click(function() {
                // Strip out the leading iframe-request from the role
                var formtarget = "";
                if (jQuery(this).hasAttr("role")){
                    formtarget = jQuery(this).attr("role").replace("iframe-request-","").replace("-","/");
                } else {
                    // if the role does not exist, which can be the case for buttons in content due to Wordpress stripping
                    // we get the formTarget from the url
                    formtarget = jQuery(this).attr("href").split("?")[0].replace(_at.paDomain + '/personalarea/popup/','');
                }
                console.log("formtarget: " + formtarget);

                return genericIframeForm(formtarget, disablePop.indexOf(activtrades_lang) >= 0);
            });
        });
    // }
    // else {console.log('popup disabled');}

    jQuery('.traders-talk a.btn-flat').each(function(){
        jQuery(this).click(function(e){
            e.preventDefault();
            ytVideoId = jQuery(this).attr('href');
            return genericIframeForm("EducationalTraderTalkVideos", disablePop.indexOf(activtrades_lang) >= 0);
        });
    });
        
    // Close iframe form button
    jQuery("#close-button").click(function() {
        iframeFormClose();
    });
});

// Functions used by PA iframe
window.closeIframe=function(){jQuery("#full-wrapper-PA-iframe").fadeOut();$("iframe").fadeOut();}
window.redirectPage=function(url){window.location.href=url;}

jQuery( document ).ready(function() {

    function initFixedMenu(){
        if( jQuery.inArray( findBootstrapEnvironment(), [ "xs", "sm" ] ) == -1 ){

            var $menu_container = jQuery('.header-fixed');
            var $menu_fixed = jQuery('#menu-fixed');
            var offsetHeight = 280;

            //Check if menu container exist
            if( $menu_container.length > 0){
                var isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);
                var ua = navigator.userAgent, event = (ua.match(/iPad/i)) ? "touchstart" : "click";

                //On scroll
                // jQuery(window).scroll(function () {
                //     if (jQuery(this).scrollTop() > offsetHeight) {
                //         $menu_container.addClass("slideDown");
                //     } else {
                //         $menu_container.removeClass("slideDown");
                //     }
                // });

                //Show/Hide hover menu
                if( !isTouchDevice ){
                    $menu_container.hover(function() {
                        $menu_fixed.collapse('show');
                    }, function() {
                        $menu_fixed.collapse('hide');
                    });
                }

                //Show/Hide on button click
                jQuery( ".hamb-menu" ).click(function() {
                    $menu_fixed.is(":visible") ? $menu_fixed.collapse('hide') : $menu_fixed.collapse('show');;
                });

                 if( isTouchDevice ){
                    jQuery(document).on('touchstart click', 'body', function(event){
                        var $clickElement = jQuery(event.target);
                        var $openMenu = jQuery("#menu-fixed .menu-item.open");

                        //!clickover.hasClass("navbar-toggle")
                        if ( $openMenu.length > 0 && $clickElement.is( "a" ) == false ) {
                           $menu_fixed.collapse('hide');
                        }
                    });
                }
            }
        }
    }

    //Run fixed menu
    initFixedMenu();

    //When the viewport change run fixed menu
    jQuery(window).on("newViewPort", function(event){
        initFixedMenu();
    });

});
/**********************
* Open gallery with images. Below an example of images variable.
* var images = [
* 	{ 
* 		href: 'http://dev.activtrades.com/wp-content/uploads/2016/08/1-1-1024x768.jpg',
* 		title : 'This title appear inside the popup'
* 	}
* ];
***********************/
function openGallery(images){
    if(typeof jQuery().fancybox == 'function') {
    	var gallery_opts = { 
    		'overlayShow' : true, 
    		'hideOnOverlayClick' : true, 
    		'showCloseButton' : true, 
    		'margin' : 20, 
    		'centerOnScroll' : true, 
    		'enableEscapeButton' : true, 
    		'autoScale' : true ,
    		'type': 'image',
            'transitionIn': 'elastic',
            'easingIn': 'easeOutBack',
            'transitionOut': 'elastic',
            'easingOut': 'easeInBack',
            'opacity': false,
            'hideOnContentClick': false,
            'titleShow': true,
            'titlePosition': 'over',
            'titleFromAlt': true,
            'showNavArrows': true,
            'enableKeyboardNav': true,
            'cyclic': false
    	};
        jQuery.fancybox(images,gallery_opts);
    }else{
        console.log("fancybox not loaded.");
    }
}

/**
 * Accepts an integer,
 * and returns a string with a comma added if that integer is in the thousands
 * @param {int} x 
 * @returns {string} The string with added comma
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Returns Boolean value if string is integer
 * @param {string} str  the string to query
 * @returns {Boolean}
 */
function is_numeric(str){
    return /^\d+$/.test(str);
}

/**
 * Accepts a string of 3 characters
 * Reurns Boolena if it matches a valid month
 * @param {string} month  the 3 character string to test
 * @returns {Boolean}
 */
function is_month(month){
    var testMonth = month.toUpperCase();
    var months = [
        'JAN', 'FEB', 'MAR', 'APR',
        'MAY', 'JUN', 'JUL', 'AUG',
        'SEP', 'OCT', 'NOV', 'DEC'];
    if(testMonth.length === 3){
        if(months.indexOf(testMonth) > -1){
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
}
//# sourceMappingURL=header.js.map
