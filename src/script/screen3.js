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

	setTimeout(function() {

		water.classList.add("show");

	}, 1500);

	setTimeout(function() {

		alert.classList.add("show");

	}, 4000);

})();