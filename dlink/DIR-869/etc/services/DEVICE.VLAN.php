<?
//include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/phyinf.php";

fwrite("w",$START, "#!/bin/sh\n");
fwrite("w", $STOP, "#!/bin/sh\n");

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}

function wifi_check($uid)
{
	$wifi_enable = 0;

	foreach("/phyinf")
	{
		if (query("active") == "1" && query("uid") == $uid )
		{
			$wifi_enable = 1;
		}
	}
	return $wifi_enable;
}

function setWIFIvlan($vid,$wifi_uid,$wifi_vid,$val)
{
	if($wifi_vid==$vid && wifi_check($wifi_uid) == 1)
		return $val;
	else
		return 0;
}

function setWIFI_gz_vlan($vid,$wifi_uid,$wifi_vid,$host_uid,$val)
{
	//if host zone wifi is disabled, no need to check guest zone wifi.
	if($wifi_vid==$vid && wifi_check($host_uid) == 1 && wifi_check($wifi_uid) == 1)
		return $val;
	else
		return 0;
}

function setvlan($vid,$prio,$br_type,$br_num,$br_ip,$24Ginf,$5Ginf,$br_gz_type,$gz24inf,$gz5inf)
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

	/* Priority */
	$prio_val = 0;
	if($prio=="none" || $prio=="0")
	{
		//Default priority or vlan priority disabled.
		$prio_val = 0;
	}
	else
	{
		if($prio=="1")		$prio_val = 1 * 2;
		else if($prio=="2")	$prio_val = 2 * 2;
		else if($prio=="3")	$prio_val = 3 * 2;
		else if($prio=="4")	$prio_val = 4 * 2;
		else if($prio=="5")	$prio_val = 5 * 2;
		else if($prio=="6")	$prio_val = 6 * 2;
		else if($prio=="7")	$prio_val = 7 * 2;
	}

	$vid_hex = dec2strf("%03x", $vid);
	$prio_hex = dec2strf("%x", $prio_val);

	/* P0-P4 port CVID=1*/
	$has_member = 0;
	$VTU_FUNC_REG0 = 0;

	//bits[5:4] for port 0
	$VTU_FUNC_REG0 += $tag * 16; //2^4

	//bits[7:6] for port 1
	if($lan1id==$vid)
	{
		$has_member = 1;
		$VTU_FUNC_REG0 += $untag * 64;
		startcmd("ethreg -i eth0 0x428=0x".$prio_hex.$vid_hex."0001 > /dev/null");
	}
	else { $VTU_FUNC_REG0 += $not_member * 64; }

	//bits[9:8] for port 2
	if($lan2id==$vid)
	{
		$has_member = 1;
		$VTU_FUNC_REG0 += $untag * 256;
		startcmd("ethreg -i eth0 0x430=0x".$prio_hex.$vid_hex."0001 > /dev/null");
	}
	else { $VTU_FUNC_REG0 += $not_member * 256; }

	//bits[11:10] for port 3
	if($lan3id==$vid)
	{
		$has_member = 1;
		$VTU_FUNC_REG0 += $untag * 1024;
		startcmd("ethreg -i eth0 0x438=0x".$prio_hex.$vid_hex."0001 > /dev/null");
	}
	else { $VTU_FUNC_REG0 += $not_member * 1024; }

	//bits[13:12] for port 4
	if($lan4id==$vid)
	{
		$has_member = 1;
		$VTU_FUNC_REG0 += $untag * 4096;
		startcmd("ethreg -i eth0 0x440=0x".$prio_hex.$vid_hex."0001 > /dev/null");
	}
	else { $VTU_FUNC_REG0 += $not_member * 4096; }

	//bits[15:14] for port 5
	$VTU_FUNC_REG0 += $tag * 16384;

	//bits[17:16] for port 6
	$VTU_FUNC_REG0 += $not_member * 65536;

	//bit[19] : 1 = VID used to IVL, 0 = used to SVL.
	$VTU_FUNC_REG0 += 524288;

	//means LAN side or WiFi are using internet VLAN
	if($has_member > 0 || $br_type > 0 || $br_gz_type > 0)
	{
		/* VLAN(VID=$vid) with P0-P4*/
		startcmd("ethreg -i eth0 0x610=0x001".dec2strf("%05x", $VTU_FUNC_REG0)." > /dev/null");
		startcmd("ethreg -i eth0 0x614=0x8".$vid_hex."0002 > /dev/null");

		startcmd('vconfig add eth0 '.$vid);
		startcmd('ip link set eth0.'.$vid.' up');

		$br_already_set = 0;
		if($br_type > 0 || $br_gz_type > 0)
		{
			startcmd('brctl addbr '.$br_num);
			startcmd('brctl stp '.$br_num.' off');
			startcmd('brctl setfd '.$br_num.' 0');
			if($br_type == 3)
			{
				startcmd('brctl delif br0 '.$24Ginf);
				startcmd('brctl delif br0 '.$5Ginf);
				startcmd('brctl addif '.$br_num.' '.$24Ginf);
				startcmd('brctl addif '.$br_num.' '.$5Ginf);
				startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
				startcmd('ip link set '.$br_num.' up');
				PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				$br_already_set = 1;
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",	"BAND24G-1.1");
					add($q."/bridge/port",	"BAND5G-1.1");
				}

				stopcmd('brctl delif '.$br_num.' '.$24Ginf);
				stopcmd('brctl delif '.$br_num.' '.$5Ginf);
				stopcmd('brctl addif br0 '.$24Ginf);
				stopcmd('brctl addif br0 '.$5Ginf);
				
			}
			else if($br_type == 2)
			{
				startcmd('brctl delif br0 '.$5Ginf);
				startcmd('brctl addif '.$br_num.' '.$5Ginf);
				startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
				startcmd('ip link set '.$br_num.' up');
				PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				$br_already_set = 1;
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",	"BAND5G-1.1");
				}

				stopcmd('brctl delif '.$br_num.' '.$5Ginf);
				stopcmd('brctl addif br0 '.$5Ginf);
			}
			else if($br_type == 1)
			{
				startcmd('brctl delif br0 '.$24Ginf);
				startcmd('brctl addif '.$br_num.' '.$24Ginf);
				startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
				startcmd('ip link set '.$br_num.' up');
				PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				$br_already_set = 1;
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",	"BAND24G-1.1");
				}

				stopcmd('brctl delif '.$br_num.' '.$24Ginf);
				stopcmd('brctl addif br0 '.$24Ginf);
			}

			if($br_gz_type == 3)
			{
				startcmd('brctl delif br1 '.$gz24inf);
				startcmd('brctl delif br1 '.$gz5inf);
				startcmd('brctl addif '.$br_num.' '.$gz24inf);
				startcmd('brctl addif '.$br_num.' '.$gz5inf);
				if($br_already_set == 0)
				{
					startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
					startcmd('ip link set '.$br_num.' up');
					PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				}
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",  "BAND24G-1.2");
					add($q."/bridge/port",  "BAND5G-1.2");
				}

				stopcmd('brctl delif '.$br_num.' '.$gz24inf);
				stopcmd('brctl delif '.$br_num.' '.$gz5inf);
				stopcmd('brctl addif br1 '.$gz24inf);
				stopcmd('brctl addif br1 '.$gz5inf);
				
			}
			else if($br_gz_type == 2)
			{
				startcmd('brctl delif br1 '.$gz5inf);
				startcmd('brctl addif '.$br_num.' '.$gz5inf);
				if($br_already_set == 0)
				{
					startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
					startcmd('ip link set '.$br_num.' up');
					PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				}
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",	"BAND5G-1.2");
				}

				stopcmd('brctl delif '.$br_num.' '.$gz5inf);
				stopcmd('brctl addif br1 '.$gz5inf);
			}
			else if($br_gz_type == 1)
			{
				startcmd('brctl delif br1 '.$gz24inf);
				startcmd('brctl addif '.$br_num.' '.$gz24inf);
				if($br_already_set == 0)
				{
					startcmd('ifconfig '.$br_num.' '.$br_ip.' netmask 255.255.255.255');
					startcmd('ip link set '.$br_num.' up');
					PHYINF_setup("ETH-".$br_num, "eth", $br_num);
				}
				$q = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-".$br_num, 0);
				if($q!="")
				{
					add($q."/bridge/port",	"BAND24G-1.2");
				}

				stopcmd('brctl delif '.$br_num.' '.$gz24inf);
				stopcmd('brctl addif br1 '.$gz24inf);
			}
			startcmd('brctl addif '.$br_num.' eth0.'.$vid);
			stopcmd('brctl delif '.$br_num.' eth0.'.$vid);
			stopcmd('ip link set '.$br_num.' down');
			stopcmd('brctl delbr '.$br_num);
		}

		if($prio!="none" && $prio!="0")
		{
			$map_index=0;
			while ($map_index < 8)
			{
				startcmd("vconfig set_egress_map eth0.".$vid." ".$map_index." ".$prio);
				$map_index++;
			}
		}

		stopcmd('ip link set eth0.'.$vid.' down');
		stopcmd('vconfig rem eth0.'.$vid);
	}
}

