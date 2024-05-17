#!/bin/sh
#FAPI Recovery Daemon - temporary solution 

[ ! "$LIB_COMMON_SOURCED" ] && . /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh

[ ! "$RADIO_CONF_SOURCED" ] && local_db_source RADIO

###############
# Daemon init #
###############

echo "FAPI Recovery Daemon started" > /dev/console 

###############
# Daemon loop #
###############
while true
do
	sleep 30

	card0_dumps_exist=""
	card1_dumps_exist=""
	card0_dumps_exist=`head -1 /proc/net/mtlk/card0/FW/fw_dump  2>/dev/null | grep INTL`
	card1_dumps_exist=`head -1 /proc/net/mtlk/card1/FW/fw_dump  2>/dev/null | grep INTL`

	[ "$(pgrep -x dump_handler)" != "" ] && sleep 20

	fw_dumps_ts=`date '+%m_%d_%Y_%H_%M_%S'`
	[ -n "$card0_dumps_exist" ] || [ -n "$card1_dumps_exist" ] && echo "####### FAPI Recovery Daemon detected dumps...dumping fw_dump_$fw_dumps_ts #######" >/dev/console

	[ -n "$card0_dumps_exist" ] && dump_handler -i 0 -f /opt/lantiq/wave/ -d /proc/net/mtlk/card0/FW/fw_dump &
	[ -n "$card1_dumps_exist" ] && dump_handler -i 1 -f /opt/lantiq/wave/ -d /proc/net/mtlk/card1/FW/fw_dump &

	num_of_dumps=`db2fapi_convert regular WaveRecoveryNumOfDumps 0`

	dump_exist=`find ${WAVE_DIR}/fw_dump* 2>/dev/null`

	if [ "$dump_exist" != "" ] && [ $(ls -1 ${WAVE_DIR}/fw_dump* | wc -l) -gt $num_of_dumps ]; then
		cd  ${WAVE_DIR}/
		rm "$(ls -t fw_dump* | tail -1)"
		cd -
	fi

done

echo "FAPI Recovery Daemon started:exiting" > /dev/console
