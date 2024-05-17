<?
  include '../commonCfg.php';
  if (!isset($data)) 
  $data = new stdClass();

  $upgradeResult = getFwDownloadResult();

  $data->upgrade_status = (object) null;
  $data->upgrade_status->value = $upgradeResult["FwUpgradeStatus"];

  echo json_encode($data);
?>
