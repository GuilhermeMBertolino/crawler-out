#!/bin/sh

CONSOLE_OUTPUT=/dev/console
USB_DBG_OUTPUT=$CONSOLE_OUTPUT
USB_MOUNT_IGNORE=/tmp/usb_mount_ignore

dbg_echo() {
	local echo_msg="$1"
	local echo_override="$2"

	if [ "$echo_override" = "1" ]; then
		echo "$echo_msg" > $USB_DBG_OUTPUT
	else
		echo "$echo_msg" >> $USB_DBG_OUTPUT
	fi
}

dbg_echo_override() {
	local echo_msg="$1"
	dbg_echo "$echo_msg" "1"
}

dbg_clean() {
dbg_echo_override ""
}

dbg_start() {
dbg_echo "USB PRE REBOOT HANDLE START (ACTION:$ACTION) ON $(date +'%Y-%m-%d %H:%M:%S')"
}

dbg_finish() {
dbg_echo "USB PRE REBOOT HANDLE FINISH (ACTION:$ACTION) ON $(date +'%Y-%m-%d %H:%M:%S')"
}

usb_service_stop() {
	# stop Minidlan Service
	killall -9 minidlna

	# stop Samba Service
	killall -9 smbd
	killall -9 nmbd

	# stop FTP Service
	killall -9 proftpd

	# stop AFP Service
	#killall -9 afpd

	# killall others USB App
	killall -9 check_time_machine
	killall -9 send_wol
}

ACTION="$1"

dbg_clean
dbg_start

[ ! -f $USB_MOUNT_IGNORE ] && echo > $USB_MOUNT_IGNORE

usb_service_stop

dbg_finish
