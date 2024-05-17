<? /* vi: set sw=4 ts=4: */
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/phplib/inf.php";
function startcmd($cmd)    {fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)     {fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}

function bwc_tc_spq_2013gui_lanup_start($rtbwcp, $name, $ifname)
{
	//#[$rtbwcp=/bwc:2/entry:2 $name=LAN-1 $ifname=br0]   
	$bwcLAN	= "/var/run/BWC_LAN1.sh";
	fwrite("w",$bwcLAN, '#!/bin/sh\n');
	fwrite("a",$bwcLAN, "#[rtbwcp=".$rtbwcp." name=".$name." ifname=".$ifname."]\n");
	
	$tc_qd_add		= "tc qdisc add dev ".$ifname;
	$tc_qd_del		= "tc qdisc del dev ".$ifname;
	$tc_class_add	= "tc class add dev ".$ifname;
	$tc_class_del	= "tc class del dev ".$ifname;
	$tc_filter_add	= "tc filter add dev ".$ifname;
	$tc_filter_del	= "tc filter del dev ".$ifname;
	$ipt_add_prefix	= "iptables -t filter -A FWD.BWC.".$name;
	$ipt_out_add_prefix	= "iptables -t filter -A FWD.BWC.".$name;

	$unit = "kbit";

	/* trate: total rate (bandwidth) */
	$trate = query($rtbwcp."/bandwidth");
	if($name=="LAN-1")
	{
		if($trate < 200) $trate=200;
	}	
	$trate = $trate.$unit;

	/* TC fw policy will be:
		0: check skb->mark only. This is linux native default.
		1: check connection->mark only.
		2: Prefer connection->mark, if connection->mark==0, then check skb->mark later.
		3: Prefer skb->mark, if skb->mark==0, then check connection->mark later.
		4: check connection->mark only, and speed up TCP small packets.
	  */
	fwrite("a",$bwcLAN, "echo 1 > /proc/sche/fw_policy\n");
	
	/* clean all qdisc*/
	fwrite("a",$bwcLAN, $tc_qd_del." root 2>/dev/null\n");
	//startcmd($tc_qd_del." root 2>/dev/null");

	/* add root qdisc */
	fwrite("a",$bwcLAN, $tc_qd_add." root handle 66:0 prio bands 2 priomap 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n");
	fwrite("a",$bwcLAN, $tc_qd_add." parent 66:1 handle 1:0 htb default 1\n");//rate queue
	fwrite("a",$bwcLAN, $tc_qd_add." parent 66:2 handle 2:0 sfq perturb 10\n");//rateless queue, for packets to device
			
	/* limit total rate */
	$autowan_enable = query($rtbwcp."/autobandwidth");
	if ($autowan_enable == "1")
	{
		fwrite("a",$bwcLAN, 'downspeed=`cat tmp/speedtest_download_result | sed "s/[^0-9]//g"`\n');
		fwrite("a",$bwcLAN, 'downsp=$downspeed"kbps"\n');
		fwrite("a",$bwcLAN, $tc_class_add." parent 1:0 classid 1:1 htb rate $downsp ceil $downsp\n");
	}
	else
	{
		fwrite("a",$bwcLAN, $tc_class_add." parent 1:0 classid 1:1 htb rate ".$trate." ceil ".$trate." burst 10000 cburst 10000\n");
	}
		
	/* add qDisc PRIO */
	fwrite("a",$bwcLAN, $tc_qd_add." parent 1:1 handle 20:0 prio bands 4 priomap 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3\n");//default priority: best effort
	fwrite("a",$bwcLAN, $tc_qd_add." parent 20:1 handle 1000:0 sfq limit 127 perturb 10\n");
	fwrite("a",$bwcLAN, $tc_qd_add." parent 20:2 handle 2000:0 sfq limit 127 perturb 10\n");
	fwrite("a",$bwcLAN, $tc_qd_add." parent 20:3 handle 3000:0 sfq limit 127 perturb 10\n");
	fwrite("a",$bwcLAN, $tc_qd_add." parent 20:4 handle 4000:0 sfq limit 127 perturb 10\n");
	
	/* add filter */
	fwrite("a",$bwcLAN, $tc_filter_add." parent 20: protocol all prio 1 handle 0x100 fw classid 20:1\n"); //Highest
	fwrite("a",$bwcLAN, $tc_filter_add." parent 20: protocol all prio 2 handle 0x200 fw classid 20:2\n"); //Higher
	fwrite("a",$bwcLAN, $tc_filter_add." parent 20: protocol all prio 3 handle 0x300 fw classid 20:3\n"); //Normal
	fwrite("a",$bwcLAN, $tc_filter_add." parent 20: protocol all prio 4 handle 0x400 fw classid 20:4\n"); //Best Effort
	
	/* set mark, use iptables/forward */
	fwrite("a",$bwcLAN, "iptables -t filter -F FWD.BWC.".$name."\n");
		
	/* we don't want to limit the rate for packets to router, set conntrack mark 0xFF00 */
	if($name=="LAN-1")
	{
		$path_run_inf_lan1 = XNODE_getpathbytarget("/runtime", "inf", "uid", "LAN-1", 0);
		$lanip = get("",$path_run_inf_lan1."/inet/ipv4/ipaddr");
		fwrite("a",$bwcLAN, $tc_filter_add." parent 66:0 protocol all prio 1 handle 0xFF00 fw classid 66:2\n");
		fwrite("a",$bwcLAN, "iptables -t nat -I PRE.LAN-1 -d ".$lanip." -j CONNMARK --set-xmark 0xFF00/0xFF00\n");
		stopcmd("iptables -t nat -D PRE.LAN-1 -d ".$lanip." -j CONNMARK --set-xmark 0xFF00/0xFF00");
		stopcmd("rm /var/run/BWC_LAN1.sh");
	}
	
	$bwc_main_chain_lan_rules = 0;

	/* At FORWARD chain, try to filter some packets that from another LAN interface. 
		It imply that packets from WAN. */
	$prefix = cut($name,0,'-');		
	if ($prefix == "LAN")
	{
		$mode = query("/device/router/mode"); 
		if ($mode!="1W1L")
		{
			foreach ("/inf")
			{
				$uid = query("uid");
				$active = query("active");
				$inf_prefix = cut($uid,0,'-');
				if ( $inf_prefix == "LAN" && $name != $uid && $active == "1" )
				{
					$infstsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $uid, 0);
					$addrtype = query($infstsp."/inet/addrtype");
					if ($addrtype=="ipv4" || $addrtype=="ppp4")
					{
						$lan_ifname = PHYINF_getruntimeifname($uid);
						if ( $lan_ifname != "" && $lan_ifname != $ifname )
						{
							fwrite("a",$bwcLAN, $ipt_out_add_prefix." -i ".$lan_ifname." -j RETURN\n");
							$bwc_main_chain_lan_rules++;
						}
					}
				}
			}
		}
	}

	foreach($rtbwcp."/rules/entry")
	{
		if (query("enable")=="1")
		{
			$bwcf_name = query("bwcf");
			$bwcfp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $bwcf_name, 0);
			if($bwcfp == "" ) { continue; }
			$bwcqd_name = query("bwcqd");
			$bwcqdp = XNODE_getpathbytarget("/bwc/bwcqd", "entry", "uid", $bwcqd_name, 0);
			if($bwcqdp == "" ) { continue; }	
			$startip = query($bwcfp."/ipv4/start");
			$endip = query($bwcfp."/ipv4/end");

			/* priority */
			if		 (query($bwcqdp."/priority") == "VO") { $hex_mark_base = "0x100"; }          //Highest    
			else if(query($bwcqdp."/priority") == "VI") { $hex_mark_base = "0x200"; }          //Higher     
			else if(query($bwcqdp."/priority") == "BG") { $hex_mark_base = "0x300"; }          //Normal     
			else if(query($bwcqdp."/priority") == "BE") { $hex_mark_base = "0x400"; } 				 //Best Effort
			else { fwrite("a",$bwcLAN, "echo bwcsvcs.php: Unknown Traffic Control priority...ERROR!!!\n");}		
			
			if( $name == "LAN-1" ) /* Download bandwidth control */
			{
				fwrite("a",$bwcLAN, "#=========================================================================================\n");
				fwrite("a",$bwcLAN, $ipt_add_prefix." -m iprange --dst-range ".$startip."-".$endip." -j CONNMARK --set-xmark ".$hex_mark_base."/0xFF00\n");
				fwrite("a",$bwcLAN, $ipt_add_prefix." -m iprange --dst-range ".$startip."-".$endip." -j RETURN\n");
			}
		}
	}
}
function auto_wan_bw($name)
{
	$autowan			= "/var/run/auto_wan.sh";
	$infp 				= XNODE_getpathbytarget("", "inf", "uid", $name, 0);
	$bwc_profile_name 	= query($infp."/bwc");
	$bwcp 				= XNODE_getpathbytarget("/bwc", "entry", "uid", $bwc_profile_name, 0);
	$isenable 			= query($bwcp."/autobandwidth");
	$download_speed 	= query("bwc/entry:2/bandwidth");
	$upload_speed		= query("bwc/entry:1/bandwidth");
	//TRACE_debug("autobandwidth:".$isenable);
	if ($isenable == 1)
	{
		fwrite("w",$autowan, "#!/bin/sh\n");
		fwrite("a",$autowan, 
			'i=0\n'.
			'while [ "$i" != "3" ]; do\n'.
			'	sleep 1\n'.
			'	wget -q -O /tmp/speedtest_tmp http://www.speedtest.net/speedtest-config.php\n'.
			'	sleep 1\n'.
			'	if [ ! -e /tmp/speedtest_tmp ]; then\n'.
			'		echo "speedtest server is not reachable, try again ..." > /dev/console\n'.
			'		i=`expr $i + 1`\n'.
			'		continue\n'.
			'	else\n'.
			'		echo "speedtest sever is reachable,done" > /dev/console\n'.
			'		break\n'.
			'	fi\n'.
			'done\n'.
			'\n'.
			'if [ -e /tmp/speedtest_tmp ]; then\n'.
			'	echo "Execute speedtest_cli to test download and upload bandwidth..." > /dev/console\n'.
			'	speedtest_cli 1 3 1 2\n'.
			'fi\n'.
			'	sleep 1\n'.
			'while [ -e /tmp/speedtest_download_result ]; do\n'.
			'	echo "Update download speed to config file" > /dev/console\n'.
			'	downspeed=`cat tmp/speedtest_download_result | sed "s/[^0-9]//g"`\n'.
			'	xmldbc -s /bwc/entry:2/bandwidth $downspeed\n'.
			'	down_speed=`cat tmp/speedtest_download_result | cut -c 1-20`\n'.
			'	echo $down_speed > tmp/trend/qos.conf\n'.
			'	break\n'.
			'done\n'.
			'while [ -e /tmp/speedtest_upload_result ]; do\n'.
			'	echo "Update upload speed to config file" > /dev/console\n'.
			'	upspeed=`cat tmp/speedtest_upload_result | sed "s/[^0-9]//g"`\n'.
			'	xmldbc -s /bwc/entry:1/bandwidth $upspeed \n'.
			'	up_speed=`cat tmp/speedtest_upload_result | cut -c 1-20`\n'.
			'	echo $up_speed >> tmp/trend/qos.conf\n'.
			'	break\n'.
			'done\n'.
			'\n'.
			'sh /var/run/gen_conf.sh\n'.
			'exit 0\n'
		);
	}
	else
	{
		fwrite("w",$autowan, "#!/bin/sh\n");
		fwrite("a",$autowan,
		'echo "Auto WAN disable, update download/upload speed manually" > /dev/console\n'.
		'echo ceil_down='.$download_speed.'kbps > /tmp/trend/qos.conf\n'.
		'echo ceil_up='.$upload_speed.'kbps >> /tmp/trend/qos.conf\n'.
		'sh /var/run/gen_conf.sh\n'.
		'exit 0\n'
		);
	}
	return 0;
}


