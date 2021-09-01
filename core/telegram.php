<?php


// ### Get goods from JSON file  ###
$json = file_get_contents('../tovar.json');
$json = json_decode($json, true);

// #### Get data from form  ####
$name = $_POST['ename'];
$surname = $_POST['esurname'];
$phone = $_POST['ephone'];
$email = $_POST['email'];
$region = $_POST['eregion'];
$district = $_POST['edistrict'];
$street = $_POST['estreet'];
$comment = $_POST['ecomment'];


// #### Create message  ####

$txt = '';

$arr = array(
  'Імя: ' => $name,
  'Прізвище: ' => $surname,
  'Телефон: ' => $phone,
  'E-mail: ' => $email,
  'Коментар: ' => $comment,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$txt .= "%0A";
$txt .= "<b>Адреса:</b>"."%0A";
$txt .= $region." обл."."%0A";
$txt .= $district."%0A";
$txt .= $street."%0A";
$txt .= "%0A";
$txt .= "<b>Замовлення:</b>";
$txt .= "%0A";

// ### Add goods from cart to message ###
$cart = $_POST['cart'];
$sum = 0;

foreach($cart as $id=>$count){

    $txt .= $json[$id] ['name']." x ";
    $txt .= $count." шт. = ";
    $txt .= $count*$json[$id]['cost']." грн"."%0A";
    $sum = $sum + $count*$json[$id]['cost'];

}
$txt .= "%0A";
$txt .= "<b>Всього: </b>".$sum." грн";




// ### Telegram bot data  ###

/* https://api.telegram.org/XXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
 XXXXXXXXXXXXXXXXXXXXXXX - TOKEN OF TELEGRAM BOT */
$token = "";
// ID OF CHAT IN TELEGRAM
$chat_id = "";


// ### Send message via tg bot ###
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

// ### Check result ###
if ($sendToTelegram) {
  echo 1;
} else {
  echo "Error";
}
?>