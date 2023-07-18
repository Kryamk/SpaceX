<?php


$validation = [];
$validation['valid'] = false;


$fields = [
	'name' => [
		'field_name' => 'Имя',
		'required' => 1,
	],
	'lastname' => [
		'field_name' => 'Фамилия',
		'required' => 1,
	],
	'message' => [
		'field_name' => 'Сообщение',
		'required' => 1,
	],
	'telEmail' => [
		'field_name' => 'Телефон или почта',
		'required' => 1,
	],
];


function debug($data){
	echo '<pre>' . print_r($data, 1) . '</pre>';
	// echo '<pre>' . var_dump($data) . '</pre>';
}

function load($data) {
	foreach ($_POST as $k => $v) {
		if(array_key_exists($k, $data)) {
			$val = trim($v);
			$val = stripslashes($v);
			$val = strip_tags($v);
			$val = htmlspecialchars($v);
			$data[$k]['value'] = $val;
		}
	}
	return $data;
}

function validate($data) {
	global $validation;
	$check_err = 0;

	foreach($data as $k => $v) {
		if($data[$k]['required'] && empty($data[$k]['value'])) {
			$validation['fields'][] = ['name' => $k, 'errors'=>["Вы не заполнили поле {$data[$k]['field_name']}"] ];
			$validation['valid'] = false;
			$check_err = 1;
		}
		else {
			$validation['fields'][] = ['name' => $k, 'errors'=>[] ];
		}
	}

	if (!$check_err) {
		return true;
	}
}



$fields = load($fields);
if (validate($fields)) {

	$validation['valid'] = true;

	if (mb_strlen($fields['name']['value']) >= 15) {
		$validation['fields'][] = ['name' => 'name', 'errors'=>["Поле {$fields['name']['field_name']} должно быть меньше 15 символов"] ];
		$validation['valid'] = false;
	}
	if (mb_strlen($fields['lastname']['value']) >= 15) {
		$validation['fields'][] = ['name' => 'lastname', 'errors'=>["Поле {$fields['lastname']['field_name']} должно быть меньше 15 символов"] ];
		$validation['valid'] = false;
	}

	function tel_or_email($fields) {
		global $validation;
		$pattern_phone = '/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/';
		if(filter_var($fields['telEmail']['value'], FILTER_VALIDATE_EMAIL)) {
			$validation['telEmail'] = 'Email';
		}
		elseif (preg_match($pattern_phone, $fields['telEmail']['value'])) {
			$validation['telEmail'] = 'Телефон';
		}
		else {
			$validation['fields'][] = ['name' => 'telEmail', 'errors'=>["Некорректное поле {$fields['telEmail']['field_name']}"] ];
			$validation['valid'] = false;
		}
	}
	tel_or_email($fields);

	if(!$validation['valid']) {
		echo json_encode($validation);
		die;
	}

	$title = $_POST['title'] ? $_POST['title'] : 'Форма заказа';
	$mail->Subject = $title;

	$message = '';
	$message .= '<p><b>Имя: </b><span>'.$fields['name']['value'].'</span></p>';
	$message .= '<p><b>Фамилия: </b><span>'.$fields['lastname']['value'].'</span></p>';
	$message .= '<p><b>'.$validation['telEmail'].': </b><span>'.$fields['telEmail']['value'].'</span></p>';
	$message .= '<p><b>Сообщение: </b><span>'.$fields['message']['value'].'</span></p>';


	$mail->Body = "
		<div id='margin: 20px 30px;font-size:14px;'>
			<h2>$title</h2>
			$message
		</div>
	";


	if(!$mail->send()) {
	// if(false) {
		$validation['sendError'] = 'Ошибка: ' . $mail->ErrorInfo;
		echo json_encode($validation);
	}
	else {
		echo json_encode($validation);
	}
} else {
	echo json_encode($validation);
}

die;