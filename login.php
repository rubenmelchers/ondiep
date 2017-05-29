<?php
require("settings.php");

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
    <link rel="stylesheet" href="<?= $url_base; ?>/css/bootstrap.min.css" type="text/css">

    <!-- Custom Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="<?= $url_base; ?>/css/font-awesome.min.css" rel="stylesheet">

    <!-- Plugin CSS -->

    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?= $url_base; ?>/css/style.css" type="text/css">

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
        <div class="col-md-4 col-sm-6 col-xs-0"></div>
        <div class="col-md-4 col-sm-6 col-xs-12">
            <form>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                    </div>
                </div>

                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</section>


<!-- jQuery -->
<script src="<?= $url_base; ?>/js/jquery.js"></script>

<!-- Plugin JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="<?= $url_base; ?>/js/bootstrap.min.js" type="application/javascript"></script>

<!-- Custom Theme JavaScript -->
<script src="<?= $url_base; ?>/js/main.js"></script>

</body>
</html>