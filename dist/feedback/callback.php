<?php

$validation = [];
$validation['valid'] = true;


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
        // 'value' => '+7(869) 212-34-567'
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
    

    foreach($data as $k => $v) {
        $check_err = 0;

        if($data[$k]['required'] && empty($data[$k]['value'])) {
            $validation['fields'][] = ['name' => $k, 'errors'=>["Вы не заполнили поле {$data[$k]['field_name']}"] ];
            $validation['valid'] = false;
            $check_err = 1;
        }

        elseif ($k == 'telEmail') {
            $pattern_phone = '/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/';
            
           if(filter_var($data[$k]['value'], FILTER_VALIDATE_EMAIL)) {
               $validation['telEmail'] = 'Email';
               $check_err = 0;
           }
           elseif (preg_match($pattern_phone, $data[$k]['value'])) {
                $validation['telEmail'] = 'Телефон';
                $check_err = 0;
           }
           else {
            $validation['fields'][] = ['name' => $k, 'errors'=>["Некорректное поле {$data[$k]['field_name']}"] ];
            $check_err = 1;
           }
        }

        elseif ($k == 'name' || $k == 'lastname') {
            if (mb_strlen($data[$k]['value']) >= 15) {
                $validation['fields'][] = ['name' => $k, 'errors'=>["Поле {$data[$k]['field_name']} должно быть меньше 15 символов"] ];
                $check_err = 1;
            }
        }

        if (!$check_err) {
            $validation['fields'][] = ['name' => $k, 'errors'=>[] ];
            $validation['valid'] = true;
        }

    }

    return $validation['valid'];
}


if(empty($_POST)){
    die;
}
else {
    $fields = load($fields);
    validate($fields);

    // debug($validation);
    die;

    $title = $_POST['title'] ? $_POST['title'] : 'Форма заказа';
    $mail->Subject = $title;


    $message = '';
    foreach ($validation['fields'] as $value) {
        if(!$value['errors']) {
            if ($value['name'] == 'telEmail') {
                $message .= '<p><b>'.$validation['telEmail'].': </b><span>'.$fields[$value['name']]['value'].'</span></p>';
            } 
            else {
                $message .= '<p><b>'.$fields[$value['name']]['field_name'].': </b><span>'.$fields[$value['name']]['value'].'</span></p>';
            }
        }
        
    }


    $mail->Body = "
        <div id='margin: 20px 30px;font-size:14px;'>
            <h2>$title</h2>
            $message
        </div>
    ";


    if ($validation['valid']) {
        if(!$mail->send()) {
        // if(false) {
            $validation['sendError'] = 'Ошибка: ' . $mail->ErrorInfo;
            echo json_encode($validation);
        } else {
            echo json_encode($validation);
        }
    }
    else {
        echo json_encode($validation);
    }
    
}






