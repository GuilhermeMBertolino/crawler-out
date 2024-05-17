#!/bin/sh
echo [$0] $1 $2 ... > /dev/console
if [ "$1" != "WPS_IN_PROGRESS" ]; then
	phpsh /etc/scripts/wps/wps.php PARAM1=$1 PARAM2=$2
fi
exit 0
