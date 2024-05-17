<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";

echo "#!/bin/sh\n";

$uid1 = $UID;
if($uid1=="")
{
	TRACE_error("wpsevents can't get UID. Need UID argument !!");
	TRACE_error("wpsevents can't get UID. Need UID argument !!");
}

$p1 = XNODE_getpathbytarget("", "phyinf", "uid", $uid1, 0);

if ($p1=="") echo "exit 0\n";

$wifi1 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($p1."/wifi"),0);

$wps = 0;
if (query($p1."/active")==1 && query($wifi1."/wps/enable")==1) $wps++;

if ($ACTION == "ADD")
{
	/* Someone uses wps, so add the events for WPS. */
	if ($wps > 0)
	{
		/*
		echo 'event WPSPIN insert "'.$uid1.':/etc/scripts/wps.sh pin '.$uid1.'"\n';
		if ($uid1 == "WIFISTA-1.1" || $uid1 == "WIFISTA-2.1")
		{
			$opmode = query($wifi1."/opmode"); 
			if($opmode == "") 
				$opmode = "REPEATER";
			echo 'event WPSPBC.PUSH insert "'.$uid1.':/etc/scripts/wps.sh pbc_sta"\n';
			///Add alpha_wps_monitor to monitor WAN and LAN side WPS and stop WPS event
			echo 'event WPS_STA.STOP add "/etc/scripts/wps.sh stop '.$opmode.'"\n';
			$UID24G="BAND24G-1.1";
			$UID5G="BAND5G-1.1";
			$P24 = XNODE_getpathbytarget("", "phyinf", "uid", $UID24G, 0);
			$P5 = XNODE_getpathbytarget("", "phyinf", "uid", $UID5G, 0);
			$wifi24 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($P24."/wifi"),0);
			$wifi5 = XNODE_getpathbytarget("/wifi", "entry", "uid", query($P5."/wifi"),0);
			if(query($P24."/active")==1 && query($wifi24."/wps/enable")==1) $APWPS++;
			if(query($P5."/active")==1 && query($wifi5."/wps/enable")==1) $APWPS++;
			if($APWPS > 0)
			{
				echo 'event WPSPBC.PUSH insert "alpha_wps_monitor -a /runtime/wps/state -s /runtime/wps_sta/state &"\n';
			}
		}
		else
		{
			echo 'event WPSPBC.PUSH insert "'.$uid1.':/etc/scripts/wps.sh pbc"\n';
			echo 'event WPS.STOP add "/etc/scripts/wps.sh stop AP"\n';
		}*///orignal code, marked by Vic		
		
		$aplock_enable=query("/runtime/wps/setting/aplocked");
		$pin_enable=query("/device/features/enablepin");
		if($pin_enable!="0" && $aplock_enable!="1")
			echo 'event WPSPIN insert "'.$uid1.':/etc/scripts/wps.sh pin '.$uid1.'"\n';

		$pbc_enable=query("/device/features/enablepbc");
		if($pbc_enable!="0")
		{
			if ($uid1 == "STATION24G-1.1" || $uid1 == "STATION5G-1.1")
			{
				echo 'event WPSPBC.PUSH insert "'.$uid1.':/etc/scripts/wps_sta.sh pbc '.$uid1.'"\n';
			}
			else
			{
				echo 'event WPSPBC.PUSH insert "'.$uid1.':/etc/scripts/wps.sh pbc '.$uid1.'"\n';
			}
		}
		//hendry, WPS led must light if enabled (WD spec)
		//echo 'event WPS.SUCCESS\n';
	}
}

else if ($ACTION == "FLUSH")
{
	/* ONLY clear the UID */
	echo "event WPSPIN remove ".$uid1."\n";
	echo "event WPSPBC.PUSH remove ".$uid1."\n";
	
	/* IF No body uses wps, so we can flush it. */
	if ($wps == 0)
	{
		echo "event WPSPIN flush \n";
		echo "event WPSPBC.PUSH flush \n";
	}
	else	//patched by Vic for WPS enable/disable function
	{
		$aplock_enable=query("/runtime/wps/setting/aplocked");
		$pin_enable=query("/device/features/enablepin");
		$pbc_enable=query("/device/features/enablepbc");
		if($pin_enable=="0" || $aplock_enable=="1")
			echo "event WPSPIN flush\n";
		if($pbc_enable=="0")
			echo "event WPSPBC.PUSH flush\n";
	}
}

echo "exit 0\n";

?>
