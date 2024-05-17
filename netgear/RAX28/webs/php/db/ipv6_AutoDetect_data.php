<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->v6TypeHid = (object) null;
  $data->v6TypeHid->value = getSelectVal_v6Type();
  $data->v6TypeHid->type = 'input';

  $data->wan6Ip = (object) null;
  $data->wan6Ip->value = getSpanVal_AutoDetect_wan6Ip();
  $data->wan6Ip->type = 'spantext';
  $data->wan6Ip->mlang = getMlangVal_AutoDetect_wan6Ip();

  $data->dnsType = (object) null;
  $data->dnsType->value = getRadioVal_AutoDetect_dnsType();
  $data->dnsType->type = 'radio';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_AutoDetect_Dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';

  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_AutoDetect_Dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'pdaddr';

  $data->lan6Ip = (object) null;
  $data->lan6Ip->value = getSpanVal_AutoDetect_lan6Ip();
  $data->lan6Ip->type = 'spantext';
  $data->lan6Ip->mlang = getMlangVal_AutoDetect_lan6Ip();

  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_AutoDetect_lanIpAddr();
  $data->lanIpAddr->type = 'radio';

  $data->enableInterfaceId = (object) null;
  $data->enableInterfaceId->value = getCheckboxVal_AutoDetect_enableInterfaceId();
  $data->enableInterfaceId->type = 'checkbox';

  $data->lanInterfaceId = (object) null;
  $data->lanInterfaceId->value = getIpVal_AutoDetect_lanInterfaceId();
  $data->lanInterfaceId->type = 'ipv6id';
  $data->lanInterfaceId->idStr_prefix = 'ipv6_interface_id';

  $data->AutoDetectResult = (object) null;
  $data->AutoDetectResult->value = "";
  $data->AutoDetectResult->type = 'spantext';
  $data->AutoDetectResult->mlang = getMlangVal_AutoDetect_detectResult();

  $data->wanConnectionTypeHid = (object) null;
  $data->wanConnectionTypeHid->value = getWanConnectionStatus();
  $data->wanConnectionTypeHid->type = 'input';

  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  echo json_encode($data);
?>
