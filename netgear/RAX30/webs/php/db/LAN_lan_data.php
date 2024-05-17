<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->deviceName = (object) null;
  $data->deviceName->value = getDeviceName();
  $data->deviceName->type = 'spantext';

  $data->hiddenDeviceName = (object) null;
  $data->hiddenDeviceName->value = getDeviceName();

  $data->ipAddr = (object) null;
  $data->ipAddr->value = getLanInstanceIpAddr();

  $data->address = (object) null;
  $data->address->value = $data->ipAddr->value;
  $data->address->type = 'ip';
  $data->address->idStr_prefix = 'sys_lan_ipaddress';

  $data->selected = (object) null;
  $data->selected->value = $data->ipAddr->value;
  $data->selected->type = 'ip';
  $data->selected->idStr_prefix = 'rsv_ipaddress';

  $data->netmask = (object) null;
  $data->netmask->value = getLanInstanceIpMask();
  
  $data->lanMask = (object) null;
  $data->lanMask->value = $data->netmask->value;
  $data->lanMask->type = 'ip';
  $data->lanMask->idStr_prefix = 'sys_lan_netmask';

  $data->ripDirection = (object) null;
  $data->ripDirection->value = getRipDirection();
  $data->ripDirection->type = 'select';

  $data->ripVersion = (object) null;
  $data->ripVersion->value = getRipVersion();
  $data->ripVersion->type = 'select';

  $data->ripAuthMode = (object) null;
  $data->ripAuthMode->value = getRipAuthMode();
  $data->ripAuthMode->type = 'select';

  $data->ripAuthPwd = (object) null;
  $data->ripAuthPwd->value = getRipAuthPwd();

  $data->ripAuthKey = (object) null;
  $data->ripAuthKey->value = getRipAuthKey();

  $data->enableDhcpServer = (object) null;
  $data->enableDhcpServer->value = getLanDhcpv4Enable();
  $data->enableDhcpServer->type = 'checkbox';

  $data->start = (object) null;
  $data->start->value = getDhcpv4PoolStart();
  $data->start->type = 'ip';
  $data->start->idStr_prefix = 'sys_pool_starting_address';

  $data->end = (object) null;
  $data->end->value = getDhcpv4PoolEnd();
  $data->end->type = 'ip';
  $data->end->idStr_prefix = 'sys_pool_finish_address';
  
  $data->wan_proto = (object) null;
  $data->wan_proto->value = getWanInstanceIpType();

  $data->wan_ipaddr = (object) null;
  $data->wan_ipaddr->value = getWanInstanceIpAddr();

  $data->wan_netmask = (object) null;
  $data->wan_netmask->value = getWanInstanceIpMask();

  $data->pptp_wan_ipaddr = (object) null;
  $data->pptp_wan_ipaddr->value = $data->wan_ipaddr->value;

  $data->pppoe_wan_ipaddr = (object) null;
  $data->pppoe_wan_ipaddr->value = $data->wan_ipaddr->value;

  $data->pppoe_wan_ipaddr = (object) null;
  $data->pppoe_wan_ipaddr->value = $data->wan_ipaddr->value;

  $data->pptp_serv_ipaddr = (object) null;
  $data->pptp_serv_ipaddr->value = "";

  $data->l2tp_serv_ipaddr = (object) null;
  $data->l2tp_serv_ipaddr->value = "";

  $data->wan_dns1_pri = (object) null;
  $data->wan_dns1_pri->value = getDNSServerIpAddr(1);

  $data->wan_dns1_sec = (object) null;
  $data->wan_dns1_sec->value = getDNSServerIpAddr(2);
  echo json_encode($data);
?>
