<?
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/etc/services/IP6TABLES/ip6tlib.php";
include "/htdocs/webinc/config.php";

fwrite("w",$START, "#!/bin/sh\n");
fwrite("w",$STOP,  "#!/bin/sh\n");

$enable = get("", "/device/ingress_filtering");
if ($enable == "1")
{
	$layout = get ("", "/device/layout");
	if ($layout == "router")
	{
		$chain = "INGRESSFILTER";
		
		$inf_rp = XNODE_getpathbytarget("/runtime", "inf", "uid", $LAN4, "0");
		if ($inf_rp != "")
		{
			$mode = get ("", $inf_rp."/inet/ipv6/mode");
			if ($mode == "CHILD")
			{
				$pd = get("", $inf_rp."/dhcps6/pd/network").
					"/".
					get("", $inf_rp."/dhcps6/pd/prefix");
				if ($pd == "/")
				{
					$pd = get("", $inf_rp."/inet/ipv6/ipaddr").
						"/".
						get("", $inf_rp."/inet/ipv6/prefix");
				}
			}
			else if ($mode == "STATIC")
			{
				$pd = get("", $inf_rp."/dhcps6/network").
					"/".
					get("", $inf_rp."/dhcps6/prefix");
			}
			
		}
		
		if ($pd != "")
		{
			$devname = PHYINF_getruntimeifname($WAN4);
		}
		
		if ($devname!="" && $pd!="/")
		{
			fwrite("a", $START, "ip6tables -A ".$chain." -i ".$devname." -s ".$pd." -j LOG --log-level notice --log-prefix DRP:INGRESSFILTER:\n");
			fwrite("a", $START, "ip6tables -A ".$chain." -i ".$devname." -s ".$pd." -j DROP\n");
		}
		
		
		fwrite("a",$STOP,  "ip6tables -F ".$chain."\n");
		
		fwrite("a",$START, "exit 0\n");
		fwrite("a",$STOP,  "exit 0\n");
	}
}
else	// not enabled
{
	fwrite("a",$START, "exit 9\n");
	fwrite("a",$STOP,  "exit 9\n");
}



?>