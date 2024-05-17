<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";

$nodebase = "/runtime/hnap/GetQoSSettings";
del("/runtime/hnap/GetQoSSettings");
$nodebase = $nodebase."/entry";
$nodebase_app = "/runtime/hnap/GetQoSSettings/apps/entry";
$result = "OK";

$entry_bwc = "/bwc/entry:1/rules/entry";
$entry_bwcf = "/bwc/bwcf/entry";
$entry_bwcapp = "/bwc/entry:1/app_rules/entry";

$TYPE = get("x", "/bwc/entry:1/flag");
$AUTO_BandWidth = get("x", "/bwc/entry:1/autobandwidth");
$QoS_enable		= get("x", "/bwc/entry:1/enable");
$IQoS_enable	= get("x", "/runtime/device/iqos/enable");
$uplink = get("x", "/bwc/entry:1/bandwidth");
$downlink = get("x", "/bwc/entry:2/bandwidth");
if($IQoS_enable=="1")	$rule_type=get("x", "/bwc/rule_type");//app or dev
else			$rule_type="NOSUPPORT";
if($rule_type=="")	$rule_type="app";

$i=0;
foreach($entry_bwcf)
{
	if(get("", "mac")!="")
	{
		$i++;
		set($nodebase.":".$i."/IPAddress", get("", "ipv4/start"));
		set($nodebase.":".$i."/MACAddress", get("", "mac"));
		$bwcf_uid = get("", "uid");
		$bwc_entry1_rules_path = XNODE_getpathbytarget("/bwc/entry:1/rules", "entry", "bwcf", $bwcf_uid, 0);
		set($nodebase.":".$i."/Hostname", get("", $bwc_entry1_rules_path."/description"));
		$bwcqd = get("", $bwc_entry1_rules_path."/bwcqd");
		if ($bwcqd == "BWCQD-1") { $PRIORITY = "3"; } //Higest
		else if ($bwcqd == "BWCQD-2") { $PRIORITY = "2"; } //Higher
		else if ($bwcqd == "BWCQD-3") { $PRIORITY = "1"; } //Normal
		else if ($bwcqd == "BWCQD-4") { $PRIORITY = "0"; } //Best effort
				set($nodebase.":".$i."/Priority", $PRIORITY);

		$TYPE = "TC_SPQ"; //only available TC_SPQ_2013GUI for new UI QoS now
		$DEVICEOS = get("", $bwc_entry1_rules_path."/deviceos");
		$DEVICETYPE = get("", $bwc_entry1_rules_path."/devicetype");
		$DEVICEFAMILY = get("", $bwc_entry1_rules_path."/devicefamily");
		set($nodebase.":".$i."/Type", $TYPE);
		if($IQoS_enable=="1")
		{
			set($nodebase.":".$i."/DeviceOS", $DEVICEOS);
			set($nodebase.":".$i."/DeviceType", $DEVICETYPE);
			set($nodebase.":".$i."/DeviceFamily", $DEVICEFAMILY);
		}
		else
		{
			set($nodebase.":".$i."/DeviceOS", "");
			set($nodebase.":".$i."/DeviceType", "");
			set($nodebase.":".$i."/DeviceFamily", "");
	}
}
}
/* Find application info */
$j=0;
foreach($entry_bwcapp)
{
	$j++;
	set($nodebase_app.":".$j."/App_name", get("", "description"));
	$bwcqd_app = get("", "bwcqd");
	if ($bwcqd_app == "BWCQD-1") { $PRIORITY = "3"; } //Higest
	else if ($bwcqd_app == "BWCQD-2") { $PRIORITY = "2"; } //Higher
	else if ($bwcqd_app == "BWCQD-3") { $PRIORITY = "1"; } //Normal
	else if ($bwcqd_app == "BWCQD-4") { $PRIORITY = "0"; } //Best effort
	set($nodebase_app.":".$j."/Priority", $PRIORITY);
}
?>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}?>
		<GetQoSSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
			<GetQoSSettingsResult><?=$result?></GetQoSSettingsResult>
			<enable><?=$QoS_enable?></enable>
			<autobandwidth><?=$AUTO_BandWidth?></autobandwidth>
			<uplink><?=$uplink?></uplink>			
			<downlink><?=$downlink?></downlink>			
			<rule_type><?=$rule_type?></rule_type>
			<QoSInfoList>
				<?					
					foreach($nodebase)
					{
						echo "				<QoSInfo>\n";
						echo "					<Hostname>".get("x", "Hostname")."</Hostname>\n";
						echo "					<IPAddress>".get("x", "IPAddress")."</IPAddress>\n";
						echo "					<MACAddress>".get("x", "MACAddress")."</MACAddress>\n";
						echo "					<Priority>".get("x", "Priority")."</Priority>\n";
						echo "					<Type>".get("x", "Type")."</Type>\n";
							echo "					<DeviceOS>".get("x", "DeviceOS")."</DeviceOS>\n";
							echo "					<DeviceType>".get("x", "DeviceType")."</DeviceType>\n";
							echo "					<DeviceFamily>".get("x", "DeviceFamily")."</DeviceFamily>\n";
						echo "				</QoSInfo>\n";
					}
					foreach($nodebase_app)
					{
							echo "				<QoS_AppInfo>\n";
							echo "					<App_name>".get("x", "App_name")."</App_name>\n";
							echo "					<Priority>".get("x", "Priority")."</Priority>\n";
							echo "				</QoS_AppInfo>\n";
					}
				?>
			</QoSInfoList>
		</GetQoSSettingsResponse>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}?>
