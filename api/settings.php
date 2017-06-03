<?php

$url_base = "http://$_SERVER[HTTP_HOST]/ondiep/api/";

// DATABASE VARIABLES - LOCALHOST
$db_host = "localhost";
$db_username = "root";
$db_password = "root";
$db_name = "ondiep";


// CONNECT WITH DATABASE
$connection = mysqli_connect($db_host, $db_username, $db_password, $db_name)
or die(mysqli_error($connection));