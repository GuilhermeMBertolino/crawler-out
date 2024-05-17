HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";

include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/inf.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/nat.php";
include "/htdocs/webinc/config.php";

$nodebase = "/runtime/hnap/SetPortForwardingSettings";
$node_info = $nodebase."/PortForwardingList/PortForwardingInfo";
$pfwd = "/nat/entry/portforward";
$pfwd_entry = $pfwd."/entry";

$result = "OK";

foreach($node_info) //Prevent the security issue of Command Injection 
{
	//The input port format could be Port Ranges (100-150), Individual Ports (80, 68, 888), or Mixed (1020-5000, 689).
	//One of TCP or UDP port could be empty
	if(get("x", "TCPPorts")=="" && get("x", "UDPPorts")=="")
	{
		$result = "ERROR";
		break;
	}
	$TCPPorts_comma_cnt	= cut_count(get("x", "TCPPorts"), ",");
	
	$count = $TCPPorts_comma_cnt;
	$tcp_port = query("TCPPorts");
	
	
	if(get("x", "TCPPorts")!="")
	{
		while($count >= 1)
		{
			$TCPPortSub 		= cut( get("x", "TCPPorts"), $TCPPorts_comma_cnt - $count, ",");
			$TCPPortSub_start	= cut($TCPPortSub, 0, "-");
			$TCPPortSub_end		= cut($TCPPortSub, 1, "-");
			$TCPPortSub_cnt		= cut_count($TCPPortSub, "-");			
			
			if(isdigit($TCPPortSub_start)==0 || $TCPPortSub_cnt < 1)
			{
				$result = "ERROR";
				break;
			}
			if($TCPPortSub_end!="" && isdigit($TCPPortSub_end)==0)
			{
				$result = "ERROR";
				break;
			}
			$count = $count - 1;
			
			$base = $TCPPortSub_start;
			if($TCPPortSub_end != "" ) 
			{
				while ($base <= $TCPPortSub_end)  //process multi-port range ex 10-20 compare with Virtual Server Port
				{
					$check_tcp_conflict = nat_vsport_conflict( $base, "TCP");
					if ($check_tcp_conflict==1)
					{
						$result = "ERROR";
						TRACE_error("[ERROR] Range_port conflict with VS_tcp port");
						break;		
					}
					
					$check_remote_conflict = nat_remoteport_conflict($base, "TCP"); 
					if ($check_remote_conflict==1)
					{
						$result = "ERROR";
						TRACE_error("[ERROR] Range_port conflict with Remote port");
						break;		
					}
					$base = $base +1;			
				}
				if($result == "ERROR")	{break;}
			}
		
			//process multi-port dot,,,, with Virtual server port compare
			$check_tcp_conflict = nat_vsport_conflict( $TCPPortSub, "TCP");
			if ($check_tcp_conflict==1)
			{
				$result = "ERROR";
				TRACE_error("[ERROR] TCPPortSub conflict with VS_tcp port");
				break;
			}
			
			$check_remote_conflict = nat_remoteport_conflict( $TCPPortSub, "TCP"); 
			if ($check_remote_conflict==1)
			{
				$result = "ERROR";
				TRACE_error("[ERROR] TCPPortSub conflict with Remote port");
				break;
			}
			$infp = XNODE_getpathbytarget("", "inf", "uid", "WAN-1", 0);
				
		}
			
	}
	if($result == "ERROR")	{break;}

	
	$UDPPorts_comma_cnt	= cut_count(get("x", "UDPPorts"), ",");
	$count = $UDPPorts_comma_cnt;
	$udp_port = query("UDPPorts");
	
	if(get("x", "UDPPorts")!="")
	{		
		while($count >= 1)
		{
			$UDPPortsSub 		= cut(get("x", "UDPPorts"), $UDPPorts_comma_cnt - $count, ",");
			$UDPPortsSub_start	= cut($UDPPortsSub, 0, "-");
			$UDPPortsSub_end	= cut($UDPPortsSub, 1, "-");
			$UDPPortsSub_cnt	= cut_count($UDPPortsSub, "-");
	
			if(isdigit($UDPPortsSub_start)==0 || $UDPPortsSub_cnt < 1)
			{
				$result = "ERROR";
				break;
			}
			if($UDPPortsSub_end!="" && isdigit($UDPPortsSub_end)==0)
			{
				$result = "ERROR";
				break;
			}
			$count = $count - 1;	
			$base = $UDPPortsSub_start;
			
			if($UDPPortsSub_end != "" ) 
			{
				while ($base <= $UDPPortsSub_end)  //process multi-port range ex 10-20 compare with Virtual Server Port
				{
					$check_udp_conflict = nat_vsport_conflict( $base, "UDP");
					if ($check_udp_conflict==1)
					{
						$result = "ERROR";
						TRACE_error("[ERROR] Range_port conflict with VS_udp port");
						break;		
					}
					
					$check_remote_conflict = nat_remoteport_conflict( $base, "UDP"); 
					if ($check_remote_conflict==1)
					{
						$result = "ERROR";
						TRACE_error("[ERROR] Range_port conflict with remote port");
						break;		
					}				
					$base = $base +1;			
				}
				if($result == "ERROR")	{break;}
			}
		
			//process multi-port dot,,,, with Virtual server port compare
			$check_udp_conflict = nat_vsport_conflict( $UDPPortsSub, "UDP");
			if ($check_udp_conflict==1)
			{
				$result = "ERROR";
				TRACE_error("[ERROR] UDPPortSub conflict with VS_udp port");
				break;
			}
			
			$check_remote_conflict = nat_remoteport_conflict( $UDPPortsSub, "UDP"); 
			if ($check_remote_conflict==1)
			{
				$result = "ERROR";
				TRACE_error("[ERROR] UDPPortSub conflict with remote port");
				break;
			}
		}
	}
	if($result == "ERROR")	{break;}

}
	

