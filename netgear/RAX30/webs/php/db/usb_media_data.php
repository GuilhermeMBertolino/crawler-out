<?
  include '../usb.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->enable = (object) null;
  $data->enable->value = getMediaServerEnable();
  $data->enable->type = "checkbox";

  $data->netWorkName = (object) null;
  $data->netWorkName->value = getUsbSysDeviceName();

  $data->deviceName = (object) null;
  $data->deviceName->value = getDeviceName();
  $data->deviceName->type = "spantext";

  echo json_encode($data);
?>