/* Generate the qos.conf in /tmp/trend from xmldb node */
function iqos_write_apprule($f_name, $app_cat)
{
	if($app_cat=="99")
	{//application is "others", should find all others app category from native SDK
		fwrite("a", $f_name, "echo rule= 7 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 9 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 10 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 11 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 12 >> /tmp/trend/qos.conf\n");		
		fwrite("a", $f_name, "echo rule= 17 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 18 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 19 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 20 >> /tmp/trend/qos.conf\n");
	}
	else if($app_cat=="3")
	{//D-Link defined this app name is File Transfer and P2P
		fwrite("a", $f_name, "echo rule= 1 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 3 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 14 >> /tmp/trend/qos.conf\n");
	}
	else if($app_cat=="4")
	{//D-Link defined this app name is Streaming media
		fwrite("a", $f_name, "echo rule= 4 >> /tmp/trend/qos.conf\n");
	}
	else if($app_cat=="6")
	{//D-Link defined this app name is Online Chat and mail
		fwrite("a", $f_name, "echo rule= 0 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 5 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 6 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 15 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 21 >> /tmp/trend/qos.conf\n");
	}
	else if($app_cat=="8")
	{//D-Link defined this app name is Games
		fwrite("a", $f_name, "echo rule= 8 >> /tmp/trend/qos.conf\n");
	}
	else if($app_cat=="13")
	{//D-Link defined this app name is Web and social network
		fwrite("a", $f_name, "echo rule= 13 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 23 >> /tmp/trend/qos.conf\n");
		fwrite("a", $f_name, "echo rule= 24 >> /tmp/trend/qos.conf\n");
		$tmp_rule_cat_start=28;
		$tmp_rule_cat_end=43;
		while($tmp_rule_cat_start <= $tmp_rule_cat_end)
		{//I can't find better writing rule method, maybe someone can.
			fwrite("a", $f_name, "echo rule= ".$tmp_rule_cat_start." >> /tmp/trend/qos.conf\n");
			$tmp_rule_cat_start++;
		}
	}
	else
	{
		//should not run here
	}
}

