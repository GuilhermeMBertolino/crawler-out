<?
include_once 'common_utils.php';
include_once 'commonCfg.php';
if ($board === "RAX30")
{
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

$ssid_2g = $ap_2g = 1;
$guest_ssid_2g = $guest_ap_2g = 2;
$ssid_5g = $ap_5g= 3;
$guest_ssid_5g = $guest_ap_5g = 4;
$ssid_5g1 = $ap_5g1 = 0;
$ssid_5g1 = $guest_ap_5g1 = 0;
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
$radio_2g  = 2;
$radio_5g  = 1;
$radio_5g1 = 0;
$radio_6g  = 3;

/* for geting bridge wireless status */
$radio_2g_hw  = 1;
$radio_5g_hw  = 0;
$radio_6g_hw  = 2;

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
    else if ($WpaEncryption == "aes" && $AuthMode == "open" && $AuthAkm == "owe")
    {
        $SecurityType = "ENHANCED-OPEN";
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
    else if($SecurityType == "ENHANCED-OPEN")
    {
        $radioVal = 7;
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
    $sku = db_get("Device.X_PEGATRON_COM_DeviceInfo.SKU");

    if ($country == "DE")
    {
        if ($sku == "AP")
        {
            $country = "AP";
        }
        else
        {
            $country = "EU";
        }
    }

    return $country;
}

function getSelectVal_CountryForAdv()
{
    global $radio_2g;

    $country = db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlCountry");
    
    if ($country == "DE")
    {
        $country = "EU";
    }

    return getMlangIndexByRegion($country);
}

function getCheckboxVal_AxEnable()
{
    global $radio_2g;
    global $radio_5g;
    global $radio_6g;
    $WL_HE_FEATURES_2G = 0x0002;
    $WL_HE_FEATURES_5G = 0x0001;
    
    $he_feature_2g = intval(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlHeFeatures"));
    $he_feature_5g = intval(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlHeFeatures"));
    $he_feature_6g = intval(db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlHeFeatures"));
    
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

    if ( ($he_feature_6g & $ax_flag) == $ax_flag) {
        $ax_en_6g = true;
    }
    else {
        $ax_en_6g = false;
    }

    if ($ax_en_2g == true && $ax_en_5g == true && $ax_en_6g == true)
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

function getCheckboxVal_6gOfdma()
{
    global $radio_6g;
    $WL_HE_FEATURES_5G = 0x0001;
    $WL_HE_FEATURES_2G = 0x0002;
    $WL_HE_FEATURES_DLOMU = 0x0004;
    $WL_HE_FEATURES_ULOMU = 0x0008;
    
    $he_feature_6g = intval(db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlHeFeatures"));
    $ofdma_flag = $WL_HE_FEATURES_2G | $WL_HE_FEATURES_5G | $WL_HE_FEATURES_DLOMU | $WL_HE_FEATURES_ULOMU;
    
    if ( ($he_feature_6g & $ofdma_flag) ==  $ofdma_flag) {
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

function getCheckboxVal_6gEnableGuest()
{
    global $guest_ssid_6g;

    $ssid_en = db_get("Device.WiFi.SSID.{$guest_ssid_6g}.Enable");

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

function getCheckboxVal_6gSsidBroadcast()
{
    global $ap_6g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$ap_6g}.SSIDAdvertisementEnabled");

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

function getCheckboxVal_6gGuestSsidBroadcast()
{
    global $guest_ap_6g;

    $ssid_bc_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.SSIDAdvertisementEnabled");

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

function getCheckboxVal_6gGuestAllowAccessLocal()
{
    global $guest_ap_6g;

    $iso_en = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.IsolationEnable");
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

function getTextVal_6gSsid()
{
    global $ssid_6g;

    $ssid = db_get("Device.WiFi.SSID.{$ssid_6g}.SSID");
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

function getTextVal_6gGuestSsid()
{
    global $guest_ssid_6g;

    $ssid = db_get("Device.WiFi.SSID.{$guest_ssid_6g}.SSID");
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
    $cmd_str= "wl -i wl0 channel | grep target | awk {'print $3'}";
    exec($cmd_str, $output, $ret);
    return $output[0];
}

function getSelectVal_5g1Channel()
{
    global $radio_5g1;
    $channel = db_get("Device.WiFi.Radio.{$radio_5g1}.Channel");
    
    return $channel;
}

function getSelectVal_6gChannel()
{
    global $radio_6g;

    $channel = db_get("Device.WiFi.Radio.{$radio_6g}.Channel");
    
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
    "9l (0x180b)"  => "9(P) + 13(S)",
    "13u (0x190b)" => "13(P) + 9(S)"
    );
    
    $cmd_str= "wl -i wl1 chanspec";
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
    "161/80 (0xe39b)" => "149 + 153 + 157 + 161(P)",
    "36/160 (0xe832)" => "36(P) + 40 + 44 + 48 + 52 + 56 + 60 + 64",
    "40/160 (0xe932)" => "36 + 40(P) + 44 + 48 + 52 + 56 + 60 + 64",
    "44/160 (0xea32)" => "36 + 40 + 44(P) + 48 + 52 + 56 + 60 + 64",
    "48/160 (0xeb32)" => "36 + 40 + 44 + 48(P) + 52 + 56 + 60 + 64",
    "52/160 (0xec32)" => "36 + 40 + 44 + 48 + 52(P) + 56 + 60 + 64",
    "56/160 (0xed32)" => "36 + 40 + 44 + 48 + 52 + 56(P) + 60 + 64",
    "60/160 (0xee32)" => "36 + 40 + 44 + 48 + 52 + 56 + 60(P) + 64",
    "64/160 (0xef32)" => "36 + 40 + 44 + 48 + 52 + 56 + 60 + 64(P)",
    "100/160 (0xe872)" => "100(P) + 104 + 108 + 112 + 116 + 120 + 124 + 128",
    "104/160 (0xe972)" => "100 + 104(P) + 108 + 112 + 116 + 120 + 124 + 128",
    "108/160 (0xea72)" => "100 + 104 + 108(P) + 112 + 116 + 120 + 124 + 128",
    "112/160 (0xeb72)" => "100 + 104 + 108 + 112(P) + 116 + 120 + 124 + 128",
    "116/160 (0xec72)" => "100 + 104 + 108 + 112 + 116(P) + 120 + 124 + 128",
    "120/160 (0xed72)" => "100 + 104 + 108 + 112 + 116 + 120(P) + 124 + 128",
    "124/160 (0xee72)" => "100 + 104 + 108 + 112 + 116 + 120 + 124(P) + 128",
    "128/160 (0xef72)" => "100 + 104 + 108 + 112 + 116 + 120 + 124 + 128(P)",
    );
    
    $cmd_str= "wl -i wl0 chanspec";
    exec($cmd_str, $output, $ret);
    return $chanspec_map[$output[0]];
}

function get_6gChannel_primary_secondary()
{
    $chanspec_map = array(
    "6g1 (0x5001)"       => "1",
    "6g5 (0x5005)"       => "5",
    "6g9 (0x5009)"       => "9",
    "6g13 (0x500d)"      => "13",
    "6g17 (0x5011)"      => "17",
    "6g21 (0x5015)"      => "21",
    "6g25 (0x5019)"      => "25",
    "6g29 (0x501d)"      => "29",
    "6g33 (0x5021)"      => "33",
    "6g37 (0x5025)"      => "37",
    "6g41 (0x5029)"      => "41",
    "6g45 (0x502d)"      => "45",
    "6g49 (0x5031)"      => "49",
    "6g53 (0x5035)"      => "53",
    "6g57 (0x5039)"      => "57",
    "6g61 (0x503d)"      => "61",
    "6g65 (0x5041)"      => "65",
    "6g69 (0x5045)"      => "69",
    "6g73 (0x5049)"      => "73",
    "6g77 (0x504d)"      => "77",
    "6g81 (0x5051)"      => "81",
    "6g85 (0x5055)"      => "85",
    "6g89 (0x5059)"      => "89",
    "6g93 (0x505d)"      => "93",
    "6g97 (0x5061)"      => "97",
    "6g101 (0x5065)"     => "101",
    "6g105 (0x5069)"     => "105",
    "6g109 (0x506d)"     => "109",
    "6g113 (0x5071)"     => "113",
    "6g117 (0x5075)"     => "117",
    "6g121 (0x5079)"     => "121",
    "6g125 (0x507d)"     => "125",
    "6g129 (0x5081)"     => "129",
    "6g133 (0x5085)"     => "133",
    "6g137 (0x5089)"     => "137",
    "6g141 (0x508d)"     => "141",
    "6g145 (0x5091)"     => "145",
    "6g149 (0x5095)"     => "149",
    "6g153 (0x5099)"     => "149",
    "6g157 (0x509d)"     => "149",
    "6g161 (0x50a1)"     => "149",
    "6g165 (0x50a5)"     => "165",
    "6g169 (0x50a9)"     => "169",
    "6g173 (0x50ad)"     => "173",
    "6g177 (0x50b1)"     => "177",
    "6g181 (0x50b5)"     => "181",
    "6g185 (0x50b9)"     => "185",
    "6g189 (0x50bd)"     => "189",
    "6g193 (0x50c1)"     => "193",
    "6g197 (0x50c5)"     => "197",
    "6g201 (0x50c9)"     => "201",
    "6g205 (0x50cd)"     => "205",
    "6g209 (0x50d1)"     => "209",
    "6g213 (0x50d5)"     => "213",
    "6g217 (0x50d9)"     => "217",
    "6g221 (0x50dd)"     => "221",
    "6g225 (0x50e1)"     => "225",
    "6g229 (0x50e5)"     => "229",
    "6g233 (0x50e9)"     => "233",
    "6g1/40 (0x5803)"    => "1(P) + 5(S)",
    "6g5/40 (0x5903)"    => "5(P) + 1(S)",
    "6g9/40 (0x580b)"    => "9(P) + 13(S)",
    "6g13/40 (0x590b)"   => "13(P) + 9(S)",
    "6g17/40 (0x5813)"   => "17(P) + 21(S)",
    "6g21/40 (0x5913)"   => "21(P) + 17(S)",
    "6g25/40 (0x581b)"   => "25(P) + 29(S)",
    "6g29/40 (0x591b)"   => "29(P) + 25(S)",
    "6g33/40 (0x5823)"   => "33(P) + 37(S)",
    "6g37/40 (0x5923)"   => "37(P) + 33(S)",
    "6g41/40 (0x582b)"   => "41(P) + 43(S)",
    "6g45/40 (0x592b)"   => "43(P) + 41(S)",
    "6g49/40 (0x5833)"   => "49(P) + 53(S)",
    "6g53/40 (0x5933)"   => "53(P) + 49(S)",
    "6g57/40 (0x583b)"   => "57(P) + 61(S)",
    "6g61/40 (0x593b)"   => "61(P) + 57(S)",
    "6g65/40 (0x5843)"   => "65(P) + 69(S)",
    "6g69/40 (0x5943)"   => "69(P) + 65(S)",
    "6g73/40 (0x584b)"   => "73(P) + 77(S)",
    "6g77/40 (0x594b)"   => "77(P) + 73(S)",
    "6g81/40 (0x5853)"   => "81(P) + 85(S)",
    "6g85/40 (0x5953)"   => "85(P) + 81(S)",
    "6g89/40 (0x585b)"   => "89(P) + 93(S)",
    "6g93/40 (0x595b)"   => "93(P) + 89(S)",
    "6g97/40 (0x5863)"   => "97(P) + 101(S)",
    "6g101/40 (0x5963)"  => "101(P) + 97(S)",
    "6g105/40 (0x586b)"  => "105(P) + 109(S)",
    "6g109/40 (0x596b)"  => "109(P) + 105(S)",
    "6g113/40 (0x5873)"  => "113(P) + 117(S)",
    "6g117/40 (0x5973)"  => "117(P) + 113(S)",
    "6g121/40 (0x587b)"  => "121(P) + 125(S)",
    "6g125/40 (0x597b)"  => "125(P) + 121(S)",
    "6g129/40 (0x5883)"  => "129(P) + 133(S)",
    "6g133/40 (0x5983)"  => "133(P) + 129(S)",
    "6g137/40 (0x588b)"  => "137(P) + 141(S)",
    "6g141/40 (0x598b)"  => "141(P) + 137(S)",
    "6g145/40 (0x5893)"  => "145(P) + 149(S)",
    "6g149/40 (0x5993)"  => "149(P) + 145(S)",
    "6g153/40 (0x589b)"  => "153(P) + 157(S)",
    "6g157/40 (0x599b)"  => "157(P) + 153(S)",
    "6g161/40 (0x58a3)"  => "161(P) + 165(S)",
    "6g165/40 (0x59a3)"  => "165(P) + 161(S)",
    "6g169/40 (0x58ab)"  => "169(P) + 173(S)",
    "6g173/40 (0x59ab)"  => "173(P) + 169(S)",
    "6g177/40 (0x58b3)"  => "177(P) + 181(S)",
    "6g181/40 (0x59b3)"  => "181(P) + 177(S)",
    "6g185/40 (0x58bb)"  => "185(P) + 189(S)",
    "6g189/40 (0x59bb)"  => "189(P) + 185(S)",
    "6g193/40 (0x58c3)"  => "193(P) + 197(S)",
    "6g197/40 (0x59c3)"  => "197(P) + 193(S)",
    "6g201/40 (0x58cb)"  => "201(P) + 205(S)",
    "6g205/40 (0x59cb)"  => "205(P) + 201(S)",
    "6g209/40 (0x58d3)"  => "209(P) + 213(S)",
    "6g213/40 (0x59d3)"  => "213(P) + 209(S)",
    "6g217/40 (0x58db)"  => "217(P) + 221(S)",
    "6g221/40 (0x59db)"  => "221(P) + 217(S)",
    "6g225/40 (0x58e3)"  => "225(P) + 229(S)",
    "6g229/40 (0x59e3)"  => "229(P) + 225(S)",
    "6g1/80 (0x6007)"    => "1(P) + 5 + 9 + 13",
    "6g5/80 (0x6107)"    => "1 + 5(P) + 9 + 13",
    "6g9/80 (0x6207)"    => "1 + 5 + 9(P) + 13",
    "6g13/80 (0x6307)"    => "1 + 5 + 9 + 13(P)",
    "6g17/80 (0x6017)"   => "17(P) + 21 + 25 + 29",
    "6g21/80 (0x6117)"   => "17 + 21(P) + 25 + 29",
    "6g25/80 (0x6217)"   => "17 + 21 + 25(P) + 29",
    "6g29/80 (0x6317)"   => "17 + 21 + 25 + 29(P)",
    "6g33/80 (0x6027)"   => "33(P) + 37 + 41 + 45",
    "6g37/80 (0x6127)"   => "33 + 37(P) + 41 + 45",
    "6g41/80 (0x6227)"   => "33 + 37 + 41(P) + 45",
    "6g45/80 (0x6327)"   => "33 + 37 + 41 + 45(P)",
    "6g49/80 (0x6037)"   => "49(P) + 53 + 57 + 61",
    "6g53/80 (0x6137)"   => "49 + 53(P) + 57 + 61",
    "6g57/80 (0x6237)"   => "49 + 53 + 57(P) + 61",
    "6g61/80 (0x6337)"   => "49 + 53 + 57 + 61(P)",
    "6g65/80 (0x6047)"   => "65(P) + 69 + 73 + 77",
    "6g69/80 (0x6147)"   => "65 + 69(P) + 73 + 77",
    "6g73/80 (0x6247)"   => "65 + 69 + 73(P) + 77",
    "6g77/80 (0x6347)"   => "65 + 69 + 73 + 77(P)",
    "6g81/80 (0x6057)"   => "81(P) + 85 + 89 + 93",
    "6g85/80 (0x6157)"   => "81 + 85(P) + 89 + 93",
    "6g89/80 (0x6257)"   => "81 + 85 + 89(P) + 93",
    "6g93/80 (0x6357)"   => "81 + 85 + 89 + 93(P)",
    "6g97/80 (0x6067)"   => "97(P) + 101 + 105 + 109",
    "6g101/80 (0x6167)"  => "97 + 101(P) + 105 + 109",
    "6g105/80 (0x6267)"  => "97 + 101 + 105(P) + 109",
    "6g109/80 (0x6367)"  => "97 + 101 + 105 + 109(P)",
    "6g113/80 (0x6077)"  => "113(P) + 117 + 121 + 125",
    "6g117/80 (0x6177)"  => "113 + 117(P) + 121 + 125",
    "6g121/80 (0x6277)"  => "113 + 117 + 121(P) + 125",
    "6g125/80 (0x6377)"  => "113 + 117 + 121 + 125(P)",
    "6g129/80 (0x6087)"  => "129(P) + 133 + 137 + 141",
    "6g133/80 (0x6187)"  => "129 + 133(P) + 137 + 141",
    "6g137/80 (0x6287)"  => "129 + 133 + 137(P) + 141",
    "6g141/80 (0x6387)"  => "129 + 133 + 137 + 141(P)",
    "6g145/80 (0x6097)"  => "145(P) + 149 + 153 + 157",
    "6g149/80 (0x6197)"  => "145 + 149(P) + 153 + 157",
    "6g153/80 (0x6297)"  => "145 + 149 + 153(P) + 157",
    "6g157/80 (0x6397)"  => "145 + 149 + 153 + 157(P)",
    "6g161/80 (0x60a7)"  => "161(P) + 165 + 169 + 173",
    "6g165/80 (0x61a7)"  => "161 + 165(P) + 169 + 173",
    "6g169/80 (0x62a7"  => "161 + 165 + 169(P) + 173",
    "6g173/80 (0x63a7)"  => "161 + 165 + 169 + 173(P)",
    "6g177/80 (0x60b7)"  => "177(P) + 181 + 185 + 189",
    "6g181/80 (0x61b7)"  => "177 + 181(P) + 185 + 189",
    "6g185/80 (0x62b7)"  => "177 + 181 + 185(P) + 189",
    "6g189/80 (0x63b7)"  => "177 + 181 + 185 + 189(P)",
    "6g193/80 (0x60c7)"  => "193(P) + 197 + 201 + 205",
    "6g197/80 (0x61c7)"  => "193 + 197(P) + 201 + 205",
    "6g201/80 (0x62c7)"  => "193 + 197 + 201(P) + 205",
    "6g205/80 (0x63c7)"  => "193 + 197 + 201 + 205(P)",
    "6g209/80 (0x60d7)"  => "209(P) + 213 + 217 + 221",
    "6g213/80 (0x61d7)"  => "209 + 213(P) + 217 + 221",
    "6g217/80 (0x62d7)"  => "209 + 213 + 217(P) + 221",
    "6g221/80 (0x63d7)"  => "209 + 213 + 217 + 221(P)",
    "6g1/160 (0x680f)"   => "1(P) + 5 + 9 + 13 + 17 + 21 + 25 + 29",
    "6g5/160 (0x690f)"   => "1 + 5(P) + 9 + 13 + 17 + 21 + 25 + 29",
    "6g9/160 (0x6a0f)"   => "1 + 5 + 9(P) + 13 + 17 + 21 + 25 + 29",
    "6g13/160 (0x6b0f)"  => "1 + 5 + 9 + 13(P) + 17 + 21 + 25 + 29",
    "6g17/160 (0x6c0f)"  => "1 + 5 + 9 + 13 + 17(P) + 21 + 25 + 29",
    "6g21/160 (0x6d0f)"  => "1 + 5 + 9 + 13 + 17 + 21(P) + 25 + 29",
    "6g25/160 (0x6e0f)"  => "1 + 5 + 9 + 13 + 17 + 21 + 25(P) + 29",
    "6g29/160 (0x6f0f)"  => "1 + 5 + 9 + 13 + 17 + 21 + 25 + 29(P)",
    "6g33/160 (0x682f)"  => "33(P) + 37 + 41 + 45 + 49 + 53 + 57 + 61",
    "6g37/160 (0x692f)"  => "33 + 37(P) + 41 + 45 + 49 + 53 + 57 + 61",
    "6g41/160 (0x6a2f)"  => "33 + 37 + 41(P) + 45 + 49 + 53 + 57 + 61",
    "6g45/160 (0x6b2f)"  => "33 + 37 + 41 + 45(P) + 49 + 53 + 57 + 61",
    "6g49/160 (0x6c2f)"  => "33 + 37 + 41 + 45 + 49(P) + 53 + 57 + 61",
    "6g53/160 (0x6d2f)"  => "33 + 37 + 41 + 45 + 49 + 53(P) + 57 + 61",
    "6g57/160 (0x6e2f)"  => "33 + 37 + 41 + 45 + 49 + 53 + 57(P) + 61",
    "6g61/160 (0x6f2f)"  => "33 + 37 + 41 + 45 + 49 + 53 + 57 + 61(P)",
    "6g65/160 (0x684f)"  => "65(P) + 69 + 73 + 77 + 81 + 85 + 89 + 93",
    "6g69/160 (0x694f)"  => "65 + 69(P) + 73 + 77 + 81 + 85 + 89 + 93",
    "6g73/160 (0x6a4f)"  => "65 + 69 + 73(P) + 77 + 81 + 85 + 89 + 93",
    "6g77/160 (0x6b4f)"  => "65 + 69 + 73 + 77(P) + 81 + 85 + 89 + 93",
    "6g81/160 (0x6c4f)"  => "65 + 69 + 73 + 77 + 81(P) + 85 + 89 + 93",
    "6g85/160 (0x6d4f)"  => "65 + 69 + 73 + 77 + 81 + 85(P) + 89 + 93",
    "6g89/160 (0x6e4f)"  => "65 + 69 + 73 + 77 + 81 + 85 + 89(P) + 93",
    "6g93/160 (0x6f4f)"  => "65 + 69 + 73 + 77 + 81 + 85 + 89 + 93(P)",
    "6g97/160 (0x686f)"  => "97(P) + 101 + 105 + 109 + 113 + 117 + 121 + 125",
    "6g101/160 (0x696f)" => "97 + 101(P) + 105 + 109 + 113 + 117 + 121 + 125",
    "6g105/160 (0x6a6f)" => "97 + 101 + 105(P) + 109 + 113 + 117 + 121 + 125",
    "6g109/160 (0x6b6f)" => "97 + 101 + 105 + 109(P) + 113 + 117 + 121 + 125",
    "6g113/160 (0x6c6f)" => "97 + 101 + 105 + 109 + 113(P) + 117 + 121 + 125",
    "6g117/160 (0x6d6f)" => "97 + 101 + 105 + 109 + 113 + 117(P) + 121 + 125",
    "6g121/160 (0x6e6f)" => "97 + 101 + 105 + 109 + 113 + 117 + 121(P) + 125",
    "6g125/160 (0x6f6f)" => "97 + 101 + 105 + 109 + 113 + 117 + 121 + 125(P)",
    "6g129/160 (0x688f)" => "129(P) + 133 + 137 + 141 + 145 + 149 + 153 + 157",
    "6g133/160 (0x698f)" => "129 + 133(P) + 137 + 141 + 145 + 149 + 153 + 157",
    "6g137/160 (0x6a8f)" => "129 + 133 + 137(P) + 141 + 145 + 149 + 153 + 157",
    "6g141/160 (0x6b8f)" => "129 + 133 + 137 + 141(P) + 145 + 149 + 153 + 157",
    "6g145/160 (0x6c8f)" => "129 + 133 + 137 + 141 + 145(P) + 149 + 153 + 157",
    "6g149/160 (0x6d8f)" => "129 + 133 + 137 + 141 + 145 + 149(P) + 153 + 157",
    "6g153/160 (0x6e8f)" => "129 + 133 + 137 + 141 + 145 + 149 + 153(P) + 157",
    "6g157/160 (0x6f8f)" => "129 + 133 + 137 + 141 + 145 + 149 + 153 + 157(P)",
    "6g161/160 (0x68af)" => "161(P) + 165 + 169 + 173 + 177 + 181 + 185 + 189",
    "6g165/160 (0x69af)" => "161 + 165(P) + 169 + 173 + 177 + 181 + 185 + 189",
    "6g169/160 (0x6aaf)" => "161 + 165 + 169(P) + 173 + 177 + 181 + 185 + 189",
    "6g173/160 (0x6baf)" => "161 + 165 + 169 + 173(P) + 177 + 181 + 185 + 189",
    "6g177/160 (0x6caf)" => "161 + 165 + 169 + 173 + 177(P) + 181 + 185 + 189",
    "6g181/160 (0x6daf)" => "161 + 165 + 169 + 173 + 177 + 181(P) + 185 + 189",
    "6g185/160 (0x6eaf)" => "161 + 165 + 169 + 173 + 177 + 181 + 185(P) + 189",
    "6g189/160 (0x6faf)" => "161 + 165 + 169 + 173 + 177 + 181 + 185 + 189(P)",
    "6g193/160 (0x68cf)" => "193(P) + 197 + 201 + 205 + 209 + 213 + 217 + 221",
    "6g197/160 (0x69cf)" => "193 + 197(P) + 201 + 205 + 209 + 213 + 217 + 221",
    "6g201/160 (0x6acf)" => "193 + 197 + 201(P) + 205 + 209 + 213 + 217 + 221",
    "6g205/160 (0x6bcf)" => "193 + 197 + 201 + 205(P) + 209 + 213 + 217 + 221",
    "6g209/160 (0x6ccf)" => "193 + 197 + 201 + 205 + 209(P) + 213 + 217 + 221",
    "6g213/160 (0x6dcf)" => "193 + 197 + 201 + 205 + 209 + 213(P) + 217 + 221",
    "6g217/160 (0x6ecf)" => "193 + 197 + 201 + 205 + 209 + 213 + 217(P) + 221",
    "6g221/160 (0x6fcf)" => "193 + 197 + 201 + 205 + 209 + 213 + 217 + 221(P)",
    );
    
    $cmd_str= "wl -i wl2 chanspec";
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
            $opmode_val = "286";  // ax mode + 20MHz + 2 antenna = 286 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "600";  // ax mode + 40MHz + 2 antenna = 600 Mbps (573.6 Mbps)
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
            $opmode_val = 3;  // ax mode + 80MHz + 4 antenna = 2402 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = 4;  // ax mode + 160MHz + 4 antenna = 4804 Mbps
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
            $opmode_val = "346";   //ac mode + 20MHz + 4 antenna = 346 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "800";   //ac mode + 40MHz + 4 antenna = 800 Mbps
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
            $opmode_val = "573";   // ax mode + 20MHz + 4 antenna = 573 Mbps
        }
        else if ($ch_width == "40MHz")
        {
            $opmode_val = "1147";  // ax mode + 40MHz + 4 antenna = 1147 Mbps
        }
        else if ($ch_width == "80MHz")
        {
            $opmode_val = "2402";  // ax mode + 80MHz + 4 antenna = 2402 Mbps
        }
        else if ($ch_width == "160MHz")
        {
            $opmode_val = "4804";  // ax mode + 160MHz + 4 antenna = 4804 Mbps
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

function getSelectVal_6gMode()
{
    global $radio_6g;
    $ch_width = db_get("Device.WiFi.Radio.{$radio_6g}.OperatingChannelBandwidth");
    $wifi_mode;
    $opmode_val;

    /* select an option */
    if ($ch_width == "20MHz")
    {
        $opmode_val = 1;  // ax mode + 20MHz + 2 antenna = 286 Mbps
    }
    else if ($ch_width == "40MHz")
    {
        $opmode_val = 2;  // ax mode + 40MHz + 2 antenna = 600 Mbps
    }
    else if ($ch_width == "80MHz")
    {
        $opmode_val = 3;  // ax mode + 80MHz + 2 antenna = 1200 Mbps
    }
    else if ($ch_width == "160MHz")
    {
        $opmode_val = 4;  // ax mode + 160MHz + 2 antenna = 2400 Mbps
    }

    return $opmode_val;
}

function getSelectVal_6gModeForAdv()
{
    global $radio_6g;
    $ch_width = db_get("Device.WiFi.Radio.{$radio_6g}.OperatingChannelBandwidth");
    $qam_6g_256 = db_get("Device.X_PEGATRON_COM_DeviceInfo.Wifi6GAX256QAMOnly");

    if($qam_6g_256 == 1)
    {
        $ax_mode = array(
            "20MHz"  => "230",
            "40MHz"  => "460",
            "80MHz"  => "961",
            "160MHz" => "1922",
        );
    }
    else
    {
        $ax_mode = array(
            "20MHz"  => "286",
            "40MHz"  => "600",
            "80MHz"  => "1200",
            "160MHz" => "2400",
        );
    }

    return $ax_mode[$ch_width];
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

function getSelectVal_6gTxPower()
{
    global $radio_6g;

    $tx_pwr = db_get("Device.WiFi.Radio.{$radio_6g}.TransmitPower");

    if ($tx_pwr == "70")
    {
        $tx_pwr = "75";
    }
    else if ($tx_pwr == "20")
    {
        $tx_pwr = "50";
    }
    else if ($tx_pwr == "30")
    {
        $tx_pwr = "25";
    }

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

function getRadioVal_6gSecurity()
{
    global $ap_6g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.WlAuthAkm");
    
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

function getRadioVal_6gGuestSecurity()
{
    global $guest_ap_6g;

    $WpaEncryption = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.Security.X_BROADCOM_COM_WlWpaEncryption");
    $AuthMode = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.Security.WlAuthMode");
    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.Security.WlAuthAkm");
    
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

function getTextVal_6gPasswd()
{
    global $ap_6g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.KeyPassphrase");
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

function getTextVal_6gGuestPasswd()
{
    global $guest_ap_6g;

    $passwd = db_get("Device.WiFi.AccessPoint.{$guest_ap_6g}.Security.KeyPassphrase");
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

function getSelectVal_6gEncryptMode()
{
    global $ap_6g;

    $AuthAkm = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.WlAuthAkm");
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

function getIpVal_6gRadiusIP()
{   
    global $ap_6g;

    $radius_ip = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.RadiusServerIPAddr");
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

function getTextVal_6gRadiusPort()
{
    global $ap_6g;

    $radius_port = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.RadiusServerPort");
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

function getTextVal_6gRadiusSecret()
{
    global $ap_6g;

    $radius_secret_6g = db_get("Device.WiFi.AccessPoint.{$ap_6g}.Security.RadiusSecret");
    return $radius_secret_6g;
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

function getCheckboxVal_6gRadioOn()
{
    global $radio_6g;
    
    $radio_en = db_get("Device.WiFi.Radio.{$radio_6g}.Enable");

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

function getTextVal_6gCtsRts()
{
    global $radio_6g;
    return db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlRtsThrshld");
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

function getSelectVal_6gPreamble()
{
    global $radio_6g;
    
    $preambleType = db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlPreambleType");
    
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

function getCheckboxVal_6gWifiSchedule()
{
    $WifiSchedule_en = db_get("Device.X_PEGATRON_COM_WifiScheduleEnable.Enable_6G");

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

function getTextVal_6gGroupKey()
{
    global $radio_6g;

    $net_reauth = db_get("Device.WiFi.AccessPoint.{$radio_6g}.Security.X_BROADCOM_COM_WlNetReauth");
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
    global $radio_6g;
    
    $beamforming_en_2g = intval(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlTxbfImp"));
    $beamforming_en_5g = intval(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlTxbfImp"));
    $beamforming_en_6g = intval(db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlTxbfImp"));
    
    if ($beamforming_en_2g != 0 && $beamforming_en_5g != 0 && $beamforming_en_6g != 0)
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
    global $radio_6g;
    
    $mu_mimo_2g = hexdec(db_get("Device.WiFi.Radio.{$radio_2g}.X_BROADCOM_COM_WlMuFeatures"));
    $mu_mimo_5g = hexdec(db_get("Device.WiFi.Radio.{$radio_5g}.X_BROADCOM_COM_WlMuFeatures"));
    $mu_mimo_6g = hexdec(db_get("Device.WiFi.Radio.{$radio_6g}.X_BROADCOM_COM_WlMuFeatures"));
    
    if ($mu_mimo_2g != 0 && $mu_mimo_5g != 0 && $mu_mimo_6g != 0)
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

function getCheckboxVal_enable6GWpa3H2eOnly()
{
    $h2e_only = 1;
    $h2e_and_legacy_wpa3 = 2;
    $cmd_str= "nvram get wl2_sae_pwe";
    $res = exec($cmd_str);
    if ($res == $h2e_only)
    {
        return "true";
    }
    else //if ($res == $h2e_and_legacy_wpa3)
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

function getWps6gEnabled()
{
    global $ap_6g;

    return db_get("Device.WiFi.AccessPoint.{$ap_6g}.WPS.Enable");
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

function getEnable6GAX256QAM()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.Wifi6GAX256QAMOnly");
}

?>

