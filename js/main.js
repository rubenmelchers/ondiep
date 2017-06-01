/**
 * function to start te script
 */
$(document).ready(function() {


    $('.drawer-toggle').on("click", function (e) {
        console.log("clicked");

        $('.drawer').toggleClass("drawer--open");
    });




    mapboxgl.accessToken = 'pk.eyJ1IjoibGVubmllMTMyIiwiYSI6ImNqMzhqZWQ3dDAwN2kzMnMyNjB1ejcwMjIifQ.vzgSNyqEVQbbJYLcDw8saQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [4.75785, 51.77207],
        zoom: 10.7
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on('zoomend', function () {
        console.log(map.getZoom());
    });

    map.on('click', function (e) {
        console.log(e);
    });

    map.on('load', function () {
        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true. GL-JS will add the point_count property to your source data.
        map.addSource("earthquakes", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: "https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: "earthquakes",
            filter: ["has", "point_count"],
            paint: {
                "circle-color": {
                    property: "point_count",
                    type: "interval",
                    stops: [
                        [0, "#51bbd6"],
                        [100, "#f1f075"],
                        [750, "#f28cb1"],
                    ]
                },
                "circle-radius": {
                    property: "point_count",
                    type: "interval",
                    stops: [
                        [0, 20],
                        [100, 30],
                        [750, 40]
                    ]
                }
            }
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "earthquakes",
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
            source: "earthquakes",
            filter: ["!has", "point_count"],
            paint: {
                "circle-color": "#11b4da",
                "circle-radius": 4,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff"
            }
        });
    });

});
