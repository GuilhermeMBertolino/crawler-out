<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php"; 
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/inf.php"; 
$result = "OK";

// Solve arpmonitor refresh issue: The arpmonitor daemon would refresh "/runtime/mydlink/userlist" when it sense the client information is changed.
// If the refresh process is not complete and GetClientInfo get the information, the client information would be error.
// This is the root cause the client number may jump when the client number is too many which is reported by Alpha support Josh.
// We use mapping mydlink entry in runtime node to work around this issue.
function map_mydlink_entry()
{

	$mydlink_userlist_n = map("/runtime/mydlink/userlist/entry#", "", 0, "*", get("", "/runtime/mydlink/userlist/entry#"));
	$mydlink_userlist_n_old = map("/runtime/mydlink/userlist_map/userlist_entry_old", "", 0, "*", get("", "/runtime/mydlink/userlist_map/userlist_entry_old"));
	$GetClientInfo_uptime = map("/runtime/mydlink/userlist_map/uptime", "", 0, "*",get("", "/runtime/mydlink/userlist_map/uptime"));
	/*Add mac filter check. If setting macfilter, this mac's client can't show in client info.*/
	$listmap_path = "/runtime/mydlink/userlist_map/entry:";
	$macfilter = "false";
	$macf_cnt = 0;
	$macf_cnt = query("/acl/macctrl/count");
	if ($macf_cnt == "") $macf_cnt = 0;

	$uptime = get("", "/runtime/device/uptime");
	TRACE_debug("$uptime=".$uptime."  $GetClientInfo_uptime=".$GetClientInfo_uptime);
	if($uptime > $GetClientInfo_uptime + 10) //GetClientInfo at first time.
	{
		del("/runtime/mydlink/userlist_map");
		set("/runtime/mydlink/userlist_map/userlist_entry_old", $mydlink_userlist_n);
		set("/runtime/mydlink/userlist_map/entry_equal_n", 0);
		foreach("/runtime/mydlink/userlist/entry")
		{
			if ($macf_cnt > 0)
			{
				$i = 0;
				while($i<$macf_cnt)
				{
					$i++;
					TRACE_debug("arpmac=[".get("", "macaddr")."]"."aclmac=".query("/acl/macctrl/entry:".$i."/mac"));
					if (get("", "macaddr") != query("/acl/macctrl/entry:".$i."/mac"))
					{
						set($listmap_path.$InDeX."/ipv4addr",	get("", "ipv4addr"));
						set($listmap_path.$InDeX."/ipv6addr",	get("", "ipv6addr"));
						set($listmap_path.$InDeX."/macaddr",	get("", "macaddr"));
						set($listmap_path.$InDeX."/hostname",	get("", "hostname"));
						set($listmap_path.$InDeX."/infname",	get("", "infname"));
					}
				}
			}
			else
			{
				set("/runtime/mydlink/userlist_map/entry:".$InDeX."/ipv4addr",	get("", "ipv4addr"));
				set("/runtime/mydlink/userlist_map/entry:".$InDeX."/ipv6addr",	get("", "ipv6addr"));
				set("/runtime/mydlink/userlist_map/entry:".$InDeX."/macaddr",	get("", "macaddr"));
				set("/runtime/mydlink/userlist_map/entry:".$InDeX."/hostname",	get("", "hostname"));
				set("/runtime/mydlink/userlist_map/entry:".$InDeX."/infname",	get("", "infname"));
			}
		}
	}
	else
	{
		TRACE_debug("$mydlink_userlist_n=".$mydlink_userlist_n." $mydlink_userlist_n_old=".$mydlink_userlist_n_old."\n");
		if($mydlink_userlist_n != $mydlink_userlist_n_old)
		{
			set("/runtime/mydlink/userlist_map/userlist_entry_old", $mydlink_userlist_n);
			$entry_equal_n = 0;
		}
		else
		{
			$entry_equal_n = get("", "/runtime/mydlink/userlist_map/entry_equal_n");
			$entry_equal_n++;
		}

		if($entry_equal_n >= 2)
		{
			$entry_equal_n = 0;
			del("/runtime/mydlink/userlist_map");
			foreach("/runtime/mydlink/userlist/entry")
			{
				if ($macf_cnt > 0)
				{
					$i = 0;
					while($i<$macf_cnt)
					{
						$i++;
						TRACE_debug("arpmac=[".get("", "macaddr")."]"."aclmac=".query("/acl/macctrl/entry:".$i."/mac"));
						if (get("", "macaddr") != query("/acl/macctrl/entry:".$i."/mac"))
						{
							set($listmap_path.$InDeX."/ipv4addr",	get("", "ipv4addr"));
							set($listmap_path.$InDeX."/ipv6addr",	get("", "ipv6addr"));
							set($listmap_path.$InDeX."/macaddr",	get("", "macaddr"));
							set($listmap_path.$InDeX."/hostname",	get("", "hostname"));
							set($listmap_path.$InDeX."/infname",	get("", "infname"));
						}
					}
				}
				else
				{
					set("/runtime/mydlink/userlist_map/entry:".$InDeX."/ipv4addr",	get("", "ipv4addr"));
					set("/runtime/mydlink/userlist_map/entry:".$InDeX."/ipv6addr",	get("", "ipv6addr"));
					set("/runtime/mydlink/userlist_map/entry:".$InDeX."/macaddr",	get("", "macaddr"));
					set("/runtime/mydlink/userlist_map/entry:".$InDeX."/hostname",	get("", "hostname"));
					set("/runtime/mydlink/userlist_map/entry:".$InDeX."/infname",	get("", "infname"));
				}
			}
		}
		set("/runtime/mydlink/userlist_map/entry_equal_n", $entry_equal_n);
	}
	set("/runtime/mydlink/userlist_map/uptime", $uptime);
}

