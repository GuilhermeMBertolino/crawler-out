#!/bin/sh

#############################################################################
#usage: eval("mr_add.sh",argv[name_id],argv[en_id],argv[ips_id],argv[time_id],argv[log_id],argv[rpri_id]
#						,argv[wans_id],argv[thd_type_id],argv[thd_id],argv[shibie_id],argv[ipport_id]);
#wys rule mroute add name ip_duan log prio wans thd_type thd shibie_id ipport
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
IPS=$3
TIME=$4
LOG=$5
RPRI=$6
WANS=$7
THD_TYPE=$8
THD=$9
SHIBIE=$10
IPPORT=$11
NO_CHANGE=$12
RULE_IPS=$13

CFGFILE=/root/mr_tid.cfg

if [ "$EN" = "1" ]; then

if [ "$TIME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys rule mroute add "$NAME" "$IPS" "$LOG" "$RPRI" "$WANS" "$THD_TYPE" "$THD" "$SHIBIE" "$IPPORT" "$NO_CHANGE" "$RULE_IPS"
else
	  TWDAY=`echo "$TIME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys rule mroute add \"$NAME\" \"$IPS\" \"$LOG\" \"$RPRI\" \"$WANS\" \"$THD_TYPE\" \"$THD\" \"$SHIBIE\" \"$IPPORT\" \"$NO_CHANGE\" \"$RULE_IPS\"" "wys rule mroute del \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
