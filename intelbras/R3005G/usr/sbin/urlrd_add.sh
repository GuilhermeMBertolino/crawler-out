#!/bin/sh

#############################################################################
#usage:
#	urlrd_add.sh str
# name/en/host_flag/host/url_flag/url/parm_flag/parm/urlrd/rd_en/ips/log/time
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/urlrd_tid.cfg

NAME=$1
EN=$2
HOST_FLAG=$3
HOST=$4
URL_FLAG=$5
URL=$6
PARM_FLAG=$7
PARM=$8
URLRD=$9
LD_EN=$10
IPS=$11
LOG=$12
TIME_NAME=$13
TIME_MEM=$14


if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT
	 wys urlrd add "$NAME" "$HOST_FLAG" "$HOST" "$URL_FLAG" "$URL" "$PARM_FLAG" "$PARM" "$URLRD" "$LD_EN" "$IPS" "$LOG"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys urlrd add \"$NAME\" \"$HOST_FLAG\" \"$HOST\" \"$URL_FLAG\" \"$URL\" \"$PARM_FLAG\" \"$PARM\" \"$URLRD\" \"$LD_EN\" \"$IPS\" \"$LOG\"" "wys urlrd del \"$NAME\""
	  TIMERID=$?
  	  	
fi	
echo "$NAME=$TIMERID" >>$CFGFILE
fi


exit 0
