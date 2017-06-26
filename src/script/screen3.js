(function() {
	'use strict';

	var container = document.querySelector(".screen3"),
		API_KEY = "AIzaSyAgCBYM20Y5CGji2bX5gfFnPRdfX2RXWWk",
		params = {};

	if(!container) {
		return;
	}

	var footer = container.querySelector(".footer"),
	footertrigger = footer.querySelector(".footer__trigger");

	if(!footertrigger) {
		return;
	}

	footertrigger.addEventListener("click", function() {
		footer.classList.toggle("active");
	});

	var water = container.querySelector(".image__water"),
	alert = container.querySelector(".image__alert");

	if (!water || !alert) {
		return;
	}

	getLocation();


	setTimeout(function() {

		water.classList.add("show");

	}, 500);

	setTimeout(function() {

		alert.classList.add("show");

	}, 500);

	function getLocation() {
		if (navigator.geolocation) {

			navigator.geolocation.watchPosition(getPosition, showError);

		} else {
			console.log("Geolocation is not supported by this browser");
			window.alert("Hoogte kan niet opgemeten worden");
		}
	}

	function showError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;

			case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;

			case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;

			case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
		}
	}

	if (location.search) {
		var parts = location.search.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			params[nv[0]] = nv[1] || true;
		}
	}

	var zipcode = params.zipcode,
		number = params.number,
		depth = params.depth;

	var queryOne = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=" + API_KEY;


	loadJSON(queryOne, function(data) {

		var lat = data.results[0].geometry.location.lat,
			lng = data.results[0].geometry.location.lng,
			queryTwo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + API_KEY,
			poleUrl = "https://stud.hosted.hr.nl/0889496/Jaar%203/ondiep/api/monitoring_wells.php?lat=" + lat + "&lng=" + lng + "&limit=1";

			console.log(poleUrl);

			loadJSON(poleUrl, function(dataset) {

				var results = dataset.items[0].meting.grondwaterstand,
					waterheight = round(results, 1),
					waterElem = document.getElementById('water-height');

				if(waterheight) {
					waterElem.innerHTML = waterheight;
				} else {
					waterElem.innerHTML = "?";
				}

				console.log(waterheight);

			}, function(xhr) {
				console.error(xhr);
			})


	}, function(xhr) {
		console.error(xhr);
	})

	function getPosition(pos) {
		var altitudeToShow = round(pos.coords.altitude, 1),
			latitude = pos.coords.latitude,
			longitude = pos.coords.longitude,
			element = document.getElementById('device-height');
		// console.log(poleUrl);

		if(altitudeToShow) {
			console.log("ALTITUDE");
			console.log(altitudeToShow);
			element.innerHTML = altitudeToShow;

		} else {
			console.log("no altitude");
			console.log(altitudeToShow);
			element.innerHTML = "?"
			window.confirm("Apparaat kan geen hoogte opmeten!");

		}
	}

	function round(value, precision) {
		var multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	function loadJSON(path, success, error)	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open("GET", path, true);
		// xhr.overrideMimeType("application/json"),
		// xhr.setRequestHeader("accept", "application/json");
		xhr.send();
	}



})();