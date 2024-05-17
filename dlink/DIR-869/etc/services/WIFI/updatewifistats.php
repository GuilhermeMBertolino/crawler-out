<?
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/phyinf.php";
include "/etc/services/PHYINF/phywifi.php";

if(isfile("/usr/sbin/updatewifistats")!=1)
{
	TRACE_error("/usr/sbin/updatewifistats doesn't exist \n");
	return ;	
}	

if ($PHY_UID == "") $PHY_UID="BAND24G-1.1";
$prefix = cut($PHY_UID, 0,"-");
$postfix = cut($PHY_UID, 1,"-");
$postnum = cut($postfix, 0,".");
$posttype = cut($postfix, 1,".");

if($prefix == "BAND24G")
{
	if($posttype=="1") $upwifistats_pidfile = "/var/run/upwifistats24g.pid";
	else $upwifistats_pidfile = "/var/run/upwifistats24g_guest.pid";
	$helper_script 		 = "/etc/scripts/upwifistatshlper_G_band.sh";
}
else if ($prefix == "WIFISTA")
{
	if ($postnum=="1") { 	//STA 2.4G
		$upwifistats_pidfile = "/var/run/upwifistats_".$PHY_UID.".pid";
		$helper_script 		 = "/etc/scripts/upwifistatshlper_STA.sh";
	} else {				//STA 5G
		$upwifistats_pidfile = "/var/run/upwifistats_".$PHY_UID.".pid";
		$helper_script 		 = "/etc/scripts/upwifistatshlper_STA.sh";
	}
} 
else
{ 
	if($postnum=="1")
	{
		if($posttype=="1") $upwifistats_pidfile = "/var/run/upwifistats5g.pid";
		else $upwifistats_pidfile = "/var/run/upwifistats5g_guest.pid";
	$helper_script 		 = "/etc/scripts/upwifistatshlper_A_band.sh";
	}
	else
	{
		if($posttype=="1") $upwifistats_pidfile = "/var/run/upwifistats5g_hi.pid";
		else $upwifistats_pidfile = "/var/run/upwifistats5g_hi_guest.pid";
		$helper_script 		 = "/etc/scripts/upwifistatshlper_A_band.sh";
	}
}

/* restart upwifistats 
 * 1. kill previous pid
 * 2. get the prefix, restart the upwifistats
*/

$pid = fread("", $upwifistats_pidfile);
if($pid != "")
	echo "kill ".$pid."\n";	

$upwifi_attr0 	= "updatewifistats -s ".$helper_script."  -m QCA9563 -i ".devname($PHY_UID)." ";
$upwifi_attr1 	= "-x ";	//for upwifistats argument (-x --> /phyinf:#)
$upwifi_attr2 	= "-r ";	//for upwifistats argument (-r --> /runtime/phyinf:#)
$found = 0;

/* hostzone and guestzone should use their own interface to updatewifistats */
$p = XNODE_getpathbytarget("", "phyinf", "uid", $PHY_UID, 0);
if ($p=="") {break;}

$r = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $PHY_UID, 0);	
if ($r!="") 
{
	$upwifi_attr1 = $upwifi_attr1.$p." ";	
	$upwifi_attr2 = $upwifi_attr2.$r." ";
	$found = 1;
}

/* for each interface. */
/*
$i=1;
while ($i>0)
{
	$uid = $prefix."-1.".$i;
	
	$p = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	if ($p=="") {$i=0; break;}

	$r = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $uid, 0);	
	if ($r!="") 
	{
		$upwifi_attr1 = $upwifi_attr1.$p." ";	
		$upwifi_attr2 = $upwifi_attr2.$r." ";
		$found = 1;
	} 
	$i++; 
}
*/

if($found==1) 
{
	//if ($PHY_UID == "WIFISTA-1.1" || $PHY_UID == "WIFISTA-2.1")
	//	$cmd = $upwifi_attr0.$upwifi_attr1.$upwifi_attr2." -c /etc/scripts/updatechannel.sh &";
	//else
		$cmd = $upwifi_attr0.$upwifi_attr1.$upwifi_attr2." &";
	TRACE_debug($cmd);
	echo $cmd."\n";
	echo "echo $! > ".$upwifistats_pidfile."\n";
}	
?>
