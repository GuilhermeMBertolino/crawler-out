#!/bin/sh

EXEC=/usr/sbin/mqtt_ai
UP_EXEC=/tmp/mqtt_ai_new

while [ 1 ]
do
	if [ -e ${UP_EXEC} ] ;
	then
		COUNT=0
		chmod 777 ${UP_EXEC}
		nvram set mqtt_ai_upgrade_ok=0
		while [ 1 ]
		do
			killall -9 ${UP_EXEC}
			${UP_EXEC}
			sleep 1
			RET=`nvram get mqtt_ai_upgrade_ok`
			if [ $RET -eq 0 ]
			then
				COUNT=`expr ${COUNT} + 1`
			fi

			if [ $COUNT -ge 3 ]
			then
				nvram set mqtt_ai_upgrade_failed=1
				break
			fi
		done
	fi

	killall -9 ${EXEC}
	${EXEC}
	sleep 2
done
