#!/bin/sh

#############################################################################
#usage:
#	urlfilter_add.sh str
# name/en(0|1)/inips/urls/time/time_mem/log/pri/act
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlfilter_tid.cfg

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
	 wys urlfilter add "$NAME" "$INIPS" "$URLS" "$LOG" "$RPRI" "$ACT" 
else
	  TWDAY=`echo "$TIME_MEM" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_MEM" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys urlfilter add \"$NAME\" \"$INIPS\" \"$URLS\" \"$LOG\" \"$RPRI\" \"$ACT\"" "wys urlfilter del \"$NAME\""
	  TIMERID=$?
	  TIMEFILE=/root/time_group/time_${TIME_NAME}.cfg
	  echo "urlfilter_$NAME=$TIMERID" >>$TIMEFILE
fi	

echo "$NAME=$TIMERID;$TIME_NAME" >>$CFGFILE
fi

exit 0
