<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$token = "1967977598:AAEBqon3ME9bwDy8Z-e2tbi_ZEr8cnQIxsw";
$chat_id = "-543045312";
$arr = array(
  'Імя: ' => $name,
  'E-mail: ' => $email,
  'Повідомлення: %0A' => $message
);

$txt = "<b>Питання з сайту</b>"."%0A";
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo 1;
} else {
  echo "Error";
}
?>