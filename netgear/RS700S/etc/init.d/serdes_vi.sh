#!/bin/sh

case "$1" in
	start)
		[ -f /bin/serdes_vi ] && { echo "Starting serdes_vi..."; /bin/serdes_vi; }
		exit 0
		;;

	stop)
		echo "Stopping serdes_vi..."
		exit 0
		;;

	*)
		[ -f /bin/serdes_vi ] && { echo "Starting serdes_vi with no args..."; /bin/serdes_vi; }
		exit 1
		;;

esac

