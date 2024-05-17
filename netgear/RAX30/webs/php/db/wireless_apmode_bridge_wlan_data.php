<?
  include_once '../apmode.php';
  include_once '../interface.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->wifiIF_autoid = (object) null;
  $data->wifiIF_autoid->value = getSelectVal_wifiIF_autoid();
  $data->wifiIF_autoid->type = 'select';
  
  $data->wifiSsid2G = (object) null;
  $data->wifiSsid2G->value = getTextVal_wifiSsid2G();
  $data->wifiSsid2G->type = 'input';
  
  $data->wifiSecurity2G = (object) null;
  $data->wifiSecurity2G->value = getRadioVal_wifiSecurity2G();
  $data->wifiSecurity2G->type = 'radio';
  
  $data->wifiPassword2G = (object) null;
  $data->wifiPassword2G->value = getTextVal_wifiPassword2G();
  $data->wifiPassword2G->type = 'input';
  
  $data->wifiSsid5G = (object) null;
  $data->wifiSsid5G->value = getTextVal_wifiSsid5G();
  $data->wifiSsid5G->type = 'input';
  
  $data->wifiSecurity5G = (object) null;
  $data->wifiSecurity5G->value = getRadioVal_wifiSecurity5G();
  $data->wifiSecurity5G->type = 'radio';
  
  $data->wifiPassword5G = (object) null;
  $data->wifiPassword5G->value = getTextVal_wifiPassword5G();
  $data->wifiPassword5G->type = 'input';

  echo json_encode($data);
?>