function set_runtime_phyinf($eth_uid,$br_voip_num,$br_iptv_num,$wifi24G_uid,$wifi5G_uid)
{
	$wifi24G_node=1;
	$wifi5G_node=1;
	$p="";

	if($br_voip_num > 0 || $br_iptv_num > 0)
	{
		$p = XNODE_getpathbytarget("/runtime", "phyinf", "uid",$eth_uid, 0);

		if($br_voip_num == 3 || $br_iptv_num == 3)
		{
			$wifi24G_node=0;
			$wifi5G_node=0;
		}
		if($br_voip_num == 2 || $br_iptv_num == 2)
		{
			$wifi5G_node=0;
		}
		if($br_voip_num == 1 || $br_iptv_num == 1)
		{
			$wifi24G_node=0;
		}

		if($p!="")
		{
				del($p."/bridge/port:2");
				del($p."/bridge/port:1");
				if($wifi24G_node==1)	add($p."/bridge/port",	$wifi24G_uid);
				if($wifi5G_node==1)		add($p."/bridge/port",	$wifi5G_uid);
		}
	}
}

/// Main start
$vlan_enable	= query("/device/vlan/active");
$vlan_prio_en	= query("/device/vlan/active_priority");
$layout		= query("/device/layout");

$voipid		= query("/device/vlan/voipid");
$iptvid		= query("/device/vlan/iptvid");
$voip_priority	= query("/device/vlan/voip_priority");
$iptv_priority	= query("/device/vlan/iptv_priority");

