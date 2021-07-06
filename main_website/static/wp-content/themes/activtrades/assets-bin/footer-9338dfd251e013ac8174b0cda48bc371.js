/*
	Combination of all footer JS files.
 */

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||3<e[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function o(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(t.style[i]!==undefined)return{end:e[i]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)};a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=s(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),i="#"===i?[]:i;var o=s(document).find(i);function n(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),s.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())};var t=s.fn.alert;s.fn.alert=function o(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict";var n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.4.1",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data();t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e).prop(e,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e).prop(e,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var t=s.fn.button;s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target).closest(".btn");i.call(e,"toggle"),s(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),e.is("input,button")?e.trigger("focus"):e.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(p){"use strict";var c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))};function r(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide;e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.4.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var o=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(o)},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),n=this.interval,s="next"==t?"left":"right",a=this;if(o.hasClass("active"))return this.sliding=!1;var r=o[0],l=p.Event("slide.bs.carousel",{relatedTarget:r,direction:s});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,n&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=p(this.$indicators.children()[this.getItemIndex(o)]);h&&h.addClass("active")}var d=p.Event("slid.bs.carousel",{relatedTarget:r,direction:s});return p.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),"object"==typeof o&&o.length&&o[0].offsetWidth,i.addClass(s),o.addClass(s),i.one("bsTransitionEnd",function(){o.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger(d)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),n&&this.cycle(),this}};var t=p.fn.carousel;p.fn.carousel=r,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this};var e=function(t){var e=p(this),i=e.attr("href");i&&(i=i.replace(/.*(?=#[^\s]+$)/,""));var o=e.attr("data-target")||i,n=p(document).find(o);if(n.hasClass("carousel")){var s=p.extend({},n.data(),e.data()),a=e.attr("data-slide-to");a&&(s.interval=!1),r.call(n,s),a&&n.data("bs.carousel").to(a),t.preventDefault()}};p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this);r.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(document).find(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.4.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return n.call(this);var s=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=n(e),o=i.data("bs.collapse")?"toggle":e.data();l.call(i,o)})}(jQuery),function(a){"use strict";var r='[data-toggle="dropdown"]',o=function(t){a(t).on("click.bs.dropdown",this.toggle)};function l(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i="#"!==e?a(document).find(e):null;return i&&i.length?i:t.parent()}function s(o){o&&3===o.which||(a(".dropdown-backdrop").remove(),a(r).each(function(){var t=a(this),e=l(t),i={relatedTarget:this};e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&a.contains(e[0],o.target)||(e.trigger(o=a.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",i)))))}))}o.VERSION="3.4.1",o.prototype.toggle=function(t){var e=a(this);if(!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(s(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",s);var n={relatedTarget:this};if(i.trigger(t=a.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(a.Event("shown.bs.dropdown",n))}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=a(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(r).trigger("focus"),e.trigger("click");var n=i.find(".dropdown-menu li:not(.disabled):visible a");if(n.length){var s=n.index(t.target);38==t.which&&0<s&&s--,40==t.which&&s<n.length-1&&s++,~s||(s=0),n.eq(s).trigger("focus")}}}};var t=a.fn.dropdown;a.fn.dropdown=function e(i){return this.each(function(){var t=a(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},a.fn.dropdown.Constructor=o,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=t,this},a(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",r,o.prototype.toggle).on("keydown.bs.dropdown.data-api",r,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(a){"use strict";var s=function(t,e){this.options=e,this.$body=a(document.body),this.$element=a(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,n){return this.each(function(){var t=a(this),e=t.data("bs.modal"),i=a.extend({},s.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new s(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}s.VERSION="3.4.1",s.TRANSITION_DURATION=300,s.BACKDROP_TRANSITION_DURATION=150,s.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},s.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},s.prototype.show=function(i){var o=this,t=a.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){a(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=a.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:i});t?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(s.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},s.prototype.hide=function(t){t&&t.preventDefault(),t=a.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(s.TRANSITION_DURATION):this.hideModal())},s.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},s.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},s.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},s.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},s.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},s.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=a.support.transition&&i;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+i).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){e.removeBackdrop(),t&&t()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):n()}else t&&t()},s.prototype.handleUpdate=function(){this.adjustDialog()},s.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},s.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},s.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},s.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var n=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",t+n),a(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,o=a(e).css("padding-right");a(e).data("padding-right",i).css("padding-right",parseFloat(o)+n+"px")}))},s.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),a(this.fixedContent).each(function(t,e){var i=a(e).data("padding-right");a(e).removeData("padding-right"),e.style.paddingRight=i||""})},s.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=a.fn.modal;a.fn.modal=r,a.fn.modal.Constructor=s,a.fn.modal.noConflict=function(){return a.fn.modal=t,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=a(this),i=e.attr("href"),o=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),n=a(document).find(o),s=n.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(i)&&i},n.data(),e.data());e.is("a")&&t.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(n,s,this)})}(jQuery),function(g){"use strict";var o=["sanitize","whiteList","sanitizeFn"],a=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},r=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,l=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function u(t,e){var i=t.nodeName.toLowerCase();if(-1!==g.inArray(i,e))return-1===g.inArray(i,a)||Boolean(t.nodeValue.match(r)||t.nodeValue.match(l));for(var o=g(e).filter(function(t,e){return e instanceof RegExp}),n=0,s=o.length;n<s;n++)if(i.match(o[n]))return!0;return!1}function n(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return t;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=t;for(var n=g.map(e,function(t,e){return e}),s=g(o.body).find("*"),a=0,r=s.length;a<r;a++){var l=s[a],h=l.nodeName.toLowerCase();if(-1!==g.inArray(h,n))for(var d=g.map(l.attributes,function(t){return t}),p=[].concat(e["*"]||[],e[h]||[]),c=0,f=d.length;c<f;c++)u(d[c],p)||l.removeAttribute(d[c].nodeName);else l.parentNode.removeChild(l)}return o.body.innerHTML}var m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};m.VERSION="3.4.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},m.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(document).find(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this))}}this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){var e=this.$element.data();for(var i in e)e.hasOwnProperty(i)&&-1!==g.inArray(i,o)&&delete e[i];return(t=g.extend({},this.getDefaults(),e,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=n(t.template,t.whiteList,t.sanitizeFn)),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t=g.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),n=this.getUID(this.type);this.setContent(),o.attr("id",n),this.$element.attr("aria-describedby",n),this.options.animation&&o.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(s);r&&(s=s.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?o.appendTo(g(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),h=o[0].offsetWidth,d=o[0].offsetHeight;if(r){var p=s,c=this.getPosition(this.$viewport);s="bottom"==s&&l.bottom+d>c.bottom?"top":"top"==s&&l.top-d<c.top?"bottom":"right"==s&&l.right+h>c.width?"left":"left"==s&&l.left-h<c.left?"right":s,o.removeClass(p).addClass(s)}var f=this.getCalculatedOffset(s,l,h,d);this.applyPlacement(f,s);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};g.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",u).emulateTransitionEnd(m.TRANSITION_DURATION):u()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),t.top+=s,t.left+=a,g.offset.setOffset(i[0],g.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var d=/top|bottom/.test(e),p=d?2*h.left-o+r:2*h.top-n+l,c=d?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][c],d)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=n(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type);function n(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:g(window).width(),height:g(window).height()}:null;return g.extend({},o,a,r,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},m.prototype.sanitizeHtml=function(t){return n(t,this.options.whiteList,this.options.sanitizeFn)};var e=g.fn.tooltip;g.fn.tooltip=function i(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=e,this}}(jQuery),function(n){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.1",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var o=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===o&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===o?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=n.fn.popover;n.fn.popover=function e(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict";function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.4.1",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(n[t+1]===undefined||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=s(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=s.fn.scrollspy;s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),n=r.Event("hide.bs.tab",{relatedTarget:t[0]}),s=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(n),t.trigger(s),!s.isDefaultPrevented()&&!n.isDefaultPrevented()){var a=r(document).find(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e);var i=this.options.target===h.DEFAULTS.target?l(this.options.target):l(document).find(this.options.target);this.$target=i.on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.4.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return n<i&&"top";if("bottom"==this.affixed)return null!=i?!(n+this.unpin<=s.top)&&"bottom":!(n+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?n:s.top;return null!=i&&n<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var s=this.getState(n,t,i,o);if(this.affixed!=s){null!=this.unpin&&this.$element.css("top","");var a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);
function getAveragesParams() {
    // post params
    var params = {};

    // start of last week (Monday)
    params.averagesDate = get_previous_week();

    return { post: params };
}


// Update the information from the server
function updateAverages(spreads_type, instance ){

    var instance = instance || '-1';
    //This change every 10 minutes
    var cache_ajax = nearestMinutes();

    // API URL
    var API_URL = 'https://secure.activtrades.com/dynamicdata/spreads/';

    // Setup parameters
    var params = getAveragesParams();
    var spreads_url_ext = '';

    // Set extention to API URL based upon type
    switch(spreads_type){
        case "cfds":
        case "metals-cfds":
            spreads_url_ext = "CFD";
            break;
        case "cash_cfd":
            spreads_url_ext = "CashCFD";
            break;
        case "forex":
        default:
            spreads_url_ext = "";
            break;
    }

    if( params.post.hasOwnProperty('averagesDate') ) {
        API_URL += 'GetAverage' + spreads_url_ext + 'SpreadsPerWeek/' + params.post.averagesDate;
    }

    jQuery.ajaxSetup({ cache: false });

    // Make the ajax call
    jQuery.ajax({
        url: API_URL + '?_c='+cache_ajax,
        timeout: 90000,
        success: function (result) {
            var averages =  jQuery.parseJSON(JSON.stringify(result));
            $.each(averages, function (key, value) {
                if( key.indexOf('/') === -1 ){
                    var $averagesDiv = $("#" + key + instance+ "_average");

                    if (spreads_type == "forex"){
                        $averagesDiv.text(value.toFixed(2) + " PIPS");
                    } else {
                        // 4 digits for Gasol
                        if ( key === 'GASOL' ){
                            $averagesDiv.text(value.toFixed(4));
                        }else{
                            $averagesDiv.text(value.toFixed(2));
                        }
                    }
                }
            });
        },
        error: function (req, status, error) {
            // Error handling

        }
    });
}

var symbol = jQuery('#symbols').parent().find('button').text().trim().replace('/', '');

function getLastWeekParams() {
    // post params
    var params = {};

    // start of last week (Monday), plus the index of the dropdown (0 = Monday)
    params.lastWeeksDate = get_previous_week(dayOfWeek);
    params.symbol = symbol;

    return { post: params };
}

// Update the information from the server
function updateAveragesSession(spreads_type, instance, suffix ){

    var instance = instance || '-1';
    var suffix = suffix || '';
    //This change every 10 minutes
    var cache_ajax = nearestMinutes();

    // API URL
    var API_URL = 'https://secure.activtrades.com/dynamicdata/spreads/';

    // Setup parameters
    var params = getAveragesParams();

    // Set extention to API URL based upon type

    if( params.post.hasOwnProperty('averagesDate') ) {
        API_URL += 'GetAverageCFDSpreadsPerWeekPerSession/'+ params.post.averagesDate;
    }

    jQuery.ajaxSetup({ cache: false });

    // Make the ajax call
    jQuery.ajax({
        url: API_URL + '?_c='+cache_ajax,
        timeout: 90000,
        success: function (result) {
            var averagesObject =  jQuery.parseJSON(JSON.stringify(result));
            if(spreads_type == 'cfds'){
                var $tables = $('.spreads_groups');
                console.log('table count: '+$tables.length);
                var $cashIndicesSymbolHeading = $tables.eq(0).find('.table-head.spreads_row').find('.symbol-heading');
                console.log('table symbol head count: '+$cashIndicesSymbolHeading.length);
                if($cashIndicesSymbolHeading.hasClass('cash-indices-heading')){
                    spreads_type = 'cash-cfd';
                    renderAveragesValue(averagesObject, spreads_type, instance, '');
                    renderAveragesValue(averagesObject, 'cfds', instance, suffix);
                } 
            } else {
                renderAveragesValue(averagesObject, spreads_type, instance, suffix);
            }
            
            
        },
        error: function (req, status, error) {
            // Error handling

        }
    });
}

function renderAveragesValue(averagesObject, spreads_type, instance, suffix){
    var type = '';

    switch(spreads_type){
        case "cfds":
        case "metals-cfds":
            type = 'Indices';
            break;
        case "cash-cfd":
            type = 'CashIndices';
            break;
        case "forex":
        default:
            break;
    }
    var specials = ['USAIND', 'GER30', 'USATEC', 'UK100', 'USA500', 'EURO50'];
    var normalText = {
        en:'Normal',
        fr:'Normal',
        es:'Normal',
        cn:'平时',
        hk:'平時',
        tw:'平時',
        bg:'Нормално',
        it:'Normale',
        ru:'Нормальный',
        de:'Normal',
        ar:'العادي',
        pt:'Normal'
    }
    var nightText = {
        en:'Night',
        fr:'Unnateral',
        es:'Noche',
        cn:'夜间',
        hk:'夜間',
        tw:'夜間',
        bg:'Извънредно',
        it:'Notte',
        ru:'Ночной',
        de:'Nachts',
        ar:'خلال الليل',
        pt:'Noite'
    }

    var exchangeText = {
        en:'Exchange hours',
        fr:'Horaire local',
        es:'Horariode mercado',
        cn:'交易时段',
        hk:'交易時段',
        tw:'交易時段',
        bg:'Борсови часове',
        it:'A marcato aperto',
        ru:'В часы работы биржи',
        de:'Handelszeiten',
        ar:'أوقات البورصة',
        pt:'Horário de bolsa',
        ms:'Jam bursa'
    }
    
    var allOtherText = {
        en:'All other times',
        fr:'Tous les autres horaires',
        es:'Horario fuera de mercado',
        cn:'其它时段',
        hk:'其它時段',
        tw:'其它時段',
        bg:'Други часове',
        it:'Dopo la chiusura regolare',
        ru:'В другое время',
        de:'Alle anderen',
        ar:'باقي الأوقات',
        pt:'Fora o horário de bolsa',
        ms:'Semua masa lain'
    }

    if (spreads_type === 'cfds' || spreads_type === 'cash-cfd'){
        $.each(averagesObject[type], function(key, value){
            console.log("#" + key + suffix + instance+ "_average");
            if( ~~key.indexOf('/') ){
                // get the averages div
                var $averagesSessionValueDiv = $("#" + key + suffix + instance+ "_average");
                console.log("#" + key + suffix + instance+ "_average");
                var sessionValueHTML = '-';
                // get the values from the JSON array 
                var averagesDayVal = findSiblingInArray('Session', 'Normal', 'AverageSpread', value, '-');
                var averagesNightVal = findSiblingInArray('Session', 'Night', 'AverageSpread', value, '-');
                var averagesTotalValue = findSiblingInArray('Session', 'Total', 'AverageSpread', value, '-');

                if(key === 'HKIND'){
                        averagesDayVal = findSiblingInArray('Session', 'Exchange hours', 'AverageSpread', value, '-');
                        averagesNightVal = findSiblingInArray('Session', 'All other times', 'AverageSpread', value, '-');
                    }

                if (spreads_type == "forex"){
                    // add PIPS for forex, use 2 decial places
                    if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(2) + 'PIPS';
                    if(averagesNightVal !== '-') averagesNightVal = parseFloat(averagesNightVal).toFixed(2) + 'PIPS';
                    if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(2) + 'PIPS';
                }else {
                    // use 4 decimal places for GASOL
                    if ( key === 'GASOL' ){
                        // use 4 decimal places for GASOL
                        if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(4);
                        if(averagesNightVal !== '-')averagesNightVal = parseFloat(averagesNightVal).toFixed(4);
                        if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(4);
                    } else {
                        // default, 2 decimal places
                        if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(2);
                        if(averagesNightVal !== '-') averagesNightVal = parseFloat(averagesNightVal).toFixed(2);
                        if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(2);
                    }
                }
                // if the key is in the array of special symbols or metals
                if($.inArray(key, specials) !== -1){
                    // build the HTML with the extra data
                    sessionValueHTML =  normalText[activtrades_lang]+': '+averagesDayVal+'<br>'+nightText[activtrades_lang]+': '+averagesNightVal;
                    // add a class to the other elements in the row, so we can adjust for the wider row
                    $averagesSessionValueDiv.siblings().addClass('special-row');
                } else {
                    // default html to be inserted
                    sessionValueHTML = normalText[activtrades_lang]+': '+averagesTotalValue;
                    if(spreads_type == 'metals-cfds'){
                        sessionValueHTML = averagesTotalValue;
                    }

                    if(key === 'HKIND'){
                        $averagesSessionValueDiv.siblings().addClass('special-row');
                        sessionValueHTML =  exchangeText[activtrades_lang]+': '+averagesDayVal+'<br>'+allOtherText[activtrades_lang]+': '+averagesNightVal;
                    }
                }
                // insert the html
                $averagesSessionValueDiv.html(sessionValueHTML);

            }
        });
    } else {
        var CommoditiesSubTypes = ['Indices', 'SpotEnergiesIndices'];
        $.each(CommoditiesSubTypes, function(subIndex, subCommodity){
            if(subCommodity === 'Indices'){
                suffix = 'MMMYY';
            }

            if(subCommodity === 'SpotEnergiesIndices'){
                suffix = '';
            }

            $.each(averagesObject[subCommodity], function(key, value){
                console.log("#" + key + suffix + instance+ "_average");
                if( ~~key.indexOf('/') ){
                    // get the averages div
                    var $averagesSessionValueDiv = $("#" + key + suffix + instance+ "_average");
                    console.log("#" + key + suffix + instance+ "_average");
                    var sessionValueHTML = '-';
                    // get the values from the JSON array 
                    var averagesDayVal = findSiblingInArray('Session', 'Normal', 'AverageSpread', value, '-');
                    var averagesNightVal = findSiblingInArray('Session', 'Night', 'AverageSpread', value, '-');
                    var averagesTotalValue = findSiblingInArray('Session', 'Total', 'AverageSpread', value, '-');

                    if (spreads_type == "forex"){
                        // add PIPS for forex, use 2 decial places
                        if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(2) + 'PIPS';
                        if(averagesNightVal !== '-') averagesNightVal = parseFloat(averagesNightVal).toFixed(2) + 'PIPS';
                        if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(2) + 'PIPS';
                    }else {
                        // use 4 decimal places for GASOL
                        if ( key === 'GASOL' ){
                            // use 4 decimal places for GASOL
                            if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(4);
                            if(averagesNightVal !== '-')averagesNightVal = parseFloat(averagesNightVal).toFixed(4);
                            if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(4);
                        } 
                        else if( key === 'NGAS'){
                            // 3 decimal places for NGAS
                            if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(3);
                            if(averagesNightVal !== '-')averagesNightVal = parseFloat(averagesNightVal).toFixed(3);
                            if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(3);
                        }
                        else {
                            // default, 2 decimal places
                            if(averagesDayVal !== '-') averagesDayVal = parseFloat(averagesDayVal).toFixed(2);
                            if(averagesNightVal !== '-') averagesNightVal = parseFloat(averagesNightVal).toFixed(2);
                            if(averagesTotalValue !== '-') averagesTotalValue = parseFloat(averagesTotalValue).toFixed(2);
                        }
                    }
                    // if the key is in the array of special symbols or metals
                    if($.inArray(key, specials) !== -1){
                        // build the HTML with the extra data
                        sessionValueHTML =  normalText[activtrades_lang]+': '+averagesDayVal+'<br>'+nightText[activtrades_lang]+': '+averagesNightVal;
                        // add a class to the other elements in the row, so we can adjust for the wider row
                        $averagesSessionValueDiv.siblings().addClass('special-row');
                    } else {
                        // default html to be inserted
                        sessionValueHTML = normalText[activtrades_lang]+': '+averagesTotalValue;
                        if(spreads_type == 'metals-cfds'){
                            sessionValueHTML = averagesTotalValue;
                        }
                    }
                    // insert the html
                    $averagesSessionValueDiv.html(sessionValueHTML);

                }
            });
        });
    }
}




/**
 * simple lookup function for finding siblings in an array
 * @param {string} lookupFieldTitle  the name of the field in the array
 * @param {string} lookupValue  the value of the field in the array you want to find
 * @param {string} targetField  the name of sibling field in the array whos value you wish to return
 * @param {Array} array  the json array
 * @param {string} returnCharacter  the default return character if the function cannot find the look up field
 * 
 * @return {String} returns the found value from the array
 */
function findSiblingInArray(lookupFieldTitle, lookupValue, targetField, array, returnCharacter) {
    var returnValue = returnCharacter;
    for(var i = 0; i < array.length; i++) {
        if(array[i][lookupFieldTitle] == lookupValue && array[i].hasOwnProperty(targetField)) {
            returnValue = array[i][targetField];
        }
    }
    return returnValue;
}

var leverage = 400;
if(isCorp() && jQuery('.pro-page').length == 0){
    leverage = 200;
}

var Loading = (function loading() {

    var $pageContent = jQuery(".page-content");
    var $loading = jQuery("#loading");

    return {
        show: function() { 
            $pageContent.addClass("inactive"); 
            $loading.addClass("loading").show();
            $loading.html("<div class='container'><div class='loader'></div><div class='col-xs-12 loading-label'>Loading</div></div>");
        },
        hide: function() { 
            $pageContent.removeClass("inactive"); 
            $loading.removeClass("loading").hide();
        }
    }
})();

function updateLeverage(instance, suffix) {

    var instance = instance || '_1';
    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: "https://secure.activtrades.com/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();
            // console.log('Got result: leverage');
            //Store initial leverage value
            var initialLeverage = leverage;

            if( indices != null && typeof indices == 'object'){

                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;
                    var symbol = value.Symbol.substring(0, rawSymbol.length - 5);
                        //reset to initial leverage 
                        leverage = initialLeverage;
                        
                        if(symbol.toLowerCase() == "bra50") {
                            //Bra50 Obj will override the default leverage accordingly
                            // 400->150 , 200->75, 100->37.5
                            var bra50LevObj = {
                                'l400' : 150,
                                'l200' : 75,
                                'l100' : 37.5,
                            };

                            //if initial leverage exists in the bra50LevObj key
                            if(bra50LevObj.hasOwnProperty('l'+ leverage)) {
                                var bra50key = 'l' + leverage;
                                leverage = bra50LevObj[bra50key];
                            }
                        }

                        if (symbol.toLowerCase() == "neth25") {
                            //neth25 Obj will override the default leverage accordingly
                            // 400->50 , 200->25, 100->12.5
                            var neth25LevObj = {
                                'l400': 50,
                                'l200': 25,
                                'l100': 12.5,
                            };

                            //if initial leverage exists in the neth25LevObj key
                            if (neth25LevObj.hasOwnProperty('l' + leverage)) {
                                var neth25key = 'l' + leverage;
                                leverage = neth25LevObj[neth25key];
                            }
                        }
                    
                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();


                        var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                        var closePrice = value.ClosePrice;
                        var dayTrading = (closePrice * point) / leverage;
                        var hedged = dayTrading / 10;
                        jQuerydayTradingDiv.html("£" + numberWithCommas(dayTrading.toFixed(2)));
                        jQueryhedgedDiv.html("£" + numberWithCommas(hedged.toFixed(2)));
                });

            }
        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}

function updateCFDs(instance, suffix) {
    // jQuery.ajaxSetup({ cache: true });
    // console.log('Updating CFDs');
    // console.log('Sending request: CFDs');
    var instance = instance || '_1';
    var suffix = suffix || '';

    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: "https://secure.activtrades.com/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();

            if( indices != null && typeof indices == 'object'){
                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;
                    var symbol = value.Symbol.substring(0, rawSymbol.length - 5);
                    var multiplier = 1.0;
                    if (symbol.toLowerCase() == 'ind50') {
                        multiplier = 4;
                    }
                    if (symbol.toLowerCase() == 'hkind') {
                        multiplier = 16;
                    }

                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        // console.log(jQuerysymbolDiv);
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var jQuerymaxLeverageDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_max-leverage");
                        var jQuerycalculator = jQuerysymbolDiv.parent().find('.num');
                        var leverage_selected = jQuery('table.leverage-choice input:checked').val();

                        if(jQuerycalculator.length == 1) {
                            multiplier = jQuerycalculator.text() * 1;
                            multiplier = multiplier ? multiplier : 1;
                        }

                        if (jQuerydayTradingDiv.size() > 0) {
                            // console.log(jQuerydayTradingDiv.html().split(" "));
                            var jQuerydayTradingDivUnit = jQuerydayTradingDiv.html().split(" ")[1];
                            if (jQuerydayTradingDivUnit == 'undefined'){
                                jQuerydayTradingDivUnit = "";
                            }

                            var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();
                            var jQueryhedgedDivUnit = jQueryhedgedDiv.html().split(" ")[1];
                            if (jQueryhedgedDivUnit == 'undefined'){
                                jQueryhedgedDivUnit = "";
                            }

                            var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                            var jQuerypointsDivUnit = jQuerypointsDiv.html().split(" ")[1];
                            if (jQuerypointsDivUnit == 'undefined'){
                                jQuerypointsDivUnit = "";
                            }

                            var closePrice = value.ClosePrice;
                            var marginRequirement = (closePrice * point) / leverage * multiplier;
                            var hedged = marginRequirement / 10;
                            jQuerydayTradingDiv.html(numberWithCommas(marginRequirement.toFixed(2)) + " " + jQuerydayTradingDivUnit);
                            jQueryhedgedDiv.html(numberWithCommas(hedged.toFixed(2)) + " " + jQueryhedgedDivUnit);

                            //BRA50 Max Leverage to 1 decimal place when radio btn '1:100' is selected
                            if(isCorp() && symbol.toLowerCase() == 'bra50' && leverage_selected == 100) {
                                jQuerymaxLeverageDiv.html('1:' + Number.parseInt(leverage_selected.trim() / multiplier) );
                            } else if (isCorp() && symbol.toLowerCase() == 'bra50' && leverage_selected == 50) {
                                jQuerymaxLeverageDiv.html('1:' + Number.parseFloat(leverage_selected.trim() / multiplier).toFixed(1) );
                            } else if (symbol.toLowerCase() == 'bra50' && leverage_selected == 100) {
                                jQuerymaxLeverageDiv.html('1:' + Number.parseFloat(leverage_selected.trim() / multiplier).toFixed(1) );
                            } else if ( leverage_selected !== undefined && jQuerymaxLeverageDiv.length === 1) {
                                jQuerymaxLeverageDiv.html('1:' + Math.round(leverage_selected.trim() / multiplier) );
                            }

                            if(jQuery('.pro-page').length !== 0 && symbol.toLowerCase() == 'hkind'){
                                if(leverage_selected == 400){
                                    jQuerymaxLeverageDiv.html('1:100');
                                }
                                if(leverage_selected == 200){
                                    jQuerymaxLeverageDiv.html('1:50');
                                }
                                if(leverage_selected == 100){
                                    jQuerymaxLeverageDiv.html('1:25');
                                }
                                if(leverage_selected == 50){
                                    jQuerymaxLeverageDiv.html('1:12.5');
                                }
                            }
                            
                        }

                });
            }

        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}
