<?
include_once 'commonCfg.php';
include_once 'dhcpv4.php';
include_once 'pppoe.php';

$dbg = FALSE;
$ip_if_list = json_decode(db_getInstIDList("Device.IP.Interface"),true);
$ethernet_if_list = json_decode(db_getInstIDList("Device.Ethernet.Interface"),true);
function getTotalInterfaceNum()
{
    return db_get('Device.IP.InterfaceNumberOfEntries');
}

function getWanInstanceID()
{
    $ipv4mode = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");

    if ($ipv4mode === "PPPoE")
    {
       $inst_id = 3; //ppp0.2 interface id is 3
    }
    else
    {
       $inst_id = 2; //eth4.1 interface id is 2
    }

    return $inst_id;

  /*foreach($GLOBALS['ip_if_list']["Device.IP.Interface"] as $inst_id)
    {
       if (db_get("Device.IP.Interface.{$inst_id}.X_BROADCOM_COM_Upstream"))
       {
          if ($GLOBALS['dbg'])        
             echo "found WAN instance $i\n";

          return $inst_id;
       }
    }

    return 0;*/
}

function getWanEthernetInstanceID()
{
    foreach($GLOBALS['ethernet_if_list']["Device.Ethernet.Interface"] as $inst_id)
    {
      if (db_get("Device.Ethernet.Interface.{$inst_id}.Upstream"))
      {
          if ($GLOBALS['dbg'])        
              echo "found WAN instance $i\n";

          return $inst_id;
      }
    }
    return 0;
}

function getWanInstanceID_Next($id)
{
    $intf_num = getTotalInterfaceNum();
    $i = $id + 1;
    $found = FALSE;
    do {
        if (db_get("Device.IP.Interface.{$i}.X_BROADCOM_COM_Upstream"))
        {
            $found = TRUE;
            break;
        }
        $i ++;
    }while ($i <= $intf_num);

    if ($GLOBALS['dbg'])        echo "found WAN next instance $i\n";

    if ($found) 
        return $id;
    else
        return 0;
}

function getLanInstanceID()
{
    foreach($GLOBALS['ip_if_list']["Device.IP.Interface"] as $inst_id)
    {
      if (db_get("Device.IP.Interface.{$inst_id}.X_BROADCOM_COM_GroupName") == "Default")
      {
          if (db_get("Device.IP.Interface.{$inst_id}.Name") == "br0")
          {
              if ($GLOBALS['dbg'])        
                  echo "found LAN instance $i\n";
    
              return $inst_id;
          }
      }
    }
    return 0;
}

function getWanInstanceProtocol()
{
    $wan_inst = getWanInstanceID();
    $dhcp_inst_id = getDhcpv4ClientInstId();
    $dhcp_enable = "0";
    if($dhcp_inst_id !== FALSE)
    {
        $dhcp_enable = db_get("Device.DHCPv4.Client.{$dhcp_inst_id}.Enable");
    }
    $ppp_inst_id = getPppoeInterfaceInstId();
    $pppoe_enable = "0";
    if($ppp_inst_id !== FALSE)
    {
        $pppoe_enable = db_get("Device.PPP.Interface.{$ppp_inst_id}.Enable");
    }
    
    $pptp_enable = "0";
    $l2tp_enable = "0";
    $wan_type = "";
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path); 
    if($if_ipv4_list !== FALSE)
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              $wan_type = db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.AddressingType");
              break;
            }  
        }
    }
    if($dhcp_enable === "0" && $pppoe_enable === "0" && $wan_type === "Static")
    {
        return "static"; 
    }
    else if($dhcp_enable === "1")
    {
        return "dhcp";
    }
    else if($pppoe_enable === "1")
    {
        return "pppoe";
    }
    else if($pptp_enable === "1")
    {
        return "pptp";
    }
    else if($l2tp_enable === "1")
    {
        return "l2tp";
    }
    else
    {
        return "dhcp"; //default wan type  
    }
}

function getWanConnectionType()
{
    $wan_protocol = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");

    if($wan_protocol === "DHCP")
    {
       return "MRS024";
    }
    else if($wan_protocol === "Static")
    {
        return "SWP050";
    }
    else if($wan_protocol === "PPPoE")
    {
        return "SWP016";
    }
    else if($wan_protocol === "PPTP")
    {
        return "SWP017";
    }
    else if($wan_protocol === "L2TP")
    {
        return "SBS037";
    }
}

