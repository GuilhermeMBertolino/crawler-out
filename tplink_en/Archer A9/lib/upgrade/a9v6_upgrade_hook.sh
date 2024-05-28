#!/bin/sh

STATUS_LED="/sys/devices/platform/leds-gpio/leds/status/brightness"

platform_upgrading_blink() {
	while true
	do
		echo 1 > $STATUS_LED
		sleep 1
		echo 0 > $STATUS_LED
		sleep 1
	done
}

platform_upgrading_hook() {
	echo "Start upgrading Status-LED blinking ..."
	platform_upgrading_blink &
}
