#!/bin/sh

USB_DBG_DIR=/tmp/usbdbg_log/temp
CONSOLE_OUTPUT=/dev/console
USB_DBG_OUTPUT=$CONSOLE_OUTPUT

USB_DEVICE_FILE=/sys/kernel/debug/usb/devices
USB_PARTITON_FILE=/proc/partitions
USB_SMBCONF_FILE=/etc/samba/smb.conf
USB_FTPCONF_FILE=/tmp/proftpd.conf
USB_FTPCONF_ANONY_FILE=/tmp/ftp_anony.conf
USB_DLNACONF_FILE=/tmp/etc/minidlna.conf

show_all_process="ps -ww"
show_usb_device_cmd="cat $USB_DEVICE_FILE"
show_usb_mount_cmd="mount"
show_usb_partitions_cmd="cat $USB_PARTITON_FILE"
show_usb_smbconf_cmd="cat $USB_SMBCONF_FILE"
show_usb_ftpconf_cmd="cat $USB_FTPCONF_FILE"
show_usb_ftpconf_anony_cmd="cat $USB_FTPCONF_ANONY_FILE"
show_usb_dlnaconf_cmd="cat $USB_DLNACONF_FILE"
show_usb_blkidinfo_cmd="blkid /dev/sd*"
show_usb_configinfo_cmd="config show | grep usb"

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

dbg_clean() {
dbg_echo_override ""
}

dbg_start() {
dbg_echo "USB INFO COLLECTION START ON $(date +'%Y-%m-%d %H:%M:%S')"
}

show_all_process_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show All Process Running Information<<<<<<<"
dbg_echo "CMD: \"$show_all_process\""
dbg_echo "$(eval $show_all_process)"
dbg_echo "================================================"
}

show_usb_device_basic_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Device Basic Information<<<<<<<"
dbg_echo "CMD: \"$show_usb_device_cmd\""
dbg_echo "$(eval $show_usb_device_cmd)"
dbg_echo "================================================"
}

show_usb_device_id_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Device ID Information<<<<<<<"
#dbg_echo "CMD: \"$show_usb_device_cmd\""
#dbg_echo "$(eval $show_usb_device_cmd)"
ls -l /sys/bus/usb/devices/ | awk '{print $9}' > $USB_DBG_DIR/usb_device
while read LINE_USBDEV
do
	usb_devid="$LINE_USBDEV"
	usb_manufacturer="$(cat /sys/bus/usb/devices/$LINE_USBDEV/manufacturer 2>/dev/null)"
	usb_product="$(cat /sys/bus/usb/devices/$LINE_USBDEV/product 2>/dev/null)"
	usb_busnum="$(cat /sys/bus/usb/devices/$LINE_USBDEV/busnum 2>/dev/null)"
	usb_devnum="$(cat /sys/bus/usb/devices/$LINE_USBDEV/devnum 2>/dev/null)"
	usb_devpath="$(cat /sys/bus/usb/devices/$LINE_USBDEV/devpath 2>/dev/null)"
	usb_devpath="$(cat /sys/bus/usb/devices/$LINE_USBDEV/devpath 2>/dev/null)"
	usb_serial="$(cat /sys/bus/usb/devices/$LINE_USBDEV/serial 2>/dev/null)"
	dbg_echo "######USB DEVICE ID:$usb_devid######"
	dbg_echo "devid:$usb_devid"
	dbg_echo "manufacturer:$usb_manufacturer"
	dbg_echo "product:$usb_product"
	dbg_echo "busnum:$usb_busnum"
	dbg_echo "devnum:$usb_devnum"
	dbg_echo "devpath:$usb_devpath"
	dbg_echo "serial:$usb_serial"
done<$USB_DBG_DIR/usb_device
dbg_echo "================================================"
}

show_usb_device_mount_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Device Mount Information<<<<<<<"
dbg_echo "CMD: \"$show_usb_mount_cmd\""
dbg_echo "$(eval $show_usb_mount_cmd)"
dbg_echo "================================================"
}

show_usb_device_block_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Device Block Information<<<<<<<"
dbg_echo "CMD: \"$show_usb_partitions_cmd\""
dbg_echo "$(eval $show_usb_partitions_cmd)"
dbg_echo "================================================"
}

