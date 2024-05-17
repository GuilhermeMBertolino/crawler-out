<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/etc/services/PHYINF/phywifi.php";

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}
function error($errno)	{startcmd("exit ".$errno); stopcmd("exit ".$errno);}

fwrite(w,$_GLOBALS["START"], "#!/bin/sh\n");
fwrite(w,$_GLOBALS["STOP"],  "#!/bin/sh\n");

$wifi_activateVAP = get_vap_activate_file_path();
if(isfile($wifi_activateVAP) == 1) {startcmd("sh ".$wifi_activateVAP);}

/*
Win7 logo patch. Hostapd must be restarted ONLY once..!
*/
foreach ("/runtime/phyinf")
{
	if (query("hostapd")== 1) {$hostapd=1;}
		
}
if($hostapd==1)
{
	/* define WFA related info for hostapd */
	$dtype	= "urn:schemas-wifialliance-org:device:WFADevice:1";
	setattr("/runtime/hostapd/mac",  "get", "devdata get -e lanmac");
	setattr("/runtime/hostapd/guid", "get", "genuuid -s \"".$dtype."\" -m \"".query("/runtime/hostapd/mac")."\"");
//	if(query("/runtime/hostapd_restartap")=="1")
//	{
//		startcmd('xmldbc -k "HOSTAPD_RESTARTAP"');
//		startcmd('xmldbc -t "HOSTAPD_RESTARTAP:5:sh /etc/scripts/restartap_hostapd.sh"');
//	}
//	else
//	{
		//startcmd("xmldbc -P /etc/services/WIFI/hostapdcfg.php > /var/topology.conf");
		//startcmd("/etc/scripts/hostapd_loop.sh &");
		startcmd("xmldbc -P /etc/services/WIFI/hostapdcfg-pmf.php > /var/topology.conf");
		startcmd("service HOSTAPD-PMF start");
//	}
	//stopcmd("ps | grep hostapd_loop.sh | awk '{print $1}' | xargs kill -SIGTERM\n");
	//stopcmd("killall hostapd > /dev/null 2>&1; sleep 1");
	//stopcmd("service HOSTAPD-PMF stop");
	set("/runtime/hostapd/enable","0");
}

/*
if(query("/runtime/wpa_supplicant/enable")=="1")
{
	$sta_phy24    = XNODE_getpathbytarget("", "phyinf", "uid", "WIFISTA-1.1", 0);
	$sta_phy5    = XNODE_getpathbytarget("", "phyinf", "uid", "WIFISTA-2.1", 0);
	if(query($sta_phy24."/active") == 1)
		$uid = "WIFISTA-1.1";
	else if(query($sta_phy5."/active") == 1)
		$uid = "WIFISTA-2.1";
	else
	{
		startcmd("echo \"Couldn't enable wpa_supplicant when WIFISTA disable in repeater mode.\"");
		error(8);
	}
	$dev = devname($uid);
	$brdev = find_brdev($uid);
	startcmd("xmldbc -P /etc/services/WIFI/wpa_supplicant_sta.php > /var/topology_sta.conf");
	startcmd("wpa_supplicant -b br0 -i ".$dev." -c /var/run/wpa_supplicant.conf &");
	//startcmd("wpa_supplicant -B -D athr -i "" &");
	stopcmd("killall wpa_supplicant");
	set("/runtime/wpa_supplicant/enable","0");
}*/


startcmd("sleep 10");
startcmd("service MULTICAST restart");

stopcmd("service MULTICAST restart");

 setattr("/runtime/get_channel_24", "get", "mfc get_channel wlan24");
 setattr("/runtime/get_channel_5", "get", "mfc get_channel wlan5");

$p_24 = XNODE_getpathbytarget("", "phyinf", "uid", "BAND24G-1.2", 0);
$p_5 = XNODE_getpathbytarget("", "phyinf", "uid", "BAND5G-1.2", 0);
if (query($p_24."/active")=="1" && query($p_5."/active")=="1")
{
	startcmd("brctl addrejfwlist br1 ath1 ath3");
	stopcmd("brctl delrejfwlist br1 ath1 ath3");
}
/* for wlan schedule, move interface really up to PHYINF.BANDXXG-1.1_ACTIVE */
$p_24 = XNODE_getpathbytarget("", "phyinf", "uid", "BAND24G-1.1", 0);
$p_5 = XNODE_getpathbytarget("", "phyinf", "uid", "BAND5G-1.1", 0);

function needsch($uid)
{
        /* Get schedule setting */
        $base = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
        $sch = query($base."/schedule");
        if ($sch=="")   {$needsch = "0";}
        else    {$needsch = "1";}
	if (query($base."/active")=="0") {$needsch = "0";}
        return $needsch;
}
if(needsch("BAND24G-1.1")=="1")
{
	startcmd("ifconfig ath0 down");
}
if(needsch("BAND5G-1.1")=="1")
{
	startcmd("ifconfig ath2 down");
}

if(isfile($wifi_activateVAP) == 1) {stopcmd("rm -f ".$wifi_activateVAP);}

error(0);
?>
