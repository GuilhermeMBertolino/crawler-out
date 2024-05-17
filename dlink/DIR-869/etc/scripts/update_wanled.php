<?
//this script needs argument EVENT, we need this to control WAN LED

include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/etc/services/PHYINF/phywifi.php";

echo "#!/bin/sh\n";

$layout	= query("/device/layout");
$existingnetwork = query("device/existingnetwork");


function bridge_has_ip()
{
	$wan_inf = XNODE_getpathbytarget("/runtime", "inf", "uid", "BRIDGE-1", 0);
	if($wan_inf == "")
		return 0;

	$addrtype = get("x", $wan_inf."/inet/addrtype");
	$ipaddr = "";

	if($addrtype == "ppp4")
	{
		$ipaddr = get("x", $wan_inf."/inet/ppp4/local");
	}

	if($addrtype == "ipv4")
	{
		$ipaddr = get("x", $wan_inf."/inet/ipv4/ipaddr");
	}

	if($ipaddr == "")
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

function wan_has_ip()
{
	$wan_inf = XNODE_getpathbytarget("/runtime", "inf", "uid", "WAN-1", 0);
	if($wan_inf == "")
		return 0;

	$addrtype = get("x", $wan_inf."/inet/addrtype");
	$ipaddr = "";

	if($addrtype == "ppp4")
	{
		$ipaddr = get("x", $wan_inf."/inet/ppp4/local");
	}

	if($addrtype == "ipv4")
	{
		$ipaddr = get("x", $wan_inf."/inet/ipv4/ipaddr");
	}

	if($ipaddr == "")
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

function dialup_is_manual($uid)
{
	$inf = XNODE_getpathbytarget("", "inf", "uid", $uid, 0);
	if($inf == "")
	{
		return 0;
	}

	$inet_uid = get("x", $inf."/inet");
	if($inet_uid == "")
	{
		return 0;
	}

	$inet = XNODE_getpathbytarget("/inet", "entry", "uid", $inet_uid, 0);
	if($inet == "")
	{
		return 0;
	}

	if(get("x", $inet."/ppp4/dialup/mode") == "manual" && get("x", $inet."/addrtype") == "ppp4" )
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function is_sta_connected($inf)
{
	$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $inf, 0);
	$status = get("",$path_run_phyinf."/media/connstatus");
	if($status == "CONNECTED")
		return 1;
	else
		return 0;
}

if($EVENT == "WAN_CONNECTED")
{
	echo "wan_port_status=`psts -i 4`\n";
	echo "if [ \"$wan_port_status\" != \"\" ]; then\n";
	echo "usockc /var/gpio_ctrl INET_ON\n";
	echo "fi\n";
}

if($EVENT == "WAN_DISCONNECTED")
{
	if(dialup_is_manual("WAN-1") == 1)
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
	else
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
}

if($EVENT == "WAN_PPP_ONDEMAND")
{
	echo "usockc /var/gpio_ctrl INET_OFF\n";
}

if($EVENT == "WAN_PPP_DIALUP")
{
	echo "usockc /var/gpio_ctrl INET_OFF\n";
}

if($EVENT == "WAN_PPP_EARLY")
{
	if(dialup_is_manual("WAN-1") == 1)
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
	else
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
}

if($EVENT == "WAN_PPP_HANGUP")
{
	if(dialup_is_manual("WAN-1") == 1)
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
}

if($EVENT == "WAN_LINKUP")
{
	if($layout == "router")
	{
		if(wan_has_ip() != 0)
		{
			echo "usockc /var/gpio_ctrl INET_ON\n";
		}
		else
		{
			echo "usockc /var/gpio_ctrl INET_OFF\n";
		}
	}
	else
	{
		if($existingnetwork != "eth")
			return;
		
		if(bridge_has_ip() != 0)
		{
			echo "usockc /var/gpio_ctrl INET_ON\n";
		}
		else
		{
			echo "usockc /var/gpio_ctrl INET_OFF\n";
		}
	}
}

if($EVENT == "WAN_LINKDOWN")
{
	if($layout == "router")
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	else
	{
		if($existingnetwork != "eth")
			return;
		
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
}

if($EVENT == "BRIDGE_CONNECTED")
{
	if(bridge_has_ip() != 0)
	{
		if($existingnetwork == "eth")
		{
			$path_inf = XNODE_getpathbytarget("", "inf", "uid", "BRIDGE-1", 0);
			$phyinf = query($path_inf."/phyinf");
			$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $phyinf, 0);
			$status = get("",$path_run_phyinf."/linkstatus");
			
			if ($status == "")	//cable disconnect
				echo "usockc /var/gpio_ctrl INET_OFF\n";
			else
				echo "usockc /var/gpio_ctrl INET_ON\n";
		}
		else				//wifi
		{
			if(is_active("WIFISTA-1.1") == 1 && is_active("WIFISTA-2.1") == 1)  //for manual set uplink ssid case, both band will be set as active
			{
				$status_2g = is_sta_connected("WIFISTA-1.1");
				$status_5g = is_sta_connected("WIFISTA-2.1");
				
				if($status_2g == 1 || $status_5g == 1)
					echo "usockc /var/gpio_ctrl INET_ON\n";
				else
					echo "usockc /var/gpio_ctrl INET_OFF\n";
			}
			else if(is_active("WIFISTA-1.1") == 1)
			{
				$status_2g = is_sta_connected("WIFISTA-1.1");
				if($status_2g == 1)
					echo "usockc /var/gpio_ctrl INET_ON\n";
				else
					echo "usockc /var/gpio_ctrl INET_OFF\n";
			}
			else if(is_active("WIFISTA-2.1") == 1)
			{
				$status_5g = is_sta_connected("WIFISTA-2.1");
				if($status_5g == 1)
					echo "usockc /var/gpio_ctrl INET_ON\n";
				else
					echo "usockc /var/gpio_ctrl INET_OFF\n";
			}
			else
			{
				TRACE_error("Error: unknown uplink status");
			}
			
			
			//echo "usockc /var/gpio_ctrl INET_ON\n";
		}		
	}
	else
	{
		echo "usockc /var/gpio_ctrl INET_OFF\n";
	}
}

if($EVENT == "BRIDGE_DISCONNECTED")
{
	//echo "usockc /var/gpio_ctrl INET_OFF\n";
}

if($EVENT == "WAN_STATUS")
{
	if ($layout=="router")
	{
		if(wan_has_ip() != 0)
		{
			echo "wan_port_status=`psts -i 4`\n";
			echo "if [ \"$wan_port_status\" != \"\" ]; then\n";
			echo "usockc /var/gpio_ctrl INET_ON\n";
			echo "else usockc /var/gpio_ctrl INET_OFF\n";
			echo "fi\n";
		}
		else
		{
			echo "usockc /var/gpio_ctrl INET_OFF\n";
		}
	}
	else if($layout=="bridge")
	{
		if(bridge_has_ip() != 0)
		{
			if($existingnetwork == "eth")
			{
				$path_inf = XNODE_getpathbytarget("", "inf", "uid", "BRIDGE-1", 0);
				$phyinf = query($path_inf."/phyinf");
				$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $phyinf, 0);
				$status = get("",$path_run_phyinf."/linkstatus");
				
				if ($status == "")	//cable disconnect
					echo "usockc /var/gpio_ctrl INET_OFF\n";
				else
					echo "usockc /var/gpio_ctrl INET_ON\n";
			}
			else				//wifi
			{
				if(is_active("WIFISTA-1.1") == 1 && is_active("WIFISTA-2.1") == 1)  //for manual set uplink ssid case, both band will be set as active
				{
					$status_2g = is_sta_connected("WIFISTA-1.1");
					$status_5g = is_sta_connected("WIFISTA-2.1");
					
					if($status_2g == 1 || $status_5g == 1)
						echo "usockc /var/gpio_ctrl INET_ON\n";
					else
						echo "usockc /var/gpio_ctrl INET_OFF\n";
				}
				else if(is_active("WIFISTA-1.1") == 1)
				{
					$status_2g = is_sta_connected("WIFISTA-1.1");
					if($status_2g == 1)
						echo "usockc /var/gpio_ctrl INET_ON\n";
					else
						echo "usockc /var/gpio_ctrl INET_OFF\n";
				}
				else if(is_active("WIFISTA-2.1") == 1)
				{
					$status_5g = is_sta_connected("WIFISTA-2.1");
					if($status_5g == 1)
						echo "usockc /var/gpio_ctrl INET_ON\n";
					else
						echo "usockc /var/gpio_ctrl INET_OFF\n";
				}
				else
				{
					TRACE_error("Error: unknown uplink status");
				}
				
				
				//echo "usockc /var/gpio_ctrl INET_ON\n";
			}		
		}
		else
		{
			echo "usockc /var/gpio_ctrl INET_OFF\n";
		}
	}
	else
	{
		TRACE_error("Error: unknown device layout");
	}		
}
?>
