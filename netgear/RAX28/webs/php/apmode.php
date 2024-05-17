<?
include_once 'common_utils.php';
include_once 'wifi.php';

function getRadioVal_mode()
{
    $mode = db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");
    
    if ($mode == "RT") {
        return "router";
    }
    else if ($mode == "AP") {
        return "ap";
    }
    else if ($mode == "BR") {
        return "bridge";
    }
}

function getCheckboxVal_apmode_enable()
{
    $enable = db_get("Device.Bridging.Bridge.1.Port.10.Enable");
    
    return num_to_TrueFalseStr($enable);
}

function getTextVal_apmode_24GSSID()
{
    return getTextVal_2gSsid();
}

function getTextVal_apmode_5GSSID()
{
    return getTextVal_5gSsid();
}

function getTextVal_apmode_24GPassword()
{
    $securityType = getRadioVal_2gSecurity();
    
    if ($securityType == 1) { //None
        return "None";
    }
    else if ($securityType == 4) { //WPA-ENTERPRISE
        return getTextVal_2gRadiusSecret();
    }
    else {
        return getTextVal_2gPasswd();
    }
}

function getTextVal_apmode_5GPassword()
{
    $securityType = getRadioVal_5gSecurity();
    
    if ($securityType == 1) { //None
        return "None";
    }
    else if ($securityType == 4) { //WPA-ENTERPRISE
        return getTextVal_5gRadiusSecret();
    }
    else {
        return getTextVal_5gPasswd();
    }
}

function getRadioVal_apmode_ipType()
{
    $db_path = "Device.IP.Interface.1.IPv4Address";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        /* only have one instance in this object */
        $ipType = $inst["AddressingType"];
    }
    
    if ($ipType == "DHCP") {
        return "dynamic"; 
    }
    else if ($ipType == "Static") {
        return "fixed";
    }
    
    return "";
}

function getCheckboxVal_enable_DynamicIp()
{
    $ipType = getRadioVal_apmode_ipType();
    
    if ($ipType == "dynamic") {
        return "true";
    }
    else if ($ipType == "fixed") {
        return "false";
    }
}

function getIpVal_apmode_ipAddr()
{
    $db_path = "Device.IP.Interface.1.IPv4Address";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        /* only have one instance in this object */
        return $inst["IPAddress"];
    }
    
    return "";
}

function getIpVal_apmode_netmask()
{
    $db_path = "Device.IP.Interface.1.IPv4Address";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        /* only have one instance in this object */
        return $inst["SubnetMask"];
    }
    
    return "";
}

function getIpVal_apmode_gateway()
{
    $db_path = "Device.Routing.Router.1.IPv4Forwarding";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        /* only have one instance in this object */
        return $inst["GatewayIPAddress"];
    }
    
    return "";
}

function getCheckboxVal_enable_DynamicDns()
{
    return "false";
}

function getIpVal_apmode_dns1()
{
    
    $dns_tmp = db_get("Device.DNS.Client.X_BROADCOM_COM_ActiveDnsServers");
    $dns = explode(",", $dns_tmp);
    
    return $dns[0];
}

function getIpVal_apmode_dns2()
{
    
    $dns_tmp = db_get("Device.DNS.Client.X_BROADCOM_COM_ActiveDnsServers");
    $dns = explode(",", $dns_tmp);
    
    return $dns[1];
}

function getSelectedRadio_BridgeMode()
{
    return db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLIF");
}

function getSelectVal_wifiIF_autoid()
{
    $inf = db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLIF");
    
    if ($inf == "2G") {
        return "Wireless Network(2.4GHz b/g/n/ax)";
    }
    else if ($inf == "5G") {
        return "Wireless Network(5GHz a/n/ac/ax)";
    }
}

function getTextVal_wifiSsid2G()
{
    return db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLSsid");
}

function getRadioVal_wifiSecurity2G()
{
    $security = db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLAuthAkm");
    
    if ($security == "open") {
        return "0";
    }
    else if ($security == "psk") {
        return "1";
    }
    else if ($security == "psk2") {
        return "2";
    }
}

function getTextVal_wifiPassword2G()
{
    return db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLPassword");
}

function getTextVal_wifiSsid5G()
{
    return db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLSsid");
}

function getRadioVal_wifiSecurity5G()
{
    $security = db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLAuthAkm");
    
    if ($security == "open") {
        return "0";
    }
    //5G GUI didn't support WPA. 
    //If security mode is WPA, it would copy form 2.4G and always return WPA2
    else if ($security == "psk") {
        return "2";
    }
    else if ($security == "psk2") {
        return "2";
    }
}

function getTextVal_wifiPassword5G()
{
    return db_get("Device.X_PEGATRON_COM_WifiBackup.BRMode_WLPassword");
}

function getBridgeMode_2GLinkRate()
{
    //$cmd_str = "wl -i wl0 sta_info all | grep 'rate of last tx pkt' |awk '{printf $6}'";
    $cmd_str = "iw dev wl0 link|grep 'tx bitrate:'|awk '{printf $3}'";
    $res =exec($cmd_str);
    return $res != "" ? (explode(" ", $res)[0]." Mbps") : "0 Mbps";
}

function getBridgeMode_5GLinkRate()
{
    $cmd_str = "iw dev wl1 link|grep 'tx bitrate:'|awk '{printf $3}'";
    $res =exec($cmd_str);
    return $res != "" ? (explode(" ", $res)[0]." Mbps") : "0 Mbps";
}

function getBridgeMode_2GConnectionStatus()
{
    $cmd_str = "iw dev wl0 link";
    $res =exec($cmd_str);
    return strstr($res, "Not connected") === false ? "Connected": "Not connected";
}

function getBridgeMode_5GConnectionStatus()
{
    $cmd_str = "iw dev wl1 link";
    $res =exec($cmd_str);
    return strstr($res, "Not connected") === false ? "Connected": "Not connected";
}
?>

