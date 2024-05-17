<? /* vi: set sw=4 ts=4: */
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";

fwrite("w",$START, "#!/bin/sh\n");
fwrite("w",$STOP,  "#!/bin/sh\n");

function bsd_wifi_backup($wlan)
{
	$path_tmp_bsd = "/runtime/bsd/".$wlan;		
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
	$active = query($path_phyinf_wlan."/active");
	$ssid = query($path_wlan_wifi."/ssid");
	$channel = query($path_phyinf_wlan."/media/channel");
	$encrtype = query($path_wlan_wifi."/encrtype");
	$authtype	= query($path_wlan_wifi."/authtype");
	$schedule = query($path_phyinf_wlan."/schedule");
	
	del($path_tmp_bsd);
	
	if($active != "") set($path_tmp_bsd."/active", $active);
	if($ssid != "") set($path_tmp_bsd."/ssid", $ssid);
	if($channel != "") set($path_tmp_bsd."/channel", $channel);
	if($encrtype != "") set($path_tmp_bsd."/encrtype", $encrtype);
	if($authtype != "") set($path_tmp_bsd."/authtype", $authtype);
	if($schedule != "") set($path_tmp_bsd."/schedule", $schedule);
	
	TRACE_debug("bsd_wifi_backup: wlan=".$wlan);
	TRACE_debug("bsd_wifi_backup: active=".$active);
	TRACE_debug("bsd_wifi_backup: ssid=".$ssid);	
	TRACE_debug("bsd_wifi_backup: channel=".$channel);
	TRACE_debug("bsd_wifi_backup: encrtype=".$encrtype);
	TRACE_debug("bsd_wifi_backup: authtype=".$authtype);
	
	if($encrtype != "NONE")
	{
		if($encrtype == "WEP")
		{
			$defKey = query($path_wlan_wifi."/nwkey/wep/defkey");
			$key = query($path_wlan_wifi."/nwkey/wep/key:".$defKey);
			TRACE_debug("bsd_wifi_backup: defkey=".$defKey);
			TRACE_debug("bsd_wifi_backup: key=".$key);
			if($defKey != "") set($path_tmp_bsd."/defkey", $defKey);
			if($key != "") set($path_tmp_bsd."/key", $key);
			$size = query($path_wlan_wifi."/nwkey/wep/size");
			if($size != "") set($path_tmp_bsd."/size", $size);
			$ascii = query($path_wlan_wifi."/nwkey/wep/ascii");
			if($ascii != "") set($path_tmp_bsd."/ascii", $ascii);
		}
		else if($authtype == "WPA+2PSK")
		{
			$key = query($path_wlan_wifi."/nwkey/psk/key");
			$passphrase = query($path_wlan_wifi."/nwkey/psk/passphrase");
			if($key != "") set($path_tmp_bsd."/key", $key);
			if($passphrase != "") set($path_tmp_bsd."/passphrase", $passphrase);
		}
	}	
}

