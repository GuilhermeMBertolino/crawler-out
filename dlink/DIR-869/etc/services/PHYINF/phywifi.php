<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}
function error($err)	{startcmd("exit ".$err); stopcmd("exit ".$err); return $err;}

/**********************************************************************/
function is_active($uid)
{
    $phy = XNODE_getpathbytarget("", "phyinf", "uid", $uid);
    if($phy == "")
        return 0;

	if(get("x", $phy."/active") != 1) 
		return 0;

	return 1;
}

function devname($uid)
{
	if ($uid=="BAND24G-1.1")	return "ath0";
	else if ($uid=="BAND24G-1.2") return "ath1";
	else if ($uid=="BAND5G-1.1") return "ath2";
	else if ($uid=="BAND5G-1.2") return "ath3";
	else if ($uid=="STATION24G-1.1") 	return "ath0";
	else if ($uid=="STATION5G-1.1") 	return "ath2";
	else if ($uid=="WIFISTA-1.1") 	return "ath1";
	else if ($uid=="WIFISTA-2.1") 	return "ath3";
	return "ath0";
}

/* what we check ?
1. if host is disabled, then our guest must also be disabled !!
*/
function host_guest_dependency_check($prefix)
{
	$host_uid=$prefix."-1.1";
	$p = XNODE_getpathbytarget("", "phyinf", "uid", $host_uid, 0);
	if (query($p."/active")!=1) return 0;
	else 						return 1;
}

function isguestzone($uid)
{
	$postfix = cut($uid, 1,"-");
	$minor = cut($postfix, 1,".");
	if($minor=="2")	return 1;
	else			return 0;
}
function isprimary($uid)
{
        $postfix = cut($uid, 1,"-");
        $minor = cut($postfix, 1,".");
        if($minor=="1") return 1;
        else                    return 0;
}

function find_brdev($phyinf)
{
	foreach ("/runtime/phyinf")
	{
		if (query("type")!="eth") continue;
		foreach ("bridge/port") if ($VaLuE==$phyinf) {$find = "yes"; break;}
		if ($find=="yes") return query("name");
	}
	return "";
}

function a_channel_is_plus($ch)
{
	if($ch==36||$ch==44||$ch==52||$ch==60||$ch==100||$ch==108||$ch==116||$ch==124||$ch==132||$ch==149||$ch==157){
        return "1";
    }
    else if($ch==40||$ch==48||$ch==56||$ch==64||$ch==104||$ch==112||$ch==120||$ch==128||$ch==136||$ch==153||$ch==161){
    	return "0";
	}
	else if($ch==165||$ch==140){
		return "2";
	}
	else return "-1";
}

function get_parent_phy_uid($uid)
{
	if (isguestzone($uid) == 1)
	{
		$prefix = cut($uid, 0, ".");
		$uid = $prefix.".1";
	}

	return $uid;
}

function get_vap_activate_file_path()
{
	$file_path = "/var/run/activateVAP.sh";
	return $file_path;
}

