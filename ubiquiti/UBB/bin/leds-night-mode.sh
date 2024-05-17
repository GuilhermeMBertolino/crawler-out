#!/bin/sh

uptime=`cat /proc/uptime | cut -d '.' -f 1`
if [ $uptime -lt 600 ]; then
	sleep 600s
fi
/sbin/sysled -o 0
