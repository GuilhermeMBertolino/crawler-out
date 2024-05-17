#!/bin/sh
#
# $Id:
#
# usage: daemon.sh
#
#scripts1

. /sbin/global.sh
wanip="0";
wanLink="0";
oldWanStatus="0"
curWanStatus="0"
apCliEnable=`nvram_get 2860 ApCliEnable`
while [ "1" == "1" ]
do
	wanip=`ifconfig $wan_ppp_if 2>/dev/null |grep 'inet addr' |cut -d ":" -f2|cut -d" " -f1`
	wanLink=`mii_mgr -g -p 0 -r 1 |grep "d"`
	wifiEnable=`nvram_get 2860 WiFiOff`
	if [ "$opmode" == "0" -a  "$apCliEnable" == "0" ];then
		if [ "$wanip" != "" ];then
				curWanStatus=1;
			else
				curWanStatus=0;
			fi
	elif [ "$opmode" == "1" ];then
		if [ "$wanLink" != "" ];then
			if [ "$wanip" != "" ];then
				curWanStatus=1;
			else
				curWanStatus=0;
			fi
		else
			curWanStatus=0;
		fi
	elif [ "$opmode" == "0" -a  "$apCliEnable" == "1" ];then 
		if [ "$wifiEnable" == "0" ];then
			apCliStatus=`iwpriv apcli0 stat|grep "Disconnect"`	
			if [ "$apCliStatus" != "" ];then
				curWanStatus=0;
			else
				curWanStatus=1;
			fi
		else
			curWanStatus=0;
		fi
	elif [ "$opmode" == "3" ];then
		if [ "$wifiEnable" == "0" ];then
			if [ "$wanip" != "" ];then
				curWanStatus=1;
			else
				curWanStatus=0;
			fi
		else
			curWanStatus=0;
		fi
	fi
	
	if [ "$curWanStatus" == "1" -a "$oldWanStatus" != "$curWanStatus" ];then
		nvram_set 2860 wan_connection_status 1
		#echo  "1" > /etc/ping_state.conf
	fi
	if [ "$curWanStatus" == "0" -a "$oldWanStatus" != "$curWanStatus" ];then
		nvram_set 2860 wan_connection_status 0
		#echo  "0" > /etc/ping_state.conf
	fi
	oldWanStatus=$curWanStatus
	sleep 5
done

