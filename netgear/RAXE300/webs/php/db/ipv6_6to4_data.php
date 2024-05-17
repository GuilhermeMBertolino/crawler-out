<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->relayRouterType = (object) null;
  $data->relayRouterType->value = getRadioVal_6to4_relayRouterType();
  $data->relayRouterType->type = 'radio';

  $data->relayRouterIp = (object) null;
  $data->relayRouterIp->value = getIpVal_6to4_relayRouterIp();
  $data->relayRouterIp->type = 'ip';
  $data->relayRouterIp->idStr_prefix = 'wip';

  $data->dnsType = (object) null;
  $data->dnsType->value = getRadioVal_6to4_dnsType();
  $data->dnsType->type = 'radio';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_6to4_Dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';
  
  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_6to4_Dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'sdaddr';

  $data->lan6Ip = (object) null;
  $data->lan6Ip->value = getSpanVal_6to4_lan6Ip();
  $data->lan6Ip->type = 'spantext';
  $data->lan6Ip->mlang = getMlangVal_6to4_lan6Ip();
 
  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_6to4_lanIpAddr();
  $data->lanIpAddr->type = 'radio';
 
  $data->enableInterfaceId = (object) null;
  $data->enableInterfaceId->value = getCheckboxVal_6to4_enableInterfaceId();
  $data->enableInterfaceId->type = 'checkbox';
  
  $data->lanInterfaceId = (object) null;
  $data->lanInterfaceId->value = getIpVal_6to4_lanInterfaceId();
  $data->lanInterfaceId->type = 'ipv6id';
  $data->lanInterfaceId->idStr_prefix = 'ipv6_interface_id';
  
  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  echo json_encode($data);
?>
