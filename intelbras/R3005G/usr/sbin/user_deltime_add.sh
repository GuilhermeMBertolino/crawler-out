#!/bin/sh

#############################################################################
#usage:
#	user_deltime_add.sh name time type expired_type voucher_type
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/user_deltime_tid.cfg

NAME=$1
TIME=$2
TYPE=all
EXPIRED_TYPE=0
VOUCHER_TYPE=0

if [ $# -gt 2 ]; then
	TYPE=$3
fi

if [ $# -gt 3 ]; then
	EXPIRED_TYPE=$4
fi

if [ $# -gt 4 ]; then
	VOUCHER_TYPE=$5
fi

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

#wys user delall [type<all|web|pppoe>] [expired_type<0|1>] [voucher_type<0|1|2>]
timer_add.sh "$TWDAY" "$TMIN" "wys user delall $TYPE $EXPIRED_TYPE $VOUCHER_TYPE" "echo"
TIMERID=$?

echo "$NAME=$TIMERID" >>$CFGFILE


exit 0