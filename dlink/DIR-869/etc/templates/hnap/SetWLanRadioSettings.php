HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php";

function bsd_wificonfig_from_24g($wlan, $src)
{
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
	$path_phyinf_src = XNODE_getpathbytarget("", "phyinf", "uid", $src, 0);
	$path_src_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_src."/wifi"), 0);

	$24g_ssid = query($path_src_wifi."/ssid");
	$24g_schedule = query($path_phyinf_src."/schedule");
	
	TRACE_debug("bsd_wificonfig_from_24g: wlan=".$wlan);
	TRACE_debug("bsd_wificonfig_from_24g: path_src_wifi=".$path_src_wifi);
	TRACE_debug("bsd_wificonfig_from_24g: 24g_ssid=".$24g_ssid);
	
	set($path_phyinf_wlan."/active", "1"); //Enable all Bands for smart connect
	if($24g_ssid != "") set($path_wlan_wifi."/ssid", $24g_ssid);
	set($path_phyinf_wlan."/media/channel", "0"); //auto channel for smart connect

	if($24g_schedule != "") set($path_phyinf_wlan."/schedule", $24g_schedule);
	else set($path_phyinf_wlan."/schedule", "");
}

$nodebase="/runtime/hnap/SetWLanRadioSettings/";
$RadioID = query($nodebase."RadioID");

$WLAN1_UID = $WLAN1;
$WLAN2_UID = $WLAN2;

if($FEATURE_HAVEREPEATER==1 || $FEATURE_HAVEEXTENDER==1)
{
	if(query("/device/layout")=="bridge")
	{
		$wirelessmode=query("/device/wirelessmode");
		if ($wirelessmode=="WirelessRepeaterExtender" || $wirelessmode=="WirelessRepeater")
		{
			$WLAN1_UID = $WLAN_EXT24G;
			$WLAN2_UID = $WLAN_EXT5G;
		}
	}
}

$smartconnect_enable = query("/device/features/smartconnect");
$smartconnect_gz_enable = query("/device/features/smartconnect_gz");


if( $RadioID == "2.4GHZ" || $RadioID == "RADIO_24GHz" || $RadioID == "RADIO_2.4GHz"){
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_UID, 0); 
	$path_phyinf_wlan = $path_phyinf_wlan_host;
	$result = "OK";
}
else if( $RadioID == "5GHZ" || $RadioID == "RADIO_5GHz"){
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_UID, 0);
	$path_phyinf_wlan = $path_phyinf_wlan_host;
	$result = "OK";
}
else if( $RadioID == "RADIO_5GHz_2"){
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3, 0);
	$path_phyinf_wlan = $path_phyinf_wlan_host;
	$result = "OK";
}
else if( $RadioID == "RADIO_2.4G_Guest" || $RadioID == "RADIO_2.4GHz_Guest")
{	
	/* The children nodes in $path_phyinf_wlan."/media" of guestzone is refer to hostzone ($path_phyinf_wlan_host). */
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_UID, 0);
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_GZ, 0);	
	$result = "OK";
} 
else if( $RadioID == "RADIO_5G_Guest" || $RadioID == "RADIO_5GHz_Guest")
{
	/* The children nodes in $path_phyinf_wlan."/media" of guestzone is refer to hostzone ($path_phyinf_wlan_host). */
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_UID, 0);
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_GZ, 0);
	$result = "OK";
}
else if( $RadioID == "RADIO_5GHz_2_Guest")
{
	/* The children nodes in $path_phyinf_wlan."/media" of guestzone is refer to hostzone ($path_phyinf_wlan_host). */
	$path_phyinf_wlan_host = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3, 0);
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3_GZ, 0);
	$result = "OK";
}
else 
	$result = "ERROR_BAD_RADIOID";

TRACE_debug("RadioID=".$RadioID);
TRACE_debug("path_phyinf_wlan_host=".$path_phyinf_wlan_host);
TRACE_debug("path_phyinf_wlan=".$path_phyinf_wlan);

$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);

