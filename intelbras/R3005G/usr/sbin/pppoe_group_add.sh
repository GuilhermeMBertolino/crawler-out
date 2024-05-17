#!/bin/sh

#############################################################################
#usage:
#	pppoe_group_add.sh name up down time
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/pppoe_group_tid.cfg

NAME=$1
UP=$2
DOWN=$3
TIME=$4
DEF_UP=$5
DEF_DOWN=$6

if [ "$TIME" != "OFF" ]; then
	TWDAY=`echo "$TIME" | cut -f1 -d';'`
	TMIN=`echo "$TIME" | cut -f2 -d';'`
	timer_add.sh "$TWDAY" "$TMIN" "wys pppoe_group speed \"$NAME\" \"$UP\" \"$DOWN\"" "wys pppoe_group speed \"$NAME\" \"$DEF_UP\" \"$DEF_DOWN\""
	TIMERID=$?	  	  	
	echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0