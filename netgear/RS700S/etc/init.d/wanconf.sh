#!/bin/sh

. /etc/init.d/startup_ctl.sh

case "$1" in
	start)
		start_up wanconf
		is_start_done gpon_md epon_md
		(
		  trap_err
		  /bin/wanconf
		  start_done
		  exit 0
		)&
		;;

	stop)
		echo "Stopping wancof..."
		exit 0
		;;

	*)
		echo "Starting wanconf with no args..."
		/bin/wanconf
		exit 1
		;;

esac