function get_wanMode()
{
    return db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");
}

function getwanProto()
{
    $wan_mode = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");
    if($wan_mode === "Static" || $wan_mode === "DHCP")
    {
        return "eth";
    }
    else if ($wan_mode === "PPPoE" || $wan_mode === "L2TP" || $wan_mode === "PPTP")
    {
        return "ppp";  
    }
}

function getLoginType()
{
    $wan_mode = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");

    if ($wan_mode === "PPPoE")
    {
        return "PPPoE";
    }
    else if ($wan_mode === "L2TP")
    {
        return "L2TP";
    }
    else if ($wan_mode === "PPTP")
    {
        return "PPTP";
    }
}

function getWanInstanceIpType()
{
    $wan_proto = getWanInstanceProtocol();
    if($wan_proto === "static")
        return "fixed";
    else if($wan_proto === "pppoe")
    {
        $pppoe_ip_type = getPppoeIpType();
        return $pppoe_ip_type;
    }
    else
    {
        return "dynamic";  
    }
}

function getWanInstanceIp()
{
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE)
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              return db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.IPAddress");
            }  
        }
    }
    return "0.0.0.0";
}

function getWanInstanceIpAddr()
{
    if(getPppoeIpType() === "fixed")
        return getPppoeLocalIp();
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE )
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        $wan_ipAddr = "";
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              $wan_ipAddr = db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.IPAddress");
            }
            return $wan_ipAddr === FALSE ? "0.0.0.0" : $wan_ipAddr;
        }
    }
    
    if($wan_inst !== 0)//WAN port link up, but Internet status down.
    {
        //return "0.0.0.0";
    }
}

function getWanInstanceIpMask()
{
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE )
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              $wan_ipMask = db_get("Device.IP.Interface.{$wan_inst}.IPv4Address.{$inst_id}.SubnetMask");
              return $wan_ipMask === FALSE ? "0.0.0.0" : $wan_ipMask;
            }  
        }
    }
    
    return "0.0.0.0";
}


