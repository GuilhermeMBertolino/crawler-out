<?
  include '../interface.php';
  if (!isset($data)) 
    $data = new stdClass();
    
  $data->connetionUpTime = (object) null;
  $data->connetionUpTime->value = getPppoeConnectionTime();
  $data->connetionUpTime->type = 'spantext';
  
  $data->connetionStatus = (object) null;
  if (getPppoeConnectionStatus() == "Connected")
  {
    $data->connetionStatus->mlang = "AWR009";
  }
  else
  {
    $data->connetionStatus->mlang = "AWR008";
  }
  $data->connetionStatus->type = 'spantext';
  
  $data->negotiation = (object) null;
  $data->negotiation->value = "--";
  $data->negotiation->mlang = getMlang_PppoeNegotiation();
  $data->negotiation->type = 'spantext';
  
  $data->authentication = (object) null;
  $data->authentication->value = "--";
  $data->authentication->mlang = getMlang_PppoeAuthentication();
  $data->authentication->type = 'spantext';
  
  $data->ipAddr = (object) null;
  $data->ipAddr->value = getWanInstanceIp();
  $data->ipAddr->type = 'spantext';
  
  $data->subnetMask = (object) null;
  $data->subnetMask->value = getWanInstanceIpMask();
  $data->subnetMask->type = 'spantext';
  
  echo json_encode($data);
?>
