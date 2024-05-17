#!/bin/sh
#
#

shnum=`ps | grep usbmemdrop | grep -v grep | wc -l`
if [ $shnum -gt 2 ];then
	echo $shnum
	exit
fi

while [ "1" == "1" ]
do
	memfree=`cat /proc/meminfo | grep MemFree | cut -d ":" -f2 | cut -d "k" -f1`
	if [ $memfree -lt 6000 ];then
		echo 1 > /proc/sys/vm/drop_caches
	fi
	sleep 1
done