<?
  include_once '../commonCfg.php';

  if (!isset($data)) 
  $data = new stdClass();

  $data->upgrade_init = (object) null;
  $data->upgrade_init->value = FwUpgradeInit();

  echo json_encode($data);
?>
