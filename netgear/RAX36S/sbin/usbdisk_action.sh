#!/bin/sh

USB_DBG_DIR=/tmp/usbdbg_log/temp
CONSOLE_OUTPUT=/dev/console
USB_DBG_OUTPUT=$CONSOLE_OUTPUT

BLKID_BIN=$(which blkid)

if [ "x$BLKID_BIN" != "x" ]; then
	HAVE_BLKID=1
fi

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

echo_console() {
	local echo_msg="$1"

	echo "$echo_msg" > $CONSOLE_OUTPUT
}

byte_unit_covert() {
	byte_size=$1
	byte_unit="B"
	byte_tras=0

	TB_BYTE=$((1024*1024*1024))
	GB_BYTE=$((1024*1024))
	MB_BYTE=1024
	KB_BYTE=1

	if [ "$byte_size" = "" ]; then
		byte_size=0
	fi

#	if [ $byte_size -ge $GB_BYTE ]; then
#		byte_unit="GB"
#		byte_tras=$(($byte_size/$GB_BYTE))
#	else
#		byte_unit="MB"
#		byte_tras=$(($byte_size/$MB_BYTE))
#	fi

	byte_unit="MB"
	byte_tras=$(($byte_size/$MB_BYTE))

	echo -n "$byte_tras$byte_unit"
}

get_usb_device_id() {
	local usb_dev="$1"
	local usb_devid=""
	local id_tmp2

	if [ ! -d /sys/block/$usb_dev ]; then
		echo_console "Device /sys/block/$usb_dev NOT FOUND!!!"
		echo -n ""
		return
	fi

	local id_tmp1="$(ls -l /sys/block/$usb_dev 2>/dev/null| awk '{print $11}' | sed 's/.*\/usb/\/usb/g' | sed 's/\/host.*//g' | sed 's/\// /g')"

	for id_tmp2 in $id_tmp1; do
		#echo_console "id_tmp2 is $id_tmp2"
		if [ "x$(echo $id_tmp2 | grep "[A-Za-z]" 2>/dev/null)" != "x" ]; then
			#echo_console "id_tmp2 $id_tmp2 have A-Z a-z char, Skip"
			continue
		fi

		if [ "x$(echo $id_tmp2 | grep ":" 2>/dev/null)" != "x" ]; then
			#echo_console "id_tmp2 $id_tmp2 have : char, Skip"
			continue
		fi
		usb_devid="$id_tmp2"
	done

	echo -n "$usb_devid"
}

enable_usb_disk() {
	local enable="$1"
	#local device="$2"
	#local devid="$(get_usb_device_id $device)"
	local devid="$2"

	if [ ! -d /sys/bus/usb/devices/$devid ]; then
		echo_console "USB Device ID $devid NOT FOUND!!!"
	elif [ ! -f /sys/bus/usb/devices/$devid/authorized ]; then
		echo_console "USB Device ID $devid authorized FILE NOT FOUND!!!"
	elif [ "$enable" = "disable" ]; then
		echo "0" > /sys/bus/usb/devices/$devid/authorized
	else
		echo "1" > /sys/bus/usb/devices/$devid/authorized
	fi
}

enable_usb_disk_all() {
	local enable="$1"

	local usb_buslist="$(ls /sys/bus/usb/devices/ | grep "\<usb")"

	for usb_tmp in $usb_buslist; do
		enable_usb_disk $enable $usb_tmp
	done
}

show_usbdisk_device_id() {
	local device="$1"
	local devid="$(get_usb_device_id $device)"

	echo_console "USB Disk $device Device ID is $devid"
}

#mkdir -p $USB_DBG_DIR

ACT_TYPE="$1"

case "$ACT_TYPE" in
	"enable")
		device_id="$2"
		if [ "x$device_id" = "x" ]; then
			echo_console "invalid input parameter!!!!"
		else
			enable_usb_disk "enable" "$device_id"
		fi
	;;
	"disable")
		device_id="$2"
		if [ "x$device_id" = "x" ]; then
			echo_console "invalid input parameter!!!!"
		else
			enable_usb_disk "disable" "$device_id"
		fi
	;;
	"disable_all")
		enable_usb_disk_all "disable"
	;;
	"enable_all")
		enable_usb_disk_all "enable"
	;;
	"show_device_id")
		disk_device="$2"
		if [ "x$disk_device" = "x" ]; then
			echo_console "invalid input parameter!!!!"
		else
			show_usbdisk_device_id $disk_device
		fi
	;;
	*)
		echo_console "INVALID INPUT ACTION!!!!"
	;;
esac

