#!/bin/sh
echo [$0]: $1 ... > /dev/console
arp=`ps | grep "arpmonitor" | grep -v "grep"`
if [ -z "$arp" ]; then
LAYOUT=`xmldbc -g /device/layout`
if [ "$LAYOUT" == "bridge" ] ; then
arpmonitor -i br0 &
else
arpmonitor -i br0 -i br1 &
fi
echo "run arpmonitor again" > /dev/console
fi 