/**
 * same functionality as updateCFDs function, 
 * except rather than using the selected leverage this function takes the leverage from the max-leverage column 
 */
function updateRetailTable(instance, type, suffix) {
    // jQuery.ajaxSetup({ cache: true });
    // console.log('Updating CFDs');
    // console.log('Sending request: CFDs');
    var instance = instance || '_1';
    var suffix = suffix || '';
    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: "https://secure.activtrades.com/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();

            if( indices != null && typeof indices == 'object'){
                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;
                    var symbol = value.Symbol.substring(0, rawSymbol.length - 5);

                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        // console.log(jQuerysymbolDiv);
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var leverage = parseInt(jQuery("#" + symbol.toUpperCase() + suffix + instance + "_max-leverage").text().split(':').pop());

                        if (jQuerydayTradingDiv.size() > 0) {
                            // console.log(jQuerydayTradingDiv.html().split(" "));
                            var jQuerydayTradingDivUnit = jQuerydayTradingDiv.html().split(" ")[1];
                            if (jQuerydayTradingDivUnit == undefined){
                                jQuerydayTradingDivUnit = "";
                            }

                            var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();
                            var jQueryhedgedDivUnit = jQueryhedgedDiv.html().split(" ")[1];
                            if (jQueryhedgedDivUnit == 'undefined'){
                                jQueryhedgedDivUnit = "";
                            }

                            var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                            var jQuerypointsDivUnit = jQuerypointsDiv.html().split(" ")[1];
                            if (jQuerypointsDivUnit == 'undefined'){
                                jQuerypointsDivUnit = "";
                            }

                            var closePrice = value.ClosePrice;
                            var marginRequirement = (closePrice * point) / leverage;
                            var hedged = marginRequirement / 10;

                            if (type == 'margins') {
                                jQuerydayTradingDiv.html(numberWithCommas(marginRequirement.toFixed(2)) + " " + jQuerydayTradingDivUnit);
                                jQueryhedgedDiv.html(numberWithCommas(hedged.toFixed(2)) + " " + jQueryhedgedDivUnit);
                            }
                            if (type == 'spreadbetting'){
                                jQuerydayTradingDiv.html('£ ' + numberWithCommas(marginRequirement.toFixed(2)));
                                jQueryhedgedDiv.html('£ ' + numberWithCommas(hedged.toFixed(2)));
                            }

                        }

                });
            }

        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}


