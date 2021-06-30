/* Code to handle the forex margins data switching via the filter */
function showcell(x) {
	if (jQuery('.container-fluid').length == 1) { //check if its flat-template
		x.each(function () {
			jQuery(this).css('display', 'table-cell');
		});
	} else {
		x.each(function () {
			jQuery(this).show();
		});
	}
}

jQuery(document).ready(function () {

	var radioBtn = jQuery("input[type=radio]");
	var columnOne = jQuery(".column_one");
	var columnTwo = jQuery(".column_two");
	var columnThree = jQuery(".column_three");
	var columnFour = jQuery(".column_four");
	
	showcell(columnOne);
	columnTwo.hide();
	columnThree.hide();
	columnFour.hide();

	radioBtn.click(function () {
		var value = parseInt(jQuery(this).val());
		if ( value === 400 ) {
			showcell(columnOne);
			columnTwo.hide();
			columnThree.hide();
			columnFour.hide();
			columnOne.not('.target-heading').each(function (index, el) {
				var number = parseInt(jQuery(this).text().replace(/,/g, '')) / 10;
				var matchSum = jQuery(number).toArray();
				var currency = jQuery(this).text().split(" ").pop();
				var max = parseInt(jQuery(this).next().next().next().next().next().text());
                if(isCorp()){
                    max = parseFloat(jQuery(this).next().next().next().next().next().text());
                }

				jQuery(this).next().next().next().next().not('.no-dynamic').text(number).append(" " + currency);
				jQuery(this).next().next().next().next().next().next().text("1:" + (value / max));
				jQuery('.num').hide();

				for (var i = 0; i < matchSum.length; i++) {
					var sumToString = matchSum[i].toString();
					if (sumToString.match(/\b\d{4}\b/g) != null) {
						var addComma = jQuery(this).next().next().next().next().text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
						jQuery(this).next().next().next().next().text(addComma);
					}
				}
			});
		} else if ( value === 200 ) {
			columnOne.hide();
			showcell(columnTwo);
			columnThree.hide();
			columnFour.hide();
			columnTwo.not('.target-heading').each(function (index, el) {
				var number = parseInt(jQuery(this).text().replace(/,/g, '')) / 10;
				var matchSum = jQuery(number).toArray();
				var currency = jQuery(this).text().split(" ").pop();
				var max = parseInt(jQuery(this).next().next().next().next().text());
                if (isCorp()){
                    max = parseFloat(jQuery(this).next().next().next().next().text());
                }

				jQuery(this).next().next().next().not('.no-dynamic').text(number).append(" " + currency);
				jQuery(this).next().next().next().next().next().text("1:" + (value / max));
				jQuery('.num').hide();

				for (var i = 0; i < matchSum.length; i++) {
					var sumToString = matchSum[i].toString();
					if (sumToString.match(/\b\d{4}\b/g) != null) {
						var addComma = jQuery(this).next().next().next().text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
						jQuery(this).next().next().next().text(addComma);
					}
				}
			});
		} else if ( value === 100 ) {
			columnOne.hide();
			columnTwo.hide();
			showcell(columnThree);
			columnFour.hide();
			columnThree.not('.target-heading').each(function (index, el) {
				var number = parseInt(jQuery(this).text().replace(/,/g, '')) / 10;
				var matchSum = jQuery(number).toArray();
				var currency = jQuery(this).text().split(" ").pop();
				var max = parseInt(jQuery(this).next().next().next().text());
                if (isCorp()){
                    max = parseFloat(jQuery(this).next().next().next().text());
                }

				jQuery(this).next().next().not('.no-dynamic').text(number).append(" " + currency);
				jQuery(this).next().next().next().next().text("1:" + (value / max));
				jQuery('.num').hide();

				for (var i = 0; i < matchSum.length; i++) {
					var sumToString = matchSum[i].toString();
					if (sumToString.match(/\b\d{4}\b/g) != null) {
						var addComma = jQuery(this).next().next().text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
						jQuery(this).next().next().text(addComma);
					}
				}
			});
		} else if ( value === 10 ) {
			columnOne.hide();
			columnTwo.hide();
			columnThree.hide();
			showcell(columnFour);

			columnThree.not('.target-heading').each(function (index, el) {
				var number = parseInt(jQuery(this).text().replace(/,/g, '')) / 10;
				var matchSum = jQuery(number).toArray();
				var currency = jQuery(this).text().split(" ").pop()
				var max = parseInt(jQuery(this).next().next().text());
                if (isCorp()){
                    max = parseFloat(jQuery(this).next().next().text());
                }

				jQuery(this).next().next().not('.no-dynamic').text('-');
				jQuery(this).next().next().next().next().text('-');
				jQuery('.num').hide();
				for (var i = 0; i < matchSum.length; i++) {
					var sumToString = matchSum[i].toString();
					if (sumToString.match(/\b\d{4}\b/g) != null) {
						var addComma = $(this).next().text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
						jQuery(this).next().text(addComma);
					}
				}
			});
		}
	});
});

//# sourceMappingURL=forex-margins.js.map
