#!/bin/sh
<?
include "/htdocs/phplib/xnode.php";

/*
	XXX Joe H.
	Execute this php will start to check IPv4 and IPv6 connection status.
	Change to another mode if the connection status do not meet expextation.
	This php need three arguments , INF4, INF6, INFLL. Let the php know which inf need to verify.
	IPv4 is DHCP mode : inet_ipv6.php will call this php
	IPv4 is PPP mode  : ppp4_status.php will call this php
	There is another php autodetect-reverse.php. Responsible for IPv4 or IPv6 change back.
*/

$autodetect = query("/autodetect/active");
$change = query("/autodetect/change");
if ($autodetect != "1" || $change == "1") /*Not Autodetection Mode or Already changed*/
	exit;

$INF4 = query("/autodetect/inf4");
$INF6 = query("/autodetect/inf6");
$INFLL = query("/autodetect/infLL");
$infp4 = XNODE_getpathbytarget("", "inf", "uid", $INF4, 0);
$inet4 = query($infp4."/inet");
$inetp4 = XNODE_getpathbytarget("/inet", "entry", "uid", $inet4, 0);
$infp6 = XNODE_getpathbytarget("", "inf", "uid", $INF6, 0);
$inet6 = query($infp6."/inet");
$inetp6 = XNODE_getpathbytarget("/inet", "entry", "uid", $inet6, 0);
$infpll = XNODE_getpathbytarget("", "inf", "uid", $INFLL, 0);
$addrtype = query($inetp4."/addrtype");
$infrp6 = XNODE_getpathbytarget("/runtime", "inf", "uid", $INF6, 0);
$infrp4 = XNODE_getpathbytarget("/runtime", "inf", "uid", $INF4, 0);
$infrpll = XNODE_getpathbytarget("/runtime", "inf", "uid", $INFLL, 0);
$pd_len = query($infrp6."/child/pdprefix");
$gateway = query($infrp6."/inet/ipv6/gateway");
$ppp_type = query($inetp4."/ppp4/over");

if (strstr($addrtype, "ppp") != "") {	//IPv4 is PPP mode, IPv6 should be PPP share with IPv4
	if($ppp_type == "pptp" || $ppp_type == "l2tp") {	//IPv4 is PPTP or L2TP mode, IPv6 should be AUTO
		echo "echo IPv4 is PPTP or L2TP  > /dev/console\n";
	} else if($pd_len == "" || $pd_len > 64 || $gateway == "") {	//Have PD and GW ?
		$phyinf = query($infrp4."/phyinf");
		$phyinfp = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $phyinf, 0);
		$phyinfname = query($phyinfp."/name");
		if ($infrpll != "")
			echo "xmldbc -X ".$infrpll."\n"; //remove pppoe data
		if ($infrp6 != "")
			echo "xmldbc -X ".$infrp6."\n"; //remove Autoconfig data
/*	HuanYao (2016/10/12): DO NOT remove the IPv6CP once it cannot get the IPv6 address.
		if ($phyinfname != "")
			echo "echo 1 > /proc/sys/net/ipv6/conf/".$phyinfname."/disable_ipv6\n"; //remove ipv6cp
*/
		echo "xmldbc -s ".$inetp4."/addrtype \"ppp4\"\n";
		echo "xmldbc -s ".$infp6."/infprevious \"".$INFLL."\"\n";
		echo "xmldbc -s ".$infp6."/defaultroute \"1\"\n";
		echo "xmldbc -s ".$infp6."/phyinf \"ETH-3\"\n";
		echo "xmldbc -s ".$infpll."/infnext \"".$INF6."\"\n";
		echo "xmldbc -s ".$infpll."/inet \"INET-8\"\n";
		echo "xmldbc -s ".$infp4."/child \"\"\n";
		echo "xmldbc -s ".$inetp6."/ipv6/dhcpopt \"IA-NA+IA-PD\"\n";
		echo "xmldbc -s /autodetect/change \"1\"\n";
		echo "service INET.".$INFLL." restart\n";
		echo "echo IPv6 over PPPoE Failed! > /dev/console\n";
	} else
		echo "echo PPP MODE COMPLETE!!! > /dev/console\n";
} else {								//IPv4 is non PPP mode, IPv6 should be AUTO.
	if($pd_len == "" || $pd_len > 64 || $gateway == "") { 	//Have PD and GW ?
		$sixrd_pfx = query($infrp4."/udhcpc/sixrd_pfx");
		$sixrd_pfxlen = query($infrp4."/udhcpc/sixrd_pfxlen");
		$sixrd_msklen = query($infrp4."/udhcpc/sixrd_msklen");
		$sixrd_brip = query($infrp4."/udhcpc/sixrd_brip");
		if ($sixrd_pfx != "") {								//Have 6RD option?
			$infp6 = XNODE_getpathbytarget("", "inf", "uid", $INF6, 0);
			$inet6 = query($infp6."/inet");
			$inetp6 = XNODE_getpathbytarget("/inet", "entry", "uid", $inet6, 0);

			echo "xmldbc -s /autodetect/change \"1\"\n";
			echo "xmldbc -s ".$inetp6."/ipv6/mode \"6RD\"\n";
			echo "xmldbc -s ".$infp6."/infprevious \"".$INF4."\"\n";
			echo "xmldbc -s ".$infp4."/infnext \"".$INF6."\"\n";
			echo "echo CHANGE AUTO TO 6RD !!! > /dev/console\n";
			echo "service INET.".$INF6." restart\n";
			echo "xmldbc -P /etc/services/INFSVCS.".$INF4.".php -V STOP=/var/servd/INFSVCS.".$INF4."_stop.sh\n";
		} else
			echo "echo Autoconfigure Mode without 6RD > /dev/console\n";
	} else {
		echo "echo Autoconfigure Mode COMPLETE > /dev/console\n";	//IPv6 is ready, check IPv4
		$ipaddr = query($infrp4."/inet/ipv4/ipaddr");
		$remote = query($infrp6."/inet/ipv4/ipv4in6/remote");
		$dslite = query($inetp4."/ipv4/ipv4in6/mode");
		if ($ipaddr == "" && $remote != "" && $dslite != "dslite") {
			echo "xmldbc -s ".$infp4."/infprevious \"".$INF6."\"\n";
			echo "xmldbc -s ".$infp6."/infnext \"".$INF4."\"\n";
			echo "xmldbc -s ".$inetp4."/ipv4/mtu \"1452\"\n";
			echo "xmldbc -s ".$inetp4."/ipv4/ipv4in6/mode \"dslite\"\n";
			echo "xmldbc -s /autodetect/change \"1\"\n";
			echo "echo CHANGE IPv4 TO DS-Lite !!! > /dev/console\n";
			echo "service INET.".$INF4." stop\n";
			echo "service INFSVCS.".$INF6." restart\n";
		}
	}
}

echo "service INET.".$INF6." alias INF.".$INF6."\n";
echo "xmldbc -P /etc/services/WAN.php -V STOP=/var/servd/WAN_stop.sh\n";
?>
