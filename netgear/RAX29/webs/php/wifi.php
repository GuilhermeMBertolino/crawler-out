<?
include_once 'common_utils.php';
/*
 * For RAX30 HW, the WiFi mapping will be
 * Radio.1 -> wl0 -> 2G
 * Radio.1 -> wl0.1 -> 2G guest
 * Radio.2 -> wl1 -> 5G
 * Radio.2 -> wl1.1 -> 5G guest
 * No Radio 3
 */
$radio_2g=1;
$radio_5g=2;
$radio_5g1=0;

$ssid_2g=1;
$guest_ssid_2g=2;
$ssid_5g=3;
$guest_ssid_5g=4;
$ssid_5g1=0;
$guest_ssid_5g1=0;

$ap_2g = 1;
$guest_ap_2g = 2;
$ap_5g = 3;
$guest_ap_5g = 4;
$ap_5g1 = 0;
$guest_ap_5g1 = 0;

/* Internal Common Functions Begin-------------------------------------> */
function parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm)
{
    $SecurityType = "";
    $radioVal = "";
    
    /* Mapping CMS values to security type value */
    if ($WpaEncryption == "tkip+aes" && $AuthMode == "open" && $AuthAkm == "open")
    {
        $SecurityType = "None";
    }
    else if ($WpaEncryption == "aes" && $AuthMode == "none" && $AuthAkm == "psk2")
    {
        $SecurityType = "WPA2-PSK";
    }
    else if ($WpaEncryption == "tkip+aes" && $AuthMode == "none" && $AuthAkm == "psk psk2")
    {
        $SecurityType = "WPA-AUTO-PSK";
    }
    else if ( ($WpaEncryption == "aes" && $AuthMode == "radius" && $AuthAkm == "wpa2") ||
              ($WpaEncryption == "tkip+aes" && $AuthMode == "radius" && $AuthAkm == "wpa wpa2"))
    {
        $SecurityType = "WPA-ENTERPRISE";
    }
    else if ($WpaEncryption == "aes" && $AuthMode == "none" && $AuthAkm == "sae")
    {
        $SecurityType = "WPA3-PSK";
    }
    else if ($WpaEncryption == "aes" && $AuthMode == "none" && $AuthAkm == "psk2 sae")
    {
        $SecurityType = "WPA2-WPA3";
    }
    
    /* Accroding to the security type value, select the related security radio element to be checked. */
    if ($SecurityType == "None")
    {
        $radioVal = 1;
    }
    else if ($SecurityType == "WPA2-PSK")
    {
        $radioVal = 2;
    }
    else if ($SecurityType == "WPA-AUTO-PSK")
    {
        $radioVal = 3;
    }
    else if ($SecurityType == "WPA-ENTERPRISE")
    {
        $radioVal = 4;
    }
    else if($SecurityType == "WPA3-PSK")
    {
        $radioVal = 5;
    }
    else if($SecurityType == "WPA2-WPA3")
    {
        $radioVal = 6;
    }
    
    return $radioVal;
}

function parse_EncryptMode($AuthAkm)
{
    $EncryptMode_Idx = "";
    
    if ($AuthAkm == "wpa2")
    {
        $EncryptMode_Idx = 0;
    }
    else if ($AuthAkm == "wpa wpa2")
    {
        $EncryptMode_Idx = 1;
    }
    else
    {
        $EncryptMode_Idx = 0;
    }
    
    return $EncryptMode_Idx;
}
/* Internal Common Functions <-------------------------------------End */

function getSelectVal_Country()
{
    global $radio_2g;

    $country = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlCountry");
 
    if ($country == "E0")
    {
        $country = "EU";
    }

    return $country;
}

function getSelectVal_CountryForAdv()
{
    global $radio_2g;

    $country = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlCountry");
    
    return getMlangIndexByRegion($country);
}

