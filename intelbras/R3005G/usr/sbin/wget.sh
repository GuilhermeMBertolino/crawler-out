#!/bin/sh  
 
O_FILE=$1
BAK_FILE=$1_bak
URL=$2

rm -f "$O_FILE"
rm -f "$BAK_FILE"

sleep 3
wget -O "$BAK_FILE" "http://$URL"

if [ "$?" = "0" ];then
	mv -f "$BAK_FILE" "$O_FILE"
	sleep 2
	echo 3 > /proc/sys/vm/drop_caches
	exit 0
else
	rm -f "$BAK_FILE"
	exit 1
fi

