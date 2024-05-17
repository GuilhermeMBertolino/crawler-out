<?
  include '../interface.php';
  if (!isset($data)) 
    $data = new stdClass();
    
  $data->connetionStatus = (object) null;
  if (getL2tpWanIpAddr() !== "0.0.0.0")
  {
    $data->connetionStatus->mlang = "AWR009"; // connected
  }
  else
  {
    $data->connetionStatus->mlang = "AWR008"; // disconnected
  }
  $data->connetionStatus->type = 'spantext';

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getL2tpWanIpAddr();
  $data->ipAddr->type = 'spantext';

  $data->subnetMask = (object) null;
  $data->subnetMask->value = getL2tpWanMask();
  $data->subnetMask->type = 'spantext';
  
  echo json_encode($data);
?>
