(function() {
	'use strict'

	var container = document.querySelector('.screen4');

	if(!container) {
		return;
	}

	var submit = container.querySelector('#inputsubmit');

	if(!submit) {
		return;
	}
	getLocation();

	var globalLat = 0,
		globalLng = 0;

	submit.addEventListener("click", function() {
		handleForm();
	});



	function handleForm() {
		var successwrapper = container.querySelector('.info__wrapper--success'),
			formwrapper = container.querySelector('.form');



		var name = document.getElementById('inputname').value,
			email = document.getElementById('inputemail').value,
			subject = document.getElementById('inputsubject'),
			subjectValue = subject.options[subject.selectedIndex].value,
			desc = document.getElementById('inputdescription').value,
			zipcode = document.getElementById('inputzipcode').value,
			submit = document.getElementById('inputsubmit');


		console.log(name, email, subjectValue, desc, zipcode, globalLat, globalLng);

		if(name && email && desc) {
			insertReport(name, email, subjectValue, desc, zipcode, globalLat, globalLng);
			formwrapper.classList.add("inactive");

			setTimeout(function() {

				successwrapper.classList.add("active");

			}, 500);
		} else {
			console.log("fill out the form!");

			var error = document.getElementById('errormessage');
			error.classList.add("active");
			container.classList.add("darker");

			var errorclose = document.getElementById('error-close');

			errorclose.addEventListener("click", function() {
				error.classList.remove("active");
				container.classList.remove("darker");
			})
		}

	}

	function insertReport(name, email, subjectValue, desc, zipcode, globalLat, globalLng) {

		var data = JSON.stringify({
			subject: subjectValue,
			description: desc,
			name: name,
			email: email,
			postcode: zipcode,
			coordinate_x: globalLng,
			coordinate_y: globalLat
		});

		var url = "https://stud.hosted.hr.nl/0889496/Jaar%203/ondiep/api/reports.php";
		var request = new XMLHttpRequest();
		request.open("POST", url, true);
		if (request.readyState === 4 && request.status === 200) {
			alert(request.responseText);
		}
		request.send(data);
	}

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

	function getPosition(pos) {
		var latitude = pos.coords.latitude,
			longitude = pos.coords.longitude;

		if(!latitude || !longitude) {
			latitude = 0;
			longitude = 0;
			window.confirm("Apparaat kan geen coordinaten ophalen!");
			return;
		}

		var coords = {
			lat: latitude,
			lng: longitude
		}


		onPosLoaded();

		globalLat = coords.lat;
		globalLng = coords.lng;
	}

	function onPosLoaded() {
		var submitlabel = document.getElementById('submitlabel'),
			loader = document.getElementById('loader'),
			form = document.getElementById('formsection');

		submitlabel.classList.add("active");
		loader.classList.add("inactive");
		formsection.classList.remove("inactive");

	}



})();