HTTP/1.1 200 OK
Content-Type: text/xml

<?echo "<?";?>xml version="1.0" encoding="utf-8"<?echo "?>";?>
<postxml>
<? include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/encrypt.php";

function AES_Encrypt_DBnode($Service, $Method)
{
	if($Service=="INET.INF" || $Service=="INET.BRIDGE-1" || $Service=="INET.WAN-1" || $Service=="INET.WAN-2" || $Service=="INET.WAN-3" || $Service=="INET.WAN-4" || $Service=="INET.WAN-5")
	{
		foreach("/inet/entry")
		{
			if(query("addrtype")=="ppp10")
			{
				$addrtype="ppp4";
			}
			if(query("addrtype")=="ppp4" && exist("ppp4/password")==1)
			{
				$password=query("ppp4/password");
				if($Method=="Encrypt")	{set("ppp4/password", AES_Encrypt128($password));}
				else					{set("ppp4/password", AES_Decrypt128($password));}
			}
			else if(query("addrtype")=="ppp6" && exist("ppp6/password")==1)
			{
				$password=query("ppp6/password");
				if($Method=="Encrypt")	{set("ppp6/password", AES_Encrypt128($password));}
				else					{set("ppp6/password", AES_Decrypt128($password));}
			}
		}
	}
	else if($Service=="WIFI.PHYINF")
	{
		foreach("/wifi/entry")
		{
			if(exist("wps/pin")==1)
			{
				$pin=query("wps/pin");
				if($Method=="Encrypt")	{set("wps/pin", AES_Encrypt128($pin));}
				else					{set("wps/pin", AES_Decrypt128($pin));}
			}
			if(exist("nwkey/psk/key")==1)
			{
				$key=query("nwkey/psk/key");
				if($Method=="Encrypt")	{set("nwkey/psk/key", AES_Encrypt128($key));}
				else					{set("nwkey/psk/key", AES_Decrypt128($key));}

			}
		}
	}
	else if($Service=="DEVICE.ACCOUNT")
	{
		if(exist("/device/account/entry/password")==1)
		{
			$password=query("/device/account/entry/password");
			if($Method=="Encrypt")	{set("/device/account/entry/password", AES_Encrypt128($password));}
			else					{set("/device/account/entry/password", AES_Decrypt128($password));}
		}
	}
	else if($Service=="DEVICE.LOG")
	{
		if(exist("/device/log/email/smtp/password")==1)
		{
			$password=query("/device/log/email/smtp/password");
			if($Method=="Encrypt")	{set("/device/log/email/smtp/password", AES_Encrypt128($password));}
			else					{set("/device/log/email/smtp/password", AES_Decrypt128($password));}
		}
	}
	else if($Service=="DDNS4.WAN-1")
	{
		if(exist("/ddns4/entry/password")==1)
		{
			$password=query("/ddns4/entry/password");
			if($Method=="Encrypt")	{set("/ddns4/entry/password", AES_Encrypt128($password));}
			else					{set("/ddns4/entry/password", AES_Decrypt128($password));}
		}
	}
}

if ($_POST["CACHE"] == "true")
{
	echo dump(1, "/runtime/session/".$SESSION_UID."/postxml");
}
else
{
	if($AUTHORIZED_GROUP < 0)
	{
		/* not a power user, return error message */
		echo "\t<result>FAILED</result>\n";
		echo "\t<message>Not authorized</message>\n";
	}
	else
	{
		/* cut_count() will return 0 when no or only one token. */
		$SERVICE_COUNT = cut_count($_POST["SERVICES"], ",");
		TRACE_debug("GETCFG: got ".$SERVICE_COUNT." service(s): ".$_POST["SERVICES"]);
		$SERVICE_INDEX = 0;
		while ($SERVICE_INDEX < $SERVICE_COUNT)
		{
			$GETCFG_SVC = cut($_POST["SERVICES"], $SERVICE_INDEX, ",");
			TRACE_debug("GETCFG: serivce[".$SERVICE_INDEX."] = ".$GETCFG_SVC);
			if ($GETCFG_SVC!="")
			{
				$file = "/htdocs/webinc/getcfg/".$GETCFG_SVC.".xml.php";
				/* GETCFG_SVC will be passed to the child process. */
				if (isfile($file)=="1")
				{
					if(get("", "/runtime/device/sessions_privatekey")==1)
					{
						AES_Encrypt_DBnode($GETCFG_SVC, "Encrypt");
						dophp("load", $file);
						AES_Encrypt_DBnode($GETCFG_SVC, "Decrypt");
					}
					else
					{	dophp("load", $file);}
				}
			}
			$SERVICE_INDEX++;
		}
	}
}
?></postxml>
