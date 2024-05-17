<?
  include '../interface.php';
  include '../apmode.php';

  if (!isset($data)) 
    $data = new stdClass();

  $leaseTime = getLeaseTime();

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getIpVal_apmode_ipAddr();
  $data->ipAddr->type = 'spantext';
  
  $data->subnetMask = (object) null;
  $data->subnetMask->value = getIpVal_apmode_netmask();
  $data->subnetMask->type = 'spantext';
    
  $data->defaultGateway = (object) null;
  $data->defaultGateway->value = getIpVal_apmode_gateway();
  $data->defaultGateway->type = 'spantext';
  
  $data->dhcpServer = (object) null;
  $data->dhcpServer->value = getDhcpv4Router();
  $data->dhcpServer->type = 'spantext';
  
  $data->dnsPrimary = (object) null;
  $data->dnsPrimary->value = getIpVal_apmode_dns1();
  $data->dnsPrimary->type = 'spantext';
  
  $data->dnsSlave = (object) null;
  $data->dnsSlave->value = getIpVal_apmode_dns2();
  $data->dnsSlave->type = 'spantext';

  $data->leaseObtainedDays = (object) null;
  $data->leaseObtainedDays->value = $leaseTime["leaseDays"];
  $data->leaseObtainedDays->type = 'spantext';

  $data->leaseObtainedHours = (object) null;
  $data->leaseObtainedHours->value = $leaseTime["leaseHours"];
  $data->leaseObtainedHours->type = 'spantext';

  $data->leaseObtainedMinutes = (object) null;
  $data->leaseObtainedMinutes->value = $leaseTime["leaseMinutes"];
  $data->leaseObtainedMinutes->type = 'spantext';

  $data->leaseExpiredDays = (object) null;
  $data->leaseExpiredDays->value = $leaseTime["expireDays"];
  $data->leaseExpiredDays->type = 'spantext';

  $data->leaseExpiredHours = (object) null;
  $data->leaseExpiredHours->value = $leaseTime["expireHours"];
  $data->leaseExpiredHours->type = 'spantext';

  $data->leaseExpiredMinutes = (object) null;
  $data->leaseExpiredMinutes->value = $leaseTime["expireMinutes"];
  $data->leaseExpiredMinutes->type = 'spantext';

  echo json_encode($data);
?>
