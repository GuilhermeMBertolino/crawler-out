#!/bin/sh

CPU_INFO_PATH=/tmp/debug
MEM_INFO=/tmp/debug_mem
FLASH_INFO=/tmp/debug_flash
SESSION_INFO=/tmp/debug_session
WLAN_DRV_INFO=/tmp/debug_wlan

cpu_usage()
{

	mkdir -p $CPU_INFO_PATH
	total_cpu=`mpstat -P ALL |awk '{print $11}'`
	line_num="0"

	for line in $total_cpu
	do
		line_num=$(($line_num + 1))
		if [ $line_num = "1" ] || [ $line_num = "2" ]; then
			continue
		fi
		cpu_num=$(($line_num - 2))
		cpu_usage=`echo "100.00 - $line"|bc`
		[ "`echo $cpu_usage|cut -b1`" = "." ] && cpu_usage="0${cpu_usage}"
		echo "${cpu_usage}%" > $CPU_INFO_PATH/debug_cpu$cpu_num
		#cat $CPU_INFO_PATH/debug_cpu$cpu_num
	done
}

mem_usage()
{
	used_kb=`free | grep "Mem" | awk '{print $3}'`
	used_mb=`expr ${used_kb} / 1024`

	unused_kb=`free | grep "Mem" | awk '{print $4}'`
	unused_mb=`expr ${unused_kb} / 1024`

	total_kb=`free | grep "Mem" | awk '{print $2}'`
	total_mb=`expr ${total_kb} / 1024`

	echo "${used_mb}MB/${total_mb}MB" > $MEM_INFO
}

session_usage()
{
	used_session=`cat /proc/sys/net/netfilter/nf_conntrack_count`
	total_session=`cat /proc/sys/net/netfilter/nf_conntrack_max`
	
	echo "${used_session}/${total_session}" > $SESSION_INFO
}

flash_usage()
{
	reserved_size=0
	data_reserverd_size=0
	while read dev size erasesize name
	do
		name=$(echo $name | sed 's/\"//g')
		size=$(printf %d 0x$size)
		[ "$name" = "reserved" ] && reserved_size=$size
		[ "$name" = "brcmnand.0" ] && size_sum=$size
	done < /proc/mtd
	max_size=$(($size_sum / 1048576))
	reserved_size=$(($reserved_size / 1048576))
	data_reserverd=`df -m |grep -v Filesystem |grep -v "\/dev\/sd" |awk '{print $4}'` # get avalable MB size
	if [ "$data_reserverd_size" != "" ]; then
		for i in $data_reserverd
		do
			data_reserverd_size=$(($data_reserverd_size + $i))
		done
	fi
	reserved_size=$(($reserved_size + $data_reserverd_size))
	echo "$(($max_size - $reserved_size))MB/${max_size}MB" > $FLASH_INFO
}

wlan_drv_version()
{
	echo "7.0.1487.032" > $WLAN_DRV_INFO
}

dist_path=""

. /sbin/debug_functions.sh

cpu_usage
mem_usage
session_usage
flash_usage
wlan_drv_version
check_usb_storage_folder
if [ "X$dist_path" != "X" ]; then
	echo 1 > /tmp/debug-usb
else
	echo 0 > /tmp/debug-usb
fi
