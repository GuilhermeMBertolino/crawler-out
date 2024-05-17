<?
//this script needs argument EVENT, we need this to control WIFI LEDs

include "/etc/services/PHYINF/phywifi.php";

echo "#!/bin/sh\n";

function get_wifi_bss($uid)
{
	$dev = devname($uid);
	if($dev == "")
		return error(9);
	
	$cmd = "wl -i ".$dev." bss";
	setattr("/runtime/".$dev."/bss", "get", $cmd);
	$bss = get("", "/runtime/".$dev."/bss");
	
	return $bss;
}

if(get("x", "/device/layout") != "router" && get("x", "/device/layout") != "bridge")
{
	return;
}

TRACE_debug("debug: update_wpsled EVENT=".$EVENT);
if($EVENT == "WPS_IN_PROGRESS" || $EVENT == "WPS_OVERLAP")
{
	echo "usockc /var/gpio_ctrl WPS_IN_PROGRESS\n";
}

if($EVENT == "WPS_SUCCESS" || $EVENT == "WPS_ERROR" ||  $EVENT == "WPS_NONE")
{
	echo "usockc /var/gpio_ctrl WPS_NONE\n";				//Add by Vic, should turn off wps led first to stop wps led timer
	echo "phpsh /etc/scripts/update_wanled.php EVENT=WAN_STATUS\n";	
}
?>