function getCheckboxVal_AxEnable()
{
    global $radio_2g;
    global $radio_5g;
    $WL_HE_FEATURES_2G = 0x0002;
    $WL_HE_FEATURES_5G = 0x0001;
    
    $he_feature_2g = intval(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlHeFeatures"));
    $he_feature_5g = intval(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlHeFeatures"));
    
    $ax_flag = $WL_HE_FEATURES_2G | $WL_HE_FEATURES_5G;
    
    if ( ($he_feature_2g & $ax_flag) ==  $ax_flag) {
        $ax_en_2g = true;
    }
    else {
        $ax_en_2g = false;
    }
    
    if ( ($he_feature_5g & $ax_flag) == $ax_flag) {
        $ax_en_5g = true;
    }
    else {
        $ax_en_5g = false;
    }
    
    if ($ax_en_2g == true && $ax_en_5g == true)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getCheckboxVal_2GOfdma()
{
    global $radio_2g;
    $WL_HE_FEATURES_5G = 0x0001;
    $WL_HE_FEATURES_2G = 0x0002;
    $WL_HE_FEATURES_DLOMU = 0x0004;
    $WL_HE_FEATURES_ULOMU = 0x0008;
    
    $he_feature_2g = intval(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlHeFeatures"));
    $ofdma_flag = $WL_HE_FEATURES_2G | $WL_HE_FEATURES_5G | $WL_HE_FEATURES_DLOMU | $WL_HE_FEATURES_ULOMU;
    
    if ( ($he_feature_2g & $ofdma_flag) ==  $ofdma_flag) {
        $ofdma_en = "true";
    }
    else {
        $ofdma_en = "false";
    }
    
    return $ofdma_en;
}

function getCheckboxVal_5GOfdma()
{
    global $radio_5g;
    $WL_HE_FEATURES_5G = 0x0001;
    $WL_HE_FEATURES_2G = 0x0002;
    $WL_HE_FEATURES_DLOMU = 0x0004;
    $WL_HE_FEATURES_ULOMU = 0x0008;
    
    $he_feature_5g = intval(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlHeFeatures"));
    $ofdma_flag = $WL_HE_FEATURES_2G | $WL_HE_FEATURES_5G | $WL_HE_FEATURES_DLOMU | $WL_HE_FEATURES_ULOMU;
    
    if ( ($he_feature_5g & $ofdma_flag) ==  $ofdma_flag) {
        $ofdma_en = "true";
    }
    else {
        $ofdma_en = "false";
    }
    
    return $ofdma_en;
}

function getCheckboxVal_smartConnect()
{
    $smartConnect_en = db_get("Device.X_PEGATRON_COM_DeviceInfo.WifiSmartConnect");
    
    return num_to_TrueFalseStr($smartConnect_en);
}

function getCheckboxVal_2gEnableGuest()
{
    global $guest_ssid_2g;

    $ssid_en = db_get("Device.WiFi.SSID.{$guest_ssid_2g}.Enable");

    return num_to_TrueFalseStr($ssid_en);
}

function getCheckboxVal_5gEnableGuest()
{
    global $guest_ssid_5g;

    $ssid_en = db_get("Device.WiFi.SSID.{$guest_ssid_5g}.Enable");

    return num_to_TrueFalseStr($ssid_en);
}

function getCheckboxVal_5g1EnableGuest()
{
    global $guest_ssid_5g1;

    $ssid_en = db_get("Device.WiFi.SSID.{$guest_ssid_5g1}.Enable");

    return num_to_TrueFalseStr($ssid_en);
}

function getCheckboxVal_2gSsidBroadcast()
{
    global $ap_2g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$ap_2g}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_5gSsidBroadcast()
{
    global $ap_5g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$ap_5g}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_5g1SsidBroadcast()
{
    global $ap_5g1;
    
    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_2gGuestSsidBroadcast()
{
    global $guest_ap_2g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_5gGuestSsidBroadcast()
{
    global $guest_ap_5g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_5g1GuestSsidBroadcast()
{
    global $guest_ap_5g1;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.SSIDAdvertisementEnabled");

    return num_to_TrueFalseStr($ssid_bc_en);
}

function getCheckboxVal_2GCoex()
{
    global $radio_2g;

    $coex = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlObssCoex");

    return num_to_TrueFalseStr($coex);
}

function getCheckboxVal_2gGuestAllowAccessLocal()
{
    global $guest_ap_2g;

    $iso_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.IsolationEnable");
    $allow_access = !($iso_en);

    return num_to_TrueFalseStr($allow_access);
}

function getCheckboxVal_5gGuestAllowAccessLocal()
{
    global $guest_ap_5g;

    $iso_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.IsolationEnable");
    $allow_access = !($iso_en);

    return num_to_TrueFalseStr($allow_access);
}

function getCheckboxVal_5g1GuestAllowAccessLocal()
{
    global $guest_ap_5g1;

    $iso_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.IsolationEnable");
    $allow_access = !($iso_en);

    return num_to_TrueFalseStr($allow_access);
}

function getTextVal_2gSsid()
{
    global $ssid_2g;

    $ssid = db_get("Device.WiFi.SSID.{$ssid_2g}.SSID");
    return htmlentities($ssid);
}

function getTextVal_5gSsid()
{
    global $ssid_5g;

    $ssid = db_get("Device.WiFi.SSID.{$ssid_5g}.SSID");
    return htmlentities($ssid);
}

function getTextVal_5g1Ssid()
{
    global $ssid_5g1;
    
    $ssid = db_get("Device.WiFi.SSID.{$ssid_5g1}.SSID");
    return htmlentities($ssid);
}

function getTextVal_2gGuestSsid()
{
    global $guest_ssid_2g;

    $ssid = db_get("Device.WiFi.SSID.{$guest_ssid_2g}.SSID");
    return htmlentities($ssid);
}

function getTextVal_5gGuestSsid()
{
    global $guest_ssid_5g;

    $ssid = db_get("Device.WiFi.SSID.{$guest_ssid_5g}.SSID");
    return htmlentities($ssid);
}

function getTextVal_5g1GuestSsid()
{
    global $guest_ssid_5g1;

    $ssid = db_get("Device.WiFi.SSID.{$guest_ssid_5g1}.SSID");
    return htmlentities($ssid);
}

function getSelectVal_2gChannel()
{
    global $radio_2g;

    $auto = db_get("Device.WiFi.Radio.{$radio_2g}.AutoChannelEnable");
    if ($auto == "1") {
        $channel = 0;
    }
    else {
        $channel = db_get("Device.WiFi.Radio.{$radio_2g}.Channel");
    }
    
    return $channel;
}

function getSelectVal_5gChannel()
{
/*
    global $radio_5g;

    $channel = db_get("Device.WiFi.Radio.{$radio_5g}.Channel");
    
    return $channel;
*/
    //RAXE300-217, diffrent channel with router status page (while DFS detect)
    $cmd_str= "wl -i wl1 channel | grep target | awk {'print $3'}";
    exec($cmd_str, $output, $ret);
    return $output[0];
}

function getSelectVal_5g1Channel()
{
    global $radio_5g1;
    $channel = db_get("Device.WiFi.Radio.{$radio_5g1}.Channel");
    
    return $channel;
}

function get_2gChannel_primary_secondary()
{
    global $radio_2g;
    $auto = db_get("Device.WiFi.Radio.{$radio_2g}.AutoChannelEnable");
    $chanspec_map = array(
    "1 (0x1001)" => "1", "2 (0x1002)" => "2", "3 (0x1003)" => "3",
    "4 (0x1004)" => "4", "5 (0x1005)" => "5", "6 (0x1006)" => "6",
    "7 (0x1007)" => "7", "8 (0x1008)" => "8", "9 (0x1009)" => "9",
    "10 (0x100a)" => "10",
    "11 (0x100b)" => "11",
    "12 (0x100c)" => "12",
    "13 (0x100d)" => "13",
    "1l (0x1803)" => "1(P) + 5(S)",
    "2l (0x1804)" => "2(P) + 6(S)",
    "3l (0x1805)" => "3(P) + 7(S)",
    "4l (0x1806)" => "4(P) + 8(S)",
    "5u (0x1903)" => "5(P) + 1(S)",
    "6u (0x1904)" => "6(P) + 2(S)",
    "7u (0x1905)" => "7(P) + 3(S)",
    "8u (0x1906)" => "8(P) + 4(S)",
    "5l (0x1807)" => "5(P) + 9(S)", 
    "6l (0x1808)" => "6(P) + 10(S)",
    "7l (0x1809)" => "7(P) + 11(S)",
    "8l (0x180a)" => "8(P) + 12(S)",
    "9u (0x1907)" => "9(P) + 5(S)",
    "10u (0x1908)" => "10(P) + 6(S)",
    "11u (0x1909)" => "11(P) + 7(S)",
    "12u (0x190a)" => "12(P) + 8(S)",
    "9l (0x180b)" => "9(P) + 13(S)",
    "13u (0x190b)" => "13(P) + 9(S)"
    );
    
    $cmd_str= "wl -i wl0 chanspec";
    exec($cmd_str, $output, $ret);
    
    if ($auto == "1") {
        $auto_str = sprintf("Auto( %s )",  $chanspec_map[$output[0]]);
        return $auto_str;
    }
    else {
        return $chanspec_map[$output[0]];
    }
    
}

function get_5gChannel_primary_secondary()
{
    $chanspec_map = array(
    "36 (0xd024)" => "36", "40 (0xd028)" => "40", "44 (0xd02c)" => "44",
    "48 (0xd030)" => "48", "52 (0xd034)" => "52", "56 (0xd038)" => "56",
    "60 (0xd03c)" => "60", "64 (0xd040)" => "64", "100 (0xd064)" => "100",
    "104 (0xd068)" => "104", "108 (0xd06c)" => "108", "112 (0xd070)" => "112",
    "116 (0xd074)" => "116", "120 (0xd078)" => "120", "124 (0xd07c)" => "124",
    "128 (0xd080)" => "128", "132 (0xd084)" => "132", "136 (0xd088)" => "136",
    "140 (0xd08c)" => "140", "144 (0xd090)" => "144", "149 (0xd095)" => "149",
    "153 (0xd099)" => "153", "157 (0xd09d)" => "157", "161 (0xd0a1)" => "161",
    "165 (0xd0a5)" => "165",
    "36l (0xd826)" => "36(P) + 40(S)",
    "40u (0xd926)" => "40(P) + 36(S)",
    "44l (0xd82e)" => "44(P) + 48(S)",
    "48u (0xd92e)" => "48(P) + 44(S)",
    "52l (0xd836)" => "52(P) + 56(S)",
    "56u (0xd936)" => "56(P) + 52(S)",
    "60l (0xd83e)" => "60(P) + 64(S)",
    "64u (0xd93e)" => "64(P) + 60(S)",
    "100l (0xd866)" => "100(P) + 104(S)",
    "104u (0xd966)" => "104(P) + 100(S)",
    "108l (0xd86e)" => "108(P) + 112(S)",
    "112u (0xd96e)" => "112(P) + 108(S)",
    "116l (0xd876)" => "116(P) + 120(S)",
    "120u (0xd976)" => "120(P) + 116(S)",
    "124l (0xd87e)" => "124(P) + 128(S)",
    "128u (0xd97e)" => "128(P) + 124(S)",
    "132l (0xd886)" => "132(P) + 136(S)",
    "136u (0xd986)" => "136(P) + 132(S)",
    "140l (0xd88e)" => "140(P) + 144(S)",
    "144u (0xd98e)" => "144(P) + 140(S)",
    "149l (0xd897)" => "149(P) + 153(S)",
    "153u (0xd997)" => "153(P) + 149(S)",
    "157l (0xd89f)" => "157(P) + 161(S)",
    "161u (0xd99f)" => "161(P) + 157(S)",
    "36/80 (0xe02a)" => "36(P) + 40 + 44 + 48",
    "40/80 (0xe12a)" => "36 + 40(P) + 44 + 48",
    "44/80 (0xe22a)" => "36 + 40 + 44(P) + 48",
    "48/80 (0xe32a)" => "36 + 40 + 44 + 48(P)",
    "52/80 (0xe03a)" => "52(P) + 56 + 60 + 64",
    "56/80 (0xe13a)" => "52 + 56(P) + 60 + 64",
    "60/80 (0xe23a)" => "52 + 56 + 60(P) + 64",
    "64/80 (0xe33a)" => "52 + 56 + 60 + 64(P)",
    "100/80 (0xe06a)" => "100(P) + 104 + 108 + 112",
    "104/80 (0xe16a)" => "100 + 104(P) + 108 + 112",
    "108/80 (0xe26a)" => "100 + 104 + 108(P) + 112",
    "112/80 (0xe36a)" => "100 + 104 + 108 + 112(P)",
    "116/80 (0xe07a)" => "116(P) + 120 + 124 + 128",
    "120/80 (0xe17a)" => "116 + 120(P) + 124 + 128",
    "124/80 (0xe27a)" => "116 + 120 + 124(P) + 128",
    "128/80 (0xe37a)" => "116 + 120 + 124 + 128(P)",
    "132/80 (0xe08a)" => "132(P) + 136 + 140 + 144",
    "136/80 (0xe18a)" => "132 + 136(P) + 140 + 144",
    "140/80 (0xe28a)" => "132 + 136 + 140(P) + 144",
    "144/80 (0xe38a)" => "132 + 136 + 140 + 144(P)",
    "149/80 (0xe09b)" => "149(P) + 153 + 157 + 161",
    "153/80 (0xe19b)" => "149 + 153(P) + 157 + 161",
    "157/80 (0xe29b)" => "149 + 153 + 157(P) + 161",
    "161/80 (0xe39b)" => "149 + 153 + 157 + 161(P)"
    );
    
    $cmd_str= "wl -i wl1 chanspec";
    exec($cmd_str, $output, $ret);
    return $chanspec_map[$output[0]];
}

function getSelectVal_2gMode()
{
    global $radio_2g;

    $ax_en = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_2g}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0) //wifi_mode == "b" || "g" || "n"
    {
        if ($g_mode == "1" && $n_mode == "off")
        {
            $wifi_mode = "g";
        }
        else if ($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "n";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* select an option */
        if ($wifi_mode == "g")
        {
            $opmode_val = 1;  //g mode = 54 Mbps
        }
        else if ($wifi_mode == "n")
        {
            if ($ch_width == "20MHz")
            {
                $opmode_val = 2; //n mode + 20MHz + 2 antenna = 145 Mbps (144.4 Mbps)
            }
            else if ($ch_width == "40MHz")
            {
                $opmode_val = 3; //n mode + 40MHz + 2 antenna = 300 Mbps
            }
        }
    }
    else   // ax_en == 31 == enabled, //wifi_mode == "ax"
    {
        /* select an option */
        if ($g_mode == "1" && $n_mode == "off") {
            $opmode_val = 1;  //g mode = 54 Mbps
        }
        else if ($ch_width == "20MHz")
        {
            $opmode_val = 2;  // ax mode + 20MHz + 2 antenna = 286 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = 3;  // ax mode + 40MHz + 2 antenna = 600 Mbps (573.6 Mbps)
        }
    }
    
    return $opmode_val;
}

function getSelectVal_2gModeForAdv()
{
    global $radio_2g;

    $ax_en = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_2g}.OperatingChannelBandwidth");
    $qam_256 = db_get("Device.X_PEGATRON_COM_DeviceInfo.Wifi2GAX256QAMOnly");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0) //wifi_mode == "b" || "g" || "n"
    {
        if ($g_mode == "1" && $n_mode == "off")
        {
            $wifi_mode = "g";
        }
        else if ($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "n";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* select an option */
        if ($wifi_mode == "g")
        {
            $opmode_val = "54";  //g mode = 54 Mbps
        }
        else if ($wifi_mode == "n")
        {
            if ($ch_width == "20MHz")
            {
                $opmode_val = "145"; //n mode + 20MHz + 2 antenna = 145 Mbps (144.4 Mbps)
            }
            else if ($ch_width == "40MHz")
            {
                $opmode_val = "300"; //n mode + 40MHz + 2 antenna = 300 Mbps
            }
        }
    }
    else   // ax_en == 31 == enabled, //wifi_mode == "ax"
    {
        /* select an option */
        if ($g_mode == "1" && $n_mode == "off")
        {
            $opmode_val = "54";  //g mode = 54 Mbps
        }
        else if ($ch_width == "20MHz")
        {
            if ($qam_256 == "1")
            {
                $opmode_val = "230";  // ax mode + 20MHz + 2 antenna + 256 QAM = 230 Mbps
            }
            else
            {
                $opmode_val = "286";  // ax mode + 20MHz + 2 antenna = 286 Mbps
            }
        }
        else if ($ch_width == "40MHz")
        {
            if ($qam_256 == "1")
            {
                $opmode_val = "460";  // ax mode + 40MHz + 2 antenna + 256 QAM = 460 Mbps
            }
            else
            {
                $opmode_val = "600";  // ax mode + 40MHz + 2 antenna = 600 Mbps (573.6 Mbps)
            }
        }
    }
    
    return $opmode_val;
}

function getSelectVal_5gMode()
{
    global $radio_5g;

    $ax_en = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_5g}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0)
    {
        if($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "ac";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* When "ax" mode is not enabled, 5G wifi would fall back only to "ac" mode.
           So will not have "n" mode or "a" mode data rate options in the select menu. */
        if ($wifi_mode != "ac")
        {
            return "";
        }
            
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = 1;  //ac mode + 20MHz + 3 antenna = 288 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = 2;  //ac mode + 40MHz + 3 antenna = 600 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = 3;  // ac mode + 80MHz + 3 antenna = 1300 Mbps
        }
    }
    else  //ax_en == 31 == enabled, wif_mode == "ax"
    {
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = 1;  // ax mode + 20MHz + 3 antenna = 430 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = 2;  // ax mode + 40MHz + 3 antenna = 860 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = 3;  // ax mode + 80MHz + 3 antenna = 1800 Mbps
        }
    }
    
    return $opmode_val;
}

function getSelectVal_5gModeForAdv()
{
    global $radio_5g;

    $ax_en = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_5g}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0)
    {
        if($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "ac";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* When "ax" mode is not enabled, 5G wifi would fall back only to "ac" mode.
           So will not have "n" mode or "a" mode data rate options in the select menu. */
        if ($wifi_mode != "ac")
        {
            return "";
        }
            
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = "288";  //ac mode + 20MHz + 3 antenna = 288 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "600";  //ac mode + 40MHz + 3 antenna = 600 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = "1300";  // ac mode + 80MHz + 3 antenna = 1300 Mbps
        }
    }
    else  //ax_en == 31 == enabled, wif_mode == "ax"
    {
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = "430";  // ax mode + 20MHz + 3 antenna = 430 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "860";  // ax mode + 40MHz + 3 antenna = 860 Mbps (573.6 Mbps)
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = "1800";  // ax mode + 80MHz + 3 antenna = 1800 Mbps
        }
    }
    
    return $opmode_val;
}

