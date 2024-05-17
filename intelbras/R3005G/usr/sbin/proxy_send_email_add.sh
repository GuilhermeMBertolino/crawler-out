#!/bin/sh

#############################################################################
#usage:
#	proxy_send_email_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/time_proxy_email_tid.cfg

NAME=$1
TIME=$2
FUN=$3

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "$FUN" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0