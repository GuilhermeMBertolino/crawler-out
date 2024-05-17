<?
  include '../interface.php';
  if (!isset($data))
  $data = new stdClass();

  $data->internetStatus = (object) null;
  $data->internetStatus->value = getWizardInternetStatus_autoWan();
  echo json_encode($data);
?>