function getSelectVal_5g1Mode()
{
    global $radio_5g1;
    
    $ax_en = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_5g1}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0)
    {
        if($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "ac";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* When "ax" mode is not enabled, 5G wifi would fall back only to "ac" mode.
           So will not have "n" mode or "a" mode data rate options in the select menu. */
        if ($wifi_mode != "ac")
        {
            return "";
        }
            
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = 1;  //ac mode + 20MHz + 4 antenna = 346 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = 2;  //ac mode + 40MHz + 4 antenna = 800 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = 3;  // ac mode + 80MHz + 4 antenna = 1733 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = 4;  // ac mode + 160MHz + 4 antenna = 3466 Mbps
        }
    }
    else  //ax_en == 31 == enabled, wif_mode == "ax"
    {
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = 1;  // ax mode + 20MHz + 4 antenna = 573 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = 2;  // ax mode + 40MHz + 4 antenna = 1147 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = 3;  // ax mode + 80MHz + 2 antenna = 2402 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = 4;  // ax mode + 160MHz + 4 antenna = 4804 Mbps
        }
    }
    
    return $opmode_val;
}

function getSelectVal_5g1ModeForAdv()
{
    global $radio_5g1;
    
    $ax_en = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlHeFeatures");
    $g_mode = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlgMode");
    $n_mode = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlNmode");
    $ch_width = db_get("Device.WiFi.Radio.{$radio_5g1}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;
        
    if ($ax_en == 0)
    {
        if($g_mode == "0" && $n_mode == "auto")
        {
            $wifi_mode = "ac";
        }
        else
        {
            $wifi_mode = "";
        }
            
        /* When "ax" mode is not enabled, 5G wifi would fall back only to "ac" mode.
           So will not have "n" mode or "a" mode data rate options in the select menu. */
        if ($wifi_mode != "ac")
        {
            return "";
        }
            
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = "346";  //ac mode + 20MHz + 4 antenna = 346 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "800";  //ac mode + 40MHz + 4 antenna = 800 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = "1733";  // ac mode + 80MHz + 4 antenna = 1733 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = "3466";  // ac mode + 160MHz + 4 antenna = 3466 Mbps
        }
    }
    else  //ax_en == 31 == enabled, wif_mode == "ax"
    {
        /* select an option */
        if ($ch_width == "20MHz")
        {
            $opmode_val = "573";  // ax mode + 20MHz + 4 antenna = 573 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "1147";  // ax mode + 40MHz + 4 antenna = 1147 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = "2402";  // ax mode + 80MHz + 2 antenna = 2402 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = "4804";  // ax mode + 160MHz + 4 antenna = 4804 Mbps
        }
    }
    
    return $opmode_val;
}

