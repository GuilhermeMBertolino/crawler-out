#!/bin/sh

#############################################################################
#usage:
#	url_add.sh str
# name/en(0|1)/inips/urls/time/time_mem/log/pri/act
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/url_tid.cfg

NAME=$1
EN=$2
INIPS=$3
URLS=$4
TIME_NAME=$5
TIME_MEM=$6
LOG=$7
RPRI=$8
ACT=$9


if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys url add "$NAME" "$INIPS" "$URLS" "$LOG" "$RPRI" "$ACT" 
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys url add \"$NAME\" \"$INIPS\" \"$URLS\" \"$LOG\" \"$RPRI\" \"$ACT\"" "wys url del \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0