HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<?
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";

$nodebase = "/runtime/hnap/SetTriggerWirelessSiteSurvey/";
$RadioID = get("", $nodebase."RadioID");
$result = "OK";

if($RadioID!="RADIO_2.4GHz" && $RadioID!="RADIO_5GHz" &&
        $RadioID!="RADIO_2.4GHz_Guest" && $RadioID!="RADIO_2.4GHz" &&
        $RadioID!="2.4GHZ" && $RadioID!="5GHZ")
{
	$result = "ERROR_BAD_RADIOID";
}

/* Modify the waittime according as the site survey working time. The waittime should be long enough to make sure the site survey work is completed before client gets the site survey result.
  waittime_firsttime : the waittime we set when site survey work first time after reboot.
  waittime_sitesurvey : the time calculated from site survey event.
  Waittime_buffer : waittime = waittime_sitesurvey + waittime_buffer.*/
$waittime_firsttime = get("", "/device/sitesurvey/waittime_firsttime");
$waittime_buffer = get("", "/device/sitesurvey/waittime_buffer");
$waittime_sitesurvey = get("", "/runtime/wifi_tmpnode/waittime");
if($waittime_firsttime == "")	{$waittime_firsttime = 20;}
if($waittime_buffer == "")	{$waittime_buffer = 10;}
if(get("","/runtime/wifi_tmpnode/state")=="")	{$waittime = $waittime_firsttime;}
else
{
	if(isdigit($waittime_sitesurvey) == 1) {$waittime =  $waittime_sitesurvey + $waittime_buffer;}
	else	{$waittime = $waittime_buffer + 5;}
}

fwrite("w",$ShellPath, "#!/bin/sh\n");
fwrite("a",$ShellPath, "echo \"[$0]--> Trigger Wireless SiteSurvey Settings\" > /dev/console\n");
if($result=="OK")
{
	set ("/runtime/wifi_tmpnode/ssid", "");
	event("SITESURVEY");
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
		<SetTriggerWirelessSiteSurveyResponse xmlns="http://purenetworks.com/HNAP1/">
			<SetTriggerWirelessSiteSurveyResult><?=$result?></SetTriggerWirelessSiteSurveyResult>
			<WaitTime><?=$waittime?></WaitTime>
		</SetTriggerWirelessSiteSurveyResponse>
	</soap:Body>
</soap:Envelope>