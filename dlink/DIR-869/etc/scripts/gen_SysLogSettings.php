<?
include "/htdocs/phplib/dumplog.php";
include "/htdocs/phplib/trace.php";

$dev_name = query("/runtime/device/modelname");
$date = query("/runtime/time/date");
$time = query("runtime/time/time");
$date_no_colon = cut($date,2,"/").cut($date,0,"/").cut($date,1,"/");
$time_no_colon = cut($time,0,":").cut($time,1,":");
$logfile = "/htdocs/web/docs/".$dev_name."_".$date_no_colon.$time_no_colon.".log";
//$logfile = "/htdocs/web/docs/".$dev_name.".log";
DUMPLOG_all_to_file($logfile);

?>