function wifi_AP($uid)
{
	$prefix = cut($uid, 0,"-");

	if($prefix=="BAND5G") 
	{
		$bandmode	= "5G";
		$is5G	= 1;
	}
	else
	{
		$bandmode   = "2G";
		$is5G   = 0;
	}

	$phy 	= XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$wifi 	= XNODE_getpathbytarget("/wifi", "entry", "uid", query($phy."/wifi"), 0);
	$active = query($phy."/active");
	$dev = devname($uid);
		
	startcmd("# ".$uid.", dev=".$dev);
	PHYINF_setup($uid, "wifi", $dev);
	$brdev = find_brdev($uid);
			
	if(isguestzone($uid)=="1")
	{
		/* bring up guestzone bridge */
		startcmd("ip link set ".$brdev." up");

		/*Use the same configuration of hostzone to bring up guestzone*/
		if($is5G == 1)
		{
			$phy	= XNODE_getpathbytarget("", "phyinf", "uid", "BAND5G-1.1", 0);
		}
		else
		{
			$phy   = XNODE_getpathbytarget("", "phyinf", "uid", "BAND24G-1.1", 0);
		}
	}
			
	anchor($phy."/media");
			
	$channel		= query("channel");				if ($channel=="")			{$channel="0";}
	$beaconinterval	= query("beacon");				if ($beaconinterval=="")	{$beaconinterval="100";}
	$bandwidth		= query("dot11n/bandwidth");
	if ($bandwidth=="20" )			{$bandwidth="0";}
	else if($bandwidth=="20+40" ) 		{$bandwidth="1";}
	else if($bandwidth=="20+40+80" )		{$bandwidth="2";}
	$ssidhidden		= query($wifi."/ssidhidden");	if ($ssidhidden!="1")		{$ssidhidden="0";}
	/* In order to support special character, we use the get() instead of query() to get SSID from xmldb. */
	//$ssid 		= query($wifi."/ssid");			if ($ssid=="")				{$ssid="wd";} 			
	$ssid 			= get("s", $wifi."/ssid");		if ($ssid=="")				{$ssid="wd";} 			
	$wmm			= query("wmm/enable");			if ($wmm!="1")				{$wmm="0";}
	$sgi			= query("dot11n/guardinterval");			
	if ($sgi=="400" )			{$sgi="1";}
	else						{$sgi="0";}
	$wlanmode		= query("wlmode");
	$puren			= "0";
	$pureg			= "0";
	$pure11ac		= "0";
			
	$txpower		= query("txpower");
	if($txpower=="100")		{$txpower="0";}
	else if($txpower=="50")		{$txpower="1";}
	else if($txpower=="25")		{$txpower="2";}
	else if($txpower=="12.5")	{$txpower="3";}
	
	$bw2040coexist = query("dot11n/bw2040coexist");

        $authtype       = query($wifi."/authtype");
        $encrtype       = query($wifi."/encrtype");

	if($is5G == 1)
	{
		//startcmd("iwpriv wifi1 tpscale ".$txpower);
		//an, n only, a only, ac
		//TRACE_error("wlanmode=".$wlanmode);
		//TRACE_error("bandwidth=".$bandwidth);
                if($wlanmode == "acna")
                {
                        $chmode = "11ACVHT20";
                        if($bandwidth==2)       {$chmode = "11ACVHT80";}
                        else if($bandwidth==1)       {$chmode = "11ACVHT40";}
                        else                            {$chmode = "11ACVHT20";}
                }
                else if($wlanmode == "acn")
                {
                        $puren="1";
                        $chmode = "11ACVHT20";
                        if($bandwidth==2)       {$chmode = "11ACVHT80";}
                        else if($bandwidth==1)       {$chmode = "11ACVHT40";}
                        else                            {$chmode = "11ACVHT20";}
                }
                else if($wlanmode == "ac")
                {
                        $pure11ac="1";
                        $chmode = "11ACVHT20";
                        if($bandwidth==2)       {$chmode = "11ACVHT80";}
                        else if($bandwidth==1)       {$chmode = "11ACVHT40";}
                        else                            {$chmode = "11ACVHT20";}
                }
		else if($wlanmode == "an")
		{
			$chmode = "11NAHT20";
			if($bandwidth==1)	{$chmode = "11NAHT40";}
			else 				{$chmode = "11NAHT20";}
		}
		else if($wlanmode == "n")
		{
			$puren="1";
			$chmode = "11NAHT20";
			if($bandwidth==1)	{$chmode = "11NAHT40";}
			else 				{$chmode = "11NAHT20";}
		}		
		else if($wlanmode == "a")
		{
			$chmode = "11A";
		}
		else
		{
			$chmode = "11NAHT20";
		}
		//TRACE_error("chmode=".$chmode);
	        //for fixed channel, need to determine plus and minus
		if($chmode == "11ACVHT80" && $channel != "0")
		{
			if($channel==140 || $channel==165)      {$chmode = "11ACVHT20";}
	                else if($channel==132 || $channel==136) {$chmode = "11ACVHT40";}
		}
                if($chmode == "11ACVHT40" && $channel != "0")
                {
                        $PLUS = a_channel_is_plus($channel);
                        if($PLUS=="-1") { TRACE_error("wrong A band channel: ".$channel); }

                        if($PLUS=="1")          {$chmode = "11ACVHT40PLUS";}
                        else if($PLUS=="0")     {$chmode = "11ACVHT40MINUS";}
                        else                            {$chmode = "11ACVHT20";}
                }
				
		//for fixed channel, need to determine plus and minus 
		if($chmode == "11NAHT40" && $channel != "0")
		{
			$PLUS = a_channel_is_plus($channel); 
			if($PLUS=="-1") { TRACE_error("wrong A band channel: ".$channel); }
					
			if($PLUS=="1")  	{$chmode = "11NAHT40PLUS";}
			else if($PLUS=="0")	{$chmode = "11NAHT40MINUS";}
			else				{$chmode = "11NAHT20";}
		}
	}
	else
	{
		//startcmd("iwpriv wifi0 tpscale ".$txpower);
		//1:11g only, 2.b/g mode 3:11b only, 4:only n  5:b/g/n mix, 6:g/n mix
		if($wlanmode == "g")
		{
			$pureg="1";
			$chmode = "11G";
		}
		else if($wlanmode == "bg")
		{
			$chmode = "11G";
		}		
		else if($wlanmode == "n")
		{
			$puren="1";
			if($bandwidth==1)	{$chmode = "11NGHT40";}
			else 				{$chmode = "11NGHT20";}
		}
		else if($wlanmode == "bgn")
		{
			if($bandwidth==1)	{$chmode = "11NGHT40";}
			else 				{$chmode = "11NGHT20";}
		}
		else if($wlanmode == "gn")
		{
			$pureg="1";				
			if($bandwidth==1)	{$chmode = "11NGHT40";}
			else 				{$chmode = "11NGHT20";}
		}
		else if($wlanmode == "b")
		{
			$chmode = "11B";
		}
		else //for DEFAULT
		{
			$chmode = "11NGHT20";
		}
				
		//for fixed channel, need to determine plus and minus 
		if($chmode == "11NGHT40" && $channel != "0")
		{
			if($channel<5)
			{
				//channel 1~4
				$chmode = "11NGHT40PLUS";
			}
			else if($channel<=11 && $channel>=5)
			{
				//channel 5~11
				$chmode = "11NGHT40MINUS";
			}
			else
			{ 
				//channel 12~14
				$chmod = "11NGHT20";
			}
		}
	}
				
	/* bring up the interface and bridge */
	//create the VAP athX
	$params = "";
	$params = $params."BANDMODE=".$bandmode.";";
	$params = $params."CH_MODE=".$chmode.";";
	$params = $params."PUREN=".$puren.";PUREG=".$pureg.";";
	//$params = $params."AP_CHANBW=".$bandwidth.";";
	//we don't know when to use iwpriv ath0 chanbw 1, let CH_MODE to be 11NGHT40 ??
	$params = $params."AP_HIDESSID=".$ssidhidden.";";
	$params = $params."AP_WMM=".$wmm.";";
	$params = $params."RF=RF;";
	$params = $params."PRI_CH=".$channel.";";
	$params = $params."BEACONINT=".$beaconinterval.";";
	$params = $params."ATH_NAME=".$dev.";";
	$params = $params."R_SHORTGI=".$sgi.";";
			
	if($bandmode == "2G")
	{
		$wifi_dev = "wifi0";
	}
	else
	{
		$wifi_dev = "wifi1";
	}

	startcmd("wlanconfig ".$dev." create wlandev ".$wifi_dev." wlanmode ap");	
	if($bandmode == "2G" && isprimary($uid)=="1")
	{
		startcmd("iwpriv ".$wifi_dev." HALDbg 0x0");
		startcmd("iwpriv ".$wifi_dev." ATHDebug 0x0");
		startcmd("iwpriv ".$wifi_dev." disablestats 0");
	}
	startcmd("iwpriv ".$dev." dbgLVL 0x100");
    	if(isprimary($uid)=="1")
    	{
		startcmd("ifconfig ".$wifi_dev." txqueuelen 1000");
	}

	startcmd("ifconfig ".$dev." txqueuelen 1000");
	startcmd("iwpriv ".$dev." shortgi ".$sgi);	
	startcmd("iwpriv ".$dev." mode ".$chmode);

	if($bandmode == "2G" && isprimary($uid)=="1")
	{
		//startcmd("iwpriv wifi0 ForBiasAuto 1");
		startcmd("iwpriv wifi0 ANIEna 1");     
	    	//startcmd("iwpriv wifi0 noisespuropt 1"); 
		startcmd("iwpriv ath0 doth 0"); 	    
	}
      if($bandmode == "5G" && isprimary($uid)=="1")
        {
            startcmd("iwpriv wifi1 enable_ol_stats 1");
		startcmd("iwpriv ath2 doth 1"); 	    
       }
	startcmd("iwpriv ".$dev." puren ".$puren);
	startcmd("iwpriv ".$dev." pureg ".$pureg);
	startcmd("iwconfig ".$dev." essid \"".$ssid."\" mode master freq ".$channel);	
      if($bandmode == "5G")
	{
		startcmd("iwpriv ".$dev." pure11ac ".$pure11ac);
	}
        if($bandmode == "2G" && isprimary($uid)=="1")
        {
                startcmd("iwpriv wifi0 AMPDU 1");
                startcmd("iwpriv wifi0 AMPDUFrames 32");
                startcmd("iwpriv wifi0 AMPDULim 50000");

        }

	if(isprimary($uid)=="1")
	{
	    	startcmd("iwpriv ".$wifi_dev." txchainmask 7"); 
	    	startcmd("iwpriv ".$wifi_dev." rxchainmask 7"); 
	}
	startcmd("ifconfig ".$dev." -allmulti");
	startcmd("iwpriv ".$dev." mcastenhance 0");
	startcmd("iwpriv ".$dev." acparams 1 0 0 0");

        if(isprimary($uid)=="1")
	{
		startcmd("iwpriv ".$dev." bintval ".$beaconinterval); 	    
	}
// 	startcmd("iwconfig ".$dev." mode master");
	

	startcmd("iwpriv ".$dev." hide_ssid ".$ssidhidden); 
	startcmd("iwpriv ".$dev." wmm ".$wmm); 
	if(isprimary($uid)=="1")
	{
		startcmd("iwpriv ".$dev." extprotspac 0");
	}

	if($bw2040coexist == "0" && $bandmode == "2G")
	{
		startcmd("iwpriv ".$dev." disablecoext 1");
	}
        if(isprimary($uid)=="1")
        {
                startcmd("iwpriv ".$wifi_dev." tpscale ". $txpower);
	}
	$hostapd = 1;
	if($encrtype=="WEP" && $authtype=="SHARED")
	{
		$defkey = query($wifi."/nwkey/wep/defkey");
		$ascii = query($wifi."/nwkey/wep/ascii");

        /*
         *      For ASCII string:
         *              iwconfig ath0 key s:"ascii" [1]
         *      For Hex string:
         *              iwconfig ath0 key "1234567890" [1]
         */
 		foreach ($wifi."/nwkey/wep/key")
                {
                        if ($InDeX>4) break;
                        if ($VaLuE!="")
                        {
                                $i = $InDeX - 1;
                                $key = '"'.$VaLuE.'"';
                        }
                }

		if ($ascii==1)      { $iw_keystring="s:".$key." [".$defkey."]";}
        	else                { $iw_keystring="".$key." [".$defkey."]"; }

		/* Set to open mode, this will force driver to initialize the key table. */
		startcmd("iwpriv ".$dev." authmode 1");
		startcmd("iwconfig ".$dev." key ".$iw_keystring);
		//new UI only support WEP auto
		startcmd("iwpriv ".$dev." authmode 2");
		startcmd("iwconfig ".$dev." key ".$iw_keystring);
		startcmd("iwpriv ".$dev." authmode 4");
		$hostapd = 0;
	}
	//$makeVAPcmd = "/etc/ath/makeVAP ap \"".$ssid."\" \"".$params."\"";
	//$makeVAPcmd = "/etc/ath/makeVAP.alpha";
	//TRACE_error("makeVAPcmd=".$makeVAPcmd);
			
	//startcmd($makeVAPcmd);

	//startcmd("phpwifish /etc/scripts/wlan_start.php UID=".$uid." SSID=".$ssid." BANDMODE=".$bandmode." CH_MODE=".$chmode." PUREN=".$puren." PUREG=".$pureg." AP_HIDESSID=".$ssidhidden." AP_WMM=".$wmm." PRI_CH=".$channel." BEACONINT=".$beaconinterval." R_SHORTGI=".$sgi);

	//activate the VAP athX (add to bridge, etc)
	$wifi_activateVAP = get_vap_activate_file_path();
	startcmd("echo /etc/ath/activateVAP ".$dev." ".$brdev." >> ".$wifi_activateVAP);
	startcmd("phpsh /etc/scripts/wifirnodes.php UID=".$uid);

	startcmd("xmldbc -P /etc/services/WIFI/updatewifistats.php -V PHY_UID=".$uid." > /var/run/restart_upwifistats.sh;");
	startcmd("sh /var/run/restart_upwifistats.sh");
			
	if(isguestzone($uid)=="1")
	{
		startcmd("iwpriv ".$dev." w_partition 1");
	}

	stopcmd("phpsh /etc/scripts/delpathbytarget.php BASE=/runtime NODE=phyinf TARGET=uid VALUE=".$uid);
	stopcmd("ifconfig ".$dev." down");
	stopcmd("sleep 1");
	stopcmd("wlanconfig ".$dev." destroy");
	stopcmd("sleep 1");
	stopcmd("echo 1 > /var/run/".$uid.".DOWN");
	stopcmd("rm -f /var/run/".$uid.".UP");
	stopcmd("sh /etc/scripts/close_wlan_led.sh"); 
	
	if(isguestzone($uid)=="0") //hostzone
	{
		startcmd("phpsh /etc/scripts/wpsevents.php ACTION=ADD UID=".$uid);
		startcmd("event WLAN.CONNECTED");
		stopcmd("phpsh /etc/scripts/wpsevents.php ACTION=FLUSH UID=".$uid);
		stopcmd("event WPS.NONE\n");
	}
	if($hostapd!=0)
	{
		$runtime_p = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $uid, 0);
		set($runtime_p."/hostapd","1");
	}
	startcmd("iwpriv ".$dev." athnewind 1");
}

