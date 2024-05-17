<?
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";

function cmd ($str)
{ echo $str."\n"; }
function msg ($str)
{ echo "echo '[bridge_handler] ".$str."' > /dev/console \n"; }

$layout = get("", "/device/layout");
if ($layout != "bridge")
{
	msg("layout is not bridge. exit.");
	exit;
}

$p = XNODE_getpathbytarget("", "inf", "uid", $BR1, "0");
if ($p == "")
{
	msg("Cannot get inf path. exit.");
	exit ;
}
//msg("ACTION=".$ACTION);

if ($ACTION == "CONNECTED")
{
	cmd ("xmldbc -s /inf:1/dhcps4 \"\"");
	cmd ("service DHCPS4.BRIDGE-1 stop");
}
else if ($ACTION == "DISCONNECTED")
{
	$inet = get("", $p."/inet");
	$inetp = XNODE_getpathbytarget("/inet","entry","uid",$inet,"0");
	$static = get("", $inetp."/ipv4/static");
	if ($static != "1")
	{
		cmd ("xmldbc -s /inf:1/dhcps4 \"DHCPS4-3\"");
		cmd ("service DHCPS4.BRIDGE-1 restart");

		$p = XNODE_getpathbytarget("/runtime", "inf", "uid", "BRIDGE-1", 1);
		set($p."/inet/ipv4/ipaddr","192.168.0.50");
		set($p."/inet/ipv4/mask","24");
		cmd ("ifconfig br0 192.168.0.50/24");
		cmd("service HTTP restart");
	}
}
else if ($ACTION == "LINKUP")
{
// HuanYao: After wifi linkup, It is very hard to tune a value that router could get IP.
	cmd ("xmldbc -k WIFISTA.LINKUP");
	cmd ("xmldbc -t 'WIFISTA.LINKUP:10:echo DHCP_RENEW > /dev/console ; /etc/events/DHCP4-RENEW.sh BRIDGE-1'");
}

?>
