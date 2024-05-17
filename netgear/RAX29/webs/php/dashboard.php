<?
$dbg = FALSE;

//For REX HW, wl0 is 5G1, wl1 is 2G, wl2 is 5G
//For RAX30 HW, wl0 is 2G, wl1 is 5G
$radio_2g = 1;
$radio_5g = 2;

$ssid_2g = $ap_2g = 1;
$guest_ssid_2g = $guest_ap_2g = 2;
$ssid_5g = $ap_5g= 3;
$guest_ssid_5g = $guest_ap_5g = 4;

function getWANPendingPage()
{
  if(getWANPortStatus() === "up")
  {
      return "BAS_wan.html";
  }
  else
  {
      return "WIZ_sel.html";
  }
}

function getWiFiSsidByInst($ap_inst)
{
    $ssid = db_get("Device.WiFi.SSID.{$ap_inst}.SSID");
    return htmlentities($ssid);
}

function getWiFiKeyByInst($ap_inst)
{
    $passphrase = db_get("Device.WiFi.AccessPoint.{$ap_inst}.Security.KeyPassphrase");
    return $passphrase;
}

function getWiFiSecurityMode($ap_inst)
{
    $authMode = db_get("Device.WiFi.AccessPoint.{$ap_inst}.Security.WlAuthMode");
    return $authMode;
}

function getBasicHomeWiFiPri()
{
    global $radio_2g, $radio_5g;
    global $ap_2g, $ap_5g;
    global $ssid_2g, $ssid_5g;

    //[1] Display 'OFF' if both of 2.4GHz and 5GHz are disabled.
    //[2] Display 'No Security' if the security of 2.4GHz or 5GHz is disabled.
    //[3] Display 2.4GHz if it is not disabled.
    //[4] Display 5GHz if it is enabled and 2.4GHz is disabled.

    //Radio               none      2g           5g          both
    //Security   none      OFF  No Security  No Security  No Security
    //            2g       OFF      2G       No Security      2G
    //            5g       OFF  No Security      5G           5G
    //           both      OFF      2G           5G           2G
    $radio_2G_enable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? 1 : 0;
    $radio_5G_enable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? 1 : 0;
    $wifi_button_enable = db_get("Device.X_PEGATRON_COM_DeviceInfo.WifiBtnEnable") === "1" ? 1 : 0;
    $radio_2G_security = getWiFiSecurityMode($ap_2g) === "open" ? 0 : 1;
    $radio_5G_security = getWiFiSecurityMode($ap_5g) === "open" ? 0 : 1;
    if(!$radio_2G_enable && !$radio_5G_enable)
    {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_90\">OFF</span></td></tr>";
    }
    else if ($wifi_button_enable  === 0) {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_90\">OFF</span></td></tr>";
    }
    else if(($radio_2G_enable && $radio_2G_security === 0) ||
            ($radio_5G_enable && $radio_5G_security === 0))
    {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_169\">No Security</span></td></tr>";
    }
    else if($radio_2G_enable)
    {
        $ssid_2g =  getWiFiSsidByInst($ssid_2g);
        $key_2g = getWiFiKeyByInst($ap_2g);
        return "<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$ssid_2g."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$key_2g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>";
    }
    else
    {
        $ssid_5g =  getWiFiSsidByInst($ssid_5g);
        $key_5g = getWiFiKeyByInst($ap_5g);
        return "<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$ssid_5g."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$key_5g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>";
    } 
}

function getWirelessRadioResult()
{
    global $radio_2g, $radio_5g;

    $WPS_enable = 0;//to do
    if($WPS_enable)
    {
        return "none";  
    }
    $radio_2G_enable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? 1 : 0;
    $radio_5G_enable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? 1 : 0;
    if($radio_2G_enable === 1 && $radio_5G_enable === 1)
    {
        return "both";
    }
    else if(!$radio_2G_enable && $radio_5G_enable === 1)
    {
        return "5g";
    }
    else if($radio_2G_enable === 1 && !$radio_5G_enable)
    {
        return "2g";
    }
    else
    {
        return "none";  
    }
}

function getWirelessSecurityResult()
{
    global $ap_2g, $ap_5g;

    $WPS_enable = 0;//to do
    if($WPS_enable)
    {
        return "none";  
    }
    $radio_2G_security = getWiFiSecurityMode($ap_2g) === "open" ? 0 : 1;
    $radio_5G_security = getWiFiSecurityMode($ap_5g) === "open" ? 0 : 1;
    if($radio_2G_security !== 0 && $radio_5G_security !== 0)
    {
        return "both";
    }
    else if($radio_2G_security !== 0 && $radio_5G_security === 0)
    {
        return "2g";
    }
    else if($radio_2G_security === 0 && $radio_5G_security !== 0)
    {
        return "5g";
    }
    else
    {
        return "none";  
    }
}


