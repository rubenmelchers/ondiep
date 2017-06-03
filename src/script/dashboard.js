$(document).ready(function () {

    map.on('load', function () {
        getReports(onReportsReady);
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

    setDataSource(geojson);
}

function getReports(callback) {
    var url = "http://localhost/ondiep/api/webservice.php";
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback);
    request.open("GET", url, true);
    request.setRequestHeader("HTTP-ACCEPT", "application/json");
    request.send();
}