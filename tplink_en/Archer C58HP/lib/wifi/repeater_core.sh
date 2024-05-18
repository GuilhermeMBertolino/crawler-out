#!/bin/sh /etc/rc.common
# Copyright (c) 2017 Shenzhen TP-LINK Technologies Co.Ltd.
# Author  : HQL <huangqinglou@tp-link.com.cn>
# Date    : 2017/11/06

. /lib/functions.sh
. /lib/config/uci.sh

REPEATER_MONITOR_PID="/var/run/repeater_monitor.pid"

init_range_extender_config() {
	echo 0 >/proc/range_extender_config/range_extender_link_state
	echo 2 >/proc/range_extender_config/range_extender_psr_alias_rule
	echo 0 >/proc/range_extender_config/range_extender_eth_to_2g_enable
	echo "ath0:ath1:eth1:br-lan:ath02:ath12:eth0" > /proc/range_extender_config/range_extender_br_dev_name
	echo 1 >/proc/range_extender_config/range_extender_bridge_deliver_enable
}

reset_range_extender_config() {
	echo 0 >/proc/range_extender_config/range_extender_bridge_deliver_enable
	echo 0 >/proc/range_extender_config/range_extender_link_state
}

repeater_monitor_start() {
	local sysmode=$(uci_get sysmode sysmode mode)
	echo "-->repeater-monitor:debug current work mode is $sysmode" > /dev/console
	[ -e "${REPEATER_MONITOR_PID}" ] && return 0
	
	local check_int
	check_int=$(uci_get wireless repeater interval)
	[ -z "$check_int" ] && check_int=3
	
	init_range_extender_config
	if [ "$sysmode" == "re" ]; then
		/sbin/repeater_monitor $check_int &
	fi
	return 0
}

repeater_monitor_stop() {
	[ -e ${REPEATER_MONITOR_PID} ] && {
		reset_range_extender_config
        local pid=$(cat ${REPEATER_MONITOR_PID})
        [ -n "$pid" ] && kill -9 $pid
        rm -f ${REPEATER_MONITOR_PID}
    }
}