function bsd_wificonfig_from_24g($wlan,$src)
{
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
	$path_phyinf_src = XNODE_getpathbytarget("", "phyinf", "uid", $src, 0);
	$path_src_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_src."/wifi"), 0);

	$24g_ssid = query($path_src_wifi."/ssid");
	$24g_encrtype = query($path_src_wifi."/encrtype");
	$24g_authtype	= query($path_src_wifi."/authtype");
	$24g_schedule = query($path_phyinf_src."/schedule");
	
	TRACE_debug("bsd_wificonfig_from_24g: wlan=".$wlan);
	TRACE_debug("bsd_wificonfig_from_24g: path_src_wifi=".$path_src_wifi);
	TRACE_debug("bsd_wificonfig_from_24g: 24g_ssid=".$24g_ssid);
	TRACE_debug("bsd_wificonfig_from_24g: 24g_encrtype=".$24g_encrtype);
	TRACE_debug("bsd_wificonfig_from_24g: 24g_authtype=".$24g_authtype);	
	
	set($path_phyinf_wlan."/active", "1"); //Enable all Bands for smart connect
	if($24g_ssid != "") set($path_wlan_wifi."/ssid", $24g_ssid);
	set($path_phyinf_wlan."/media/channel", "0"); //auto channel for smart connect
	if($24g_encrtype != "") set($path_wlan_wifi."/encrtype", $24g_encrtype);
	if($24g_authtype != "") set($path_wlan_wifi."/authtype", $24g_authtype);
	
	if($24g_encrtype != "NONE")
	{
		if($24g_encrtype == "WEP")
		{
			$24g_defKey = query($path_src_wifi."/nwkey/wep/defkey");
			$24g_key = query($path_src_wifi."/nwkey/wep/key:".$24g_defKey);
			
			if($24g_defKey != "") set($path_wlan_wifi."/nwkey/wep/defkey", $24g_defKey);
			if($24g_key != "") set($path_wlan_wifi."/nwkey/wep/key:".$24g_defKey, $24g_key);
			
			$size = get("", $path_src_wifi."/nwkey/wep/size");
			if ($size != "") { set($path_wlan_wifi."/nwkey/wep/size", $size); }
			
			$ascii = get("", $path_src_wifi."/nwkey/wep/ascii");
			if ($ascii != "") { set($path_wlan_wifi."/nwkey/wep/ascii", $ascii); }
		}
		else if($24g_authtype == "WPA+2PSK")
		{
			$24g_key = query($path_src_wifi."/nwkey/psk/key");
			$24g_passphrase = query($path_src_wifi."/nwkey/psk/passphrase");
			if($24g_key != "") set($path_wlan_wifi."/nwkey/psk/key", $24g_key);
			if($24g_passphrase != "") set($path_wlan_wifi."/nwkey/psk/passphrase", $24g_passphrase);
		}
	}	
	if($24g_schedule != "") set($path_phyinf_wlan."/schedule", $24g_schedule);
	else set($path_phyinf_wlan."/schedule", "");
}

function bsd_wifi_restore($wlan)
{
	$path_tmp_bsd = "/runtime/bsd/".$wlan;		
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);
	$active = query($path_tmp_bsd."/active");
	$ssid = query($path_tmp_bsd."/ssid");
	$channel = query($path_tmp_bsd."/channel");
	$encrtype = query($path_tmp_bsd."/encrtype");
	$authtype	= query($path_tmp_bsd."/authtype");
	
	if($active != "") set($path_phyinf_wlan."/active", $active);
	if($ssid != "") set($path_wlan_wifi."/ssid", $ssid);
	if($channel != "") set($path_phyinf_wlan."/media/channel", $channel);
	if($encrtype != "") set($path_wlan_wifi."/encrtype", $encrtype);
	if($authtype != "") set($path_wlan_wifi."/authtype", $authtype);	
	
	if($encrtype != "NONE")
	{
		if($encrtype == "WEP")
		{
			$defKey = query($path_tmp_bsd."/defKey");
			$key = query($path_tmp_bsd."/key");
			if($defKey != "") set($path_wlan_wifi."/nwkey/wep/defkey", $defKey);
			if($key != "") set($path_wlan_wifi."/nwkey/wep/key:".$defKey, $key);
		}
		else if($authtype == "WPA+2PSK")
		{
			$key = query($path_tmp_bsd."/key");
			$passphrase = query($path_tmp_bsd."/passphrase");
			if($key != "") set($path_wlan_wifi."/nwkey/psk/key", $key);
			if($passphrase != "") set($path_wlan_wifi."/nwkey/psk/passphrase", $passphrase);
		}
	}	
}

