HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/encrypt.php";
TRACE_info("============SetAPClientSettings.php========================");
$nodebase="/runtime/hnap/SetAPClientSettings/";
$RadioID = get("", $nodebase."RadioID");
$Enabled = get("", $nodebase."Enabled");
$ExistingNetwork = get("", $nodebase."ExistingNetwork");
$SSID = get("", $nodebase."SSID");
$MacAddress = get("", $nodebase."MacAddress");// MAC Address is unnecessary to set for AP client. Confirmed with LongLay.
$ChannelWidth = get("", $nodebase."ChannelWidth");// Channel Width is unnecessary to set for AP client. Confirmed with LongLay.
$SecurityType = get("", $nodebase."SupportedSecurity/SecurityInfo/SecurityType");
$Encryptions = get("", $nodebase."SupportedSecurity/SecurityInfo/Encryptions/string");
$Key = get("", $nodebase."Key");
$Key = AES_Decrypt128($Key);
$result = "OK";
$ch = 0;  //init

$ETH_UID = "ETH-1";

if($WLAN2_APCLIENT=="")	{$WLAN2_APCLIENT=$WLAN_APCLIENT;}

TRACE_info("WLAN_APCLIENT=".$WLAN_APCLIENT);
TRACE_info("WLAN2_APCLIENT=".$WLAN2_APCLIENT);

//Disable eth phyinf
$path_phyinf_eth = XNODE_getpathbytarget("", "phyinf", "uid", $ETH_UID, 0);
//set($path_phyinf_eth."/active", "0");

// Disable all WLAN APCLIENT
if($WLAN_APCLIENT!="")
{
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN_APCLIENT, 0);
	set($path_phyinf_wlan."/active", "0");
}
if($WLAN2_APCLIENT!="")
{
	$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2_APCLIENT, 0);
	set($path_phyinf_wlan."/active", "0");
}

if($RadioID == "RADIO_2.4GHz")
{
	$wlan_uid = $WLAN_APCLIENT;
	$freq = "2.4";
	$wlmode = "bgn";
	$bw = "20+40";
}
else if( $RadioID == "RADIO_5GHz")
{
	$wlan_uid = $WLAN2_APCLIENT;
	$freq = "5";
	if($FEATURE_NOACMODE==1)
	{
		$wlmode = "an";
		$bw = "20+40";
	}
	else
	{
		$wlmode = "acna";
		$bw = "20+40+80";
	}
}
else
{
	$wlan_uid = $WLAN_APCLIENT;
	$freq = "0";
}

$path_phyinf_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $wlan_uid, 0);
$path_wlan_wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($path_phyinf_wlan."/wifi"), 0);

TRACE_info("RadioID=".$RadioID);
TRACE_info("wlan_uid=".$wlan_uid);
TRACE_info("Enabled=".$Enabled);
TRACE_info("path_phyinf_wlan=".$path_phyinf_wlan);
TRACE_info("ExistingNetwork=".$ExistingNetwork);

function set_wlan_phyinf_active($target_wlan_uid, $enable)
{
	$active = "0";
	if($enable == "true")	$active = "1";
	else					$active = "0";
	
	$path_target_wlan = XNODE_getpathbytarget("", "phyinf", "uid", $target_wlan_uid, 0);
	set($path_target_wlan."/active", $active);	
}

