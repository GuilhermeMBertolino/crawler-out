<?
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/inf.php";
include "/etc/services/PHYINF/phywifi.php";

/********************************************************************/
function is_upnp_enabled($phyinf)
{
	foreach ("/runtime/inf")
	{
		$cnt = 0;
		if (query("phyinf")==$phyinf) $cnt = INF_getinfinfo(query("uid"), "upnp/count");
		if ($cnt > 0) return 1;
	}
	return 0;
}
function find_bridge($phyinf)
{
	foreach ("/runtime/phyinf")
	{
		if (query("type")!="eth") continue;
		foreach ("bridge/port") if ($VaLuE==$phyinf) {$find = "yes"; break;}
		if ($find=="yes") return query("uid");
	}
	return "";
}
/********************************************************************/

function generate_configs($phyinfuid, $output)
{
	$p = XNODE_getpathbytarget("", "phyinf", "uid", $phyinfuid, 0);
	$wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);
	anchor($wifi);

	/* Find the bridge & device names */
	$bruid = find_bridge($phyinfuid);
	if ($bruid!="") $brdev = PHYINF_getifname($bruid);
	$dev = devname($phyinfuid);

	$authtype	= query("authtype");
	$encrtype	= query("encrtype");
	$ssid		= query("ssid");
	$wps		= query("wps/enable");
	$wps_conf	= query("wps/configured");	if ($wps_conf == "")	$wps_conf = 0;
	$wps_aplocked = query("/runtime/wps/setting/aplocked"); 
	$wps_pin	= query("wps/pin");			if ($wps_pin == "")		$wps_pin = query("/runtime/devdata/pin");
	$rekeyint	= query("nwkey/wpa/groupintv");

	/* for wfa device */
	$vendor		= query("/runtime/device/vendor");
	$model      = query("/runtime/device/modelname");
	$producturl = query("/runtime/device/producturl");
	$upnpp		= XNODE_getpathbytarget("/runtime/upnp", "dev", "deviceType",
					"urn:schemas-wifialliance-org:device:WFADevice:1", 0);
	$uuid		= query($upnpp."/guid");
	$Genericname = query("/runtime/device/upnpmodelname");
	if($Genericname == ""){ $Genericname = $model; }

	$wsc2_version=query("wps/wsc2_version");//marco

	/* Generate config file */
	if		($authtype=="OPEN")		{ $wpa=0;	$ieee8021x=0; }
	else if ($authtype=="SHARED")	{ $wpa=0;	$ieee8021x=0; }
	else if ($authtype=="WEPAUTO")	{ $wpa=0;	$ieee8021x=0; }
	else if ($authtype=="WPA")		{ $wpa=1;	$ieee8021x=1; }
	else if ($authtype=="WPAPSK")	{ $wpa=1;	$ieee8021x=0; }
	else if ($authtype=="WPA2")		{ $wpa=2;	$ieee8021x=1; }
	else if ($authtype=="WPA2PSK")	{ $wpa=2;	$ieee8021x=0; }
	else if ($authtype=="WPA+2")	{ $wpa=3;	$ieee8021x=1; }
	else if ($authtype=="WPA+2PSK")	{ $wpa=3;	$ieee8021x=0; }

	/* generate the config file for hostapd */
	
	fwrite("w", $output, "");
	fwrite("a", $output,
		'interface='.$dev.'\n'.
		'bridge='.$brdev.'\n'.
		'logger_syslog=-1\n'.
		'logger_syslog_level=2\n'.
		'logger_stdout=-1\n'.
		'logger_stdout_level=2\n'
		);
		
	fwrite("a", $output,
		'ctrl_interface=/var/run/hostapd\n'.
		'ctrl_interface_group=0\n'.
		'ssid='.$ssid.'\n'.
		'auth_algs=1\n'.
		'ieee8021x='.$ieee8021x.'\n'.
		'eapol_version=2\n'.
		'eapol_key_index_workaround=0\n'.
		'wpa='.$wpa.'\n'
		);		

	if ($wpa > 0)
	{
		if ($rekeyint != "")				fwrite("a", $output, 'wpa_group_rekey='.$rekeyint.'\n');
		if ($encrtype == "TKIP")			fwrite("a", $output, 'wpa_pairwise=TKIP\n');
		else if ($encrtype == "AES")		fwrite("a", $output, 'wpa_pairwise=CCMP\n');
		else if ($encrtype == "TKIP+AES")	fwrite("a", $output, 'wpa_pairwise=CCMP\n');

		if ($ieee8021x == 1)
		{
			fwrite(a, $output, 'wpa_key_mgmt=WPA-EAP\n');
			foreach("nwkey/eap")
			{
			fwrite(a, $output, 
					'auth_server_addr='.query("radius").'\n'.
					'auth_server_port='.query("port").'\n'.
					'auth_server_shared_secret='.query("secret").'\n'
				);
			}
		}
		else
		{
			fwrite("a", $output, 'wpa_key_mgmt=WPA-PSK\n');
			if (query("nwkey/psk/passphrase")=="1")
				 fwrite("a", $output, 'wpa_passphrase='.query("nwkey/psk/key").'\n');
			else fwrite("a", $output, 'wpa_psk='.query("nwkey/psk/key").'\n');
			
		}
		
		if($wpa == 2)
			fwrite("a",$output,'ieee80211w=1\n');
	}
	else if ($encrtype=="WEP")
	{
		if ($authtype=="SHARED") 		$val = 2; 
		else if ($authtype=="OPEN") 	$val = 1; 
		else 							$val = 3;	/*WEPAUTO*/
		
		fwrite("a", $output, "auth_algs=".$val."\n");
		$wep++;
	}
	else /* Open */
	{
		fwrite("a", $output, 'auth_algs=1\n');
	}


	if ($wep > 0)
	{
		$i = query("nwkey/wep/defkey");
		$i--;
		fwrite("a",$output, 'wep_default_key='.$i.'\n');

		$ascii = query("nwkey/wep/ascii");
		foreach ("nwkey/wep/key")
		{
			if ($InDeX>4) break;
			if ($VaLuE!="")
			{
				$i = $InDeX - 1;
				if ($ascii=="1") $key = '"'.$VaLuE.'"'; else $key = $VaLuE;
				fwrite(a, $output, "wep_key".$i."=".$key."\n");
			}
		}
	}
	
	$pbc_enable=query("/device/features/enablepbc");
	if($pbc_enable=="0") $pbc_enable="0";
	else                 $pbc_enable="1";
	$pin_enable=query("/device/features/enablepin");
	if($pin_enable=="0") $pin_enable="0";
	else                 $pin_enable="1";
	
