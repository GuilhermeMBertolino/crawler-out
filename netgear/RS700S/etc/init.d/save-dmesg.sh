#!/bin/sh

. /etc/init.d/startup_ctl.sh

case "$1" in
	start)
		start_up save-dmesg
		(
		  trap_err
		  echo "Saving kernel bootup messages for dumpsysinfo..."
		  /bin/dmesg > /var/tmp/bootupmessages
		  start_done
		  exit 0
		)&
		;;

	stop)
		echo "No stop for dumpsysinfo"
		exit 1
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;

esac