function wifi_STA($is5G)
{
	if($is5G == 1) 
	{	
		$uid = "STATION5G-1.1";
		$bandmode 	= "5G";
	}
	else
	{
		$uid = "STATION24G-1.1";
		$bandmode 	= "2G";
	}
	
	$p 		= XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	if ($p != "")
	{
		$active = query($p."/active");
		$wifi 	= XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);
		$dev = devname($uid);
		if ($active!=1)
		{
			startcmd("# ".$uid." is inactive!");
			return;
		}
		else
		{
			startcmd("# ".$uid.", dev=".$dev);
			PHYINF_setup($uid, "wifi", $dev);
			$brdev = find_brdev($uid);
			
			if ($bandmode == "2G")
			{
				$makeVAPcmd = "/etc/ath/makeVAP sta \"My Net N600 sta\" \"BANDMODE=".$bandmode.";CH_MODE=11NGHT20;PUREN=0;PUREG=0;RF=RF;PRI_CH=0;ATH_NAME=".$dev.";\"";
			}
			else if ($bandmode == "5G")
			{
				$makeVAPcmd = "/etc/ath/makeVAP sta \"My Net N600 sta\" \"BANDMODE=".$bandmode.";CH_MODE=11NAHT20;PUREN=0;PUREG=0;RF=RF;PRI_CH=0;ATH_NAME=".$dev.";\"";
			}
			TRACE_error("makeVAPcmd=".$makeVAPcmd);
			
			startcmd($makeVAPcmd);
 
			//activate the VAP athX (add to bridge, etc)
			$wifi_activateVAP = get_vap_activate_file_path();
			startcmd("echo /etc/ath/activateVAP ".$dev." ".$brdev." >> ".$wifi_activateVAP);
			startcmd("phpsh /etc/scripts/wifirnodes.php UID=".$uid);

			stopcmd("phpsh /etc/scripts/delpathbytarget.php BASE=/runtime NODE=phyinf TARGET=uid VALUE=".$uid);
			stopcmd("ifconfig ".$dev." down");
			stopcmd("wlanconfig ".$dev." destroy");
			stopcmd("echo 1 > /var/run/".$uid.".DOWN");
			stopcmd("rm -f /var/run/".$uid.".UP");
			stopcmd("sh /etc/scripts/close_wlan_led.sh"); 
		}
	}
	
	startcmd("phpsh /etc/scripts/wpsevents.php ACTION=ADD UID=".$uid);
	startcmd("event WLAN.CONNECTED");

	stopcmd("phpsh /etc/scripts/wpsevents.php ACTION=FLUSH UID=".$uid);
	stopcmd('xmldbc -t \"close_WPS_led:3:event WPS.NONE\"\n');
	set("/runtime/wpa_supplicant/enable","1");
}

