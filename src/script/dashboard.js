$(document).ready(function () {

    if (document.getElementById('map')) {
        map.on('load', function () {
            getReports(onReportsReady);

            getMonitoringWells(onMonitoringWellsReady, []);
        });
    }

});

function onReportsReady() {
    var json = $.parseJSON(this.responseText);
    var features = [];
    var geojson = {
        "type": "FeatureCollection",
        "features": ""
    };

    json.items.forEach(function (item) {
        var props = {
            id: item.id,
            name: item.name,
            subject: item.subject,
            description: item.description,
            postcode: item.postcode,
            email: item.email
        };
        features.push(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.coordinate_x, item.coordinate_y]
                },
                "properties": props
            }
        );
    });
    geojson.features = features;

    setReportsDataSource(geojson);
    setReportsHeatMap();
}

function onMonitoringWellsReady() {
    var json = $.parseJSON(this.responseText);
    var features = [];
    var geojson = {
        "type": "FeatureCollection",
        "features": ""
    };

    json.items.forEach(function (item) {
        var props = {
            name: item.name,
            id: item.peilbuiscode,
            lng: item.longitude,
            lat: item.latitude,
            straat: item.straat,
            huisnummer: item.huisnummer
        };
        if (item.meting !== null) {
            props.meetdatum = [item.meting.meetdatum.slice(0,4), item.meting.meetdatum.slice(4,6), item.meting.meetdatum.slice(6,8)].join('-');
            props.grondwaterstand = item.meting.grondwaterstand;
            props.nap_hoogte_maaiveld = item.meting.nap_hoogte_maaiveld;
            props.nap_hoogte_meetpunt = item.meting.nap_hoogte_meetpunt;
        }
        features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [item.longitude - 0.000336, item.latitude - 0.0009468]
            },
            properties: props
        });
    });
    geojson.features = features;

    if (map.getSource('monitoring_wells') == null) {
        setMonitoringWellsDataSource(geojson);
    } else {
        updateMonitoringWellsDataSource(geojson);
    }
}

function getReports(callback) {
    var url = "https://stud.hosted.hr.nl/0889496/Jaar%203/ondiep/api/reports.php";
    //var url = "http://localhost:8888/ondiep/api/reports.php";
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback);
    request.open("GET", url, true);
    //request.setRequestHeader("HTTP-ACCEPT", "application/json");
    request.send();
}

function getMonitoringWells(callback, parameters) {
    var url = "https://stud.hosted.hr.nl/0889496/Jaar%203/ondiep/api/monitoring_wells.php";
    //var url = "http://localhost:8888/ondiep/api/monitoring_wells.php";
    var stringParams = parameters.map(function (elem) {
        return elem.param + "=" + elem.val;
    }).join("&");
    if (stringParams !== "") {
        url += "?" + stringParams;
    }
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback);
    request.open("GET", url, true);
    //request.setRequestHeader("HTTP-ACCEPT", "application/json");
    request.send();
}

function insertReport(x, y) {
    console.log("insert report");
    var data = JSON.stringify({
        subject: "grondwater",
        description: "Ik heb wateroverlast in mijn kelder",
        name: "Lisa van Gelderen",
        email: "lisa@gmail.com",
        postcode: "3133AC",
        coordinate_x: x,
        coordinate_y: y
    });

    var url = "http://localhost:8888/ondiep/api/reports.php";
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    //request.setRequestHeader("Content-type", "application/json");
    //request.setRequestHeader("Content-length", data.length);
    //request.setRequestHeader("Connection", "close");
    request.send(data);
}