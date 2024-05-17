<?
include_once 'common_utils.php';
include_once 'interface.php';

$ip_if_list = json_decode(db_getInstIDList("Device.IP.Interface"),true);
/* Internal Common Functions Begin-------------------------------------> */
function get_lan6Ip()
{
    $inst_id = getLANv6_IP_InterfaceInstId();
    
    if($inst_id == FALSE)
    {
        return "";
    }
    
    $db_path = "Device.IP.Interface.{$inst_id}.IPv6Address";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return "";  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return "";
    }
    
    foreach($data[$db_path] as $inst)
    {
        if ($inst["Origin"] == "AutoConfigured") {

            if($inst["IPAddress"] === NULL)
            {
               return "";
            }
            else
            {
               return $inst["IPAddress"];
            }
        }
    }
    
    return "";
}

function get_lan6IpType()
{
    $isAutoConfigMode = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanIsAutoConfig");
    
    if ($isAutoConfigMode == "0") {
        //dhcpv6
        return "dhcp";
    }
    else if ($isAutoConfigMode == "1") {
        //stateful
        return "auto";
    }
}

function get_dnsType()
{
    $dnsType = db_get("Device.DNS.Client.X_PEGATRON_COM_Ipv6_DnsType");
    
    if ($dnsType == "DHCP") {
        return "dynamic";
    }
    else if ($dnsType == "Static") {
        return "fixed";
    }
    
    return "";
}

function get_dns1()
{
    $db_path = "Device.DNS.Client.Server";
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
        /* only show static DNS */
        if ($inst["Type"] == "Static") {
            $dns_tmp =  $inst["DNSServer"];
        
            if (strpos($dns_tmp, ":") !== false) {
                $dns = explode(",", $dns_tmp);
                $dns1 = $dns[0];
        
                return $dns1;
            }
        }
    }
    
    return "";
}

function get_dns2()
{
    $db_path = "Device.DNS.Client.Server";
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
        /* only show static DNS */
        if ($inst["Type"] == "Static") {
            $dns_tmp =  $inst["DNSServer"];
        
            if (strpos($dns_tmp, ":") !== false) {
                $dns = explode(",", $dns_tmp);
                $dns2 = $dns[1];
        
                return $dns2;
            }
        }
    }
    
    return "";
}

//<< PEGA Ian: Add for got IPv6 DNS
function getIPv6DNSServerIpAddr($idx)
{
    $dns_str = db_get("Device.DNS.Client.X_BROADCOM_COM_Ipv6_ActiveDnsServers");
    if(strpos($dns_str,',') !== FALSE)
    {
       $dns_list = explode(',',$dns_str);
       return $dns_list[$idx-1];
    }
    return $dns_str;
}
//PEGA >>

function getPppoeV6_PPP_InterfaceInstId()
{
    $ppp_if_path = "Device.PPP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.PPP.Interface.{$inst_id}.Name") == "ppp0.3")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getPppoeV6_IP_InterfaceInstId()
{
    $ppp_if_path = "Device.IP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$inst_id}.Name") == "ppp0.3")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function get6rd_IP_InterfaceInstId()
{
    $ppp_if_path = "Device.IP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$inst_id}.Name") == "6rdTunnel")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getDHCPV6_IP_InterfaceInstId()
{
    $ppp_if_path = "Device.IP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$inst_id}.Name") == "eth4.1")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}

function getLANv6_IP_InterfaceInstId()
{
    $ppp_if_path = "Device.IP.Interface";
    $ppp_if_list = db_getInstIDList($ppp_if_path);
    if($ppp_if_list !== FALSE)
    {
        $ppp_if_list = json_decode($ppp_if_list,true);
        foreach($ppp_if_list[$ppp_if_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$inst_id}.Name") == "br0")
            {
               return $inst_id;
            }
        }
    }
    return FALSE;
}
/* Internal Common Functions <-------------------------------------End */
function getConnection_v6Type()
{
    $v6Type = db_get("Device.IP.X_PEGATRON_COM_IPv6Mode");
    
    return $v6Type;
}


