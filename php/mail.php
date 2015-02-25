<?php
require_once 'securimage/securimage.php';
$image = new Securimage();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


if ($image->check($request->captcha) == true) {
	$footer = "\n ************************************* \n"
			."Zusatzinformationen: \n"
			."Anrede: ".$request->gender."\n"
			."Vorname: ".$request->vorname."\n"
			."Nachname: ".$request->nachname."\n"
			."E-Mail: ".$request->email."\n";
	$to = 'info@alpgauer.de';
	$from = $request->email;
	$subject = "Mail from Alpgauer.de";
	$message = $request->nachricht.$footer;
	$headers = "From: $from";
	mail($to, $subject, $message, $headers);
  echo "1";
} else {
  echo "-1";
}

?>