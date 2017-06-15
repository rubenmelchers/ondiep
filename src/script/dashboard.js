$(document).ready(function () {

    map.on('load', function () {
        getReports(onReportsReady);

        getMonitoringWells(onMonitoringWellsReady);
    });

});

function onReportsReady() {
    var json = $.parseJSON(this.responseText);
    var features = [];
    var geojson = {
        "type": "FeatureCollection",
        "features": ""
    };

    json.items.forEach(function (item) {
        features.push(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.coordinate_x, item.coordinate_y]
                },
                "properties": {
                    "name": item.name
                }
            }
        );
    });
    geojson.features = features;

    setReportsDataSource(geojson);
}

function onMonitoringWellsReady() {
    var json = $.parseJSON(this.responseText);
    var features = [];
    var geojson = {
        "type": "FeatureCollection",
        "features": ""
    };

    json.items.forEach(function (item) {
        features.push(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.longitude - 0.000336, item.latitude - 0.0009468]
                },
                "properties": {
                    "name": item.name,
                    "description": "<h4>" + item.straat + "</h4>" + "<h5>" + item.huisnummer + "</h5>"
                }
            }
        );
    });
    geojson.features = features;

    setMonitoringWellsDataSource(geojson);
}

function getReports(callback) {
    var url = "http://localhost/ondiep/api/reports.php";
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback);
    request.open("GET", url, true);
    request.setRequestHeader("HTTP-ACCEPT", "application/json");
    request.send();
}


function getMonitoringWells(callback) {
    var url = "http://localhost/ondiep/api/monitoring_wells.php?limit=3050";
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback);
    request.open("GET", url, true);
    request.setRequestHeader("HTTP-ACCEPT", "application/json");
    request.send();
}