<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/phyinf.php";
include "/htdocs/webinc/config.php";
include "/var/topology.conf";

function startcmd($cmd)	{fwrite(a,$_GLOBALS["START"], $cmd."\n");}
function stopcmd($cmd)	{fwrite(a,$_GLOBALS["STOP"], $cmd."\n");}

$pmf =1;
$pid_file="/var/run/hostapd.pid";

fwrite(w,$_GLOBALS["START"], "#!/bin/sh\n");
fwrite(w,$_GLOBALS["STOP"],  "#!/bin/sh\n");
//startcmd("killall hostapd > /dev/null 2>&1");
stopcmd("rm /var/tmp/hostapdcfg");
stopcmd("ps | grep hostapd_loop.sh | awk '{print $1}' | xargs kill -SIGTERM\n");
stopcmd("killall hostapd > /dev/null 2>&1");
stopcmd("echo killall hostapd ===============================");

//cfg is in /var/topology.conf
$paramStr=$cfg."-e /var/run/123 -P ".$pid_file;
startcmd("sleep 3");
startcmd("hostapd -B ".$paramStr." &");
startcmd("echo $! > ".$pid_file);
startcmd("echo ".$paramStr." > /var/tmp/hostapdcfg");
startcmd("/etc/scripts/hostapd_loop.sh &");

?>
