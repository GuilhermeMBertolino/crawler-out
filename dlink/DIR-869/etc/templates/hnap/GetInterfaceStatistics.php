<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php";

$Interface = get("h","/runtime/hnap/GetInterfaceStatistics/Interface");

$result = "OK";

$path_tx = "/stats/tx/bytes";
$path_rx = "/stats/rx/bytes";
$path_tx_pkts = "/stats/tx/packets";
$path_rx_pkts = "/stats/rx/packets";
$path_tx_drop = "/stats/tx/drop";
$path_rx_drop = "/stats/rx/drop";
$path_tx_error = "/stats/tx/error";
$path_rx_error = "/stats/rx/error";

$tx = "N/A";
$rx = "N/A";
$tx_pkts = "N/A";
$rx_pkts = "N/A";
$tx_drop = "N/A";
$error = "N/A";

function get_runtime_eth_path($uid)
{
	$p = XNODE_getpathbytarget("", "inf", "uid", $uid, 0);
	if($p == "") return $p;

	return XNODE_getpathbytarget("/runtime", "phyinf", "uid", query($p."/phyinf"));
}

if ($Interface == "WAN")
{
	$path_wan1 = get_runtime_eth_path($WAN1);

	$tx = query($path_wan1.$path_tx);											$rx = query($path_wan1.$path_rx);
	$tx_pkts = query($path_wan1.$path_tx_pkts);						$rx_pkts = query($path_wan1.$path_rx_pkts);
	$tx_drop = query($path_wan1.$path_tx_drop);						$rx_drop = query($path_wan1.$path_rx_drop);
	$tx_error = query($path_wan1.$path_tx_error);					$rx_error = query($path_wan1.$path_rx_error);
	$error = $tx_error+$rx_error;
}
else if ($Interface == "LAN")
{
	$path_lan1 = get_runtime_eth_path($LAN1);

	$tx = query($path_lan1.$path_tx);											$rx = query($path_lan1.$path_rx);
	$tx_pkts = query($path_lan1.$path_tx_pkts);						$rx_pkts = query($path_lan1.$path_rx_pkts);
	$tx_drop = query($path_lan1.$path_tx_drop);						$rx_drop = query($path_lan1.$path_rx_drop);
	$tx_error = query($path_lan1.$path_tx_error);					$rx_error = query($path_lan1.$path_rx_error);
	$error = $tx_error+$rx_error;
}
else if ($Interface == "WLAN2.4G" || $Interface == "WLAN5G")
{
	foreach ("/phyinf")
	{
		if ($Interface == "WLAN2.4G")
		{
			$band_uid = $WLAN1;
			$freq = "2.4";
		}
		else
		{
			$band_uid = $WLAN2;
			$freq = "5";
		}

		if (get ("","media/freq") != $freq ) { continue; }

		$uid = query("uid");
		if($uid==$band_uid)
		{
			$path_wifi = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $band_uid);

			if ($path_wifi == "") continue;
			if (isdigit($tx) == 0)
			{
				$tx = 0;								$rx = 0;
				$tx_pkts = 0;						$rx_pkts = 0;
				$tx_drop = 0;						$rx_drop = 0;
				$error = 0;
			}
			$tx += query($path_wifi.$path_tx);											$rx += query($path_wifi.$path_rx);
			$tx_pkts += query($path_wifi.$path_tx_pkts);						$rx_pkts += query($path_wifi.$path_rx_pkts);
			$tx_drop += query($path_wifi.$path_tx_drop);						$rx_drop += query($path_wifi.$path_rx_drop);
			$tx_error = query($path_wifi.$path_tx_error);					  $rx_error = query($path_wifi.$path_rx_error);
			$error += $tx_error+$rx_error;
		}
	}
}

/* Internet session */
function getSessionNumber($ip)
{
	if ($ip == "")
	{ return 0; }

	$cmd = "grep ". $ip ." /proc/net/nf_conntrack | grep -v \"UNREPLIED\" | wc -l";
	setattr("/runtime/device/conntrace_number", "get", $cmd);
	$session = get("htm", "/runtime/device/conntrace_number");
	del("/runtime/device/conntrace_number");
	return $session;
}

$wan_runtime_path = XNODE_getpathbytarget("/runtime", "inf", "uid", $WAN1, 0);
$wan_type = get ("", $wan_runtime_path."/inet/addrtype");

if ($wan_type == "ipv4")
{ $wan_ip = get("", $wan_runtime_path."/inet/ipv4/ipaddr"); }
else if ($wan_type == "ppp4")
{ $wan_ip = get("", $wan_runtime_path."/inet/ppp4/local"); }

$session = getSessionNumber($wan_ip);
/* Internet session end*/

// Reset the statistic value after using ClearStatistics HNAP.
$LastesClearPath = XNODE_getpathbytarget("/runtime/hnap/LastStatisticsClear", "entry", "Interface", $Interface, 0);
$last_tx		= map($LastesClearPath."/Sent", "", 0, "*", get("", $LastesClearPath."/Sent"));
$last_rx		= map($LastesClearPath."/Received", "", 0, "*", get("", $LastesClearPath."/Received"));
$last_tx_pkts	= map($LastesClearPath."/TXPackets", "", 0, "*", get("", $LastesClearPath."/TXPackets"));
$last_rx_pkts	= map($LastesClearPath."/RXPackets", "", 0, "*", get("", $LastesClearPath."/RXPackets"));
$last_tx_drop	= map($LastesClearPath."/TXDropped", "", 0, "*", get("", $LastesClearPath."/TXDropped"));
$last_rx_drop	= map($LastesClearPath."/RXDropped", "", 0, "*", get("", $LastesClearPath."/RXDropped"));
$last_error		= map($LastesClearPath."/Errors", "", 0, "*", get("", $LastesClearPath."/Errors"));
$tx_final		= $tx - $last_tx;
$rx_final		= $rx - $last_rx;
$tx_pkts_final	= $tx_pkts - $last_tx_pkts;
$rx_pkts_final	= $rx_pkts - $last_rx_pkts;
$tx_drop_final	= $tx_drop - $last_tx_drop;
$rx_drop_final	= $rx_drop - $last_rx_drop;
$error_final	= $error - $last_error;

if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}
$action_name = get("", "/runtime/hnap/action_name");
if($action_name=="GetInterfaceStatistics" || $action_name=="GetMultipleHNAPs")
{
	echo
	"\n".
	'	<GetInterfaceStatisticsResponse xmlns="http://purenetworks.com/HNAP1/">\n'.
	"		<GetInterfaceStatisticsResult>".$result."</GetInterfaceStatisticsResult>\n".
	"		<Interface>".$Interface."</Interface>\n".
	"		<InterfaceStatistics>\n".
	"			<StatisticInfo>\n".
	"				<Sent>".$tx_final."</Sent>\n".
	"				<Received>".$rx_final."</Received>\n".
	"				<TXPackets>".$tx_pkts_final."</TXPackets>\n".
	"				<RXPackets>".$rx_pkts_final."</RXPackets>\n".
	"				<TXDropped>".$tx_drop_final."</TXDropped>\n".
	"				<RXDropped>".$rx_drop_final."</RXDropped>\n".
	"				<Session>".$session."</Session>\n".
	"				<Errors>".$error_final."</Errors>\n".
	"			</StatisticInfo>\n".
	"		</InterfaceStatistics>\n".
	"	</GetInterfaceStatisticsResponse>\n";
}
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}
?>