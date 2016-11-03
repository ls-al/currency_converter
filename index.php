<!--
	Author: Aimilios
	Date: 2016/11/03
-->

<?php

$response = file_get_contents('https://api.fixer.io/latest');
$response = json_decode($response);

?>

<!DOCTYPE html>
<html>
<head>
	<title>Currency Converter</title>
</head>
<body>

	<form action="/" method="post">
		From:
		<select name="from">
			<option value="EUR">EUR</option>
			<?php
				foreach($response->rates as $key => $value) {
					echo "<option value='{$key}'>{$key}</option>";
				}
			?>
		</select>
		To:
		<select name="to">
			<option value="EUR">EUR</option>
			<?php
				foreach($response->rates as $key=> $value) {
					echo "<option value='{$key}'>{$key}</option>";	
				}
			?>
		</select>
		Amount:
		<input type="text" name="amount">

		<button type="submit">Convert</button>
	</form>

</body>
</html>

<pre>

<?php

if ($_POST['from'] && $_POST['to']) {

	$from 	= $_POST['from'];
	$to 	= $_POST['to'];
	$amount = $_POST['amount'];

	if ($from == $to) { die('From & To cannot be the same!'); }
	if ($amount == 0 || $amount === null) { die('Amount has to be something!'); }

	$response = file_get_contents("https://api.fixer.io/latest?base={$from}");
	$response = json_decode($response);

	$calc = ($amount * $response->rates->{$to});

	echo "Current exchange rate: {$response->rates->{$to}}<br>";

	echo "{$amount} {$from} is {$calc} {$to}<br>";

	/* Debugging */
	/*echo "<pre>";
	var_dump($response);
	var_dump($_POST);*/
}

?>
