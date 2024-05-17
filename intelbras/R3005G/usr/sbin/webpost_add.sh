#!/bin/sh

#############################################################################
#usage:
#	webpost_add.sh name|en|act|user_id|time_name time_mem
# wys hpostforbid add group_id acl
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
USER_ID=$3
LOG=$4
TIME_NAME=$5

CFGFILE=/root/webpost_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys hpostforbid add "$NAME" "$LOG" "$USER_ID"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys hpostforbid add \"$NAME\" \"$LOG\" \"$USER_ID\" " "wys hpostforbid del \"$NAME\" "
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
