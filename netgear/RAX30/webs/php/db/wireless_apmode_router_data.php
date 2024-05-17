<?
  include_once '../apmode.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->runningMode = (object) null;
  $data->runningMode->value = getRadioVal_mode();
  
  echo json_encode($data);
?>
