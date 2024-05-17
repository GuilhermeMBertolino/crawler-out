#!/bin/sh

#############################################################################
#usage:
#	user_jsmod_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/user_jsmod_tid.cfg

NAME=USER_JSMOD
MINUTE=$1
TIME=$2

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "wys user js_mod $MINUTE" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0