function getSelectVal_2gTxPower()
{
    global $radio_2g;

    $tx_pwr = db_get("Device.WiFi.Radio.{$radio_2g}.TransmitPower");

    if ($tx_pwr == "70")
    {
        $tx_pwr = "75";
    }
    else if ($tx_pwr == "50")
    {
        $tx_pwr = "50";
    }
    else if ($tx_pwr == "30")
    {
        $tx_pwr = "25";
    }
    
    return $tx_pwr;
}

function getSelectVal_5gTxPower()
{
    global $radio_5g;

    $tx_pwr = db_get("Device.WiFi.Radio.{$radio_5g}.TransmitPower");

    if ($tx_pwr == "70")
    {
        $tx_pwr = "75";
    }
    else if ($tx_pwr == "50")
    {
        $tx_pwr = "50";
    }
    else if ($tx_pwr == "30")
    {
        $tx_pwr = "25";
    }

    return $tx_pwr;
}

function getSelectVal_5g1TxPower()
{
    global $radio_5g1;

    $tx_pwr = db_get("Device.WiFi.Radio.{$radio_5g1}.TransmitPower");
    
    return $tx_pwr;
}

function getRadioVal_2gSecurity()
{
    global $ap_2g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getRadioVal_5gSecurity()
{
    global $ap_5g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getRadioVal_5g1Security()
{
    global $ap_5g1;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getRadioVal_2gGuestSecurity()
{
    global $guest_ap_2g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getRadioVal_5gGuestSecurity()
{
    global $guest_ap_5g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getRadioVal_5g1GuestSecurity()
{
    global $guest_ap_5g1;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.Security.WlAuthAkm");
    
    /* Mapping CMS values to security type value */
    $radioVal = parse_SecurityType($WpaEncryption, $AuthMode, $AuthAkm);
    
    return $radioVal;
}

function getTextVal_2gPasswd()
{
    global $ap_2g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.KeyPassphrase");
    return $passwd;
}

function getTextVal_2gGuestPasswd()
{
    global $guest_ap_2g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$guest_ap_2g}.Security.KeyPassphrase");
    return $passwd;
}

function getTextVal_5gPasswd()
{
    global $ap_5g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.KeyPassphrase");
    return $passwd;
}

function getTextVal_5g1Passwd()
{
    global $ap_5g1;

    $passwd = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.KeyPassphrase");
    return $passwd;
}

function getTextVal_5gGuestPasswd()
{
    global $guest_ap_5g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g}.Security.KeyPassphrase");
    return $passwd;
}

function getTextVal_5g1GuestPasswd()
{
    global $guest_ap_5g1;

    $passwd = db_get("Device.WiFi.AccessPoint.{$guest_ap_5g1}.Security.KeyPassphrase");
    return $passwd;
}

function getSelectVal_2gEncryptMode()
{
    global $ap_2g;

    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.WlAuthAkm");
    $EncryptMode_Idx = parse_EncryptMode($AuthAkm);
    
    return $EncryptMode_Idx;
}

function getSelectVal_5gEncryptMode()
{
    global $ap_5g;

    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.WlAuthAkm");
    $EncryptMode_Idx = parse_EncryptMode($AuthAkm);
    
    return $EncryptMode_Idx;
}

function getSelectVal_5g1EncryptMode()
{
    global $ap_5g1;

    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.WlAuthAkm");
    $EncryptMode_Idx = parse_EncryptMode($AuthAkm);
    
    return $EncryptMode_Idx;
}

function getIpVal_2gRadiusIP()
{   
    global $ap_2g;

    $radius_ip = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.RadiusServerIPAddr");
    return $radius_ip;
}

function getIpVal_5gRadiusIP()
{   
    global $ap_5g;

    $radius_ip = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.RadiusServerIPAddr");
    return $radius_ip;
}

function getIpVal_5g1RadiusIP()
{   
    global $ap_5g1;

    $radius_ip = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.RadiusServerIPAddr");
    return $radius_ip;
}

function getTextVal_2gRadiusPort()
{
    global $ap_2g;

    $radius_port = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.RadiusServerPort");
    return $radius_port;
}

function getTextVal_5gRadiusPort()
{
    global $ap_5g;

    $radius_port = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.RadiusServerPort");
    return $radius_port;
}

function getTextVal_5g1RadiusPort()
{
    global $ap_5g1;

    $radius_port = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.RadiusServerPort");
    return $radius_port;
}

function getTextVal_2gRadiusSecret()
{
    global $ap_2g;

    $radius_secret = db_get("Device.WiFi.AccessPoint.{$ap_2g}.Security.RadiusSecret");
    return $radius_secret;
}

function getTextVal_5gRadiusSecret()
{
    global $ap_5g;

    $radius_secret_5g = db_get("Device.WiFi.AccessPoint.{$ap_5g}.Security.RadiusSecret");
    return $radius_secret_5g;
}

function getTextVal_5g1RadiusSecret()
{
    global $ap_5g1;

    $radius_secret_5g = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.Security.RadiusSecret");
    return $radius_secret_5g;
}

/* Advanced section Begin-------------------------------------> */
function getCheckboxVal_2GRadioOn()
{
    global $radio_2g;
    
    $radio_en = db_get("Device.WiFi.Radio.{$radio_2g}.Enable");

    return num_to_TrueFalseStr($radio_en);
}

function getCheckboxVal_5GRadioOn()
{
    global $radio_5g;
    
    $radio_en = db_get("Device.WiFi.Radio.{$radio_5g}.Enable");

    return num_to_TrueFalseStr($radio_en);
}

function getCheckboxVal_5G1RadioOn()
{
    global $radio_5g1;
    
    $radio_en = db_get("Device.WiFi.Radio.{$radio_5g1}.Enable");

    return num_to_TrueFalseStr($radio_en);
}

function getTextVal_2GCtsRts()
{
    global $radio_2g;
    return db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlRtsThrshld");
}

function getTextVal_5GCtsRts()
{
    global $radio_5g;
    return db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlRtsThrshld");
}

function getSelectVal_2GPreamble()
{
    global $radio_2g;
    
    $preambleType = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlPreambleType");
    
    if ($preambleType == "long") 
    {
        return "0";
    }
    else if ($preambleType == "short")
    {
        return "1";
    }
    else
    {
        return "";
    }
}

function getSelectVal_5GPreamble()
{
    global $radio_5g;
    
    $preambleType = db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlPreambleType");
    
    if ($preambleType == "long") 
    {
        return "0";
    }
    else if ($preambleType == "short")
    {
        return "1";
    }
    else
    {
        return "";
    }
}

function getSelectVal_5G1Preamble()
{
    global $radio_5g1;
    
    $preambleType = db_get("Device.WiFi.Radio.{$radio_5g1}.X_BROADCOM_COM_WlPreambleType");
    
    if ($preambleType == "long") 
    {
        return "0";
    }
    else if ($preambleType == "short")
    {
        return "1";
    }
    else
    {
        return "";
    }
}

function getCheckboxVal_2GWifiSchedule()
{
    $WifiSchedule_en = db_get("Device.X_PEGATRON_COM_WifiScheduleEnable.Enable_2G");

    return num_to_TrueFalseStr($WifiSchedule_en);
}

function getCheckboxVal_5GWifiSchedule()
{
    $WifiSchedule_en = db_get("Device.X_PEGATRON_COM_WifiScheduleEnable.Enable_5G");

    return num_to_TrueFalseStr($WifiSchedule_en);
}

function getCheckboxVal_5G1WifiSchedule()
{
    $WifiSchedule_en = db_get("Device.X_PEGATRON_COM_WifiScheduleEnable.Enable_5GH");

    return num_to_TrueFalseStr($WifiSchedule_en);
}

function getTextVal_2gGroupKey()
{
    global $radio_2g;

    $net_reauth = db_get("Device.WiFi.AccessPoint.{$radio_2g}.Security.X_BROADCOM_COM_WlNetReauth");
    if ($net_reauth > 3600) {
	return "3600";
    }
    else {
	return $net_reauth;
    }
}

function getTextVal_5gGroupKey()
{
    global $radio_5g;

    $net_reauth = db_get("Device.WiFi.AccessPoint.{$radio_5g}.Security.X_BROADCOM_COM_WlNetReauth");
    if ($net_reauth > 3600) {
	return "3600";
    }
    else {
	return $net_reauth;
    }
}

function getCheckboxVal_wpsPinEnabled()
{
    $pin_allow = db_get("Device.WiFi.X_BROADCOM_COM_WpsCfg.WpsWerMode");
    
    if ($pin_allow == "allow")
    {
        return "true";
    }
    else if ($pin_allow == "deny")
    {
        return "false";
    }
    else
    {
        return "";
    }
}

function getCheckboxVal_wpsAutoDisablePin()
{
    $wpsAuto_disable = db_get("Device.WiFi.X_BROADCOM_COM_WpsCfg.WpsAutoDisablePin");
    
    return num_to_TrueFalseStr($wpsAuto_disable);
}

function getTextVal_wpsNumOfFailedPin()
{
    $num = db_get("Device.WiFi.X_BROADCOM_COM_WpsCfg.WpsNumOfFailedPin");
    return $num;
}

function getCheckboxVal_wpsKeepSetting2G()
{
    global $ap_2g;
    
    $keepSetting_en = db_get("Device.WiFi.AccessPoint.{$ap_2g}.WPS.X_BROADCOM_COM_Wsc_config_state");
    
    return num_to_TrueFalseStr($keepSetting_en);
}

function getCheckboxVal_wpsKeepSetting5G()
{
    global $ap_5g;
    
    $keepSetting_en = db_get("Device.WiFi.AccessPoint.{$ap_5g}.WPS.X_BROADCOM_COM_Wsc_config_state");
    
    return num_to_TrueFalseStr($keepSetting_en);
}

function getCheckboxVal_wpsKeepSetting5G1()
{
    global $ap_5g1;
    
    $keepSetting_en = db_get("Device.WiFi.AccessPoint.{$ap_5g1}.WPS.X_BROADCOM_COM_Wsc_config_state");
    
    return num_to_TrueFalseStr($keepSetting_en);
}

function getCheckboxVal_enableBeamforming()
{
    global $radio_2g;
    global $radio_5g;
    
    $beamforming_en_2g = intval(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlTxbfImp"));
    $beamforming_en_5g = intval(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlTxbfImp"));
    
    if ($beamforming_en_2g != 0 && $beamforming_en_5g != 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getCheckboxVal_enableMuMimo()
{
    global $radio_2g;
    global $radio_5g;
    
    $mu_mimo_2g = hexdec(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlMuFeatures"));
    $mu_mimo_5g = hexdec(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlMuFeatures"));
    
    if ($mu_mimo_2g != 0 && $mu_mimo_5g != 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getCheckboxVal_disablePMF()
{
    global $radio_2g;

    $mfp_2g = db_get("Device.WiFi.AccessPoint.{$radio_2g}.Security.X_BROADCOM_COM_WlMFP");

    if ($mfp_2g == 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getwpsStatus()//todo
{
    //return db_get("Device.WiFi.X_BROADCOM_COM_WpsCfg.WpsProcStatus);
    $cmd_str= "nvram get wps_proc_status";
    $res = exec($cmd_str);

    return $res;
}

function getWps2GEnabled()
{
    global $ap_2g;

    return db_get("Device.WiFi.AccessPoint.{$ap_2g}.WPS.Enable");
}

function getWps5GEnabled()
{
    global $ap_5g;

    return db_get("Device.WiFi.AccessPoint.{$ap_5g}.WPS.Enable");
}
/* Advanced section <-------------------------------------End */

function getSku()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.SKU");
}

function getRegionNo()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.Region");
}

function getEnableAX256QAM()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.Wifi2GAX256QAMOnly");
}

function getWpsConnectedClientMac()
{
    $cmd_str= "nvram get wps_client_mac";
    $res = exec($cmd_str);
    return strtoupper($res);
}

?>

