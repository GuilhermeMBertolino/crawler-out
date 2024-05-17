#!/bin/sh
op_mode=`xmldbc -g /device/layout`
if [ "$1" == "EXTENDER" -a "$op_mode" != "bridge" -o "$1" == "ROUTER" -a "$op_mode" != "router" ]; then
	echo [$0] $1 ... > /dev/console
	event REBOOT
fi
