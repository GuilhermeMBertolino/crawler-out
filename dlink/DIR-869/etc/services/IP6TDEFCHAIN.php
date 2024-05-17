<? /* vi: set sw=4 ts=4: */
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/phyinf.php";
include "/etc/services/IP6TABLES/ip6tlib.php";

function startcmd($cmd) { fwrite(a, $_GLOBALS["START"], $cmd."\n"); }

function lan_default($stsp, $name, $dev)
{
	/* Check status */
	anchor($stsp."/inet");
	$addrtype = query("addrtype");
	if		($addrtype=="ipv6" && query("ipv6/valid")=="1") 
	{ $ipaddr=query("ipv6/ipaddr"); $mask = query("ipv6/mask"); }
	else if	($addrtype=="ppp6" && query("ppp6/valid")=="1") $ipaddr=query("ppp6/local");
	else return;

	/* FORWARD */
	startcmd("ip6tables -t filter -A FORWARD -i ".$dev." -j FWD.".$name);
	/* INPUT */
	startcmd("ip6tables -t filter -A INPUT -i ".$dev." -j INP.".$name);
}

function wan_default($infp, $stsp, $name, $dev)
{
	/* Check status */
	anchor($stsp."/inet");
	$addrtype = query("addrtype");
	if		($addrtype=="ipv6" && query("ipv6/valid")=="1") $ipaddr=query("ipv6/ipaddr");
	else if	($addrtype=="ppp6" && query("ppp6/valid")=="1") $ipaddr=query("ppp6/local");
	else return;

	/* FORWARD */
	if (query("/acl6/dos/enable")=="1") startcmd("ip6tables -A FORWARD -i ".$dev." -j DOS");
	if (query("/acl6/spi/enable")=="1") startcmd("ip6tables -A FORWARD -i ".$dev." -j SPI");
	startcmd("ip6tables -A FORWARD -i ".$dev." -j FWD.".$name);

	/* Mangle table */
	/* Move to radvd with AdvLinkMTU */
	/*
	$defaultroute = query($stsp."/defaultroute");
	if($defaultroute > 0)
		startcmd("ip6tables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST,FIN SYN -j TCPMSS --clamp-mss-to-pmtu");
	*/
}

function SPI_chain()
{
	/* SPI */
	startcmd("# SPI Chain");
	$drpcmd = "-j DROP";
	$logcmd = "-m limit --limit 10/m -j LOG --log-level info --log-prefix";
	$state  = "-m state --state NEW";
	$iptcmd = "ip6tables -A SPI -p tcp --tcp-flags";
	startcmd($iptcmd." SYN,ACK SYN,ACK ".$state." ". $logcmd." 'ATT:001[SYN-ACK]:'\n".
	         $iptcmd." SYN,ACK SYN,ACK ".$state." ". $drpcmd."\n".
	         $iptcmd." ALL NONE ".                   $logcmd." 'ATT:001[NULL]:'\n".
	         $iptcmd." ALL NONE ".                   $drpcmd."\n".
	         $iptcmd." ALL FIN,URG,PSH ".            $logcmd." 'ATT:001[NMAP]:'\n".
	         $iptcmd." ALL FIN,URG,PSH ".            $drpcmd."\n".
	         $iptcmd." SYN,RST SYN,RST ".            $logcmd." 'ATT:001[SYN-RST]:'\n".
	         $iptcmd." SYN,RST SYN,RST ".            $drpcmd."\n".
	         $iptcmd." SYN,FIN SYN,FIN ".            $logcmd." 'ATT:001[SYN-FIN]:'\n".
	         $iptcmd." SYN,FIN SYN,FIN ".            $drpcmd."\n".
	         $iptcmd." ALL ALL ".                    $logcmd." 'ATT:001[Xmas]:'\n".
	         $iptcmd." ALL ALL ".                    $drpcmd."\n".
	         $iptcmd." ALL SYN,RST,ACK,FIN,URG ".    $logcmd." 'ATT:001[Xmas]:'\n".
	         $iptcmd." ALL SYN,RST,ACK,FIN,URG ".    $drpcmd."\n"
	);

	fwrite("a",$STOP,
	       "# SPI Chain\n".
	       "ip6tables -F SPI\n"
	);
}

/**************************************************************************/
fwrite("w",$START,"#!/bin/sh\n");
fwrite("w",$STOP,"#!/bin/sh\n");

/* flush default chain */
startcmd(
	"ip6tables -F FORWARD; ".
	"ip6tables -F INPUT; ".
	"ip6tables -F OUTPUT; ".
	"ip6tables -t mangle -F FORWARD; "
	);

