<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getIpVal_ipAddr();
  $data->ipAddr->type = 'ipv6';
  $data->ipAddr->idStr_prefix = 'ipv6wanaddr';

  $data->ipPrefix = (object) null;
  $data->ipPrefix->value = getTextVal_ipPrefix();
  $data->ipPrefix->type = 'input';
 
  $data->gateway = (object) null;
  $data->gateway->value = getIpVal_gateway();
  $data->gateway->type = 'ipv6';
  $data->gateway->idStr_prefix = 'ipv6gateway';
  
  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_dns1();
  $data->dns1->type = 'ipv6';
  $data->dns1->idStr_prefix = 'pdaddr';
  
  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_dns2();
  $data->dns2->type = 'ipv6';
  $data->dns2->idStr_prefix = 'sdaddr';

  $data->lanIpAddr = (object) null;
  $data->lanIpAddr->value = getRadioVal_fixed_lanIpAddr();
  $data->lanIpAddr->type = 'radio';
 
  $data->lanIp = (object) null;
  $data->lanIp->value = getIpVal_lanIp();
  $data->lanIp->type = 'ipv6';
  $data->lanIp->idStr_prefix = 'ipv6_lan';
 
  $data->lanIpPrefix = (object) null;
  $data->lanIpPrefix->value = getTextVal_lanIpPrefix();
  $data->lanIpPrefix->type = 'input';

  $data->filter = (object) null;
  $data->filter->value = getRadioVal_filter();
  $data->filter->type = 'radio';
  
  echo json_encode($data);
?>
