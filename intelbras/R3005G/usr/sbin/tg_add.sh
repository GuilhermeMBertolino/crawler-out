#!/bin/sh

#############################################################################
#usage:
#	tg_add.sh str
# eval("tg_add.sh",name,en,log,times,ip_type,tdata,url_type,udata,time,time_mem);
#wys msg add name ip_type type_data url_type url times log
#############################################################################


CFGFILE=/root/tg_tid.cfg

NAME=$1
EN=$2
LOG=$3
TIMES=$4
IP_TYPE=$5
TDATA=$6
URL_TYPE=$7
UDATA=$8
TIME_NAME=$9
TIME_MEM=$10
FDNS=$11
SHOW_TIME=$12

if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys msg add "$NAME" "$IP_TYPE" "$TDATA" "$URL_TYPE" "$UDATA" "$TIMES" "$LOG" "$FDNS" "$SHOW_TIME"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys msg add \"$NAME\" \"$IP_TYPE\" \"$TDATA\" \"$URL_TYPE\" \"$UDATA\" \"$TIMES\" \"$LOG\" \"$FDNS\" \"$SHOW_TIME\"" "wys msg del \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