if( $result != "ERROR_BAD_RADIOID" )
{
	$mode = query($nodebase."Mode");
	$ssid = query($nodebase."SSID");
	if( query($nodebase."Enabled") == "true" )
	{ $wlanEn = "1"; }
	else
	{ $wlanEn = "0"; }
	if( $mode == "802.11b" )
	{ $wlanMode = "b"; }
	else if( $mode == "802.11g" )
	{ $wlanMode = "g"; }
	else if( $mode == "802.11n" )
	{ $wlanMode = "n"; }
	else if( $mode == "802.11bg" )
	{ $wlanMode = "bg"; }
	else if( $mode == "802.11bn" )
	{ $wlanMode = "bn"; }
	else if( $mode == "802.11gn" )
	{ $wlanMode = "gn"; }
	else if( $mode == "802.11bgn" )
	{ $wlanMode = "bgn"; }
	else if( $mode == "802.11a" )
	{ $wlanMode = "a"; }
	else if( $mode == "802.11an" )
	{ $wlanMode = "an"; }
	else if( $mode == "802.11ac" )
	{ $wlanMode = "ac"; }
	else if( $mode == "802.11nac" )
	{ $wlanMode = "acn"; }
	else if( $mode == "802.11anac" )
	{ $wlanMode = "acna"; }
	else
	{ 
		if( $wlanEn == "1" ) { $result = "ERROR_BAD_MODE"; }
	}
	if( $wlanEn == "1" && $ssid == "" )
	{ $result = "ERROR"; }
	if( query($nodebase."SSIDBroadcast") == "false" )
	{ $ssidHidden = "1"; }
	else
	{ $ssidHidden = "0"; }
	$width = query($nodebase."ChannelWidth");
	if( $width == "20" )
	{ $bandWidth = "20"; }
	else if( $width == "40" )
	{ $bandWidth = "40"; }
	else if( $width == "80" )
	{ $bandWidth = "80"; }
	else if( $width == "0")
	{ $bandWidth = "20+40"; }
	else if( $width == "1")
	{ $bandWidth = "20+40+80"; }
	$channel = query($nodebase."Channel");
	$countryCode = query("/runtime/devdata/countrycode");
	$secondaryChnl = query($nodebase."SecondaryChannel");
	$model = query("/runtime/device/modelname");
	$TXPower = query($nodebase."TXPower");
	$Schedule = query($nodebase."ScheduleName");
	$Coexistence = get("", $nodebase."Coexistence");
	if($Schedule!="ALWAYS")
	{
		$sch = XNODE_getscheduleuid($Schedule);
		set($path_phyinf_wlan."/schedule",$sch);
	}
	else
	{
		set($path_phyinf_wlan."/schedule","");
	}

	if( $width == "" ) 
	{ 
		if( $secondaryChnl!="0" )
		{ $result = "ERROR_BAD_SECONDARY_CHANNEL"; }
	}
	if(query($nodebase."QoS") == "false" )
	{ $qos = "0"; }
	else
	{ $qos = "1"; }
	$qos = "1"; //wmm should always on
	if( $result == "OK" )
	{
	  set($path_phyinf_wlan."/active",$wlanEn);
	  if( $wlanEn == "1" )
	  {
		$old_ssid = query($path_wlan_wifi."/ssid");
		if($old_ssid != $ssid) { set($path_wlan_wifi."/wps/configured", "1"); }
		set($path_wlan_wifi."/ssid",$ssid);
		set($path_phyinf_wlan_host."/media/wlmode",$wlanMode);
		set($path_wlan_wifi."/ssidhidden",$ssidHidden);
		if( $bandWidth == "20" || $bandWidth == "40" || $bandWidth == "80" || $bandWidth == "20+40" || $bandWidth == "20+40+80") { set($path_phyinf_wlan."/media/dot11n/bandwidth",$bandWidth); }
		if( $channel == "0" )
		{ set($path_phyinf_wlan_host."/media/channel","0"); }
		else
		{
			
			set($path_phyinf_wlan_host."/media/channel",$channel);
		}
		set("/wireless/SecondaryChannel",$secondaryChnl);
		set($path_phyinf_wlan_host."/media/wmm/enable", $qos);
		if($TXPower != "")
		{ set($path_phyinf_wlan_host."/media/txpower", $TXPower);}
		if($Coexistence == "true")		{ set($path_phyinf_wlan_host."/media/dot11n/bw2040coexist","1"); }
		else if($Coexistence == "false"){ set($path_phyinf_wlan_host."/media/dot11n/bw2040coexist","0"); }
	  }
	}
}