function check_wireless_client_num($macinfo)
{
	$index=0;
	foreach("/runtime/phyinf")
	{
		if(query("type")=="wifi")
		{
			$wlan_uid = query("uid");
			foreach("media/clients/entry")
			{
				$mac = tolower(query("macaddr"));
				if($macinfo == $mac) { $index++;  }
			}
		}
	}
	return $index;
}
// Modfiy to check wireless client info repeated exist in runtime node
// this issue will happened when user device connected to router first
// then change to another band manually ( ex: 2.4g -> 5g )
// use max uptime to get the device latest connected band
function find_wireless_client($macinfo)
{
	$uid="";
	$client_num=check_wireless_client_num($macinfo);
	
	if ($client_num ==1 )
	{
		foreach("/runtime/phyinf")
		{
			if(query("type")=="wifi")
			{
				$wlan_uid = query("uid");
				foreach("media/clients/entry")
				{
					$mac = tolower(query("macaddr"));
					if($macinfo == $mac) { $uid = $wlan_uid; break; }
				}
			}
		}
	}
	else if ($client_num > 1)
	{
		$max_uptime=0;
		foreach("/runtime/phyinf")
		{
			if(query("type")=="wifi")
			{
				$wlan_uid = query("uid");
				foreach("media/clients/entry")
				{
					$mac = tolower(query("macaddr"));
					$tmp_uptime = query("uptime");
					if($macinfo == $mac && $tmp_uptime > $max_uptime) 
					{ 
						$max_uptime = $tmp_uptime;
						$uid = $wlan_uid;  
					}
				}
			}
		}
	}
	TRACE_debug("[find_wl_client] uid=".$uid." uptime=".$max_uptime."\n");
	return $uid;
}

function find_arp_client($macinfo)
{
	$res = "false";
	foreach("/runtime/mydlink/userlist/entry")
	{
		$mac = tolower(query("macaddr"));
		if($macinfo == $mac) { $res = "true"; }
	}
	return $res;
}

function find_dhcps4_staticleases_info($mac, $getinfo, $LAN1, $LAN2)
{
	foreach("/dhcps4/entry")
	{
		$dhcps4_name = get("", "uid");
		foreach("staticleases/entry")
		{
			if(PHYINF_macnormalize($mac)==PHYINF_macnormalize(get("", "macaddr")))
			{
				if($getinfo=="nickname")	
				{return get("", "description");}
				else if($getinfo=="reserveip" && get("", "hostid")!="")
				{
					if($dhcps4_name==get("", INF_getinfpath($LAN1)."/dhcps4"))
					{return ipv4ip(INF_getcurripaddr($LAN1), INF_getcurrmask($LAN1), get("", "hostid"));}
					else
					{return	ipv4ip(INF_getcurripaddr($LAN2), INF_getcurrmask($LAN2), get("", "hostid"));}					
				}
			}
		}	
	}
	return "";
}

