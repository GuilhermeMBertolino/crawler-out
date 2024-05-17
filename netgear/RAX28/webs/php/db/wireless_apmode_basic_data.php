<?
  include_once '../apmode.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->mode = (object) null;
  $data->mode->value = getRadioVal_mode();
  $data->mode->type = 'radio';
  
  echo json_encode($data);
?>