show_sambaconf_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show Samba Server Setting<<<<<<<"
dbg_echo "CMD: \"$show_usb_smbconf_cmd\""
dbg_echo "$(eval $show_usb_smbconf_cmd)"
dbg_echo "================================================"
}

show_ftpconf_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show FTP Server Setting<<<<<<<"
dbg_echo "CMD: \"$show_usb_ftpconf_cmd\""
dbg_echo "$(eval $show_usb_ftpconf_cmd)"
dbg_echo "CMD: \"$show_usb_ftpconf_anony_cmd\""
dbg_echo "$(eval $show_usb_ftpconf_anony_cmd)"
dbg_echo "================================================"
}

show_dlnaconf_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show Media Server Setting<<<<<<<"
dbg_echo "CMD: \"$show_usb_dlnaconf_cmd\""
dbg_echo "$(eval $show_usb_dlnaconf_cmd)"
dbg_echo "================================================"
}

show_usb_config_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Config Setting<<<<<<<"
dbg_echo "CMD: \"$show_usb_configinfo_cmd\""
dbg_echo "$(eval $show_usb_configinfo_cmd)"
dbg_echo "================================================"
}

show_usb_disk_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show Attached USB Disk Information<<<<<<<"

ls -l /sys/block/ | grep sd | awk '{print $9}' > $USB_DBG_DIR/disk_block
while read LINE
do
	dbg_echo "#####Device:$LINE#####"

	vendor=$(cat /sys/block/$LINE/device/vendor)
	model=$(cat /sys/block/$LINE/device/model)
	capacity=$(cat /sys/block/$LINE/size)

	vendor=$(echo ${vendor} | sed 's/[[:space:]]*$//')
	model=$(echo ${model} | sed 's/[[:space:]]*$//')
	if [ "$capacity" = "" ]; then
		capacity=0
	fi
	capacity=$(($capacity/2))
	capacity_covert=$(byte_unit_covert $capacity 2>/dev/null)

	dbg_echo "Vendor:$vendor"
	dbg_echo "Model:$model"
	dbg_echo "Capacity:$capacity_covert"
	dbg_echo "Partition Table:"
	dbg_echo "$(printf "Device\tVolume\tFilesystem\tSize\n")"

	ls -l /sys/block/$LINE/ | grep $LINE | awk '{print $9}' > $USB_DBG_DIR/disk_partition
	while read LINE_PART
	do
		volume_device=$LINE_PART
		if [ "$HAVE_BLKID" = "1" ]; then
			volume_name=$(blkid /dev/$LINE_PART -s LABEL |awk -F'LABEL=' '{print $2}' |awk -F'"' '{print $2}')
			volume_filesystem=$(blkid /dev/$LINE_PART | grep 'TYPE=' | awk -F ' TYPE=' '{print $2}' | awk '{print $1}' | cut -d '"' -f2)
		else
			volume_name=$(vol_id -L /dev/$LINE_PART 2>/dev/null)
			volume_filesystem=$(vol_id /dev/$LINE_PART | grep ID_FS_TYPE | awk -F= '{print $2}')
		fi
		volume_size=$(cat /sys/block/$LINE/$LINE_PART/size)
		if [ "$volume_name" = "" ]; then
			volume_name="UNKNOWN"
		fi
		if [ "$volume_filesystem" = "" ]; then
			volume_filesystem="UNKNOWN"
		fi
		if [ "$volume_size" = "" ]; then
			volume_size=0
		fi
		volume_size=$(($volume_size/2))
		volume_size_covert=$(byte_unit_covert $volume_size 2>/dev/null)
		dbg_echo "$(printf "$volume_device\t$volume_name\t$volume_filesystem\t$volume_size_covert\n")"
	done<$USB_DBG_DIR/disk_partition
done<$USB_DBG_DIR/disk_block
dbg_echo "================================================"
}

show_usb_blkid_info() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Device Blkid or Volid Information<<<<<<<"
if [ "$HAVE_BLKID" = "1" ]; then
	dbg_echo "CMD: \"$show_usb_blkidinfo_cmd\""
	dbg_echo "$(eval $show_usb_blkidinfo_cmd)"
