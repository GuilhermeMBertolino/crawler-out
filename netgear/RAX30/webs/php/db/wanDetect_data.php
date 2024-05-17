<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->wanConnectionStatus = (object) null;
  $data->wanConnectionStatus->value = getWANPortStatus();

  $data->wanDetectType = (object) null;
  $data->wanDetectType->value = getWizardWanDetectType();
  echo json_encode($data);
?>
