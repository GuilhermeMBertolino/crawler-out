#!/bin/sh

#############################################################################
#usage:
#	usblog_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/usblog_tid.cfg

NAME=usblog
TIME=$1

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "wys usblog save" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0