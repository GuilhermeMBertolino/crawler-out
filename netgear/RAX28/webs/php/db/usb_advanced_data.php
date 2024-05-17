<?
  include '../usb.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->netWorkName = (object) null;
  $data->netWorkName->value = getUsbSysDeviceName();

  $data->workgroup = (object) null;
  $data->workgroup->value = getUsbWorkGroup();

  $data->deviceName = (object) null;
  $data->deviceName->value = getUsbSysDeviceName();
  $data->deviceName->type = "spantext";

  echo json_encode($data);
?>
