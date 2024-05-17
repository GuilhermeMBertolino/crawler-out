<?
//include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/inf.php";
include "/htdocs/phplib/inet.php";
include "/htdocs/phplib/xnode.php";

fwrite("w",$START, "#!/bin/sh\n");
fwrite("w",$STOP,  "#!/bin/sh\n");

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}
function error($errno)	{startcmd("exit ".$errno); stopcmd( "exit ".$errno);}

function IPStr2Hex($ip)
{
	if($ip == "") return 0;

	$i = 0;
	$new_ip="";

	if( cut_count($ip, ".")!=4 ) return $ip;

	while ($i < 4)
	{
		$part = cut($ip, $i, ".");
		if ( isdigit($part)==0 ) return $ip;
		$hex = dec2strf("%x", strtoul($part, 10));
		if(strlen($hex) == 1) $new_ip = $new_ip.'0'.$hex;
		else                  $new_ip = $new_ip.$hex;
		$i++;
	}

	return $new_ip;
}

function get_peerMAC_by_session_id($id)
{
	$pear_info = fread("e", "/proc/net/pppoe");	//#pear_mac = Id Address Device 00000002 00:0c:29:e4:fd:4d eth0.2

	$i = 3;
	$count = cut_count($pear_info, " ");
	while($i < $count)
	{
		$sessid = strtoul(cut($pear_info, $i, " "), 16);
		if($id == $sessid)
		{
			$pear_mac = cut($pear_info, $i + 1, " ");
			return $pear_mac;
		}
		$i = $i + 3;

	}
}
function MACStr2Hex($mac)
{
	if($mac == "") return 0;

	$tmac1 = cut($mac, 0, ":");
	$tmac2 = cut($mac, 1, ":");
	$tmac3 = cut($mac, 2, ":");
	$tmac4 = cut($mac, 3, ":");
	$tmac5 = cut($mac, 4, ":");
	$tmac6 = cut($mac, 5, ":");
	return $tmac1.$tmac2.$tmac3.$tmac4.$tmac5.$tmac6;
}

function HWNATsetup($dis_hwnat,$dis_fastnat,$dis_alpha_sw_nat,$wan_type)
{
	/* Get $WAN1 interface name */
	include "/htdocs/webinc/config.php";

	/**
	 * HWNAT
	 * 1. Booting default enable
	 * 2. WAN-1.UP restart HWNAT service (wan status = CONNECTED)
	 * 3. WAN-1.DOWN restart HWNAT service, bacause IPv6 need HWNAT (wan status = DISCONNECTED)
	 */
	$wan_status = "DISCONNECTED";
	if(INF_getcfgipaddr($WAN1) != "" || INF_getcurripaddr($WAN1) != "") {$wan_status = "CONNECTED";}

	/* WAN dev name */
	$infp   = XNODE_getpathbytarget("", "inf", "uid", $WAN1, 0);
	$phyinf = query($infp."/phyinf");
	$devnam = PHYINF_getifname($phyinf);

	/* IPv6 WAN Type */
	/* 2015/12/31 PPPoE share with v4, ACL rule and host entry related function not ready. Ignore that
	startcmd("# V6 WAN HNAT Settrings for PPPoE");

	$wan1inetp = INET_getpathbyinf($WAN1);
	$wan3inetp = INET_getpathbyinf($WAN3);
	$is_shareV4 = 0;
	if(query($wan3inetp."/addrtype") == "ppp6")
	{// Create new session.
		$stsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $WAN3, 1);
		$sessid = strtoul(query($stsp."/pppd/sessid"), 16);
		$pear_mac = get_peerMAC_by_session_id($sessid);

		startcmd("echo ".$sessid." > /proc/qca_switch/nf_athrs17_hnat_ppp_id2");
		startcmd("echo ".MACStr2Hex($pear_mac)." > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_mac2");
	}
	else if(query($wan1inetp."/addrtype") == "ppp10")
	{// Share with IPv4
		$is_shareV4 = 1;

		$stsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $WAN1, 1);
		$sessid = strtoul(query($stsp."/pppd/sessid"), 16);
		$pear_mac = get_peerMAC_by_session_id($sessid);

		startcmd("echo ".$sessid." > /proc/qca_switch/nf_athrs17_hnat_ppp_id2");
		startcmd("echo ".MACStr2Hex($pear_mac)." > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_mac2");
	}
	else
	{
		startcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat_ppp_id2");
		startcmd("echo 000000000000 > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_mac2");
	}

	startcmd("# is PPPoE V6 Share With V4 mode? ".$is_shareV4);
*/
	/* IPv4 WAN Type */
	startcmd("\n# WAN mode = ".$wan_type." ".$wan_status);
	startcmd("# ".$WAN1." ifname = ".$devnam);

	if($wan_status == "CONNECTED" && $wan_type == "pppoe")
	{
		$stsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $WAN1, 1);
		$sessid = strtoul(query($stsp."/pppd/sessid"), 16);
		$LOCAL = query($stsp."/inet/ppp4/local");
		$REMOTE = query($stsp."/inet/ppp4/peer");

		/* MAC */
		$wanmac = PHYINF_getmacsetting($WAN1);
		$pear_mac = get_peerMAC_by_session_id($sessid);

		//DEBUG
		startcmd('#sessid = '.$sessid);
		startcmd('#LOCAL  = '.$LOCAL);
		startcmd('#wanmac = '.$wanmac);
		startcmd('#REMOTE = '.$REMOTE);
		startcmd('#pear_mac = '.$pear_mac);
		//DEBUG

		startcmd("echo ".$devnam." > /proc/qca_switch/nf_athrs17_hnat_wan_ifname");
		startcmd("echo ".IPStr2Hex($LOCAL)." > /proc/qca_switch/nf_athrs17_hnat_wan_ip");
		startcmd("echo ".MACStr2Hex($wanmac)." > /proc/qca_switch/nf_athrs17_hnat_wan_mac");
		startcmd("echo ".IPStr2Hex($REMOTE)." > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_ip");
		startcmd("echo ".MACStr2Hex($pear_mac)." > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_mac");
		startcmd("echo ".$sessid." > /proc/qca_switch/nf_athrs17_hnat_ppp_id");

		/* HNAT variables
		   PPPoE V4 : hnat_wan_type = 1
		   PPPoE shareV4 : hant_wan_type = 3
		*/
		if($is_shareV4 == 1)
			$hnat_wan_type = 3;
		else
			$hnat_wan_type = 1;

		if($sessid == 0) { startcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat_wan_type"); }
		else { startcmd("echo ".$hnat_wan_type." > /proc/qca_switch/nf_athrs17_hnat_wan_type"); }

		/* Enabled HNAT */
		startcmd("insmod /lib/modules/nf_conntrack_ipv6.ko");
		startcmd("echo 1 > /proc/qca_switch/nf_athrs17_hnat");
	}
	else if($wan_status == "CONNECTED" && $wan_type == "pptp")
	{
		/* Disabled HNAT */
		startcmd("service HW_NAT stop");
	}
	else if($wan_status == "CONNECTED" && $wan_type == "l2tp")
	{
		/* Disabled HNAT */
		startcmd("service HW_NAT stop");
	}
	else
	{
		startcmd("echo ".$devnam." > /proc/qca_switch/nf_athrs17_hnat_wan_ifname");
		startcmd("echo 00000000 > /proc/qca_switch/nf_athrs17_hnat_wan_ip");
		startcmd("echo 000000000000 > /proc/qca_switch/nf_athrs17_hnat_wan_mac");
		startcmd("echo 00000000 > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_ip");
		startcmd("echo 000000000000 > /proc/qca_switch/nf_athrs17_hnat_ppp_peer_mac");
		startcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat_ppp_id");
		startcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat_wan_type");

		/* Enabled HNAT */
		startcmd("insmod /lib/modules/nf_conntrack_ipv6.ko");
		startcmd("echo 1 > /proc/qca_switch/nf_athrs17_hnat");
	}

	/* Disabled HNAT */
	stopcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat");
	stopcmd("echo 0 > /proc/qca_switch/nf_athrs17_hnat_wan_type");
	stopcmd("rmmod nf_conntrack_ipv6.ko");
}

