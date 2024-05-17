#!/bin/sh

#############################################################################
#usage:
#	wan_auto_conn_add.sh iface time mode
# 
#############################################################################

ECHO=/bin/echo
CFGFILE=/root/wan_auto_conn_tid.cfg

IFACE=$1
NAME=iface_$1
TIME=$2
MODE=$3

TWDAY=`echo "$TIME" | cut -f1 -d';'`
TMIN=`echo "$TIME" | cut -f2 -d';'`

if [ "$MODE" = "4" ]; then
	timer_add.sh "$TWDAY" "$TMIN" "wan_conn stop $IFACE" "wan_conn restart $IFACE"
elif [ "$MODE" = "6" ]; then
	timer_add.sh "$TWDAY" "$TMIN" "wan_conn restart $IFACE" "wan_conn stop $IFACE"
else
	timer_add.sh "$TWDAY" "$TMIN" "wan_conn restart $IFACE" "echo"
fi

TIMERID=$?
echo "$NAME=$TIMERID" >>$CFGFILE

exit 0
