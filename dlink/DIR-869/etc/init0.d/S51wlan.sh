#!/bin/sh
#the event EXECUTE is for helping execute a script. Check "webincl/body/bsc_wlan.php"
echo [$0]: $1 ... > /dev/console
case "$1" in
start|stop)
	service PHYINF.WIFI $1
	;;
*)
	echo [$0]: invalid argument - $1 > /dev/console
	;;
esac
#event SITESURVEY add "/etc/events/SITESURVEY.sh"
exit 0
