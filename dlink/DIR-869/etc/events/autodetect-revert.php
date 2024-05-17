#!/bin/sh
<?
include "/htdocs/phplib/xnode.php";

/*
   XXX Joe H.
   This php will revert the xmldb
*/


$autodetect = query("/autodetect/active");
$change = query("/autodetect/change");
if ($autodetect != "1" || $change != "1")
	exit;

$INF4 = query("/autodetect/inf4");
$INF6 = query("/autodetect/inf6");
$INFLL = query("/autodetect/infLL");
$infp4 = XNODE_getpathbytarget("", "inf", "uid", $INF4, "0");
$inet4 = query($infp4."/inet");
$inetp4 = XNODE_getpathbytarget("/inet", "entry", "uid", $inet4, 0);
$infp6 = XNODE_getpathbytarget("", "inf", "uid", $INF6, "0");
$inet6 = query($infp6."/inet");
$inetp6 = XNODE_getpathbytarget("/inet", "entry", "uid", $inet6, 0);
$mode4 = query($inetp4."/addrtype");

if (strstr($mode4, "ppp") != "") {	//AUTO -> PPP   ppp4 -> ppp10
	$prevp = XNODE_getpathbytarget("", "inf", "uid", $INFLL, "0");
	echo "xmldbc -s ".$inetp4."/addrtype \"ppp10\"\n";
	echo "xmldbc -s ".$infp6."/infprevious \"".$INFLL."\"\n";
	echo "xmldbc -s ".$infp6."/defaultroute \"0\"\n";
	echo "xmldbc -s ".$prevp."/infnext \"".$INF6."\"\n";
	echo "xmldbc -s ".$prevp."/inet \"\"\n";
	echo "xmldbc -s ".$infp4."/child \"".$INFLL."\"\n";
	echo "xmldbc -s ".$inetp6."/ipv6/dhcpopt \"IA-PD\"\n";
	echo "xmldbc -s /autodetect/change \"0\"\n";
} else {							//6RD -> AUTO   DS-Lite -> DHCP
	echo "xmldbc -s ".$inetp4."/ipv4/mtu \"1500\"\n";
	echo "xmldbc -s ".$inetp4."/ipv4/ipv4in6/mode \"\"\n";
	echo "xmldbc -s ".$inetp6."/ipv6/mode \"AUTO\"\n";
	echo "xmldbc -s ".$infp6."/infprevious \"\"\n";
	echo "xmldbc -s ".$infp4."/infprevious \"\"\n";
	echo "xmldbc -s ".$infp6."/infnext \"\"\n";
	echo "xmldbc -s ".$infp4."/infnext \"\"\n";
	echo "xmldbc -s /autodetect/change \"0\"\n";
}

?>
