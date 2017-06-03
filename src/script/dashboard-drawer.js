$(document).ready(function () {

    $('.drawer__toggle').on("click", function (e) {
        console.log("clicked");

        $('.drawer').toggleClass("drawer--open");
    });

});