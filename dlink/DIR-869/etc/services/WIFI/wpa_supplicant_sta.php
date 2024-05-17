<?
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/inf.php";
include "/etc/services/PHYINF/phywifi.php";

/********************************************************************/
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

function trim_strip($str)
{
    $newStr     = "";
    $total_field    = cut_count($str, "-");
    $i = 0;
    while($i < $total_field)
    {
        $field = cut($str, $i, '-');
        $newStr = $newStr.$field;
        $i++;
    }

    return $newStr;
}


function generate_configs($phyinfuid, $output)
{
	$p = XNODE_getpathbytarget("", "phyinf", "uid", $phyinfuid, 0);
	$wifi = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);
	anchor($wifi);

	$bruid = find_bridge($phyinfuid);
	if ($bruid!="") $brdev = PHYINF_getifname($bruid);
	$dev = devname($phyinfuid);

	$authtype	= query("authtype");
	$encrtype	= query("encrtype");
	$ssid		= query("ssid");
	$wps		= query("wps/enable");

	$vendor		= query("/runtime/device/vendor");
	$model      	= query("/runtime/device/modelname");
	$upnpp		= XNODE_getpathbytarget("/runtime/upnp", "dev", "deviceType",
					"urn:schemas-wifialliance-org:device:WFADevice:1", 0);
	$uuid		= query($upnpp."/guid");
	$Genericname = query("/runtime/device/upnpmodelname");
	if($Genericname == ""){ $Genericname = $model; }
	$freq 		= query($p."/media/freq");
	$wsc2_version	= query("wps/wsc2_version");//marco
//	$uuid 		= trim_strip($uuid);
//	$uuid           = $uuid;
	
	if($authtype=="OPEN")   { $wpa=0;  $ieee8021x=0; }  //WEP-Open
	if($authtype=="SHARED") { $wpa=0;  $ieee8021x=0; }  //WEP-Share
	if($authtype=="WEPAUTO"){ $wpa=0;  $ieee8021x=0; }  //WEP-Auto
	if($authtype=="WPA")    { $wpa=1;  $ieee8021x=1; }  //WPA-Enterprise
	if($authtype=="WPAPSK") { $wpa=1;  $ieee8021x=0; }  //WPA-Personal
	if($authtype=="WPA2")   { $wpa=2;  $ieee8021x=1; }  //WPA2-Enterprise
	if($authtype=="WPA2PSK"){ $wpa=2;  $ieee8021x=0; }  //WPA2-Personal
	if($authtype=="WPA+2")  { $wpa=3;  $ieee8021x=1; }  //WPA/WPA2-Enterprise
	if($authtype=="WPA+2PSK"){$wpa=3;  $ieee8021x=0; }  //WPA/WPA2-Personal	

	fwrite("w", $output, "");
	
	//todo : we shouldn't need this line
	fwrite("a", $output, 'ctrl_interface=/var/run/wpa_supplicant\n\n');
	//fwrite("a", $output, 'wps_helper=/etc/scripts/wps_sta.sh\n');
	fwrite("a", $output, 'ap_scan=1\n');
//	fwrite("a", $output, 'uuid='.$uuid.'\n');
//	fwrite("a", $output,
//		'manufacturer=\"'.$vendor.'\"\n'.
//		'serial_number=00000000\n'.
//		'model_number=00000000\n'.
//		'model_name=\"'.$Genericname.'\"\n'.
//		'config_methods=0x0278c\n'
//	);

//	if($wsc2_version!="")   { fwrite("a", $output,'os_version=80000000\n'); }
//	if($wsc2_version!="")   { fwrite("a", $output,'os_version=01020300\n'); }
//	else                    { fwrite("a", $output,'os_version=00000001\n'); }


	fwrite("a", $output, 'network={\n');	
	fwrite("a", $output, '	ssid=\"'.$ssid.'\"\n');
	fwrite("a", $output, '	scan_ssid=1\n');
	
	if($ieee8021x == 0)
	{
		if($wpa == 0)
		{
			if($authtype=="SHARED")         {fwrite("a", $output, '	auth_alg=SHARED\n');}
			else if($authtype=="WEPAUTO")   {fwrite("a", $output, '	auth_alg=OPEN SHARED\n');}
			else                            {fwrite("a", $output, '	auth_alg=OPEN\n');}

			if ($encrtype == "WEP")
			{
				$ascii = query("nwkey/wep/ascii");
				$index = query("nwkey/wep/defkey");
				$key     = query("nwkey/wep/key:".$index);
				$index--;
				if ($ascii == "1")  {$wepkey = '\"'.$key.'\"';}
				else                {$wepkey = $key;}
				fwrite("a", $output,
					'	wep_key'.$index.'='.$wepkey.'\n'.
					'	wep_tx_keyidx='.$index.'\n'
				);
			}
			fwrite("a", $output, '	key_mgmt=NONE\n');
		}
		else
		{
			$pskkey = query("nwkey/psk/key");
			fwrite("a", $output,
				'	psk=\"'.$pskkey.'\"\n'.
				'	key_mgmt=WPA-PSK\n'
			);
		}
	}

//	fwrite("a", $output, '     proto=WPA\n');		
	if ($wpa==1)        {fwrite("a", $output, '	proto=WPA\n');}
	else if ($wpa==2)   {fwrite("a", $output, '	proto=RSN\n');}
	else if ($wpa==3)   {fwrite("a", $output, '	proto=WPA RSN\n');}
	if      ($encrtype == "TKIP")       {fwrite("a", $output, "	pairwise=TKIP\n	group=TKIP\n");}
	else if ($encrtype == "AES")        {fwrite("a", $output, "	pairwise=CCMP\n	group=CCMP TKIP\n");}
	else if ($encrtype == "TKIP+AES")   {fwrite("a", $output, "	pairwise=CCMP TKIP\n	group=CCMP TKIP\n");}
	fwrite("a", $output, '}\n');	
}
 
echo "<?\n";
echo "$cfg = \"";
$sta_phy24    = XNODE_getpathbytarget("", "phyinf", "uid", "WIFISTA-1.1", 0);
$sta_phy5    = XNODE_getpathbytarget("", "phyinf", "uid", "WIFISTA-2.1", 0);
if(query($sta_phy24."/active") == 1)
	$uid = "WIFISTA-1.1";
else if(query($sta_phy5."/active") == 1)
	$uid = "WIFISTA-2.1";
$cfile = '/var/run/wpa_supplicant.conf';
echo $cfile." ";
 
generate_configs($uid, $cfile);
echo "\";\n";
echo "?>\n";
?>
