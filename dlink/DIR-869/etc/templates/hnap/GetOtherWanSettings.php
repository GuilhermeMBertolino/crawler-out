<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/encrypt.php";

$path_inf_wan1 = XNODE_getpathbytarget("", "inf", "uid", $WAN1, 0);
$path_inf_wan2 = XNODE_getpathbytarget("", "inf", "uid", $WAN2, 0);

$wan1_inet = query($path_inf_wan1."/inet"); 
$wan2_inet = query($path_inf_wan2."/inet");

$path_wan1_inet = XNODE_getpathbytarget("/inet", "entry", "uid", $wan1_inet, 0);
$path_wan2_inet = XNODE_getpathbytarget("/inet", "entry", "uid", $wan2_inet, 0);

$wan1_phyinf = query($path_inf_wan1."/phyinf");
$path_wan1_phyinf  = XNODE_getpathbytarget("", "phyinf", "uid", $wan1_phyinf, 0);

$path_run_inf_wan1 = XNODE_getpathbytarget("/runtime", "inf", "uid", $WAN1, 0);

$Type        = "";
$Username    = "";
$Password    = "";
$MaxIdletime = 0;
$ServiceName = "";
$AutoReconnect = "false";
$MacCloneEnable = "false";

$layout = query("/device/layout");


	//InitPpp4Value	
	if(query($path_wan1_inet."/ppp4/over") == "eth")
	{
		anchor($path_wan1_inet."/ppp4");
		if(query("static") == 1)
		{
			$Type	= "StaticPPPoE";
			
			$ppp_ipaddr = query("ipaddr");
		}
		else
		{
			$Type	= "DHCPPPPoE";
			//$ipaddr = query($path_run_inf_wan1."/inet/ppp4/local"); 
		}

		$Username = get("","username");
		$Password = get("","password");
		$ServiceName = get("","pppoe/servicename");

		$dialup_mode = query("dialup/mode");
		if($dialup_mode == "auto")
		{
			$AutoReconnect = "true";
		}
		
		if(query("dialup/idletimeout") != "")
		{
			$MaxIdletime = query("dialup/idletimeout") * 60;
		}
		else
			$MaxIdletime = 300; //5*60

		$ppp_dns1 = query("dns/entry");
		$ppp_dns2 = query("dns/entry:2");

		$PPP_MTU=query("mtu");
		if(query($path_wan1_phyinf."/macaddr")!="")
		{
			$mac=query($path_wan1_phyinf."/macaddr");
			$MacCloneEnable = "true";
		}
	}
	else if(query($path_wan1_inet."/ppp4/over") == "pptp")
	{
		anchor($path_wan2_inet."/ipv4");
		if(query("static") == 1)
		{
			$Type = "StaticPPTP";
		
			$ppp_ipaddr  = query("ipaddr");
			$ppp_mask    = ipv4int2mask(query("mask"));
			$ppp_gateway = query("gateway");
		}
		else
		{
			$Type = "DynamicPPTP";
		}

		$ServiceName = get("",$path_wan1_inet."/ppp4/pptp/server");
		$Username = get("",$path_wan1_inet."/ppp4/username");
		$Password = get("",$path_wan1_inet."/ppp4/password");

		$ppp_dns1 = query($path_wan1_inet."/ppp4/dns/entry");
		$ppp_dns2 = query($path_wan1_inet."/ppp4/dns/entry:2");

		$dialup_mode = query($path_wan1_inet."/ppp4/dialup/mode");
		if($dialup_mode == "auto")
		{
			$AutoReconnect = "true";
		}
		$MaxIdletime = query($path_wan1_inet."/ppp4/dialup/idletimeout") * 60;

		$PPP_MTU = query($path_wan1_inet."/ppp4/mtu");
	}
	else if(query($path_wan1_inet."/ppp4/over") == "l2tp")
	{
		anchor($path_wan2_inet."/ipv4");

		if(query("static") == 1)
		{
			$Type = "StaticL2TP";
			
			$ppp_ipaddr  = query("ipaddr");		
			$ppp_mask    = ipv4int2mask(query("mask"));
			$ppp_gateway = query("gateway");
		}
		else
		{
			$Type = "DynamicL2TP";
		}

		$ServiceName = get("",$path_wan1_inet."/ppp4/l2tp/server");
		$Username = get("",$path_wan1_inet."/ppp4/username");
		$Password = get("",$path_wan1_inet."/ppp4/password");

		$ppp_dns1 = query($path_wan1_inet."/ppp4/dns/entry");
		$ppp_dns2 = query($path_wan1_inet."/ppp4/dns/entry:2");

		$dialup_mode = query($path_wan1_inet."/ppp4/dialup/mode");
		if($dialup_mode == "auto")
		{
			$AutoReconnect = "true";
		}
		$MaxIdletime = query($path_wan1_inet."/ppp4/dialup/idletimeout") * 60;

		$PPP_MTU = query($path_wan1_inet."/ppp4/mtu");
	}


	//InitIpv4Value
	if(query($path_wan1_inet."/ipv4/ipaddr") == "")	//Dhcp
	{
		$ipaddr  = "";
		$gateway = "";
		$mask    = "";
		$dns1    = "";
		$dns2    = "";
		$MTU     = query($path_wan1_inet."/ipv4/mtu");
		
		if(query($path_wan1_phyinf."/macaddr")!="")
		{
			$mac=query($path_wan1_phyinf."/macaddr");
			$MacCloneEnable = "true";
		}
	}
	else	//Static     
	{
		anchor($path_wan1_inet."/ipv4");

		$ipaddr  = query("ipaddr");
		$mask    = ipv4int2mask(query("mask"));
		$gateway = query("gateway");

		$dns1    = query("dns/entry");
		$dns2    = query("dns/entry:2");

		$MTU     = query("mtu");

		if(query($path_wan1_phyinf."/macaddr")!="")
		{
			$mac=query($path_wan1_phyinf."/macaddr");
			$MacCloneEnable = "true";
		}
	}
	
