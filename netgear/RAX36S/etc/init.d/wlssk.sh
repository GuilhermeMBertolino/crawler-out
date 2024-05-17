#!/bin/sh

case "$1" in
	start)
		#replace with wlan-init.sh
		#[ -e /bin/wlssk ] && wlssk&
		exit 0
		;;

	stop)
		#replace with wlan-init.sh
		#killall wlssk
		#sleep 1
		exit 0
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;

esac

