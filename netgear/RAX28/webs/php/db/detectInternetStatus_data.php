<?
  include '../dashboard.php';
  if (!isset($data))
  $data = new stdClass();

  $data->internetStatus = (object) null;
  $data->internetStatus->value = detectInternetStatus();
  echo json_encode($data);
?>
