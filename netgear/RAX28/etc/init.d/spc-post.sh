#!/bin/sh

case "$1" in
	start)
		# KKHuang: JIRA#RAX30-781: Fix UUID error
		if [ ! -f "/data/circle/data/apid.pem" -o ! -f "/data/circle/data/webd.pem" ]; then
			echo "Genrating SPC certificates..."
			export CIRCLE_ROOT=/data/circle/shares/usr/bin
			export CIRCLE_DATA=/data/circle/data
			if [ ! -f "/data/circle/data/apid.pem" ]; then
				LD_LIBRARY_PATH=/data/circle/shares/usr/lib ${CIRCLE_ROOT}/apid --makecert
			fi
			if [ ! -f "/data/circle/data/webd.pem" ]; then
				LD_LIBRARY_PATH=/data/circle/shares/usr/lib ${CIRCLE_ROOT}/webd --makecert
			fi
		fi

		echo "Configure ACL according to SPC status..."
		# Get RouterMode, ACL and SPC
		RouterMode=`getdb -r`
		AclStatus=`getdb -g Device.X_PEGATRON_COM_AccessCtrl.Enable`
		SpcStatus=`d2 -s circlestatus.activationStatus`
		if [ "$SpcStatus" == "provisioned" ]; then
			if [ "$RouterMode" == "router" -a "$AclStatus" == "1" ]; then
				echo "Disable ACL because SPC is provisioned"
				getdb -S Device.X_PEGATRON_COM_AccessCtrl.Enable 0
			else
				if [ "$RouterMode" != "router" -a "$AclStatus" == "0" ]; then
					echo "Enable ACL because SPC is provisioned"
					getdb -S Device.X_PEGATRON_COM_AccessCtrl.Enable 1
				fi
			fi
		fi

		exit 0
		;;

	*)
		echo "$0: unrecognized option $1"
		exit 1
		;;

	esac