function getSelectVal_v6Type()
{
    $v6Type = db_get("Device.IP.X_PEGATRON_COM_IPv6Mode");
    
    if ($v6Type == "Disabled") {
        return "disabled";
    }
    else if ($v6Type == "AutoDetect") {
        return "autoDetect";
    }
    else if ($v6Type == "6to4") {
        return "6to4";
    }
    else if ($v6Type == "PassThrough") {
        return "bridge";
    }
    else if ($v6Type == "Fixed") {
        return "fixed";
    }
    else if ($v6Type == "DHCPv6") {
        return "dhcp";
    }
    else if ($v6Type == "PPPoE") {
        return "pppoe";
    }
    else if ($v6Type == "Auto Config") {
        return "autoConfig";
    }
    else if ($v6Type == "6rd") {
        return "6rd";
    }
}

function getRadioVal_filter()
{
    return db_get("Device.IP.X_PEGATRON_COM_IPv6Filter");
}

/* for IPV6_fixed_data.php Begin-------------------------------------> */
function getIpVal_ipAddr()
{
    /* interface.2 is static/dhcp wan*/
    //$ipAddr = db_get("Device.IP.Interface.2.IPv6Address.1.IPAddress");
    //return $ipAddr;
    
    $db_path = "Device.IP.Interface.2.IPv6Address";
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
        /* only one instance, so dirrectlly return the value */
        return $inst["IPAddress"];
    }
}

function getTextVal_ipPrefix()
{
    /* interface.2 is static/dhcp wan*/
    //$prefix = db_get("Device.IP.Interface.2.IPv6Prefix");
    //return $prefix;
    
    $db_path = "Device.IP.Interface.2.IPv6Prefix";
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
        /* only one instance, so dirrectlly return the value */
        $prefix_tmp =  $inst["Prefix"];
        $prefix = explode("/", $prefix_tmp);
        
        return $prefix[1];
    }
}
$gw2_list = json_decode(db_getInstIDList("Device.Routing.RouteInformation.InterfaceSetting"),true);
$gw_list = json_decode(db_getInstIDList("Device.Routing.Router.1.IPv6Forwarding"),true);
function getIpVal_gateway()
{
    #$db_path = "Device.Routing.Router.1.IPv6Forwarding";
    /*$db_path = "Device.Routing.RouteInformation.1.InterfaceSetting";
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
        $origin = $inst["Origin"];

        if($origin === "Static")
        {
            $gateway =  $inst["NextHop"];
        
            return $gateway;
        }
    }*/

    //<<PEGA Ian: got IPv6 gateway
    $gw=";;";
    $wan_type = getConnection_v6Type();

    if ($wan_type == "PPPoE")
    {
        $wanInterfaceName = "Device.IP.Interface.5";
    }
    else if ($wan_type == "DHCPv6" || $wan_type == "Fixed")
    {
        $wanInterfaceName = "Device.IP.Interface.2";
    }
    else
    {
        return $gw;
    }

    $num = 0;
    $num = db_get("Device.Routing.Router.1.IPv6ForwardingNumberOfEntries");
    if ($num != 0)
    {
        foreach($GLOBALS['gw_list']["Device.Routing.Router.1.IPv6Forwarding"] as $inst_id)
        {
            if (db_get("Device.Routing.Router.1.IPv6Forwarding.{$inst_id}.Interface") === $wanInterfaceName)
            {
                $gw = db_get("Device.Routing.Router.1.IPv6Forwarding.{$inst_id}.NextHop");
                return $gw;
            }
        }

        $num2 = 0;
        $num2 = db_get("Device.Routing.RouteInformation.InterfaceSettingNumberOfEntries");

        if ($gw === ";;")
        {
            if ($num2 != 0)
            {
                foreach($GLOBALS['gw2_list']["Device.Routing.RouteInformation.InterfaceSetting"] as $inst_id)
                {
                    if (db_get("Device.Routing.RouteInformation.InterfaceSetting.{$inst_id}.Interface") === $wanInterfaceName)
                    {
                        $gw = db_get("Device.Routing.RouteInformation.InterfaceSetting.{$inst_id}.SourceRouter");
                        return $gw;
                    }
                }
            }
        }
    }

    return $gw;
    //PEGA >>

}

function getIpVal_dns1()
{
    return get_dns1();
}

function getIpVal_dns2()
{
    return get_dns2();
}

function getRadioVal_fixed_lanIpAddr()
{
    return get_lan6IpType();
}

function getIpVal_lanIp()
{
    $inst_id = getLANv6_IP_InterfaceInstId();
    if($inst_id == FALSE)
    {
        return "";
    }
    
    $db_path = "Device.IP.Interface.{$inst_id}.IPv6Address";
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
        if ($inst["Enable"] == "1") {
            return $inst["IPAddress"];
        }
    }

    return "";
}

