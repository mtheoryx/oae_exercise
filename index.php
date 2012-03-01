<?php 

?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title></title>
	<meta name="description" content="OAE Programming Exercise">
	<meta name="author" content="David R Poindexter">

	<meta name="viewport" content="width=device-width">
    
    <link rel="stylesheet" href="static/css/bootstrap.min.css">
	<link rel="stylesheet" href="static/css/style.css">
    
    <style type="text/css">
        section.canvas {
            width: 724px;
            min-width: 724px;
            -width: 720px;
            border: 1px solid #ccc;
            margin: 0 auto;
            height: 720px;
            min-height: 720px;
        }
        div.time_labels {
            width: 100px;
            min-width: 100px;
            float: left;
            border: 1px solid #333;
            padding: 0;
            margin: 0;
            height: 720px;
            min-height: 720px;
        }
        div.events {
            float: left;
            width: 620px;
            min-width: 620px;
            padding: 0;
            margin: 0;
            height: 720px;
            min-height: 720px;
            border: 1px solid blue;
        }
        
    </style>
    
	<script src="static/js/libs/modernizr-2.5.3-respond-1.1.0.min.js"></script>
</head>
<body>
<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

<header class="wide">
    <h1>Hello!</h1>
    <p class="tagline">This is a demo site for a PHP and JS exercise.</p>
</header>

<div class="container">

    <section class="main canvas">
        <div class="time_labels">
            <p>Labels here.</p>
        </div>
        <div class="events">
            <p>Calender here.</p>
        </div>
        
    </section>
    
</div>
<footer>
    <p class="copyright">Copyright &copy; 2012 <a href="http://davidrpoindexter.com">David R Poindexter III</a></p>
</footer>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="static/js/libs/jquery-1.7.1.min.js"><\/script>')</script>

<script src="static/js/plugins.js"></script>
<script src="static/js/script.js"></script>


</body>
</html>