if($result == "OK")
{
	set("/runtime/hnap/dummy", "");
	movc($pfwd, "/runtime/hnap/dummy"); //Remove the children nodes of /nat/entry/portforward
	del("/runtime/hnap/dummy");

	set($pfwd."/seqno", "1");
	set($pfwd."/max", "24");
	set($pfwd."/count", "0");

	foreach($node_info) // /runtime/hnap/SetPortForwardingSettings/PortForwardingList/PortForwardingInfo
	{
		set($pfwd."/seqno", $InDeX+1);
		set($pfwd."/count", $InDeX);

		$enable = get("x", "Enabled");
		if ($enable == "true") { set($pfwd_entry.":".$InDeX."/enable", "1"); }
		else { set($pfwd_entry.":".$InDeX."/enable", "0"); }

		set($pfwd_entry.":".$InDeX."/uid", "PFWD-".$InDeX);

		$schedule = get("x", "ScheduleName");
		set($pfwd_entry.":".$InDeX."/schedule", XNODE_getscheduleuid($schedule));

		set($pfwd_entry.":".$InDeX."/inbfilter", "");

		$description = get("x", "PortForwardingDescription");
		set($pfwd_entry.":".$InDeX."/description", $description);

		set($pfwd_entry.":".$InDeX."/protocol", "");
		set($pfwd_entry.":".$InDeX."/protocolnum", "");

		set($pfwd_entry.":".$InDeX."/internal/inf", $LAN1);
		$ipv4addr = get("x", "LocalIPAddress");
		$mask = INF_getcurrmask($LAN1);
		$hostid = ipv4hostid($ipv4addr, $mask);
		set($pfwd_entry.":".$InDeX."/internal/hostid", $hostid);
		set($pfwd_entry.":".$InDeX."/internal/start", "");

		$tport_str = get("x", "TCPPorts");   
		set($pfwd_entry.":".$InDeX."/tport_str", $tport_str);

		$uport_str = get("x", "UDPPorts");
		set($pfwd_entry.":".$InDeX."/uport_str", $uport_str);

		set($pfwd_entry.":".$InDeX."/external/start", "");
		set($pfwd_entry.":".$InDeX."/external/end", "");
		/*
		TRACE_debug("$enable=".$enable);
		TRACE_debug("$schedule=".$schedule);
		TRACE_debug("$description=".$description);
		TRACE_debug("$ipv4addr=".$ipv4addr);
		TRACE_debug("$mask=".$mask);
		TRACE_debug("$hostid=".$hostid);
		TRACE_debug("$tport_str=".$tport_str);
		TRACE_debug("$tport_str=".$uport_str);
		TRACE_debug("$result=".$result);
		*/
	}
}

if($result == "OK")
{
	fwrite("a",$ShellPath, "event DBSAVE > /dev/console\n");
	fwrite("a",$ShellPath, "service PFWD.NAT-1 restart > /dev/console\n");
	fwrite("a",$ShellPath, "xmldbc -s /runtime/hnap/dev_status '' > /dev/console\n");
	set("/runtime/hnap/dev_status", "ERROR");
}
else
{
	fwrite("a",$ShellPath, "echo \"We got a error in setting, so we do nothing...\" > /dev/console");
}

?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	<soap:Body>
    <SetPortForwardingSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
      <SetPortForwardingSettingsResult><?=$result?></SetPortForwardingSettingsResult>
    </SetPortForwardingSettingsResponse>
  </soap:Body>
</soap:Envelope>