function getTextVal_lanIpPrefix()
{
    $inst_id = getLANv6_IP_InterfaceInstId();
    if($inst_id == FALSE)
    {
        return "";
    }
    
    $db_path = "Device.IP.Interface.{$inst_id}.IPv6Prefix";
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
        if ($inst["Origin"] == "Static") {
            $prefix_tmp = $inst["Prefix"];
            $prefix = explode("/", $prefix_tmp);
            return $prefix[1];
        }
    }

    return "";
}
/* for IPV6_fixed_data.php <-------------------------------------End */

/* for IPV6_Dhcp_data.php Begin-------------------------------------> */
function getTextVal_Dhcp_dhcpUserClass()
{
    $db_path = "Device.DHCPv6.Client";
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
        if ($inst["Enable"] == "1") {
            return $inst["X_PEGATRON_COM_UserClassData"];
        }
    }

    return "";
}

function getTextVal_Dhcp_dhcpDomain()
{
    /* Not implement cms node */
    return "";
}

function getSpanVal_Dhcp_wan6Ip()
{
    $inst_id = getDHCPV6_IP_InterfaceInstId();
    
    if($inst_id == FALSE)
    {
        return "";
    }
    
    $db_path = "Device.IP.Interface.{$inst_id}.IPv6Address";
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
        if ($inst["Origin"] == "DHCPv6") {
            return $inst["IPAddress"];
        }
    }
    
    return "";
}

function getMlangVal_Dhcp_wan6Ip()
{
    $wan6Ip = getSpanVal_Dhcp_wan6Ip();
    
    if ($wan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_Dhcp_dnsType()
{
    return get_dnsType();
}

function getIpVal_Dhcp_Dns1()
{
    return get_dns1();
}

function getIpVal_Dhcp_Dns2()
{
    return get_dns2();
}

function getSpanVal_Dhcp_lan6Ip()
{
    $enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }
}

function getMlangVal_Dhcp_lan6Ip()
{
    $lan6Ip = getSpanVal_Dhcp_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_Dhcp_lanIpAddr()
{
    return get_lan6IpType();
}

function getCheckboxVal_Dhcp_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_Dhcp_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}
/* for IPV6_Dhcp_data.php <-------------------------------------End */



/* for IPV6_Pppoe_data.php Begin-------------------------------------> */

function getCheckboxVal_Pppoe_usePPPoEv4()
{
    $usePPPoEv4 = db_get("Device.IP.X_PEGATRON_COM_UsePPPv4Info");
    
    return num_to_TrueFalseStr($usePPPoEv4);
}

function getTextVal_Pppoe_login()
{
    $inst_id = getPppoeV6_PPP_InterfaceInstId();
    
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Username");
    }
    
    return "";
}

function getTextVal_Pppoe_password()
{
    $inst_id = getPppoeV6_PPP_InterfaceInstId();
    
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.Password");
    }
    
    return "";
}

function getTextVal_Pppoe_serviceName()
{
    $inst_id = getPppoeV6_PPP_InterfaceInstId();
    
    if($inst_id !== FALSE)
    {
        return db_get("Device.PPP.Interface.{$inst_id}.PPPoE.ServiceName");
    }
    
    return "";
}

function getSelectVal_Pppoe_mode()
{
    $inst_id = getPppoeV6_PPP_InterfaceInstId();
    
    if($inst_id !== FALSE) {
        $mode =  db_get("Device.PPP.Interface.{$inst_id}.ConnectionTrigger");
    }
    else {
        return "";
    }
    
    if ($mode == "AlwaysOn") {
        return "always";
    }
    else if ($mode == "OnDemand") {
        return "onDemand";
    }
    else if ($mode == "Manual") {
        return "manually";
    }
}

function getSpanVal_Pppoe_wan6Ip()
{
    $inst_id = getPppoeV6_IP_InterfaceInstId();
    
    if($inst_id == FALSE)
    {
        return "";
    }
    
    $db_path = "Device.IP.Interface.{$inst_id}.IPv6Address";
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
        if ($inst["Origin"] == "AutoConfigured") {
            return $inst["IPAddress"];
        }
    }
    
    return "";
}

