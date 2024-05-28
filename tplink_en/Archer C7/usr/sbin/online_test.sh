#!/bin/sh
# Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.
#
# Details : Wan Led Controller.
# Author  : jji315 <jiangji@tp-link.net>
# Version : 1.0
# Date    : 3 Jun, 2016
. /lib/functions/network.sh

old_status_wan=1
new_status_wan=1
wan_connect=""
ret=0

while true
do
	# 30s loop to check lan/wan status
	sleep 30
	
	 wan_connect=$(status wan_status)
	 if [ "$wan_connect" = "connected" ]; then
		online-test
		new_status_wan=$?
		ret=0
		[ -f /tmp/wan_connect_flag ] && ret="$(cat /tmp/wan_connect_flag)"

		if [ $ret == 1 -o  $new_status_wan != $old_status_wan ]; then
			if [ $new_status_wan == 0 ]; then
				# online
				ledcli WAN0_OFF
				ledcli WAN1_ON
			else
				# offline
				ledcli WAN0_ON
				ledcli WAN1_OFF
			fi
			eval old_status_wan=$new_status_wan
			[ $ret == 1 ] && echo 0 > /tmp/wan_connect_flag
		fi
	fi

done
