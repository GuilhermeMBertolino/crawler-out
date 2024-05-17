#!/bin/sh
# THIS FILE IS DEPRECATED

DEV_NAME=$1
DEV_RATE=$2
DEV_GMARK=$3
DEV_GRATE=$4
DEV_OPT=$5

if [ -z "$DEV_NAME" ] || [ -z "$DEV_RATE" ] || [ -z "$DEV_GMARK" ] || [ -z "$DEV_GRATE" ] ; then
	echo "Insufficient parameters used!!"
	echo "    $0 <interface name> <interface rate in mbit> <group id> <rate allocated in % >"
	exit 1
elif [ -z "`tc qdisc show dev $DEV_NAME|grep htb`" ]; then
	echo "Interface $DEV_NAME had not initialized yet!!"
	exit 1
fi

DEV_MTU=`ifconfig $DEV_NAME|grep MTU|cut -d: -f2|cut -d' ' -f1`

FWMARK_CRIT=3
#FWMARK_CRIT_TC=`expr ${FWMARK_CRIT} + 1`
FWMARK_HIGH=2
FWMARK_HIGH_TC=`expr ${FWMARK_HIGH} + 1`
FWMARK_NORM=1
FWMARK_NORM_TC=`expr ${FWMARK_NORM} + 1`
FWMARK_LOW=0
FWMARK_LOW_TC=`expr ${FWMARK_LOW} + 1`

#group rules
DEV_GRATE_TOTAL=`expr ${DEV_GRATE} \* ${DEV_RATE} / 100`
DEV_GRATE_HIGH=`expr 50 \* ${DEV_GRATE_TOTAL} / 100`
DEV_GRATE_NORM=`expr 30 \* ${DEV_GRATE_TOTAL} / 100`
DEV_GRATE_LOW=`expr 20 \* ${DEV_GRATE_TOTAL} / 100`
########################################
# Priority between different GROUPS only
#tc class add dev ${DEV_NAME} parent 12:0 classid 12:12${DEV_GMARK} htb rate ${DEV_GRATE_TOTAL}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}
#tc qdisc add dev ${DEV_NAME} parent 12:12${DEV_GMARK} handle 12${DEV_GMARK}: sfq perturb 10
#tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_HIGH} fw flowid 12:12${DEV_GMARK}
#tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_NORM} fw flowid 12:12${DEV_GMARK}
#tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_LOW} fw flowid 12:12${DEV_GMARK}
########################################
########################################
# Priority between different GROUPS
#   AND
# Allow priority within GROUP
########################################
tc class add dev ${DEV_NAME} parent 12:0 classid 12:12${DEV_GMARK} htb rate ${DEV_GRATE_TOTAL}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} prio ${DEV_GMARK} ${DEV_OPT}
tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_HIGH} fw flowid 12:12${DEV_GMARK}
tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_NORM} fw flowid 12:12${DEV_GMARK}
tc filter add dev ${DEV_NAME} parent 12: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_LOW} fw flowid 12:12${DEV_GMARK}

tc qdisc add dev ${DEV_NAME} parent 12:12${DEV_GMARK} handle 12${DEV_GMARK}: htb r2q 3 default ${FWMARK_LOW_TC}
tc class add dev ${DEV_NAME} parent 12${DEV_GMARK}: classid 12${DEV_GMARK}:0 htb rate ${DEV_GRATE_TOTAL}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}
tc class add dev ${DEV_NAME} parent 12${DEV_GMARK}:0 classid 12${DEV_GMARK}:${FWMARK_HIGH_TC} htb rate ${DEV_GRATE_HIGH}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}
tc class add dev ${DEV_NAME} parent 12${DEV_GMARK}:0 classid 12${DEV_GMARK}:${FWMARK_NORM_TC} htb rate ${DEV_GRATE_NORM}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}
tc class add dev ${DEV_NAME} parent 12${DEV_GMARK}:0 classid 12${DEV_GMARK}:${FWMARK_LOW_TC} htb rate ${DEV_GRATE_LOW}mbit ceil ${DEV_RATE}mbit quantum ${DEV_MTU} ${DEV_OPT}
tc qdisc add dev ${DEV_NAME} parent 12${DEV_GMARK}:${FWMARK_HIGH_TC} handle 12${DEV_GMARK}${FWMARK_HIGH_TC}: fq_codel
tc qdisc add dev ${DEV_NAME} parent 12${DEV_GMARK}:${FWMARK_NORM_TC} handle 12${DEV_GMARK}${FWMARK_NORM_TC}: fq_codel
tc qdisc add dev ${DEV_NAME} parent 12${DEV_GMARK}:${FWMARK_LOW_TC} handle 12${DEV_GMARK}${FWMARK_LOW_TC}: fq_codel

tc filter add dev ${DEV_NAME} parent 12${DEV_GMARK}: prio 1 protocol ip handle ${DEV_GMARK}${FWMARK_HIGH} fw flowid 12${DEV_GMARK}:${FWMARK_HIGH_TC}
tc filter add dev ${DEV_NAME} parent 12${DEV_GMARK}: prio 2 protocol ip handle ${DEV_GMARK}${FWMARK_NORM} fw flowid 12${DEV_GMARK}:${FWMARK_NORM_TC}
tc filter add dev ${DEV_NAME} parent 12${DEV_GMARK}: prio 3 protocol ip handle ${DEV_GMARK}${FWMARK_LOW}  fw flowid 12${DEV_GMARK}:${FWMARK_LOW_TC}

