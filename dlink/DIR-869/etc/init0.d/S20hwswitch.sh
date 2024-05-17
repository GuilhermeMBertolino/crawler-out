#!/bin/sh
echo [$0]: $1 ... > /dev/console
case "$1" in
start)
	max=5
	i=0
	while [ ! -w /var/gpio_ctrl ];
	do
		if [$i >= $max ]; then
			break
		fi

		$i=$i+1
		sleep 1
	done

	usockc /var/gpio_ctrl GPIO_SWITCH;
	$i=0
	while [ ! -w /var/gpio_ctrl_result ];
	do
		if [$i >= $max ]; then
			break
		fi

		$i=$i+1
		sleep 1
	done

	hw_mode="`cat /var/gpio_ctrl_result`"
	op_mode="`xmldbc -w /device/layout`"
	
	echo [hw_mode]:$hw_mode, [op_mode]:$op_mode
	
	#if [ "$hw_mode" == "EXTENDER" -a "$op_mode" != "bridge" ]; then
	if [ "$hw_mode" == "EXTENDER" ]; then
		xmldbc -s /device/layout bridge
		xmldbc -s /device/wirelessmode WirelessRepeaterExtender
	#elif [ "$hw_mode" == "ROUTER" -a "$op_mode" != "router" ]; then
	elif [ "$hw_mode" == "ROUTER" ]; then
		xmldbc -s /device/layout router
		xmldbc -s /device/wirelessmode WirelessRouter
	fi
	;;
esac
exit 0
