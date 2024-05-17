<?
  include '../qos.php';
  if (!isset($data)) 
  $data = new stdClass();

  $checkResult = getQosDbUpgradeResult();

  $data->upgrade_status = (object) null;
  $data->upgrade_status->value = $checkResult["iQoS_DBUpgradeStatus"];

  $data->updateDb_ver = (object) null;
  $data->updateDb_ver->value = $checkResult["currentDBVersion"];
  $data->updateDb_ver->type = "spantext";

  $data->new_db_ver = (object) null;
  $data->new_db_ver->value = $checkResult["newDBVersion"];
  $data->new_db_ver->type = "spantext";

  $data->updateDb_date = (object) null;
  $data->updateDb_date->value = $checkResult["currentDBreleaseDate"];
  $data->updateDb_date->type = "spantext";

  echo json_encode($data);
?>