else
	ls -l /dev/ | grep " sd[a-z]" | awk '{print $10}' > $USB_DBG_DIR/disk_devlist
	while read LINE_DEV
	do
		dbg_echo "vol_id /dev/$LINE_DEV:"
		dbg_echo "$(vol_id /dev/$LINE_DEV 2>/dev/null)"
	done<$USB_DBG_DIR/disk_devlist
fi
dbg_echo "================================================"
}

show_usb_mountpiont_status() {
dbg_echo "================================================"
dbg_echo ">>>>>Show USB Mount Point BUSY Status<<<<<<<"
mount | grep ^/dev/sd > $USB_DBG_DIR/disk_mountinfo
while read LINE_MOUNT
do
	mount_dev=$(echo $LINE_MOUNT | awk '{print $1}')
	mount_point=$(echo $LINE_MOUNT | awk '{print $3}')
	if [ "x$mount_dev" = "x" -o "x$mount_point" = "x" ]; then
		dbg_echo "#####INVALID MOUNT INFO#####"
		dbg_echo "LINE:\"$LINE_MOUNT\""
	else
		dbg_echo "#####MOUNT INFO: POINT:$mount_point, DEV:$mount_dev#####"
		fuser_pidlist="$(fuser -m $mount_point 2>/dev/null)"
		if [ "x$fuser_pidlist" = "x" ]; then
			dbg_echo "STATUS:FREE"
		else
			dbg_echo "STATUS:BUSY"
			dbg_echo "FUSER_PIDLIST:$fuser_pidlist"
			for pid in $fuser_pidlist; do
				dbg_echo "PID $pid INFO:"
				dbg_echo "$(head -6 /proc/$pid/status)"
				dbg_echo "Ps Line Info:"
				dbg_echo "$(ps -ww | grep $pid | grep -v grep)"
			done
		fi
	fi
done<$USB_DBG_DIR/disk_mountinfo
dbg_echo "================================================"
}

dbg_finish() {
dbg_echo "USB INFO COLLECTION FINISH ON $(date +'%Y-%m-%d %H:%M:%S')"
}

mkdir -p $USB_DBG_DIR

if [ $# -eq 0 ]; then
	USB_DBG_TYPE="all"
	USB_DBG_OUTPUT=$CONSOLE_OUTPUT
elif [ $# -eq 1 ]; then
	USB_DBG_TYPE="$1"
	USB_DBG_OUTPUT=$CONSOLE_OUTPUT
else
	USB_DBG_TYPE="$1"
	USB_DBG_OUTPUT="$2"
fi

echo "USB_DBG_OUTPUT is $USB_DBG_OUTPUT" > $CONSOLE_OUTPUT

dbg_clean
dbg_start

case "$USB_DBG_TYPE" in
	"all")
		show_all_process_info
		show_usb_device_basic_info
		show_usb_device_id_info
		show_usb_device_mount_info
		show_usb_device_block_info
		show_sambaconf_info
		show_ftpconf_info
		show_dlnaconf_info
		show_usb_config_info
		show_usb_disk_info
		show_usb_blkid_info
		show_usb_mountpiont_status
	;;
	"basic_info")
		show_all_process_info
		show_usb_device_basic_info
		show_usb_device_id_info
		show_usb_device_mount_info
		show_usb_device_block_info
		show_sambaconf_info
		show_ftpconf_info
		show_dlnaconf_info
		show_usb_config_info
	;;
	"device_id")
		show_usb_device_id_info
	;;
	"sambaconf")
		show_sambaconf_info
	;;
	"ftpconf")
		show_ftpconf_info
	;;
	"dlnaconf")
		show_dlnaconf_info
	;;
	"config_info")
		show_usb_config_info
	;;
	"disk_info")
		show_usb_disk_info
	;;
	"blkid_info")
		show_usb_blkid_info
	;;
	"mountpiont_status")
		show_usb_mountpiont_status
	;;
	*)
		echo "INVALID INPUT PARAMETER!!!!" > $CONSOLE_OUTPUT
	;;
esac

dbg_finish
