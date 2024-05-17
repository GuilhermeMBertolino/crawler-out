<?
  include '../wifi.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->wpsStatus = (object) null;
  $data->wpsStatus->value = getwpsStatus();

  echo json_encode($data);
?>
