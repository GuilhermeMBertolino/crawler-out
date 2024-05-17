#!/bin/sh

#############################################################################
#usage:
#	xwgl_ref_add.sh name en user_id user_to shibie_id time_name  act log pri
#   wys lvrule add  name  act log  shibie_ids user_to user_id
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
USER_ID=$3
USER_TO=$4
SHIBIE_ID=$5
TIME_NAME=$6
ACT=$7
LOG=$8
PRI=$9
IPPORT=$10
RULE_IPS=$11

CFGFILE=/root/xwgl_ref_tid.cfg


if [ "$EN" = "1" ]; then
	if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys lvrule add  "$NAME" "$ACT" "$LOG" "$SHIBIE_ID" "$USER_ID" "$USER_TO" "$PRI" "$IPPORT" "$RULE_IPS"
	else
		TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
		TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
		timer_add.sh "$TWDAY" "$TMIN" "wys lvrule add  \"$NAME\" \"$ACT\" \"$LOG\" \"$SHIBIE_ID\" \"$USER_ID\" \"$USER_TO\" \"$PRI\" \"$IPPORT\" \"$RULE_IPS\"" "wys lvrule del \"$NAME\""
    TIMERID=$?
	fi	
	echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
