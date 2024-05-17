<? /* vi: set sw=4 ts=4: */
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";

function check_portfw_range($port, $port_list)
{
	if($port_list=="")
		{return 0;}
	$cnt = cut_count($port_list, ",");
	$idx = 0;
	while ($idx <= $cnt)
	{
		if($idx > 0)
			{$t_port = cut($port_list,$idx,",");}
		else
			{$t_port=$port_list;}
		if($port==$t_port)
			{return 1;}
		else if (cut_count($t_port, "-") > 1)
		{
			$t_port_s = cut($t_port,0,"-");
			$t_port_e = cut($t_port,1,"-");

			if(strtoul($port, 10) >= strtoul($t_port_s, 10))
			{
				if(strtoul($port, 10) <= strtoul($t_port_e, 10))
					{return 1;}
			}
		}
		$idx++;
	}
	return 0;
}

function nat_pfport_conflict($port, $protocol)	// compare ports with portforward ports
{
	foreach("/nat/entry/portforward/entry")
	{
		if(query("enable")=="1")
		{
			if($protocol=="TCP")
				$port_str="tport_str";
			else
				$port_str="uport_str";
						
			if(check_portfw_range($port, query($port_str))=="1")
				return 1; 
		}
	}
	return 0;
}

function nat_vsport_conflict($port, $protocol)	//compare ports with VirtualServer ports
{
	foreach("/nat/entry/virtualserver/entry")
	{
		if(query("enable")=="1")
		{
			$vs_prot=query("protocol");
			if( query("external/start")==$port && strstr($vs_prot, $protocol) != "" )
				{ return 1; }
		}
	}
	return 0;
}

function nat_wfaport_conflict($port, $protocol)  //WFA
{
	if($protocol=="TCP")
	{
		//check webfileaccess
		if(query("/webaccess/httpport")==$port || query("/webaccess/httpsport")==$port)
			{ return 1; }
	}
	return 0;
}

function nat_remoteport_conflict($port, $protocol)  //remote management
{
	if($protocol=="TCP")
	{
		//check remote management  
		$infp = XNODE_getpathbytarget("", "inf", "uid", "WAN-1", 0); 
		if(query($infp."/web")==$port || query($infp."/https_rport")==$port)
			{ return 1; }
	}
	return 0;
}

?>
