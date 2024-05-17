<?
/* We use VID 2 for WAN port, VID 1 for LAN ports.
 * by David Hsieh <david_hsieh@alphanetworks.com> */
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}
function error($errno)	{startcmd("exit ".$errno); stopcmd("exit ".$errno);}
//function vlancmd($var, $val) {fwrite(a,$_GLOBALS["START"], "echo ".$val." > /proc/rt3052/vlan/".$var."\n");}

function setup_switch($mode)
{
	if ( $mode == "bridge" )
	{
		/* Start .......................................................................... */
		/* Recognize tag packet from CPU */
                startcmd("ethreg -i eth0 0x620=0x000004f0 > /dev/null"); //mod by Vic, this value should be 0x000004f0, or will WAN loop
                //startcmd("ethreg -i eth0 0x620=0x080004f0 > /dev/null"); //Occurs WAN side network loop issue
		/*set CPU P0 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x660=0x0014027e > /dev/null");
		/*set LAN P1-P4 and WAN P5 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x66c=0x0014027d > /dev/null");
		startcmd("ethreg -i eth0 0x678=0x0014027b > /dev/null");
		startcmd("ethreg -i eth0 0x684=0x00140277 > /dev/null");
		startcmd("ethreg -i eth0 0x690=0x0014026f > /dev/null");
		startcmd("ethreg -i eth0 0x69c=0x0014025f > /dev/null");
		/* P0-P4 port CVID=1*/
		startcmd("ethreg -i eth0 0x420=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x428=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x430=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x438=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x440=0x00010001 > /dev/null");
		/* P5 port CVID=2*/
		startcmd("ethreg -i eth0 0x448=0x00020001 > /dev/null");
		/* VLAN(VID=1) with P0-P4*/
		startcmd("ethreg -i eth0 0x610=0x001bd560 > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x80010002 > /dev/null");
		/* VLAN(VID=2) with P0/P5*/
		startcmd("ethreg -i eth0 0x610=0x001b7fe0 > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x80020002 > /dev/null");
		/* insert tag to CPU port */
		startcmd("ethreg -i eth0 0x424=0x00002040 > /dev/null");
		/* remove tag to WAN/LAN port*/
		startcmd("ethreg -i eth0 0x42c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x434=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x43c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x444=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x44c=0x00001040 > /dev/null");
		/* ARP response frame acknowledge disable P1-P5 */
		startcmd("ethreg -i eth0 0x214=0x00000000 > /dev/null");
		startcmd("ethreg -i eth0 0x210=0x00000000 > /dev/null");
	}
	else
	{
		/* Start .......................................................................... */
		/* Recognize tag packet from CPU */
		startcmd("ethreg -i eth0 0x620=0x000004f0 > /dev/null"); //mod by Vic, this value should be 0x000004f0, or will WAN loop
                //startcmd("ethreg -i eth0 0x620=0x080004f0 > /dev/null"); //Occurs WAN side network loop issue
		/*set CPU P0 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x660=0x0014027e > /dev/null");
		/*set LAN P1-P4 and WAN P5 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x66c=0x0014027d > /dev/null");
		startcmd("ethreg -i eth0 0x678=0x0014027b > /dev/null");
		startcmd("ethreg -i eth0 0x684=0x00140277 > /dev/null");
		startcmd("ethreg -i eth0 0x690=0x0014026f > /dev/null");
		startcmd("ethreg -i eth0 0x69c=0x0014025f > /dev/null");
		/* P0-P4 port CVID=1*/
		startcmd("ethreg -i eth0 0x420=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x428=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x430=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x438=0x00010001 > /dev/null");
		startcmd("ethreg -i eth0 0x440=0x00010001 > /dev/null");
		/* P5 port CVID=2*/
		startcmd("ethreg -i eth0 0x448=0x00020001 > /dev/null");
		/* VLAN(VID=1) with P0-P4*/
		startcmd("ethreg -i eth0 0x610=0x001bd560 > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x80010002 > /dev/null");
		/* VLAN(VID=2) with P0/P5*/
		startcmd("ethreg -i eth0 0x610=0x001b7fe0 > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x80020002 > /dev/null");
		/* insert tag to CPU port */
		startcmd("ethreg -i eth0 0x424=0x00002040 > /dev/null");
		/* remove tag to WAN/LAN port*/
		startcmd("ethreg -i eth0 0x42c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x434=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x43c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x444=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x44c=0x00001040 > /dev/null");
		/* ARP response frame acknowledge disable P1-P5 */
		startcmd("ethreg -i eth0 0x214=0x00000000 > /dev/null");
		startcmd("ethreg -i eth0 0x210=0x00000000 > /dev/null");
	}
}

