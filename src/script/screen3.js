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
		console.log("test");
		footer.classList.toggle("active");
	});

})();