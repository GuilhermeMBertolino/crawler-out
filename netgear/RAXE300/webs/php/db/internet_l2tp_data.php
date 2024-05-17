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
  $data->username->value = getL2tpUsername();
  
  $data->password = (object) null;
  $data->password->value = getL2tpPassword();
  
  $data->mode_autoid = (object) null;
  $data->mode_autoid->value = getL2tpMode_autoid();
  $data->mode_autoid->type = 'select';
  
  $data->idleTimeout = (object) null;
  $data->idleTimeout->value = getL2tpIdleTime();

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getL2tpIpAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 'myip';

  $data->netmask = (object) null;
  $data->netmask->value = getL2tpIpMask();
  $data->netmask->type = 'ip';
  $data->netmask->idStr_prefix = 'mymask';
  
  $data->serverAddr = (object) null;
  $data->serverAddr->value = getL2tpServerAddr();
  $data->serverAddr->type = 'input';

  $data->gateway = (object) null;
  $data->gateway->value = getL2tpGateway();
  $data->gateway->type = 'ip';
  $data->gateway->idStr_prefix = 'mygw';

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
