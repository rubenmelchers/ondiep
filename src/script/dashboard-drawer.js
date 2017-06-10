$(document).ready(function () {

    $('.drawer__toggle').on("click", function (e) {
        $('.drawer').toggleClass("drawer--open");
    });


    $('.drawer__filters .filter input[type=checkbox]').on('change', function(e) {
        console.log($(e.target).is(':checked'));
        if ($(e.target).is(':checked')) {
            switch ($(e.target).attr('value')) {
                case "reports":
                    map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'visible');
                    map.setLayoutProperty("reports-count", 'visibility', 'visible');
                    map.setLayoutProperty("reports-point", 'visibility', 'visible');
                    break;
                case "monitoring_wells":
                    map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'visible');
                    break;
                case "":
                    break;
            }
        } else {
            switch ($(e.target).attr('value')) {
                case "reports":
                    map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'none');
                    map.setLayoutProperty("reports-count", 'visibility', 'none');
                    map.setLayoutProperty("reports-point", 'visibility', 'none');
                    break;
                case "monitoring_wells":
                    map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'none');
                    break;
                case "":
                    break;
            }
        }
    });

    //

});