<?
  include '../log.php';
  if (!isset($data))
    $data = new stdClass();

  $data->allowedSite = (object) null;
  $data->allowedSite->value = getCheckboxVal_allowedSite();
  $data->allowedSite->type = 'checkbox';

  $data->blockedSite = (object) null;
  $data->blockedSite->value = getCheckboxVal_blockedSite();
  $data->blockedSite->type = 'checkbox';
  
  $data->webAccess = (object) null;
  $data->webAccess->value = getCheckboxVal_webAccess();
  $data->webAccess->type = 'checkbox';
  
  $data->routerOp = (object) null;
  $data->routerOp->value = getCheckboxVal_routerOp();
  $data->routerOp->type = 'checkbox';
  
  $data->knownAttack = (object) null;
  $data->knownAttack->value = getCheckboxVal_knownAttack();
  $data->knownAttack->type = 'checkbox';
  
  $data->portForwarding = (object) null;
  $data->portForwarding->value = getCheckboxVal_portForwarding();
  $data->portForwarding->type = 'checkbox';
  
  $data->wlan = (object) null;
  $data->wlan->value = getCheckboxVal_wlan();
  $data->wlan->type = 'checkbox';
  
//  $data->internet = (object) null;
//  $data->internet->value = getCheckboxVal_internet();
//  $data->internet->type = 'checkbox';
  
  $data->wlanSchedule = (object) null;
  $data->wlanSchedule->value = getCheckboxVal_wlanSchedule();
  $data->wlanSchedule->type = 'checkbox';

  $data->readyShare = (object) null;
  $data->readyShare->value = getCheckboxVal_readyShare();
  $data->readyShare->type = 'checkbox';

  $data->vpn = (object) null;
  $data->vpn->value = getCheckboxVal_vpn();
  $data->vpn->type = 'checkbox';

  $data->log_lacp = (object) null;
  $data->log_lacp->value = getCheckboxVal_lacp();
  $data->log_lacp->type = 'checkbox';

  $data->currentTime = (object) null;
  $data->currentTime->value = getTextVal_currentTime();
  $data->currentTime->type = 'spantext';

  echo json_encode($data);
?>