function updateCFDCommodities(instance) {
    // jQuery.ajaxSetup({ cache: true });
    // console.log('Updating CFDs');
    // console.log('Sending request: CFDs');
    var instance = instance || '_1';

    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: _at.paDomain+"/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();

            if( indices != null && typeof indices == 'object'){
                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;

                    var symArray = rawSymbol.split('');
                    //console.log('this one', rawSymbol);
                    var symbol = rawSymbol;
                    var suffix = '';

                    if(is_numeric(symArray[symArray.length - 1] ) 
                            && is_numeric(symArray[symArray.length - 2] ) 
                            && is_month('' + symArray[symArray.length - 5] 
                                + symArray[symArray.length - 4] 
                                + symArray[symArray.length - 3] )
                    ){
                        symbol = value.Symbol.substring(0, rawSymbol.length - 5);
                        suffix = 'MMMYY';
                    }
                    
                    var multiplier = 1.0;
                    if (symbol.toLowerCase() == 'ind50') {
                        multiplier = 4;
                    }
                    if (symbol.toLowerCase() == 'hkind') {
                        multiplier = 16;
                    }

                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        // console.log(jQuerysymbolDiv);
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var jQuerymaxLeverageDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_max-leverage");
                        var jQuerycalculator = jQuerysymbolDiv.parent().find('.num');
                        var leverage_selected = jQuery('table.leverage-choice input:checked').val();

                        if(jQuerycalculator.length == 1) {
                            multiplier = jQuerycalculator.text() * 1;
                            multiplier = multiplier ? multiplier : 1;
                        }

                        if (jQuerydayTradingDiv.size() > 0) {
                            // console.log(jQuerydayTradingDiv.html().split(" "));
                            var jQuerydayTradingDivUnit = jQuerydayTradingDiv.html().split(" ")[1];
                            if (jQuerydayTradingDivUnit == 'undefined'){
                                jQuerydayTradingDivUnit = "";
                            }

                            var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();
                            var jQueryhedgedDivUnit = jQueryhedgedDiv.html().split(" ")[1];
                            if (jQueryhedgedDivUnit == 'undefined'){
                                jQueryhedgedDivUnit = "";
                            }

                            var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                            var jQuerypointsDivUnit = jQuerypointsDiv.html().split(" ")[1];
                            if (jQuerypointsDivUnit == 'undefined'){
                                jQuerypointsDivUnit = "";
                            }

                            var closePrice = value.ClosePrice;
                            var marginRequirement = (closePrice * point) / leverage * multiplier;
                            var hedged = marginRequirement / 10;
                            jQuerydayTradingDiv.html(numberWithCommas(marginRequirement.toFixed(2)) + " " + jQuerydayTradingDivUnit);
                            jQueryhedgedDiv.html(numberWithCommas(hedged.toFixed(2)) + " " + jQueryhedgedDivUnit);

                            //BRA50 Max Leverage to 1 decimal place when radio btn '1:100' is selected
                            if (symbol.toLowerCase() == 'bra50' && leverage_selected == 100) {
                                jQuerymaxLeverageDiv.html('1:' + Number.parseFloat(leverage_selected.trim() / multiplier).toFixed(1) );
                            } else if ( leverage_selected !== undefined && jQuerymaxLeverageDiv.length === 1) {
                                jQuerymaxLeverageDiv.html('1:' + Math.round(leverage_selected.trim() / multiplier) );
                            }
                            
                        }

                });
            }

        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}


function updateCommoditiesLeverage(instance) {

    var instance = instance || '_1';
    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: _at.paDomain+"/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();
            // console.log('Got result: leverage');
            //Store initial leverage value
            var initialLeverage = leverage;

            if( indices != null && typeof indices == 'object'){

                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;
                    var symArray = rawSymbol.split('');
                    //console.log('this one', rawSymbol);
                    var symbol = rawSymbol;
                    var suffix = '';

                    if(is_numeric(symArray[symArray.length - 1] ) 
                            && is_numeric(symArray[symArray.length - 2] ) 
                            && is_month('' + symArray[symArray.length - 5] 
                                + symArray[symArray.length - 4] 
                                + symArray[symArray.length - 3] )
                    ){
                        symbol = value.Symbol.substring(0, rawSymbol.length - 5);
                        suffix = 'MMMYY';
                    }
                        //reset to initial leverage 
                        leverage = initialLeverage;
                        
                        if(symbol.toLowerCase() == "bra50") {
                            //Bra50 Obj will override the default leverage accordingly
                            // 400->150 , 200->75, 100->37.5
                            var bra50LevObj = {
                                'l400' : 150,
                                'l200' : 75,
                                'l100' : 37.5,
                            };

                            //if initial leverage exists in the bra50LevObj key
                            if(bra50LevObj.hasOwnProperty('l'+ leverage)) {
                                var bra50key = 'l' + leverage;
                                leverage = bra50LevObj[bra50key];
                            }
                        }

                        if(symbol.toLowerCase() == "gasol" ||
                            symbol.toLowerCase() == "lcrude" ||
                            symbol.toLowerCase() == "brent" ||
                            symbol.toLowerCase() == "ngas"
                          ) {
                            //gasol, lcrude, brent, ngas Objects will override the default leverage accordingly
                            // 400->50 , 200->25, 100->13
                            var energiesLevObj = {
                                'l400' : 50,
                                'l200' : 25,
                                'l100' : 12.5,
                                'l50'  : 6.25,
                            };

                            //if initial leverage exists in the energiesLevObj key
                            if(energiesLevObj.hasOwnProperty('l'+ leverage)) {
                                var energiesKey = 'l' + leverage;
                                leverage = energiesLevObj[energiesKey];
                            }
                        }
                    
                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();


                        var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                        var closePrice = value.ClosePrice;
                        var dayTrading = (closePrice * point) / leverage;
                        var hedged = dayTrading / 10;
                        jQuerydayTradingDiv.html("£" + numberWithCommas(dayTrading.toFixed(2)));
                        jQueryhedgedDiv.html("£" + numberWithCommas(hedged.toFixed(2)));
                });

            }
        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}

function updateCommoditiesRetailTable(instance, type) {
    // jQuery.ajaxSetup({ cache: true });
    // console.log('Updating CFDs');
    // console.log('Sending request: CFDs');
    var instance = instance || '_1';
    var suffix = suffix || '';
    Loading.show();
    // Make the ajax call
    jQuery.ajax({
        url: _at.paDomain+"/capi/api/symbols/indices",
        timeout: 90000,
        dataType: "json",
        async: true,
        success: function (indices) {
            Loading.hide();

            if( indices != null && typeof indices == 'object'){
                jQuery.each(indices, function (key, value) {
                    var rawSymbol = value.Symbol;
                    var symArray = rawSymbol.split('');
                    //console.log('this one', rawSymbol);
                    var symbol = rawSymbol;
                    var suffix = '';

                    if(is_numeric(symArray[symArray.length - 1] ) 
                            && is_numeric(symArray[symArray.length - 2] ) 
                            && is_month('' + symArray[symArray.length - 5] 
                                + symArray[symArray.length - 4] 
                                + symArray[symArray.length - 3] )
                    ){
                        symbol = value.Symbol.substring(0, rawSymbol.length - 5);
                        suffix = 'MMMYY';
                    }

                        var jQuerysymbolDiv = jQuery("#" + symbol.toLowerCase() + suffix + instance + "_symbol");
                        if (jQuerysymbolDiv.size() == 0) {
                            jQuerysymbolDiv = jQuery("#" + symbol.toUpperCase() + suffix + instance + "_symbol");
                        }
                        // console.log(jQuerysymbolDiv);
                        var jQuerypointsDiv = jQuerysymbolDiv.next();
                        var jQuerydayTradingDiv = jQuerypointsDiv.next().next();
                        var leverage = parseInt(jQuery("#" + symbol.toUpperCase() + suffix + instance + "_max-leverage").text().split(':').pop());

                        if (jQuerydayTradingDiv.size() > 0) {
                            // console.log(jQuerydayTradingDiv.html().split(" "));
                            var jQuerydayTradingDivUnit = jQuerydayTradingDiv.html().split(" ")[1];
                            if (jQuerydayTradingDivUnit == undefined){
                                jQuerydayTradingDivUnit = "";
                            }

                            var jQueryhedgedDiv = jQuerypointsDiv.next().next().next();
                            var jQueryhedgedDivUnit = jQueryhedgedDiv.html().split(" ")[1];
                            if (jQueryhedgedDivUnit == 'undefined'){
                                jQueryhedgedDivUnit = "";
                            }

                            var point = jQuerypointsDiv.text().replace(/[^\d.]/g, '');
                            var jQuerypointsDivUnit = jQuerypointsDiv.html().split(" ")[1];
                            if (jQuerypointsDivUnit == 'undefined'){
                                jQuerypointsDivUnit = "";
                            }

                            var closePrice = value.ClosePrice;
                            var marginRequirement = (closePrice * point) / leverage;
                            var hedged = marginRequirement / 10;

                            if (type == 'spreadbetting'){
                                jQuerydayTradingDiv.html('£ ' + numberWithCommas(marginRequirement.toFixed(2)));
                                jQueryhedgedDiv.html('£ ' + numberWithCommas(hedged.toFixed(2)));
                            }
                            else if(type == 'margins'){
                                jQuerydayTradingDiv.html('$ ' + numberWithCommas(marginRequirement.toFixed(2)));
                                jQueryhedgedDiv.html('$ ' + numberWithCommas(hedged.toFixed(2)));
                            }

                        }

                });
            }

        },
        error: function (req, status, error) {
            // Error handling
        }
    });
}

/**
 * Do something if an element exist
 * @param  {[string]}   selector Pass the element selector: Like: .class | #selector | etc.. 
 * @param  {Function} callback
 * @run {[callback]} This function don't have any return
 */
function ifElementExist(selector, callback){
    var $element = jQuery(selector);
    if( $element.length > 0 ){
        if(typeof callback == "function") 
            callback($element);
    }
}

/**
 * Do something when one of these event is triggered
 * @event  change keypress focusout paste
 * @param  {[string]}   selector Pass the element selector: Like: .class | #selector | etc.. 
 * @param  {Function} callback
 */
function onElementChange(selector, callback){
    ifElementExist(selector, function(element){
        element.bind("change keypress focusout paste", callback);
    });
}

function checkRequired(field) {
    if( jQuery(field).is( "input[type='checkbox']" ) ){
        if( !jQuery(field).is(':checked') ) {
            jQuery(field).parent().parent().addClass('has-error');
        } else {
            jQuery(field).parent().parent().removeClass('has-error');
        }
    }else{
        var value = jQuery(field).val();

        if (value == "") {
            jQuery(field).parent().addClass('has-error');
        } else {
            jQuery(field).parent().removeClass('has-error');
        }
    }
}

