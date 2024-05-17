<?
  include '../led.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->enableLed = (object) null;
  $data->enableLed->value = getRadioVal_enableLed();
  $data->enableLed->type = 'radio';

  echo json_encode($data);
?>