if($smartconnect_enable == 1)
{
	bsd_wificonfig_from_24g($WLAN2, $WLAN1);
	if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) bsd_wificonfig_from_24g($WLAN3, $WLAN1);
}

if($smartconnect_gz_enable == 1)
{
	bsd_wificonfig_from_24g($WLAN2_GZ, $WLAN1_GZ);
	if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) bsd_wificonfig_from_24g($WLAN3_GZ, $WLAN1_GZ);
}

//---longlay(20131113), enable wps funcion by "encryption setting" and "broadcast SSID setting"
$encr_check_wlan1 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_UID, 0);
$encr_check_wlan2 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_UID, 0);
$encr_check_wlan3 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3, 0);
$encr_wifi_wlan1 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($encr_check_wlan1."/wifi"), 0);
$encr_wifi_wlan2 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($encr_check_wlan2."/wifi"), 0);
$encr_wifi_wlan3 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($encr_check_wlan3."/wifi"), 0);//890 have BAND5G-2.1, add for wps check
$smart_en = query("/device/features/smartconnect");//When smart connect enabled, change 2.4G WPS setting only

//$wps=1;
$wps= query($encr_wifi_wlan1."/wps/enable");//Add for Dlink Web WPS, Johnson
if (query($encr_check_wlan1."/active")==1)
{
	if (query($encr_wifi_wlan1."/encrtype")=="WEP" || query($encr_wifi_wlan1."/encrtype")=="TKIP" || query($encr_wifi_wlan1."/ssidhidden")==1) {$wps=0;}
}
if (query($encr_check_wlan2."/active")==1 && $smart_en == "0")
{
	if (query($encr_wifi_wlan2."/encrtype")=="WEP" || query($encr_wifi_wlan2."/encrtype")=="TKIP" || query($encr_wifi_wlan2."/ssidhidden")==1) {$wps=0;}
}
if (query($encr_check_wlan3."/active")==1 && $smart_en == "0")
{
	if (query($encr_wifi_wlan3."/encrtype")=="WEP" || query($encr_wifi_wlan3."/encrtype")=="TKIP" || query($encr_wifi_wlan3."/ssidhidden")==1) {$wps=0;}
}
if($encr_wifi_wlan1!=""){set($encr_wifi_wlan1."/wps/enable", $wps);}
if($encr_wifi_wlan2!=""){set($encr_wifi_wlan2."/wps/enable", $wps);}
if($encr_wifi_wlan3!=""){set($encr_wifi_wlan3."/wps/enable", $wps);}
//----longlay(20131113)

fwrite("w",$ShellPath, "#!/bin/sh\n");
fwrite("a",$ShellPath, "echo \"[$0]-->WLan Change\" > /dev/console\n");
if( $result == "OK" )
{
	fwrite("a",$ShellPath, "event DBSAVE > /dev/console\n");
	fwrite("a",$ShellPath, "xmldbc -k \"HNAP_".$SRVC_WLAN."\"\n");
	fwrite("a",$ShellPath, "xmldbc -t \"HNAP_".$SRVC_WLAN.":5:service ".$SRVC_WLAN." restart\"\n");
	fwrite("a",$ShellPath, "xmldbc -s /runtime/hnap/dev_status '' > /dev/console\n");
	set("/runtime/hnap/dev_status", "ERROR");
}
else
{
	fwrite("a",$ShellPath, "echo \"We got a error, so we do nothing...\" > /dev/console");
}
?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <SetWLanRadioSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
      <SetWLanRadioSettingsResult><?=$result?></SetWLanRadioSettingsResult>
    </SetWLanRadioSettingsResponse>
  </soap:Body>
</soap:Envelope>