/* Firewall */
if (query("/acl6/dos/enable")=="1") startcmd("ip6tables -A INPUT -j DOS");
if (query("/acl6/spi/enable")=="1")
{
	/* nf_conntrack_ipv6.ko. */
	$HWNAT_enable = fread("e", "/proc/qca_switch/nf_athrs17_hnat");
	if($HWNAT_enable != "1") {
		startcmd("# insert module\n".
		         "insmod /lib/modules/nf_conntrack_ipv6.ko");
	}

	startcmd("ip6tables -A INPUT -j SPI");
	SPI_chain();

	/* nf_conntrack_ipv6.ko. */
	if($HWNAT_enable != "1") {
		fwrite("a",$STOP, "# remove module\n".
		                  "rmmod /lib/modules/nf_conntrack_ipv6.ko");
	}
}


/* ULA */
/* Can't forward packet to global address if src address is ULA type */
startcmd("ip6tables -A FORWARD -s FD00::/8 -d 2000::/3 -j DROP");
startcmd("ip6tables -A FORWARD -s FD00::/8 -d 3FFE::/16 -j DROP");
startcmd("ip6tables -A FORWARD -s FD00::/8 -d FF0E::/16 -j DROP");


/* Create IPv6 Simple-Security chain, added by Jerry Kao */
$SMP_SECURITY_FWD 	  = 'FWD.SMPSECURITY.';
$SMP_SECURITY_INP 	  = 'INP.SMPSECURITY.';
$SMP_SECURITY_OUT 	  = 'OUT.SMPSECURITY.';


//IOL test...................just want to pass 
/* If WAN-4 exist ? */
//$name = "WAN-4";
$prefix = "WAN-";
$i = 1;
while($i>0)
{
	$ifname = $prefix.$i;
	$ifpath = XNODE_getpathbytarget("", "inf", "uid", $ifname, 0);
	if($ifpath == "") { $i=0; break; }
	$active = query($ifpath."/active");
	//$disable = query($ifpath."/disable");
	$child  = query($ifpath."/child");
	//if ($active=="1" && $disable=="0" && $child!="") { break; } 
	if ($active=="1" && $child!="") { break; } 
	$i++;
}
$wname = $ifname;

$prefix = "LAN-";
$i = 1;
while($i>0)
{
	$ifname = $prefix.$i;
	$ifpath = XNODE_getpathbytarget("", "inf", "uid", $ifname, 0);
	if($ifpath == "") { $i=0; break; }
	$active = query($ifpath."/active");
	//$disable = query($ifpath."/disable");
	$inet  = query($ifpath."/inet");
	//if ($active=="1" && $disable=="0" && $inet=="") { break; }
	if ($active=="1" && $inet=="") { break; }
	$i++; 
}
$lname = $ifname;

/* If WAN & LAN activated ? */
$wstsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $wname, 0);
$lstsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $lname, 0);
if ($wstsp!="" && $lstsp!="")
{
	/* Get phyinf */
	$waninf = PHYINF_getruntimeifname($wname);
	$laninf = PHYINF_getruntimeifname($lname);
	if ($waninf!="" && $laninf!="")
	{
		$wdevnam = query($wstsp."/devnam"); 
		$ldevnam = query($lstsp."/devnam"); 
		anchor($wstsp."/inet");
		$addrtype = query("addrtype");
		if($addrtype=="ipv6" && query("ipv6/valid")=="1")
		{
			$oldblackpfx = query($wstsp."/oldblackhole/entry:1/prefix");
			$oldblackplen = query($wstsp."/oldblackhole/entry:1/plen");
			if($oldblackpfx != "")
			{
				startcmd("ip6tables -I FORWARD -i ".$wdevnam." -d ".$oldblackpfx."/".$oldblackplen." -j DROP");
//				startcmd("ip6tables -I FORWARD -i ".$ldevnam." -s ".$oldblackpfx."/".$oldblackplen." -j REJECT --reject-with icmp6-srcaddr-fail");
				startcmd("ip -6 route add ".$oldblackpfx."/".$oldblackplen." dev ".$ldevnam);
			}
/* +++ HuanYao Kang: Reject packets that is not belonging the LAN PD assignment. */
			$pdnetwork = get("", $wstsp."/child/pdnetwork");
			$pdprefix = get("", $wstsp."/child/pdprefix");
			if ($pdnetwork!="" && $pdprefix!="")
			{
				startcmd("ip6tables -I FORWARD -i ".$ldevnam." ! -s ".$pdnetwork."/".$pdprefix." -j REJECT --reject-with icmp6-srcaddr-fail");
			}
/* +++ HuanYao Kang: End */
		}
	}
} else {
	foreach ("/runtime/inf")    $count++;
	$j = 1;
	while ($j <= $count) {
		$name_l = "LAN-".$j;
		$stsp_l = XNODE_getpathbytarget("/runtime", "inf", "uid", $name_l, 0);  /* If LAN activated ? */
		if ($stsp_l != "") {
			anchor($stsp_l."/inet");
			if (query("addrtype") == "ipv6" && query("ipv6/valid") == "1" && query("ipv6/mode") != "LL") {
				$ipaddr = query("ipv6/ipaddr");
				$prefix = query("ipv6/prefix");
				$devnam = query($stsp_l."/devnam");
				startcmd("ip6tables -I FORWARD -i ".$devnam." ! -s ".$ipaddr."/".$prefix." -j REJECT --reject-with icmp6-srcaddr-fail");
			}
		}
		$j++;
	}
}