if($ExistingNetwork == "eth")
{
	if($Enabled == "true") {set($path_phyinf_eth."/active", "1");}
	else	{set($path_phyinf_eth."/active", "0");}
	
	set("device/existingnetwork", $ExistingNetwork);
}
else	//when $ExistingNetwork = wifi
{
	//if($Enabled == "true")	{set($path_phyinf_wlan."/active", "1");}
	//else	{set($path_phyinf_wlan."/active", "0");}
	if($RadioID == "RADIO_2.4GHz")
	{
		set_wlan_phyinf_active($WLAN_APCLIENT, $Enabled);
	}
	else if($RadioID == "RADIO_5GHz")
	{
		set_wlan_phyinf_active($WLAN2_APCLIENT, $Enabled);
	}
	else
	{
		set_wlan_phyinf_active($WLAN_APCLIENT, $Enabled);
		set_wlan_phyinf_active($WLAN2_APCLIENT, $Enabled);
	}
	
	set("device/existingnetwork", $ExistingNetwork);

	if($SSID != "") set($path_wlan_wifi."/ssid", $SSID);
	del("/runtime/wifi_tmpnode/wifista");

	anchor($path_wlan_wifi);
	if(strstr($SecurityType, "WEP") != "")
	{
		if(strstr($Encryptions, "SHARED") != "")
		{	$auth = "SHARED";}
		else
		{	$auth = "WEPAUTO";}

		$keyLen = strlen($Key);
		if($keyLen == "5")			{$wepLen="64";$ascii="1";}
		else if($keyLen == "10")	{$wepLen="64";$ascii="0";}
		else if($keyLen == "13")	{$wepLen="128";$ascii="1";}
		else if($keyLen == "26")	{$wepLen="128";$ascii="0";}
		else	{$result = "ERROR_ILLEAGL_KEY_VALUE";}

		set("wps/configured", "1");
		set("authtype", $auth);
		set("encrtype","WEP");
		set("nwkey/wep/size", $wepLen);
		set("nwkey/wep/ascii", $ascii);
		set("nwkey/wep/defkey", "1");
		$defKey = query("nwkey/wep/defkey");
		set("nwkey/wep/key:".$defKey, $Key);
	}
	else if(strstr($SecurityType, "WPA") != "")
	{
		if(strstr($SecurityType, "WPAPSK") != "")		{$auth = "WPAPSK";}
		else if(strstr($SecurityType, "WPA2PSK") != "")	{$auth = "WPA2PSK";}
		else if(strstr($SecurityType, "WPA+2PSK") != ""){$auth = "WPA+2PSK";}
		else	{$result = "ERROR_BAD_SECURITYTYPE";}

		if(strstr($Encryptions, "TKIPAES") != "")	{$encrypttype = "TKIP+AES";}
		else if(strstr($Encryptions, "TKIP+AES") != "")	{$encrypttype = "TKIP+AES";}
		else if(strstr($Encryptions, "TKIP") != "")	{$encrypttype = "TKIP";}
		else if(strstr($Encryptions, "AES") != "")	{$encrypttype = "AES";}
		else	{$result = "ERROR_ENCRYPTION_NOT_SUPPORTED";}

		set("wps/configured", "1");
		set("authtype",$auth);
		set("encrtype",$encrypttype);
		set("nwkey/psk/key",$Key);
		set("nwkey/psk/passphrase", "1");
	}
	else
	{
		set("authtype", "OPEN");
		set("encrtype", "NONE");
	}
}


fwrite("w",$ShellPath, "#!/bin/sh\n");
fwrite("a",$ShellPath, "echo \"[$0]-->WLan Change\" > /dev/console\n");
if( $result == "OK" )
{
	fwrite("a",$ShellPath, "event DBSAVE > /dev/console\n");
	fwrite("a",$ShellPath, "service PHYINF.WIFISTA-2.1 stop > /dev/console\n");
	fwrite("a",$ShellPath, "service PHYINF.WIFISTA-1.1 stop > /dev/console\n");
	fwrite("a",$ShellPath, "xmldbc -k \"HNAP_".$SRVC_WLAN."\"\n");
	fwrite("a",$ShellPath, "xmldbc -t \"HNAP_".$SRVC_WLAN.":5:service ".$SRVC_WLAN." restart\"\n");
	fwrite("a",$ShellPath, "xmldbc -k \"HNAP_BRIDGE\"\n");
	fwrite("a",$ShellPath, "xmldbc -t \"HNAP_BRIDGE:2:service BRIDGE restart\"\n");
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
    <SetAPClientSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
      <SetAPClientSettingsResult><?=$result?></SetAPClientSettingsResult>
    </SetAPClientSettingsResponse>
  </soap:Body>
</soap:Envelope>
