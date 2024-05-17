#!/bin/sh

case "$1" in
	start)
		echo "Starting CMS smd..."
		/bin/smd
		exit 0
		;;

	stop)
		echo "Stopping CMS smd..."
		# keep this in sync with BDK sysmgmt_md.sh
		/bin/send_cms_msg -r -t 8000 0x1000080D 20
		exit 0
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;

esac

