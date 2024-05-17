<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->prefix = (object) null;
  $data->prefix->value = getIpVal_6rd_prefix();
  $data->prefix->type = 'ipv6id';
  $data->prefix->idStr_prefix = 'ipv6_6rd_pre';

  $data->prefixLength = (object) null;
  $data->prefixLength->value = getTextVal_6rd_prefixLength();
  $data->prefixLength->type = 'input';
 
  $data->ipv4BoderAddr = (object) null;
  $data->ipv4BoderAddr->value = getIpVal_6rd_ipv4BoderAddr();
  $data->ipv4BoderAddr->type = 'ip';
  $data->ipv4BoderAddr->idStr_prefix = 'relay_addr';
  
  $data->ipv4BoderMaskLen = (object) null;
  $data->ipv4BoderMaskLen->value = getTextVal_6rd_ipv4BoderMaskLen();
  $data->ipv4BoderMaskLen->type = 'input';

  $data->dnsType = (object) null;
  $data->dnsType->value = getRadioVal_6rd_dnsType();
  $data->dnsType->type = 'radio';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_6rd_Dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';
  
  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_6rd_Dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'sdaddr';

  $data->lan6Ip = (object) null;
  $data->lan6Ip->value = getSpanVal_6rd_lan6Ip();
  $data->lan6Ip->type = 'spantext';
  $data->lan6Ip->mlang = getMlangVal_6rd_lan6Ip();
 
  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_6rd_lanIpAddr();
  $data->lanIpAddr->type = 'radio';
 
  $data->enableInterfaceId = (object) null;
  $data->enableInterfaceId->value = getCheckboxVal_6rd_enableInterfaceId();
  $data->enableInterfaceId->type = 'checkbox';
  
  $data->lanInterfaceId = (object) null;
  $data->lanInterfaceId->value = getIpVal_6rd_lanInterfaceId();
  $data->lanInterfaceId->type = 'ipv6id';
  $data->lanInterfaceId->idStr_prefix = 'ipv6_interface_id';
  
  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  echo json_encode($data);
?>
