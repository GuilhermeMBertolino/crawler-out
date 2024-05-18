# Copyright (C) 2009-2010 OpenWrt.org

FT_LIBDIR=${FT_LIBDIR:-/lib/family_time}

include /lib/network
# check firewall
fw_is_loaded() {
	local bool=$(uci_get_state firewall.core.loaded)
	return $((! ${bool:-0}))
}

fw_init() {
	[ -z "$FT_INITIALIZED" ] || return 0

	. $FT_LIBDIR/config.sh

	# export the family_time config
	fw_config_append client_mgmt
	fw_config_append parental_control_v2

	for file in $FT_LIBDIR/core_*.sh; do
		. $file
	done

	FT_INITIALIZED=1
	return 0
}

fw_start() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# init
	fw_init

	# ready to load rules from uci config
	echo "loading family_time"
	fw_load_family_time
	syslog $LOG_INF_SERVICE_START
}

fw_stop() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# init
	fw_init

	# ready to exit rules from uci config
	echo "exiting family_time"
	fw_exit_family_time
	syslog $LOG_INF_SERVICE_STOP
}

fw_restart() {
	fw_stop
	fw_start
}

fw_reload() {
	fw_restart
}

fw_check() {
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# init
	fw_init

	fw_check_familytime
}