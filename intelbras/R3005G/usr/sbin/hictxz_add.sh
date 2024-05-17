#!/bin/sh

#############################################################################
#usage:
#	hictxz_add.sh 
# args[name_id],args[en_id],args[userid_id],args[proto_id],args[num_id],args[time_id]
# wys ctrule add type[ct ddos] name hi_type prot[all,tcp,udp] max tm
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
USER_ID=$3
PROTO_ID=$4
NUM=$5
TIME=$6

CFGFILE=/root/hictxz_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys ctrule add ct "$NAME" "$USER_ID" "$PROTO_ID" "$NUM"
else
	  TWDAY=`echo "$TIME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys ctrule add ct \"$NAME\" \"$USER_ID\" \"$PROTO_ID\" \"$NUM\"" "wys ctrule del ct \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0