<?
  include '../usb.php';
  if (!isset($data)) 
    $data = new stdClass();

  $data->registrationState = (object) null;
  $data->registrationState->value = getUsbRegistrationState();
  
  $data->registrationName = (object) null;
  $data->registrationName->value = getUsbRegistrationState();
  $data->registrationName->type = "spantext";

  echo json_encode($data);
?>
