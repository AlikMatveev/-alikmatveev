<?php
  $phone = $_POST['phone'];
  $results = json_decode($_POST['results'], true);

  $to = 'tfirst.msk@gmail.com';
  $sub = 'Анкета о состоянии автомобиля';

  $message = "Новая заявка\n
  Номер телефона: $phone\n";

  for($i=0; $i<count($results); $i++){
    $message .= "".$results[$i]['question'].': '.$results[$i]['answer']."\n";
  };

   mail ($to, $sub, $message, "Content-type:text/plain; charset = utf-8");
?>