function getWanInstanceGateway()
{
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}";
    $wan_if_name = db_get("Device.IP.Interface.{$wan_inst}.Name");
    $wan_if_ip_type = getWanInstanceProtocol() === "static"?"Static":"DHCPv4";
    $routing_router_path = "Device.Routing.Router";
    $router_list = db_getInstIDList($routing_router_path);

    if($router_list !== FALSE )
    {
        $router_list = json_decode($router_list,true);
        foreach($router_list[$routing_router_path] as $inst_id)
        {
            if(db_get("Device.Routing.Router.{$inst_id}.X_BROADCOM_COM_ActiveDefaultGateway") === $wan_if_name)
            {
                $router_inst_id = $inst_id;
                $router_ipv4_path = "Device.Routing.Router.{$router_inst_id}.IPv4Forwarding";
                $router_ipv4_list = db_getInstIDList($router_ipv4_path);
                if($router_ipv4_list !== FALSE )
                {
                    $router_ipv4_list = json_decode($router_ipv4_list,true);
                    foreach($router_ipv4_list[$router_ipv4_path] as $inst_id)
                    {
                        if(db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.Interface") === $if_ipv4_path)
                        {
                            if(db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.Origin") === $wan_if_ip_type)
                            {
                                return  db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.GatewayIPAddress");
                            }
                        }
                    } 
                }
            }
            else
            {
		//just in case , factory no WAN port connected with Static IP setting .
                $router_inst_id = $inst_id;
                $router_ipv4_path = "Device.Routing.Router.{$router_inst_id}.IPv4Forwarding";
                $router_ipv4_list = db_getInstIDList($router_ipv4_path);

                $router_ipv4_list = json_decode($router_ipv4_list,true);

                if($router_ipv4_list !== NULL )
                {
                    foreach($router_ipv4_list[$router_ipv4_path] as $inst_id)
                    {
                        if($wan_if_name==="eth4.1")
                        {
                            if(db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.Interface") === "Device.IP.Interface.2")
                            {
                                if(db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.Origin") === "Static")
                                {
                                    return  db_get("Device.Routing.Router.{$router_inst_id}.IPv4Forwarding.{$inst_id}.GatewayIPAddress");
                                }
                            }
                        }
                    }
		}
            }
        }
    }
}

function getWANMacSelect()
{
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.X_PEGATRON_COM_MACOverrideType";
    $mac_use_default = db_get($if_ipv4_path);
    
    if ($mac_use_default == "Default") {
        return "default";
    }
    else if ($mac_use_default == "PC") {
        return "pc";
    }
    else if ($mac_use_default == "User") {
        return "user";
    }
}

function getWANCloneMac()
{
    $macSelect = getWANMacSelect();
    
    if ($macSelect == "default") {
            return getWANMacDefault();
    }
    else if ($macSelect == "pc") {
            return getClientMac();
    }
    else if ($macSelect == "user") {
            return getWANMacUser();
    }
}

function getWANMacDefault()
{
    $eth_if_list = json_decode(db_getInstIDList("Device.Ethernet.Interface"),true);

    foreach($eth_if_list["Device.Ethernet.Interface"] as $inst_id)
    {
      if (db_get("Device.Ethernet.Interface.{$inst_id}.Upstream"))
      {
          if ($GLOBALS['dbg'])
              echo "found WAN instance $i\n";

          $lan_mac = db_get("Device.Ethernet.Interface.{$inst_id}.MACAddress");
      }
    }

    if($lan_mac !== FALSE )
    {
        if(strpos($lan_mac,':') !== FALSE)
        {
            // WAN MAC = LAN MAC + 1
            $wan_mac_array = explode(":", $lan_mac);
            for ($i=5; $i>=0; $i--)
            {
                $num = hexdec($wan_mac_array[$i]) + 1;
                if ($num == 0x100)
                {
                    $num = 0;
                }
                $wan_mac_array[$i] = sprintf("%02X", $num);

                if ($num != 0)
                {
                    break;
                }
            }
            $wan_mac = implode(":", $wan_mac_array);
            return strtoupper($wan_mac);
        }

    }
}

function getWANMacUser()
{
    if(getWANMacSelect() === "default")
    {
        return  getWANMacDefault();
    }
    $wan_inst = getWanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$wan_inst}.X_PEGATRON_COM_MACAddress";
    $user_mac = db_get($if_ipv4_path);
    if($user_mac !== FALSE )
    {
        if(strpos($user_mac,':') !== FALSE)
        {
           return $user_mac;
        }

    }
}

function getDNStype()
{
    /*if(db_get("Device.DNS.Client.X_BROADCOM_COM_ActiveDnsIfName") === "StaticDNS")
    {
        return "fixed";
    }*/
    if(db_get("Device.DNS.Client.X_PEGATRON_COM_Ipv4_DnsType") === "Static")
    {
        return "fixed";
    }

    return "dynamic";
}

function getDNSServerIpAddr($idx)
{
    //if(db_get("Device.DNS.Client.ServerNumberOfEntries") >= 1)
    //{
        $dns_client_server_path = "Device.DNS.Client.Server";
        $dns_client_server_list = db_getInstIDList($dns_client_server_path);
 
        if($dns_client_server_list !== FALSE)
        { 
            $dns_client_server_list = json_decode($dns_client_server_list, true);
            foreach($dns_client_server_list[$dns_client_server_path] as $inst_id)
            {
                if(db_get("Device.DNS.Client.Server.{$inst_id}.Type") === "Static")
                {
                    $dns_str = db_get("Device.DNS.Client.Server.{$inst_id}.DNSServer");

                    /*<< PEGA Ian: if DNS is null, got dns from X_BROADCOM_COM_ActiveDnsServers*/
                    if ($dns_str == null)
                    {
                       $dns_str2 = db_get("Device.DNS.Client.X_BROADCOM_COM_ActiveDnsServers");
                       if(strpos($dns_str2,',') !== FALSE)
                       {
                          $dns_list = explode(',',$dns_str2);
                          return $dns_list[$idx-1];
                       }
                       return $dns_str2;
                    }

                    if(strpos($dns_str,',') !== FALSE)
                    {
                       $dns_list = explode(',',$dns_str);
                       return $dns_list[$idx-1];
                    }
                    return $dns_str;
                }
                else
                {
                    $dns_str = db_get("Device.DNS.Client.X_BROADCOM_COM_ActiveDnsServers");
                    if(strpos($dns_str,',') !== FALSE)
                    {
                       $dns_list = explode(',',$dns_str);
                       return $dns_list[$idx-1];
                    }
                    return $dns_str;
                }  
            }
        }
    //}
}

function getLeaseTime()
{
    $filePath = "/tmp/leasetime";
    $lines = array();
    // init
    $lines["leaseDays"] = "--";
    $lines["leaseHours"] = "--";
    $lines["leaseMinutes"] = "--";
    $lines["expireDays"] = "--";
    $lines["expireHours"] = "--";
    $lines["expireMinutes"] = "--";

    if(!file_exists($filePath))
    {
        return $lines;
    }

    $fp =  fopen($filePath, 'r');
    if($fp)
    {
        while(!feof($fp))
        {
            $line = trim(fgets($fp), "\n");
            $obj = explode('=',$line);
            $lines[$obj[0]] = $obj[1];
        }
        fclose($fp);
    }
    else
    {
        return $lines;
    }

    $leaseTime = $lines["expire"] - $lines["obtained"];
    $lines["lease"] = $leaseTime;
    $lines["leaseDays"] = (int)($leaseTime/(24*3600));
    $lines["leaseHours"] = (int)(($leaseTime%(24*3600))/3600);
    $lines["leaseMinutes"] = (int)(($leaseTime%(24*3600)%3600)/60);

    $sysUpTime = shell_exec("cat /proc/uptime | awk -F '.' '{printf $1}'");
    $expireTime = (int)$leaseTime - ((int)$sysUpTime - (int)$lines["uptime"]);
    if ($expireTime < 0)
    {
        $expireTime = 0;
    }
    $lines["expireDays"] = (int)($expireTime/(24*3600));
    $lines["expireHours"] = (int)(($expireTime%(24*3600))/3600);
    $lines["expireMinutes"] = (int)(($expireTime%(24*3600)%3600)/60);

    return $lines;
    //return var_dump( $lines); //for debug
}

function getWANPortStatus()
{
  //$wan_inst = getWanInstanceID();
  //$port_status = db_get("Device.IP.Interface.{$wan_inst}.Status");
  $wan_inst = getWanEthernetInstanceID();
  $port_status = db_get("Device.Ethernet.Interface.{$wan_inst}.Status");
  return $port_status === "Up"?"up":"down";
}

function getInternetStatus()
{
  $operationMode = getRadioVal_mode();
  $wanPortStatus = getWANPortStatus();
  if((($operationMode === "router") && ($wanPortStatus === "up")) || ($operationMode !== "router"))
    return "<span class=\"Status-normal\" mlang=\"D-genie_25\">STATUS</span>:&nbsp;&nbsp;&nbsp;<span class=\"blink\" id=\"wait_ping\" class=\"Condition-normal\" mlang=\"AIP021\">Detecting...</span>";
  else
    return "<span id=\"wait_ping\" class=\"Status-normal\" mlang=\"3G303\">Not Connected</span>";
}

function getInternetStatusUpDown()
{
  $internetConnectionStatus = getInternetResult();
  if($internetConnectionStatus === 0)
    return "Up";
  else
    return "Down";
}

function getInternetResult()
{
  $mode =  db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");
  $wan_inst = getWanInstanceID();
  if($mode === "AP" || $mode === "BR")
  {
        if(getApModeInternetStatus() === "up")
            return 0;
        else
            return 1;
  }
  else
  {
        $wan_protocol = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");

        if ($wan_protocol === "PPTP" || $wan_protocol === "L2TP")
        {
            $output = null;
            //$output = shell_exec("ifconfig ppp0 | grep 'inet addr' | cut -d: -f2 | awk -F ' ' '{printf $1}'");

            //return $output !== null?0:1;

            $output = getApModeInternetStatus();

            return $output !== "down"?0:1;

        }
        else
        {
            $connection_status = db_get("Device.IP.Interface.{$wan_inst}.X_BROADCOM_COM_IPv4ServiceStatus");
            return $connection_status === "ServiceUp"?0:1;
        }
  }    
}

function getWizardInternetStatus()
{   
    if(getWANPortStatus() ===  "down")
        return "down"; 
    $cmd_str = "ping -A -c 1 netgear.com";
    exec($cmd_str, $res, $status);
    return ($status == 0) ? "up" : "down";
}

function getApModeInternetStatus()
{
    $filePath = "/tmp/Wan_Online";
    if(!file_exists($filePath))
    {
        return "down";  
    }
    else
    {
        return "up";  
    }
}

function getWizardWanDetectType()
{
    //$wan_inst = getWanInstanceID();
    //$wan_interface_name = db_get("Device.IP.Interface.{$wan_inst}.Name");
    //$cmd_str= "wandetect -i {$wan_interface_name} 1<&-";
    $clientMacAddr = getClientMac();
    // KKHaung: If current WAN is PPPoE, then we have to use eth4.2 for detection
    $vlan2 = db_get("Device.Ethernet.VLANTermination.2.Enable");
    if ($vlan2 === "1")
    {
        $cmd_str= "wandetect -i eth4.2 -c {$clientMacAddr} 1<&-";
    }
    else
    {
        $cmd_str= "wandetect -i eth4.1 -c {$clientMacAddr} 1<&-";
    }
    system($cmd_str, $res);
    if($res == 1)
        return "dhcp";
    else if($res == 2)
        return "pppoe";
    else if($res == 3)
        return "pptp";
    else if($res == 4)
        return "cloneMac";
    else        
    return $res;
}

function getDeviceName()
{
    $dev_name = db_get("Device.X_PEGATRON_COM_DeviceInfo.DeviceName");
    return htmlentities($dev_name);
}

function getLanMacAddr()
{
    return strtoupper(db_get("Device.Ethernet.Interface.2.MACAddress"));
}

function getLanInstanceIpAddr()
{
    $lan_inst = getLanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$lan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE)
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              return db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.IPAddress");
            }  
        }
    }
}

