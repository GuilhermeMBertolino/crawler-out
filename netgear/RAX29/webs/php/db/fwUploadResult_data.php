<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $checkResult = getFwUploadResult();
  
  $data->check_status = (object) null;
  $data->check_status->value = $checkResult["fwChecked"];
  
  $data->currentVer = (object) null;
  $data->currentVer->value = $checkResult["routerCurrentVersion"];
  $data->currentVer->type = "spantext";

  $data->uploadVer = (object) null;
  $data->uploadVer->value = $checkResult["routerNewVersion"];
  $data->uploadVer->type = "spantext";
  
  echo json_encode($data);
?>