$layout = query("/runtime/device/layout");
if ($layout == "router")
{
	foreach ("/runtime/inf")	$count++;
	
	/* Walk through all the actived LAN interfaces. */
	startcmd("# LAN interfaces");
		
	$i=1;
	while ($i<=$count)
	{
		$name = "LAN-".$i;		/* If LAN exist ? */
		$infp = XNODE_getpathbytarget("", "inf", "uid", $name, 0);
		if ($infp=="") break;

		$stsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $name, 0);	/* If LAN activated ? */
		if ($stsp!="")
		{
			anchor($stsp."/inet");
			$addrtype = query("addrtype");
			//if ($addrtype=="ipv6" && query("ipv6/valid")=="1") 
			if ($addrtype=="ipv6" && query("ipv6/valid")=="1" && query("ipv6/mode")!="LL") 			
			{				
				$laninf = PHYINF_getruntimeifname($name);		/* Get phyinf */									
				if ($laninf!="") 
				{									
					/* Added Simple Security chains, by Jerry Kao  */														
					//startcmd("ip6tables -t filter -A FORWARD -i ". $laninf. " -j ". $SMP_SECURITY_FWD.$name);					
					startcmd("ip6tables -t filter -A INPUT -i ".   $laninf ." -j ". $SMP_SECURITY_INP.$name);				
					startcmd("ip6tables -t filter -A OUTPUT -o ".  $laninf ." -j ". $SMP_SECURITY_OUT.$name);									
					
					lan_default($stsp, $name, $laninf);
				}
			}
		}

		$i++;	/* Advance to next */
	}

	/* Walk through all the actived WAN interfaces. */
	startcmd("# WAN interfaces");
	
	$i = 1;
	while ($i<=$count)
	{
		$name = "WAN-".$i;		/* If WAN exist ? */
		$infp = XNODE_getpathbytarget("", "inf", "uid", $name, 0);
		if($infp=="") break;

		$stsp = XNODE_getpathbytarget("/runtime", "inf", "uid", $name, 0);	/* If WAN activated ? */
		if ($stsp!="")
		{
			anchor($stsp."/inet");
			$addrtype = query("addrtype");
			//if ($addrtype=="ipv6" && query("ipv6/valid")=="1") 
			if ($addrtype=="ipv6" && query("ipv6/valid")=="1" && query("ipv6/mode")!="LL") 
			{ $needToApply = "1"; }
			if ($addrtype=="ppp6" && query("ppp6/valid")=="1")
			{ $needToApply = "1"; }
			
			if ($needToApply == "1")
			{				
				$waninf = PHYINF_getruntimeifname($name);		/* Get phyinf */
				if ($waninf!="") 
				{
					/* Added Simple Security chains, by Jerry Kao  */									
					//startcmd("ip6tables -A FORWARD -i ". $waninf. " -j ". $SMP_SECURITY_FWD.$name);						
					startcmd("ip6tables -A INPUT -i ".   $waninf ." -j ". $SMP_SECURITY_INP.$name);									
					startcmd("ip6tables -A OUTPUT -o ".  $waninf ." -j ". $SMP_SECURITY_OUT.$name);					
					
					wan_default($infp, $stsp, $name, $waninf);
				}
			}
		}

		$i++;	/* Advance to next */
	}
}


fwrite("a",$START, "exit 0\n");
fwrite("a",$STOP, "exit 0\n");
?>
