<?php

	if(isset($_GET["zipcode"]) && $_GET["depth"]) {
		$depth = $_GET["depth"];
		$zipcode = $_GET["zipcode"];
	} else {
		header('location: screen1.php');
		die();
	}

?>

<!DOCTYPE html>
<html lang="nl">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
	<meta name="description" content="Ondiep">
	<meta name="author" content="">
	<title>Ondiep</title>

	<!-- Custom Fonts -->
	<link href="css/font-awesome.min.css" rel="stylesheet">

	<!-- Plugin CSS -->
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.css' rel='stylesheet'/>

	<!-- Custom CSS -->
	<link rel="stylesheet" href="../css/style.css" type="text/css">

</head>

<body class="screen4">

	<section class="backbutton">
		<a href="screen3.php?depth=<?php echo $depth ?>&zipcode=<?php echo $zipcode ?>" class="backbutton__button"></a>
	</section>

	<section class="title">
		<div class="container">
			<div class="row title__content">
				<div class="col-12">
					<h1>Grondwater</h1>
				</div>
			</div>
		</div>
	</section>

	<section class="info">
		<div class="container">
			<div class="row">

			<div class="col-10 info__wrapper">
				<div class="info__title">
					Uw klacht is ingediend!
				</div>

				<div class="info__desc">
					Waterbeheer Dordrecht is op de hoogte van uw wateroverlast. We gaan er zo spoedig mogelijk mee aan de slag!
				</div>

				<a href="screen1.php" class="info__cta">Ok</a>
			</div>



			</div>
		</div>
	</section>

	<section class="image">
		<div class="container image__container">
			<div class="row image__wrapper">
				<div class="col-12 image__house">
				</div>

				<div class="col-12 image__car">
				</div>

			</div>
		</div>

		<div class="image__water"></div>
	</section>







	<!-- Plugin JavaScript -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>
	<!--<script src="jquery.slidereveal.min.js"></script>-->

	<!-- Custom Theme JavaScript -->
	<script src="../js/main.min.js"></script>

</body>
</html>