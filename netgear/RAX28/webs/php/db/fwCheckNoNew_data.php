<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->sn = (object) null;
  $data->sn->value = getSerialNumber();

  $data->internet_status = (object) null;
  $data->internet_status->value = getWizardInternetStatus();
  echo json_encode($data);
?>
