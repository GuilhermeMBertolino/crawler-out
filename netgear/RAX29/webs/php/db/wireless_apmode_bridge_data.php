<?
  include_once '../apmode.php';
  include_once '../interface.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->runningMode = (object) null;
  $data->runningMode->value = getRadioVal_mode();
 
  $data->deviceName = (object) null;
  $data->deviceName->value = getDeviceName();
  $data->deviceName->type = 'spantext';
  
  $data->enable_DynamicIp = (object) null;
  $data->enable_DynamicIp->value = getCheckboxVal_enable_DynamicIp();
  $data->enable_DynamicIp->type = 'checkbox';
  
  $data->ipAddr = (object) null;
  $data->ipAddr->value = getIpVal_apmode_ipAddr();
  $data->ipAddr->type = 'ip';
  $data->ipAddr->idStr_prefix = 's_pethr';
  
  $data->netmask = (object) null;
  $data->netmask->value = getIpVal_apmode_netmask();
  $data->netmask->type = 'ip';
  $data->netmask->idStr_prefix = 's_mask';

  $data->gateway = (object) null;
  $data->gateway->value = getIpVal_apmode_gateway();
  $data->gateway->type = 'ip';
  $data->gateway->idStr_prefix = 's_gateway';

  $data->enable_DynamicDns = (object) null;
  $data->enable_DynamicDns->value = getCheckboxVal_enable_DynamicDns();
  $data->enable_DynamicDns->type = 'checkbox';

  $data->dns1 = (object) null;
  $data->dns1->value = getIpVal_apmode_dns1();
  $data->dns1->type = 'ip';
  $data->dns1->idStr_prefix = 's_daddr';

  $data->dns2 = (object) null;
  $data->dns2->value = getIpVal_apmode_dns2();
  $data->dns2->type = 'ip';
  $data->dns2->idStr_prefix = 's_pdaddr';
  echo json_encode($data);
?>
