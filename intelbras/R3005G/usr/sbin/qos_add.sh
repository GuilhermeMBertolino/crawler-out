#!/bin/sh

#############################################################################
#usage:
#	qos_add.sh 
# type[xz bz pri] name en run_prio dev_prio hi_prio is_and gongx  thd_type up down ip_duan dev_duan thd_duan shibie_duan ipport_duan time flow
#############################################################################

ECHO=/bin/echo
RULE_NAME=$1
NAME=$2
EN=$3
RUN_PRIO=$4
DEV_PRIO=$5
HI_PRIO=$6
IS_AND=$7
GONGX=$8
THD_TYPE=$9
UP=$10
DOWN=$11
IP_DUAN=$12
DEV_DUAN=$13
THD_DUAN=$14
SHIBIE_DUAN=$15
IPPORT_DUAN=$16
TIME_NAME=$17
FLOW_VAL=$18

CFGFILE=/root/qos_${RULE_NAME}_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME_NAME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys qos sprule add "$RULE_NAME"  "$NAME" "$RUN_PRIO" "$DEV_PRIO" "$HI_PRIO" "$IS_AND" "$GONGX" "$THD_TYPE" "$UP" "$DOWN" "$IP_DUAN" "$DEV_DUAN" "$THD_DUAN" "$SHIBIE_DUAN" "$IPPORT_DUAN" "$FLOW_VAL"
else
	  TWDAY=`echo "$TIME_NAME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME_NAME" | cut -f2 -d';'`
	  ADD_ARGV="\"$RULE_NAME\" \"$NAME\" \"$RUN_PRIO\" \"$DEV_PRIO\" \"$HI_PRIO\" \"$IS_AND\" \"$GONGX\" \"$THD_TYPE\" \"$UP\" \"$DOWN\" \"$IP_DUAN\" \"$DEV_DUAN\" \"$THD_DUAN\" \"$SHIBIE_DUAN\" \"$IPPORT_DUAN\" \"$FLOW_VAL\""
	  timer_add.sh $TWDAY $TMIN "wys qos sprule add $ADD_ARGV" "wys qos sprule del \"$RULE_NAME\"  \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
