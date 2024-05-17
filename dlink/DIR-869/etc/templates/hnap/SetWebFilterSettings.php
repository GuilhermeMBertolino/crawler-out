HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8

<? 
echo "\<\?xml version='1.0' encoding='utf-8'\?\>";
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/config.php";
include "/htdocs/phplib/trace.php"; 

function WebsiteForm_HNAP_to_Seattle($website)
{
	/* For D-Link Morrison definition in DIR-890L
	   The website form could be allowed in HNAP is
       1. www.google.com
       2. http://www.google.com
       3. http://www.google.com/
       4. www.google.com/
	   However it only could be "www.google.com" for Seattle website form
	*/
	$website = urlencode("e",$website);
	if(substr($website, 0, 13)=="http%3A%2F%2F") //Remove "http://"
	{$website=substr($website, 13, strlen($website)-3);}
	if(substr($website, strlen($website)-3, 3)=="%2F") //Remove "/" in the tail
	{$website=substr($website, 0, strlen($website)-3);}
	return $website;
}

function XNODE_add_entry_for_QRS($base, $uid)
{
	$seqno = query($base."/seqno");
	$count = query($base."/count");
	$max   = query($base."/max");
	if ($seqno == "" && $count == "")
	{
		$seqno = 1; 
		$count = 0;
	}
	if ($max != "" && $count >= $max) return "";

	$seqno++;
	$count++;
	set($base."/seqno", $seqno);
	set($base."/count", $count);
	set($base."/entry:".$count."/uid", $uid);
	return $base."/entry:".$count;
}

/* QRS send WebFilterMethod=DENY and NumberOfEntry=0 when:
		1. Disable Website Filter
		2. Enable Website Filter but no rules
	 In these case, we disable the ACL policy and not modify the original Website Filter Rules
*/
$result = "REBOOT";
$nodebase= "/runtime/hnap/SetWebFilterSettings";
$req_WebFilterMethod = get("","/runtime/hnap/SetWebFilterSettings/WebFilterMethod");
$req_NumberOfEntry = get("","/runtime/hnap/SetWebFilterSettings/NumberOfEntry");

//Error Check
foreach($nodebase."/WebFilterURLs/string")
{
	$req_string = get("","/runtime/hnap/SetWebFilterSettings/WebFilterURLs/string:".$InDeX);
	if(isdomain(WebsiteForm_HNAP_to_Seattle($req_string))==0 || $req_string=="" || $req_string=="null")	{$result = "ERROR";}
	TRACE_debug("$req_string=".$req_string." WebsiteForm_HNAP_to_Seattle($req_string)=".WebsiteForm_HNAP_to_Seattle($req_string)." isdomain(WebsiteForm_HNAP_to_Seattle($req_string))=".isdomain(WebsiteForm_HNAP_to_Seattle($req_string)));
}

if($result=="OK" || $result=="REBOOT")
{
	if($req_NumberOfEntry != "0")
	{
		$tmp_node = "/acl/accessctrl/tmp_node";

		/* set webfilter rules to a tmp_node, we copy back to orignal node latter, don't change the node sequence */
		$max_entry = get("","/acl/accessctrl/webfilter/max");
		if($max_entry == "") $max_entry = 40;

		set($tmp_node."/seqno",1);
		set($tmp_node."/max",$max_entry);
		set($tmp_node."/count",0);

		/* set webfilter rules */
		if($req_WebFilterMethod == "ALLOW") 			{set($tmp_node."/policy","ACCEPT");}
		else if($req_WebFilterMethod == "DENY") 	{set($tmp_node."/policy","DROP");}
		else
		{
			$result = "ERROR";
			TRACE_error("SetWebFilterSettings is not OK: req_WebFilterMethod=".$req_WebFilterMethod);
		}
		if($req_NumberOfEntry <= $max_entry)
		{
			foreach("/runtime/hnap/SetWebFilterSettings/WebFilterURLs/string")
			{
				$req_string = get("","/runtime/hnap/SetWebFilterSettings/WebFilterURLs/string:".$InDeX);
				$newentry = XNODE_add_entry($tmp_node,"URLF");

				anchor($newentry);
				set("url", WebsiteForm_HNAP_to_Seattle($req_string));
				set("url_HNAP", $req_string); // Ref. the description in WebsiteForm_HNAP_to_Seattle function.
			}

			//move tmp node
			movc($tmp_node,"/acl/accessctrl/webfilter");
			del($tmp_node);
		}
		else
		{
			$result = "ERROR";
			TRACE_error("SetWebFilterSettings is not OK: NumberOfEntry > max_entry");
		}
	}
	else //Remove all of the web site filter settings.
	{
		$tmp_node = "/acl/accessctrl/tmp_node";

		set($tmp_node."/seqno",	1);
		set($tmp_node."/max",	get("", "/acl/accessctrl/webfilter/max"));
		set($tmp_node."/count",	0);
		set($tmp_node."/policy",get("", "/acl/accessctrl/webfilter/policy"));
		movc($tmp_node,"/acl/accessctrl/webfilter");
		del($tmp_node);
	}
}

