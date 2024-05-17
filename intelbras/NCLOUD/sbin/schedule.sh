#!/bin/sh
#
#
#For nbox firewall schedule,add by hs
#
#After NTP sync success, change GMT to UTC
#

year=`date +%Y`
mon=`date +%m`
day=`date +%d`
hour=`date +%H`
min=`date +%M`
sec=`date +%S`

#rm -rf /etc/TZ
sed -i 's/GMT/UTC/' /etc/TZ

date -s "$year-$mon-$day $hour:$min:$sec" 1>/dev/null

exit 0








