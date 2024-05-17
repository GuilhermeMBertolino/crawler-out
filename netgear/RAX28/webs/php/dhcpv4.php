<?

$dbg = FALSE;

function getDhcpv4ClientInstId()
{
    $mode = db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");
    if ($mode == "RT")
    {
        return 1;
    }
    else if ($mode == "AP" || $mode == "BR")
    {
        return 2;
    }
    return FALSE;
/*
    $dhcp_client_num = db_get("Device.DHCPv4.ClientNumberOfEntries");    
    if($dhcp_client_num === "1")
    {
        $dhcp_client_path = "Device.DHCPv4.Client";
        $dhcp_client_list = db_getInstIDList($dhcp_client_path);
        if($dhcp_client_list !== FALSE)
        {
            $dhcp_client_list = json_decode($dhcp_client_list,true);
            foreach($dhcp_client_list[$dhcp_client_path] as $inst_id)
            {
                if(db_get("Device.DHCPv4.Client.{$inst_id}.Interface") !== FALSE)
                {
                  return $inst_id;
                }  
            }
        }
    }

    return FALSE;
    */
}

function getDhcpv4ServerPoolInstId()
{
    $dhcp_pool_path = "Device.DHCPv4.Server.Pool";
    $dhcp_pool_list = db_getInstIDList($dhcp_pool_path);
    if($dhcp_pool_list !== FALSE)
    {
        $dhcp_pool_list = json_decode($dhcp_pool_list,true);
        foreach($dhcp_pool_list[$dhcp_pool_path] as $inst_id)
        {
            if(db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Enable") === "1")
            {
              return $inst_id;
            }  
        }
    }
    return FALSE;
}

function getDhcpv4DomainName()
{
    $inst_id = getDhcpv4ClientInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.DHCPv4.Client.{$inst_id}.X_PEGATRON_COM_DomainName");
    }
}

function getDhcpv4Router()
{
    $inst_id = getDhcpv4ClientInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.DHCPv4.Client.{$inst_id}.IPRouters");
    }
}

function getLanDhcpv4Enable()
{
    $inst_id = getDhcpv4ServerPoolInstId();
    return db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Enable") === "1" ? "true" : "false";  
}

function getLanDhcpv4EnableForAdv()
{
    $inst_id = getDhcpv4ServerPoolInstId();
    return db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Enable") === "1" ? "On" : "Off";  
}

function getDhcpv4PoolStart()
{
    $dhcp_server_pool_path = "Device.DHCPv4.Server.Pool";
    $dhcp_server_pool_list = json_decode(db_getInstIDList($dhcp_server_pool_path),true);
    foreach($dhcp_server_pool_list[$dhcp_server_pool_path] as $inst_id)
    {
        if(db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Interface") !== FALSE)
        {
          return db_get("Device.DHCPv4.Server.Pool.{$inst_id}.MinAddress");
        }  
    }
}

function getDhcpv4PoolEnd()
{
    $dhcp_server_pool_path = "Device.DHCPv4.Server.Pool";
    $dhcp_server_pool_list = json_decode(db_getInstIDList($dhcp_server_pool_path),true);

    foreach($dhcp_server_pool_list[$dhcp_server_pool_path] as $inst_id)
    {
        if(db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Interface") !== FALSE)
        { 
          return db_get("Device.DHCPv4.Server.Pool.{$inst_id}.MaxAddress");
           
        }  
    }
}

function getDhcpOption($tag)
{ 
    $wan_inst = getWanInstanceID();
    $wan_if_path = "Device.IP.Interface.".$wan_inst;
    $dhcp_client_path ="Device.DHCPv4.Client";
    $dhcp_client_list = db_getInstIDList($dhcp_client_path);
    if($dhcp_client_list !== FALSE)
    {
        $dhcp_client_list = json_decode($dhcp_client_list,true);
        foreach($dhcp_client_list[$dhcp_client_path] as $inst_id)
        {
            if(db_get("Device.DHCPv4.Client.{$inst_id}.Interface") === $wan_if_path)
            {
                $client_inst_id = $inst_id;
                $dhcp_option_path ="Device.DHCPv4.Client.{$client_inst_id}.SentOption";
                $dhcp_option_list = db_getInstIDList($dhcp_option_path);
                    
                if($dhcp_option_list !== FALSE)
                {   
                    $dhcp_option_list = json_decode($dhcp_option_list,true);
                    foreach($dhcp_option_list[$dhcp_option_path] as $inst_id)
                    {
                       if(db_get("Device.DHCPv4.Client.{$client_inst_id}.SentOption.{$inst_id}.Tag") === $tag)
                       {
                           return db_get("Device.DHCPv4.Client.{$client_inst_id}.SentOption.{$inst_id}.Value");
                       }
                    }
                }
            }
        }
    }
}

function getVPNhostname($mac)
{
    $host_path ="Device.Hosts.Host";
    $host_list = db_getInstIDList($host_path);
    if($host_list !== FALSE)
    {
        $host_list = json_decode($host_list,true);
        foreach($host_list[$host_path] as $inst_id)
        {
            $PhysAddress = db_get("Device.Hosts.Host.{$inst_id}.PhysAddress");
            if( $PhysAddress === $mac)
            {
                //if(db_get("Device.Hosts.Host.{$inst_id}.IPAddress") === $addr)
                return db_get("Device.Hosts.Host.{$inst_id}.HostName");
            }
        }
    }
}

function getVPNIpaddress($mac)
{
    $host_path ="Device.Hosts.Host";
    $host_list = db_getInstIDList($host_path);
    if($host_list !== FALSE)
    {
        $host_list = json_decode($host_list,true);
        foreach($host_list[$host_path] as $inst_id)
        {
            if(db_get("Device.Hosts.Host.{$inst_id}.PhysAddress") === $mac)
            {
                //if(db_get("Device.Hosts.Host.{$inst_id}.IPAddress") === $addr)
                //return db_get("Device.Hosts.Host.{$inst_id}.HostName");
                return db_get("Device.Hosts.Host.{$inst_id}.IPAddress");
            }
        }
    }
}

?>