function getLanInstanceIpMask()
{
    $lan_inst = getLanInstanceID();
    $if_ipv4_path = "Device.IP.Interface.{$lan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE)
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              return db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.SubnetMask");
            }  
        }
    }
}

function getLanInstanceIpType()
{
    $lan_inst = getLanInstanceID();
    $lan_type = "";
    $if_ipv4_path = "Device.IP.Interface.{$lan_inst}.IPv4Address";
    $if_ipv4_list = db_getInstIDList($if_ipv4_path);
    if($if_ipv4_list !== FALSE)
    {
        $if_ipv4_list = json_decode($if_ipv4_list,true);
        foreach($if_ipv4_list[$if_ipv4_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.Alias") !== FALSE)
            {
              $lan_type = db_get("Device.IP.Interface.{$lan_inst}.IPv4Address.{$inst_id}.AddressingType");
              break;
            }  
        }
    }    
    
    if ( $lan_type == "DHCP")
      return "dhcp";
    else if ($lan_type == "Static")
      return "static";
}

function getRipEnable()
{
    $rip_enable = db_get("Device.Routing.RIP.Enable");
    return $rip_enable;
}

function getRipInterfaceInstance()
{
    $wan_inst = getWanInstanceID();
    $wan_if_path = "Device.IP.Interface.".$wan_inst;
    $rip_if_path = "Device.Routing.RIP.InterfaceSetting";
    $rip_if_list = db_getInstIDList($rip_if_path);
    if($rip_if_list !== FALSE)
    {
        $rip_if_list = json_decode($rip_if_list,true);
        foreach($rip_if_list[$rip_if_path] as $inst_id)
        {
            if(db_get("Device.Routing.RIP.InterfaceSetting.{$inst_id}.Interface") === $wan_if_path)
            {
              return $inst_id;
            }  
        }
        //for no match WAN interface use the first RIP instance
        return $rip_if_list[$rip_if_path][0];
    }
    return FALSE;
}

function getRipVersion()
{
    if($rip_inst_id = getRipInterfaceInstance() !== FALSE)
    {
         if(getRipEnable() === "0" && db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.Enable") === "0")
           return "Disabled";
         else
         {
           $rip_ver = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.X_BROADCOM_COM_Version");
           if($rip_ver === "1")
             return "RIP_1";
           else if($rip_ver === "2")
             return "RIP_2M";
           else if($rip_ver === "4")
             return "RIP_2B";
         }
           
    }
}

function getRipDirection()
{
    if($rip_inst_id = getRipInterfaceInstance() !== FALSE)
    {
         $rip_acceptRA = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.AcceptRA");
         $rip_sendRA = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.SendRA");
         //return  $rip_acceptRA."+". $rip_sendRA;
           if($rip_acceptRA === "1" && $rip_sendRA === "1")
             return "Both";
           else if($rip_acceptRA === "1" && $rip_sendRA === "0")
             return "In only";
           else if($rip_acceptRA === "0" && $rip_sendRA === "1")
             return "Out only";
           else
             return "Both";//defaut is both
    }
}

function getRipMulticast()
{
    if(getRipVersion() === "RIP_2M")
      return 1;
    else
      return 0;
}

function getRipAuthMode()
{
    $rip_auth_mode = "No authentication";
    if($rip_inst_id = getRipInterfaceInstance() !== FALSE)
    {
        $rip_auth_mode = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.X_PEGATRON_COM_Auth_Mode");

	if ($rip_auth_mode == "No")
	{
            $rip_auth_mode = "No authentication";
	}
    }
    return $rip_auth_mode;
}

function getRipAuthPwd()
{
    $rip_auth_pwd = "";
    if($rip_inst_id = getRipInterfaceInstance() !== FALSE)
    {
        $rip_auth_pwd = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.X_PEGATRON_COM_Auth_Password");
    }
    return $rip_auth_pwd;
}

function getRipAuthKey()
{
    $rip_auth_key = "";
    if($rip_inst_id = getRipInterfaceInstance() !== FALSE)
    {
         $rip_auth_key = db_get("Device.Routing.RIP.InterfaceSetting.{$rip_inst_id}.X_PEGATRON_COM_Auth_Key");
    }
    return $rip_auth_key;
}

function getClientIpAddress()
{
  $v4mapped_prefix_hex = '00000000000000000000ffff';
  $v4mapped_prefix_bin = pack("H*", $v4mapped_prefix_hex);
  $addr = $_SERVER['REMOTE_ADDR'];
  $addr_bin = inet_pton($addr);

  if( $addr_bin === FALSE ) {
  // Unparsable? How did they connect?!?
    die('Invalid IP address');
  }
  if( substr($addr_bin, 0, strlen($v4mapped_prefix_bin)) == $v4mapped_prefix_bin) 
  {
    // Strip prefix
    $addr_bin = substr($addr_bin, strlen($v4mapped_prefix_bin));
  }
  $addr = inet_ntop($addr_bin);

  return $addr;//xxx.xxx.xxx.xxx/xxxx::xxxx:xxxx
}

function getClientMac()
{
  $ipaddr = getClientIpAddress();
  $lookup_cmd = "";

  if(preg_match('/\./',$ipaddr))
  {
    $lookup_cmd = 'ip -4 ne ls '. $ipaddr;
  }
  else if(preg_match('/:/',$ipaddr))
  {
    $lookup_cmd = 'ip -6 ne ls '. $ipaddr;
  }
  else
    return "";

  $res = exec($lookup_cmd);

  if(strpos($res, $ipaddr)!== FALSE)
  {
    $cols =  preg_split('/\s+/', trim($res));
    return strtoupper($cols[4]);
  }
  
  return "";
}

function getWanInstanceIpv6Enable()
{
    $wan_inst = getWanInstanceID();
    return  db_get("Device.IP.Interface.{$wan_inst}.IPv6Enable") === "1" ? "true" : "false";
}

function getWanInstanceIpv6Address()
{
    $wan_inst = getWanInstanceID();
    $wan_ipv6Addr = "::0";
    $if_ipv6_path = "Device.IP.Interface.{$wan_inst}.IPv6Address";
    $if_ipv6_list = db_getInstIDList($if_ipv6_path); 
    if($if_ipv6_list !== FALSE)
    {
        $if_ipv6_list = json_decode($if_ipv6_list,true);
        foreach($if_ipv6_list[$if_ipv6_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv6Address.{$inst_id}.IPAddressStatus") !== "Invalid")
            {
                $wan_ipv6Addr = db_get("Device.IP.Interface.{$wan_inst}.IPv6Address.{$inst_id}.IPAddress");
                break;
            }  
        }
    }

    return $wan_ipv6Addr;
}

function checkWanIsStatic()
{
    $wan_protocol = getWanInstanceProtocol();
    
    if($wan_protocol == "static")
        return "true";
    
    if($wan_protocol != "dhcp")
    {
        return getPppoeIpType() == "fixed" ? "true" : "false";
    }

    return "false";
}
?>
