<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';


//Load Composer's autoloader
// require 'vendor/autoload.php';

// Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

// echo json_encode($mail);


try {
	//Server settings
	// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.timeweb.ru';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'info@2sia-test.tmweb.ru';                     //SMTP username
	$mail->Password   = '8GhQa3DC';                               //SMTP password
	// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
	$mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
	
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';

	//Recipients
	$mail->setFrom('info@2sia-test.tmweb.ru', 'Space-X');
	$mail->addAddress('smirnov.dev.sagirov@gmail.com', 'Joe User');     //Add a recipient
	// $mail->addAddress('ellen@example.com');               //Name is optional
	// $mail->addReplyTo('info@example.com', 'Information');

	//Attachments
	// $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name


	//Content
	$mail->isHTML(true);                                  //Set email format to HTML
	// $mail->Subject = 'Here is the subject';
	// $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
	// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';



	if( $_POST['action'] == 'callback' ) require 'callback.php';


} catch (Exception $e) {
	echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}