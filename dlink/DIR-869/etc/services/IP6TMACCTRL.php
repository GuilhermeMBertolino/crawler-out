<?
include "/htdocs/phplib/trace.php";
include "/etc/services/IPTABLES/iptlib.php";
include "/htdocs/phplib/phyinf.php";

fwrite("w", $START, "#!/bin/sh\n");
fwrite("w", $STOP,  "#!/bin/sh\n");

$j = 1;
while ($j>0)
{
	$ifname = "LAN-".$j;
	$ifpath = XNODE_getpathbytarget("", "inf", "uid", $ifname, 0);
	if ($ifpath == "") { $j = 0; break; }

	$CHAIN	= "MACF.".$ifname;

	fwrite("a", $START, "ip6tables -t filter -F ".$CHAIN."\n");
	fwrite("a", $STOP,  "ip6tables -t filter -F ".$CHAIN."\n");

	XNODE_set_var($CHAIN.".USED", "0");

	/*Add rule to ifname chain */
	$i = 0;
	$policy = query("/acl/macctrl/policy");
	$cnt = query("/acl/macctrl/count");
	if ($cnt=="") $cnt = 0;
	while ($i < $cnt) {
		$i++;
		anchor("/acl/macctrl/entry:".$i);

		if (query("enable")!="1") continue;

		$mac	= query("mac");
		$sch_uid= query("schedule");

		if ($mac!="") {
			if ($policy == "DROP") {
				if ($sch_uid=="") {
					fwrite("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j LOG --log-level notice --log-prefix 'DRP:006:' \n");
					fwrite("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j DROP \n");
				} else {
					IPT_fwrite_schedule("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j LOG --log-level notice --log-prefix 'DRP:006:'", $sch_uid);
					IPT_fwrite_schedule("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j DROP", $sch_uid);
				}
			} else if ($policy == "ACCEPT") {
				if ($sch_uid=="")
					fwrite("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j RETURN \n");
				else
					IPT_fwrite_schedule("a", $START, "ip6tables -A ".$CHAIN." -m mac --mac-source ".$mac." -j RETURN", $sch_uid);
			}
			XNODE_set_var($CHAIN.".USED", "1");
		}
	}
	/*XXX Joe H.:There is not ACCEPT policy in parental control now.*/
	if ($policy == "ACCEPT")
	{
		if ($sch_uid=="")
		{
			fwrite("a", $START, "ip6tables -A ".$CHAIN." -j LOG --log-level notice --log-prefix 'DRP:006:' \n");
			fwrite("a", $START, "ip6tables -A ".$CHAIN." -j DROP \n");
		}
		else
		{
			IPT_fwrite_schedule("a", $START, "ip6tables -A ".$CHAIN." -j LOG --log-level notice --log-prefix 'DRP:006:'", $sch_uid);
			IPT_fwrite_schedule("a", $START, "ip6tables -A ".$CHAIN." -j DROP", $sch_uid);
		}
	}

	$j++;
}

fwrite("a", $START, "exit 0\n");
fwrite("a", $STOP,  "exit 0\n");
?>
