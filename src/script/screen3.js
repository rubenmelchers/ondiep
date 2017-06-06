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

	var water = container.querySelector(".image__water");

	if (!water) {
		return;
	}

	setTimeout(function() {

		water.classList.add("show");

	}, 1500);

})();