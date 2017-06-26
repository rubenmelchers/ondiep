$(document).ready(function () {

    $('.drawer__toggle').on("click", function () {
        $('.drawer').classList.toggle("drawer--open");
    });

    $('.drawer__filters .filter input[type=checkbox]').on('change', function (e) {
        if (e.target.checked) {
            switch (e.target.getAttribute('value')) {
                case "reports":
                    if (map.getLayer($(e.target).attr('value'))) {
                        map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'visible');
                    }
                    if (map.getLayer('reports-count')) {
                        map.setLayoutProperty("reports-count", 'visibility', 'visible');
                    }
                    if (map.getLayer('reports-point')) {
                        map.setLayoutProperty("reports-point", 'visibility', 'visible');
                    }
                    break;
                case "monitoring_wells":
                    if (map.getLayer($(e.target).attr('value'))) {
                        map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'visible');
                    }
                    break;
                case "":
                    break;
            }
        } else {
            switch (e.target.getAttribute('value')) {
                case "reports":
                    if (map.getLayer($(e.target).attr('value'))) {
                        map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'none');
                    }
                    if (map.getLayer('reports-count')) {
                        map.setLayoutProperty("reports-count", 'visibility', 'none');
                    }
                    if (map.getLayer('reports-point')) {
                        map.setLayoutProperty("reports-point", 'visibility', 'none');
                    }
                    break;
                case "monitoring_wells":
                    if (map.getLayer($(e.target).attr('value'))) {
                        map.setLayoutProperty($(e.target).attr('value'), 'visibility', 'none');
                    }
                    break;
                case "":
                    break;
            }
        }
    });

    $('.drawer__mode .options button.mode_button').on('click', function (e) {
        if (!e.target.classList.contains('mode_button--selected')) {
            var selected = document.getElementsByClassName('mode_button--selected')[0];
            selected.classList.remove('mode_button--selected');
            e.target.classList.add('mode_button--selected');
            switch (e.target.getAttribute('data-mode')) {
                case "presentation":
                    if (map.getLayer('heatcluster-0')) {
                        map.setLayoutProperty("heatcluster-0", 'visibility', 'visible');
                    }
                    if (map.getLayer('heatcluster-1')) {
                        map.setLayoutProperty("heatcluster-1", 'visibility', 'visible');
                    }
                    if (map.getLayer('heatcluster-2')) {
                        map.setLayoutProperty("heatcluster-2", 'visibility', 'visible');
                    }
                    if (map.getLayer('reports')) {
                        map.setLayoutProperty("reports", 'visibility', 'none');
                    }
                    if (map.getLayer('reports-count')) {
                        map.setLayoutProperty("reports-count", 'visibility', 'none');
                    }
                    if (map.getLayer('monitoring_wells')) {
                        map.setLayoutProperty("monitoring_wells", 'visibility', 'none');
                    }
                    break;
                case "manage":
                    if (map.getLayer('heatcluster-0')) {
                        map.setLayoutProperty("heatcluster-0", 'visibility', 'none');
                    }
                    if (map.getLayer('heatcluster-1')) {
                        map.setLayoutProperty("heatcluster-1", 'visibility', 'none');
                    }
                    if (map.getLayer('heatcluster-2')) {
                        map.setLayoutProperty("heatcluster-2", 'visibility', 'none');
                    }
                    if (map.getLayer('reports')) {
                        map.setLayoutProperty("reports", 'visibility', 'visible');
                    }
                    if (map.getLayer('reports-count')) {
                        map.setLayoutProperty("reports-count", 'visibility', 'visible');
                    }
                    if (map.getLayer('monitoring_wells')) {
                        map.setLayoutProperty("monitoring_wells", 'visibility', 'visible');
                    }
                    break;
            }
        }
    });

    setDatePicker();

    $('.drawer__date .filter input[type=checkbox]#latest').on('change', function (e) {
        document.getElementById("this_month").checked = false;
        document.getElementById("previous_month").checked = false;
        if (e.target.checked) {
            getMonitoringWells(onMonitoringWellsReady, []);
        }
    });

    $('.drawer__date .filter input[type=checkbox]#this_month').on('change', function (e) {
        document.getElementById("latest").checked = false;
        document.getElementById("previous_month").checked = false;
        if (e.target.checked) {
            var date = e.target.getAttribute('data-date');
            getMonitoringWells(onMonitoringWellsReady, [{param: "date", val: date}]);
        }
    });

    $('.drawer__date .filter input[type=checkbox]#previous_month').on('change', function (e) {
        document.getElementById("latest").checked = false;
        document.getElementById("this_month").checked = false;
        if (e.target.checked) {
            var date = e.target.getAttribute('data-date');
            getMonitoringWells(onMonitoringWellsReady, [{param: "date", val: date}]);
        }
    });

    $('.drawer__date .filter input[type=month]#date_search').on('change', function (e) {
        document.getElementById("latest").checked = false;
        document.getElementById("previous_month").checked = false;
        document.getElementById("this_month").checked = false;
        var date = e.target.value;
        date = date.replace("-", "");
        getMonitoringWells(onMonitoringWellsReady, [{param: "date", val: date}]);
    });

    $('.drawer__location .options button#search_location').on('click', function (e) {
        var postcode = document.getElementById("input_location").value;
        postcode = postcode.replace(" ", "");

        if (postcode != "") {
            var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + postcode;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var json = $.parseJSON(this.responseText);
                    //console.log(json);
                    var lng = json.results[0].geometry.location.lng;
                    var lat = json.results[0].geometry.location.lat;
                    var place = json.results[0].formatted_address;
                    getMonitoringWells(onMonitoringWellsReady, [{param: "limit", val: 5}, {param: "lat", val: lat}, {param: "lng", val: lng}]);
                    if (map.getLayer('search_point')) {
                        map.removeLayer("search_point");
                        map.removeSource("search_point");
                    }
                    var geodata = [{
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        properties: {
                            title: 'Search',
                            description: place,
                            'marker-size': 'large',
                            'marker-color': '#BE9A6B',
                            'marker-symbol': 'house'
                        }
                    }];

                    map.addLayer({
                        id: "search_point",
                        source: {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: [{
                                    type: "Feature",
                                    geometry: {
                                        type: "Point",
                                        coordinates: [lng, lat]
                                    },
                                    properties: {
                                        title: 'Search',
                                        description: place,
                                        'marker-size': 'large',
                                        'marker-color': '#BE9A6B',
                                        'marker-symbol': '1'
                                    }
                                }]
                            }
                        },
                        paint: {
                            "circle-color": "red",
                            "circle-radius": 6,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#fff"
                        },
                        type: "circle"
                    });
                    map.flyTo({
                        center: [
                            lng, lat
                        ],
                        zoom: 16
                    });
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        } else {
            //getMonitoringWells(onMonitoringWellsReady, [{param: "limit", val: 30}]);
        }

    });
});

function setDatePicker() {
    var today = new Date();

    document.getElementById('this_month_label').innerHTML = document.getElementById('this_month_label').innerHTML + " " + (today.getMonth() + 1) + "/" + today.getFullYear();
    document.getElementById('previous_month_label').innerHTML = document.getElementById('previous_month_label').innerHTML + " " + today.getMonth() + "/" + today.getFullYear();

    var month = today.getMonth() + 1;
    if (month.toString().length === 1) {
        month = "0" + (month).toString();
    }
    document.getElementById('this_month').setAttribute('data-date', today.getFullYear().toString() + month.toString());
    var previous_month = (today.getMonth());
    var year = today.getFullYear();
    if (previous_month === -1) {
        year--;
        previous_month = 12;
    }
    if (previous_month.toString().length === 1) {
        previous_month = "0" + previous_month.toString();
    }
    document.getElementById('previous_month').setAttribute('data-date', year.toString() + previous_month.toString());
}