<?
  include '../interface.php';

  if (!isset($data)) 
  $data = new stdClass();

  $data->internetStatus = (object) null;
  $data->internetStatus->value = getWizardInternetStatus();

  $data->internetStatusconflict = (object) null;
  $data->internetStatusconflict->value = getWanLanConflictFile();
  echo json_encode($data);
?>
