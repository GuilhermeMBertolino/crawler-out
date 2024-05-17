<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  //<<PEGA Ian: adjustable wan port
  $data->wanmode = (object) null;
  $data->wanmode->value = getWanPort();
  $data->wanmode->type = 'radio';
  //PEGA>> 

  $data->login_type = (object) null;
  $data->login_type->value = getLoginType();
  $data->login_type->type = 'input';
  
  $data->deviceName = (object) null;
  $data->deviceName->value = getDeviceName();
  $data->deviceName->type = 'spantext';
  
  $data->domain = (object) null;
  $data->domain->value = getDhcpv4DomainName();
  $data->domain->type = 'input';

  $data->ipType = (object) null;
  $data->ipType->value = getWanInstanceIpType();
  $data->ipType->type = 'radio';

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getWanInstanceIpAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 'wpethr';

  $data->netmask = (object) null;
  $data->netmask->value = getWanInstanceIpMask();
  $data->netmask->type = 'ip';
  $data->netmask->idStr_prefix = 'wmask';

  $data->gateway = (object) null;
  $data->gateway->value = getWanInstanceGateway();
  $data->gateway->type = 'ip';
  $data->gateway->idStr_prefix = 'wgateway';

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

  $data->circleActivationStatus = (object) null;
  $data->circleActivationStatus->value = getCircleActivationStatus();
  
	echo json_encode($data);
?>
