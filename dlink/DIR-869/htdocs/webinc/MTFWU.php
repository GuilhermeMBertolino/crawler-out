HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<? echo "\<\?xml version='1.0'\?\>"; ?>
<?	include "/htdocs/phplib/xnode.php";
	if($InputACT == ""){	$InputACT = "GetDevInfo";}
	$MTFWU_ACT_Count = 0;

	if($InputACT == "GetDevInfo")
	{
		echo "<Device_Information>"."\n";
		echo "\t"."<Firmware_External_Version>V".cut(fread("", "/etc/config/buildver"), "0", "\n")."</Firmware_External_Version>"."\n";
		echo "\t"."<Firmware_Internal_Version>V".cut(fread("", "/etc/config/buildver"), "0", "\n").cut(fread("", "/etc/config/buildrev"), "0", "\n")."</Firmware_Internal_Version>"."\n";
		echo "\t"."<Model_Name>".query("/runtime/device/modelname")."</Model_Name>"."\n";
		echo "\t"."<Hardware_Version>".query("/runtime/device/hardwareversion")."</Hardware_Version>"."\n";
		echo "\t"."<Country_Code>".query("/runtime/devdata/countrycode")."</Country_Code>"."\n";
		echo "\t"."<Language>".map("/runtime/device/langcode", "", "EN", "*", query("/runtime/device/langcode"))."</Language>"."\n";
		echo "\t"."<LAN_MAC>".query("/runtime/devdata/lanmac")."</LAN_MAC>"."\n";
		echo "\t"."<WAN_MAC>".query("/runtime/devdata/wanmac")."</WAN_MAC>"."\n";
		echo "\t"."<LAN_MAC_2.4G>".query("/runtime/devdata/wlanmac")."</LAN_MAC_2.4G>"."\n";
		echo "\t"."<LAN_MAC_5G>".query("/runtime/devdata/wlanmac2")."</LAN_MAC_5G>"."\n";
		echo "\t"."<LAN_MAC_5G_Low>".query("/runtime/devdata/wlanmac2")."</LAN_MAC_5G_Low>"."\n";
		echo "\t"."<LAN_MAC_5G_High>".query("/runtime/devdata/wlanmac3")."</LAN_MAC_5G_High>"."\n";
		$path = XNODE_getpathbytarget("/wifi", "entry", "uid", "WIFI-1", "0");
		echo "\t"."<SSID_2.4G>".get(h,$path."/ssid")."</SSID_2.4G>"."\n";
		$path = XNODE_getpathbytarget("/wifi", "entry", "uid", "WIFI-3", "0");
		echo "\t"."<SSID_5G>".get(h,$path."/ssid")."</SSID_5G>"."\n";
		$path = XNODE_getpathbytarget("/wifi", "entry", "uid", "WIFI-3", "0");
		echo "\t"."<SSID_5G_Low>".get(h,$path."/ssid")."</SSID_5G_Low>"."\n";
		$path = XNODE_getpathbytarget("/wifi", "entry", "uid", "WIFI-5", "0");
		echo "\t"."<SSID_5G_High>".get(h,$path."/ssid")."</SSID_5G_High>"."\n";
		echo "\t"."<Reboot_Time>300</Reboot_Time>"."\n";
		echo "\t"."<Factory_default_Flag>".map("/runtime/device/devconfsize", "0", "TRUE", "*", "FALSE")."</Factory_default_Flag>"."\n";
		echo "</Device_Information>";
	}
	else
	{
		echo "<MTFWUActSupportList>"."\n";
		echo "\t"."<MTFWU_ACT>MTFWUActSupportList</MTFWU_ACT>"."\n";
		$MTFWU_ACT_Count++;
		echo "\t"."<MTFWU_ACT>GetDevInfo</MTFWU_ACT>"."\n";
		$MTFWU_ACT_Count++;
		if(isfile("/htdocs/web/fwupload.cgi")==1)
		{
			echo "\t"."<MTFWU_ACT>FWUpload</MTFWU_ACT>"."\n";
			$MTFWU_ACT_Count++;
			echo "\t"."<MTFWU_ACT>FWUpdate</MTFWU_ACT>"."\n";
			$MTFWU_ACT_Count++;
		}
		echo "\t"."<MTFWU_ACT>FactoryDefault</MTFWU_ACT>"."\n";
		$MTFWU_ACT_Count++;
		echo "\t"."<MTFWU_ACT>Reboot</MTFWU_ACT>"."\n";
		$MTFWU_ACT_Count++;
		//If this direction is existed, it means this is D-Link New GUI without language pack update feature.
		if(isdir("/htdocs/web/js/localization")==0)
		{
			echo "\t"."<MTFWU_ACT>LangUpdate</MTFWU_ACT>"."\n";
			$MTFWU_ACT_Count++;
		}
		echo "\t"."<MTFWU_ACT_Count>".$MTFWU_ACT_Count."</MTFWU_ACT_Count>"."\n";
		echo "</MTFWUActSupportList>"."\n";
	}
?>