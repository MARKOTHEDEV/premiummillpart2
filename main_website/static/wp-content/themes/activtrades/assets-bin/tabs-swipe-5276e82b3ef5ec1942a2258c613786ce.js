function tabsSlideNext($tabs){
	if ($tabs.filter('.active').next('li').length) {
		$tabs.filter('.active').next('li').find('a[data-toggle="tab"]').click();
	} else {
		$tabs.eq(0).find('a[data-toggle="tab"]').click();
	}
}

function tabsSlidePrev($tabs){
	if ($tabs.filter('.active').prev('li').length) {
		$tabs.filter('.active').prev('li').find('a[data-toggle="tab"]').click();
	} else {
		$tabs.eq($tabs.length - 1).find('a[data-toggle="tab"]').click();
	}
}

jQuery(document).ready(function () {

	jQuery('.section.tab-section-content ').each(function( index ) {
		$section = jQuery(this);
		$section.find('.nav-tabs .active a');


		//Set the current indicator
		var actWidth = $section.find('.nav-tabs .active a').width();
		var actPosition = $section.find(".nav-tabs .active").position();
		$section.find(".tab-slider").css({"left":+ actPosition.left,"width": actWidth});


		// Animate tabs slide Left|Right
		$section.find('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {

			var $old_tab = jQuery(jQuery(e.target).attr("href"));
			var $new_tab = jQuery(jQuery(e.relatedTarget).attr("href"));

			if( $new_tab.index() < $old_tab.index() ) {
				$old_tab.css('position', 'relative').css("right", "0").show();
				$old_tab.animate({"right":"-100%"}, 300, function () {
					$old_tab.css("right", 0).removeAttr("style");
				});
			}
			else {
				$old_tab.css('position', 'relative').css("left", "0").show();
				$old_tab.animate({"left":"-100%"}, 300, function () {
					$old_tab.css("left", 0).removeAttr("style");
				});
			}
		});

		$section.find('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
			var $new_tab = jQuery(jQuery(e.target).attr("href"));
			var $old_tab = jQuery(jQuery(e.relatedTarget).attr("href"));

			if($new_tab.index() > $old_tab.index()){
				$new_tab.css('position', 'relative').css("right", "-2500px");
				$new_tab.animate({"right":"0"}, 500);
			}
			else {
				$new_tab.css('position', 'relative').css("left", "-2500px");
				$new_tab.animate({"left":"0"}, 500);
			}
		});


		//Move indicator 
		$section.find(".nav-tabs a").click(function() {
			var position = jQuery(this).parent().position();
			var width = jQuery(this).parent().width();
			jQuery(this).parent().parent().find(".tab-slider").css({"left":+ position.left,"width":width});
		});

		var $tabs = $section.find('.nav-tabs>li');

		$section.find('[data-slide="next"]').on('click', function(e) {
			activtrades_lang == 'ar' ? tabsSlidePrev($tabs) : tabsSlideNext($tabs);
			e.preventDefault();
		});

		$section.find('[data-slide="prev"]').on('click', function(e) {
			activtrades_lang == 'ar' ? tabsSlideNext($tabs) : tabsSlidePrev($tabs);
			e.preventDefault();
		});

		if (findBootstrapEnvironment() != 'xs' && (jQuery('.justified-tab-nav').length != 1 )) {

			$section.find(".tab-main-content").swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					console.log("SWIPE");
					if( direction == "left" ){
						activtrades_lang == 'ar' ? tabsSlidePrev($tabs) : tabsSlideNext($tabs);
					}else if( direction == "right" ){
						activtrades_lang == 'ar' ? tabsSlideNext($tabs) : tabsSlidePrev($tabs);
					}else{
						// do nothing.
					}
				}, threshold:50
			});

		}

	});
});
//# sourceMappingURL=tabs-swipe.js.map
