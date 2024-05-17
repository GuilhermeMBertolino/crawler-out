HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php";

$rphyinf1 = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $WLAN1, 0);
$rphyinf2 = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $WLAN2, 0);
$rphyinf3 = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $WLAN3, 0);
$phyinf1 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN1, 0);
$phyinf2 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN2, 0);
$phyinf3 = XNODE_getpathbytarget("", "phyinf", "uid", $WLAN3, 0);
$wifi1 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($phyinf1."/wifi"), 0);
$wifi2 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($phyinf2."/wifi"), 0);
$wifi3 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($phyinf3."/wifi"), 0);

$smart_en = query("/device/features/smartconnect");//When smart connect enabled, change 2.4G WPS setting only
$dev_pin = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/DEV_PIN");
$reset = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/ResetToUnconfigured");
$pin = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/WPSPIN");
$pbc = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/WPSPBC");
$wps_enable = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/enable");
$pbc_en = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/ENABLEPBC");
$pin_en = get("","/runtime/hnap/SetWiFiVerifyAlpha/WPS/ENABLEPIN");

$result = "ERROR_ACTION";

fwrite("w",$ShellPath, "#!/bin/sh\n");
if ($pin != "")
{
    if($rphyinf1 != "") {set($rphyinf1."/media/wps/enrollee/pin",$pin);}
    if($rphyinf2 != "") {set($rphyinf2."/media/wps/enrollee/pin",$pin);}
	if($rphyinf3 != "") {set($rphyinf3."/media/wps/enrollee/pin",$pin);}

    if($rphyinf1 != "" || $rphyinf2 != "" || $rphyinf3 != "")
    {
        fwrite("a",$ShellPath, "event WPSPIN > /dev/console \n");
        $result = "SUCCESS";
    }
    else {fwrite("a",$ShellPath, "echo \"PIN:can't find correct path...\" > /dev/console");}
}
else if ($pbc == "1")
{
    fwrite("a",$ShellPath, "event WPSPBC.PUSH > /dev/console \n");
    $result = "SUCCESS";
}
else if ($dev_pin != "")
{
    if($wifi1!="") {set($wifi1."/wps/pin",$dev_pin);}
    if($wifi2!="") {set($wifi2."/wps/pin",$dev_pin);}
	if($wifi3!="") {set($wifi3."/wps/pin",$dev_pin);}

    if($wifi1!="" || $wifi2!="" || $wifi3!="")
    {
        fwrite("a",$ShellPath, "event DBSAVE > /dev/console \n");
        fwrite("a",$ShellPath, "service PHYINF.WIFI restart > /dev/console \n");
        $result = "SUCCESS";
    }
    else {fwrite("a",$ShellPath, "echo \"DEV_PIN:can't find correct path...\" > /dev/console");}
}
else if ($reset == "1")
{
    TRACE_info("Reset to Unconfigured!!!");
    $result = "SUCCESS";
    fwrite("a",$ShellPath, "event FRESET > /dev/console \n");
}
else if ($wps_enable == "true")
{
	if($wifi1!=""){set($wifi1."/wps/enable", 1);}
	if($wifi2!="" && $smart_en == "0" ){set($wifi2."/wps/enable", 1);}
	if($pbc_en=="0")
		set("/device/features/enablepbc", "0");
	else
		set("/device/features/enablepbc", "1");
	if($pin_en=="0")
		set("/device/features/enablepin", "0");
	else
		set("/device/features/enablepin", "1");
	$result = "SUCCESS";
}
else if ($wps_enable == "false")
{
	if($wifi1!=""){set($wifi1."/wps/enable", 0);}
	if($wifi2!="" && $smart_en == "0" ){set($wifi2."/wps/enable", 0);}
	$result = "SUCCESS";
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
        <SetWiFiVerifyAlphaResponse xmlns="http://purenetworks.com/HNAP1/">
            <SetWPSSettingResult><?=$result?></SetWPSSettingResult>
        </SetWiFiVerifyAlphaResponse>
    </soap:Body>
</soap:Envelope>

