#!/bin/sh
echo [$0]: $1 ... > /dev/console
case "$1" in
start)
	if [ -f "/etc/scripts/wifi_watchdog.sh" ]; then
		suppress=`xmldbc -g /debug/suppress_wifi_watchdog`
		if [ "$suppress" != "1" ]; then
			/etc/scripts/wifi_watchdog.sh &
		fi
	fi
	if [ -f "/etc/scripts/noise_watchdog.sh" ]; then
		/etc/scripts/noise_watchdog.sh &
	fi
	;;
stop)
	if [ -f "/etc/scripts/wifi_watchdog.sh" ]; then
		suppress=`xmldbc -g /debug/suppress_wifi_watchdog`
		if [ "$suppress" != "1" ]; then
			killall wifi_watchdog.sh
		fi
	fi
	if [ -f "/etc/scripts/noise_watchdog.sh" ]; then
		killall noise_watchdog.sh
	fi
	;;
*)
	echo [$0]: Invalid argument - $1 > /dev/console
	;;
esac