?>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}?>
		<GetOtherWanSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
			<GetOtherWanSettingsResult>OK</GetOtherWanSettingsResult>
			<Type><?=$Type?></Type>
			<Username><? echo escape("x",$Username); ?></Username>
			<Password><? echo AES_Encrypt128($Password); ?></Password>
			<MaxIdleTime><?=$MaxIdletime?></MaxIdleTime>
			<HostName><? echo get("x", "/device/hostname_dhcpc");?></HostName>
			<ServiceName><? echo escape("x",$ServiceName); ?></ServiceName>
			<AutoReconnect><?=$AutoReconnect?></AutoReconnect>
			<IPAddress><?=$ipaddr?></IPAddress>
			<SubnetMask><?=$mask?></SubnetMask>
			<Gateway><?=$gateway?></Gateway>
			<StaticPPP>
				<IPAddress><?=$ppp_ipaddr?></IPAddress>
				<SubnetMask><?=$ppp_mask?></SubnetMask>
				<Gateway><?=$ppp_gateway?></Gateway>
			</StaticPPP>
			<ConfigDNS>
				<Primary><?=$dns1?></Primary>
				<Secondary><?=$dns2?></Secondary>
			</ConfigDNS>
			<ConfigDNS>
				<Primary><?=$ppp_dns1?></Primary>
				<Secondary><?=$ppp_dns2?></Secondary>
			</ConfigDNS>
			<MacAddress><?=$mac?></MacAddress>
			<MacCloneEnable><?=$MacCloneEnable?></MacCloneEnable>
			<MTU><?=$MTU?></MTU>
			<PPPMTU><?=$PPP_MTU?></PPPMTU>
			<DsLite_Configuration><?=$DsLite_Configuration?></DsLite_Configuration>
			<DsLite_AFTR_IPv6Address><?=$DsLite_AFTR_IPv6Address?></DsLite_AFTR_IPv6Address>
			<DsLite_B4IPv4Address><?=$DsLite_B4IPv4Address?></DsLite_B4IPv4Address>
			<RussiaPPP>
				<Type><?=$Ruppp_Type?></Type>
				<IPAddress><?=$Ruppp_IPAddress?></IPAddress>
				<SubnetMask><?=$Ruppp_SubnetMask?></SubnetMask>
				<Gateway><?=$Ruppp_Gateway?></Gateway>
				<DNS>
					<Primary><?=$Ruppp_PriDns?></Primary>
					<Secondary><?=$Ruppp_SecDns?></Secondary>
				</DNS>
			</RussiaPPP>
		</GetOtherWanSettingsResponse>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}?>
