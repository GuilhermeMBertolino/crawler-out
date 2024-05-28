#!/bin/sh
#set -x
local agilefile="agileconfig_1h_counts"
local end_count=60
local wan_connect_flag=$1
local count=0
local agileconfig_flag=`uci get factory.agileconfig.enable`

if [ -z "$agileconfig_flag" -o "$agileconfig_flag" = "no" ]; then
	if [ -f /tmp/$agilefile ];then
		rm /tmp/$agilefile
	fi
	return 0
fi	

if [ -s /tmp/$agilefile ];then
	count=$(cat /tmp/$agilefile)
	if [ $count -gt $end_count ];then
		uci set factory.agileconfig.enable="no"
		uci commit
		uci_commit_flash
		rm /tmp/$agilefile
		echo "[agile config] 1h, will set the agileconfig_flag is no" > /dev/console
	else
		if [ $wan_connect_flag -eq 1 ];then
			count=`expr $count + 1`
			echo $count > /tmp/$agilefile
			#echo "agile config write $count to file" > /dev/console
		else
			#echo "agile config write 0 to file" > /dev/console
			echo 0 > /tmp/$agilefile
		fi
	fi
else
	touch /tmp/$agilefile
	echo 0 > /tmp/$agilefile
	#echo "agile config create write 0 to file" > /dev/console
fi

return 0
