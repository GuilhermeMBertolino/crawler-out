<?
include "/htdocs/phplib/xnode.php";
include "/etc/services/PHYINF/phywifi.php";

function schcmd($uid)
{
	/* Get schedule setting */
	$base = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$sch = query($base."/schedule");
	if ($sch=="")	{$cmd = "start";}
	else	{$cmd = XNODE_getschedule2013cmd($sch);}
	return $cmd;
}

function needsch($uid)
{
	/* Get schedule setting */
	$base = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$sch = query($base."/schedule");
	if ($sch=="")	{$needsch = "0";}
	else	{$needsch = "1";}
	if (query($base."/active")=="0") {$needsch = "0";}
	return $needsch;
}
/********************************************************************/
fwrite("w",$START, "#!/bin/sh\n");
fwrite("w", $STOP, "#!/bin/sh\n");

fwrite("a",$START,"service WIFI_MODS start\n");
$wifi_activateVAP = get_vap_activate_file_path();
if(isfile($wifi_activateVAP) == 1) { unlink($wifi_activateVAP); }

fwrite("a",$START,"service PHYINF.BAND24G-1.1 start\n");
fwrite("a",$START,"service PHYINF.BAND24G-1.2 start\n");
fwrite("a",$START,"service PHYINF.BAND5G-1.1 start\n");
fwrite("a",$START,"service PHYINF.BAND5G-1.2 start\n");

fwrite("a",$START,"service WIFI_ACTIVATE start\n");
if(needsch("BAND24G-1.1")=="1"||needsch("BAND5G-1.1")=="1"){
fwrite("a",$START,"sleep 10\n");
}
if(needsch("BAND24G-1.1")=="1"){
fwrite("a",$START,"service PHYINF.BAND24G-1.1_ACTIVE ".schcmd("BAND24G-1.1")."\n");
}
if(needsch("BAND5G-1.1")=="1"){
fwrite("a",$START,"service PHYINF.BAND5G-1.1_ACTIVE ".schcmd("BAND5G-1.1")."\n");
}

fwrite("a",$STOP,"killall updatewifistats\n");
fwrite("a",$STOP,"service WIFI_ACTIVATE stop\n");
if(needsch("BAND5G-1.1")=="1"){
fwrite("a",$STOP,"service PHYINF.BAND5G-1.1_ACTIVE stop\n");
}
if(needsch("BAND24G-1.1")=="1"){
fwrite("a",$STOP,"service PHYINF.BAND24G-1.1_ACTIVE stop\n");
}
fwrite("a",$STOP,"service PHYINF.BAND5G-1.2 stop\n");
fwrite("a",$STOP,"service PHYINF.BAND5G-1.1 stop\n");
fwrite("a",$STOP,"service PHYINF.BAND24G-1.2 stop\n");
fwrite("a",$STOP,"service PHYINF.BAND24G-1.1 stop\n");

fwrite("a",$STOP,"service WIFI_MODS stop\n");

fwrite("a",$START,	"exit 0\n");
fwrite("a",$STOP,	"exit 0\n");
?>
