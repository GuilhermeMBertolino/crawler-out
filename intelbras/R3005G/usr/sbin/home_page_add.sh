#!/bin/sh

#############################################################################
#usage:
#	home_page_add.sh str
# 
#############################################################################


CFGFILE=/root/home_page_tid.cfg

NAME=home_page
EN=$1
LOG=$2
URL=$3
IPS=$4
TIME_NAME=$5

if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys home_page set "1" "$LOG" "$URL" "$IPS"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys home_page set \"1\" \"$LOG\" \"$URL\" \"$IPS\"" "wys home_page set \"0\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
else
	wys home_page set "0"
fi

exit 0