$layout = query("/runtime/device/layout");
if ($layout=="router")
{
	$dis_hwnat_flag = 0;
	$dis_fastnat_flag = 0;
	$dis_alpha_nat_flag = 0;
	$wan1_active = 0;
	$wan2_active = 0;
	$wan_mode = "";

	$if1path = XNODE_getpathbytarget("", "inf", "uid", "WAN-1", 0);
	$if2path = XNODE_getpathbytarget("", "inf", "uid", "WAN-2", 0);
	if ($if1path != "") {$wan1_active = query($if1path."/active");}
	if ($if2path != "") {$wan2_active = query($if2path."/active");}
	if($wan1_active == "1")
	{
		$if1_inet	= query($if1path."/inet");
		$if1_inetp	= XNODE_getpathbytarget("/inet", "entry", "uid", $if1_inet, 0);
		$if1_addrtype = query($if1_inetp."/addrtype");
		$if1_over   = query($if1_inetp."/ppp4/over");

		if($if1_addrtype != "ipv4")
		{
			/* check PPPeE */
			if($if1_over == "eth") {$wan_mode = "pppoe";}
			/* check PPTP */
			if($if1_over == "pptp"){$dis_hwnat_flag = 1;$wan_mode = "pptp";}
			/* check L2TP */
			if($if1_over == "l2tp"){$dis_hwnat_flag = 1;$wan_mode = "l2tp";}
		}
	}

	if($wan2_active == "1")
	{
		$if2_inet	= query($if2path."/inet");
		$if2_inetp	= XNODE_getpathbytarget("/inet", "entry", "uid", $if2_inet, 0);
		$if2_addrtype = query($if2_inetp."/addrtype");
		$if2_over   = query($if2_inetp."/ppp4/over");
		
		if($if2_addrtype != "ipv4")
		{
			/* check PPPeE */
			if($if2_over == "eth") {if($wan1_active != "1") {$wan_mode = "pppoe";}}
			/* check PPTP */
			if($if2_over == "pptp"){$dis_hwnat_flag = 1; if($wan1_active != "1") {$wan_mode = "pptp";}}
			/* check L2TP */
			if($if2_over == "l2tp"){$dis_hwnat_flag = 1; if($wan1_active != "1") {$wan_mode = "l2tp";}}
		}
	}

	/* check Multi-PPPoE */

	/* 
	   Qos
	*/

	/* check IP Unnumbered */

	/* check STATIC ROUTE */

	/* check DOMAIN ROUTE */

	/* check DEST ROUTE */

	/* check DYNAMIC ROUTE */

	//Turn off the HW NAT if the Super-DMZ is enabled.

	/* +++ START Hardware NAT and Fast NAT +++ */
	if($wan1_active == "1" || $wan2_active == "1") {HWNATsetup($dis_hwnat_flag,$dis_fastnat_flag,$dis_alpha_nat_flag,$wan_mode);}
}

error(0);
?>
