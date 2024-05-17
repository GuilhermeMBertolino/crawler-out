<?
  include '../commonCfg.php';
  if (!isset($data)) 
  $data = new stdClass();

  $upgradeResult = array();
  $upgradeResult["FwUpgradeStatus"] = "Not Ready";

  $upgradeResult = getFwUpgradeResult();

  $data->upgrade_status = (object) null;
  $data->upgrade_status->value = $upgradeResult["FwUpgradeStatus"];

  echo json_encode($data);
?>
