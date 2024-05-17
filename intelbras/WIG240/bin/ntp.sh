#!/bin/sh  
#                                 
# script file to start ntp client

TOOL=flash
GETMIB="$TOOL get"
NTPTMP=/tmp/ntp_tmp
eval `$GETMIB NTP_ENABLED`
if [ $NTP_ENABLED = 1 ]; then
echo Start NTP daemon
	while [ true ];
	do
		eval `$GETMIB NTP_TIMEZONE`
		TZ_STR=`echo $NTP_TIMEZONE | cut -d" " -f1`
		echo GMT$TZ_STR > /etc/TZ

		eval `$GETMIB NTP_SERVER_ID`
		eval `$GETMIB NTP_SERVER_IP1`
		eval `$GETMIB NTP_SERVER_IP2`
		if [ $NTP_SERVER_ID = 0 ];then
			ntpserver=$NTP_SERVER_IP1
		else
			ntpserver=$NTP_SERVER_IP2
		fi
		#ntpdate  $NTP_SERVER_IP #sleep 5 sec for next check
		ntpclient -s -h $ntpserver -i 5 > $NTPTMP
		if [ -n "`cat $NTPTMP`" ];then
			echo ntp client success
			success=1
		else
			success=0
		fi
		if [ $success = 1 ] ;then
			sleep 3600
		else
			sleep 5
		fi
		#echo "NTP client retry ...."
	done &
	if [ -f $NTPTMP ]; then
		rm $NTPTMP
	fi
fi # NTP Enabled