function set_internet_vlan($mode, $vid)
{
//vid between 1~4095

	if ( $mode == "bridge" )
	{
		SHELL_info($START, "LAYOUT: bridge mode ...=====>>>> TODO...");
	}
	else
	{
		/**
		 * 859 Board :
		 *   WAN |   LAN
		 *    5  | 4 3 2 1
		 * GUI :
		 *    5  | 1 2 3 4
		 */
		$vlan_path	= "/device/vlan/lanport/";
		$lan1id = query($vlan_path."lan4");
		$lan2id = query($vlan_path."lan3");
		$lan3id = query($vlan_path."lan2");
		$lan4id = query($vlan_path."lan1");

		/**
		 * 00 = Unmodified (0)
		 * 01 = Untagged   (1)
		 * 10 = tagged     (2)
		 * 11 = Not member (3)
		 */
		$untag = 1;
		$tag = 2;
		$not_member = 3;

		$vid_hex = dec2strf("%03x", $vid);

		/* Start .......................................................................... */
		/* Recognize tag packet from CPU */
		//Router egress VLAN mode, set CPU and WAN port to tagged
		startcmd("ethreg -i eth0 0xc80=0x01211112 > /dev/null");
		startcmd("ethreg -i eth0 0x620=0x000004f0 > /dev/null"); //mod by Vic, this value should be 0x000004f0, or will WAN loop
		//startcmd("ethreg -i eth0 0x620=0x080004f0 > /dev/null"); //Occurs WAN side network loop issue		
		/*set CPU P0 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x660=0x0014027e > /dev/null");
		/*set LAN P1-P4 and WAN P5 to 802.1Q check mode */
		startcmd("ethreg -i eth0 0x66c=0x0014027d > /dev/null");
		startcmd("ethreg -i eth0 0x678=0x0014027b > /dev/null");
		startcmd("ethreg -i eth0 0x684=0x00140277 > /dev/null");
		startcmd("ethreg -i eth0 0x690=0x0014026f > /dev/null");
		startcmd("ethreg -i eth0 0x69c=0x0014025f > /dev/null");

		/* P0-P4 port CVID=1*/
		$VTU_FUNC_REG0 = 0;

		//bits[5:4] for port 0
		$VTU_FUNC_REG0 += $tag * 16; //2^4
		startcmd("ethreg -i eth0 0x420=0x00010001 > /dev/null");

		//bits[7:6] for port 1
		if($lan1id==$vid) { $VTU_FUNC_REG0 += $untag * 64; }
		else { $VTU_FUNC_REG0 += $not_member * 64; }
		startcmd("ethreg -i eth0 0x428=0x00010001 > /dev/null");

		//bits[9:8] for port 2
		if($lan2id==$vid) { $VTU_FUNC_REG0 += $untag * 256; }
		else { $VTU_FUNC_REG0 += $not_member * 256; }
		startcmd("ethreg -i eth0 0x430=0x00010001 > /dev/null");

		//bits[11:10] for port 3
		if($lan3id==$vid) { $VTU_FUNC_REG0 += $untag * 1024; }
		else { $VTU_FUNC_REG0 += $not_member * 1024; }
		startcmd("ethreg -i eth0 0x438=0x00010001 > /dev/null");

		//bits[13:12] for port 4
		if($lan4id==$vid) { $VTU_FUNC_REG0 += $untag * 4096; }
		else { $VTU_FUNC_REG0 += $not_member * 4096; }
		startcmd("ethreg -i eth0 0x440=0x00010001 > /dev/null");

		//bits[15:14] for port 5
		$VTU_FUNC_REG0 += $not_member * 16384;
		startcmd("ethreg -i eth0 0x448=0x0".$vid_hex."0001 > /dev/null");

		//bits[17:16] for port 6
		$VTU_FUNC_REG0 += $not_member * 65536;

		//bit[19] : 1 = VID used to IVL, 0 = used to SVL.
		$VTU_FUNC_REG0 += 524288;

		/* VLAN(VID=1) with P0-P4*/
		startcmd("ethreg -i eth0 0x610=0x001".dec2strf("%05x", $VTU_FUNC_REG0)." > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x80010002 > /dev/null");

		/* VLAN(VID=2) with P0/P5*/
		startcmd("ethreg -i eth0 0x610=0x001bbfe0 > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x8".$vid_hex."0002 > /dev/null");

		/* insert tag to CPU port */
		startcmd("ethreg -i eth0 0x424=0x00002040 > /dev/null");
		/* remove tag to WAN/LAN port*/
		startcmd("ethreg -i eth0 0x42c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x434=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x43c=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x444=0x00001040 > /dev/null");
		startcmd("ethreg -i eth0 0x44c=0x00002040 > /dev/null");
		
		/* ARP response frame acknowledge disable P1-P5 */
		startcmd("ethreg -i eth0 0x214=0x00000000 > /dev/null");
		startcmd("ethreg -i eth0 0x210=0x00000000 > /dev/null");		
	}
}

