<?
  include '../wps.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->wps_status = (object) null;
  $data->wps_status->value = getWpsCheckResult();

  echo json_encode($data);
?>
