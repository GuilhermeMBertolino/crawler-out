#!/bin/sh
echo [$0]: $1 ... > /dev/console
if [ "$1" = "start" ]; then
#event WANV6.DETECT	add "/etc/events/WANV6-DETECT.sh WAN-1 WAN-3 WAN-4 WAN-5"
#event WANV6.AUTOCONF.DETECT	add "sh /etc/events/WANV6_AUTOCONF_DETECT.sh WAN-4 START"
event AUTODETECT add "phpsh /etc/events/autodetect.php"
event AUTODETECT.REVERT add "phpsh /etc/events/autodetect-revert.php"
event AUTODETECT.REVERT
fi