function setup_vlaninf($dev,$VID,$macaddr)
{
	$devname = $dev.".".$VID;
	startcmd(
			"vconfig add ".$dev." ".$VID."; ".
			"ip link set ".$devname." addr ".$macaddr."; ".
			"ip link set ".$devname." up"
			);
	stopcmd("ip link set ".$devname." down; vconfig rem ".$devname);
}

function layout_bridge()
{
	SHELL_info($START, "LAYOUT: Start bridge layout ...");
	/* Start .......................................................................... */
	/* Config RTL8367 as bridge mode layout. */
	setup_switch("bridge");

	/* Using WAN MAC address during bridge mode. */
	$mac = PHYINF_getmacsetting("BRIDGE-1");
	if ($mac=="") $mac="00:de:fa:30:50:10";

	setup_vlaninf("eth0","1",$mac);
	setup_vlaninf("eth0","2",$mac);

	/* Create bridge interface. */
	startcmd("brctl addbr br0; brctl stp br0 off; brctl setfd br0 0");
	startcmd("brctl addif br0 eth0.1");
	startcmd("brctl addif br0 eth0.2");
	startcmd("ip link set br0 up");

	/* Setup the runtime nodes. */
	PHYINF_setup("ETH-1", "eth", "br0");
	
	/* check bridge ip type, static or dynamic */
	$path_br1_inet = XNODE_getpathbytarget("/inet", "entry", "uid", "INET-5", 0);
	$mode = query($path_br1_inet."/addrtype");
	
	if($mode == "ipv4")
	{
		$static_ip = query($path_br1_inet."/ipv4/static");
		
		if($static_ip == "1")	//StaticBridged
		{
			startcmd("xmldbc -X /inf:1/dhcps4");
		}
		else //DynamicBridged
		{
			startcmd("xmldbc -s /inf:1/dhcps4 DHCPS4-3");
		}
	}

	/* Done */
	startcmd("xmldbc -s /runtime/device/layout bridge");
	startcmd("usockc /var/gpio_ctrl BRIDGE");
	startcmd("service ENLAN start");
	startcmd("service PHYINF.ETH-1 alias PHYINF.BRIDGE-1");
	startcmd("service PHYINF.ETH-1 start");

	/* ip alias */
	$mactmp = cut($mac, 4, ":");  $mac4 = strtoul($mactmp, 16);
	$mactmp = cut($mac, 5, ":");  $mac5 = strtoul($mactmp, 16);
	/* skip 169.254.0.0 & 169.254.255.255 */
	if($mac4 == "0" && $mac5 == "0") $aip = "169.254.0.1";
	else if($mac4 == "255" && $mac5 == "255") $aip = "169.254.0.1";
	else $aip = "169.254.".$mac4.".".$mac5;
	startcmd("ifconfig br0 192.168.0.50 up");
	//startcmd("ifconfig br0:1 192.168.0.50 up");
	startcmd("ifconfig br0:2 ".$aip." up");

	/* The ip alias is to against the case of br0 can not obtain an available ip.
	 * In this case, we still can access our device through the ip alias.
	 */
	$p = XNODE_getpathbytarget("/runtime", "inf", "uid", "BRIDGE-1", 1);
	set($p."/ipalias/cnt",                  1);
	set($p."/ipalias/ipv4/ipaddr:1",                "192.168.0.50");
	set($p,"/phyinf","ETH-1");
	set($p."/devnam","br0");
	set($p."/inet/addrtype","ipv4");
	set($p."/inet/ipv4/valid","1");
	/*
	set($p."/inet/ipv4/ipaddr","192.168.0.50");
	set($p."/inet/ipv4/mask","24");
	
	set($p."/dhcps4/pool/start","192.168.0.100");
	set($p."/dhcps4/pool/end","192.168.0.199");
	set($p."/dhcps4/pool/leasetime","60");
	set($p."/dhcps4/pool/network","192.168.0.50");
	set($p."/dhcps4/pool/mask","24");
	set($p."/dhcps4/pool/router","192.168.0.50");
	*/
	/* set extension nodes for linkstatus, only use WAN port to check linkstatus */
	$p = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-1", 0);
	$wanindex = query("/device/router/wanindex");	if($wanindex == "") { $wanindex = "0"; }
	startcmd('xmldbc -x '.$p.'/linkstatus "get:psts -i '.$wanindex.'"');
	if($wanindex =="4")
	{
		startcmd('xmldbc -x '.$path.'/linkstatus:1 "get:psts -i 0"');
		startcmd('xmldbc -x '.$path.'/linkstatus:2 "get:psts -i 1"');
		startcmd('xmldbc -x '.$path.'/linkstatus:3 "get:psts -i 2"');
		startcmd('xmldbc -x '.$path.'/linkstatus:4 "get:psts -i 3"');
	}
	else
	{ 	//default wan index = 0
		startcmd('xmldbc -x '.$path.'/linkstatus:1 "get:psts -i 1"');
		startcmd('xmldbc -x '.$path.'/linkstatus:2 "get:psts -i 2"');
		startcmd('xmldbc -x '.$path.'/linkstatus:3 "get:psts -i 3"');
		startcmd('xmldbc -x '.$path.'/linkstatus:4 "get:psts -i 4"');
	}

	$wirelessmode = query("/device/wirelessmode");
	$existingnetwork=query("device/existingnetwork");

	if($wlanmode == "WirelessBridge")
	{
		add($p."/bridge/port",	"WIFISTA-1.1");
	}
	else if($wirelessmode == "WirelessAp")
	{
		add($p."/bridge/port",	"BAND24G-1.1");
		add($p."/bridge/port",	"BAND5G-1.1");
		add($p."/bridge/port",	"BAND24G-1.2");
		add($p."/bridge/port",	"BAND5G-1.2");
	}
	else
	{
		add($p."/bridge/port",	"BAND24G-1.1");
		add($p."/bridge/port",	"BAND5G-1.1");
		add($p."/bridge/port",  "WIFISTA-1.1");
		add($p."/bridge/port",  "WIFISTA-2.1");
	}

	/* Stop ........................................................................... */
	SHELL_info($STOP, "LAYOUT: Stop bridge layout ...");
	stopcmd("service PHYINF.ETH-1 stop");
	stopcmd("service PHYINF.BRIDGE-1 delete");
	stopcmd('xmldbc -s /runtime/device/layout ""');
	stopcmd("/etc/scripts/delpathbytarget.sh /runtime phyinf uid ETH-1");

	/* bridge wifi dev to br0 in WIFI_AP2G.php/WIFI_AP5G.php 's activateVAP() 2011.12.20 Daniel Chen */
	//stopcmd("brctl delif br0 rai0");
	//stopcmd("brctl delif br0 ra0");

	stopcmd("brctl delif br0 eth0.1");
	stopcmd("brctl delif br0 eth0.2");
	stopcmd("ip link set eth0.1 down");
	stopcmd("ip link set eth0.2 down");
	stopcmd("ifconfig br0:1 down");
	stopcmd("ip link set br0 down");
	stopcmd("brctl delbr br0");
	return 0;
}

