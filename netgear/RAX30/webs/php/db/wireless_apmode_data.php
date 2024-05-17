<?
  include '../wifi.php';
  include '../interface.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->enable = (object) null;
  $data->enable->value = getCheckboxVal_apmode_enable();
  $data->enable->type = 'checkbox';

  $data->{'24GSSID'} = (object) null;
  $data->{'24GSSID'}->value = getTextVal_apmode_24GSSID();
  $data->{'24GSSID'}->type = 'spantext';
  
  $data->{'5GSSID'} = (object) null;
  $data->{'5GSSID'}->value = getTextVal_apmode_5GSSID();
  $data->{'5GSSID'}->type = 'spantext';

  $data->{'24GPassword'} = (object) null;
  $data->{'24GPassword'}->value = getTextVal_apmode_24GPassword();
  $data->{'24GPassword'}->type = 'spantext';

  $data->{'5GPassword'} = (object) null;
  $data->{'5GPassword'}->value = getTextVal_apmode_5GPassword();
  $data->{'5GPassword'}->type = 'spantext';

  $data->ipType = (object) null;
  $data->ipType->value = getRadioVal_apmode_ipType();
  $data->ipType->type = 'radio';

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getIpVal_apmode_ipAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 'APaddr';

  $data->netmask = (object) null;
  $data->netmask->value = getIpVal_apmode_netmask();
  $data->netmask->type = 'ip';
  $data->netmask->idStr_prefix = 'APmask';

  $data->gateway = (object) null;
  $data->gateway->value = getIpVal_apmode_gateway();
  $data->gateway->type = 'ip';
  $data->gateway->idStr_prefix = 'APgateway';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_apmode_dns1();
  $data->dns1->type = 'ip';
  $data->dns1->idStr_prefix = 'APDAddr';

  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_apmode_dns2();
  $data->dns2->type = 'ip';
  $data->dns2->idStr_prefix = 'APPDAddr1';
  
  echo json_encode($data);
?>
