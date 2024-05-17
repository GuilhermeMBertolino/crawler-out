<?
  include '../commonCfg.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->upgrade_status = (object) null;
  $data->upgrade_status->value = getFwUpgradeCancel();

  echo json_encode($data);
?>