function getBasicHomeWiFiGuest()
{
    global $radio_2g, $radio_5g;
    global $guest_ap_2g, $guest_ap_5g;
    global $guest_ssid_2g, $guest_ssid_5g;

    //[1] Display Not Enabled if both of 2.4GHz and 5GHz are disabled.
    //[2] Display 2.4GHz if it is not disabled.
    //[3] Display 5GHz if it is enabled and 2.4GHz is disabled.

    //Radio                 none            2g                  5g               both
    //Security   none    NOT ENABLED     2GSSID&None        5GSSID&None       2GSSID&None
    //            2g     NOT ENABLED   2GSSID&passphrase    5GSSID&None       2GSSID&passphrase
    //            5g     NOT ENABLED     2GSSID&None       5GSSID&passphrase  2GSSID&None
    //           both    NOT ENABLED   2GSSID&passphrase   5GSSID&passphrase  2GSSID&passphrase
    $radio_2G_enable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? 1 : 0;
    $radio_5G_enable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? 1 : 0;
    $radio_guest_2G_enable = db_get("Device.WiFi.SSID.{$guest_ssid_2g}.Enable") === "1" ? 1 : 0;
    $radio_guest_5G_enable = db_get("Device.WiFi.SSID.{$guest_ssid_5g}.Enable") === "1" ? 1 : 0;
    $radio_guest_2G_security = getWiFiSecurityMode($guest_ap_2g) === "open" ? 0 : 1;
    $radio_guest_5G_security = getWiFiSecurityMode($guest_ap_5g) === "open" ? 0 : 1;
    if(!($radio_guest_2G_enable && $radio_2G_enable) && !($radio_guest_5G_enable && $radio_5G_enable))
    {
        return "<tr><td id=\"guest1\" style=\"valign:middle;text-align:center\"><span id=\"Guest-status1\" class=\"Status-normal\" mlang=\"D-genie_25\">STATUS</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" mlang=\"genie_87\">NOT ENABLED</span></span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\" style=\"display:none;\">".$ssid_2g."&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">".$key_2g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"guest2\"></td></tr>";
    }
    else if($radio_guest_2G_enable && $radio_2G_enable)
    {
        $ssid_2g =  getWiFiSsidByInst($guest_ssid_2g);
        if ($radio_guest_2G_security === 0)
        {
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_2g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" mlang=\"SWS016\">None</span> <span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">".$key_2g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"guest4\"></td><tr>";
        }
        else
        {
            $key_2g = getWiFiKeyByInst($guest_ap_2g);
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_2g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\">".$key_2g."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>";
        }
    }
    else
    {
        $ssid_5g =  getWiFiSsidByInst($guest_ssid_5g);
        if ($radio_guest_5G_security === 0)
        {
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_5g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" mlang=\"SWS016\">None</span> <span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">".$key_5g."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>";
        }
        else
        {
            $key_5g = getWiFiKeyByInst($guest_ap_5g);
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_5g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\">".$key_5g."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>";
        }
    } 
}

function getArmorStatus()
{
    exec("getdb --bd_status", $output, $ret);
    if (strstr($output[0], "valid")) {
	    return '<span id="Armor-condition" class="Condition-normal" mlang="PCVP_084">ACTIVATED</span>';
    }
    else {
	    return '<span id="Armor-condition" class="Condition-normal" mlang="PCVP_083">NOT ACTIVATED</span>';
    }
}

function detectInternetStatus()
{
    $fileName = "/tmp/Wan_Online";
    $prevTime = 0;
    $currTime = 0;
    $seconds = 5;
    $ret = "down";

    if(file_exists($fileName))
    {
        $prevTime = filemtime($fileName);
    }

    exec("ledCli WAN MSG_LED_WAN_RETRY");

    do {
        if(file_exists($fileName))
        {
            $currTime = filemtime($fileName);
            if ($currTime > $prevTime)
            {
                $ret = "up";
                break;
            }
        }
        sleep(1);
        $seconds--;
    }while($seconds);

    if ($seconds == 0)
    {
        if(file_exists($fileName))
        {
            $ret = "up";
        }
    }

    return $ret;
}
?>
