<?
  include_once '../apmode.php';
  include_once '../interface.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->runningMode = (object) null;
  $data->runningMode->value = getRadioVal_mode();
  
  $data->ipType = (object) null;
  $data->ipType->value = getRadioVal_apmode_ipType();
  $data->ipType->type = 'radio';
 
  $data->deviceName = (object) null;
  $data->deviceName->value = getDeviceName();
  $data->deviceName->type = 'spantext';
  
  $data->{'24GSSID'} = (object) null;
  $data->{'24GSSID'}->value = getTextVal_apmode_24GSSID();
  $data->{'24GSSID'}->type = 'spantext';
  
  $data->{'24GPassword'} = (object) null;
  $data->{'24GPassword'}->value = getTextVal_apmode_24GPassword();
  $data->{'24GPassword'}->type = 'spantext';
  
  $data->{'5GSSID'} = (object) null;
  $data->{'5GSSID'}->value = getTextVal_apmode_5GSSID();
  $data->{'5GSSID'}->type = 'spantext';
  
  $data->{'5GPassword'} = (object) null;
  $data->{'5GPassword'}->value = getTextVal_apmode_5GPassword();
  $data->{'5GPassword'}->type = 'spantext';

  $data->{'6GSSID'} = (object) null;
  $data->{'6GSSID'}->value = getTextVal_apmode_6GSSID();
  $data->{'6GSSID'}->type = 'spantext';

  $data->{'6GPassword'} = (object) null;
  $data->{'6GPassword'}->value = getTextVal_apmode_6GPassword();
  $data->{'6GPassword'}->type = 'spantext';

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getIpVal_apmode_ipAddr();
  $data->ipAddr->type = 'input';
  
  $data->netmask = (object) null;
  $data->netmask->value = getIpVal_apmode_netmask();
  $data->netmask->type = 'input';

  $data->gateway = (object) null;
  $data->gateway->value = getIpVal_apmode_gateway();
  $data->gateway->type = 'input';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_apmode_dns1();
  $data->dns1->type = 'input';

  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_apmode_dns2();
  $data->dns2->type = 'input';
  
  echo json_encode($data);
?>