function getMlangVal_Pppoe_wan6Ip()
{
    $wan6Ip = getSpanVal_Pppoe_wan6Ip();
    
    if ($wan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_Pppoe_dnsType()
{
    return get_dnsType();
}

function getIpVal_Pppoe_Dns1()
{
    return get_dns1();
}

function getIpVal_Pppoe_Dns2()
{
    return get_dns2();
}

function getSpanVal_Pppoe_lan6Ip()
{
    /*$enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }*/
    return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
}

function getMlangVal_Pppoe_lan6Ip()
{
    $lan6Ip = getSpanVal_Pppoe_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_Pppoe_lanIpAddr()
{
    return get_lan6IpType();
}

function getCheckboxVal_Pppoe_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_Pppoe_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}


/* for IPV6_Pppoe_data.php <-------------------------------------End */

/* for IPV6_6rd_data.php Begin-------------------------------------> */
function getIpVal_6rd_prefix()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
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
        $fullprefix = $inst["SPIPv6Prefix"];
        $fullprefix_array = explode(":", $fullprefix);
        
        if (count($fullprefix_array) < 4) {
            return "";
        }
        
        $prefix_6rd = sprintf("%s:%s:%s:%s", $fullprefix_array[0], $fullprefix_array[1], $fullprefix_array[2], $fullprefix_array[3]);
        /* ToDo: after cgi fix 6rd prefix issu, need to refine the return value by prefix len */
        return $prefix_6rd;
    }
    
    return "";
}

function getTextVal_6rd_prefixLength()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
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
        $fullprefix = $inst["SPIPv6Prefix"];
        $fullprefix_array = explode("/", $fullprefix);  
        $prefixLen = $fullprefix_array[1];
        return $prefixLen;
    }
    
    return "";
}

function getIpVal_6rd_ipv4BoderAddr()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
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
        if ($inst["X_BROADCOM_COM_TunnelName"] == "6rd_TUNNEL") {
            return $inst["BorderRelayIPv4Addresses"];
        }
    }
    
    return "";
}

function getTextVal_6rd_ipv4BoderMaskLen()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
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
        return $inst["IPv4MaskLength"];
    }
    
    return "";
}

function getRadioVal_6rd_dnsType()
{
    return get_dnsType();
}

function getIpVal_6rd_Dns1()
{
    return get_dns1();
}

function getIpVal_6rd_Dns2()
{
    return get_dns2();
}

function getSpanVal_6rd_lan6Ip()
{
    /*$enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");

    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }*/
    return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");

    //return get_lan6Ip();
}

function getMlangVal_6rd_lan6Ip()
{
    $lan6Ip = getSpanVal_6rd_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_6rd_lanIpAddr()
{
    return get_lan6IpType();
}
function getCheckboxVal_6rd_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_6rd_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}

function getTextVal_6rd_mtuSize()
{
    $inst_id = get6rd_IP_InterfaceInstId();
    
    if($inst_id == FALSE)
    {
        return "";
    }
    
    return db_get("Device.IP.Interface.{$inst_id}.MaxMTUSize");
}
/* for IPV6_6rd_data.php <-------------------------------------End */

/* for IPV6_6to4_data.php Begin-------------------------------------> */
function getRadioVal_6to4_relayRouterType()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return "dynamic";  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return "dynamic";
    }
    
    foreach($data[$db_path] as $inst)
    {
        if ($inst["X_BROADCOM_COM_TunnelName"] == "6to4_TUNNEL") {
/*
            $BRType = $inst["X_BROADCOM_COM_Dynamic"];
        
            if ($BRType == "1") {
                return "dynamic";
            }
            else if ($BRType == "0") {
                return "fixed";
            }
*/

            $BRType = $inst["X_PEGATRON_COM_RelayRouterType"];

            if ($BRType == "auto") {
                return "dynamic";
            }
            else {
                return "fixed";
            }


        }
    }
    
    return "dynamic";
}

function getIpVal_6to4_relayRouterIp()
{
    $db_path = "Device.IPv6rd.InterfaceSetting";
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
        if ($inst["X_BROADCOM_COM_TunnelName"] == "6to4_TUNNEL") {
            return $inst["BorderRelayIPv4Addresses"];
        }
    }
    
    return "";
}

function getRadioVal_6to4_dnsType()
{
    return get_dnsType();
}

function getIpVal_6to4_Dns1()
{
    return get_dns1();
}

