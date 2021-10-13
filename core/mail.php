<?php

// phpmailer files
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Vars
$json = file_get_contents('../tovar.json');
$json = json_decode($json, true);
$name = $_POST['ename'];
$surname = $_POST['esurname'];
$phone = $_POST['ephone'];
$email = $_POST['email'];
$region = $_POST['eregion'];
$district = $_POST['edistrict'];
$street = $_POST['estreet'];
$comment = $_POST['ecomment'];
$cart = $_POST['cart'];
$sum = 0;



// Message
$title = "Замовлення магазин мед";
$body = "
<h2>Магазин мед</h2>
<b>Імя:</b> $name<br>
<b>Прізвище:</b> $surname<br>
<b>Тел:</b> $phone<br><br>
<b>Email:</b> $email<br><br>
<h3>Адреса:</h3>
<b>Область:</b> $region<br>
$district<br>
$street<br><br>
<b>Коментар:</b> $comment<br><br>
<h3>Товари:</h3>
";

foreach($cart as $id=>$count){
    $body .= $json[$id] ['name']. ' --- ';
    $body .= $count. 'шт. --- ';
    $body .= $count*$json[$id]['cost']. 'грн <br>';
    $body .= '<br>';
    $sum = $sum + $count*$json[$id]['cost'];
}

$body .= "
<h2>Всього: </h2>
<h3>$sum грн</h3>
"


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'ssl://smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'lemakzhenua@gmail.com'; // Логин на почте
    $mail->Password   = '38428585'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('lemakzhenua@gmail.com', 'Магазин Мед'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('zhenualemak@gmail.com');  
    // $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен



// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>



