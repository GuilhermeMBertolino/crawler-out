<?
include "/htdocs/phplib/xnode.php";
include "/etc/services/PHYINF/phywifi.php";

function startcmd($cmd)
{
	fwrite(a,$_GLOBALS["START"], $cmd."\n");
}

fwrite("w",$START, "#!/bin/sh\n");
fwrite("w", $STOP, "#!/bin/sh\n");

$wifimode=query("/device/wirelessmode");

if($wifimode=="WirelessBridge")
{
	fwrite("a",$START,
		"service PHYINF.WIFISTA-1.1 start\n".
		"service PHYINF.WIFISTA-2.1 start\n"
	);

	fwrite("a",$STOP,
		"service PHYINF.WIFISTA-1.1 stop\n".
		"service PHYINF.WIFISTA-2.1 stop\n"
	);
}
else if($wifimode=="WirelessRepeaterExtender" || $wifimode=="WirelessRepeater")
{
	fwrite("a",$START,
		"service PHYINF.WIFISTA-1.1 start\n".
		"service PHYINF.WIFISTA-2.1 start\n".
		"service PHYINF.BAND24G-1.1 start\n".
		"service PHYINF.BAND5G-1.1 start\n"
	);

	fwrite("a",$STOP,
		"service PHYINF.WIFISTA-1.1 stop\n".
		"service PHYINF.WIFISTA-2.1 stop\n".
		"service PHYINF.BAND24G-1.1 stop\n".
		"service PHYINF.BAND5G-1.1 stop\n"
	);
}
fwrite("a",$START, "sleep 3\n");

fwrite("a",$START,      "exit 0\n");
fwrite("a", $STOP,      "exit 0\n");
?>