var phoneRequired = false;
jQuery(document).ready(function () {
    $ = jQuery;

    var curPrefix;
    if($('#Country').length > 0) {
        getLocation(function(countryCode){
            /*Remove Israel if user come from "removeCountry" country*/
            var checkCountry = [ "SA", "AE", "BH", "QA", "KW", "OM" ];
            if( $.inArray( countryCode, checkCountry ) > -1){
                // alert("User come from: "+countryCode+" Removing IL..");
                var option_israel = $("#Country option[data-country-code='IL']");
                if( option_israel.length > 0 ){
                    option_israel.remove();
                }
            }

            // Select country based on the GEO IP
            if( $('#Country *[data-country-code="'+countryCode+'"]').length > 0 ){
                $('#Country').val($('#Country *[data-country-code="'+countryCode+'"]').val());

                curPrefix = $('#Country :selected').data('phone');

                $('#Phone').val(curPrefix);
            }

        });

    
        curPrefix = $('#Country :selected').data('phone');

        $('#Phone').val(curPrefix);
    }

    /** Start Unsubscribe email */
    onElementChange('#form_unsubscribe #email', function(){
        checkEmail("#form_unsubscribe #email");
        checkForm($(this).closest('form'));
    });

    //Check if form is valid
    $('#form_unsubscribe').submit(function(evt) {
        checkEmail("#form_unsubscribe #email");
        var valid = checkForm($(this));

        if(!valid) {
            evt.preventDefault();
        }

    });

    /** END Unsubscribe email */
    
    $('form').submit(function(evt) {

        //Check if phone is correct
        ifElementExist('#Phone', function(element){
            checkPhone('#Phone');
        });

        //Check if phone is correct
        ifElementExist('#IsGdprConsentProvided', function(element){
            checkRequired(element);
        });


        
        ifElementExist('#phone_related_prefix', function(element){
            checkPhonePrefix('#phone_related_prefix');
        });

        var valid = checkForm($(this));

        if(!valid) {
            evt.preventDefault();
        }

    });

    //Check FirstName
    onElementChange('#FirstName', function(e){
        AllowOnlyText(e);

        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //Check LastName
    onElementChange('#LastName', function(e){
        AllowOnlyText(e);

        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //Check RegEmail
    onElementChange('#RegEmail', function(){
        checkRequired(this);
        checkEmails(this);
        checkForm($(this).closest('form'));
    });

    //Check ConfirmEmail
    onElementChange('#ConfirmEmail', function(){
        checkRequired(this);
        checkEmails(this);
        checkForm($(this).closest('form'));
    });

    //Enquiry
    if( $('#Password').length > 0 ){
        var firstPasswordChange = 0;
        $('#Password').bind('keyup',function () {
            if( firstPasswordChange > 0 ){
                checkRequired(this);
                checkPassword(this);
                checkForm($(this).closest('form'));
            }
            // firstPasswordChange++;
        });

        $('#Password').bind('focusout',function () {
            checkRequired(this);
            checkPassword(this);
            checkForm($(this).closest('form'));
            firstPasswordChange++;
        });
    }
    
    //Check Phone
    var firstPhoneChange = 0;
    onElementChange('#Phone', function(e){
        AllowOnlyNumber(e);
        checkRequired(this);
        checkPhone(this);
        checkForm($(this).closest('form'));
    
        firstPhoneChange++;
    });

    $("#IsGdprConsentProvided").change(function() {
       checkRequired("#IsGdprConsentProvided");
    });


    //Check Phone
    onElementChange('#phone_related_prefix', function(e){
        AllowOnlyNumber(e);
        checkRequired(this);
        checkPhonePrefix(this);
        checkForm($(this).closest('form'));    
    });
    
    //Enquiry
    $('#Enquiry').focusout(function () {
        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //Country
    $('#Country').change(function() {
         var $phone = $('#Phone');

         if($phone.length > 0 && ($phone.val() === '' || $phone.val() === curPrefix)) {
            curPrefix = $('#Country :selected').data('phone');

            $phone.val(curPrefix);
         }
    });

    //prediction-input-1
    $('#prediction-input-1').focusout(function(){
        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //prediction-input-2
    $('#prediction-input-2').focusout(function(){
        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //prediction-input-1
    $('#prediction-input-1').keypress(function(e){
        var numRegex = new RegExp('[0-9]');
        var key = e.which ? e.which : e.keyCode;

        if( keyExceptions(key)) {
            return;
        }
        //Now, convert keycode to string
        var keyStr = String.fromCharCode(key);

        if( !validateRegex(numRegex, keyStr) ){
            e.preventDefault();
        }
    });

    //prediction-input-2
    $('#prediction-input-2').keypress(function(e){
        var numRegex = new RegExp('[0-9]');
        var key = e.which ? e.which : e.keyCode;

        if( keyExceptions(key)) {
            return;
        }
        //Now, convert keycode to string
        var keyStr = String.fromCharCode(key);

        if( !validateRegex(numRegex, keyStr) ){
            e.preventDefault();
        }
    });

    //Date of Birth - come back to this
    $('.dob').focusout(function(){
        checkRequired(this);
        checkForm($(this).closest('form'));
    });

    //radio button serminar to attend
    $('input[type="radio"].seminar-radio-btns').focusout(function() {
        checkRadioBtnRequired(this);
        checkForm($(this).closest('form')); 
    });


    /**
     * If user enter a not text, space, dot or dash block the write
     * @param {[event]} e KeyPress event only
     */

    function AllowOnlyText(e){
        if( e.type == "keypress" ){
            // var regexp = /[\p{L}|\.|\-|\s]/i;
            var regexp = unicode_hack(/\p{L}|\.|\-|\s/g);
            if( e.key.match(regexp) == null ){
                e.preventDefault();
            }
        }
    }

    function isArabicText(text){
        var arregex = /[\u0600-\u06FF]/;
        return arregex.test(text);
    }

    /**
     * If user enter a not number block the write
     * @param {[event]} e KeyPress event only
     */
    function AllowOnlyNumber(e){
        if( e.type == "keypress" ){
            var numRegex = new RegExp('[0-9]');
            var keyWhich = e.which;
            //Now, convert keycode to string
            var keyStr = String.fromCharCode(keyWhich);

            if( !validateRegex(numRegex, keyStr) && !keyExceptions(keyWhich) ){
                e.preventDefault();
            }
        }
    }

    function validateRegex(numRegex, key){
        return numRegex.test(key)
    }

    function keyExceptions(key){
        // Left / Up / Right / Down Arrow, Backspace, Delete keys , tab key
        // Function needed for Mozilla Firefox
        if(key == 0 || key == 8) {
            return true;
        }
        return false;
    }

    function checkForm($form) {
        console.log('Number of errors', $form.find('.has-error').length);
        if($("#platform-refer").length > 0 && $("#platform-refer").val() != "") {
           $form.find('input[type="submit"]').attr('disabled', 'disabled');
            return false; 
        }
        if($form.find('.has-error').length > 0) {
            $form.find('input[type="submit"]').attr('disabled', 'disabled');
            return false;
        } else {
            console.log('removing attribute?');
            $form.find('input[type="submit"]').removeAttr('disabled');
            return true; 
        }
    }

    function checkEmail(field){
        var email = $(field).val();
        var pattEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( !pattEmail.test(email) ) {
            $(field).parent().addClass('has-error');
            // $(field).next('span.help-block').show();
        } else {
            $(field).parent().removeClass('has-error');
            // $(field).next('span.help-block').hide();
        }

    }

    function checkPassword(field){
        var password = $(field).val();
        var rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,22}$/;

        if( !rule.test(password) ){
            $(field).parent().addClass('has-error');
            $(field).next('span.help-block').show();
        }else{
            $(field).parent().removeClass('has-error');
            $(field).next('span.help-block').hide();
        }
    }

    function checkEmails(field) {
        var email = $('#RegEmail').val();
        var email_confirmation = $('#ConfirmEmail').length > 0 ? $('#ConfirmEmail').val() : false;
        var pattEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!email_confirmation){
            console.info("Check email 2");
            if( !pattEmail.test(email) ){
                $(field).parent().addClass('has-error');
                $(field).next('span.help-block').show();
            }else{
                $(field).parent().removeClass('has-error');
                $(field).next('span.help-block').hide();
            }
        }

        if (!email_confirmation || email == "" || email_confirmation == "") {
            return;
        }

        if (email != email_confirmation || !pattEmail.test(email)) {
            $(field).parent().addClass('has-error');
            $(field).next('span.help-block').show();
        } else {
            $(field).parent().removeClass('has-error');
            $(field).next('span.help-block').hide();
        }
    }

    function checkPhonePrefix(field, phoneRequired) {
        var phoneNumber = $(field).val();
        var patt = /^[0-9]{4,15}$$/;

        if( phoneRequired ){

            if( !patt.test(phoneNumber) ){
                $(field).parent().addClass('has-error');
                $(field).next('span.help-block').show();
            }

        }else{

            // Clean error if is empty
            if( phoneNumber.length == 0 ){

                $(field).parent().removeClass('has-error');
                $(field).next('span.help-block').hide();

            }else{

                if( !patt.test(phoneNumber) ){
                    $(field).parent().addClass('has-error');
                    $(field).next('span.help-block').show();
                }else{
                    $(field).parent().removeClass('has-error');
                    $(field).next('span.help-block').hide();
                }

            }

        }

    }

    function checkPhone(field) {
        var phoneNumber = $(field).val();
        var patt = /^([0]{2}|\+[0-9]{2,3})[0-9]{6,15}$/;
        var validPrefix = false;
        var countryExist = jQuery("#Country").length > 0 ? true : false;
        //Check if we have a "required" attr for Phone field
        phoneRequired = ($(field).attr('required'))? true : false;
        
        if(countryExist){
            jQuery.each(jQuery("#Country > option"),function(key,value){
                if( phoneNumber.indexOf(jQuery(value).data("phone") ) == 0){
                    validPrefix = true;
                    return false;
                }
            });
        }

        if (phoneRequired && !patt.test(phoneNumber)) {
            $(field).parent().addClass('has-error');
            $(field).next('span.help-block').show();
        } else if( countryExist && validPrefix == false){
            $(field).parent().addClass('has-error');
            $(field).next('span.help-block').show();
        }else{
            $(field).parent().removeClass('has-error');
            $(field).next('span.help-block').hide();
        }

    }

    function checkRadioBtnRequired(field) {
        var btnChecked = $(field).is(':checked');

        if (!btnChecked) {
            $(field).parents('.radio-btns').addClass('has-error');
        } else {
            $(field).parents('.radio-btns').removeClass('has-error');
        }
    }


    getParams();

});

// Code for grabing the params and parse it into our forms.
function getParams(){
    if (QueryString){
        // the essential params
        jQuery('input[name="EventType"]').val(QueryString.Type);
        jQuery('input[name="CampaignId"]').val(QueryString.CampaignId);
        jQuery('#Event option').text(QueryString.Name);
        jQuery('#Event option').val(QueryString.Name);
        // this is for the extra stuff
        jQuery('input[name="IBEmail"]').val(QueryString.IBEmail);
        jQuery('input[name="IntroducedBy"]').val(QueryString.IntroducedBy);
    }
}

var unicode_hack = (function() {
    /* Regexps to match characters in the BMP according to their Unicode category.
       Extracted from running all characters (code units) against Java's
       Character.getType. Source:
       https://ideone.com/04llh4
    */
    var unicodeCategories = {
        Cn:'[\u0378\u0379\u037f-\u0383\u038b\u038d\u03a2\u0528-\u0530\u0557\u0558\u0560\u0588\u058b-\u0590\u05c8-\u05cf\u05eb-\u05ef\u05f5-\u05ff\u0604\u0605\u061c\u061d\u070e\u074b\u074c\u07b2-\u07bf\u07fb-\u07ff\u082e\u082f\u083f\u085c\u085d\u085f-\u08ff\u0978\u0980\u0984\u098d\u098e\u0991\u0992\u09a9\u09b1\u09b3-\u09b5\u09ba\u09bb\u09c5\u09c6\u09c9\u09ca\u09cf-\u09d6\u09d8-\u09db\u09de\u09e4\u09e5\u09fc-\u0a00\u0a04\u0a0b-\u0a0e\u0a11\u0a12\u0a29\u0a31\u0a34\u0a37\u0a3a\u0a3b\u0a3d\u0a43-\u0a46\u0a49\u0a4a\u0a4e-\u0a50\u0a52-\u0a58\u0a5d\u0a5f-\u0a65\u0a76-\u0a80\u0a84\u0a8e\u0a92\u0aa9\u0ab1\u0ab4\u0aba\u0abb\u0ac6\u0aca\u0ace\u0acf\u0ad1-\u0adf\u0ae4\u0ae5\u0af0\u0af2-\u0b00\u0b04\u0b0d\u0b0e\u0b11\u0b12\u0b29\u0b31\u0b34\u0b3a\u0b3b\u0b45\u0b46\u0b49\u0b4a\u0b4e-\u0b55\u0b58-\u0b5b\u0b5e\u0b64\u0b65\u0b78-\u0b81\u0b84\u0b8b-\u0b8d\u0b91\u0b96-\u0b98\u0b9b\u0b9d\u0ba0-\u0ba2\u0ba5-\u0ba7\u0bab-\u0bad\u0bba-\u0bbd\u0bc3-\u0bc5\u0bc9\u0bce\u0bcf\u0bd1-\u0bd6\u0bd8-\u0be5\u0bfb-\u0c00\u0c04\u0c0d\u0c11\u0c29\u0c34\u0c3a-\u0c3c\u0c45\u0c49\u0c4e-\u0c54\u0c57\u0c5a-\u0c5f\u0c64\u0c65\u0c70-\u0c77\u0c80\u0c81\u0c84\u0c8d\u0c91\u0ca9\u0cb4\u0cba\u0cbb\u0cc5\u0cc9\u0cce-\u0cd4\u0cd7-\u0cdd\u0cdf\u0ce4\u0ce5\u0cf0\u0cf3-\u0d01\u0d04\u0d0d\u0d11\u0d3b\u0d3c\u0d45\u0d49\u0d4f-\u0d56\u0d58-\u0d5f\u0d64\u0d65\u0d76-\u0d78\u0d80\u0d81\u0d84\u0d97-\u0d99\u0db2\u0dbc\u0dbe\u0dbf\u0dc7-\u0dc9\u0dcb-\u0dce\u0dd5\u0dd7\u0de0-\u0df1\u0df5-\u0e00\u0e3b-\u0e3e\u0e5c-\u0e80\u0e83\u0e85\u0e86\u0e89\u0e8b\u0e8c\u0e8e-\u0e93\u0e98\u0ea0\u0ea4\u0ea6\u0ea8\u0ea9\u0eac\u0eba\u0ebe\u0ebf\u0ec5\u0ec7\u0ece\u0ecf\u0eda\u0edb\u0ede-\u0eff\u0f48\u0f6d-\u0f70\u0f98\u0fbd\u0fcd\u0fdb-\u0fff\u10c6-\u10cf\u10fd-\u10ff\u1249\u124e\u124f\u1257\u1259\u125e\u125f\u1289\u128e\u128f\u12b1\u12b6\u12b7\u12bf\u12c1\u12c6\u12c7\u12d7\u1311\u1316\u1317\u135b\u135c\u137d-\u137f\u139a-\u139f\u13f5-\u13ff\u169d-\u169f\u16f1-\u16ff\u170d\u1715-\u171f\u1737-\u173f\u1754-\u175f\u176d\u1771\u1774-\u177f\u17de\u17df\u17ea-\u17ef\u17fa-\u17ff\u180f\u181a-\u181f\u1878-\u187f\u18ab-\u18af\u18f6-\u18ff\u191d-\u191f\u192c-\u192f\u193c-\u193f\u1941-\u1943\u196e\u196f\u1975-\u197f\u19ac-\u19af\u19ca-\u19cf\u19db-\u19dd\u1a1c\u1a1d\u1a5f\u1a7d\u1a7e\u1a8a-\u1a8f\u1a9a-\u1a9f\u1aae-\u1aff\u1b4c-\u1b4f\u1b7d-\u1b7f\u1bab-\u1bad\u1bba-\u1bbf\u1bf4-\u1bfb\u1c38-\u1c3a\u1c4a-\u1c4c\u1c80-\u1ccf\u1cf3-\u1cff\u1de7-\u1dfb\u1f16\u1f17\u1f1e\u1f1f\u1f46\u1f47\u1f4e\u1f4f\u1f58\u1f5a\u1f5c\u1f5e\u1f7e\u1f7f\u1fb5\u1fc5\u1fd4\u1fd5\u1fdc\u1ff0\u1ff1\u1ff5\u1fff\u2065-\u2069\u2072\u2073\u208f\u209d-\u209f\u20ba-\u20cf\u20f1-\u20ff\u218a-\u218f\u23f4-\u23ff\u2427-\u243f\u244b-\u245f\u2700\u27cb\u27cd\u2b4d-\u2b4f\u2b5a-\u2bff\u2c2f\u2c5f\u2cf2-\u2cf8\u2d26-\u2d2f\u2d66-\u2d6e\u2d71-\u2d7e\u2d97-\u2d9f\u2da7\u2daf\u2db7\u2dbf\u2dc7\u2dcf\u2dd7\u2ddf\u2e32-\u2e7f\u2e9a\u2ef4-\u2eff\u2fd6-\u2fef\u2ffc-\u2fff\u3040\u3097\u3098\u3100-\u3104\u312e-\u3130\u318f\u31bb-\u31bf\u31e4-\u31ef\u321f\u32ff\u4db6-\u4dbf\u9fcc-\u9fff\ua48d-\ua48f\ua4c7-\ua4cf\ua62c-\ua63f\ua674-\ua67b\ua698-\ua69f\ua6f8-\ua6ff\ua78f\ua792-\ua79f\ua7aa-\ua7f9\ua82c-\ua82f\ua83a-\ua83f\ua878-\ua87f\ua8c5-\ua8cd\ua8da-\ua8df\ua8fc-\ua8ff\ua954-\ua95e\ua97d-\ua97f\ua9ce\ua9da-\ua9dd\ua9e0-\ua9ff\uaa37-\uaa3f\uaa4e\uaa4f\uaa5a\uaa5b\uaa7c-\uaa7f\uaac3-\uaada\uaae0-\uab00\uab07\uab08\uab0f\uab10\uab17-\uab1f\uab27\uab2f-\uabbf\uabee\uabef\uabfa-\uabff\ud7a4-\ud7af\ud7c7-\ud7ca\ud7fc-\ud7ff\ufa2e\ufa2f\ufa6e\ufa6f\ufada-\ufaff\ufb07-\ufb12\ufb18-\ufb1c\ufb37\ufb3d\ufb3f\ufb42\ufb45\ufbc2-\ufbd2\ufd40-\ufd4f\ufd90\ufd91\ufdc8-\ufdef\ufdfe\ufdff\ufe1a-\ufe1f\ufe27-\ufe2f\ufe53\ufe67\ufe6c-\ufe6f\ufe75\ufefd\ufefe\uff00\uffbf-\uffc1\uffc8\uffc9\uffd0\uffd1\uffd8\uffd9\uffdd-\uffdf\uffe7\uffef-\ufff8\ufffe\uffff]',
        Lu:'[\u0041-\u005a\u00c0-\u00d6\u00d8-\u00de\u0100\u0102\u0104\u0106\u0108\u010a\u010c\u010e\u0110\u0112\u0114\u0116\u0118\u011a\u011c\u011e\u0120\u0122\u0124\u0126\u0128\u012a\u012c\u012e\u0130\u0132\u0134\u0136\u0139\u013b\u013d\u013f\u0141\u0143\u0145\u0147\u014a\u014c\u014e\u0150\u0152\u0154\u0156\u0158\u015a\u015c\u015e\u0160\u0162\u0164\u0166\u0168\u016a\u016c\u016e\u0170\u0172\u0174\u0176\u0178\u0179\u017b\u017d\u0181\u0182\u0184\u0186\u0187\u0189-\u018b\u018e-\u0191\u0193\u0194\u0196-\u0198\u019c\u019d\u019f\u01a0\u01a2\u01a4\u01a6\u01a7\u01a9\u01ac\u01ae\u01af\u01b1-\u01b3\u01b5\u01b7\u01b8\u01bc\u01c4\u01c7\u01ca\u01cd\u01cf\u01d1\u01d3\u01d5\u01d7\u01d9\u01db\u01de\u01e0\u01e2\u01e4\u01e6\u01e8\u01ea\u01ec\u01ee\u01f1\u01f4\u01f6-\u01f8\u01fa\u01fc\u01fe\u0200\u0202\u0204\u0206\u0208\u020a\u020c\u020e\u0210\u0212\u0214\u0216\u0218\u021a\u021c\u021e\u0220\u0222\u0224\u0226\u0228\u022a\u022c\u022e\u0230\u0232\u023a\u023b\u023d\u023e\u0241\u0243-\u0246\u0248\u024a\u024c\u024e\u0370\u0372\u0376\u0386\u0388-\u038a\u038c\u038e\u038f\u0391-\u03a1\u03a3-\u03ab\u03cf\u03d2-\u03d4\u03d8\u03da\u03dc\u03de\u03e0\u03e2\u03e4\u03e6\u03e8\u03ea\u03ec\u03ee\u03f4\u03f7\u03f9\u03fa\u03fd-\u042f\u0460\u0462\u0464\u0466\u0468\u046a\u046c\u046e\u0470\u0472\u0474\u0476\u0478\u047a\u047c\u047e\u0480\u048a\u048c\u048e\u0490\u0492\u0494\u0496\u0498\u049a\u049c\u049e\u04a0\u04a2\u04a4\u04a6\u04a8\u04aa\u04ac\u04ae\u04b0\u04b2\u04b4\u04b6\u04b8\u04ba\u04bc\u04be\u04c0\u04c1\u04c3\u04c5\u04c7\u04c9\u04cb\u04cd\u04d0\u04d2\u04d4\u04d6\u04d8\u04da\u04dc\u04de\u04e0\u04e2\u04e4\u04e6\u04e8\u04ea\u04ec\u04ee\u04f0\u04f2\u04f4\u04f6\u04f8\u04fa\u04fc\u04fe\u0500\u0502\u0504\u0506\u0508\u050a\u050c\u050e\u0510\u0512\u0514\u0516\u0518\u051a\u051c\u051e\u0520\u0522\u0524\u0526\u0531-\u0556\u10a0-\u10c5\u1e00\u1e02\u1e04\u1e06\u1e08\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1e1e\u1e20\u1e22\u1e24\u1e26\u1e28\u1e2a\u1e2c\u1e2e\u1e30\u1e32\u1e34\u1e36\u1e38\u1e3a\u1e3c\u1e3e\u1e40\u1e42\u1e44\u1e46\u1e48\u1e4a\u1e4c\u1e4e\u1e50\u1e52\u1e54\u1e56\u1e58\u1e5a\u1e5c\u1e5e\u1e60\u1e62\u1e64\u1e66\u1e68\u1e6a\u1e6c\u1e6e\u1e70\u1e72\u1e74\u1e76\u1e78\u1e7a\u1e7c\u1e7e\u1e80\u1e82\u1e84\u1e86\u1e88\u1e8a\u1e8c\u1e8e\u1e90\u1e92\u1e94\u1e9e\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u1ec8\u1eca\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u1ef2\u1ef4\u1ef6\u1ef8\u1efa\u1efc\u1efe\u1f08-\u1f0f\u1f18-\u1f1d\u1f28-\u1f2f\u1f38-\u1f3f\u1f48-\u1f4d\u1f59\u1f5b\u1f5d\u1f5f\u1f68-\u1f6f\u1fb8-\u1fbb\u1fc8-\u1fcb\u1fd8-\u1fdb\u1fe8-\u1fec\u1ff8-\u1ffb\u2102\u2107\u210b-\u210d\u2110-\u2112\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u2130-\u2133\u213e\u213f\u2145\u2183\u2c00-\u2c2e\u2c60\u2c62-\u2c64\u2c67\u2c69\u2c6b\u2c6d-\u2c70\u2c72\u2c75\u2c7e-\u2c80\u2c82\u2c84\u2c86\u2c88\u2c8a\u2c8c\u2c8e\u2c90\u2c92\u2c94\u2c96\u2c98\u2c9a\u2c9c\u2c9e\u2ca0\u2ca2\u2ca4\u2ca6\u2ca8\u2caa\u2cac\u2cae\u2cb0\u2cb2\u2cb4\u2cb6\u2cb8\u2cba\u2cbc\u2cbe\u2cc0\u2cc2\u2cc4\u2cc6\u2cc8\u2cca\u2ccc\u2cce\u2cd0\u2cd2\u2cd4\u2cd6\u2cd8\u2cda\u2cdc\u2cde\u2ce0\u2ce2\u2ceb\u2ced\ua640\ua642\ua644\ua646\ua648\ua64a\ua64c\ua64e\ua650\ua652\ua654\ua656\ua658\ua65a\ua65c\ua65e\ua660\ua662\ua664\ua666\ua668\ua66a\ua66c\ua680\ua682\ua684\ua686\ua688\ua68a\ua68c\ua68e\ua690\ua692\ua694\ua696\ua722\ua724\ua726\ua728\ua72a\ua72c\ua72e\ua732\ua734\ua736\ua738\ua73a\ua73c\ua73e\ua740\ua742\ua744\ua746\ua748\ua74a\ua74c\ua74e\ua750\ua752\ua754\ua756\ua758\ua75a\ua75c\ua75e\ua760\ua762\ua764\ua766\ua768\ua76a\ua76c\ua76e\ua779\ua77b\ua77d\ua77e\ua780\ua782\ua784\ua786\ua78b\ua78d\ua790\ua7a0\ua7a2\ua7a4\ua7a6\ua7a8\uff21-\uff3a]',
        Ll:'[\u0061-\u007a\u00aa\u00b5\u00ba\u00df-\u00f6\u00f8-\u00ff\u0101\u0103\u0105\u0107\u0109\u010b\u010d\u010f\u0111\u0113\u0115\u0117\u0119\u011b\u011d\u011f\u0121\u0123\u0125\u0127\u0129\u012b\u012d\u012f\u0131\u0133\u0135\u0137\u0138\u013a\u013c\u013e\u0140\u0142\u0144\u0146\u0148\u0149\u014b\u014d\u014f\u0151\u0153\u0155\u0157\u0159\u015b\u015d\u015f\u0161\u0163\u0165\u0167\u0169\u016b\u016d\u016f\u0171\u0173\u0175\u0177\u017a\u017c\u017e-\u0180\u0183\u0185\u0188\u018c\u018d\u0192\u0195\u0199-\u019b\u019e\u01a1\u01a3\u01a5\u01a8\u01aa\u01ab\u01ad\u01b0\u01b4\u01b6\u01b9\u01ba\u01bd-\u01bf\u01c6\u01c9\u01cc\u01ce\u01d0\u01d2\u01d4\u01d6\u01d8\u01da\u01dc\u01dd\u01df\u01e1\u01e3\u01e5\u01e7\u01e9\u01eb\u01ed\u01ef\u01f0\u01f3\u01f5\u01f9\u01fb\u01fd\u01ff\u0201\u0203\u0205\u0207\u0209\u020b\u020d\u020f\u0211\u0213\u0215\u0217\u0219\u021b\u021d\u021f\u0221\u0223\u0225\u0227\u0229\u022b\u022d\u022f\u0231\u0233-\u0239\u023c\u023f\u0240\u0242\u0247\u0249\u024b\u024d\u024f-\u0293\u0295-\u02af\u0371\u0373\u0377\u037b-\u037d\u0390\u03ac-\u03ce\u03d0\u03d1\u03d5-\u03d7\u03d9\u03db\u03dd\u03df\u03e1\u03e3\u03e5\u03e7\u03e9\u03eb\u03ed\u03ef-\u03f3\u03f5\u03f8\u03fb\u03fc\u0430-\u045f\u0461\u0463\u0465\u0467\u0469\u046b\u046d\u046f\u0471\u0473\u0475\u0477\u0479\u047b\u047d\u047f\u0481\u048b\u048d\u048f\u0491\u0493\u0495\u0497\u0499\u049b\u049d\u049f\u04a1\u04a3\u04a5\u04a7\u04a9\u04ab\u04ad\u04af\u04b1\u04b3\u04b5\u04b7\u04b9\u04bb\u04bd\u04bf\u04c2\u04c4\u04c6\u04c8\u04ca\u04cc\u04ce\u04cf\u04d1\u04d3\u04d5\u04d7\u04d9\u04db\u04dd\u04df\u04e1\u04e3\u04e5\u04e7\u04e9\u04eb\u04ed\u04ef\u04f1\u04f3\u04f5\u04f7\u04f9\u04fb\u04fd\u04ff\u0501\u0503\u0505\u0507\u0509\u050b\u050d\u050f\u0511\u0513\u0515\u0517\u0519\u051b\u051d\u051f\u0521\u0523\u0525\u0527\u0561-\u0587\u1d00-\u1d2b\u1d62-\u1d77\u1d79-\u1d9a\u1e01\u1e03\u1e05\u1e07\u1e09\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1e1f\u1e21\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e2d\u1e2f\u1e31\u1e33\u1e35\u1e37\u1e39\u1e3b\u1e3d\u1e3f\u1e41\u1e43\u1e45\u1e47\u1e49\u1e4b\u1e4d\u1e4f\u1e51\u1e53\u1e55\u1e57\u1e59\u1e5b\u1e5d\u1e5f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e6b\u1e6d\u1e6f\u1e71\u1e73\u1e75\u1e77\u1e79\u1e7b\u1e7d\u1e7f\u1e81\u1e83\u1e85\u1e87\u1e89\u1e8b\u1e8d\u1e8f\u1e91\u1e93\u1e95-\u1e9d\u1e9f\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u1ec9\u1ecb\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u1ef3\u1ef5\u1ef7\u1ef9\u1efb\u1efd\u1eff-\u1f07\u1f10-\u1f15\u1f20-\u1f27\u1f30-\u1f37\u1f40-\u1f45\u1f50-\u1f57\u1f60-\u1f67\u1f70-\u1f7d\u1f80-\u1f87\u1f90-\u1f97\u1fa0-\u1fa7\u1fb0-\u1fb4\u1fb6\u1fb7\u1fbe\u1fc2-\u1fc4\u1fc6\u1fc7\u1fd0-\u1fd3\u1fd6\u1fd7\u1fe0-\u1fe7\u1ff2-\u1ff4\u1ff6\u1ff7\u210a\u210e\u210f\u2113\u212f\u2134\u2139\u213c\u213d\u2146-\u2149\u214e\u2184\u2c30-\u2c5e\u2c61\u2c65\u2c66\u2c68\u2c6a\u2c6c\u2c71\u2c73\u2c74\u2c76-\u2c7c\u2c81\u2c83\u2c85\u2c87\u2c89\u2c8b\u2c8d\u2c8f\u2c91\u2c93\u2c95\u2c97\u2c99\u2c9b\u2c9d\u2c9f\u2ca1\u2ca3\u2ca5\u2ca7\u2ca9\u2cab\u2cad\u2caf\u2cb1\u2cb3\u2cb5\u2cb7\u2cb9\u2cbb\u2cbd\u2cbf\u2cc1\u2cc3\u2cc5\u2cc7\u2cc9\u2ccb\u2ccd\u2ccf\u2cd1\u2cd3\u2cd5\u2cd7\u2cd9\u2cdb\u2cdd\u2cdf\u2ce1\u2ce3\u2ce4\u2cec\u2cee\u2d00-\u2d25\ua641\ua643\ua645\ua647\ua649\ua64b\ua64d\ua64f\ua651\ua653\ua655\ua657\ua659\ua65b\ua65d\ua65f\ua661\ua663\ua665\ua667\ua669\ua66b\ua66d\ua681\ua683\ua685\ua687\ua689\ua68b\ua68d\ua68f\ua691\ua693\ua695\ua697\ua723\ua725\ua727\ua729\ua72b\ua72d\ua72f-\ua731\ua733\ua735\ua737\ua739\ua73b\ua73d\ua73f\ua741\ua743\ua745\ua747\ua749\ua74b\ua74d\ua74f\ua751\ua753\ua755\ua757\ua759\ua75b\ua75d\ua75f\ua761\ua763\ua765\ua767\ua769\ua76b\ua76d\ua76f\ua771-\ua778\ua77a\ua77c\ua77f\ua781\ua783\ua785\ua787\ua78c\ua78e\ua791\ua7a1\ua7a3\ua7a5\ua7a7\ua7a9\ua7fa\ufb00-\ufb06\ufb13-\ufb17\uff41-\uff5a]',
        Lt:'[\u01c5\u01c8\u01cb\u01f2\u1f88-\u1f8f\u1f98-\u1f9f\u1fa8-\u1faf\u1fbc\u1fcc\u1ffc]',
        Lm:'[\u02b0-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0374\u037a\u0559\u0640\u06e5\u06e6\u07f4\u07f5\u07fa\u081a\u0824\u0828\u0971\u0e46\u0ec6\u10fc\u17d7\u1843\u1aa7\u1c78-\u1c7d\u1d2c-\u1d61\u1d78\u1d9b-\u1dbf\u2071\u207f\u2090-\u209c\u2c7d\u2d6f\u2e2f\u3005\u3031-\u3035\u303b\u309d\u309e\u30fc-\u30fe\ua015\ua4f8-\ua4fd\ua60c\ua67f\ua717-\ua71f\ua770\ua788\ua9cf\uaa70\uaadd\uff70\uff9e\uff9f]',
        Lo:'[\u01bb\u01c0-\u01c3\u0294\u05d0-\u05ea\u05f0-\u05f2\u0620-\u063f\u0641-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u0800-\u0815\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0972-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e45\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10d0-\u10fa\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17dc\u1820-\u1842\u1844-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c77\u1ce9-\u1cec\u1cee-\u1cf1\u2135-\u2138\u2d30-\u2d65\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3006\u303c\u3041-\u3096\u309f\u30a1-\u30fa\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcb\ua000-\ua014\ua016-\ua48c\ua4d0-\ua4f7\ua500-\ua60b\ua610-\ua61f\ua62a\ua62b\ua66e\ua6a0-\ua6e5\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa6f\uaa71-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb\uaadc\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff66-\uff6f\uff71-\uff9d\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
        Mn:'[\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962\u0963\u0981\u09bc\u09c1-\u09c4\u09cd\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b62\u0b63\u0b82\u0bc0\u0bcd\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc6\u0ccc\u0ccd\u0ce2\u0ce3\u0d41-\u0d44\u0d4d\u0d62\u0d63\u0dca\u0dd2-\u0dd4\u0dd6\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1be6\u1be8\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfc-\u1dff\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26]',
        Me:'[\u0488\u0489\u20dd-\u20e0\u20e2-\u20e4\ua670-\ua672]',
        Mc:'[\u0903\u093b\u093e-\u0940\u0949-\u094c\u094e\u094f\u0982\u0983\u09be-\u09c0\u09c7\u09c8\u09cb\u09cc\u09d7\u0a03\u0a3e-\u0a40\u0a83\u0abe-\u0ac0\u0ac9\u0acb\u0acc\u0b02\u0b03\u0b3e\u0b40\u0b47\u0b48\u0b4b\u0b4c\u0b57\u0bbe\u0bbf\u0bc1\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcc\u0bd7\u0c01-\u0c03\u0c41-\u0c44\u0c82\u0c83\u0cbe\u0cc0-\u0cc4\u0cc7\u0cc8\u0cca\u0ccb\u0cd5\u0cd6\u0d02\u0d03\u0d3e-\u0d40\u0d46-\u0d48\u0d4a-\u0d4c\u0d57\u0d82\u0d83\u0dcf-\u0dd1\u0dd8-\u0ddf\u0df2\u0df3\u0f3e\u0f3f\u0f7f\u102b\u102c\u1031\u1038\u103b\u103c\u1056\u1057\u1062-\u1064\u1067-\u106d\u1083\u1084\u1087-\u108c\u108f\u109a-\u109c\u17b6\u17be-\u17c5\u17c7\u17c8\u1923-\u1926\u1929-\u192b\u1930\u1931\u1933-\u1938\u19b0-\u19c0\u19c8\u19c9\u1a19-\u1a1b\u1a55\u1a57\u1a61\u1a63\u1a64\u1a6d-\u1a72\u1b04\u1b35\u1b3b\u1b3d-\u1b41\u1b43\u1b44\u1b82\u1ba1\u1ba6\u1ba7\u1baa\u1be7\u1bea-\u1bec\u1bee\u1bf2\u1bf3\u1c24-\u1c2b\u1c34\u1c35\u1ce1\u1cf2\ua823\ua824\ua827\ua880\ua881\ua8b4-\ua8c3\ua952\ua953\ua983\ua9b4\ua9b5\ua9ba\ua9bb\ua9bd-\ua9c0\uaa2f\uaa30\uaa33\uaa34\uaa4d\uaa7b\uabe3\uabe4\uabe6\uabe7\uabe9\uabea\uabec]',
        Nd:'[\u0030-\u0039\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19]',
        Nl:'[\u16ee-\u16f0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303a\ua6e6-\ua6ef]',
        No:'[\u00b2\u00b3\u00b9\u00bc-\u00be\u09f4-\u09f9\u0b72-\u0b77\u0bf0-\u0bf2\u0c78-\u0c7e\u0d70-\u0d75\u0f2a-\u0f33\u1369-\u137c\u17f0-\u17f9\u19da\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215f\u2189\u2460-\u249b\u24ea-\u24ff\u2776-\u2793\u2cfd\u3192-\u3195\u3220-\u3229\u3251-\u325f\u3280-\u3289\u32b1-\u32bf\ua830-\ua835]',
        Zs:'[\u0020\u00a0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]',
        Zl:'[\u2028]',
        Zp:'[\u2029]',
        Cc:'[\u0000-\u001f\u007f-\u009f]',
        Cf:'[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]',
        Cs:'[\ud800-\udfff]',
        Co:'[\ue000-\uf8ff]',
        Ps:'[\u0028\u005b\u007b\u0f3a\u0f3c\u169b\u201a\u201e\u2045\u207d\u208d\u2329\u2768\u276a\u276c\u276e\u2770\u2772\u2774\u27c5\u27e6\u27e8\u27ea\u27ec\u27ee\u2983\u2985\u2987\u2989\u298b\u298d\u298f\u2991\u2993\u2995\u2997\u29d8\u29da\u29fc\u2e22\u2e24\u2e26\u2e28\u3008\u300a\u300c\u300e\u3010\u3014\u3016\u3018\u301a\u301d\ufd3e\ufe17\ufe35\ufe37\ufe39\ufe3b\ufe3d\ufe3f\ufe41\ufe43\ufe47\ufe59\ufe5b\ufe5d\uff08\uff3b\uff5b\uff5f\uff62]',
        Pd:'[\u002d\u058a\u05be\u1400\u1806\u2010-\u2015\u2e17\u2e1a\u301c\u3030\u30a0\ufe31\ufe32\ufe58\ufe63\uff0d]',
        Pc:'[\u005f\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]',
        Pe:'[\u0029\u005d\u007d\u0f3b\u0f3d\u169c\u2046\u207e\u208e\u232a\u2769\u276b\u276d\u276f\u2771\u2773\u2775\u27c6\u27e7\u27e9\u27eb\u27ed\u27ef\u2984\u2986\u2988\u298a\u298c\u298e\u2990\u2992\u2994\u2996\u2998\u29d9\u29db\u29fd\u2e23\u2e25\u2e27\u2e29\u3009\u300b\u300d\u300f\u3011\u3015\u3017\u3019\u301b\u301e\u301f\ufd3f\ufe18\ufe36\ufe38\ufe3a\ufe3c\ufe3e\ufe40\ufe42\ufe44\ufe48\ufe5a\ufe5c\ufe5e\uff09\uff3d\uff5d\uff60\uff63]',
        Sm:'[\u002b\u003c-\u003e\u007c\u007e\u00ac\u00b1\u00d7\u00f7\u03f6\u0606-\u0608\u2044\u2052\u207a-\u207c\u208a-\u208c\u2118\u2140-\u2144\u214b\u2190-\u2194\u219a\u219b\u21a0\u21a3\u21a6\u21ae\u21ce\u21cf\u21d2\u21d4\u21f4-\u22ff\u2308-\u230b\u2320\u2321\u237c\u239b-\u23b3\u23dc-\u23e1\u25b7\u25c1\u25f8-\u25ff\u266f\u27c0-\u27c4\u27c7-\u27ca\u27cc\u27ce-\u27e5\u27f0-\u27ff\u2900-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2aff\u2b30-\u2b44\u2b47-\u2b4c\ufb29\ufe62\ufe64-\ufe66\uff0b\uff1c-\uff1e\uff5c\uff5e\uffe2\uffe9-\uffec]',
        Po:'[\u0021-\u0023\u0025-\u0027\u002a\u002c\u002e\u002f\u003a\u003b\u003f\u0040\u005c\u00a1\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30\u2e31\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]',
        Sk:'[\u005e\u0060\u00a8\u00af\u00b4\u00b8\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u309b\u309c\ua700-\ua716\ua720\ua721\ua789\ua78a\ufbb2-\ufbc1\uff3e\uff40\uffe3]',
        Sc:'[\u0024\u00a2-\u00a5\u060b\u09f2\u09f3\u09fb\u0af1\u0bf9\u0e3f\u17db\u20a0-\u20b9\ua838\ufdfc\ufe69\uff04\uffe0\uffe1\uffe5\uffe6]',
        Pi:'[\u00ab\u2018\u201b\u201c\u201f\u2039\u2e02\u2e04\u2e09\u2e0c\u2e1c\u2e20]',
        So:'[\u00a6\u00a7\u00a9\u00ae\u00b0\u00b6\u0482\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u09fa\u0b70\u0bf3-\u0bf8\u0bfa\u0c7f\u0d79\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1360\u1390-\u1399\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u214a\u214c\u214d\u214f\u2195-\u2199\u219c-\u219f\u21a1\u21a2\u21a4\u21a5\u21a7-\u21ad\u21af-\u21cd\u21d0\u21d1\u21d3\u21d5-\u21f3\u2300-\u2307\u230c-\u231f\u2322-\u2328\u232b-\u237b\u237d-\u239a\u23b4-\u23db\u23e2-\u23f3\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u25b6\u25b8-\u25c0\u25c2-\u25f7\u2600-\u266e\u2670-\u26ff\u2701-\u2767\u2794-\u27bf\u2800-\u28ff\u2b00-\u2b2f\u2b45\u2b46\u2b50-\u2b59\u2ce5-\u2cea\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua828-\ua82b\ua836\ua837\ua839\uaa77-\uaa79\ufdfd\uffe4\uffe8\uffed\uffee\ufffc\ufffd]',
        Pf:'[\u00bb\u2019\u201d\u203a\u2e03\u2e05\u2e0a\u2e0d\u2e1d\u2e21]'
    };
    /* Also supports the general category (only the first letter) */
    var firstLetters = {};
    for ( var p in unicodeCategories ) {
        if ( firstLetters[p[0]] )
            firstLetters[p[0]] = unicodeCategories[p].substring(0,unicodeCategories[p].length-1) + firstLetters[p[0]].substring(1);
        else
            firstLetters[p[0]] = unicodeCategories[p];
    }
    for ( var p in firstLetters )
        unicodeCategories[p] = firstLetters[p];

    /* \p{L&} aka \p{Cased_Letter} - <http://www.regular-expressions.info/unicode.html#category>
       By <http://stackoverflow.com/users/394921/lwangaman>
       From this StackOverflow question: <http://stackoverflow.com/q/280712>
    */
    unicodeCategories["L&"] = unicodeCategories["Lu"].substring(0,unicodeCategories["Lu"].length-1) + unicodeCategories["Ll"].substring(1,unicodeCategories["Ll"].length-1) + unicodeCategories["Lt"].substring(1,unicodeCategories["Lt"].length);
    
    /* Gets a regex written in a dialect that supports unicode categories and
       translates it to a dialect supported by JavaScript. */
    return function(regexpString) {
        var modifiers = "";
        if ( regexpString instanceof RegExp ) {
            modifiers = (regexpString.global ? "g" : "") +
                        (regexpString.ignoreCase ? "i" : "") +
                        (regexpString.multiline ? "m" : "");
            regexpString = regexpString.source;
        }
        regexpString = regexpString.replace(/\\p\{(..?)\}/g, function(match,group) {
            return unicodeCategories[group] || match;
        });
        return new RegExp(regexpString,modifiers);
    };
})();
// if touch, add a class to the html
// Used for iFrame scrollbar fixing on iPad
if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) { 
    document.documentElement.className += ' touch';
}

current_port_size = findBootstrapEnvironment();

//setup deferred obj to track when "runEqualizeBlockHeights()" is completed
var deferredBlockEqualiser = jQuery.Deferred();

function equalizeBlockHeights(startrow){
    // This function processes the blocks and generates a multivalue array which indicates
    // the height to be used and the ids to use it against
    var blocks_height_array = [];
    var blocks_ids_array = [];
    var old_block_heights = [];
    var block_arrays_pointer = 0;
    var temp_pos = 0;

    // Make sure that any blocks on the page are the same hieght, for specific templates
    jQuery(".overview-block-type, .homepage-block-type").each(function(){
        // Get elements position top and height
        var el_height = jQuery(this).height();
        var el_top = jQuery(this).offset().top;

        // If the position top has changes, we start a new array set
        if (temp_pos != el_top){
            block_arrays_pointer = block_arrays_pointer + 1;
            blocks_height_array[block_arrays_pointer] = 0;
            temp_pos = el_top;
        }

        // Add this id to the current list of ids
        if (blocks_ids_array[block_arrays_pointer] === undefined) {
            blocks_ids_array[block_arrays_pointer] = jQuery(this).parent().attr('id');
        } else {
            blocks_ids_array[block_arrays_pointer] = blocks_ids_array[block_arrays_pointer] + "," + jQuery(this).parent().attr('id');
        }

        // Now check to see if the height is bigger than we have stored
        if (el_height > blocks_height_array[block_arrays_pointer]){
            blocks_height_array[block_arrays_pointer] = el_height;
        }

        // Store old height for reference
        old_block_heights[jQuery(this).parent().attr('id')] = el_height;
    });
    // console.log(old_block_heights);
    // Now set all blocks to the discovered height
    for (i = startrow; i <= block_arrays_pointer; i++) {
        // Split out the ids from the array and set the height
        var id_ary = blocks_ids_array[i].split(',');

        jQuery.each(id_ary, function(index, value) {
            // We apply for all types on the homepage
            if (value.indexOf("homepage-") > -1) {
                jQuery("#" + value + " > .homepage-block-type").height(blocks_height_array[i]);

                // On the homepage we also have to adjust the height of any block-content areas, to make the
                // grey background look equalized
                jQuery("#" + value + " > .homepage-block-type .block-content").each(function(){
                    var current_height = jQuery(this).height();

                    // Calc how much we need to adjust by, by looking at parent block height change
                    var height_change = jQuery(this).parent().height() - old_block_heights[jQuery(this).parent().parent().attr('id')];
                    var new_height = current_height + height_change;
                    jQuery(this).height(new_height);
                    // console.log(current_height + " : " + height_change + " : " + new_height + " - " + jQuery(this).parent().parent().attr('id') + "(" + old_block_heights[jQuery(this).parent().parent().attr('id')] + "," + jQuery(this).parent().height() + ")");
                });
            }

            // We do not apply this for type 34, or 10 overview items, as they have dynamic sizing
            if (!jQuery("#" + value + " > .overview-block-type").hasClass("type-3") && !jQuery("#" + value + " > .overview-block-type").hasClass("type-4") && !jQuery("#" + value + " > .overview-block-type").hasClass("type-7") && !jQuery("#" + value + " > .overview-block-type").hasClass("type-10")) {
                // console.log("Set " + value + " block " + blocks_height_array[i] + " from " + jQuery("#" + value + " > .overview-block-type").height());
                jQuery("#" + value + " > .overview-block-type").height(blocks_height_array[i]);
            }
            // We do apply this for type 4 on the contact page
            if (jQuery(".contact-template #" + value + " > .overview-block-type").hasClass("type-4")) {
                jQuery("#" + value + " > .overview-block-type").height(blocks_height_array[i]);
            }
        });
    }

    // Return the number of rows
    return block_arrays_pointer;
}

// Clear all blocks with defined style for height
function clearBlockHeights(){
    console.log("clearBlockHeights running ...");

    jQuery(".overview-block-type, .homepage-block-type, .block-content").each(function(){
        jQuery(this).css("height", "auto");
    });

}

// Equalize the blocks
function runEqualizeBlockHeights(){
    console.log("runEqualizeBlockHeights running ...");

    // Clear any existing block equalization that is in place
    clearBlockHeights();

    var startrow = 0;
    var rows = -1;
    while (startrow != rows){
        startrow++;
        // console.log(startrow + ":" + rows);
        var rows = equalizeBlockHeights(startrow);
        if (rows <= 0 || rows <= startrow) {
            break;
        }
    }

    // Now block equalization is complete, move the buttons
    // so they rest off the bottom
    jQuery(".overview-block .light-block-btn").addClass("absolute");
    // now trigger any doneCallbacks via deferredBlockEqualiser.done()
    deferredBlockEqualiser.resolve();
}

// Function for tab toggling
function toggleTab(tab_id){
    jQuery("#tab_" + tab_id).toggle();
    jQuery("#tab_header_" + tab_id).toggleClass("open");
}

// <input class="accept-disclaimer" data-target="#watch-btn-124"></input>

jQuery(function () {
    jQuery('.btn-enabler').each(function() {
        var $targetBtn  = jQuery(jQuery(this).data('btn-target'));

        jQuery(this).click(function() {
            console.log($targetBtn);
            // alert('aiosdoa');
            console.log(jQuery(this).checked);
            if ( !jQuery(this).is(':checked') ) {
                $targetBtn.addClass('disabled').addAttr('disabled');
            } else {
                $targetBtn.removeClass('disabled').removeAttr('disabled');
            }
        });

        $targetBtn.click(function() {
            // check if enabled;
        });
    });

});



// Equalize blocks after page has rendered
jQuery(document).ready(function () {
    
    // Functionality to ensure dynamic tables can be opened and closed
    jQuery("table.dynamic thead tr th").each(function(){
        jQuery(this).click(function() {
            if (jQuery(this).hasClass("open")){
                jQuery(this).toggleClass("open");
                jQuery(this).parent().parent().parent().find("tbody").slideUp("fast");
            } else {
                jQuery(this).toggleClass("open");
                jQuery(this).parent().parent().parent().find("tbody").slideDown("fast");
            }

            // jQuery(item).parent().parent().parent().find("tbody").toggle();
            // jQuery(this).parent().parent().parent().find("tbody").slideToggle("slow", function(item=jQuery(this).parent()){
            //    jQuery(item).find("thead tr th").first().toggleClass("open");
            // });
        });
    });

    // Within every basic block, we show the first dynamic table content
    jQuery(".basic-block table.dynamic:first thead tr th").click();

    // On overview page, show all tables open
    jQuery(".overview-block table.dynamic thead tr th").click();

    // first collapse to open for flat-templates and is using tabs sections  - this only applies to the shortcodes
    if (jQuery(".justified-tab-nav .tab-container .shortcode .group_heading:first > h4").length != 0) {
        if (jQuery(".justified-tab-nav .tab-content .section").length == 2) {
            jQuery(".justified-tab-nav .tab-container #tab_0_1 .shortcode .group_heading:first > h4").click();
            jQuery(".justified-tab-nav .tab-container #tab_1_2 .shortcode .group_heading:first > h4").click();
        } else {
            jQuery(".justified-tab-nav .tab-container .shortcode .group_heading:first > h4").click();
        }
    }
});

jQuery( window ).load(function() {
    if (findBootstrapEnvironment() != 'xs') {
        runEqualizeBlockHeights();
    }
});

// This function is executed when the page is resized and/or orientation changes in mobile
function resizeAndOrientationActions(){
    new_port_size = findBootstrapEnvironment();

    if( current_port_size != new_port_size ){
        jQuery.event.trigger({
            type: "newViewPort",
            old: current_port_size,
            new: new_port_size,
        });
    }

    // console.log("From " + current_port_size + " to " + new_port_size);

    cookieHeight();

    // If we are on the homepage, we have to reload the page to get widgets etc working,
    // if not we run javascript routines (if they are needed)
    if (jQuery("#hero-slider").length >= 1){
        // Homepage
        if (new_port_size != current_port_size){
            if (!jQuery("#iframe-form-wrapper").hasClass("loaded") && jQuery(".activtrades-form-wrapper").length == 0) {
                console.log("Reloading page ...");
                document.location.reload(true);
            }
        }
    } else {
        if (new_port_size != current_port_size) {
            if (findBootstrapEnvironment() == "xs") {
                jQuery(".header-image").attr("style", "background-image: url('<?php echo the_field('mobile_foreground_image'); ?>');");
            } else {
                // We do not run the scripts if a form is open, as we do not want to disturb it
                if (!jQuery("#iframe-form-wrapper").hasClass("loaded") && jQuery(".activtrades-form-wrapper").length == 0){
                    if (typeof mobileHeaderImagePrep == 'function') {
                        mobileHeaderImagePrep();
                    }
                    if (typeof headerContainerPrep == 'function') {
                        headerContainerPrep();
                    }
                    runEqualizeBlockHeights();
                }
            }

            // Store new port size as current
            current_port_size = new_port_size;
        }
    }
}

// Reload page is device is rotated, if the port size has changed
jQuery( window ).on( "orientationchange", function(){
    setTimeout(function(){
        console.info("orientationchange")
         resizeAndOrientationActions();
    },400);
});

// Reload page on viewport change, if needed
jQuery(window).bind('resize', function(e)
{
    resizeAndOrientationActions();
});

// Table sorting
// Adds an icon to sort a column of a table to any table with the class "is-sortable"
// TODO: refactor. This is bad, but works for now and it's only for two tables
var Sortable = (function($table, options) {

    // The table heading. If a selector is set, use that as the heading. Otherwise use the th
    var $headings = options.headingSelector ? $table.find(options.headingSelector) : $table.find('th > td');
    $headings.addClass('is-sortable-heading').parent().addClass('is-sortable-heading-row');
    $headings.click(onHeadingClicked);

    var $rows = $table.find('tr').not('.is-sortable-heading-row');
    var colCount = $headings.length;
    var data = _getColData($rows);

    function _getColData($rows) {
        var rows = [];

        $rows.each(function() {
            var row = [];

            var $cols = jQuery(this).find('td');

            $cols.each(function() {
                row.push(jQuery(this).html()); 
            });

            if(row.length > 0 && !jQuery(this).hasClass('is-sortable-heading-row'))
                rows.push(row);
        });

        return rows;
    }

    function _sortByCol(col, direction) {
        return function(a, b) {
            if(a[col] > b[col]) {
                return 1 * direction;
            } else {
                return -1 * direction;
            }
        }
    }

    function _render() {
        var i = 0;
        $rows.each(function() {
            if(!jQuery(this).hasClass('is-sortable-heading-row')) {
                var j = 0;
                var $cols = jQuery(this).find('td');
                
                if($cols.length > 0) {
                    $cols.each(function() {
                        jQuery(this).html(data[i][j]);

                        j++;
                    }); 

                    i++;
                }
            }
        });
    }

    function onHeadingClicked() {
        var $this = jQuery(this);
        var direction = 1;

        if($this.hasClass('active')) {
            if($this.hasClass('a-z')) {
                $this.removeClass('a-z').addClass('z-a');
                direction = -1;
            } else {
                $this.removeClass('z-a').addClass('a-z');
            }
        } else {
            $headings.removeClass('active a-z z-a');
            $this.addClass('a-z').addClass('active');
        }
        sort($this.index(), direction);
    }

    function sort(col, direction) {
        var sortBy = _sortByCol(col, direction);

        data.sort(sortBy);

        _render()
    }

    return {
        sort: sort
    }

});

// Fixed table columns for mobile
var MobileTable = (function($tableContainer, options) {
    var isRealTable = $tableContainer.find('table').length > 0;
    var $rows = $tableContainer.find(isRealTable ? 'tr' : '.row');
    var str = '<div class="fixed-column-container"><div class="table">';

    console.log('checking rows', isRealTable);
    var is2rowsTable = $tableContainer.find('table.tbl-2-rows').length > 0;
    
    if(is2rowsTable) {
        var isWrapperCollapse = jQuery('table.tbl-2-rows').parents('.panel-collapse').length > 0;
        var $tables2rows = jQuery('table.tbl-2-rows');

        //Check if wrapper is a collapse block, so we can set to display block and set table position absolute -99999px
        //Needed so the table becomes active & we can get the height.
        if(isWrapperCollapse) {
            jQuery('.panel-collapse').removeClass('collapse');
            $tables2rows.css({
                'position' : 'absolute',
                'top' : '-999999px'
            });
        }
        
        var theadHeight = $tableContainer.find('table.tbl-2-rows:first thead tr:first-child').height();
        var tbodyHeight = $tableContainer.find('table.tbl-2-rows:first tbody tr td:first-child').outerHeight();

        if(isWrapperCollapse) {
            /**Reset elements back to normal state*/
            jQuery('.panel-collapse').addClass('collapse');
            $tables2rows.removeAttr('style');
        }
    }

    $rows.each(function() {
        var isHead = jQuery(this).hasClass('table-head');
        var colStyle = "";

        if(is2rowsTable && isHead) {
            colStyle = 'style="height:' + theadHeight + 'px"';
        } else if(is2rowsTable && !isHead) {
            colStyle = 'style="height:' + tbodyHeight + 'px"';
        }

        jQuery(this).find('.fixed-column, .fixed-column-heading').each(function() {
            //Makes sense to create row wrapper if we find one of the above classes
            str += '<div class="row' + (isHead ? ' table-head' : '') + '">';
            str += '<div class="table-cell" '+ colStyle +'>' + jQuery(this).html() + '</div>';
            str += '</div>';
        });
    });
    str += '</div></div>';

    $tableContainer.wrap('<div class="table-overflow-container"></div>').after(str);
});

jQuery(document).ready(function() {
    var $sortableTables = jQuery('table.is-sortable');
    $sortableTables.each(function() {
        var $table = new Sortable(jQuery(this), { headingSelector: '.table-head' });
    });

    var $lockedCols = jQuery('.table-overflow');
    $lockedCols.each(function() {
        var $table = new MobileTable(jQuery(this));
    });

    // Footer links
    // Show the contents when a link is clicked
    var $linkGroups = jQuery('.link-group');
    $linkGroups.each(function() {
        var $links = jQuery(this).find('.link-group_item');
        $links.on('click', function(evt){
            evt.preventDefault();
            $target = jQuery('#' + jQuery(this).data('target'));
            $target.siblings('div').slideUp();
            setTimeout(function(){$target.slideToggle();},300);
        });
    });
});


// Floating sidebar chatbox (when scrolling up show, when scroll down hide)
var JD = {};

JD.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};

function onScroll() {
    var $floatingSidebar = jQuery('#floating-sidebar, #qq-widget');
    var $floatingNavbar = jQuery('.primary-navigation-container');
    // check direction
    // hide/show thingy
    var lastScrollPosition = 0;

    window.onscroll = function() {
        var newScrollPosition = window.scrollY;
        // srolling up
        if (newScrollPosition < lastScrollPosition){
            $floatingSidebar.removeClass('animateSlideDown');
            $floatingSidebar.addClass('animateSlideUp');
            //Show mobile Navbar
            // $floatingNavbar.removeClass('navAnimateSlideDown');
            // $floatingNavbar.addClass('navAnimateSlideUp');
        }
        //Scrolling down
        else if(newScrollPosition > lastScrollPosition && newScrollPosition > 70){
            $floatingSidebar.removeClass('animateSlideUp');
            $floatingSidebar.addClass('animateSlideDown');
            // $floatingNavbar.removeClass('animateSlideUp');
            // Hide mobile Navbar
            // $floatingNavbar.removeClass('navAnimateSlideUp');
            // $floatingNavbar.addClass('navAnimateSlideDown');
        }
        
        lastScrollPosition = newScrollPosition;
    }
}

var debouncedScroll = JD.debounce(onScroll, 1000, true);
window.addEventListener('scroll', debouncedScroll);

function cookieHeight() {
    //Elements
    var $cookie = jQuery('.cookie-container');
    // var $cookiePopup = $cookie.find('#cookiepopup');
    var $floatingNavbar = jQuery('.primary-navigation-container');
    //Value
    //var cookieHeight is not used anymore within this function
    var cookieHeight = $cookie.height() !== null ? $cookie.height() : 0;
    var heightWindow = jQuery( window ).height() - (jQuery('.navbar-header').height() + rwHeight);

    //Where is used this?
    // var visible = $cookiePopup.is(':visible');

    //Update
    $floatingNavbar.css('margin-top', rwHeight);
    $floatingNavbar.find('.mobile-lang-select').css('max-height', heightWindow + 'px');
    $floatingNavbar.find('#navbar').css('max-height', heightWindow + 'px'); 
}

jQuery(function() {
    cookieHeight();

    var $html = jQuery('html');
    var $body = jQuery('body');
    var $navContainer = jQuery('.primary-navigation-container');

    $navContainer.on('show.bs.collapse', function() {
        console.log('Showing navbar menu');
        $html.addClass('js-navbar-open');
        $body.addClass('js-navbar-open');
    })

    $navContainer.on('hide.bs.collapse', function() {
        console.log('Hiding navbar');
        $html.removeClass('js-navbar-open');
        $body.removeClass('js-navbar-open');
    })
});

/* ********************************************************************
* isMobile: Detecting Mobile Devices with JavaScript
* Source: https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
******************************************************************** */

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* ********************************************************************
* _Shame.js
* Anything below this section would ideally need to be redone. 
******************************************************************** */

// related to basic-block-type11.php read more/less function
jQuery(function () {
     jQuery('.speaker-description .full-description').hide();

     jQuery('.speaker-description .moreless-buttons .block-btn').click(function (evt) {
        // show more
        evt.preventDefault();
        jQuery(this).parent().parent().next().slideDown('fast');
        jQuery(this).parent().parent().hide();
     });

     jQuery('.speaker-description .moreless-buttons .light-block-btn').click(function (evt) {
        // show less
        evt.preventDefault();
        jQuery(this).parent().parent().hide();
        jQuery(this).parent().parent().prev().show();
     });

     //Very shame. 
     // getLocation(function(data) {
     //    console.log("Shame 1", data);
     // });
 });

jQuery(function() {
    // inline fancybox content (used for videos page to show the disclaimer)
    var $videoDisclaimer = jQuery('#video-disclaimer');
    var $videoDisclaimerTrigger = jQuery('#video-disclaimer-trigger');

    if(typeof jQuery().fancybox == 'function') {
        $videoDisclaimerTrigger.fancybox();
    }

    jQuery('.show-disclaimer').click(function(evt) {
        evt.preventDefault();
        var $this = jQuery(this);
        var yt = $this.data('yt');

        $videoDisclaimer.find('#video-disclaimer_link').attr('href', 'https://www.youtube.com/embed/' + yt + '?autoplay=1');

        $videoDisclaimerTrigger.trigger('click');
    });
});

//Seminar pages
jQuery(function () {
    if (findBootstrapEnvironment() == 'lg') {
        //open the speakers full bio when on desktop.
        jQuery('.speaker-description .excerpt > div.moreless-buttons > a').trigger('click');
        //first program opened on default on desktop.
        jQuery( ".program h4:first" ).trigger( "click" );
    }
});

//Check if browser is Firefox or not then fix the table bug on commodities-spreads page.
jQuery(function() {
    if (navigator.userAgent.search("Firefox") >= 0) {
        jQuery( ".spreads_averages .accordion-toggle" ).animate({ "width": "100%" }, "slow" );
    }
});

//Enable touch on carousel
jQuery(function() {
    if( jQuery(".carousel").length > 0 ){    
        jQuery(".carousel").on("touchstart", function(event){
            var xClick = event.originalEvent.touches[0].pageX;
            jQuery(this).one("touchmove", function(event){
                var xMove = event.originalEvent.touches[0].pageX;
                if( Math.floor(xClick - xMove) > 5 ){
                    jQuery(this).carousel('next');
                }
                else if( Math.floor(xClick - xMove) < -5 ){
                    jQuery(this).carousel('prev');
                }
            });
            jQuery(".carousel").on("touchend", function(){
                jQuery(this).off("touchmove");
            });
        });
    }
});

//code for mobile nav buttons, show only active dropdown.
jQuery(".navbar-header button").click(function() {
    //Check which button was triggered and if other dropdown is not active 
    // If so - let the current btn trigger carry out its default action
    if( jQuery(this).hasClass('btn-lang') && !(jQuery('#navbar').hasClass("in")) ||
        jQuery(this).hasClass('navbar-toggle') && !(jQuery('#mobileLang').hasClass("in")) ){
    }
    else{
        //if one of the dropdown is active upon triggering mob CTA, then remove active state.
        jQuery('#mobileLang').removeClass("in");
        jQuery('#navbar').removeClass('in');
    }
});

// Browser hash functions
jQuery(function() {
    if(window.location.hash) {
        var hash = window.location.hash;

        // Change to tab
        if(hash.indexOf('tab_') === 1) {
            jQuery('.nav-tabs [href="' + hash + '"]').tab('show');
            console.log('changing to tab: ', id);
        }
    } else {
      // Fragment doesn't exist
    }
});

// code for getting URL params. Useful for forms.
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();


// Archive Filter Features
function isAnyValueIn(values) {
    //go through each campaign
    var keyWord = values.toLowerCase();
    var $campaigns = jQuery('.campaign');
    jQuery.each( $campaigns, function(k,v){
        var $currentCampaign = jQuery(v);
        var title = $currentCampaign.find('.campaign-top h4').text().toLowerCase(); //find in title
        var description = $currentCampaign.find('.content .campaign-content .campaign-description').text().toLowerCase(); //find in descriptions
        var speaker = $currentCampaign.find('.content .campaign-header a').text().toLowerCase(); //find in Speakers

        if( title.indexOf(keyWord) > -1  ||  description.indexOf(keyWord) > -1 || speaker.indexOf(keyWord) > -1 ) {
            $currentCampaign.show(); //show this campaign
        }
        else {
            $currentCampaign.hide(); //hide this campaign
        }

    });

};

// Achive Filter Button
function filterBtn(evt) {
    jQuery('#filter-box button').on('click', function(){
        var val = jQuery(this).text();

        // add .active class to the clicked button, exclude clearBtn
        jQuery('#filter-box button').removeClass('active');
        if (jQuery(this).attr("id") != "clearBtn") {
            jQuery(this).addClass('active');
        }

        // clear the results
        if (jQuery(this).attr("id") == "clearBtn") {
            jQuery('.campaign').show(); //show all campaign
        } else {
            isAnyValueIn(val);
        }
    })
};
filterBtn(); // Initialize the function


// Allow anchor links with '#enquiriespopup' & '#callmepop' to generate a popup
jQuery('a[href*="#enquiriespop"]').click(function(){
    return genericIframeForm("iframecontact?type=enquery");
});

jQuery('a[href*="#callmepop"]').click(function () { // for any links with the #callmepop element ID
    clicktocallEnabledFor = ['en', 'es', 'fr', 'it', 'de', 'ru', 'bg', 'ar', 'tw', 'hk', 'ms'];
    if (clicktocallEnabledFor.indexOf(activtrades_lang) > -1) {                 // enable new click-to-call for certain languages only
        jQuery("html", top.document).css("overflow", "hidden");
        jQuery('#click-to-call').toggleClass('visible');
        return genericIframeForm("clicktocall");
    } else {
        return genericIframeForm("iframecontact?type=call");
    }
});

jQuery(document).ready(function () { // initialise after the iframe is generated and doc is ready
    jQuery('#sidebar-call').click(function(){
        var twilioLangs = ['en', 'es', 'fr'];
        if(twilioLangs.indexOf(activtrades_lang) > -1){
            jQuery("html", top.document).css("overflow", "hidden");
        }
        jQuery('#click-to-call').addClass('visible');
    })
});

jQuery('a[href*="#chatpop"]').click(function(){
    onclick_livesupporti18n();
});

// Scroll to an element on click link
// Example: add href="#scroll-element_id"
jQuery('a[href^="#scroll-"]').click(function(e){
    var element_id = jQuery(this).attr('href').replace('scroll-','');
    var $element = jQuery(element_id);
    if( $element.length > 0 ){
        $element.scrollToMe(70);
    }
});



/********************************************************
 * ScrollTo ID and Focus on Element (open/active)
 ********************************************************/

function ScrollFocus(scrollTo, focusActive) {

    if (QueryString.scrollTo && (scrollTo != '')) {
        // console.warn('******* Okay we should SCROLL to: '+scrollTo);

        $scrollMargin = (isMobile.any()) ? '0' : -70 ; //so the menu don't overlap
        $('html, body').animate({scrollTop: $("#"+scrollTo).offset().top+$scrollMargin}, 1000);
    }
    if (QueryString.focusActive && (focusActive != '')) {
        // console.warn('******* Okay we should OPEN up: '+focusActive);

        /*******************************************************
        * Extend all selectors here to make it work
        ********************************************************/
        // For normal HTML Tables
        if (jQuery(".basic-block table.dynamic#"+focusActive+" thead tr th")) {
            jQuery(".basic-block table.dynamic#"+focusActive+" thead tr th").click();
        }

        // For Shorcode Tables
        if (jQuery(".spreads_averages .shortcode #"+focusActive+" > h4")) {
            $(this).click();
            jQuery(".spreads_averages .shortcode #"+focusActive+" > h4").click();
        }

        // For Webinar Archives
        if (jQuery("#"+focusActive+" > div.accordion-toggle")) {
            jQuery("#"+focusActive+" > div.accordion-toggle").click();
        }

        // For Tabs
        if (jQuery('.nav-tabs [href="#' + focusActive + '"]')) {
            jQuery('.nav-tabs [href="#' + focusActive + '"]').tab('show');
        }
    }
}

/********************************************************
 * Set disclaimer base on language
 ********************************************************/
function disclaimerChange(countryCode){
    if ( "AE" == countryCode ) {
        // Check and set href for footer span
        $('.vipfooter').replaceWith(function() {
            var text = $(this).text();
            var url = "";

            switch(activtrades_lang) {
                case "en":
                    url = "https://cdn.activtrades.com/documents/en_gb/EN-2017-01-Risk-Disclosure-Figures-without-signatures.pdf";
                    break;
                case "ar":
                case "ae":
                    url = "https://cdn.activtrades.com/documents/ae_AE/AE-2017-01-Risk-Disclosure-Figures-without-signature.pdf";
                    break;
                default:
                    url = "https://"+window.location.hostname+"/"+activtrades_lang+"/legal";
            }

            return '<a href="' + url + '" target="_blank">' + text + '</a>';
        });
    }
}


// Listen for any ScrollFocus Params
jQuery(document).ready(function($) {
    if (QueryString.scrollTo || QueryString.focusActive) {
        // console.warn('******* Okay we have some params here');
        ScrollFocus(QueryString.scrollTo, QueryString.focusActive);
    }
});


// On get location do something. 
jQuery(function () {
    getLocation(function(countryCode) {
        // Check for visitors 'countryCode' and make Dislaimer Changes!
        disclaimerChange(countryCode);
    });
});

//fixed column for mobiles only to target new shortcodes with class .shortcode-activtrader-data
jQuery(document).ready(function () {
    var allTables = jQuery('.shortcode-activtrader-data .glossary_template');

    function fixColMatchWidth(){
        allTables.each(function (index, element) {
            getwidthfrom = jQuery('.shortcode-activtrader-data .table-overflow table.newTB thead tr:first-child td.fixed-column-heading');
            widthchangetarget = jQuery('.shortcode-activtrader-data div.fixed-column-container div.table-head > div.table-cell');

            newWidth = getwidthfrom.outerWidth();
            jQuery(widthchangetarget).width(newWidth-12);
        });
    }
    fixColMatchWidth();

    jQuery(window).on('resize', function (e) {
        fixColMatchWidth();
    });
});

function updateBoldChatPos(){
    //Needed to exclude iPad user-agent && Boldchat status- When showing boldchat button
    if( !(isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows() || navigator.userAgent.match(/iPhone|iPod/i))
        && jQuery('body').hasClass('bc-show-button') ){

        var $boldChatBox = jQuery('#boldchat-button');
        var footerDisclaimerHeight = jQuery('.footer-third .footer-third-disclaimer').height();
        $boldChatBox.css('bottom', footerDisclaimerHeight+'px' );
    }
}

//Resize handler for BoldChat box. Needed for orientation change from Portrait to landscape
jQuery(window).on( "orientationchange resize",function(){
    setTimeout(function(){
        updateBoldChatPos();
    }, 300);
});


// "Pro Pages" Menu Visibility
function setProMode(state) {
    document.cookie = "pro_mode=" + state + "; domain="+ "." +thisDomain()+"; path=/;";
}

if (jQuery('body.pro-page').length) {
    setProMode(true);
}

if ((document.cookie.indexOf('pro_mode') > -1) && (getCookie('pro_mode') == 'true')) {
    jQuery('body').addClass('pro_mode');
}

/* This function selects which version of the BoldChat Live Chat to Open */
// branch values for boldchat
var branch = 'UK'; //Default value
if(isCorp() && !isBRSite()){
    branch = 'BH';
}
else if(isEurope()){ 
    branch = 'LU';
}
else if(isBRSite()){
    branch = 'BR';
}

function onclick_livesupporti18n() {
    var Lang = activtrades_lang;

    switch (Lang) {
        case 'ru':
            onclick_livesupport_ru();
            break;

        case 'nl':
            onclick_livesupport_nl();
            break;

        case 'fr':
            onclick_livesupport_fr();
            break;

        case 'de':
            onclick_livesupport_de();
            break;

        case 'it':
            onclick_livesupport_it();
            break;

        case 'pt':
            onclick_livesupport_pt();
            break;

        case 'es':
            onclick_livesupport_es();
            break;

        case 'bg':
            onclick_livesupport_bg();
            break;

        case 'cn':
            onclick_livesupport_cn();
            break;

        case 'al':
            onclick_livesupport_al();
            break;

        case 'hu':
            onclick_livesupport_hu();
            break;

        case 'en':
            onclick_livesupport_en();
            break;

        case 'ar':
            onclick_livesupport_ar();
            break;

        case 'hk':
            onclick_livesupport_hk();
            break;

        case 'ms':
            onclick_livesupport_ms();
            break;

        // Added 10.02.2016
        default:
            onclick_livesupport();
            break;

    }
}

function onclick_livesupport_bg() {
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=4499558502231345944&amp;wdid=4499558502231345944&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_cn() {
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=2407854664982029720&amp;wdid=2407854664982029720&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}


function onclick_livesupport_al() {
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=1664147978858779656&amp;wdid=2422152680608748803&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_hu() {
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=8768702480323402810&amp;wdid=2758950524085832239&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_en() {
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=4228439601009322029&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_ar() {
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=4228439601009322029&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_hk() {
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=9004171128372872972&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport(){
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=4228439601009322029&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_nl() {
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=685281606268632107&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_ru(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=1603801252837302750&amp;wdid=3049459864703230357&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_fr(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=3199847756505366535&amp;wdid=2058479748395369722&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat173215363199817963', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_de(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=3233062141124868109&amp;wdid=1569738142702589724&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_it(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=3599441386353503126&amp;wdid=2509405180294476454&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_pt(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=1139823224587501353&amp;wdid=1013264928071206916&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_es(){
    // Open new window for live support
    window.open('http://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=3715133479103582207&amp;wdid=523741975120474408&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat3707696612872094173', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

function onclick_livesupport_ms(){
    //For now, use the EN chat
    // Open new window for live support
    window.open('https://livechat.boldchat.com/aid/3426580264338971474/bc.chat?cwdid=4228439601009322029&url=' + escape(document.location.href) + '&customField_Branch=' + branch, 'Chat1523280939266028415', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=640,height=800');
    return false;
}

/** Live chat button */
jQuery(function (){
    $sidebarChatIcon = jQuery("#sidebar-chat a");
    $sidebarChatIcon.click(function() {
        onclick_livesupporti18n();
    });
});


/* Returns active fixed header:
 * Mobile or desktop version
 */
function getActiveFixedHeader() {
    //Check desktop header
    if ( jQuery('.header-fixed').is(':hidden') ) {
        //return mobile header
        return jQuery('.primary-navigation-container');
    }
    return jQuery('.header-fixed');
}

function getCookiePopup(){
    return jQuery('#cookiepopup');
}

var queryParamsActions = function(){
    var hash = window.location.hash;
    if( !hash ){
        return false;
    }

    var actions = new Array();
    // Remove hash symbol
    hash = hash.substring(1);

    if( hash.indexOf('+') > -1 ){
        //We have +1 action handler
        var tempActions = hash.split('+');

        for (var index = 0; index < tempActions.length; index++) {
            var action = tempActions[index].split('=');
            if( action[0] && action[1] ){
                var obj = {};
                obj[action[0]] = action[1];
                actions.push(obj);
            }
        }
    }else{
        //We have only 1 action handler
        var action = hash.split('=');
        if( action[0] && action[1] ) {
            var obj = {};
            obj[action[0]] = action[1];
            actions.push(obj);
        }
    }
    return actions;
};

/**
 * Main action handler for going over the actions Array
 */
function queryActionHandler(){
    //returns the actions array
    var queryActions = queryParamsActions();
    jQuery.each(queryActions,function(k, v){
        jQuery.each(v, function (action, targetEl) {

            /*Add checks here */
            if(action == "scrollTo" && targetEl != ""){
                actionScrollTo(targetEl);
            }else if(action == "focusActive" && targetEl != "") {
                actionFocusActive(targetEl);
            }
        });
    });
}

function actionScrollTo(elementId){
    var $targetElement = $('#'+elementId);

    if( !($targetElement.length > 0) ){
        return false;
    }
    var offTop = $targetElement.offset().top - getOffsetTop($targetElement);
    $('html,body').animate({scrollTop: offTop }, 500).promise().then(function(){
        /* console.log(">> html " + $('html').scrollTop() );
        console.log(">> body " + $('body').scrollTop() );
        console.log(">> email-disclaimer is " + $targetElement.offset().top );
        console.log(">> document is " + $(document).scrollTop() ); */
    });
}

/**
 * Open up toggle or tab
 */
function actionFocusActive(elementId){
    // Normal HTML Tables. Id applied to table itself
    if(jQuery('table#' + elementId).length) {
        jQuery('table#' + elementId +' thead tr th').click();
    }
    // Tabs block. Needs to be before data-toggle if-statement
    if(jQuery('.nav-tabs [href="#' + elementId + '"]').length) {
        jQuery('.nav-tabs [href="#' + elementId + '"]').click();
    }
    // h4 collapse block
    if(jQuery('h4#'+elementId).length) {
        jQuery('h4#'+elementId).click();
    }
    // Shortcode Tables, Webinars Archives
    if(jQuery('#'+elementId + ' [data-toggle="collapse"]').length) {
        jQuery('#'+elementId + ' [data-toggle="collapse"]').click();
    }
}

/**
 * Get the fixed header height. If mobile/tablet, then take cookie panel into account
 */
function getOffsetTop($targetElement) {
    var topHeightGap = 0;
    var $fixedHeader = getActiveFixedHeader();
    var $riskWarning = jQuery('#riskwarning');

    //By Default, use risk warning and fixed header height
    topHeightGap = $fixedHeader.height() + $riskWarning.outerHeight();
    /*
     * Check if mobile/iPad as Risk warning is fixed to the page
     */
    if(isMobile.any() ){
        //For iPad landscape only
        if( navigator.userAgent.match(/iPad/i) && (window.innerWidth > window.innerHeight) ) {
            return topHeightGap;
        }
        //Scrolling from above Target Element - fixed menu will not be visible
        else if( $('html, body').scrollTop() < $targetElement.offset().top ) {
            topHeightGap = $riskWarning.outerHeight();
        }
        //Scrolling from below the Target Element will use the default topHeightGap value
    }
    return topHeightGap;
}


jQuery(window).load(function($) {

    if(window.location.hash) {
        if (findBootstrapEnvironment() != 'xs') {
            //To allow heightEqualiser function to fully finish being executed then callback.
            //This prevents any random page jumping after scrollTo as previous, deferred obj is initalised on activtrades.js
            deferredBlockEqualiser.done(function(){
                queryActionHandler();
            });
        } else {
            queryActionHandler();
        }
    }

    //IMPORTANT: Delete if statement once all pages are using Flat Overview Template
    //If using old page template & iPad - resolves fixed nav with wrong margin-top value from cookie panel
    if(navigator.userAgent.match(/iPad/i) && jQuery('.basic_template').length > 0 ) {
        deferredBlockEqualiser.done(function(){
            cookieHeight();
        });
    }
});
//# sourceMappingURL=footer.js.map