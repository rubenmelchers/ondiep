var map;

$(document).ready(function () {
    if (document.getElementById('map')) {

        mapboxgl.accessToken = 'pk.eyJ1IjoibGVubmllMTMyIiwiYSI6ImNqMzhqZWQ3dDAwN2kzMnMyNjB1ejcwMjIifQ.vzgSNyqEVQbbJYLcDw8saQ';

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [4.7047, 51.777],
            zoom: 11.5,
            minZoom: 11,
            maxZoom: 19.5,
            maxBounds: [
                [4.468967343227291, 51.69313503522349], // Southwest coordinates
                [4.935761081931645, 51.850466358077114]  // Northeast coordinates
            ]
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on('zoomend', function () {
            //console.log(map.getZoom());
        });

        map.on('click', function (e) {
            //console.log(e.lngLat.lng + ", " + e.lngLat.lat);
            //insertReport(e.lngLat.lng, e.lngLat.lat);
        });

        map.on('load', function () {

        });
    }
});

function updateMonitoringWellsDataSource(data) {
    map.getSource('monitoring_wells').setData(data);
}

function setMonitoringWellsDataSource(data) {

    map.addSource("monitoring_wells", {
        type: "geojson",
        data: data
    });

    map.addLayer({
        id: "monitoring_wells",
        type: "circle",
        source: "monitoring_wells",
        paint: {
            "circle-color": "#da7c30",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
    });

    map.on('click', 'monitoring_wells', function (e) {
        map.getCanvas().style.cursor = 'pointer';

        var feature = e.features[0];
        var straat = feature.properties['straat'];
        var meting_nap = parseFloat(feature.properties['grondwaterstand']);
        var meting_maaiveld = parseFloat(feature.properties['grondwaterstand']) + parseFloat(feature.properties['nap_hoogte_maaiveld']);

        if (feature.properties['huisnummer'] !== 'null') {
            straat += " " + feature.properties['huisnummer'];
        }
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                '<b> Details: </b>' +
                '<p> locatie: ' + straat + '</p>' +
                '<p> id: ' + feature.properties['id'] + '</p>' +
                '<p> coordinaten: ' + feature.properties['lng'] + ', ' + feature.properties['lat'] + '</p>' +
                '<b> Meting: </b>' +
                '<p> datum: ' + feature.properties['meetdatum'] + '</p>' +
                '<p> stand t.o.v. NAP: ' + meting_nap.toFixed(2) + '</p>' +
                '<p> stand t.o.v. maaiveld: ' + meting_maaiveld.toFixed(2) + '</p>'
            )
            .addTo(map);
    });

    // map.on('mouseleave', 'monitoring_wells', function () {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // });
}

function setReportsDataSource(data) {
    map.addSource("reports", {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({
        id: "reports",
        type: "circle",
        source: "reports",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [
                    [5, "#51bbd6"],
                    [10, "#f1f075"],
                    [20, "#f28cb1"]
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [5, 20],
                    [10, 30],
                    [20, 40]
                ]
            }
        }
    });

    map.addLayer({
        id: "reports-count",
        type: "symbol",
        source: "reports",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "reports-point",
        type: "circle",
        source: "reports",
        filter: ["all",
            ["!has", "point_count"],
            ["!=", "cluster", true]
        ],
        paint: {
            "circle-color": "#396ab1",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
    });

    map.on('click', 'reports-point', function (e) {
        map.getCanvas().style.cursor = 'pointer';

        var feature = e.features[0];

        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                '<b> Melding (' + feature.properties['id'] + '): </b>' +
                '<p> onderwerp: ' + feature.properties['subject'] + '</p>' +
                '<p> beschrijving: ' + feature.properties['description'] + '</p>' +
                '<b> Contactgegevens: </b>' +
                '<p> naam: ' + feature.properties['name'] + '</p>' +
                '<p> email: ' + feature.properties['email'] + '</p>' +
                '<p> postcode: ' + feature.properties['postcode'] + '</p>'
            )
            .addTo(map);
    });
}

function setReportsHeatMap() {
    var layers = [
        [2, 'green'],
        [10, 'orange'],
        [20, 'red']
    ];

    layers.forEach(function (layer, i) {
        map.addLayer({
            id: "heatcluster-" + i,
            type: "circle",
            source: "reports",
            paint: {
                "circle-color": layer[1],
                "circle-radius": 50,
                "circle-blur": 1
            },
            filter: i === layers.length - 1 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i + 1][0]]]
        });
    });

    map.setLayoutProperty("heatcluster-0", 'visibility', 'none');
    map.setLayoutProperty("heatcluster-1", 'visibility', 'none');
    map.setLayoutProperty("heatcluster-2", 'visibility', 'none');
}