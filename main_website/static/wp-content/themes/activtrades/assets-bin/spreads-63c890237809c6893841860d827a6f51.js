// var is used in getLastWeekParams() - from footer.js
// start of last week (Monday), plus the index of the dropdown (0 = Monday)
var dayOfWeek = 0;

jQuery(document).ready(function () {

    $ = jQuery;
    var allData;

    // Already called on shortcode
    // updateAverages($("#spreads_type").val());
    updateLastWeekGraph();

    var symbol = $('#symbols').parent().find('button').text().trim().replace('/', '');

    function updateLastWeekGraph() {
        // API URL
        var API_URL = 'https://secure.activtrades.com/dynamicdata/spreads/';

        // Setup parameters
        var params = getLastWeekParams();

        if( params.post.hasOwnProperty('lastWeeksDate') ) {
            API_URL += 'GetSpreadsPerDay/' + params.post.lastWeeksDate;
        }

        jQuery.ajaxSetup({ cache: false });

        // Make the ajax call
        jQuery.ajax({
            url: API_URL,
            timeout: 90000,
            success: function (result) {
                allData =  jQuery.parseJSON(JSON.stringify(result));
                renderChart();
            },
            error: function (req, status, error) {
                // Error handling

            }
        });
    }

    function renderChart() {

        var data = allData[symbol].data;
        var options = allData[symbol].options;
        options.colors = ["#456e93"];
        options.series.lines.lineWidth = 0;
        options.series.lines.fill = true;
        options.series.lines.fillColor = { colors: [{ opacity: 0.7 }, { opacity: 0.7 }] };
        options.grid.borderColor = "#eee";
        options.grid.borderWidth = 1;

        $.plot($("#lastWeekAveragesChart"), data, options);
        $(".x1Axis .tickLabel").css("webkit-transform", "rotate(90deg)");
        $(".x1Axis .tickLabel").css("-o-transform", "rotate(90deg)");
        $(".x1Axis .tickLabel").css("-moz-transform", "rotate(90deg)");
        $(".x1Axis .tickLabel").css("-ms-transform", "rotate(90deg)");
        $(".tickLabel").css("font-size", "10px");
        $(".tickLabel").css("color", "#222");
    }

    $('#weekdays.dropdown-menu a').on('click', function() {
        dayOfWeek = ($(this).parent().index());
        $('#weekdaysMenu').contents()[2].textContent = $(this).text();
        updateLastWeekGraph();
    });

    $('#symbols.dropdown-menu a').on('click', function() {
        symbol = $(this).text().trim().replace('/', '');
        $('#symbolsMenu').contents()[2].textContent = $(this).text();
        updateLastWeekGraph();
    });

    $(window).resize(function(){
        updateLastWeekGraph();
    });

});
//# sourceMappingURL=spreads.js.map
