#!/bin/sh

#############################################################################
#usage:
#	fileexten_add.sh name|en|act|user_id|exten|time_name time_mem
# wys hpostfixfilter add group_id acl postfix
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
USER_ID=$3
EXTEN=$4
LOG=$5
TIME_NAME=$6

CFGFILE=/root/fileexten_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT
	 wys hpostfixfilter add "$NAME" "$LOG" "$USER_ID"  "$EXTEN"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys hpostfixfilter add \"$NAME\" \"$LOG\" \"$USER_ID\"  \"$EXTEN\"" "wys hpostfixfilter del \"$NAME\" "
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
