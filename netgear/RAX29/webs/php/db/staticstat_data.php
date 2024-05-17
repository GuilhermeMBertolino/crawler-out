<?
  include '../interface.php';
  if (!isset($data)) 
    $data = new stdClass();

  $data->staticWanIp = (object) null;
  $data->staticWanIp->value = getWanInstanceIpAddr();
  $data->staticWanIp->type = 'spantext';
  
  $data->staticMask = (object) null;
  $data->staticMask->value = getWanInstanceIpMask();
  $data->staticMask->type = 'spantext';
    
  $data->staticGateway = (object) null;
  $data->staticGateway->value = getWanInstanceGateway();
  $data->staticGateway->type = 'spantext';

  $data->staticDnsPrimary = (object) null;
  $data->staticDnsPrimary->value = getDNSServerIpAddr(1);
  $data->staticDnsPrimary->type = 'spantext';
  
  $data->staticDnsSlave = (object) null;
  $data->staticDnsSlave->value = getDNSServerIpAddr(2);
  $data->staticDnsSlave->type = 'spantext';

  echo json_encode($data);
?>
