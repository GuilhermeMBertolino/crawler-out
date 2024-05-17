<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php"; 

function bsd_wifisettings_from_24g($wlan, $src)
{
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
	$path_phyinf_src = XNODE_getpathbytarget("", "phyinf", "uid", $src, 0);
	$path_src_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_src."/wifi"), 0);

	$24g_ssid = query($path_src_wifi."/ssid");
	$24g_schedule = query($path_phyinf_src."/schedule");
	
	TRACE_debug("bsd_wifisettings_from_24g: wlan=".$wlan);
	TRACE_debug("bsd_wifisettings_from_24g: path_src_wifi=".$path_src_wifi);
	TRACE_debug("bsd_wifisettings_from_24g: 24g_ssid=".$24g_ssid);
	
	set($path_phyinf_wlan."/active", "1"); //Enable all Bands for smart connect
	if($24g_ssid != "") set($path_wlan_wifi."/ssid", $24g_ssid);
	set($path_phyinf_wlan."/media/channel", "0"); //auto channel for smart connect

	if($24g_schedule != "") set($path_phyinf_wlan."/schedule", $24g_schedule);
	else set($path_phyinf_wlan."/schedule", "");
}

$radioID = query($nodebase."RadioID");

$smartconnect_enable = query("/device/features/smartconnect");
$smartconnect_gz_enable = query("/device/features/smartconnect_gz");

if( $radioID == "2.4GHZ" || $radioID == "RADIO_24GHz" || $radioID == "RADIO_2.4GHz")
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1, 0);	}
if( $radioID == "5GHZ" || $radioID == "RADIO_5GHz")
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2, 0);	}
if( $radioID == "RADIO_5GHz_2") // For DIR-890L 5G High-Band
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3, 0);	}
if( $radioID == "RADIO_2.4G_Guest" || $radioID == "RADIO_2.4GHz_Guest")
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_GZ, 0);	} 
if( $radioID == "RADIO_5G_Guest" || $radioID == "RADIO_5GHz_Guest")
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_GZ, 0);	} 
if( $radioID == "RADIO_5GHz_2_Guest") // For DIR-890L 5G High-Band
{	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3_GZ, 0);	}

$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
anchor($path_wlan_wifi);

if( $radioID != "2.4GHZ" && $radioID != "5GHZ" && $radioID != "RADIO_24GHz" && 
		$radioID != "RADIO_5GHz" && $radioID != "RADIO_5GHz_2" && $radioID != "RADIO_2.4GHz" && $radioID != "RADIO_2.4G_Guest" && $radioID != "RADIO_2.4GHz_Guest" && $radioID != "RADIO_5G_Guest" && $radioID != "RADIO_5GHz_Guest" && $radioID != "RADIO_5GHz_2_Guest")
{ $result = "ERROR_BAD_RADIO"; } 
else
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
	else if( $mode == "802.11n" || $mode == "802.11abgn" ) //add 802.11abgn for Android QRS mobile 1.2.0.2, sammy 
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
	else if( $mode == "802.11nac" ) //follow spec. D-Link HNAP Extension - 20131211v1.12R
	{ $wlanMode = "acn"; }
	else if( $mode == "802.11anac" ) //follow spec. D-Link HNAP Extension - 20131211v1.12R
	{ $wlanMode = "acna"; }	
	else if( $mode == "802.11abgn" ) //for Android QRS mobile
	{ $wlanMode = get("",$path_phyinf_wlan."/media/wlmode"); }	
	else
	{ 
		if( $wlanEn == "1" && $radioID != "RADIO_2.4G_Guest" && $radioID != "RADIO_2.4GHz_Guest" && $radioID != "RADIO_5G_Guest" && $radioID != "RADIO_5GHz_Guest" && $radioID != "RADIO_5GHz_2_Guest") { $result = "ERROR_BAD_MODE"; }
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
	else if( $width == "0")
	{ $bandWidth = "20+40"; }
	else if( $width == "1")
	{ $bandWidth = "20+40+80"; }
	$channel = query($nodebase."Channel");
	$countryCode = query("/runtime/devdata/countrycode");
	$secondaryChnl = query($nodebase."SecondaryChannel");
	$model = query("/runtime/device/modelname");
	if( $width == "" ) 
	{ 
		if( $secondaryChnl!="0" )
		{ $result = "ERROR_BAD_SECONDARY_CHANNEL"; }
	}
	if(query($nodebase."QoS") == "false" )
	{ $qos = "0"; }
	else
	{ $qos = "1"; }
	if( $result == "OK" )
	{
	  set($path_phyinf_wlan."/active",$wlanEn);
	  if( $wlanEn == "1" )
	  {
		$old_ssid = query($path_wlan_wifi."/ssid");
		if($old_ssid != $ssid) 
		{ 
			set($path_wlan_wifi."/wps/configured", "1"); 
		}
		set($path_wlan_wifi."/ssid",$ssid);
		set($path_phyinf_wlan."/media/wlmode",$wlanMode);
		set($path_wlan_wifi."/ssidhidden",$ssidHidden);
		if( $bandWidth == "20" || $bandWidth == "40" || $bandWidth == "80" || $bandWidth == "20+40" || $bandWidth == "20+40+80") { set($path_phyinf_wlan."/media/dot11n/bandwidth",$bandWidth); }
		if( $channel == "0" )
		{ set($path_phyinf_wlan."/media/channel","0"); }
		else
		{
			
			set($path_phyinf_wlan."/media/channel",$channel);
		}
		set("/wireless/SecondaryChannel",$secondaryChnl);
		set($path_phyinf_wlan."/media/wmm/enable", $qos);
	  }
	}
}

if($smartconnect_enable == 1)
{
	bsd_wifisettings_from_24g($WLAN2, $WLAN1);
	if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) bsd_wifisettings_from_24g($WLAN3, $WLAN1);
}

$path_phyinf_wlan1gz = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1_GZ, 0);
$wlan1gz_active = query($path_phyinf_wlan1gz."/active");
if($smartconnect_gz_enable == 1 && $wlan1gz_active == 1)
{
	bsd_wifisettings_from_24g($WLAN2_GZ, $WLAN1_GZ);
	if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) bsd_wifisettings_from_24g($WLAN3_GZ, $WLAN1_GZ);
}

if( $result == "OK" )
{
	fwrite("a",$ShellPath, "service WIFI.WLAN-1 restart > /dev/console\n");
}
else
{
	fwrite("a",$ShellPath, "echo \"We got a error, so we do nothing...\" > /dev/console");
}
?>