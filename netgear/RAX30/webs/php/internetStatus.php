<?
include_once 'pppoe.php';

function getTextVal_wanPortConnectTime()
{
    //physical ethernet port of WAN is eth4 
    $wan_phy_port_inst = 5;
    $uptime = db_get("Device.Ethernet.Interface.{$wan_phy_port_inst}.LastChange");
    $connectStatus = db_get("Device.Ethernet.Interface.{$wan_phy_port_inst}.Status");
    
    if ($connectStatus == "Up") {
        $connectTime = date("H:i:s",$upTime);
    }
    else if ($connectStatus == "Dormant") {
        $connectTime = "--:--:--";
    }
    
    return $connectTime;
}

function getTextVal_wanPortConnectStatus()
{
    $wan_phy_port_inst = 5;
    $connectStatus = db_get("Device.Ethernet.Interface.{$wan_phy_port_inst}.Status");
    
    if ($connectStatus == "Up") {
        return "connected";
    }
    else if ($connectStatus == "Dormant") {
        return "disconnected";
    }
    else {
        return "Status Unknown!";
    }
}

function getTextVal_negotiationStatus()
{
    $wanMode = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");
    
    if ($wanMode == "PPPoE") {
        return getPppoeNegotiation();
    }
    else if ($wanMode == "L2TP") {
        return getL2tpNegotiation();
    }
    else if ($wanMode == "PPTP") {
        //ToDo getPptpNegotiation
        return "---";
    }
}

function getTextVal_authStatus()
{
    $wanMode = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");
    
    if ($wanMode == "PPPoE") {
        return getPppoeAuthentication();
    }
    else if ($wanMode == "L2TP") {
        return getL2tpAuthentication();
    }
    else if ($wanMode == "PPTP") {
        //ToDo getPptpAuthentication
        return "---";
    }
}
?>