function getIPv6AddrByMAC($mac)
{
	$info_p = XNODE_getpathbytarget("/runtime/mydlink/".$_GLOBALS["userlist"],"entry", "macaddr",$mac,"0");
	if ($info_p == "")
	{ return ""; }
	return get("x",$info_p."/ipv6addr");
}

function clienttype($client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ)
{
	if($client == "") { return "LAN"; }
	if($client == $WLAN1) { $type = "WiFi_2.4G"; }
	else if($client == $WLAN1_GZ) { $type = "WiFi_2.4G_Guest"; }
	else if($client == $WLAN2 || $client == $WLAN3) { $type = "WiFi_5G"; }
	else if($client == $WLAN2_GZ || $client == $WLAN3_GZ) { $type = "WiFi_5G_Guest"; }
	else { $type = "LAN"; }
	
	return $type;
}

function clientband($client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ)
{
	if($client == "") { return ""; }
	if($client == $WLAN1 || $client == $WLAN1_GZ) { $band = "2.4GHz"; }
	else if($client == $WLAN2 || $client == $WLAN2_GZ || $client == $WLAN3 || $client == $WLAN3_GZ)
	{
		if($_GLOBALS["FEATURE_DUAL_BAND"] == 1) { $band = "5GHz"; }
		else if($_GLOBALS["FEATURE_TRI_BAND"] == 1)
		{
			if($client == $WLAN2 || $client == $WLAN2_GZ) { $band = "Pri.5GHz"; }
			else if($client == $WLAN3 || $client == $WLAN3_GZ) { $band = "Sec.5GHz"; }
		}
	}
	else { $band = ""; }
	
	return $band;
}

function clientinfo($mac, $ipaddr, $type, $hostname, $nickname, $reserveip, $band, $wlan_level, $index)
{
	echo "			<ClientInfo>\n";
	echo "				<MacAddress>".$mac."</MacAddress>\n";
	echo "				<IPv4Address>".$ipaddr."</IPv4Address>\n";
	echo "				<IPv6Address>".getIPv6AddrByMAC($mac)."</IPv6Address>\n";	//+++ HuanYao Kang.
	echo "				<Type>".$type."</Type>\n";
	if(isdomain($hostname)==0){
        echo "				<DeviceName>Unknown</DeviceName>\n";}
        else{
        echo "				<DeviceName>".$hostname."</DeviceName>\n";}
	echo "				<NickName>".$nickname."</NickName>\n";
	echo "				<ReserveIP>".$reserveip."</ReserveIP>\n";
	echo "				<Band>".$band."</Band>\n";	//Johnson add
	echo "				<SignalLevel>".$wlan_level."</SignalLevel>\n";	//Johnson add

	if(get("", "/runtime/device/iqos/enable") != "")
	{
		$qos_path = XNODE_getpathbytarget("/runtime/iqos/clients", "entry", "macaddr", toupper($mac), 0);
		TRACE_debug("qos_path=".$qos_path);
		echo "				<DeviceOS>".get("",$qos_path."/deviceos")."</DeviceOS>\n";
		echo "				<DeviceType>".get("",$qos_path."/devicetype")."</DeviceType>\n";
		echo "				<DeviceFamilyID>".get("",$qos_path."/devicefamily_id")."</DeviceFamilyID>\n";
		echo "				<AppCount>".map($qos_path."/app_count", "", "0", "*", get("",$qos_path."/app_count"))."</AppCount>\n";
		echo "				<DevDownByte>".map($qos_path."/total_down_byte", "", "0", "*", get("",$qos_path."/total_down_byte"))."</DevDownByte>\n";
		echo "				<DevUpByte>".map($qos_path."/total_up_byte", "", "0", "*", get("",$qos_path."/total_up_byte"))."</DevUpByte>\n";
	}
	echo "			</ClientInfo>\n";
}
function set_DeviceAttr($mac,$index)
{
	$MAC = toupper($mac);
	set("/runtime/bwc/bwcf/entry:".$index."/mac",$MAC);
	setattr("/runtime/bwc/bwcf/entry:".$index."/deviceos", "get", "iQoS2db ".$MAC." DEV_OS");
	setattr("/runtime/bwc/bwcf/entry:".$index."/devicetype", "get", "iQoS2db ".$MAC." DEV_TYPE");
	setattr("/runtime/bwc/bwcf/entry:".$index."/devicefamily", "get", "iQoS2db ".$MAC." DEV_FAMILY");
}
function getSignalStrength($macinfo)
{
	$level="";
	foreach("/runtime/phyinf")
	{
		if(query("type")=="wifi")
		{
			foreach("media/clients/entry")
			{
				$mac = tolower(query("macaddr"));
				if($macinfo == $mac) 
				{ 
					$rssi = query("rssi");
					if($rssi <= 20) {
						$level="low";
					} else if( $rssi > 20 && $rssi <=50) { 
						$level="mid";
					} else if( $rssi > 50 && $rssi <=85) {
						$level="high";
					} else if( $rssi > 85) {
						$level="high+";
					}
					return $level;
				}
			}
		}
	}
	return "";
}
function get_reserveip_count($LAN1)
{
	foreach("/dhcps4/entry")
	{
		$dhcps4_name = get("", "uid");
		
		if($dhcps4_name == get("", INF_getinfpath($LAN1)."/dhcps4"))
		{
			$cnt = get("", "staticleases/count");
			foreach("staticleases/entry")
			{
				if(get("", "enable") == 0)
				{
					$cnt--;
				}
			}	
			TRACE_debug("Reserved_cnt = ".$cnt);
		}
	}
	return $cnt;
}
$IQoSEnable = get("", "/runtime/device/iqos/enable");
$QoSEnable = get("", "/bwc/entry:1/enable");
if($IQoSEnable=="1" && $QoSEnable=="1")	{$IQoSEnable="true";}
else {$IQoSEnable="false";}
if($result == "OK" && $IQoSEnable == "true")
{
	fwrite("w",$ShellPath, "#!/bin/sh\n");
	fwrite("a",$ShellPath, "iQoS2db get_device all > /dev/console\n");
}
?>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}?>
<GetClientInfoResponse xmlns="http://purenetworks.com/HNAP1/">
	<GetClientInfoResult><?=$result?></GetClientInfoResult>
	<? echo "<Reserved_cnt>".get_reserveip_count($LAN1)."</Reserved_cnt>";?>
		<IQoSEnable><? echo $IQoSEnable;?></IQoSEnable>
		<ClientInfoLists>
		<?
		
		/* It shows LAN and wireless Host Zone STA are from to the same interface eth0.1 due to accelerate when we use brctl command,
		   so it is hard to verify the client from br0 are eth0 or wifig0, wifia0, wifia1.
		   This also cause Guest Zone STA show in the Primay block.
		   Now we use /runtime/phyinf node instead of brctl command to check client is from wireless or LAN. */

		/* This section should be applied no matter MYDLINK service is supported or not, make a fake $mydlin_ver so it always be applied */
