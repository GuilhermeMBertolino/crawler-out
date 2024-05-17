#!/bin/sh

#############################################################################
#usage:
#	time_reboot_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/time_reboot_tid.cfg

NAME=$1
TIME=$2

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "reboot 30" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0