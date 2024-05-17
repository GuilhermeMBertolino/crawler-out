#!/bin/sh

#############################################################################
#usage:
#	macfilteradd.sh en name mac act time
# wys macfilter add name mac act
#############################################################################

ECHO=/bin/echo

EN=$1
NAME=$2
MAC=$3
ACT=$4
TIME=$5

CFGFILE=/root/macfilter_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME" = "OFF" ]; then
	 TIMERID=NOT
	 wys macfilter add $NAME $MAC $ACT
else
	  TWDAY=`echo "$TIME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME" | cut -f2 -d';'`
	  timer_add.sh $TWDAY $TMIN "wys macfilter add \"$NAME\" \"$MAC\" \"$ACT\"" "wys macfilter del \"$NAME\""
	  TIMERID=$?
	  	  	
fi	
else
TIMERID=NOT	
fi

if [ "$TIMERID" != "NOT" ]; then
echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
