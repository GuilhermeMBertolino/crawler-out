#!/bin/sh

#############################################################################
#usage:
#############################################################################

ECHO=/bin/echo
IFACE=$1
NAME=$2
ENABLE=$3
UP=$4
DOWN=$5
TIME_MEM=$6
UP_DEF=$7
DOWN_DEF=$8


CFGFILE=/root/qos_time.cfg

if [ $ENABLE = 1 ];then
	  TWDAY=`echo "$TIME_MEM" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_MEM" | cut -f2 -d';'`
	  timer_add.sh $TWDAY $TMIN "qos_time $IFACE $UP $DOWN" "qos_time $IFACE $UP_DEF $DOWN_DEF"
	  TIMERID=$?

		echo "$NAME=$TIMERID" >>$CFGFILE
fi
exit 0