function disable_guest_wifi($wlan)
{	
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan, 0);
	set($path_phyinf_wlan."/active", 0);
}
/*
	smart connect:
		5G Lo/High Band should follow 2.4G settings(ssid, password, security)
		1. Backup original settings, restore when smart connect disable
		2. Set channel to auto channel
		3. Enable all Bands
		4. Setup smart connect nvram configs:
*/
$smart_en = query("/device/features/smartconnect");
$smart_en_gz = query("/device/features/smartconnect_gz");
$vlan_en = query("/device/vlan/active");

$defsize = query("/runtime/device/devconfsize");
if ($defsize > 0) { $is_default = 0; }
else { $is_default = 1; }

if($smart_en=="1")
{
	if($is_default == 1)
	{
		bsd_wificonfig_from_24g($WLAN2, $WLAN1);
		if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) { bsd_wificonfig_from_24g($WLAN3, $WLAN1); }
	}
	
	/*
		When smart connect enable and WAN VLAN enable, we need to change nvram setting(lan_ifname).
		Because wifi interface will be added to bridge(br2: voip, br3: iptv).
	*/
	$br = "br0";
	if($vlan_en=="1")
	{
		$wlan_vid = query("/device/vlan/wlanport/wlan01");
		$voipid = query("/device/vlan/voipid");
		$iptvid = query("/device/vlan/iptvid");
		if($wlan_vid == $voipid)
			$br = "br2";
		else if($wlan_vid == $iptvid)
			$br = "br3";
	}
	if ($_GLOBALS['FEATURE_TRI_BAND'] == 1)	{
		fwrite("a",$START,			
			"nvram set bsd_enable=1\n".
			"nvram set gbsd_ifnames=\"eth1 eth2 eth3\"\n".
			"nvram set wl0_gbsd_policy=2\n". //2.4g: 5G prefer policy
			"nvram set wl1_gbsd_policy=1\n". //5g lo: bandwidth util policy
			"nvram set wl2_gbsd_policy=1\n". //5g hi: bandwidth util policy		
			"nvram set wl0_gbsd_max_load=80\n".
			"nvram set wl1_gbsd_max_load=80\n".
			"nvram set wl2_gbsd_max_load=80\n".		
			"nvram set gbsd_measure_cca=2\n".
			"nvram set gbsd_start_wps_detect=0\n"
			);		
	}
	else {
		fwrite("a",$START,		
			"nvram set bsd_enable=1\n".
			"nvram set gbsd_ifnames=\"eth1 eth2\"\n".
			"nvram set wl0_gbsd_policy=2\n". //2.4g: 5G prefer policy
			"nvram set wl1_gbsd_policy=1\n". //5g: bandwidth util policy
			"nvram set wl0_gbsd_max_load=80\n".
			"nvram set wl1_gbsd_max_load=80\n".
			"nvram set gbsd_measure_cca=2\n".
			"nvram set gbsd_start_wps_detect=0\n"
			);
	}

	// Smart connect for Guest Zone.
	if ($smart_en_gz == 1)
	{
		if($is_default == 1)
		{
			bsd_wificonfig_from_24g($WLAN2_GZ, $WLAN1_GZ);
			disable_guest_wifi($WLAN1_GZ);
			disable_guest_wifi($WLAN2_GZ);
			
			if ($_GLOBALS['FEATURE_TRI_BAND'] == 1) 
			{ 
				bsd_wificonfig_from_24g($WLAN3_GZ, $WLAN1_GZ);
				disable_guest_wifi($WLAN3_GZ);
			}
		}
		
		fwrite("a",$START,
			);
	}
	/*else
	{
		disable_guest_wifi($WLAN1_GZ);
		disable_guest_wifi($WLAN2_GZ);	
		if ($_GLOBALS['FEATURE_TRI_BAND'] == 1)	disable_guest_wifi($WLAN3_GZ);
	}*/
}
else if($smart_en!="1")
{
//	bsd_wifi_restore($WLAN2);	
//	bsd_wifi_restore($WLAN3);
}	
?> 
