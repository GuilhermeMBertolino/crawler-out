#!/bin/sh /etc/rc.common
# Copyright (c) 2016 Shenzhen TP-LINK Technologies Co.Ltd.
# Author  : Sharon Lin <sharon.lin@tp-link.com>
# Date    : 3 Mar 2016

. /lib/functions.sh
. /lib/smartdhcp/smartdhcp_functions.sh
. /lib/config/uci.sh

SMARTDHCP_MONITOR_PID="/var/run/smartdhcp_monitor.pid"

smartdhcp_monitor_start()
{
    /sbin/smartdhcp_monitor $1 $2 &
}

smartdhcp_monitor_stop()
{
    [ -e ${SMARTDHCP_MONITOR_PID} ] && {
        local pid=$(cat ${SMARTDHCP_MONITOR_PID})
        [ -n "$pid" ] && kill -9 $pid
        rm -f ${SMARTDHCP_MONITOR_PID}
    }
    [ -e ${SMARTDHCP_STATUS_FILE} ] && {
        rm -f ${SMARTDHCP_STATUS_FILE}
    }
}

detect_bridge_dhcps() {
	local cfg="$1"
	local action="$2"
	local type
	local ifname
	local check_int
	check_int=$(uci_get dhcp smartdhcp interval)
	[ -z "$check_int" ] && check_int=60
	config_get type "$cfg" type
	if [ "$type" == "bridge" ]; then
		ifname="br-$cfg"
                [ "$action" == "start" ] && smartdhcp_monitor_start $ifname $check_int || deconfig_ipalias $ifname
	fi
	
}

smartdhcp_start() {
	local mode=$(uci_get sysmode sysmode mode)
	local enabled=$(uci_get dhcp smartdhcp mode)
	[ -n "$mode" ] || return 0
	
	if [ "$mode" == "router" ]; then
		smartdhcp_debug_print "Rotuer mode no need smartdhcp"
		[ "$enabled" == "default" -o "$enabled" == "enable" ] && start_lan_dhcps || stop_lan_dhcps
		return 0
	else
		smartdhcp_debug_print "##### smartdhcp start #####"
		config_load network
		config_foreach detect_bridge_dhcps interface start
	fi
	return 1
}

smartdhcp_stop() {
	local mode=$(uci_get sysmode sysmode mode)
	local enabled=$(uci_get dhcp smartdhcp mode)
	[ -n "$mode" ] || return 0
	smartdhcp_debug_print "##### smartdhcp stop #####"
	smartdhcp_monitor_stop
    config_load network
    config_foreach detect_bridge_dhcps interface stop
	if [ "$mode" == "router" ]; then
		stop_lan_dhcps
	fi
}

