<?
  include_once '../interface.php';
  if (!isset($data))
    $data = new stdClass();

  $data->lanMacAddr = (object) null;
  $data->lanMacAddr->value = getLanMacAddr();

  echo json_encode($data);
?>
