#!/bin/sh

UNIFI_MGMT_FILE_MONITOR="/etc/persistent/cfg/mgmt"
UNIFI_PEER_MON_AIMING_HANDLE="/var/run/mode.aiming"
VPP_INTERFACES_CFG="/var/run/interface.cfg"
PLUGIN_LEDBAR_COLOR="/var/run/ledbar.default.color"
LEDBAR_COLOR_CONTROL="/proc/ubnt_ledbar/color"

CYCLE_SLEEP=1
WAIT_FOR_MCAD_STATE_SEC=11


do_mcad=0

while :; do
	sleep ${CYCLE_SLEEP}

	if [ -f ${UNIFI_MGMT_FILE_MONITOR} ]; then
		state=`grep is_default ${UNIFI_MGMT_FILE_MONITOR} | awk -F '=' '{print $2}'`

		if [ ${state} == "false" ]; then
			if [ $do_mcad -eq 1 ]; then
				continue
			fi

			logger "unifi-monitor: triggering..."
			do_mcad=1
		else
			do_mcad=0
		fi
	else
		do_mcad=0
	fi

	if [ $do_mcad -eq 1 ]; then
		mcad=0
		sleep ${WAIT_FOR_MCAD_STATE_SEC}

		if [ -f ${UNIFI_PEER_MON_AIMING_HANDLE} ]; then
			logger "unifi-monitor: apply config and restart peer-monitor"
			rm -f ${UNIFI_PEER_MON_AIMING_HANDLE}
			pkill -SIGUSR1 peer-monitor
		fi

		cfg_color=`cat ${PLUGIN_LEDBAR_COLOR}`
		ctrl_color=`cat ${LEDBAR_COLOR_CONTROL} | awk '{print $1}'`

		logger "unifi-monitor: ledbar configuration setting: "${cfg_color}
		logger "unifi-monitor: ledbar controller setting: "${ctrl_color}

		if [ "${cfg_color}" != "${ctrl_color}" ]; then
			logger "unifi-monitor: Reloading system state"
			/usr/bin/syswrapper.sh reload
		fi

		ubntnf_lines=`cat ${VPP_INTERFACES_CFG} | grep "ubntnf allow" | wc -l`

		# configuration is broken, it's better to reboot
		if [ ${ubntnf_lines} -gt 0 ]; then
			# for remote logging
			logger "unifi-monitor: Config is inconsistent, restarting system..."
			sleep ${CYCLE_SLEEP}

			/sbin/reboot
		fi
	fi

done
