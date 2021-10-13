<?php

// phpmailer files
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';




$json = file_get_contents('../tovar.json');
$json = json_decode($json, true);


$title = "Замовлення магазин мед";

$message = '';
$message .= '<h1>Магазин мед</h1>';
$message .= '<p>Імя: ' .$_POST['ename'].'</p>';
$message .= '<p>Прізвище: ' .$_POST['esurname'].'</p>';
$message .= '<p>Номер тел: ' .$_POST['ephone'].'</p>';
$message .= '<p>Email: ' .$_POST['email'].'</p>';
$message .= '<h2>Адреса:</h2>';
$message .= '<p> ' .$_POST['eregion'].' область </p>';
$message .= '<p> ' .$_POST['edistrict'].'</p>';
$message .= '<p> ' .$_POST['estreet'].'</p>';
$message .= '<h2>Коментар:</h2>';
$message .= '<p> ' .$_POST['ecomment'].'</p>';
$message .= '<h2>Товари:</h2>';




$cart = $_POST['cart'];
$sum = 0;

foreach($cart as $id=>$count){
    $message .= $json[$id] ['name']. ' --- ';
    $message .= $count. 'шт. --- ';
    $message .= $count*$json[$id]['cost']. 'грн <br>';
    $message .= '<br>';
    $sum = $sum + $count*$json[$id]['cost'];
}
$message .= '<h2>Всього: </h2> <h3>'.$sum. ' грн</h3>';

print_r($message);


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'ssl://smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'lemakzhenua@gmail.com'; // Логин на почте lemakzhenua@gmail.com
    $mail->Password   = 'lev384285856567'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->SMTPOptions = array(

        'ssl' => array(
    
            'verify_peer' => false,
    
            'verify_peer_name' => false,
    
            'allow_self_signed' => true
    
        )
    
    );
    $mail->setFrom('lemakzhenua@gmail.com', 'Магазин Мед'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('zhenualemak@gmail.com');  
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $message; 
    
    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = "success";
        echo 1;
    } 
    else {
        $result = "error";
        echo 'error' . $mail->ErrorInfo;
    }
} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
// echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);












// $to = 'zhenualemak@gmail.com';
// $spectext = '<!DOCTYPE html><html><head><title>Замовлення мед</title></head><body>';
// $headers = 'MIME-Version: 1.0'. "\r\n";
// $headers = 'Content-type: text/html; charset=utf-8' . "\r\n";




// $m = mail($to, 'Замовлення мед', $spectext.$message.'</body></html>', $headers);

// if ($m) {echo 1;} else {echo 0;}

?>



