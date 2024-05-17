<?
    include '../interface.php';
    include '../wifi.php';
    include_once '../apmode.php';
    include_once '../ipv6.php';
    if (!isset($data)) 
    $data = new stdClass();
    $devMode = getRadioVal_mode();
    $ipv6mode = getSelectVal_v6Type();
    
    $data->router_info__hwVer = (object) null;
    $data->router_info__hwVer->value = getModelNameStr();
    $data->router_info__hwVer->mlang = "MRS027";
    $data->router_info__hwVer->type = 'advTableRow';

    $data->router_info__fwVer = (object) null;
    $data->router_info__fwVer->value = getFirmwareVer();
    $data->router_info__fwVer->mlang = "MRS017";
    $data->router_info__fwVer->type = 'advTableRow';

    $data->router_info__langVer = (object) null;
    $data->router_info__langVer->value = getLanguageVersion();
    $data->router_info__langVer->mlang = "MRS013";
    $data->router_info__langVer->type = 'advTableRow';

    if($devMode != "bridge")
    {
        $data->router_info__operationMode = (object) null;
        $data->router_info__operationMode->value = getOperationMode();
        $data->router_info__operationMode->mlang = "MRS078";
        $data->router_info__operationMode->type = 'advTableRow';
    }

    if($devMode == "router")
    {
        $data->router_info__cpuLoad = (object) null;
        $data->router_info__cpuLoad->value = getCpuLoad();
        $data->router_info__cpuLoad->mlang = "PCVP_117";
        //$data->router_info__cpuLoad->mlangText = "CPU Load";
        $data->router_info__cpuLoad->type = 'advTableRow';
        
        $data->router_info__memoryUsage = (object) null;
        $data->router_info__memoryUsage->value = getmemoryUsage();
        $data->router_info__memoryUsage->mlang = "PCVP_111";
        //$data->router_info__memoryUsage->mlangText = "Memory Usage(Used/Total)";
        $data->router_info__memoryUsage->type = 'advTableRow';
        
        $data->router_info__flashUsage = (object) null;
        $data->router_info__flashUsage->value = getflashUsage();
        $data->router_info__flashUsage->mlang = "PCVP_112";
        //$data->router_info__flashUsage->mlangText = "Flash Usage(Used/Total)";
        $data->router_info__flashUsage->type = 'advTableRow';
        
        $data->router_info__sysUptime = (object) null;
        $data->router_info__sysUptime->value = getSysUptime();
        $data->router_info__sysUptime->mlang = "PCVP_113";
        //$data->router_info__sysUptime->mlangText = "System Uptime";
        $data->router_info__sysUptime->type = 'advTableRow';
    }
    
    if($devMode != "ap")
    {
        $data->router_info__lanMac = (object) null;
        $data->router_info__lanMac->value = getLanMacAddr();
        $data->router_info__lanMac->mlang = "MRS015";
        $data->router_info__lanMac->type = 'advTableRow';
        
        $data->router_info__lanIp = (object) null;
        $data->router_info__lanIp->value = getLanInstanceIpAddr();
        $data->router_info__lanIp->mlang = "SWP030";
        $data->router_info__lanIp->type = 'advTableRow';
        
        $data->router_info__lanDhcp = (object) null;
        $data->router_info__lanDhcp->value = getLanDhcpv4EnableForAdv();
        $data->router_info__lanDhcp->mlang = "MRS003";
        $data->router_info__lanDhcp->type = 'advTableRow';
        
        $data->router_info__lanMask = (object) null;
        $data->router_info__lanMask->value = getLanInstanceIpMask();
        $data->router_info__lanMask->mlang = "SWP044";
        $data->router_info__lanMask->type = 'advTableRow';
        
        if($devMode == "router" && $ipv6mode != "disabled")
        {
            $data->router_info__prefixAddr = (object) null;
            $data->router_info__prefixAddr->value = getIPv6LanPrefixAddr();
            $data->router_info__prefixAddr->mlang = "";
            $data->router_info__prefixAddr->mlangText = "Prefix Address";
            $data->router_info__prefixAddr->type = 'advTableRow';
        }
    } 
    
    $data->internet_info__wanMac = (object) null;
    $data->internet_info__wanMac->value = getWANMacUser();
    $data->internet_info__wanMac->mlang = "MRS015";
    $data->internet_info__wanMac->type = 'advTableRow';

    $wan_protocol = db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");

    $data->internet_info__wanIp = (object) null;
    if($wan_protocol === "PPTP")
    {
        $data->internet_info__wanIp->value = getPptpWanIpAddr();
    }
    else if($wan_protocol === "L2TP")
    {
        $data->internet_info__wanIp->value = getL2tpWanIpAddr();
    }
    else
    {
        $data->internet_info__wanIp->value = getWanInstanceIp();
    }
    $data->internet_info__wanIp->mlang = "SWP030";
    $data->internet_info__wanIp->type = 'advTableRow';
    
    $data->internet_info__wanType = (object) null;
    $data->internet_info__wanType->value = getWanConnectionType();
    $data->internet_info__wanType->mlang = "DG012";
    $data->internet_info__wanType->type = 'advTableRow';
    
    $data->internet_info__wanMask = (object) null;
    if($wan_protocol === "PPTP")
    {
        $data->internet_info__wanMask->value = getPptpWanMask();
    }
    else if($wan_protocol === "L2TP")
    {
        $data->internet_info__wanMask->value = getL2tpWanMask();
    }
    else
    {
        $data->internet_info__wanMask->value = getWanInstanceIpMask();
    }
    $data->internet_info__wanMask->mlang = "SWP044";
    $data->internet_info__wanMask->type = 'advTableRow';if($data->internet_info__wanIp->value == "0.0.0.0")
    {
        $dns1 = "";
        $dns2 = "";
    }
    else
    {
        $dns1 = getDNSServerIpAddr(1);
        $dns2 = getDNSServerIpAddr(2);
    }
    $data->internet_info__wanDns = (object) null;
    $data->internet_info__wanDns->value = $dns1 == "" ? "0.0.0.0" : $dns1."<br>".$dns2;
    $data->internet_info__wanDns->mlang = "MRS026";
    $data->internet_info__wanDns->type = 'advTableRow';
    
    if($devMode == "router" && $ipv6mode != "disabled")
    {
        if(getWanIpAddr_For_AdvancedHome() != "0.0.0.0")
        {
            $data->internet_info__ipv6Ip = (object) null;
            $data->internet_info__ipv6Ip->value = getWanIpAddr_For_AdvancedHome();
            $data->internet_info__ipv6Ip->mlang = "";
            $data->internet_info__ipv6Ip->mlangText = "IP Address Ver 6";
            $data->internet_info__ipv6Ip->type = 'advTableRow';

            $data->internet_info__ipv6DefaultGateway = (object) null;
            $data->internet_info__ipv6DefaultGateway->value = getIpVal_gateway();
            $data->internet_info__ipv6DefaultGateway->mlang = "MRS045";
            $data->internet_info__ipv6DefaultGateway->type = 'advTableRow';

            $data->internet_info__ipv6ConnectionType = (object) null;
            $data->internet_info__ipv6ConnectionType->value = getConnection_v6Type();
            $data->internet_info__ipv6ConnectionType->mlang = "MRS076";
            $data->internet_info__ipv6ConnectionType->type = 'advTableRow';

            $dns1 = getIPv6DNSServerIpAddr(1);
            $dns2 = getIPv6DNSServerIpAddr(2);
            $data->internet_info__ipv6Dns = (object) null;
            $data->internet_info__ipv6Dns->value = $dns1 == "::" ? "::" : $dns1."<br>".$dns2;
            $data->internet_info__ipv6Dns->mlang = "AIP034";
            $data->internet_info__ipv6Dns->type = 'advTableRow';
        }
    }
        
    if($devMode == "ap")
    {
        $data->lan_info__macAddr = (object) null;
        $data->lan_info__macAddr->value = getLanMacAddr();
        $data->lan_info__macAddr->mlang = "MRS015";
        $data->lan_info__macAddr->type = 'advTableRow';
    
        $data->lan_info__dhcp = (object) null;
        $data->lan_info__dhcp->value = getRadioVal_apmode_ipType() == "dynamic" ? "On" : "Off";
        $data->lan_info__dhcp->mlang = "MRS024";
        $data->lan_info__dhcp->type = 'advTableRow';
    
        $data->lan_info__ipAddr = (object) null;
        $data->lan_info__ipAddr->value = getIpVal_apmode_ipAddr();
        $data->lan_info__ipAddr->mlang = "SWP030";
        $data->lan_info__ipAddr->type = 'advTableRow';
    
        $data->lan_info__mask = (object) null;
        $data->lan_info__mask->value = getIpVal_apmode_netmask();
        $data->lan_info__mask->mlang = "SWP044";
        $data->lan_info__mask->type = 'advTableRow';
        
        $data->lan_info__gateway = (object) null;
        $data->lan_info__gateway->value = getIpVal_apmode_gateway();
        $data->lan_info__gateway->mlang = "SWP034";
        $data->lan_info__gateway->type = 'advTableRow';
        
        $data->lan_info__dns = (object) null;
        $data->lan_info__dns->value = getIpVal_apmode_dns1()."<br>".getIpVal_apmode_dns2();
        $data->lan_info__dns->mlang = "MRS026";
        $data->lan_info__dns->type = 'advTableRow';
    }
    else if($devMode == "bridge")
    {
        $data->bridge_client_status__macAddr = (object) null;
        $data->bridge_client_status__macAddr->value = getLanMacAddr();
        $data->bridge_client_status__macAddr->mlang = "MRS015";
        $data->bridge_client_status__macAddr->type = 'advTableRow';
    
        $data->bridge_client_status__dhcp = (object) null;
        $data->bridge_client_status__dhcp->value = getRadioVal_apmode_ipType() == "dynamic" ? "On" : "Off";
        $data->bridge_client_status__dhcp->mlang = "MRS024";
        $data->bridge_client_status__dhcp->type = 'advTableRow';
    
        $data->bridge_client_status__ipAddr = (object) null;
        $data->bridge_client_status__ipAddr->value = getIpVal_apmode_ipAddr();
        $data->bridge_client_status__ipAddr->mlang = "SWP030";
        $data->bridge_client_status__ipAddr->type = 'advTableRow';
    
        $data->bridge_client_status__mask = (object) null;
        $data->bridge_client_status__mask->value = getIpVal_apmode_netmask();
        $data->bridge_client_status__mask->mlang = "SWP044";
        $data->bridge_client_status__mask->type = 'advTableRow';
        
        $data->bridge_client_status__gateway = (object) null;
        $data->bridge_client_status__gateway->value = getIpVal_apmode_gateway();
        $data->bridge_client_status__gateway->mlang = "SWP034";
        $data->bridge_client_status__gateway->type = 'advTableRow';
        
        $data->bridge_client_status__dns = (object) null;
        $data->bridge_client_status__dns->value = getDNSServerIpAddr(1)."<br>".getDNSServerIpAddr(2);
        $data->bridge_client_status__dns->mlang = "MRS026";
        $data->bridge_client_status__dns->type = 'advTableRow';
    }


    if($devMode != "bridge")
    {
        $data->wireless__ssid = (object) null;
        $data->wireless__ssid->value = getTextVal_2gSsid();
        $data->wireless__ssid->mlang = "SWS020";
        $data->wireless__ssid->type = 'advTableRow';

        $data->wireless__region = (object) null;
        $data->wireless__region->value = getSelectVal_CountryForAdv();
        $data->wireless__region->mlang = "SWS019";
        $data->wireless__region->type = 'advTableRow';
        
        $data->wireless__channel = (object) null;
        $data->wireless__channel->value = get_2gChannel_primary_secondary();
        $data->wireless__channel->mlang = "SWS018";
        $data->wireless__channel->type = 'advTableRow';
        
        $data->wireless__mode = (object) null;
        $data->wireless__mode->value = getSelectVal_2gModeForAdv();
        $data->wireless__mode->mlang = "SWS037";
        $data->wireless__mode->type = 'advTableRow';

        $smartEnable = getCheckboxVal_smartConnect();
        if ($smartEnable == "false")
        {
            $data->wireless__ap = (object) null;
            $data->wireless__ap->value = getCheckboxVal_2GRadioOn() == "true" ? "ANM003" : "ANM004";
            $data->wireless__ap->mlang = "MRS052";
            $data->wireless__ap->type = 'advTableRow';

            $data->wireless__broadcast = (object) null;
            $data->wireless__broadcast->value = getCheckboxVal_2gSsidBroadcast() == "true" ? "ANM003" : "ANM004";
            $data->wireless__broadcast->mlang = "MRS023";
            $data->wireless__broadcast->type = 'advTableRow';

            $data->wireless__wps = (object) null;
            $data->wireless__wps->value = getCheckboxVal_wpsKeepSetting2G() == "true" ? "MRS074" : "MRS073";
            $data->wireless__wps->mlang = "MRS072";
            $data->wireless__wps->type = 'advTableRow';

            $data->wireless_an__ssid = (object) null;
            $data->wireless_an__ssid->value = getTextVal_5gSsid();
            $data->wireless_an__ssid->mlang = "SWS020";
            $data->wireless_an__ssid->type = 'advTableRow';

            $data->wireless_an__region = (object) null;
            $data->wireless_an__region->value = getSelectVal_CountryForAdv();
            $data->wireless_an__region->mlang = "SWS019";
            $data->wireless_an__region->type = 'advTableRow';

            $data->wireless_an__ap = (object) null;
            $data->wireless_an__ap->value = getCheckboxVal_5GRadioOn() == "true" ? "ANM003" : "ANM004";
            $data->wireless_an__ap->mlang = "MRS052";
            $data->wireless_an__ap->type = 'advTableRow';

            $data->wireless_an__broadcast = (object) null;
            $data->wireless_an__broadcast->value = getCheckboxVal_5gSsidBroadcast() == "true" ? "ANM003" : "ANM004";
            $data->wireless_an__broadcast->mlang = "MRS023";
            $data->wireless_an__broadcast->type = 'advTableRow';

            $data->wireless_an__wps = (object) null;
            $data->wireless_an__wps->value = getCheckboxVal_wpsKeepSetting5G() == "true" ? "MRS074" : "MRS073";
            $data->wireless_an__wps->mlang = "MRS072";
            $data->wireless_an__wps->type = 'advTableRow';
        }
        else
        {
            $data->wireless_an__smartConnect = (object) null;
            $data->wireless_an__smartConnect->value = "<span mlang=\"D-genie_283\">Enabled</span>";
            $data->wireless_an__smartConnect->mlang = "RS-Vault_053";
            $data->wireless_an__smartConnect->type = 'advTableRow';
        }

        $data->wireless_an__channel = (object) null;
        $data->wireless_an__channel->value = get_5gChannel_primary_secondary();
        $data->wireless_an__channel->mlang = "SWS018";
        $data->wireless_an__channel->type = 'advTableRow';

        $data->wireless_an__mode = (object) null;
        $data->wireless_an__mode->value = getSelectVal_5gModeForAdv();
        $data->wireless_an__mode->mlang = "SWS037";
        $data->wireless_an__mode->type = 'advTableRow';

        $data->wireless_6g__ssid = (object) null;
        $data->wireless_6g__ssid->value = getTextVal_6gSsid();
        $data->wireless_6g__ssid->mlang = "SWS020";
        $data->wireless_6g__ssid->type = 'advTableRow';

        $data->wireless_6g__region = (object) null;
        $data->wireless_6g__region->value = getSelectVal_CountryForAdv();
        $data->wireless_6g__region->mlang = "SWS019";
        $data->wireless_6g__region->type = 'advTableRow';

        $data->wireless_6g__channel = (object) null;
        $data->wireless_6g__channel->value = get_6gChannel_primary_secondary();
        $data->wireless_6g__channel->mlang = "SWS018";
        $data->wireless_6g__channel->type = 'advTableRow';

        $data->wireless_6g__mode = (object) null;
        $data->wireless_6g__mode->value = getSelectVal_6gModeForAdv();
        $data->wireless_6g__mode->mlang = "SWS037";
        $data->wireless_6g__mode->type = 'advTableRow';

        $data->wireless_6g__ap = (object) null;
        $data->wireless_6g__ap->value = getCheckboxVal_6GRadioOn() == "true" ? "ANM003" : "ANM004";
        $data->wireless_6g__ap->mlang = "MRS052";
        $data->wireless_6g__ap->type = 'advTableRow';

        $data->wireless_6g__broadcast = (object) null;
        $data->wireless_6g__broadcast->value = getCheckboxVal_6gSsidBroadcast() == "true" ? "ANM003" : "ANM004";
        $data->wireless_6g__broadcast->mlang = "MRS023";
        $data->wireless_6g__broadcast->type = 'advTableRow';
    }
    else if($devMode == "bridge" && getSelectedRadio_BridgeMode() == "2G")
    {
        $data->wireless__ssid = (object) null;
        $data->wireless__ssid->value = getTextVal_wifiSsid2G();
        $data->wireless__ssid->mlang = "SWS020";
        $data->wireless__ssid->type = 'advTableRow';

        $data->wireless__rate = (object) null;
        $data->wireless__rate->value = getBridgeMode_2GLinkRate();
        $data->wireless__rate->mlang = "MRS021";
        $data->wireless__rate->type = 'advTableRow';

        $data->wireless__connStatus = (object) null;
        $data->wireless__connStatus->value = getBridgeMode_2GConnectionStatus();
        $data->wireless__connStatus->mlang = "MRS006";
        $data->wireless__connStatus->type = 'advTableRow';
    }
    else if($devMode == "bridge" && getSelectedRadio_BridgeMode() == "5G")
    {
        $data->wireless_an__ssid = (object) null;
        $data->wireless_an__ssid->value = getTextVal_wifiSsid5G();
        $data->wireless_an__ssid->mlang = "SWS020";
        $data->wireless_an__ssid->type = 'advTableRow';

        $data->wireless_an__rate = (object) null;
        $data->wireless_an__rate->value = getBridgeMode_5GLinkRate();
        $data->wireless_an__rate->mlang = "MRS021";
        $data->wireless_an__rate->type = 'advTableRow';

        $data->wireless_an__connStatus = (object) null;
        $data->wireless_an__connStatus->value = getBridgeMode_5GConnectionStatus();
        $data->wireless_an__connStatus->mlang = "MRS006";
        $data->wireless_an__connStatus->type = 'advTableRow';
    }
    else if($devMode == "bridge" && getSelectedRadio_BridgeMode() == "6G")
    {
        $data->wireless_6g__ssid = (object) null;
        $data->wireless_6g__ssid->value = getTextVal_wifiSsid6G();
        $data->wireless_6g__ssid->mlang = "SWS020";
        $data->wireless_6g__ssid->type = 'advTableRow';

        $data->wireless_6g__rate = (object) null;
        $data->wireless_6g__rate->value = getBridgeMode_6GLinkRate();
        $data->wireless_6g__rate->mlang = "MRS021";
        $data->wireless_6g__rate->type = 'advTableRow';

        $data->wireless_6g__connStatus = (object) null;
        $data->wireless_6g__connStatus->value = getBridgeMode_6GConnectionStatus();
        $data->wireless_6g__connStatus->mlang = "MRS006";
        $data->wireless_6g__connStatus->type = 'advTableRow';
    }

    if($devMode != "bridge")
    {
        $data->guest_network__ssid = (object) null;
        $data->guest_network__ssid->value = getTextVal_2gGuestSsid();
        $data->guest_network__ssid->mlang = "SWS020";
        $data->guest_network__ssid->type = 'advTableRow';
    
        $data->guest_network__ap = (object) null;
        $data->guest_network__ap->value = getCheckboxVal_2gEnableGuest() == "true" ? "ANM003" : "ANM004";
        $data->guest_network__ap->mlang = "MRS052";
        $data->guest_network__ap->type = 'advTableRow';
    
        $data->guest_network__broadcast = (object) null;
        $data->guest_network__broadcast->value = getCheckboxVal_2gGuestSsidBroadcast() == "true" ? "ANM003" : "ANM004";
        $data->guest_network__broadcast->mlang = "MRS023";
        $data->guest_network__broadcast->type = 'advTableRow';
        
        $data->guest_network__allowTosee = (object) null;
        $data->guest_network__allowTosee->value = getCheckboxVal_2gGuestAllowAccessLocal() == "true" ? "ANM003" : "ANM004";
        $data->guest_network__allowTosee->mlang = "SGN014";
        $data->guest_network__allowTosee->type = 'advTableRow';
        
        $data->guest_network_an__ssid = (object) null;
        $data->guest_network_an__ssid->value = getTextVal_5gGuestSsid();
        $data->guest_network_an__ssid->mlang = "SWS020";
        $data->guest_network_an__ssid->type = 'advTableRow';
    
        $data->guest_network_an__ap = (object) null;
        $data->guest_network_an__ap->value = getCheckboxVal_5gEnableGuest() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_an__ap->mlang = "MRS052";
        $data->guest_network_an__ap->type = 'advTableRow';
    
        $data->guest_network_an__broadcast = (object) null;
        $data->guest_network_an__broadcast->value = getCheckboxVal_5gGuestSsidBroadcast() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_an__broadcast->mlang = "MRS023";
        $data->guest_network_an__broadcast->type = 'advTableRow';
        
        $data->guest_network_an__allowTosee = (object) null;
        $data->guest_network_an__allowTosee->value = getCheckboxVal_5gGuestAllowAccessLocal() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_an__allowTosee->mlang = "SGN014";
        $data->guest_network_an__allowTosee->type = 'advTableRow';

        $data->guest_network_6g__ssid = (object) null;
        $data->guest_network_6g__ssid->value = getTextVal_6gGuestSsid();
        $data->guest_network_6g__ssid->mlang = "SWS020";
        $data->guest_network_6g__ssid->type = 'advTableRow';
    
        $data->guest_network_6g__ap = (object) null;
        $data->guest_network_6g__ap->value = getCheckboxVal_6gEnableGuest() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_6g__ap->mlang = "MRS052";
        $data->guest_network_6g__ap->type = 'advTableRow';
    
        $data->guest_network_6g__broadcast = (object) null;
        $data->guest_network_6g__broadcast->value = getCheckboxVal_6gGuestSsidBroadcast() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_6g__broadcast->mlang = "MRS023";
        $data->guest_network_6g__broadcast->type = 'advTableRow';
        
        $data->guest_network_6g__allowTosee = (object) null;
        $data->guest_network_6g__allowTosee->value = getCheckboxVal_6gGuestAllowAccessLocal() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_6g__allowTosee->mlang = "SGN014";
        $data->guest_network_6g__allowTosee->type = 'advTableRow';
    }

    $data->wireless_high__ssid = (object) null;
    $data->wireless_high__ssid->value = getTextVal_5g1Ssid();
    $data->wireless_high__ssid->mlang = "SWS020";
    $data->wireless_high__ssid->type = 'advTableRow';

    if($devMode != "bridge")
    {
      $data->wireless_high__region = (object) null;
      $data->wireless_high__region->value = getSelectVal_CountryForAdv();
      $data->wireless_high__region->mlang = "SWS019";
      $data->wireless_high__region->type = 'advTableRow';
      
      $data->wireless_high__channel = (object) null;
      $data->wireless_high__channel->value = getSelectVal_5g1Channel();
      $data->wireless_high__channel->mlang = "SWS018";
      $data->wireless_high__channel->type = 'advTableRow';
      
      $data->wireless_high__mode = (object) null;
      $data->wireless_high__mode->value = getSelectVal_5g1ModeForAdv();
      $data->wireless_high__mode->mlang = "SWS037";
      $data->wireless_high__mode->type = 'advTableRow';
  
      $data->wireless_high__ap = (object) null;
      $data->wireless_high__ap->value = getCheckboxVal_5G1RadioOn() == "true" ? "ANM003" : "ANM004";
      $data->wireless_high__ap->mlang = "MRS052";
      $data->wireless_high__ap->type = 'advTableRow';
  
      $data->wireless_high__broadcast = (object) null;
      $data->wireless_high__broadcast->value = getCheckboxVal_5g1SsidBroadcast() == "true" ? "ANM003" : "ANM004";
      $data->wireless_high__broadcast->mlang = "MRS023";
      $data->wireless_high__broadcast->type = 'advTableRow';
      
      $data->wireless_high__wps = (object) null;
      $data->wireless_high__wps->value = getCheckboxVal_wpsKeepSetting5G1() == "true" ? "MRS074" : "MRS073";
      $data->wireless_high__wps->mlang = "MRS072";
      $data->wireless_high__wps->type = 'advTableRow';
    }

    if($devMode != "bridge")
    {
        $data->guest_network_high__ssid = (object) null;
        $data->guest_network_high__ssid->value = getTextVal_5g1GuestSsid();
        $data->guest_network_high__ssid->mlang = "SWS020";
        $data->guest_network_high__ssid->type = 'advTableRow';

        $data->guest_network_high__ap = (object) null;
        $data->guest_network_high__ap->value = getCheckboxVal_5g1EnableGuest() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_high__ap->mlang = "MRS052";
        $data->guest_network_high__ap->type = 'advTableRow';
    
        $data->guest_network_high__broadcast = (object) null;
        $data->guest_network_high__broadcast->value = getCheckboxVal_5g1SsidBroadcast() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_high__broadcast->mlang = "MRS023";
        $data->guest_network_high__broadcast->type = 'advTableRow';
        
        $data->guest_network_high__allowTosee = (object) null;
        $data->guest_network_high__allowTosee->value = getCheckboxVal_5g1GuestAllowAccessLocal() == "true" ? "ANM003" : "ANM004";
        $data->guest_network_high__allowTosee->mlang = "SGN014";
        $data->guest_network_high__allowTosee->type = 'advTableRow';
    }

    $data->wanType = (object) null;
    $data->wanType->value = get_wanMode();
    
    $data->apMode = (object) null;
    $data->apMode->value = $devMode;

    $data->bridgeRadio = (object) null;
    $data->bridgeRadio->value = getSelectedRadio_BridgeMode();
    
    $data->{'2GRadioEnable'} = (object) null;
    $data->{'2GRadioEnable'}->value = getCheckboxVal_2GRadioOn();
    
    $data->{'6GRadioEnable'} = (object) null;
    $data->{'6GRadioEnable'}->value = getCheckboxVal_6GRadioOn();

    $data->{'5GRadioEnable'} = (object) null;
    $data->{'5GRadioEnable'}->value = getCheckboxVal_5GRadioOn();

    $data->{'2gGuestEnable'} = (object) null;
    $data->{'2gGuestEnable'}->value = getCheckboxVal_2gEnableGuest();

    $data->{'5gGuestEnable'} = (object) null;
    $data->{'5gGuestEnable'}->value = getCheckboxVal_5gEnableGuest();

    $data->{'6gGuestEnable'} = (object) null;
    $data->{'6gGuestEnable'}->value = getCheckboxVal_6gEnableGuest();
    
    $data->internetStatus = (object) null;
    $data->internetStatus->value = getInternetResult();
    
    echo json_encode($data);
?>