function wifi_REP($uid)
{
	$FEATURE_REPEATER_WPS_DISABLE = 1;
	//	$uid = "WIFI-REPEATER";
	if($uid == "WIFISTA-1.1")
	{
		$bandmode       = "2G";
	}
	else if($uid == "WIFISTA-2.1")
	{
		$bandmode       = "5G";
	}
	$p              = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	if ($p != "")
	{
		$active = query($p."/active");
		$wifi   = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);
		$dev = devname($uid);
		if ($active!=1)
		{
			startcmd("# ".$uid." is inactive!");
			return;
		}
		else
		{
			startcmd("# ".$uid.", dev=".$dev);
			PHYINF_setup($uid, "wifi", $dev);
			$ssid = get("s", $wifi."/ssid");
			if ($ssid=="")                        {$ssid="dlink";}
			$gw_name = query("/device/gw_name");
			$brdev = find_brdev($uid);
			if($bandmode == "2G")
			{
				$wifi_dev = "wifi0";
			}
			else
			{
				$wifi_dev = "wifi1";
			}
			startcmd("wlanconfig ".$dev." create wlandev ".$wifi_dev." wlanmode sta");
			startcmd("iwpriv ".$dev." extap 1");
			startcmd("iwpriv ".$dev." athnewind 1");
			startcmd("iwpriv ".$dev." dbgLVL 0x100");
			startcmd("ifconfig ".$dev." txqueuelen 1000");
			startcmd("iwpriv ".$dev." shortgi 1");
			startcmd("iwpriv ".$dev." mode AUTO");
			if($bandmode == "2G")
				startcmd("iwpriv ".$dev." vap_doth 0");

			startcmd("iwpriv ".$dev." pureg 0");
			startcmd("iwpriv ".$dev." puren 0");
			startcmd("iwconfig ".$dev." essid \"".$ssid."\" mode managed freq 0");
//			startcmd("iwpriv ".$dev." set11NRates 0x8c8c8c8c");
//			startcmd("iwpriv ".$dev." set11NRetries 0x04040404");
			startcmd("ifconfig ".$dev." -allmulti");
			startcmd("iwpriv ".$dev." mcastenhance 0");
			startcmd("iwpriv ".$dev." acparams 1 0 0 0");
/*			if ($bandmode == "2G")
			{
				$makeVAPcmd = "/etc/ath/makeVAP sta-ext ".$ssid." BANDMODE=".$bandmode.";CH_MODE=AUTO;PUREN=0;PUREG=0;RF=RF;PRI_CH=0;ATH_NAME=".$dev.";R_SHORTGI=1;AP_WMM=1;";
			}
			else if ($bandmode == "5G")
			{
				$makeVAPcmd = "/etc/ath/makeVAP sta-ext ".$ssid" BANDMODE=".$bandmode.";CH_MODE=11NAHT40PLUS;PUREN=0;PUREG=0;RF=RF;PRI_CH=0;ATH_NAME=".$dev.";R_SHORTGI=1;AP_WMM=1;";
			}
			//TRACE_error("makeVAPcmd=".$makeVAPcmd);
			startcmd($makeVAPcmd);*/
			//activate the VAP athX (add to bridge, etc)
			$wifi_activateVAP = get_vap_activate_file_path();
			//startcmd("echo /etc/ath/activateVAP ".$dev." ".$brdev." >> ".$wifi_activateVAP);
			startcmd("sh /etc/ath/activateVAP ".$dev." ".$brdev);
			startcmd("phpsh /etc/scripts/wifirnodes.php UID=".$uid);
			
			startcmd("xmldbc -P /etc/services/WIFI/updatewifistats.php -V PHY_UID=".$uid." > /var/run/restart_upwifistats.sh;");
			startcmd("sh /var/run/restart_upwifistats.sh");


			//if(query("/runtime/wpa_supplicant/enable")=="1")
			//{
				startcmd("xmldbc -P /etc/services/WIFI/wpa_supplicant_sta.php > /var/topology_sta.conf");
				startcmd("wpa_supplicant -b br0 -i ".$dev." -c /var/run/wpa_supplicant.conf -P /var/run/wpa_supplicant_".$uid.".pid &");
				startcmd("echo $! > /var/run/wpa_supplicant_".$uid.".pid");
				//startcmd("wpa_supplicant -B -D athr -i "" &");				
				
				//stopcmd("killall wpa_supplicant");
				stopcmd("/etc/scripts/killpid.sh /var/run/wpa_supplicant_".$uid.".pid");
				set("/runtime/wpa_supplicant/enable","0");
			//}			

			stopcmd("/etc/scripts/killpid.sh /var/run/upwifistats_".$uid.".pid");
			
			stopcmd("phpsh /etc/scripts/delpathbytarget.php BASE=/runtime NODE=phyinf TARGET=uid VALUE=".$uid);
			stopcmd("ifconfig ".$dev." down");
			stopcmd("wlanconfig ".$dev." destroy");
			stopcmd("echo 1 > /var/run/".$uid.".DOWN");
			stopcmd("rm -f /var/run/".$uid.".UP");
			stopcmd("sh /etc/scripts/close_wlan_led.sh");
		}
	}
	if($FEATURE_REPEATER_WPS_DISABLE == 0)
	{
		startcmd("phpsh /etc/scripts/wpsevents.php ACTION=ADD UID=".$uid);
		startcmd("event WLAN.CONNECTED");

		stopcmd("phpsh /etc/scripts/wpsevents.php ACTION=FLUSH UID=".$uid);
		stopcmd('xmldbc -t \"close_WPS_led:3:event WPS.NONE\"\n');
	}
	set("/runtime/wpa_supplicant/enable","1");
}

