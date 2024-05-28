#!/bin/sh /etc/rc.common
# Copyright (c) 2016 Shenzhen TP-LINK Technologies Co.Ltd.
# Author  : Sharon Lin <sharon.lin@tp-link.com>
# Date    : 3 Mar 2016
. /lib/functions.sh
. /lib/config/uci.sh

DIEHARD_MONITOR_PID="/var/run/diehard_monitor.pid"

diehard_monitor_start()
{
    /sbin/diehard_monitor $1 &
}

diehard_monitor_stop()
{
    [ -e ${DIEHARD_MONITOR_PID} ] && {
        local pid=$(cat ${DIEHARD_MONITOR_PID})
        [ -n "$pid" ] && kill -9 $pid
        rm -f ${DIEHARD_MONITOR_PID}
    }
}

diehard_start() {
	local mode=$(uci_get sysmode sysmode mode)
	[ -n "$mode" ] || return 0
	diehard_monitor_start $mode
	return 1
}

diehard_stop() {
	local mode=$(uci_get sysmode sysmode mode)
	[ -n "$mode" ] || return 0
	diehard_monitor_stop
}

