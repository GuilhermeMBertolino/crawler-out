<?
  include '../qos.php';
  if (!isset($data)) 
  $data = new stdClass();

  $checkResult = getQosDbCheckResult();

  $data->check_status = (object) null;
  $data->check_status->value = $checkResult["iQoS_DBCheckStatus"];
  $data->check_status->type = "input";

  $data->updateDb_ver = (object) null;
  $data->updateDb_ver->value = $checkResult["currentDBVersion"];
  $data->updateDb_ver->type = "spantext";

  $data->new_db_ver = (object) null;
  $data->new_db_ver->value = $checkResult["newDBVersion"];
  $data->new_db_ver->type = "spantext";

  $data->release_data = (object) null;
  $data->release_data->value = $checkResult["currentDBreleaseDate"];
  $data->release_data->type = "spantext";

  $data->updateDb_date = (object) null;
  $data->updateDb_date->value = $checkResult["updateRequired"];
  $data->updateDb_date->type = "spantext";


  echo json_encode($data);
?>
