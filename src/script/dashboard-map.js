var map;

$(document).ready(function () {

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
        //console.log(e);
    });

    map.on('load', function () {

    });

});

function setDataSource(data) {
    map.addSource("reports", {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "reports",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, "#51bbd6"],
                    [2, "#f1f075"],
                    [5, "#f28cb1"]
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [2, 30],
                    [5, 40]
                ]
            }
        }
    });

    map.addLayer({
        id: "cluster-count",
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
        id: "unclustered-point",
        type: "circle",
        source: "reports",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });
}