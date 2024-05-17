#!/bin/sh
. /usr/bin/unifi_util_funcs.sh

SYSID=$(get_config_value /proc/ubnthal/system.info systemid)

# If there are no unique fan profiles available, just use the default
if [ ! -f /usr/share/fanctrl/ubnt-fanctrl-${SYSID}.conf ]; then
	SYSID="default"
fi

exec /usr/sbin/ubnt-fanctrl -c /usr/share/fanctrl/ubnt-fanctrl-${SYSID}.conf
