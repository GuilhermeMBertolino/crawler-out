<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->dhcpUserClass = (object) null;
  $data->dhcpUserClass->value = getTextVal_AutoConfig_dhcpUserClass();
  $data->dhcpUserClass->type = 'input';

  $data->dhcpDomain = (object) null;
  $data->dhcpDomain->value = getTextVal_AutoConfig_dhcpDomain();
  $data->dhcpDomain->type = 'input';

  $data->wan6Ip = (object) null;
  $data->wan6Ip->value = getSpanVal_AutoConfig_wan6Ip();
  $data->wan6Ip->type = 'spantext';
  $data->wan6Ip->mlang = getMlangVal_AutoConfig_wan6Ip();
  
  $data->dnsType = (object) null;
  $data->dnsType->value = getRadioVal_AutoConfig_dnsType();
  $data->dnsType->type = 'radio';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_AutoConfig_Dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';
  
  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_AutoConfig_Dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'sdaddr';

  $data->lan6Ip = (object) null;
  $data->lan6Ip->value = getSpanVal_AutoConfig_lan6Ip();
  $data->lan6Ip->type = 'spantext';
  $data->lan6Ip->mlang = getMlangVal_AutoConfig_lan6Ip();
 
  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_AutoConfig_lanIpAddr();
  $data->lanIpAddr->type = 'radio';
 
  $data->enableInterfaceId = (object) null;
  $data->enableInterfaceId->value = getCheckboxVal_AutoConfig_enableInterfaceId();
  $data->enableInterfaceId->type = 'checkbox';
  
  $data->lanInterfaceId = (object) null;
  $data->lanInterfaceId->value = getIpVal_AutoConfig_lanInterfaceId();
  $data->lanInterfaceId->type = 'ipv6id';
  $data->lanInterfaceId->idStr_prefix = 'ipv6_interface_id';
  
  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  echo json_encode($data);
?>