function wificonfig($uid)
{
	fwrite(w,$_GLOBALS["START"], "#!/bin/sh\n");
	fwrite(w,$_GLOBALS["STOP"],  "#!/bin/sh\n");
	
	$p 		= XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$wifi 	= XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);

	$dev	= devname($uid);
	$prefix = cut($uid, 0,"-");
	
	if(query($wifi."/opmode")=="AP")
	{
		$is_APmode=1;
		$opmode = "AP";
	}
	else if(query($wifi."/opmode")=="STA")
	{
		$is_APmode=0;
		$opmode = "STA";
		if($prefix=="STATION5G") {$is_5G = 1;}
		else {$is_5G = 0;}
	}
	else if(query($wifi."/opmode")=="REPEATER")
	{
		$is_APmode=0;
		$opmode = "REPEATER";
		if($uid=="WIFISTA-2.1") {$is_5G = 1;}
		else {$is_5G = 0;}
	}
	
	if ($p=="")					return error(9);
	if (query($p."/active")!=1) 
	{
		startcmd("# ".$uid." is inactive!");
		return error(8);
	}
	if($is_APmode == 1)
	{
		if(host_guest_dependency_check($prefix)==0)
		{
			startcmd("# The hostzone (".$uid.") is inactive. \nStop to continue the guestzone !");
			return error(8);
		}
	}

	$layout=query("/device/layout");
	if(isguestzone($uid)=="1" && $layout=="bridge")
	{
		startcmd("# In bridge,we don't support guest zone.");
		$runtime_p = XNODE_getpathbytarget("/runtime", "phyinf", "uid", $uid, 0);
		if($runtime_p!="")
		{
			set($runtime_p."/valid","0"); 				
		}
		return error(0);
	}
	
	startcmd("rm -f /var/run/".$uid.".DOWN");
	startcmd("echo 1 > /var/run/".$uid.".UP");
	if($opmode == "AP")
		wifi_AP($uid);
	else if($opmode == "STA")
		wifi_STA($is_5G);
	else if($opmode == "REPEATER")
		wifi_REP($uid);
	
	/* for closing guestzone bridge */
	/* do this only at both guestzone interfaces are down.*/
	if ($is_APmode == 1)
	{
		if($uid == "BAND5G-1.2")
		{
			$active_24G_guest = query("/phyinf:5/active");
			if($active_24G_guest == "0")
			{
				//get brname of guestzone
				$brname = find_brdev($uid);
				stopcmd("ip link set ".$brname." down");
			}
		}

		if($uid == "BAND24G-1.2")
		{
			$brname = find_brdev($uid);
			stopcmd("ip link set ".$brname." down");
		}
	}
	return error(0);
}