$vwlan_path = "/device/vlan/wlanport/";
$wlan01vid = query($vwlan_path."wlan01");
$wlan02vid = query($vwlan_path."wlan02");
$wlan11vid = query($vwlan_path."wlan11");
$wlan12vid = query($vwlan_path."wlan12");

$wlan01uid = "BAND24G-1.1";
$wlan02uid = "BAND24G-1.2";
$wlan11uid = "BAND5G-1.1";
$wlan12uid = "BAND5G-1.2";

$wlan01inf = "ath0";
$wlan02inf = "ath1";
$wlan11inf = "ath2";
$wlan12inf = "ath3";

$voip_br_num = "br2";
$voip_br_ip = "1.0.0.249";
$iptv_br_num = "br3";
$iptv_br_ip = "1.0.1.249";

$smartconnect = query("/device/features/smartconnect");

if($vlan_enable == "1" && $layout == "router")
{
	$br_voip    = 0;//0:none 1:2.4G 2:5G 3:BOTH
	$br_iptv    = 0;//0:none 1:2.4G 2:5G 3:BOTH
	$br_voip_gz = 0;//Guest Zone  0:none 1:2.4G 2:5G 3:BOTH
	$br_iptv_gz = 0;//Guest Zone  0:none 1:2.4G 2:5G 3:BOTH

	if($smartconnect == "0" || $smartconnect == "")
	{
		$br_voip += setWIFIvlan($voipid,$wlan01uid,$wlan01vid,1);
		$br_voip += setWIFIvlan($voipid,$wlan11uid,$wlan11vid,2);
		$br_voip_gz += setWIFI_gz_vlan($voipid,$wlan02uid,$wlan02vid,$wlan01uid,1);
		$br_voip_gz += setWIFI_gz_vlan($voipid,$wlan12uid,$wlan12vid,$wlan11uid,2);

		$br_iptv += setWIFIvlan($iptvid,$wlan01uid,$wlan01vid,1);
		$br_iptv += setWIFIvlan($iptvid,$wlan11uid,$wlan11vid,2);
		$br_iptv_gz += setWIFI_gz_vlan($iptvid,$wlan02uid,$wlan02vid,$wlan01uid,1);
		$br_iptv_gz += setWIFI_gz_vlan($iptvid,$wlan12uid,$wlan12vid,$wlan11uid,2);
	}
	else
	{
		$br_voip += setWIFIvlan($voipid,$wlan01uid,$wlan01vid,1);
		$br_voip += setWIFIvlan($voipid,$wlan11uid,$wlan01vid,2);
		$br_voip_gz += setWIFI_gz_vlan($voipid,$wlan02uid,$wlan02vid,$wlan01uid,1);
		$br_iptv_gz += setWIFI_gz_vlan($iptvid,$wlan12uid,$wlan12vid,$wlan11uid,2);

		$br_iptv += setWIFIvlan($iptvid,$wlan01uid,$wlan01vid,1);
		$br_iptv += setWIFIvlan($iptvid,$wlan11uid,$wlan01vid,2);
		$br_iptv_gz += setWIFI_gz_vlan($iptvid,$wlan02uid,$wlan02vid,$wlan01uid,1);
		$br_iptv_gz += setWIFI_gz_vlan($iptvid,$wlan12uid,$wlan02vid,$wlan11uid,2);
	}

	set("/device/vlan/iptv_br",$br_iptv);//0:none 1:2.4G 2:5G 3:BOTH
	set("/device/vlan/voip_br",$br_voip);//0:none 1:2.4G 2:5G 3:BOTH
	set("/device/vlan/iptv_gz_br",$br_iptv_gz);//0:none 1:2.4G 2:5G 3:BOTH
	set("/device/vlan/voip_gz_br",$br_voip_gz);//0:none 1:2.4G 2:5G 3:BOTH

	if($vlan_prio_en!="1")
	{
		$voip_priority = "none";
		$iptv_priority = "none";
	}

	setvlan($voipid,$voip_priority,$br_voip,$voip_br_num,$voip_br_ip,$wlan01inf,$wlan11inf,$br_voip_gz,$wlan02inf,$wlan12inf);
	setvlan($iptvid,$iptv_priority,$br_iptv,$iptv_br_num,$iptv_br_ip,$wlan01inf,$wlan11inf,$br_iptv_gz,$wlan02inf,$wlan12inf);

	set_runtime_phyinf("ETH-1",$br_voip,$br_iptv,$wlan01uid,$wlan11uid);
	set_runtime_phyinf("ETH-2",$br_voip_gz,$br_iptv_gz,$wlan02uid,$wlan12uid);
}
else
{
	startcmd('echo "START.sh:VLAN is disabled" > /dev/console');
	stopcmd('echo "STOP.sh:VLAN is disabled" > /dev/console');
}

/* Done */
fwrite("a",$START, "exit 0\n");
fwrite("a", $STOP, "exit 0\n");
?>
