#!/bin/sh

killall -URG led_control
echo "$0 $1 ..." > /dev/console

[ -n "$1" ] && sleep $1 || sleep 5
/bin/date "+%Y/%m/%d %T" > /etc/reserve-data/resetbtn
/usr/sbin/factory_reset.sh
reboot