//wps config
	if($wps == 1 )
	{
		fwrite("a",$output,'eap_server=1\n');
		
		if($wps_conf == 1)
			fwrite("a",$output,'wps_state=2\n'); //configured
		else
			fwrite("a",$output,'wps_state=1\n'); //no configured
		
		/* original code marked by Vic	
		fwrite("a",$output,"pbc_in_m1=1\n");
		fwrite("a",$output,'config_methods=push_button display virtual_display virtual_push_button physical_push_button\n');
		*/
		
		if($wps_aplocked=="1" || $pin_enable=="0")
		{
			fwrite("a", $output,'config_methods=push_button virtual_push_button physical_push_button\n');
			fwrite("a", $output,"pbc_in_m1=1\n");
			fwrite("a", $output, 'ap_setup_locked=1\n');
		}
		else if($wps_conf=="0" || $pbc_enable=="0")
		{
			fwrite("a", $output,'config_methods=label display virtual_display\n');
			fwrite("a", $output, 'ap_setup_locked=0\n');
		}
		else
		{
			fwrite("a", $output,'config_methods=push_button display virtual_display virtual_push_button physical_push_button label\n');
			fwrite("a", $output,"pbc_in_m1=1\n");
			fwrite("a", $output, 'ap_setup_locked=0\n');
		}		
	}
	else
	{
		fwrite("a", $output,'wps_state=0\n'); //disabled
	}	
	
	fwrite("a",$output,
		'manufacturer='.$vendor.'\n'.
		'manufacturer_url='.$producturl.'\n'.
		'serial_number=00000000\n'.
		'model_number='.$model.'\n'.
		'model_name='.$Genericname.'\n'.
		'model_description='.$vendor.' '.$model.' Wireless Broadband Router\n'.
		'friendly_name='.$model.'\n'.
		'uuid='.$uuid.'\n'
	);
	
	fwrite("a", $output,
		'ap_pin='.$wps_pin.'\n'.
		'device_type=6-0050F204-1'.'\n'.
		'device_name='.$model.'\n'.
		'upnp_iface='.$brdev.'\n'
	);
}

/********************************************************************/

function sta_mode($uid)
{
	$p = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);

	$opmode = query($wifi."/opmode");
	
	if($opmode == "STA")
		return "1";
	else
		return "0";
}

echo "<?\n";
echo "$cfg = \"";

$i = 0;
$intf=0;
$hv_intf=0;
foreach ("/runtime/phyinf")
{//2.4G
	if (query("type")!="wifi") continue;

	/* generate the radio list for topology file */
	$uid = query("uid");
	$cnt=scut_count($uid, "BAND24G-1");
	
	if($cnt<=0) continue;
	if (query("media/wifi/authtype")=="SHARED" && query("media/wifi/encrtype")=="WEP") continue;	
	if(sta_mode($uid) == "1") continue;

	$dev = devname($uid);
	$cfile = '/var/run/hostapd-'.$dev.'.conf';
	
	echo $cfile." ";

	$i++;
	/* generate the config file for hostapd */
	generate_configs($uid, $cfile);
}

$i=0;
$hv_intf=0;
foreach ("/runtime/phyinf")
{//5G
	if (query("type")!="wifi") continue;

	/* generate the radio list for topology file */
	$uid = query("uid");
	$cnt=scut_count($uid, "BAND5G-1");
	if($cnt<=0) continue;
	if (query("media/wifi/authtype")=="SHARED" && query("media/wifi/encrtype")=="WEP") continue;	
	if(sta_mode($uid) == "1") continue;
	$dev = devname($uid);
	$cfile = '/var/run/hostapd-'.$dev.'.conf';
	
	echo $cfile." ";

	$i++;
	/* generate the config file for hostapd */
	generate_configs($uid, $cfile);
}

echo "\";\n";
echo "?>\n";
?>
