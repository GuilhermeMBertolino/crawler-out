#!/bin/sh

#############################################################################
#usage:
#	chk_qq_add.sh type qq_id time_name
#   wys lvrule hbmd type add qq_id
#############################################################################

ECHO=/bin/echo

TYPE=$1
QQ_ID=$2
TIME_NAME=$3

CFGFILE=/root/chk_${TYPE}_tid.cfg


if [ "$TIME_NAME" = "OFF" ]; then
 TIMERID=NOT	
 wys lvrule hbmd  "$TYPE"  add  "$QQ_ID"
else
	TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	timer_add.sh "$TWDAY" "$TMIN" "wys lvrule hbmd  \"$TYPE\" add \"$QQ_ID\"" "wys lvrule hbmd  \"$TYPE\" del \"$QQ_ID\""
  TIMERID=$?
fi	
echo "$QQ_ID=$TIMERID" >>$CFGFILE

exit 0
