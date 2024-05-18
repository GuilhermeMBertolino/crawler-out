#!/bin/sh

#STATUS_LED="/sys/devices/platform/leds-gpio/leds/status/brightness"
#STATUS_ON_CMD="ledcli STATUS_ON"
#STATUS_OFF_CMD="ledcli STATUS_OFF"
STATUS_BLINK_CMD="/usr/bin/ledcli STATUS_BLINK"

platform_upgrading_blink() {
#	while true
#	do
#		$STATUS_ON_CMD
#		sleep 1
#		$STATUS_OFF_CMD
#		sleep 1
#	done	
	$STATUS_BLINK_CMD

}

platform_upgrading_hook() {
	echo "Start upgrading Status-LED blinking ..."
	platform_upgrading_blink
}
