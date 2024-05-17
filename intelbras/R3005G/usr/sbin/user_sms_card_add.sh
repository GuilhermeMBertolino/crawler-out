#!/bin/sh

#############################################################################
#usage:
#	user_sms_card_add.sh str
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/user_sms_card_tid.cfg

NAME=$1
TYPE=$2
TIME=$3

wys user card set $TYPE 0

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

timer_add.sh "$TWDAY" "$TMIN" "wys user card set $TYPE 1" "wys user card set $TYPE 0"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0