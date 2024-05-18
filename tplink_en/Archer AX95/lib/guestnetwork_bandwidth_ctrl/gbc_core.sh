# Copyright (C) 2009-2010 OpenWrt.org

include /lib/network

. /lib/guestnetwork_bandwidth_ctrl/gbc_config.sh
. /lib/guestnetwork_bandwidth_ctrl/gbc_ratelimit.sh

support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d" -q)
support_fourband=$(uci get profile.@wireless[0].support_fourband -c "/etc/profile.d" -q)
support_6g=$(uci get profile.@wireless[0].support_6g -c "/etc/profile.d" -q)

fw_config_append guestnetwork_bandwidth_ctrl
gbc_config_get_global global

qos_restart()
{
	gbc_debug "qos_restart start"
	# qos_restart
	/etc/init.d/qos restart
	gbc_debug "qos_restart end"
}

gbc_tc_add_rate_rule() {
	gbc_debug "gbc_tc_add_rate_rule start"
	if [ "${global_enable_2g}" == "on" -o "${global_enable_5g1}" == "on" -o "${global_enable_5g2}" == "on" -o "${global_enable_6g}" == "on" ]; then
		gbc_tc_add_parent_rule

		gbc_tc_add_up_rule
		gbc_tc_add_down_rule
	fi
	gbc_debug "gbc_tc_add_rate_rule end"
}

gbc_tc_del_rate_rule() {
	gbc_debug "gbc_tc_del_rate_rule start"s
	gbc_tc_del_down_rule
	gbc_tc_del_up_rule

	gbc_tc_del_parent_rule
	gbc_debug "gbc_tc_del_rate_rule end"
}

gbc_add_set_mark_module() {
	local guest_ifname_2g=$(uci get profile.@wireless[0].wireless_guest_ifname_2g -c "/etc/profile.d" -q)
	local guest_ifname_5g=$(uci get profile.@wireless[0].wireless_guest_ifname_5g -c "/etc/profile.d" -q)
	local guest_ifname_5g2=$(uci get profile.@wireless[0].wireless_guest_ifname_5g_2 -c "/etc/profile.d" -q)
	local guest_ifname_6g=$(uci get profile.@wireless[0].wireless_guest_ifname_6g -c "/etc/profile.d" -q)

	if [ -z "${guest_ifname_2g}" ]; then
		guest_ifname_2g="wl0.3"
	fi
	if [ -z "${guest_ifname_5g}" ]; then
		guest_ifname_5g="wl1.3"
	fi
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ -z "${guest_ifname_5g2}" ]; then
			guest_ifname_5g2="wl0.3"
		fi
	fi
	if [ "${support_6g}" == "yes" ]; then
		if [ -z "${guest_ifname_6g}" ]; then
			guest_ifname_6g="wl0.3"
		fi
	fi
	if [[ -f /lib/modules/iplatform/kguest_bandwidth.ko ]]; then
		insmod /lib/modules/iplatform/kguest_bandwidth.ko
		if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" ]; then
			echo "${guest_ifname_2g} ${guest_ifname_5g} ${guest_ifname_5g2}" > /proc/guest_bandwidth_ctrl/guest_ifname_list
		elif [ "${support_triband}" == "yes" -a "${support_6g}" == "yes" ]; then
			echo "${guest_ifname_2g} ${guest_ifname_5g} ${guest_ifname_6g}" > /proc/guest_bandwidth_ctrl/guest_ifname_list
		elif [ "${support_fourband}" == "yes" ]; then
			echo "${guest_ifname_2g} ${guest_ifname_5g} ${guest_ifname_5g2} ${guest_ifname_6g}" > /proc/guest_bandwidth_ctrl/guest_ifname_list
		else
			echo "${guest_ifname_2g} ${guest_ifname_5g}" > /proc/guest_bandwidth_ctrl/guest_ifname_list
		fi
	fi
}

gbc_del_set_mark_module() {
	grep kguest_bandwidth /proc/modules && rmmod kguest_bandwidth
}

# check firewall
fw_is_loaded() {
	local bool=$(uci_get_state firewall.core.loaded)
	return $((! ${bool:-0}))
}

gbc_start() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}

	# add set mark module
	gbc_add_set_mark_module

	if [ "${global_enable_2g}" == "on" -o "${global_enable_5g1}" == "on" -o "${global_enable_5g2}" == "on" -o "${global_enable_6g}" == "on" ]; then
		# add iptables rules
		gbc_fw_add_rule
		# add tc rules
		gbc_tc_add_rate_rule
	fi
}

gbc_stop() {
	# make sure firewall is loaded
	fw_is_loaded || {
		echo "firewall is not loaded" >&2
		exit 1
	}
	
	# del set mark module
	gbc_del_set_mark_module
	# del iptables rules
	gbc_fw_del_rule
	# del tc rules
	gbc_tc_del_rate_rule
}

gbc_restart() {
	gbc_stop
	conntrack -U --mark 0x0/0xfff0
	gbc_start
}

