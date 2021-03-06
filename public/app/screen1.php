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

<body class="screen1">

	<section class="title">
		<div class="container">
			<div class="row title__content">
				<div class="col-12">
					<h1>Waar woont u?</h1>
				</div>
			</div>
		</div>
	</section>

	<section class="info">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="info__text">
						Om u relevante informatie te geven over het grondwater onder uw huis, hebben we uw postcode en heipaal diepte nodig.
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="form">
		<div class="container">
			<div class="row">
				<form action="screen2.php" method="get">

					<label for="zipcode" class="col-6">
						<input type="text" required pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" class="form__zipcode" placeholder="Uw postcode..." name="zipcode">
					</label>

					<label for="number" class="col-6">
						<input type="number" required class="form__number" placeholder="huisnummer..." name="number">
					</label>

					<label for="depth" class="col-12">
						<input type="number" required class="form__depth" placeholder="Diepte heipaal (in meters)..." name="depth">

					</label>

					<label for="submit" class="col-6">
						<input type="submit" class="form__submit" value="Ga verder" name="submit">
					</label>

				</form>

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