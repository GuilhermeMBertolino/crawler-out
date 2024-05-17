<?
  include '../interface.php';
  include '../internetStatus.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->wanPortConnectTime = (object) null;
  $data->wanPortConnectTime->value = getTextVal_wanPortConnectTime();
  $data->wanPortConnectTime->type = 'spantext';
  
  $data->wanPortConnectStatus = (object) null;
  $data->wanPortConnectStatus->value = getTextVal_wanPortConnectStatus();
  $data->wanPortConnectStatus->type = 'spantext';
  
  $data->negotiationStatus = (object) null;
  $data->negotiationStatus->value = getTextVal_negotiationStatus();
  $data->negotiationStatus->type = 'spantext';
  
  $data->authStatus = (object) null;
  $data->authStatus->value = getTextVal_authStatus();
  $data->authStatus->type = 'spantext';
  
  $data->wanIp = (object) null;
  $data->wanIp->value = getWanInstanceIpAddr();
  $data->wanIp->type = 'spantext';
  
  $data->internetStatus = (object) null;
  $data->internetStatus->value = getWizardInternetStatus();
  
  echo json_encode($data);
?>
