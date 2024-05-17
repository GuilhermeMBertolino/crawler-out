<?
include "/htdocs/phplib/xnode.php";
$path_run_inf_wan1 = XNODE_getpathbytarget("/runtime", "inf", "uid", "WAN-1", 0);

anchor($path_run_inf_wan1."/ddns4");
$provider	= get("s", "provider"); 
$username	= get("s", "username");
$password	= get("s", "password");
$hostname	= get("s", "hostname");
$interval	= "21600";

if( $provider != "ORAY")
{
	if( $provider != "DYNDNS.Service"){
		$cmd = "susockc /var/run/ddnsd.susock DUMP ".$provider;
		setattr("uptime",	"get", $cmd." | scut -p uptime:");
		setattr("ipaddr",	"get", $cmd." | scut -p ipaddr:");
		setattr("status",	"get", $cmd." | scut -p state:");
		setattr("result",	"get", $cmd." | scut -p result:");
	}
}
else
{
	setattr("uptime",  "get", "scut -p uptime: /var/run/peanut.info");
	setattr("ipaddr",  "get", "scut -p ip:     /var/run/peanut.info");
	setattr("status",  "get", "scut -p status: /var/run/peanut.info");
	setattr("usertype","get", "cat /var/run/peanut_user_type");
}

$addrtype	= query($path_run_inf_wan1."/inet/addrtype");
if ($addrtype == "ipv4")	$ipaddr = query($path_run_inf_wan1."/inet/ipv4/ipaddr");
else						$ipaddr = query($path_run_inf_wan1."/inet/ppp4/local");	

if($provider == "DYNDNS.Service"){
	$lanmac = query("/runtime/devdata/lanmac");
	$sn = query("/runtime/devdata/sn");
	$m0 = cut($lanmac, "0", ":");
	$m1 = cut($lanmac, "1", ":");
	$m2 = cut($lanmac, "2", ":");
	$m3 = cut($lanmac, "3", ":");
	$m4 = cut($lanmac, "4", ":");
	$m5 = cut($lanmac, "5", ":");
	$lanmac_ddns = toupper($m0.$m1.$m2.$m3.$m4.$m5);
	$set_ipupdate = 'ez-ipupdate --service-type dlinkddns --host '.$hostname.' --address '.$ipaddr.' --mac-address '.$lanmac_ddns.' --serial-number '.$sn.'\n';
	fwrite("a",$_GLOBALS["START"], $set_ipupdate.'\n'.
				'if [ $? -eq 0 ]; then'.'\n'.
				'xmldbc -X '.$path_run_inf_wan1.'/ddns4 \n'.
				'xmldbc -s '.$path_run_inf_wan1.'/ddns4/valid 1\n'.
				'xmldbc -s '.$path_run_inf_wan1.'/ddns4/provider '.$provider.'\n'.
				'xmldbc -s '.$path_run_inf_wan1.'/ddns4/status IDLE\n'.
				'xmldbc -s '.$stsp.'/ddns4/result SUCCESS\n'.
				'fi \n'.
				'exit 0\n');
}
else{
$set = 'SET "'.$provider.'" "'.$ipaddr.'" "'.$username.'" "'.$password.'" "'.$hostname.'" '.$interval;
$testtime = query($path_run_inf_wan1."/ddns4/testtime");
fwrite("w",$START,"#!/bin/sh\n");
fwrite("w", $STOP,"#!/bin/sh\n");
fwrite("a",$START,
	'susockc /var/run/ddnsd.susock '.$set.'\n'.
	'xmldbc -s '.$path_run_inf_wan1.'/ddns4/valid 1\n'.
	'xmldbc -s '.$path_run_inf_wan1.'/ddns4/provider '.$provider.'\n'.
	'xmldbc -s '.$path_run_inf_wan1.'/ddns4/testtimeCheck '.$testtime.'\n'.
	'exit 0\n');
fwrite("a", $STOP,
	'xmldbc -s '.$path_run_inf_wan1.'/ddns4/valid 0\n'.
	'susockc /var/run/ddnsd.susock DEL '.$provider.'\n'.
	'exit 0\n');
}
?>
