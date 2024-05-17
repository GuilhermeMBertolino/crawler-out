<?
  include '../usb.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->deviceName = (object) null;
  $data->deviceName->value = getUsbSysDeviceName();
  $data->deviceName->type = "spantext";

  echo json_encode($data);
?>