function getIpVal_6to4_Dns2()
{
    return get_dns2();
}

function getSpanVal_6to4_lan6Ip()
{
    /*$enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");

    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }*/
    return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");

    //return get_lan6Ip();
}

function getMlangVal_6to4_lan6Ip()
{
    $lan6Ip = getSpanVal_6to4_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_6to4_lanIpAddr()
{
    return get_lan6IpType();
}

function getCheckboxVal_6to4_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_6to4_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}

/* for IPV6_6to4_data.php <-------------------------------------End */

/* for IPV6_AutoConfig_data.php Begin-------------------------------------> */
function getTextVal_AutoConfig_dhcpUserClass()
{
    /*cms not implement this node */
    return "";
}

function getTextVal_AutoConfig_dhcpDomain()
{
    /*cms not implement this node */
    return "";
}

function getSpanVal_AutoConfig_wan6Ip()
{
    /*cms not implement this node */
    return "";
}

function getMlangVal_AutoConfig_wan6Ip()
{
    $wan6Ip = getSpanVal_AutoConfig_wan6Ip();
    
    if ($wan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_AutoConfig_dnsType()
{
    return get_dnsType();
}

function getIpVal_AutoConfig_Dns1()
{
    return get_dns1();
}

function getIpVal_AutoConfig_Dns2()
{
    return get_dns2();
}

function getSpanVal_AutoConfig_lan6Ip()
{
    $enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }
}

function getMlangVal_AutoConfig_lan6Ip()
{
    $lan6Ip = getSpanVal_AutoConfig_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_AutoConfig_lanIpAddr()
{
    return get_lan6IpType();
}

function getCheckboxVal_AutoConfig_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_AutoConfig_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}
/* for IPV6_AutoConfig_data.php <-------------------------------------End */

/* for ipv6_AutoDetect_data.php Begin-------------------------------------> */
function getSpanVal_AutoDetect_wan6Ip()
{
    $wan_inst = getWanInstanceID();
    $wanIP = "::";

    $dhcp_type = "DHCPv6";
    $if_ipv6_path = "Device.IP.Interface.{$wan_inst}.IPv6Address";
    $if_ipv6_list = db_getInstIDList($if_ipv6_path);
    if($if_ipv6_list !== FALSE)
    {
        $if_ipv6_list = json_decode($if_ipv6_list,true);
        foreach($if_ipv6_list[$if_ipv6_path] as $inst_id)
        {
            if(db_get("Device.IP.Interface.{$wan_inst}.IPv6Address.{$inst_id}.Origin") === $dhcp_type)
            {
              $wanIP = db_get("Device.IP.Interface.{$wan_inst}.IPv6Address.{$inst_id}.IPAddress");
              break;
            }
        }
    }

    return $wanIP;
}

function getMlangVal_AutoDetect_wan6Ip()
{
    $wan6Ip = getSpanVal_AutoDetect_wan6Ip();
    
    if ($wan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_AutoDetect_dnsType()
{
    return get_dnsType();
}

function getIpVal_AutoDetect_Dns1()
{
    return get_dns1();
}

function getIpVal_AutoDetect_Dns2()
{
    return get_dns2();
}

function getSpanVal_AutoDetect_lan6Ip()
{
    $enable_interfaceID = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    if ($enable_interfaceID == "1") {
        return db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanAutoConfigIPAddr");
    }
    else if ($enable_interfaceID == "0") {
        return get_lan6Ip();
    }
}

function getMlangVal_AutoDetect_lan6Ip()
{
    $lan6Ip = getSpanVal_AutoDetect_lan6Ip();
    
    if ($lan6Ip == "") {
        return "AIP023";
    }
    else {
        return "";
    }
}

function getRadioVal_AutoDetect_lanIpAddr()
{
    return get_lan6IpType();
}

function getCheckboxVal_AutoDetect_enableInterfaceId()
{
    $enable = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceIdStatus");
    
    return num_to_TrueFalseStr($enable);
}

function getIpVal_AutoDetect_lanInterfaceId()
{
    //$id = db_get("Device.DHCPv6.Server.Pool.1.X_BROADCOM_COM_MinInterfaceID");
    $id = db_get("Device.IP.Interface.1.X_PEGATRON_COM_LanInterfaceId");
    
    return $id;
}

function getMlangVal_AutoDetect_detectResult()
{
    if (getWANPortStatus() ==  "down")
    {
        return "AIP020";
    }
    else
    {
        $v6Type = db_get("Device.IP.X_PEGATRON_COM_AutoDetectResult");

        if ($v6Type == "Disabled") {
            return "SWP043";
        }
        else if ($v6Type == "6to4") {
            return "AIP004";
        }
        else if ($v6Type == "PassThrough") {
            return "AIP005";
        }
        else if ($v6Type == "DHCPv6") {
            return "MRS024";
        }
        else if ($v6Type == "PPPoE") {
            return "SWP016";
        }
        else if ($v6Type == "Auto Config") {
            return "AIP014";
        }
        else if ($v6Type == "6rd") {
            return "AIP028";
        }
    }
}

function getWanConnectionStatus()
{
    return getWANPortStatus();
}

/* for ipv6_AutoDetect_data.php <-------------------------------------End */


function getWanIpAddr_For_AdvancedHome()
{
    //$connType = getSelectVal_v6Type();
    $wan_inst = getWanEthernetInstanceID();
    $wanIP = "0.0.0.0";

    $wan_type = getConnection_v6Type();

    if ($wan_type === "PPPoE")
    {
        $wanInterfaceName = "ppp0.3";
    }
    else if ($wan_type === "DHCPv6" || $wan_type === "Fixed")
    {
        //$wanInterfaceName = db_get("Device.Ethernet.Interface.{$wan_inst}.Name");
        $wanInterfaceName = "eth4.1";
    }
    
    if($wanInterfaceName === NULL)
        return $wanIP;

    foreach($GLOBALS['ip_if_list']["Device.IP.Interface"] as $inst_id)
    {
        if (db_get("Device.IP.Interface.{$inst_id}.Name") === $wanInterfaceName)
        {
            if ($wan_type === "Fixed")
            {
                return db_get("Device.IP.Interface.{$inst_id}.X_PEGATRON_COM_StaticIpv6Addr");
            }
            
            return db_get("Device.IP.Interface.{$inst_id}.X_PEGATRON_COM_LanAutoConfigIPAddr");
        }
    }

    
    return $wanIP;
}

function getWanGateway_For_AdvancedHome()
{
    $wan_inst = getWanEthernetInstanceID();

    $wan_type = getConnection_v6Type();

    $wanInterfaceName = db_get("Device.Ethernet.Interface.{$wan_inst}.Name");
    
    if($wanInterfaceName == NULL)
        return "";

    foreach($GLOBALS['ip_if_list']["Device.IP.Interface"] as $inst_id)
    {
        if (db_get("Device.IP.Interface.{$inst_id}.Name") === $wanInterfaceName)
        {
            return db_get("Device.IP.Interface.{$inst_id}.X_PEGATRON_COM_LanAutoConfigIPAddr");
        }
    }
}

function getIPv6LanPrefixAddr()
{
    $ipv6Mode = getConnection_v6Type();
    $lan6Ip = "";
    $lan6IpPrefix = "";

    if ($ipv6Mode == "Fixed")
    {
        $lan6Ip = getIpVal_lanIp();
    }
    else if ($ipv6Mode == "DHCPv6")
    {
        $lan6Ip = getSpanVal_Dhcp_lan6Ip();
    }
    else if ($ipv6Mode == "6rd")
    {
        $lan6Ip = getSpanVal_6rd_lan6Ip();
    }
    else if ($ipv6Mode == "PPPoE")
    {
        $lan6Ip = getSpanVal_Pppoe_lan6Ip();
    }
    else if ($ipv6Mode == "6to4")
    {
        $lan6Ip = getSpanVal_6to4_lan6Ip();
    }
    else if ($ipv6Mode == "AutoDetect")
    {
        $lan6Ip = getSpanVal_AutoDetect_lan6Ip();
    }
    else if ($ipv6Mode == "Auto Config")
    {
        $lan6Ip = getSpanVal_AutoConfig_lan6Ip();
    }

    if ($lan6Ip == "")
    {
        return "";
    }

    if ($ipv6Mode == "6rd")
    {
        $lan6IpPrefix = getTextVal_6rd_prefixLength();
    }
    else
    {
        $lan6IpPrefix = getTextVal_lanIpPrefix();
    }

    if ($lan6IpPrefix == "")
    {
        $lan6IpPrefix = "64";
    }

    return $lan6Ip."/".$lan6IpPrefix;
}
?>
