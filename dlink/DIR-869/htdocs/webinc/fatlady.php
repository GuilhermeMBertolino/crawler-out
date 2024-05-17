HTTP/1.1 200 OK
Content-Type: text/xml

<?
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/encrypt.php";

/* get modules that send from hedwig */
/* call $target to do error checking, 
 * and it will modify and return the variables, '$FATLADY_XXXX'. */
$FATLADY_result	= "OK";
$FATLADY_node	= "";
$FATLADY_message= "No modules for Hedwig";	/* this should not happen */

//TRACE_debug("FATLADY dump ====================\n".dump(0, "/runtime/session"));

// AES description for password node.
if(get("", "/runtime/device/sessions_privatekey")==1)
{
	foreach ($prefix."/postxml/module")
	{
		if(query("service")=="INET.INF" || query("service")=="INET.BRIDGE-1" || query("service")=="INET.WAN-1" || query("service")=="INET.WAN-2" || query("service")=="INET.WAN-3" || query("service")=="INET.WAN-4" || query("service")=="INET.WAN-5")
		{
			foreach($prefix."/postxml/module:".$InDeX."/inet/entry")
			{
				if(query("addrtype")=="ppp4" && exist("ppp4/password")==1)
				{
					$password=query("ppp4/password");
					set("ppp4/password", AES_Decrypt128($password));
				}
				else if(query("addrtype")=="ppp6" && exist("ppp6/password")==1)
				{
					$password=query("ppp6/password");
					set("ppp6/password", AES_Decrypt128($password));
				}
			}
		}
		else if(query("service")=="WIFI.PHYINF")
		{
			foreach($prefix."/postxml/module:".$InDeX."/wifi/entry")
			{
				if(exist("wps/pin")==1)
				{
					$pin=query("wps/pin");
					set("wps/pin", AES_Decrypt128($pin));
				}
				if(exist("nwkey/psk/key")==1)
				{
					$key=query("nwkey/psk/key");
					set("nwkey/psk/key", AES_Decrypt128($key));
				}
			}
		}
		else if(query("service")=="DEVICE.ACCOUNT")
		{
			if(exist("device/account/entry/password")==1)
			{
				$password = query("device/account/entry/password");
				set("device/account/entry/password", AES_Decrypt128($password));
			}
		}
		else if(query("service")=="DEVICE.LOG")
		{
			if(exist("device/log/email/smtp/password")==1)
			{
				$password = query("device/log/email/smtp/password");
				set("device/log/email/smtp/password", AES_Decrypt128($password));
			}
		}
		else if(query("service")=="DDNS4.WAN-1")
		{
			if(exist("ddns4/entry/password")==1)
			{
				$password = query("ddns4/entry/password");
				set("ddns4/entry/password", AES_Decrypt128($password));
			}
		}
	}
}

foreach ($prefix."/postxml/module")
{
	del("valid");
	if (query("FATLADY")=="ignore") continue;
	$service = query("service");
	if ($service == "") continue;
	TRACE_debug("FATLADY: got service [".$service."]");
	$target = "/htdocs/phplib/fatlady/".$service.".php";
	$FATLADY_prefix = $prefix."/postxml/module:".$InDeX;
	$FATLADY_base	= $prefix."/postxml";
	if (isfile($target)==1) dophp("load", $target);
	else
	{
		TRACE_debug("FATLADY: no file - ".$target);
		$FATLADY_result = "FAILED";
		$FATLADY_message = "No implementation for ".$service;
	}
	if ($FATLADY_result!="OK") break;
}
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
echo "<hedwig>\n";
echo "\t<result>".	$FATLADY_result.	"</result>\n";
echo "\t<node>".	$FATLADY_node.		"</node>\n";
echo "\t<message>".	$FATLADY_message.	"</message>\n";
echo "</hedwig>\n";
?>
