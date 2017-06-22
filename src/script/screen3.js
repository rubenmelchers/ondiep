(function() {
	'use strict';

	var container = document.querySelector(".screen3");

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
			navigator.geolocation.watchPosition(showAltitude, showError);
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

	function showAltitude(pos) {
		var altitudeToShow = round(pos.coords.altitude, 1),
		element = document.getElementById('device-height');

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





})();