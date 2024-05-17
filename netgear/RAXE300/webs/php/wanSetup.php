<?
include_once 'common_utils.php';
/* Internal Common Functions Begin-------------------------------------> */

function getWanInterfacePath()
{
    $interface1 = "Device.IP.Interface.2";
    $interface2 = "Device.IP.Interface.3";
    
    /* Check which one is enabled interface */
    if (db_get("Device.IP.Interface.2.Enable") == "1")
    {
        return $interface1;
    }
    else if (db_get("Device.IP.Interface.3.Enable") == "1")
    {
        return $interface2;
    }
}
/* Internal Common Functions <-------------------------------------End */

function getCheckboxVal_disableProtection()
{
    $inf = getWanInterfacePath();
    $db_path = sprintf("%s.X_PEGATRON_COM_ProtectionEnabled", $inf);
    
    $enable = db_get($db_path);
    
    if ($enable == "1") {
        $disable = "0";
    }
    else if ($enable == "0"){
        $disable = "1";
    }
    
    return num_to_TrueFalseStr($disable);
}

function getInputVal_enableProtection()
{
    $inf = getWanInterfacePath();
    $db_path = sprintf("%s.X_PEGATRON_COM_ProtectionEnabled", $inf);
    
    $enable = db_get($db_path);
    
    return num_to_TrueFalseStr($enable);
}

function getCheckboxVal_enableDmz()
{
    //Device.NAT.PortMapping.{i}.Enable
    $db_path = "Device.NAT.PortMapping";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    
    foreach($data[$db_path] as $inst)
    {
        if ($inst["Description"] == "DMZ") {
            $enable = $inst["Enable"];
            return num_to_TrueFalseStr($enable);
        }
    }
}

function getIpVal_dmzServer()
{
    //Device.NAT.PortMapping.{i}.InternalClient
    $db_path = "Device.NAT.PortMapping";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    
    foreach($data[$db_path] as $inst)
    {
        if ($inst["Description"] == "DMZ") {
            return $inst["InternalClient"];
        }
    }
}

function getCheckboxVal_responsePing()
{
    $inf = getWanInterfacePath();
    $db_path = sprintf("%s.X_PEGATRON_COM_ICMPEnabled", $inf);
    
    $enable = db_get($db_path);
    
    return num_to_TrueFalseStr($enable);
}

function getCheckboxVal_disableIgmpProxy()
{
    $inf = getWanInterfacePath();
    $db_path1 = sprintf("%s.X_BROADCOM_COM_IGMPEnabled", $inf);
    $db_path2 = sprintf("%s.X_BROADCOM_COM_IGMP_SOURCEEnabled", $inf);
    
    $enable1 = db_get($db_path1);
    $enable2 = db_get($db_path2);
    
    if ($enable1 == "1" && $enable2 == "1") {
        $enable = "1";
    }
    else {
        $enable = "0";
    }
    
    if ($enable == "1") {
        $disable = "0";
    }
    else if ($enable == "0"){
        $disable = "1";
    }
    
    return num_to_TrueFalseStr($disable);
}

function getInputVal_enableIgmpProxy()
{
    $inf = getWanInterfacePath();
    $db_path1 = sprintf("%s.X_BROADCOM_COM_IGMPEnabled", $inf);
    $db_path2 = sprintf("%s.X_BROADCOM_COM_IGMP_SOURCEEnabled", $inf);
    
    $enable1 = db_get($db_path1);
    $enable2 = db_get($db_path2);
    
    if ($enable1 == "1" && $enable2 == "1") {
        $enable = "1";
    }
    else {
        $enable = "0";
    }
    
    return num_to_TrueFalseStr($enable);
}

function getInputVal_btIgmpProxy()
{
    $enable = db_get("Device.X_BROADCOM_COM_IGMPCfg.X_PEGATRON_COM_BtIgmpProxy");

    return num_to_TrueFalseStr($enable);
}

function getInputVal_mtuSize()
{
    $inf = getWanInterfacePath();
    $db_path = sprintf("%s.MaxMTUSize", $inf);
    
    return db_get($db_path);
    
}

function getRadioVal_natFilter()
{
    $db_path = "Device.NAT.InterfaceSetting";
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
        $FullconeNATEnabled = $inst["X_BROADCOM_COM_FullconeNATEnabled"];
    }
    
    if ($FullconeNATEnabled == "1") {
        $natFilter = "open";
    }
    else if ($FullconeNATEnabled == "0") {
        $natFilter = "secured";
    }
    
    return $natFilter;
}

function getCheckboxVal_disableSipAlg()
{
    $db_path = "Device.NAT.InterfaceSetting";
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
        $enable = $inst["X_PEGATRON_COM_SIPALGEnabled"];
    }
    
    if ($enable == "1") {
        $disable = "0";
    }
    else if ($enable == "0") {
        $disable = "1";
    }
    
    return num_to_TrueFalseStr($disable);
}

function getInputVal_enableSipAlg()
{
    $db_path = "Device.NAT.InterfaceSetting";
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
        $enable = $inst["X_PEGATRON_COM_SIPALGEnabled"];
    }
    
    return num_to_TrueFalseStr($enable);
}

function get_WanInfName()
{
    $inf = getWanInterfacePath();
    $db_path = sprintf("%s.Name", $inf);
    
    return db_get($db_path);
}

?>
