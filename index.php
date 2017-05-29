<?php
require("settings.php");
$query = "SELECT * FROM categories";
$result_categories = mysqli_query($connection, $query) or die(mysqli_error($connection));


$result_projects = mysqli_query($connection, $query) or die(mysqli_error($connection));

$query_recent = "SELECT * FROM projects ORDER BY date DESC";
$result_recent = mysqli_query($connection, $query_recent) or die(mysqli_error($connection));

?>
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Ondiep">
    <meta name="author" content="">
    <title>Ondiep</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="<?= $url_base ?>/css/bootstrap.min.css" type="text/css">

    <!-- Custom Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="<?= $url_base ?>/css/font-awesome.min.css" rel="stylesheet">

    <!-- Plugin CSS -->
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.css' rel='stylesheet'/>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?= $url_base ?>/css/style.css" type="text/css">

</head>

<body>

<header class="container">
    <div class="row">
        <h1>Ondiep</h1>
        <hr>
    </div>
</header>



<section class="container">
    <div class="row">
        <div id='map' style='width: 100%; height: 450px;'></div>
    </div>
</section>


<!-- jQuery -->
<script src="<?= $url_base ?>/js/jquery.js"></script>

<!-- Plugin JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="<?= $url_base ?>/js/bootstrap.min.js" type="application/javascript"></script>
<script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>

<!-- Custom Theme JavaScript -->
<script src="<?= $url_base ?>/js/main.js"></script>

</body>
</html>