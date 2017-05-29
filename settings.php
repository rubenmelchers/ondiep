<?php

if ("http://$_SERVER[HTTP_HOST]" == "http://localhost") {
    $url_base = "http://$_SERVER[HTTP_HOST]/ondiep";

    // DATABASE VARIABELEN LOCALHOST
    $dbhost = "localhost";
    $dbusername = "root";
    $dbpassword = "root";
    $dbname = "lennartv_nl";

} else {
    $url_base = "https://$_SERVER[HTTP_HOST]";

    // DATABASE VARIABELEN
    $dbhost = "lennartv.nl.mysql";
    $dbusername = "lennartv_nl";
    $dbpassword = "n2FNVrVN";
    $dbname = "lennartv_nl";
}


// CONNECT WITH DATABASE
$connection = mysqli_connect($dbhost, $dbusername, $dbpassword, $dbname)
or die(mysqli_error($connection));
