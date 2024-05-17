#!/bin/sh

#############################################################################
#usage:
#	eval("acc_add.sh",argv[name_id],argv[en_id],argv[ips_id],argv[time_id],argv[log_id]
#						,argv[rpri_id],argv[act_id],argv[thd_type_id],argv[thd_id],argv[ipport_id]);
# wys rule acc add NAME RPRI IPS ACT LOG THD_TYPE THD IPPORT
#############################################################################

ECHO=/bin/echo

NAME=$1
EN=$2
IPS=$3
TIME=$4
LOG=$5
RPRI=$6
ACT=$7
THD_TYPE=$8
THD=$9
IPPORT=${10}
SYSTYPE=${11}

if [ "$SYSTYPE" = "" ]; then
	SYSTYPE=0
fi

CFGFILE=/root/acc_tid.cfg


if [ "$EN" = "1" ]; then
if [ "$TIME" = "OFF" ]; then
	 TIMERID=NOT	
	 wys rule acc add "$NAME" "$RPRI" "$IPS" "$ACT" "$LOG" "$THD_TYPE" "$THD" "$IPPORT" "$SYSTYPE"
else
	  TWDAY=`echo "$TIME" | cut -f1 -d';'`
	  TMIN=`echo "$TIME" | cut -f2 -d';'`
	  timer_add.sh "$TWDAY" "$TMIN" "wys rule acc add \"$NAME\" \"$RPRI\" \"$IPS\" \"$ACT\" \"$LOG\" \"$THD_TYPE\" \"$THD\" \"$IPPORT\" \"$SYSTYPE\"" "wys rule acc del \"$NAME\""
	  TIMERID=$?
fi	

echo "$NAME=$TIMERID" >>$CFGFILE
fi

exit 0
