#!/bin/sh

#
# Zuul - CPU affinity keeper
#  Please, don't cross the streams
#

ZUUL_WAKEUP_TIMEOUT_SEC=5
TARGET_CPU_CORE_BIN=2

PROCESS_TO_KEEP="chrony gpsd e2e_minion mcad peer-monitor e2e_controller"
INTERRUPT_TO_KEEP="42"

INTERRUPTS_LIST="/proc/interrupts"
INTERRUPT_GROUP_TYPE="gpio-cascade"

while true
do
	for PROC in ${PROCESS_TO_KEEP}; do
		PROC_NUM=`pgrep ${PROC}`
        [ $? -ne 0 ] && continue
		CURR_PROC_AFFINITY=`taskset -p ${PROC_NUM} | awk '{print $6}'`

		if [ "$CURR_PROC_AFFINITY" -ne "$TARGET_CPU_CORE_BIN" ]; then
			echo "Setting "${PROC}":"${PROC_NUM}" CPU core affinity = "${TARGET_CPU_CORE_BIN}
			taskset -p ${TARGET_CPU_CORE_BIN} ${PROC_NUM} 2>&1 > /dev/null
			chronyc makestep
		fi
	done

	for IRQ in ${INTERRUPT_TO_KEEP}; do
		IRQ_STR=`cat ${INTERRUPTS_LIST} | grep ${INTERRUPT_GROUP_TYPE} | grep ${INTERRUPT_TO_KEEP}`

		CPU_0_IRQ_N=`echo ${IRQ_STR} | awk '{print $2}'`
		CPU_1_IRQ_N=`echo ${IRQ_STR} | awk '{print $3}'`
		CPU_2_IRQ_N=`echo ${IRQ_STR} | awk '{print $4}'`
		CPU_3_IRQ_N=`echo ${IRQ_STR} | awk '{print $5}'`

		if [ "$CPU_1_IRQ_N" -lt "$CPU_0_IRQ_N" ] || [ "$CPU_1_IRQ_N" -lt "$CPU_2_IRQ_N" ] || [ "$CPU_1_IRQ_N" -lt "$CPU_3_IRQ_N" ]; then
			echo ${TARGET_CPU_CORE_BIN} > /proc/irq/${INTERRUPT_TO_KEEP}/smp_affinity
		fi
	done

	sleep ${ZUUL_WAKEUP_TIMEOUT_SEC}
done
