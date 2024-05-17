#!/bin/sh

#############################################################################
#usage:
#	speed_test_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/speed_test_tid.cfg

NAME=$1
TIME=$2
IFACE=$3

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "speedTest \"$IFACE\"" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0
