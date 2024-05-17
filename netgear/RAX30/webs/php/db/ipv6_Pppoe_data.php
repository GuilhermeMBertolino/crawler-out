<?
  include '../ipv6.php';
  include_once '../interface.php';
  include_once '../pppoe.php';
  
  if (!isset($data))
    $data = new stdClass();
 
  $data->usePPPoEv4 = (object) null;
  $data->usePPPoEv4->value = getCheckboxVal_Pppoe_usePPPoEv4();
  $data->usePPPoEv4->type = 'checkbox';

  $data->login = (object) null;
  $data->login->value = getTextVal_Pppoe_login();
  $data->login->type = 'input';

  $data->password = (object) null;
  $data->password->value = getTextVal_Pppoe_password();
  $data->password->type = 'input';
 
  $data->serviceName = (object) null;
  $data->serviceName->value = getTextVal_Pppoe_serviceName();
  $data->serviceName->type = 'input';
  
  $data->mode = (object) null;
  $data->mode->value = getSelectVal_Pppoe_mode();
  $data->mode->type = 'select';

  $data->wan6Ip = (object) null;
  $data->wan6Ip->value = getSpanVal_Pppoe_wan6Ip();
  $data->wan6Ip->type = 'spantext';
  $data->wan6Ip->mlang = getMlangVal_Pppoe_wan6Ip();
  
  $data->dnsType = (object) null;
  $data->dnsType->value = getRadioVal_Pppoe_dnsType();
  $data->dnsType->type = 'radio';
  
  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_Pppoe_Dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';
  
  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_Pppoe_Dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'sdaddr';

  $data->lan6Ip = (object) null;
  $data->lan6Ip->value = getSpanVal_Pppoe_lan6Ip();
  $data->lan6Ip->type = 'spantext';
  $data->lan6Ip->mlang = getMlangVal_Pppoe_lan6Ip();
 
  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_Pppoe_lanIpAddr();
  $data->lanIpAddr->type = 'radio';
 
  $data->enableInterfaceId = (object) null;
  $data->enableInterfaceId->value = getCheckboxVal_Pppoe_enableInterfaceId();
  $data->enableInterfaceId->type = 'checkbox';
  
  $data->lanInterfaceId = (object) null;
  $data->lanInterfaceId->value = getIpVal_Pppoe_lanInterfaceId();
  $data->lanInterfaceId->type = 'ipv6id';
  $data->lanInterfaceId->idStr_prefix = 'ipv6_interface_id';
  
  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  $data->v4WanMode = (object) null;
  $data->v4WanMode->value = get_wanMode();

  $data->v4PppoeConnMode = (object) null;
  $data->v4PppoeConnMode->value = getPppoeMode();
  
  echo json_encode($data);
?>
