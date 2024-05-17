#!/bin/sh

#############################################################################
#usage:
#	hizxddos_add.sh 
# args[name_id],args[en_id],args[userid_id],args[proto_id],args[num_id],args[interval],args[time_id]
# wys ctrule add type[ct ddos] name hi_type prot[all,tcp,udp] max tm
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
USER_ID=$3
PROTO_ID=$4
NUM=$5
INTER=$6
TIME=$7

CFGFILE=/root/hizxddos_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys ctrule add ddos "$NAME" "$USER_ID" "$PROTO_ID" "$NUM" "$INTER"
else
	  TWDAY=`echo "$TIME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys ctrule add ddos \"$NAME\" \"$USER_ID\" \"$PROTO_ID\" \"$NUM\" \"$INTER\"" "wys ctrule del ddos \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0