#!/bin/sh

PATH=/bin:/sbin:/usr/bin:/usr/sbin

if [ $# -eq 1 ]; then SL_TIME=$1; else SL_TIME=4; fi
wlanconfig survey0 create wlandev wifi0 wlanmode sta nosbeacon >/dev/null
ifconfig survey0 up && /sbin/iwlist survey0 scan >/dev/null 2>/dev/null
sleep $SL_TIME
iwlist survey0 scan | scanparser
ifconfig survey0 down
wlanconfig survey0 destroy
