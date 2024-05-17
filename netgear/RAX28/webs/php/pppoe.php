<?
$dbg = FALSE;

function getPppoeInterfaceInstId()
{
    $ppp_if_path = "Device.PPP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.PPP.Interface.{$inst_id}.Name") == "ppp0.2")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getL2tpInterfaceInstId()
{
    $ppp_if_path = "Device.PPP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.PPP.Interface.{$inst_id}.Name") == "PPPoL2tpAc")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getPptpInterfaceInstId()
{
    $ppp_if_path = "Device.PPP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.PPP.Interface.{$inst_id}.Name") == "PptpAc")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getPppoeIpType()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        if(db_get("Device.PPP.Interface.{$inst_id}.Enable") === "1")
        {
           $ip_type = db_get("Device.PPP.Interface.{$inst_id}.X_BROADCOM_COM_UseStaticIPAddress");
           if($ip_type === "1")
           {
               return "fixed";
           }
           else
           {
               return "dynamic"; 
           }
        }
    }
    return "dynamic";
}

function getPppoeMode()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        $ppp_mode = db_get("Device.PPP.Interface.{$inst_id}.ConnectionTrigger");
        if($ppp_mode === "AlwaysOn")
        {
          return "always";
        }
        else if($ppp_mode === "OnDemand")
        {
          return "onDemand"; 
        }
        else if($ppp_mode === "Manual")
        {
          return "manually"; 
        }
        else
        {
          return "onDemand"; 
        }
    }
    return "onDemand";
}

function getPppoeMode_autoid()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        $trigger = db_get("Device.PPP.Interface.{$inst_id}.ConnectionTrigger");
        if($trigger === "AlwaysOn")
        {
          return "Always On";
        }
        else if($trigger === "OnDemand")
        {
          return "Dail on Demand"; 
        }
        else if($trigger === "Manual")
        {
          return "Manually Connect"; 
        }
    }
}

function getPppoeUsername()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Username");
    }
}

function getPppoePassword()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Password");
    }
}

function getPppoeServiceName()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.PPPoE.ServiceName");
    }
}

function getPppoeIdleTime()
{
    $inst_id = getPppoeInterfaceInstId();

    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_IdleDisconnectTime"); // RAX30-24 MOD
    }
    return 0;
}

function getPppoeLocalIp()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        $local_ip = db_get("Device.PPP.Interface.{$inst_id}.X_BROADCOM_COM_LocalIPAddress");
        if(preg_match('/\./',$local_ip))
        {
          return $local_ip;
        }
    }
    return "0.0.0.0";
}

function getPppoeConnectionTime()
{
    $inst_id = getPppoeInterfaceInstId();

    if(getPppoeConnectionStatus() == "Connected")
    {
        return date("H:i:s", db_get("Device.PPP.Interface.{$inst_id}.LastChange"));
    }
    return "00:00:00";
}

function getPppoeConnectionStatus()
{
    $inst_id = getPppoeInterfaceInstId();
    if($inst_id !== FALSE)
    {
        //return value Connected/Disconnected/Connecting/Unconfigured
        return  db_get("Device.PPP.Interface.{$inst_id}.ConnectionStatus");
    }
    return "Disconnected";
}

function getPppoeNegotiation()//todo
{
    
    if(getPppoeConnectionStatus() == "Connected")
    {
        return "Success";
    }
    else {
        return "---";
    }
}

function getMlang_PppoeNegotiation()//todo
{
    if(getPppoeConnectionStatus() != "Disconnected")
    {
        return "AWC007";
    }
}

function getPppoeAuthentication()
{
    
    if(getPppoeConnectionStatus() == "Connected")
    {
        return "Success";
    }
    else {
        return "---";
    }
}

function getMlang_PppoeAuthentication()//todo
{
    
    if(getPppoeConnectionStatus() != "Disconnected")
    {
        return "AWC007";
    }
}

function getPptpConnectionStatus()
{
    return (findPppInterface() && getApModeInternetStatus() == "up") ? "Connected" : "Disconnected";
    /*$inst_id = getPptpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        //return value Connected/Disconnected/Connecting/Unconfigured
        return  db_get("Device.PPP.Interface.{$inst_id}.ConnectionStatus");
    }
    return "Disconnected";*/
}

function getPptpUsername()
{
    $inst_id = getPptpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.PPTP.Pptpusertname");
    }
}


function getPptpPassword()
{
    $inst_id = getPptpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.PPTP.Pptppassword");
    }
}

