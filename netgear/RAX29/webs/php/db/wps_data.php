<?
  include '../wifi.php';
  include '../wps.php';

  if (!isset($data)) 
  $data = new stdClass();

  $data->wpsStatus = (object) null;
  $data->wpsStatus->value = getwpsStatus();

  $data->wpsClientMac = (object) null;
  $data->wpsClientMac->value = getWpsConnectedClientMac();

  $data->wpsClientName = (object) null;
  $data->wpsClientName->value = getWpsDevNameByMac($data->wpsStatus->value, $data->wpsClientMac->value);

  echo json_encode($data);
?>