function layout_router($mode)
{
	SHELL_info($START, "LAYOUT: Start router layout ...");

	/* VLAN Settings */
	$vlan_enable = get("","/device/vlan/active");
	$inter_vid   = get("","/device/vlan/interid");

	/* Start .......................................................................... */
	/* Config RTL8367 as router mode layout. (1 WAN + 4 LAN) */
	if($vlan_enable=="0") { setup_switch("router"); }
	else { set_internet_vlan("router", $inter_vid); }

	$wan1_eth = "eth0.2";
	if($vlan_enable=="0") { $wan1_eth = "eth0.2";}
	else { $wan1_eth = "eth0.".$inter_vid; }

	//+++ hendry, for wifi topology
	$p = XNODE_getpathbytarget("", "phyinf", "uid", "ETH-1", 0);
	set($p."/bridge/ports/entry:1/uid",		"MBR-1");
	set($p."/bridge/ports/entry:1/phyinf",	"BAND24G-1.1");
	set($p."/bridge/ports/entry:2/uid",		"MBR-2");
	set($p."/bridge/ports/entry:2/phyinf",	"BAND5G-1.1");
	$p = XNODE_getpathbytarget("", "phyinf", "uid", "ETH-2", 0);
	set($p."/bridge/ports/entry:1/uid",		"MBR-1");
	set($p."/bridge/ports/entry:1/phyinf",	"BAND24G-1.2");
	set($p."/bridge/ports/entry:2/uid",		"MBR-2");
	set($p."/bridge/ports/entry:2/phyinf",	"BAND5G-1.2");
	//--- hendry

	/* set smaller tx queue len */
	startcmd("ifconfig eth0 txqueuelen 200");

	/* Create bridge interface. */
	startcmd("brctl addbr br0; brctl stp br0 off; brctl setfd br0 0");

		/* [HNAT] br0 MUST has a IP address. */
		/* Update HNAT ssdk version 1.2.2
		$infp	= XNODE_getpathbytarget("", "inf", "uid", "LAN-1", 0);
		$inet	= query($infp."/inet");
		$inetp	= XNODE_getpathbytarget("/inet", "entry", "uid", $inet, 0);
		$ipaddr = query($inetp."/ipv4/ipaddr");
		if($ipaddr != "")
			startcmd("ifconfig br0 ".$ipaddr);
		else
			startcmd("ifconfig br0 192.168.0.1");
		*/

		/* Setup MAC address */
		$wanmac = PHYINF_getmacsetting("WAN-1");
		$lanmac = PHYINF_getmacsetting("LAN-1");

		setup_vlaninf("eth0","1",$lanmac);//jerry
		if($vlan_enable=="0") { setup_vlaninf("eth0","2",$wanmac); } //jerry
		else { setup_vlaninf("eth0",$inter_vid,$wanmac); } //jerry

	startcmd("brctl addif br0 eth0.1");

	startcmd("ip link set br0 up");
	if ($mode=="1W2L")
	{
		startcmd("brctl addbr br1; brctl stp br1 off; brctl setfd br1 0");
		//hendry, we let guestzone to bring br1 up
		//startcmd("ip link set br1 up");
	}

	/* Setup the runtime nodes. */
	if ($mode=="1W1L")
	{
		PHYINF_setup("ETH-1", "eth", "br0");
		PHYINF_setup("ETH-2", "eth", $wan1_eth);
		/* set Service Alias */
		startcmd('service PHYINF.ETH-1 alias PHYINF.LAN-1');
		startcmd('service PHYINF.ETH-2 alias PHYINF.WAN-1');
		/* WAN: set extension nodes for linkstatus */
		$path 	= XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-2", 0);
		$wanindex = query("/device/router/wanindex");	if($wanindex == "") { $wanindex = "0"; }
		startcmd('xmldbc -x '.$path.'/linkstatus "get:psts -i '.$wanindex.'"');
	}
	else if ($mode=="1W2L")
	{
		PHYINF_setup("ETH-1", "eth", "br0");
		PHYINF_setup("ETH-2", "eth", "br1");
		$wisp_mode = query("/device/wisp/enable");
		if($wisp_mode == "1")
			PHYINF_setup("ETH-3", "wifi", "ath1");
		else
			PHYINF_setup("ETH-3", "eth", $wan1_eth);
		/* set Service Alias */
		startcmd('service PHYINF.ETH-1 alias PHYINF.LAN-1');
		startcmd('service PHYINF.ETH-2 alias PHYINF.LAN-2');
		startcmd('service PHYINF.ETH-3 alias PHYINF.WAN-1');
		/* WAN: set extension nodes for linkstatus */
		$path = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-3", 0);
		$wanindex = query("/device/router/wanindex");	if($wanindex == "") { $wanindex = "0"; }
		startcmd('xmldbc -x '.$path.'/linkstatus "get:psts -i '.$wanindex.'"');
	}
	//+++ hendry
	$wisp_mode = query("/device/wisp/enable");
	$band24g_repeater = query("/device/repeater/band24g");
	$p = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-1", 0);
	add($p."/bridge/port",	"BAND24G-1.1");
	add($p."/bridge/port",	"BAND5G-1.1");
	if($band24g_repeater == 1 && $wisp_mode != "1"){
		add($p."/bridge/port",	"WIFISTA-1.1");
	}
	$p = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-2", 0);
	if($band24g_repeater != 1){
	add($p."/bridge/port",	"BAND24G-1.2");
	}
	add($p."/bridge/port",	"BAND5G-1.2");
	//--- hendry
	/* LAN: set extension nodes for linkstatus */
	$path = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-1", 0);
	if(query("/device/router/wanindex")=="4")
	{
		startcmd('xmldbc -x '.$path.'/linkstatus:1 "get:psts -i 0"');
		startcmd('xmldbc -x '.$path.'/linkstatus:2 "get:psts -i 1"');
		startcmd('xmldbc -x '.$path.'/linkstatus:3 "get:psts -i 2"');
		startcmd('xmldbc -x '.$path.'/linkstatus:4 "get:psts -i 3"');
	}
	else
	{ 	//default wan index = 0
		startcmd('xmldbc -x '.$path.'/linkstatus:1 "get:psts -i 1"');
		startcmd('xmldbc -x '.$path.'/linkstatus:2 "get:psts -i 2"');
		startcmd('xmldbc -x '.$path.'/linkstatus:3 "get:psts -i 3"');
		startcmd('xmldbc -x '.$path.'/linkstatus:4 "get:psts -i 4"');
	}

	/* Done */
	startcmd("xmldbc -s /runtime/device/layout router");
	startcmd("xmldbc -s /runtime/device/router/mode ".$mode);
	startcmd("usockc /var/gpio_ctrl ROUTER");
	startcmd("service PHYINF.ETH-1 start");
	startcmd("service PHYINF.ETH-2 start");
	if ($mode=="1W2L") startcmd("service PHYINF.ETH-3 start");

	/* Stop ........................................................................... */
	SHELL_info($STOP, "LAYOUT: Stop router layout ...");
	if ($mode=="1W2L")
	{
		stopcmd("service PHYINF.ETH-3 stop");
		stopcmd('service PHYINF.LAN-2 delete');
	}
	stopcmd("service PHYINF.ETH-2 stop");
	stopcmd("service PHYINF.ETH-1 stop");
	stopcmd('service PHYINF.WAN-1 delete');
	stopcmd('service PHYINF.LAN-1 delete');
	stopcmd('xmldbc -s /runtime/device/layout ""');
	stopcmd('/etc/scripts/delpathbytarget.sh /runtime phyinf uid ETH-1');
	stopcmd('/etc/scripts/delpathbytarget.sh /runtime phyinf uid ETH-2');
	stopcmd('/etc/scripts/delpathbytarget.sh /runtime phyinf uid ETH-3');
	//stopcmd('brctl delif br0 ra0');
	stopcmd('brctl delif br0 eth0.1');
	//stopcmd('brctl delif br1 ra1');
	stopcmd('ip link set eth0.1 down');
	if($vlan_enable=="1") { stopcmd('ip link set eth0.'.$inter_vid.' down'); }
	else { stopcmd('ip link set eth0.2 down'); }
	stopcmd('brctl delbr br0; brctl delbr br1');
	if($vlan_enable=="1") { stopcmd('vconfig rem eth0.1; vconfig rem eth0.'.$inter_vid); }
	else { stopcmd('vconfig rem eth0.1; vconfig rem eth0.2'); }
	return 0;
}

/* everything starts from here !! */
fwrite("w",$START, "#!/bin/sh\n");
fwrite("w", $STOP, "#!/bin/sh\n");

$ret = 9;
$layout	= query("/device/layout");

startcmd("ifconfig lo up");
stopcmd("ifconfig lo down");

startcmd("ip link set eth0 up");

if ($layout=="router")
{
	/* disable LAN port */
	//startcmd("/etc/scripts/lan_port.sh stop");

	/* only 1W1L & 1W2L supported for router mode. */
	$mode = query("/device/router/mode"); if ($mode!="1W1L") $mode = "1W2L";
	$ret = layout_router($mode);

	/* Start Hw_nat here */
	//startcmd("service HW_NAT start");
}
else if ($layout=="bridge")
{
	/* disable LAN port */
	//startcmd("/etc/scripts/lan_port.sh stop");

	$ret = layout_bridge();

	startcmd("service INFSVCS.BRIDGE-1 start");
	stopcmd("service INFSVCS.BRIDGE-1 stop");
}


error($ret);
?>
