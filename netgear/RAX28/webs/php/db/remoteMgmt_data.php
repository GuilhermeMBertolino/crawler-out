<?
  include '../remoteMgmt.php';
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->enableRemoteMgmt = (object) null;
  $data->enableRemoteMgmt->value = getRemoteMgmtEnable();
  $data->enableRemoteMgmt->type = 'checkbox';

  $data->accessType = (object) null;
  $data->accessType->value = getRemoteMgmtType();
  $data->accessType->type = 'radio';

  $data->only = (object) null;
  $data->only->value = $data->accessType->value == "Single" ? getRemoteMgmtRangeStart() : "";
  $data->only->type = 'ip';
  $data->only->idStr_prefix = 'local_ip_';

  $data->rangeStart = (object) null;
  $data->rangeStart->value = $data->accessType->value == "Range" ? getRemoteMgmtRangeStart() : "";
  $data->rangeStart->type = 'ip';
  $data->rangeStart->idStr_prefix = 'start_ip_';
  
  $data->rangeEnd = (object) null;
  $data->rangeEnd->value =  $data->accessType->value == "Range" ? getRemoteMgmtRangeEnd() : "";
  $data->rangeEnd->type = 'ip';
  $data->rangeEnd->idStr_prefix = 'fin_ip_';

  $data->portNumber = (object) null;
  $data->portNumber->value = getRemoteMgmtPort();

  $data->ipv6Enable = (object) null;
  $data->ipv6Enable->value = getWanInstanceIpv6Enable();

  $data->remote_mg_addr = (object) null;
  $data->remote_mg_addr->value = "https://".getWanInstanceIp().":".($data->portNumber->value);
  $data->remote_mg_addr->type = 'spantext';

  $data->remote_mg_addr_ipv6 = (object) null;
  $data->remote_mg_addr_ipv6->value = "https://".getWanInstanceIpv6Address().":".($data->portNumber->value);
  $data->remote_mg_addr_ipv6->type = 'spantext';
  
  $data->wanipaddr = (object) null;
  $data->wanipaddr->value = getWanInstanceIp();

  echo json_encode($data);
?>
