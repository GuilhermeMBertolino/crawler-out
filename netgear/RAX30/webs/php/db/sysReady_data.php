<?
  include '../commonCfg.php';
  if (!isset($data)) 
    $data = new stdClass();

  $data->fwVersion = (object) null;
  $data->fwVersion->value = getFirmwareVer();

  echo json_encode($data);
?>
