<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/webinc/config.php";

$wait_time = "2";
$retry_number = 12;

$result = "OK";

$action = query ("/runtime/hnap/GetCurrentInternetStatus/InternetStatus");

if ($action == "true")
{
	$action = "trigger";
}
else if ($action == "false")
{
	$action = "get";
}
else
{
	$action = "";
	$result = "ERROR";
}

function is_active($uid)
{
    $phy = XNODE_getpathbytarget("", "phyinf", "uid", $uid);
    if($phy == "")
        return 0;

	if(get("x", $phy."/active") != 1) 
		return 0;

	return 1;
}

$layout = query("/device/layout");
if($layout=="router") { $INF = $WAN1; }
else { $INF = $BR1; }

$path_inf = XNODE_getpathbytarget("", "inf", "uid", $INF, 0);
$phyinf = query($path_inf."/phyinf");
$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $phyinf, 0);
$status = get("",$path_run_phyinf."/linkstatus");

$ExistingNetwork = query("/device/existingnetwork");
if($ExistingNetwork == "eth")
	$status = get("",$path_run_phyinf."/linkstatus");
else
{
	$status  = "0";
	$status1 = "0";
	$status2 = "0";
	if(is_active("WIFISTA-1.1") == 1)
	{
		$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "WIFISTA-1.1", 0);
		$status1 = get("",$path_run_phyinf."/media/connstatus");
		if($status1 == "CONNECTED")
			$status1 = "1";
		else
			$status1 = "0";
	}
	
	if(is_active("WIFISTA-2.1") == 1)
	{
		$path_run_phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "WIFISTA-2.1", 0);
		$status2 = get("",$path_run_phyinf."/media/connstatus");
		if($status2 == "CONNECTED")
			$status2 = "1";
		else
			$status2 = "0";
	}
	
	if($status1 == "1" || $status2 == "1")
		$status = "1";	
}	

if( $status != "0" && $status != "")
{ $statusStr = "CONNECTED"; }
else 
{
	$statusStr = "DISCONNECTED";
	$result = "OK_NOTCONNECTED";
}

if ($result == "OK")
{
	if ($action == "trigger")
	{
		$cmd = "dnsquery -p -t 2 -d mydlink.com -d dlink.com -d dlink.com.cn -d dlink.com.tw -d google.com -d www.mydlink.com -d www.dlink.com -d www.dlink.com.cn -d www.dlink.com.tw -d www.google.com";
		setattr("/runtime/command", "get", $cmd ." > /var/cmd.result &");
		unlink("/var/cmd.result");
		get("x", "/runtime/command");

		$result = "OK_DETECTING_".$wait_time;
	}
	else
	{
		if (isfile("/var/cmd.result") == 1)
		{
			// make sure the file is existed.
			$ping_result = fread("","/var/cmd.result");

			if (strstr($ping_result, "Internet detected.") == "")
			{
				$retry_count = query ("/runtime/hnap1/retryCount");
				if ($retry_count == "") { $retry_count = 0; }
				$retry_count ++;
				if ($retry_count < $retry_number) 
				{ 
					$result = "OK_DETECTING_".$wait_time;
					set ("/runtime/hnap1/retryCount", $retry_count);
					//<---Workaround. If we use dnsquery continuely, the result file /var/cmd.result would be empty sometime.
					// It's bug but we don't why now. For this condition, any more detecting action is useless unless we use dnsquery again.
					if($retry_count==3 || $retry_count==5 || $retry_count==10)
					{
						unlink("/var/cmd.result");
						get("x", "/runtime/command");
					}
					//-->
				}
				else 
				{
					$result = "OK_NOTCONNECTED";
					del("/runtime/hnap1/retryCount");
					unlink("/var/cmd.result");
				}
			}
			else
			{
				$result = "OK_CONNECTED";
				del("/runtime/hnap1/retryCount");
				unlink("/var/cmd.result");
			}
		}
		else
		{
				$retry_count = query ("/runtime/hnap1/retryCount");
				if ($retry_count == "") { $retry_count = 0; }
				$retry_count ++;
				if ($retry_count < $retry_number)
				{
					$result = "OK_DETECTING_".$wait_time;
					set ("/runtime/hnap1/retryCount", $retry_count);
				}
				else
				{
					//if the file is not existed, it should return an error.
					$result = "ERROR";
				}
		}
	}
}

?>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}?>
		<GetCurrentInternetStatusResponse xmlns="http://purenetworks.com/HNAP1/">
			<GetCurrentInternetStatusResult><?=$result?></GetCurrentInternetStatusResult>
		</GetCurrentInternetStatusResponse>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}?>
