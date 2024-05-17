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

  $data->wifiSsid6G = (object) null;
  $data->wifiSsid6G->value = getTextVal_wifiSsid6G();
  $data->wifiSsid6G->type = 'input';

  $data->wifiSecurity6G = (object) null;
  $data->wifiSecurity6G->value = getRadioVal_wifiSecurity6G();
  $data->wifiSecurity6G->type = 'radio';

  $data->wifiPassword6G = (object) null;
  $data->wifiPassword6G->value = getTextVal_wifiPassword6G();
  $data->wifiPassword6G->type = 'input';

  echo json_encode($data);
?>