function get_repeater_vap_activate_file_path()
{
        $file_path = "/var/run/activate_repeaterVAP.sh";
        return $file_path;
}

function repeaterconfig($uid)
{
        fwrite(w,$_GLOBALS["START"], "#!/bin/sh\n");
        fwrite(w,$_GLOBALS["STOP"],  "#!/bin/sh\n");

        startcmd("rm -f /var/run/".$uid.".DOWN");
        startcmd("echo 1 > /var/run/".$uid.".UP");


	if($uid=="REPEATER24G") { $ap_uid="BAND24G-1.1";}
	else{ $ap_uid="BAND5G-1.1";}	
	$p              = XNODE_getpathbytarget("", "phyinf", "uid", $ap_uid, 0);	
	$wifi   = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p."/wifi"), 0);
	$dev = devname($uid);
	$brdev = find_brdev($uid);
	PHYINF_setup($uid, "wifi", $dev);
	$authtype       = query($wifi."/authtype");
	$ssid = get("s", $wifi."/ssid");
	if ($ssid=="")                        {$ssid="dlink";}
	if($uid=="REPEATER24G"){
		$makeVAPcmd = "/etc/ath/makeVAP sta-ext \"".$ssid."\"  \"BANDMODE=2G;CH_MODE=11NGHT20;PUREN=0;PUREG=0;RF=RF;PRI_CH=0;ATH_NAME=ath1;R_SHORTGI=1;\"";
	}
	//5G not ready
	startcmd($makeVAPcmd);
	$wifi_activateVAP = get_repeater_vap_activate_file_path();
	startcmd("echo /etc/ath/activateVAP ".$dev." ".$brdev." >> ".$wifi_activateVAP);

        stopcmd("ifconfig ".$dev." down");
        stopcmd("wlanconfig ".$dev." destroy");

        stopcmd("echo 1 > /var/run/".$uid.".DOWN");
        stopcmd("rm -f /var/run/".$uid.".UP");
	if($authtype != "OPEN")	{
		set("/runtime/wpa_supplicant/enable","1");
	}
	$wisp_mode = query("/device/wisp/enable");
	if($wisp_mode == "1"){	startcmd("service INET.WAN-1 restart");}
}
function phyinf_active($uid)
{
	fwrite(w,$_GLOBALS["START"], "#!/bin/sh\n");
	fwrite(w,$_GLOBALS["STOP"],  "#!/bin/sh\n");

	$p   = XNODE_getpathbytarget("", "phyinf", "uid", $uid, 0);
	$dev = devname($uid);
	if (query($p."/active")=="1")
	{
		startcmd("ifconfig ".$dev." up");
		stopcmd("ifconfig ".$dev." down");
	}

}
?>