/* set ACL rules */
if($result == "REBOOT")
{
	$QRS_ACL_UID = "ca874728-1390-41e4-b67b-d2737e0bfca6";
	$acl_nodebase = "/acl/accessctrl";
	
	$QRS_ACL_EXIST = false;
	$i=1;
	foreach($acl_nodebase."/entry:".$i)
	{
		if(get("","uid") == $QRS_ACL_UID)
		{
			$QRS_ACL_EXIST = true;
			break;
		}
		$i++;
	}
	
	/* if ACL ploicy for website filter EXIST, disable it when NumberOfEntry=0 */
	if($req_NumberOfEntry == "0")
	{
		if($QRS_ACL_EXIST == true) set($acl_nodebase."/entry:".$i."/enable",0);
	}
	
	/* create an ACL ploicy for website filter */
	if($req_NumberOfEntry != "0")
	{
		set($acl_nodebase."/enable",1);
		
		if($QRS_ACL_EXIST == false)
		{
			$newentry = XNODE_add_entry_for_QRS($acl_nodebase,$QRS_ACL_UID); //set a unique uid
			anchor($newentry);
			set("enable",1);
			set("description","QRS_Website_Filter");
			set("action","BLOCKSOME");
			set("portfilter/enable",0);
			set("webfilter/enable",1);
			set("webfilter/logging",0);
			set("schedule","");
			set("machine/entry/type","OTHERMACHINES");
			set("machine/entry/value","Other Machines");
		}
		else
		{
			$setentry = $acl_nodebase."/entry:".$i;
			anchor($setentry);
			set("enable",1);
			set("description","QRS_Website_Filter");
			set("action","BLOCKSOME");
			set("portfilter/enable",0);
			set("webfilter/enable",1);
			set("webfilter/logging",0);
			set("schedule","");
			set("machine/entry/type","OTHERMACHINES");
			set("machine/entry/value","Other Machines");			
		}
	}
	
	fwrite("w",$ShellPath, "#!/bin/sh\n"); 
	fwrite("a",$ShellPath, "echo [$0] > /dev/console\n");
	fwrite("a",$ShellPath, "event DBSAVE > /dev/console\n");	
	fwrite("a",$ShellPath, "service ACCESSCTRL restart > /dev/console\n");
	fwrite("a",$ShellPath, "xmldbc -s /runtime/hnap/dev_status '' > /dev/console\n");
	set("/runtime/hnap/dev_status", "ERROR");

}
else
{
	fwrite("w",$ShellPath, "#!/bin/sh\n"); 
	fwrite("a",$ShellPath, "echo [$0] > /dev/console\n");
	fwrite("a",$ShellPath, "echo \"We got a error in setting, so we do nothing...\" > /dev/console");
}

?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<soap:Body>
<SetWebFilterSettingsResponse xmlns="http://purenetworks.com/HNAP1/">
	<SetWebFilterSettingsResult><?=$result?></SetWebFilterSettingsResult>
</SetWebFilterSettingsResponse>
</soap:Body>
</soap:Envelope>
