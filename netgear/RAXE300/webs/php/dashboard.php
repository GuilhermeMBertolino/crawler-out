<?
include_once 'commonCfg.php';
$dbg = FALSE;

//For REX HW, wl0 is 5G1, wl1 is 2G, wl2 is 5G
//For RAX30 HW, wl0 is 2G, wl1 is 5G
//For RAXE300 HW, wl0 is 5G, wl1 is 2G, wl2 is 6G

if ($board === "RAX30")
{
$radio_2g = 1;
$radio_5g = 2;

$ssid_2g = $ap_2g = 1;
$guest_ssid_2g = $guest_ap_2g = 2;
$ssid_5g = $ap_5g= 3;
$guest_ssid_5g = $guest_ap_5g = 4;
}
else if ($board === "RAXE290" || $board === "RAXE300")
{
/*
 * For RAXE300 HW, the WiFi mapping will be
 * Radio.1 -> wl0 -> 5g
 * Radio.1 -> wl0.1 -> 5g guest
 * Radio.2 -> wl1 -> 2G
 * Radio.2 -> wl1.1 -> 2G guest
 * Radio.3 -> wl2 -> 6G
 * Radio.3 -> wl2.1 -> 6G guest
 */
$radio_2g=2;
$radio_5g=1;
$radio_5g1=0;
$radio_6g=3;

$ssid_2g  = $ap_2g  = 3;
$guest_ssid_2g  = $guest_ap_2g  = 4;
$ssid_5g  = $ap_5g  = 1;
$guest_ssid_5g  = $guest_ap_5g  = 2;
$ssid_5g1 = $ap_5g1 = 0;
$guest_ssid_5g1 = $guest_ap_5g1 = 0;
$ssid_6g  = $ap_6g  = 5;
$guest_ssid_6g  = $guest_ap_6g  = 6;
}
else
{
//PEGA_REX
$radio_5g1 = 1;
$radio_2g = 2;
$radio_5g = 3;

$ssid_5g1 = $ap_5g1 = 1;
$guest_ssid_5g1 = $guest_ap_5g1 = 2;
$ssid_2g = $ap_2g = 3;
$guest_ssid_2g = $guest_ap_2g = 4;
$ssid_5g = $ap_5g= 5;
$guest_ssid_5g = $guest_ap_5g = 6;
}

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
    global $radio_2g, $radio_5g, $radio_6g;
    global $ap_2g, $ap_5g, $ap_6g;
    global $ssid_2g, $ssid_5g, $ssid_6g;

    //[1] Display 'OFF', if all band (2G/5G/6G) are disabled.
    //[2] Display 'No Security', if radio is enabled but security is none in a band.
    //[3] Display SSID + Password of a band, if that band has enabled radio and security.
    $radio_2G_enable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? 1 : 0;
    $radio_5G_enable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? 1 : 0;
    $radio_6G_enable = db_get("Device.WiFi.Radio.{$radio_6g}.Enable") === "1" ? 1 : 0;
    $wifi_button_enable = db_get("Device.X_PEGATRON_COM_DeviceInfo.WifiBtnEnable") === "1" ? 1 : 0;
    $radio_2G_security = getWiFiSecurityMode($ap_2g) === "open" ? 0 : 1;
    $radio_5G_security = getWiFiSecurityMode($ap_5g) === "open" ? 0 : 1;
    $radio_6G_security = getWiFiSecurityMode($ap_6g) === "open" ? 0 : 1;

    if(!$radio_2G_enable && !$radio_5G_enable && !$radio_6G_enable)
    {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_90\">OFF</span></td></tr>";
    }
    else if ($wifi_button_enable  === 0) {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_90\">OFF</span></td></tr>";
    }
    else if(
             ($radio_2G_enable && !$radio_2G_security) ||
             ($radio_5G_enable && !$radio_5G_security) ||
             ($radio_6G_enable && !$radio_6G_security)
           )
    {
        return "<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_169\">No Security</span></td></tr>";
    }
    else if($radio_2G_enable && $radio_2G_security === 1)
    {
        $ssid_2g =  getWiFiSsidByInst($ssid_2g);
        $key_2g = getWiFiKeyByInst($ap_2g);
        return "<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$ssid_2g."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$key_2g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>";
    }
    else if($radio_5G_enable && $radio_5G_security === 1)
    {
        $ssid_5g =  getWiFiSsidByInst($ssid_5g);
        $key_5g = getWiFiKeyByInst($ap_5g);
        return "<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$ssid_5g."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$key_5g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>";
    }
    else //if($radio_6G_enable && $radio_6G_security === 1)
    {
        $ssid_6g =  getWiFiSsidByInst($ssid_6g);
        $key_6g = getWiFiKeyByInst($ap_6g);
        return "<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$ssid_6g."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   ".$key_6g."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>";
    }
}

function getBasicHomeWiFiGuest()
{
    global $radio_2g, $radio_5g, $radio_6g;
    global $guest_ap_2g, $guest_ap_5g, $guest_ap_6g;
    global $guest_ssid_2g, $guest_ssid_5g, $guest_ssid_6g;

    //[1] Display Not Enabled if both of 2.4GHz and 5GHz are disabled.
    //[2] Display 2.4GHz if it is not disabled.
    //[3] Display 5GHz if it is enabled and 2.4GHz is disabled.
    //[4] Display 6GHz if it is enabled and 2.4GHz/5GHz are disabled.
    $radio_2G_enable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? 1 : 0;
    $radio_5G_enable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? 1 : 0;
    $radio_6G_enable = db_get("Device.WiFi.Radio.{$radio_6g}.Enable") === "1" ? 1 : 0;
    $radio_guest_2G_enable = db_get("Device.WiFi.SSID.{$guest_ssid_2g}.Enable") === "1" ? 1 : 0;
    $radio_guest_5G_enable = db_get("Device.WiFi.SSID.{$guest_ssid_5g}.Enable") === "1" ? 1 : 0;
    $radio_guest_6G_enable = db_get("Device.WiFi.SSID.{$guest_ssid_6g}.Enable") === "1" ? 1 : 0;
    $radio_guest_2G_security = getWiFiSecurityMode($guest_ap_2g) === "open" ? 0 : 1;
    $radio_guest_5G_security = getWiFiSecurityMode($guest_ap_5g) === "open" ? 0 : 1;
    $radio_guest_6G_security = getWiFiSecurityMode($guest_ap_6g) === "open" ? 0 : 1;
    if(!($radio_guest_2G_enable && $radio_2G_enable) && !($radio_guest_5G_enable && $radio_5G_enable) && !($radio_guest_6G_enable && $radio_6G_enable))
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
    else if($radio_guest_5G_enable && $radio_5G_enable)
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
    else if($radio_guest_6G_enable && $radio_6G_enable)
    {
        $ssid_6g =  getWiFiSsidByInst($guest_ssid_6g);
        if ($radio_guest_6G_security === 0)
        {
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_6g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" mlang=\"SWS016\">None</span> <span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">".$key_6g."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>";
        }
        else
        {
            $key_6g = getWiFiKeyByInst($guest_ap_6g);
            return "<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">".$ssid_6g."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\">".$key_6g."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>";
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
