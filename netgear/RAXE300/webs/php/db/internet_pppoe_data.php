<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  //<<PEGA Ian: adjustable wan port
  $data->wanmode = (object) null;
  $data->wanmode->value = getWanPort();
  $data->wanmode->type = 'radio';
  //PEGA>>

  $data->username = (object) null;
  $data->username->value = getPppoeUsername();
  
  $data->password = (object) null;
  $data->password->value = getPppoePassword();
  
  $data->serviceName = (object) null;
  $data->serviceName->value = getPppoeServiceName();
  
  $data->mode_autoid = (object) null;
  $data->mode_autoid->value = getPppoeMode_autoid();
  $data->mode_autoid->type = 'select';
  
  $data->idleTimeout = (object) null;
  $data->idleTimeout->value = getPppoeIdleTime()/60;
  
  $data->ipType = (object) null;
  $data->ipType->value = getPppoeIpType();
  $data->ipType->type = 'radio';

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getWanInstanceIpAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 'wpethr';
  
  $data->openvpnEnable = (object) null;
  $data->openvpnEnable->value = "";
  
  $data->dnsType = (object) null;
  $data->dnsType->value = getDNStype();
  $data->dnsType->type = 'radio';
  
  $data->dns1 = (object) null;
  $data->dns1->value = getDNSServerIpAddr(1);
  $data->dns1->type = 'ip';
  $data->dns1->idStr_prefix = 'daddr';

  $data->dns2 = (object) null;
  $data->dns2->value = getDNSServerIpAddr(2);
  $data->dns2->type = 'ip';
  $data->dns2->idStr_prefix = 'pdaddr';

  $data->macClone = (object) null;
  //$value = getMacCloneValue();
  $data->macClone->value = getWANMacSelect(); //$value
  $data->macClone->type = 'radio';

  $data->cloneMac = (object) null;
  $data->cloneMac->value = getWANCloneMac();
  
  $data->wan_hwaddr_default = (object) null;
  $data->wan_hwaddr_default->value = getWANMacDefault();

  $data->wan_hwaddr_client = (object) null;
  $data->wan_hwaddr_client->value = getClientMac();

  $data->wan_hwaddr_user = (object) null;
  $data->wan_hwaddr_user->value = getWANMacUser();

  $data->runningWanMode = (object) null;
  $data->runningWanMode->value = get_wanMode();

  $data->circleActivationStatus = (object) null;
  $data->circleActivationStatus->value = getCircleActivationStatus();

	echo json_encode($data);
?>
