<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->username = (object) null;
  $data->username->value = getPptpUsername();
  
  $data->password = (object) null;
  $data->password->value = getPptpPassword();
  
  $data->mode_autoid = (object) null;
  $data->mode_autoid->value = getPptpMode_autoid();
  $data->mode_autoid->type = 'select';
  
  $data->idleTimeout = (object) null;
  $data->idleTimeout->value = getPptpIdleTime();

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getPptpIpAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 'myip';

  $data->netmask = (object) null;
  $data->netmask->value = getPptpIpMask();
  $data->netmask->type = 'ip';
  $data->netmask->idStr_prefix = 'mymask';
  
  $data->serverAddr = (object) null;
  $data->serverAddr->value = getPptpServerAddr();
  $data->serverAddr->type = 'input';

  $data->gateway = (object) null;
  $data->gateway->value = getPptpGateway();
  $data->gateway->type = 'ip';
  $data->gateway->idStr_prefix = 'mygw';
  
  $data->connectId = (object) null;
  $data->connectId->value = getPptpConnectId();
  $data->connectId->type = 'input';

  $data->dnsType = (object) null;
  $data->dnsType->value = getDNStype();
  $data->dnsType->type = 'radio';
  
  $data->dns1 = (object) null;
  $data->dns1->value = getDNSServerIpAddr(1);
  $data->dns1->type = 'ip';
  $data->dns1->idStr_prefix = 'primary_dns_address';

  $data->dns2 = (object) null;
  $data->dns2->value = getDNSServerIpAddr(2);
  $data->dns2->type = 'ip';
  $data->dns2->idStr_prefix = 'second_dns_address';

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
