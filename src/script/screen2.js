(function() {
	'use strict';

	var container = document.querySelector(".screen2"),
		API_KEY = "AIzaSyAgCBYM20Y5CGji2bX5gfFnPRdfX2RXWWk",
		params = {};

	if(!container) {
		return;
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

	var button = container.querySelector(".cta__button"),
		errorEl = container.querySelector(".cta__error");

	if(!zipcode || !number || !depth || button || errorEl) {
		errorEl.classList.add("show");
		button.classList.add("inactive");

		return;
	}

	var queryOne = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&key=" + API_KEY;


	loadJSON(queryOne, function(data) {

		var lat = data.results[0].geometry.location.lat,
			lng = data.results[0].geometry.location.lng,
			queryTwo = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + API_KEY;

		loadJSON(queryTwo, function(dataset) {

			var results = dataset.results[0];

			var streetname = results.address_components[1].long_name,
				area = results.address_components[5].long_name,
				city = results.address_components[3].long_name,
				queryThree = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "+" + streetname + "+" + number + "+" + zipcode + "&key=" + API_KEY;

				//query is eigenlijk niet nodig. Huidige query weet niet welk huisnummer er opgehaald wordt, maar dit geeft gebruiker al zelf mee.
			// loadJSON(queryThree, function(finaldata) {

			// 	console.log(finaldata.results[0]);

			// }, function(errormessage) {
			// 	console.error(errormessage);
			// })

			var streetnameElement = createElement(streetname, city, "streetname"),
				areaElement = createElement(area, city, "area");

			var streetParent = document.getElementById("street"),
				areaParent = document.getElementById("area");


			if(city == "Dordrecht" || city == "dordrecht" || city == "Schiedam") {
				button.classList.remove("inactive");
				errorEl.classList.remove("show");
				streetParent.classList.remove("inactive");
				areaParent.classList.remove("inactive");

				console.log("TEST");
				console.log("" + number);

			} else if (city == "" || city == "undefined" || city == null || number == "undefined" || number == "") {

				errorEl.classList.add("show");
				button.classList.add("inactive");
				streetParent.classList.add("inactive");
				areaParent.classList.add("inactive");

				console.log("city is undefined");

			} else {
				errorEl.classList.add("show");
				button.classList.add("inactive");

				console.log("TEST@");
			}

			streetParent.appendChild(streetnameElement);
			areaParent.appendChild(areaElement);
			// console.log(streetname, area, city);

			console.log(results);



		}, function(errormsg) {
			console.error(errormsg);
		})


	}, function(xhr) {
		console.error(xhr);
	})

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
		xhr.overrideMimeType("application/json"),
		xhr.setRequestHeader("accept", "application/json");
		xhr.send();
	}

	function createElement(content, city, class) {
		var element = document.createElement("div");

		// if (city == "Dordrecht" || city == "dordrecht" || city == "Schiedam") {
			if(class == "streetname") {
				var innerElement = document.createTextNode(content + ", " + number);

			} else {
				var innerElement = document.createTextNode(city + ", " + content);
			}

		// } else {
		// 	var innerElement = document.createTextNode("Plaats onbekend of buiten Dordrecht");

		// 	element.classList.add("info__error");

		// }


		element.appendChild(innerElement);
		element.classList.add("info__" + class);

		return element;
	}

})();