function getPptpMode_autoid()
{
    $inst_id = getPptpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        $trigger = db_get("Device.PPP.Interface.{$inst_id}.ConnectionTrigger");
        if($trigger === "AlwaysOn")
        {
          return "Always On";
        }
        else if($trigger === "OnDemand")
        {
          return "Dail on Demand"; 
        }
        else if($trigger === "Manual")
        {
          return "Manually Connect"; 
        }
    }
}

function getPptpIdleTime()
{
    $inst_id = getPptpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    $idletime = db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_IdleDisconnectTime"); // RAX30-24 MOD
    return intval($idletime)/60;
}

function getPptpIpAddr()
{
    $inst_id = getPptpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_BROADCOM_COM_LocalIPAddress");
}

function getPptpIpMask()
{
    $inst_id = getPptpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_LocalNetmask");
}

function getPptpServerAddr()
{
    $inst_id = getPptpInterfaceInstId();
    if ($inst_id == FALSE) {
    return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.PPTP.PptpIpAddress");
}

function getPptpGateway()
{
    $inst_id = getPptpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_LocalGateway");
}

function getPptpConnectId()
{
    return "";
}



function getL2tpUsername()
{
    $inst_id = getL2tpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Username");
    }
}

function getL2tpPassword()
{
    $inst_id = getL2tpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Password");
    }
}

function getL2tpMode_autoid()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    $trigger = db_get("Device.PPP.Interface.{$inst_id}.ConnectionTrigger");
    if ($trigger == "AlwaysOn") {
        return "Always On";
    }
    else if ($trigger == "OnDemand") {
        return "Dail on Demand";
    }
    else if ($trigger == "Manual") {
        return "Manually Connect";
    }
}

function getL2tpIdleTime()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    $idletime = db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_IdleDisconnectTime"); // RAX30-24 MOD
    return intval($idletime)/60;
}

function getL2tpIpAddr()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_BROADCOM_COM_LocalIPAddress");
}

function getL2tpIpMask()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_LocalNetmask");
}

function getL2tpServerAddr()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.L2TP.LnsIpAddress");
}

function getL2tpGateway()
{
    $inst_id = getL2tpInterfaceInstId();
    if ($inst_id == FALSE) {
        return "";
    }
    
    return db_get("Device.PPP.Interface.{$inst_id}.X_PEGATRON_COM_LocalGateway");
}

function getL2tpConnectionTime()
{
    $inst_id = getL2tpInterfaceInstId();

    if(getL2tpConnectionStatus() == "Connected")
    {
        return date("H:i:s", db_get("Device.PPP.Interface.{$inst_id}.LastChange"));
    }
    return "00:00:00";
}

function getL2tpConnectionStatus()
{
    return (findPppInterface() && getApModeInternetStatus() == "up") ? "Connected" : "Disconnected";
    /*$inst_id = getL2tpInterfaceInstId();
    if($inst_id !== FALSE)
    {
        //return value Connected/Disconnected/Connecting/Unconfigured
        return  db_get("Device.PPP.Interface.{$inst_id}.ConnectionStatus");
    }
    return "Disconnected";*/
}

function getL2tpNegotiation()//todo
{
    
    if(getL2tpConnectionStatus() == "Connected")
    {
        return "Success";
    }
    else {
        return "---";
    }
}

function getL2tpAuthentication()//todo
{
    
    if(getL2tpConnectionStatus() == "Connected")
    {
        return "Success";
    }
    else {
        return "---";
    }
}

function getPptpWanIpAddr()
{
    $lookup_cmd = "ifconfig ppp0 | grep 'inet addr' | cut -d: -f2 | awk '{printf $1}'";
    $output= shell_exec($lookup_cmd );
    return substr_count($output, '.') == 3 ? $output : "0.0.0.0";
}

function getPptpWanMask()
{
    $lookup_cmd = "ifconfig ppp0 | grep 'Mask' | cut -d: -f4 | awk '{printf $1}'";
    $output= shell_exec($lookup_cmd );
    return substr_count($output, '.') == 3 ? $output : "0.0.0.0";
}


function getL2tpWanIpAddr()
{
    $lookup_cmd = "ifconfig ppp0 | grep 'inet addr' | cut -d: -f2 | awk '{printf $1}'";
    $output= shell_exec($lookup_cmd );
    return substr_count($output, '.') == 3 ? $output : "0.0.0.0";
}

function getL2tpWanMask()
{
    $lookup_cmd = "ifconfig ppp0 | grep 'Mask' | cut -d: -f4 | awk '{printf $1}'";
    $output= shell_exec($lookup_cmd );
    return substr_count($output, '.') == 3 ? $output : "0.0.0.0";
}

function findPppInterface()
{
    $lookup_cmd = "ifconfig ppp0";
    $output= shell_exec($lookup_cmd );
    return !strpos("not found",$output);
}
?>