function gen_iqos_conf($name, $waninf, $laninf)
{
	$gen_conf="/var/run/gen_conf.sh";
	$infp = XNODE_getpathbytarget("", "inf", "uid", $name, 0);
	$bwc_profile_name = query($infp."/bwc");
	$bwcp = XNODE_getpathbytarget("/bwc", "entry", "uid", $bwc_profile_name, 0);
	$entry_bwcf = "/bwc/bwcf/entry";
	$auto_enable 			= query($bwcp."/autobandwidth");
	$download_speed 	= query("bwc/entry:2/bandwidth");
	$upload_speed		= query("bwc/entry:1/bandwidth");
	$rule_type			= query("bwc/rule_type");//app or dev
		
	fwrite("w",$gen_conf, '#!/bin/sh\n');
	fwrite("a",$gen_conf, 'if [ -e /tmp/trend/qos.conf ]; then\n');
	fwrite("a",$gen_conf, '	rm /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'fi\n');
	fwrite("a",$gen_conf, 'echo "#" > /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# Global ceil - user max bandwidth (kbps = KB/s)" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "#" >> /tmp/trend/qos.conf\n');

	fwrite("a",$gen_conf, 'echo "Update download/upload speed from xmldb node" > /dev/console\n');
	$downlink = $download_speed/8;
	$uplink = $upload_speed/8;
	//TRACE_debug("downlink:".$downlink);
	fwrite("a",$gen_conf, 'echo ceil_down='.$downlink.'kbps >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo ceil_up='.$uplink.'kbps >> /tmp/trend/qos.conf\n');

	fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# app group n" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# [<priority>]" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# rule=<app cat id>" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "#" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# devive group n" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "#" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# {<priority>}" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# cat=<dev cat id>" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# or" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo "# mac=<dev mac>" >> /tmp/trend/qos.conf\n');
	fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');

	if($rule_type=="app")
	{
		/* Priority mapping: highest -> 0 */
		fwrite("a",$gen_conf, 'echo "# app group 0" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [0, 10%, 100%, 10%, 100%] >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/app_rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-1") $app_cat1 = query("category");
			if ($app_cat1 !="") iqos_write_apprule($gen_conf, $app_cat1);
			$app_cat1="";		
		}
		fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo "# app group 1" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo [1, 5%, 100%, 5%, 100%] >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo rule= na >> /tmp/trend/qos.conf\n');
		/* Priority mapping: higher -> 2 */
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 2" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [2, 40%, 100%, 40%, 100%] >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/app_rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-2") $app_cat2 = query("category");
			if ($app_cat2 !="") iqos_write_apprule($gen_conf, $app_cat2);
			$app_cat2="";		
		}
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 3" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [3, 20%, 100%, 20%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");
		/* Priority mapping: normal -> 4 */
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 4" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [4, 10%, 100%, 10%, 100%] >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/app_rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-3") $app_cat3 = query("category");
			if ($app_cat3 !="") iqos_write_apprule($gen_conf, $app_cat3);
			$app_cat3="";
		}
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 5" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [5, 8%, 100%, 8%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");
		/* Priority mapping: best effort -> 6 */
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 6" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [6, 5%, 100%, 5%, 100%] >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/app_rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-4") $app_cat4 = query("category");
			if ($app_cat4 !="") iqos_write_apprule($gen_conf, $app_cat4);
			$app_cat4="";
		}
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# app group 7" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [7, 2%, 100%, 2%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");

		/* Set device rule */
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 0" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {0} >> /tmp/trend/qos.conf\n");
		//Broadcom said cat=5 must put in dev group 0.
		fwrite("a",$gen_conf, "echo cat= 5 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 1 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 1" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {1} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 2 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 2" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {2} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 4 >> /tmp/trend/qos.conf\n");//Follow SDK settings
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 3" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {3} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 3 >> /tmp/trend/qos.conf\n");//Follow SDK settings
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 4" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {4} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 5 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 5" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {5} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 6 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 6" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {6} >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/rules/entry")
		{
			$dev_bwcf = query("bwcf");
			if ($dev_bwcf !="") 
			{
				$entry_bwcp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $dev_bwcf, 0);
				$dev_mac = query($entry_bwcp."/mac");
				$mac1 = cut($dev_mac, 0, ":"); $mac2 = cut($dev_mac, 1, ":"); $mac3 = cut($dev_mac, 2, ":"); $mac4 = cut($dev_mac, 3, ":"); $mac5 = cut($dev_mac, 4, ":"); $mac6 = cut($dev_mac, 5, ":");
				$macstr = $mac1.$mac2.$mac3.$mac4.$mac5.$mac6;
				$targetmac = toupper($macstr);
				//TRACE_debug("dev path:".$dev_bwcf."	dev mac:".$targetmac." debug1:".$mac1."debug2:".$mac2."debug3:".$mac3."debug4:".$mac4."debug5:".$mac5."debug6:".$mac6);
				fwrite("a",$gen_conf, "echo mac=".$targetmac." >> /tmp/trend/qos.conf\n");	
			}
		}
		$total_dev_cat = 32;
		$curr_dev_cat = 1;
		while($curr_dev_cat <= $total_dev_cat)
		{
			if($curr_dev_cat!=5)
			fwrite("a",$gen_conf, "echo cat= ".$curr_dev_cat." >> /tmp/trend/qos.conf\n");
			$curr_dev_cat++;
		}
		fwrite("a",$gen_conf, "echo fam= 7 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# dev group 7" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {7} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 8 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= na >> /tmp/trend/qos.conf\n");
	}
	else if($rule_type=="dev")
	{
		/* Priority mapping: highest -> 0 */
		fwrite("a",$gen_conf, 'echo "# app group 0" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [0, 10%, 100%, 10%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo rule= na >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo  >> /tmp/trend/qos.conf\n');

		fwrite("a",$gen_conf, 'echo "# app group 1" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo [1, 5%, 100%, 5%, 100%] >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, 'echo rule= na >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		/* Priority mapping: higher -> 2 */		
		fwrite("a",$gen_conf, 'echo "# app group 2" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [2, 40%, 100%, 40%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo rule= na >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# app group 3" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [3, 20%, 100%, 20%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		/* Priority mapping: normal -> 4 */
		fwrite("a",$gen_conf, 'echo "# app group 4" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [4, 10%, 100%, 10%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# app group 5" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [5, 8%, 100%, 8%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		/* Priority mapping: best effort -> 6 */		
		fwrite("a",$gen_conf, 'echo "# app group 6" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [6, 5%, 100%, 5%, 100%] >> /tmp/trend/qos.conf\n");
		iqos_write_apprule($gen_conf, "3");
		iqos_write_apprule($gen_conf, "4");
		iqos_write_apprule($gen_conf, "6");
		iqos_write_apprule($gen_conf, "8");
		iqos_write_apprule($gen_conf, "13");
		iqos_write_apprule($gen_conf, "99");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");

		fwrite("a",$gen_conf, 'echo "# app group 7" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo [7, 2%, 100%, 2%, 100%] >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo rule= na >> /tmp/trend/qos.conf\n");

		/* Set device rule */
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, 'echo "# dev group 0" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {0} >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-1")
			{ 
				$dev_bwcf = query("bwcf");
				if ($dev_bwcf !="") 
				{
					$entry_bwcp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $dev_bwcf, 0);
					$dev_mac = query($entry_bwcp."/mac");
					$mac1 = cut($dev_mac, 0, ":"); $mac2 = cut($dev_mac, 1, ":"); $mac3 = cut($dev_mac, 2, ":"); $mac4 = cut($dev_mac, 3, ":"); $mac5 = cut($dev_mac, 4, ":"); $mac6 = cut($dev_mac, 5, ":");
					$macstr = $mac1.$mac2.$mac3.$mac4.$mac5.$mac6;
					$targetmac = toupper($macstr);
					//TRACE_debug("dev path:".$dev_bwcf."	dev mac:".$targetmac." debug1:".$mac1."debug2:".$mac2."debug3:".$mac3."debug4:".$mac4."debug5:".$mac5."debug6:".$mac6);
					fwrite("a",$gen_conf, "echo mac=".$targetmac." >> /tmp/trend/qos.conf\n");	
				}
			}
		}
		//Broadcom said cat=5 must put in dev group 0.
		fwrite("a",$gen_conf, "echo cat= 5 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 1 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 1" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {1} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 2 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 2" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {2} >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-2") 
			{
				$dev_bwcf = query("bwcf");
				if ($dev_bwcf !="") 
				{
					$entry_bwcp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $dev_bwcf, 0);
					$dev_mac = query($entry_bwcp."/mac");
					$mac1 = cut($dev_mac, 0, ":"); $mac2 = cut($dev_mac, 1, ":"); $mac3 = cut($dev_mac, 2, ":"); $mac4 = cut($dev_mac, 3, ":"); $mac5 = cut($dev_mac, 4, ":"); $mac6 = cut($dev_mac, 5, ":");
					$macstr = $mac1.$mac2.$mac3.$mac4.$mac5.$mac6;
					$targetmac = toupper($macstr);
					//TRACE_debug("dev path:".$dev_bwcf."	dev mac:".$targetmac." debug1:".$mac1."debug2:".$mac2."debug3:".$mac3."debug4:".$mac4."debug5:".$mac5."debug6:".$mac6);
					fwrite("a",$gen_conf, "echo mac=".$targetmac." >> /tmp/trend/qos.conf\n");
				}
			}
		}
		fwrite("a",$gen_conf, "echo fam= 4 >> /tmp/trend/qos.conf\n");//Follow SDK setting
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 3" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {3} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 3 >> /tmp/trend/qos.conf\n");//Follow SDK setting
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 4" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {4} >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-3") 
			{
				$dev_bwcf = query("bwcf");
				if ($dev_bwcf !="") 
				{
					$entry_bwcp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $dev_bwcf, 0);
					$dev_mac = query($entry_bwcp."/mac");
					$mac1 = cut($dev_mac, 0, ":"); $mac2 = cut($dev_mac, 1, ":"); $mac3 = cut($dev_mac, 2, ":"); $mac4 = cut($dev_mac, 3, ":"); $mac5 = cut($dev_mac, 4, ":"); $mac6 = cut($dev_mac, 5, ":");
					$macstr = $mac1.$mac2.$mac3.$mac4.$mac5.$mac6;
					$targetmac = toupper($macstr);
					//TRACE_debug("dev path:".$dev_bwcf."	dev mac:".$targetmac." debug1:".$mac1."debug2:".$mac2."debug3:".$mac3."debug4:".$mac4."debug5:".$mac5."debug6:".$mac6);
					fwrite("a",$gen_conf, "echo mac=".$targetmac." >> /tmp/trend/qos.conf\n");
				}
			}
		}
		fwrite("a",$gen_conf, "echo fam= 5 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 5" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {5} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 6 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 6" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {6} >> /tmp/trend/qos.conf\n");
		foreach($bwcp."/rules/entry")
		{
			if ( query("bwcqd") == "BWCQD-4")
			{ 
				$dev_bwcf = query("bwcf");
				if ($dev_bwcf !="") 
				{
					$entry_bwcp = XNODE_getpathbytarget("/bwc/bwcf", "entry", "uid", $dev_bwcf, 0);
					$dev_mac = query($entry_bwcp."/mac");
					$mac1 = cut($dev_mac, 0, ":"); $mac2 = cut($dev_mac, 1, ":"); $mac3 = cut($dev_mac, 2, ":"); $mac4 = cut($dev_mac, 3, ":"); $mac5 = cut($dev_mac, 4, ":"); $mac6 = cut($dev_mac, 5, ":");
					$macstr = $mac1.$mac2.$mac3.$mac4.$mac5.$mac6;
					$targetmac = toupper($macstr);
					//TRACE_debug("dev path:".$dev_bwcf."	dev mac:".$targetmac." debug1:".$mac1."debug2:".$mac2."debug3:".$mac3."debug4:".$mac4."debug5:".$mac5."debug6:".$mac6);
					fwrite("a",$gen_conf, "echo mac=".$targetmac." >> /tmp/trend/qos.conf\n");	
				}
			}
		}
		$total_dev_cat = 32;
		$curr_dev_cat = 1;
		while($curr_dev_cat <= $total_dev_cat)
		{
			if($curr_dev_cat!=5)//Broadcom said cat=5 must put in dev group 0.
			fwrite("a",$gen_conf, "echo cat= ".$curr_dev_cat." >> /tmp/trend/qos.conf\n");
			$curr_dev_cat++;
		}
		fwrite("a",$gen_conf, "echo fam= 7 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
		
		fwrite("a",$gen_conf, 'echo "# dev group 7" >> /tmp/trend/qos.conf\n');
		fwrite("a",$gen_conf, "echo {7} >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= 8 >> /tmp/trend/qos.conf\n");
		fwrite("a",$gen_conf, "echo fam= na >> /tmp/trend/qos.conf\n");
	}

	fwrite("a",$gen_conf, "echo  >> /tmp/trend/qos.conf\n");
	fwrite("a",$gen_conf, 'bcmiqosd start\n'.);
	fwrite("a",$gen_conf, "exit 0\n");

	return 0;	
}
?>
