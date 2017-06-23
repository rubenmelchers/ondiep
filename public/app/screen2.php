<?php

	if( isset($_GET["zipcode"]) && $_GET["depth"] && $_GET["number"] ) {
		$depth = $_GET["depth"];
		$zipcode = $_GET["zipcode"];
		$number = $_GET["number"];

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

<body class="screen2">

	<section class="backbutton">
		<a href="screen1.php" class="backbutton__button"></a>
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

	<section class="hidden">
		<span id="zipcode"><?php echo $zipcode ?></span>
		<span id="number"><?php echo $number ?></span>
		<span id="depth"><?php echo $depth ?></span>
	</section>

	<section class="info">
		<div class="container">
			<div class="row">
				<div class="col-12" id="street"></div>
				<div class="col-12" id="area"></div>
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
	</section>

	<section class="cta">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<input type="hidden" id="inputX">
					<a href="screen3.php?depth=<?php echo $depth ?>&zipcode=<?php echo $zipcode ?>&number=<?php echo $number ?>" class="cta__button">Check mijn waterpeil!</a>
				</div>
				<div class="col-12">
					<span class="cta__error">
						Locatie is onbekend of buiten Dordrecht!
					</span>
				</div>
			</div>
		</div>
	</section>

	<footer class="footer">

	</footer>




	<!-- Plugin JavaScript -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>
	<!--<script src="jquery.slidereveal.min.js"></script>-->

	<!-- Custom Theme JavaScript -->
	<script src="../js/main.min.js"></script>

</body>
</html>