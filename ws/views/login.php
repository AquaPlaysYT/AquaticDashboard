<?php

include('database_connection.php');


?>

<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<meta charset="utf-8">
		<title>Aquatic Development Login</title>
		<style>
		.login-form {
			width: 300px;
			margin: 0 auto;
			font-family: Tahoma, Geneva, sans-serif;
		}
		.login-form h1 {
			text-align: center;
			color: #ffffff;
			font-size: 24px;
			padding: 20px 0 20px 0;
		}
		.login-form input[type="password"],
		.login-form input[type="text"] {
			width: 100%;
			padding: 15px;
			border: 1px solid #dddddd;
			margin-bottom: 15px;
			box-sizing:border-box;
		}
		.login-form input[type="submit"] {
			width: 100%;
			padding: 15px;
			background-color: #535b63;
			border: 0;
			box-sizing: border-box;
			cursor: pointer;
			font-weight: bold;
			color: #ffffff;
		}
		h2 {
			text-align: center;
			color: #ffffff;
			font-size: 24px;
		}
		h3 {
			text-align: center;
		}
		</style>
		<script src="/ws/views/login.js"></script>
	</head>
	<body background="https://cdn2.unrealengine.com/Fortnite%2Ffriend-invite%2Fbkgrd-1920x1080-41052fa8464fac09fbba2eb60254641b8208e55d.jpg">
		<div class="login-form">
			<h1>Aquatic Development Team</h1>
			<form action="auth" method="POST">
				<input type="text" name="username" placeholder="Username" required>
				<input type="password" name="password" placeholder="Password" required>
				<input type="submit">
			</form>			

			<label>⠀ </label>

			<form action="guest" method="POST">
				<input type="submit" name="login" class="btn btn-info" value="Continue As Guest"/>
			</form>
			
			<h1>Announcements</h1>

		</div>

		<h2><u>Thank you for using Aquatic Web Dashboard this site is currently on-going testing so there will be some bugs!</u></h2>

		<h3><a href="https://discord.gg/J22ZmTa">Support</a></h3>
		<h3><a href="https://twitter.com/AquaPlaysYT">Aqua Plays Twitter</a></h3>
		<h3><a href="https://twitter.com/karmakittenx">Karma Kittens Twitter</a></h3>
		<h3><a href="https://youtube.com/c/aquaplaysyt">Youtube</a></h3>
	</body>
</html>