//		$mydlin_ver = fread("s", "/mydlink/version");
		$mydlin_ver = "null";
		if($mydlin_ver != "")
		{
			map_mydlink_entry(); // Solve arpmonitor refresh issue
			$userlist = "userlist_map"; // If $userlist = "userlist_map", map_mydlink_entry() function would take effect.
			$_GLOBALS["userlist"] = $userlist;

			/* MAC OS 10.7 would not supply hostname in DHCP process. It could not get the hostname in /runtime/inf(LAN-1)/dhcps4/leases.
	  	   However, Mydlink service would use Netbios to get the client information include hostname and the information from static client. */
			foreach("/runtime/mydlink/".$userlist."/entry")
			{
				$ipaddr = query("ipv4addr");
				$macaddr = query("macaddr");
				$wlan_client = find_wireless_client($macaddr);
				$type = clienttype($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
				$hostname = query("hostname");
				$nickname = find_dhcps4_staticleases_info($macaddr, "nickname", $LAN1, $LAN2);
				$reserveip = find_dhcps4_staticleases_info($macaddr, "reserveip", $LAN1, $LAN2);
				$band = clientband($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
				$wlan_level = getSignalStrength($macaddr);
				clientinfo($macaddr, $ipaddr, $type, $hostname, $nickname, $reserveip, $band, $wlan_level, $InDeX);
			}
			// Add value "OFFLINE" of Type in struct ClientInfo, for indicating reserved IP clients which is not connected to fit the HNAP SPEC. "D-Link HNAP Extension - 20141215v1.32.pdf".
			foreach("/dhcps4/entry")
			{
				foreach("staticleases/entry")
				{
					$mac_reserved = get("", "macaddr");
					$runtime_mydlink_userlist_path = XNODE_getpathbytarget("/runtime/mydlink/".$userlist, "entry", "macaddr", $mac_reserved, 0);
					TRACE_debug("$mac_reserved=".$mac_reserved."\n$runtime_mydlink_userlist_path=".$runtime_mydlink_userlist_path);
					if($runtime_mydlink_userlist_path=="" && get("", "hostid")!="")
					{
						echo "	<ClientInfo>\n";
						echo "		<MacAddress>".$mac_reserved."</MacAddress>\n";
						echo "		<IPv4Address></IPv4Address>\n";
						echo "		<IPv6Address></IPv6Address>\n";
						echo "		<Type>OFFLINE</Type>\n";
						echo "		<DeviceName>".get("", "hostname")."</DeviceName>\n";
						echo "		<NickName>".get("", "description")."</NickName>\n";
						echo "		<ReserveIP>".find_dhcps4_staticleases_info($mac_reserved, "reserveip", $LAN1, $LAN2)."</ReserveIP>\n";
						echo "	</ClientInfo>\n";
					}
				}
			}
			
		/* Mydlink service only get br0's arp , we temporarily use br1's DHCP client for Guest Zone information. */
		/*TODO:use arp table to display guest zone.*/
			$LAN=$LAN2;
			while($LAN != "")
			{		
				$path = XNODE_getpathbytarget("/runtime", "inf", "uid", $LAN, 0);
				foreach($path."/dhcps4/leases/entry")
				{
					$ipaddr = query("ipaddr");
					$macaddr = query("macaddr");
					set_DeviceAttr($macaddr, $InDeX);
					$arp_client = find_arp_client($macaddr);
					if($arp_client == "true") break;
					$wlan_client = find_wireless_client($macaddr);
					$type = clienttype($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
					$hostname = query("hostname");
					$nickname = find_dhcps4_staticleases_info($macaddr, "nickname", $LAN1, $LAN2);
					$reserveip = find_dhcps4_staticleases_info($macaddr, "reserveip", $LAN1, $LAN2);
					$band = clientband($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
					$wlan_level = getSignalStrength($macaddr);
					if($type != "LAN")
					clientinfo($macaddr, $ipaddr, $type, $hostname, $nickname, $reserveip, $band, $wlan_level, $InDeX);
				}
				break;		
			}
			
		}
		else
		{
			/* If Mydlink service is not supported get the DHCP client information from our DHCP leases. */
			$LAN=$LAN1;
			while($LAN != "")
			{		
				$path = XNODE_getpathbytarget("/runtime", "inf", "uid", $LAN, 0);
				foreach($path."/dhcps4/leases/entry")
				{
					$ipaddr = query("ipaddr");
					$macaddr = query("macaddr");
					$wlan_client = find_wireless_client($macaddr);
					$type = clienttype($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
					$hostname = query("hostname");
					$nickname = find_dhcps4_staticleases_info($macaddr, "nickname", $LAN1, $LAN2);
					$reserveip = find_dhcps4_staticleases_info($macaddr, "reserveip", $LAN1, $LAN2);
					$band = clientband($wlan_client, $WLAN1, $WLAN1_GZ, $WLAN2, $WLAN2_GZ, $WLAN3, $WLAN3_GZ);
					$wlan_level = getSignalStrength($macaddr);
					clientinfo($macaddr, $ipaddr, $type, $hostname, $nickname, $reserveip, $band, $wlan_level, $InDeX);
				}
							
				if($LAN==$LAN1)	{$LAN = $LAN2;}
				else			{$LAN = "";}
			}
		}
		?>
		</ClientInfoLists>
		<AppInfoLists>
		<?
		$appinfo=false;
		if(get("", "/runtime/device/iqos/enable") != "")
		{
			foreach("/runtime/iqos/clients/entry")
			{
				$macaddr = get("", "macaddr");
				if(get("", "app_count")!=0)
				{
					$appinfo=true;
					foreach("apps/entry")
					{
						echo "				<AppInfo>\n";
						echo "					<MacAddress>".$macaddr."</MacAddress>\n";
						echo "					<CatName>".get("","cat_name")."</CatName>\n";
						echo "					<AppName>".get("","app_name")."</AppName>\n";
						echo "					<DownByte>".get("","downlink_byte")."</DownByte>\n";
						echo "					<UpByte>".get("","uplink_byte")."</UpByte>\n";
						echo "				</AppInfo>\n";
					}
				}
			}
		}
		if($appinfo==false)
		{
			echo "				<AppInfo>\n";
			echo "				</AppInfo>\n";
		}
		?>
		</AppInfoLists>
</GetClientInfoResponse>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}?>
