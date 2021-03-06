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

<body class="screen3">

	<section class="backbutton">
		<?php

			if(!$depth || !$zipcode) {
				?>
				<a href="screen1.php" class="backbutton__button"></a>

				<?php

			} else {

				?>
				<a href="screen2.php?depth=<?php echo $depth ?>&zipcode=<?php echo $zipcode ?>" class="backbutton__button"></a>

				<?php


			}

		?>
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
				<div class="col-4 info__parent">
					<div class="info__desc">
						Uw hoogte
					</div>
					<div class="info__circle" id="device-height">

					</div>
				</div>
				<div class="col-4 info__parent">
					<div class="info__desc">
						Heipaal diepte
					</div>
					<div class="info__circle">
						<?php echo "-", $depth, "m" ?>
					</div>
				</div>
				<div class="col-4 info__parent">
					<div class="info__desc">
						Grondwater hoogte
					</div>
					<div class="info__circle" id="water-height">

					</div>
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

				<div class="col-1 image__alert"></div>
			</div>
		</div>

		<div class="image__water"></div>
	</section>



	<footer class="footer">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<a href="#" class="footer__trigger"></a>
				</div>

				<div class="col-8 footer__wrapper">
					<div class="footer__title">
						Ervaart u een van de volgende problemen?
					</div>

					<ul class="footer__list">
						<li class="footer__listitem">Vochtige kelder</li>
						<li class="footer__listitem">Stinkende kelder</li>
						<li class="footer__listitem">Scheuren in de muur</li>
						<li class="footer__listitem">Oppervlakte water</li>
					</ul>

					<a href="screen4.php?depth=<?php echo $depth ?>&zipcode=<?php echo $zipcode ?>" class="footer__cta">Geef het aan!</a>

				</div>
			</div>
		</div>

	</footer>




	<!-- Plugin JavaScript -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v0.36.0/mapbox-gl.js'></script>
	<!--<script src="jquery.slidereveal.min.js"></script>-->

	<!-- Custom Theme JavaScript -->
	<script src="../js/main.min.js"></script>

</body>
</html>