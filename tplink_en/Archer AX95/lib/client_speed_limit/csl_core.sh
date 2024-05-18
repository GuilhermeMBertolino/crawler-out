# Copyright (C) 2009-2010 OpenWrt.org

include /lib/network

. /lib/client_speed_limit/csl_config.sh
. /lib/client_speed_limit/csl_ratelimit.sh

CSL_DEBUG="1"
local used_mark_default="0000000000000000000000000000000000000000000000000000000000000000"

csl_tc_add_rule() {
	csl_debug "csl_tc_add_rule start"
	# $1: markֵ
	local up_band=$2
	local down_band=$3
	csl_tc_add_up_rule $1 ${up_band}
	csl_tc_add_down_rule $1 ${down_band}
	csl_debug "csl_tc_add_rule end"
}

csl_tc_del_rule() {
	# $1: markֵ
	csl_tc_del_up_rule $1
	csl_tc_del_down_rule $1
}

cls_reload_client() {
	csl_config_get_client "$1"
	local mac=${client_mac//-/}
	mac=$(echo ${mac} | tr [a-z] [A-Z])
	
	if [ "${client_need_reload}" == "on" ]; then
		echo "[reload] client_mac=${client_mac} client_enable=${client_enable}" > /dev/console
		if [ -z ${client_mark} ]; then
			client_mark=${client_old_mark}
		fi
		csl_fw_del_rule ${client_mac} ${client_mark}
		csl_tc_del_rule ${client_mark}
		if [ "${client_enable}" == "on" ]; then
			csl_fw_add_rule ${client_mac} ${client_mark}
			csl_tc_add_rule ${client_mark} ${client_up_band} ${client_down_band}
		fi
		uci set client_speed_limit.${mac}.need_reload=""
		uci commit
	fi
}

cls_unload_client() {
	csl_config_get_client "$1"
	echo "[unload] client_mac=${client_mac} client_enable=${client_enable}" > /dev/console
	if [ -z ${client_mark} ]; then
		client_mark=${client_old_mark}
	fi
	csl_fw_del_rule ${client_mac} ${client_mark}
	csl_tc_del_rule ${client_mark}
}

cls_load_client() {
	csl_config_get_client "$1"
	
	if [ "${client_enable}" == "on" ]; then
		echo "[load]client_mac=${client_mac} client_enable=${client_enable}" > /dev/console
		csl_fw_add_rule ${client_mac} ${client_mark}
		csl_tc_add_rule ${client_mark} ${client_up_band} ${client_down_band}
	fi
}

# check firewall
fw_is_loaded() {
	local bool=$(uci_get_state firewall.core.loaded)
	return $((! ${bool:-0}))
}

csl_init() {
	fw_config_append /etc/config/client_speed_limit
}

csl_start() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# init, load config
	csl_init

	is_del_tc_root_client_speed_limit
	if [ $? == 1 ] ; then
		csl_stop
		return 1
	fi

	csl_fw_add_parent_rule
	csl_tc_add_parent_rule
	
	csl_debug "csl_start start"
	config_foreach cls_load_client client
	csl_debug "csl_start start"
}

csl_stop() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# init, load config
	csl_init
	
	config_foreach cls_unload_client client
	csl_tc_del_parent_rule
	csl_fw_del_parent_rule
}

csl_restart() {
	csl_stop
	conntrack -U --mark 0x0/0xfff0
	csl_start
}

csl_reload() {
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	conntrack -U --mark 0x0/0xfff0
	
	# init, load config
	csl_init

	# Only reload the rule for the current device
	echo "reload" > /dev/console
	csl_fw_add_parent_rule
	csl_tc_add_parent_rule
	config_foreach cls_reload_client client
	uci_commit_flash
	csl_tc_del_parent_rule
	csl_fw_del_parent_rule 
	echo "reload finish" > /dev/console
}
