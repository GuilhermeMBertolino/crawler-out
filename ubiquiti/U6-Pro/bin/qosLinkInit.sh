#!/bin/sh
# THIS FILE IS DEPRECATED

MODE=$1
DEV_NAME=$2
DEV_RATE=$3
DEV_TYPE=$4
DEV_OPT=$5

# for backward compatible
if [ -z "$DEV_RATE" ]; then
	DEV_RATE=$DEV_NAME
	DEV_NAME=$MODE
	MODE=0
fi

if [ -z "$DEV_NAME" ] || [ -z "$DEV_RATE" ]; then
	echo "$0 [<mode>] <interface name> <interface rate in mbit>"
	exit 1
fi

DEV_MTU=`ifconfig $DEV_NAME|grep MTU|cut -d: -f2|cut -d' ' -f1`

case $MODE in
0)
	FWMARK_CRIT=3
	#FWMARK_CRIT_TC=`expr ${FWMARK_CRIT} + 1`
	#FWMARK_HIGH=2
	#FWMARK_HIGH_TC=`expr ${FWMARK_HIGH} + 1`
	#FWMARK_NORM=1
	#FWMARK_NORM_TC=`expr ${FWMARK_NORM} + 1`
	#FWMARK_LOW=0
	#FWMARK_LOW_TC=`expr ${FWMARK_LOW} + 1`

	#default rules
	tc qdisc add dev ${DEV_NAME} root handle 1: prio bands 2 priomap 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
	tc qdisc add dev ${DEV_NAME} parent 1:1 handle 11: pfifo
	tc qdisc add dev ${DEV_NAME} parent 1:2 handle 12: htb r2q 3 default 120
	tc class add dev ${DEV_NAME} parent 12: classid 12:0 htb rate ${DEV_RATE}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}

	tc filter add dev ${DEV_NAME} parent 1: prio 1 protocol ip handle ${FWMARK_CRIT} fw flowid 1:1
	tc filter add dev ${DEV_NAME} parent 1: prio 9 protocol ip u32 match ip src 0.0.0.0/0 flowid 1:2

	tc class add dev ${DEV_NAME} parent 12:0 classid 12:120 htb rate 1500bit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} prio 7 ${DEV_OPT}
	tc qdisc add dev ${DEV_NAME} parent 12:120 handle 120: fq_codel
	;;
*)
	echo "$0: unknown mode specifed"
	exit ;
	;;
esac


