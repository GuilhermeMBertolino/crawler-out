#!/bin/sh

LED_SCRIPT=sysled
LED_STATE_FILE=/tmp/leds.state
LED_FILE_PREV=/tmp/leds.prev

CURR_STATE=$(test -f $LED_STATE_FILE && cat $LED_STATE_FILE || echo "")
PREV_STATE=$(test -f $LED_FILE_PREV && cat $LED_FILE_PREV || echo "")

case "$1" in
start)
	if [ -f $LED_STATE_FILE -a "$CURR_STATE" != "locate" ]; then
		mv $LED_STATE_FILE $LED_FILE_PREV
	fi
	$LED_SCRIPT -b locate
	exit 0
	;;
stop)
	if [ -f $LED_FILE_PREV -a "$PREV_STATE" != "locate" ]; then
		$LED_SCRIPT -b $PREV_STATE
	else
		$LED_SCRIPT -b ready
	fi
	rm -f $LED_FILE_PREV
	exit 0
	;;
check)
	if [ "$CURR_STATE" = "locate" ]; then
		exit 1
	else
		exit 0
	fi
	;;
*)
	echo "Usage: led-locate.sh {start|stop|check}"
	exit 1
	;;
esac

