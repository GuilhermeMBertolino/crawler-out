# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh
. /lib/client_speed_limit/csl_config.sh

ifaces="wan"
lanDev="br-lan"
[ -e /proc/ppa/ ] && {
	lanDev="ifb1"
	
	accel_handler_load
}

csl_remove_guest_mark="-m mark ! --mark 0x60/0xfff0 -m mark ! --mark 0x80/0xfff0 -m mark ! --mark 0xa0/0xfff0 -m mark ! --mark 0xc0/0xfff0"

CSL_DEBUG_TEST=1
csl_debug()
{
	[ ${CSL_DEBUG_TEST} -gt 0 ] && {
		echo "[client_speed_limit] $1"
	}
}

is_del_tc_root_client_speed_limit() {
	csl_debug "is_del_tc_root_client_speed_limit start"
	local used_mark=$(uci get client_speed_limit.used_mark.used_mark)
	if [ -z "${used_mark}" -o "${used_mark}" == "${used_mark_default}" ] ; then
		csl_debug "is_del_tc_root_client_speed_limit return 1" 
		return 1
	else
		csl_debug "is_del_tc_root_client_speed_limit return 0" 
		return 0
	fi
	csl_debug "is_del_tc_root_client_speed_limit end"
}

csl_tc_add_down_rule() {
	csl_debug "csl_tc_add_down_rule start"
	if [ -z "$1" -o -z "$2" ]; then
		return 0
	fi
	local up_mark=$1
	local down_mark=`expr ${up_mark} + 16`
	local down_band=$2
	local guarantee_down_band=`expr ${down_band} / 10`
	local downlink=$(uci_get_state client_speed_limit core downlink)
	local down_low=$(uci_get_state client_speed_limit core down_low)

	if [ ${down_band} -eq -1 -o "${down_band}" == "-1" ]; then
		csl_debug "down speed no limit"
		return 0
	fi
	
	if [ ${guarantee_down_band} -gt 1024 ]; then
		guarantee_down_band=1024
	fi
	if [ ${guarantee_down_band} -le 0 ]; then
		guarantee_down_band=1
	fi
	if [ ${down_low} -gt 0 -a ${guarantee_down_band} -gt ${down_low} ]; then
		guarantee_down_band=${down_low}
	fi
	if [ ${downlink} -gt 0 -a ${down_band} -gt ${downlink} ]; then
		down_band=${downlink}
	fi

	guarantee_down_band="${guarantee_down_band}""kbit"
	down_band="${down_band}""kbit"
	
	tc class add dev $lanDev parent 2:3 classid 2:"${down_mark}" htb rate "${guarantee_down_band}" ceil "${down_band}" prio 3
	tc qdisc add dev $lanDev parent 2:"${down_mark}" handle "${down_mark}": sfq perturb 10

	tc filter add dev $lanDev parent 2:0 protocol all prio 3 handle "${down_mark}"/0xfff0 fw classid 2:"${down_mark}"

	csl_debug "csl_tc_add_down_rule end"
}

csl_tc_del_down_rule() {
	csl_debug "csl_tc_del_down_rule start"
	if [ -z "$1" ]; then
		return 0
	fi
	local up_mark=$1
	local down_mark=`expr ${up_mark} + 16`
	
	tc filter del dev $lanDev parent 2:0 protocol all prio 3 handle "${down_mark}"/0xfff0 fw classid 2:"${down_mark}"
	tc class del dev $lanDev parent 2:3 classid 2:"${down_mark}"
	
	csl_debug "csl_tc_del_down_rule end"
}

csl_tc_add_up_rule() {
	csl_debug "csl_tc_add_up_rule start"
	if [ -z "$1" -o -z "$2" ]; then
		return 0
	fi
	local up_mark=$1
	local up_band=$2
	local guarantee_up_band=`expr ${up_band} / 10`
	local uplink=$(uci_get_state client_speed_limit core uplink)
	local up_low=$(uci_get_state client_speed_limit core up_low)
	
	if [ ${up_band} -eq -1 -o "${up_band}" == "-1" ]; then
		csl_debug "up speed no limit"
		return 0
	fi
	
	if [ ${guarantee_up_band} -gt 1024 ]; then
		guarantee_up_band=1024
	fi
	if [ ${guarantee_up_band} -le 0 ]; then
		guarantee_up_band=1
	fi
	if [ ${up_low} -gt 0 -a ${guarantee_up_band} -gt ${up_low} ]; then
		guarantee_up_band=${up_low}
	fi
	if [ ${uplink} -gt 0 -a ${up_band} -gt ${uplink} ]; then
		up_band=${uplink}
	fi

	guarantee_up_band="${guarantee_up_band}""kbit"
	up_band="${up_band}""kbit"

	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		tc class add dev $wan_ifname parent 1:3 classid 1:"${up_mark}" htb rate "${guarantee_up_band}" ceil "${up_band}" prio 3
		tc qdisc add dev $wan_ifname parent 1:"${up_mark}" handle "${up_mark}": sfq perturb 10

		tc filter add dev $wan_ifname parent 1:0 protocol all prio 3 handle "${up_mark}"/0xfff0 fw classid 1:"${up_mark}"
	done
	
	csl_debug "csl_tc_add_up_rule end"
}

csl_tc_del_up_rule() {
	csl_debug "csl_tc_del_up_rule start"
	if [ -z "$1" ]; then
		return 0
	fi
	local up_mark=$1
	
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		tc filter del dev $wan_ifname parent 1:0 protocol all prio 3 handle "${up_mark}"/0xfff0 fw classid 1:"${up_mark}"
		tc class del dev $wan_ifname parent 1:3 classid 1:"${up_mark}"
	done
	csl_debug "csl_tc_del_up_rule end"
}		

csl_tc_add_parent_rule() {
	# get qos settings info
	fw_config_append qos_v2
	csl_config_get_qos qos

	# create /var/state/
	#uci_revert_state "client_speed_limit"
	uci_toggle_state "client_speed_limit" "core" "" "client_speed_limit"

	# add tc root
	. /lib/qos/core_qos.sh
	fw_add_tc_root

	local max_wan_speed=$(get_max_wan_speed)
	
	# add uplink tc
	local up_band
	if [ "${qos_enable}" == "on" ]; then
		if [[ -n "$qos_rUpband" ]]; then
		    up_band=$((qos_rUpband))
		elif [[ "$qos_up_unit" == "mbps" ]]; then
		    up_band=$((qos_up_band*1000))
		fi
	else
		up_band=${max_wan_speed}
	fi
	local uplink=$((${qos_percent}*${up_band}/100))
	local up_low=$((${qos_low}*${uplink}/100))
	if [ ${uplink} -le 0 ]; then
		uplink=1
	fi
	if [ ${up_low} -le 0 ]; then
		up_low=1
	fi

	# set state
	uci_toggle_state "client_speed_limit" "core" "uplink" "${uplink}"
	uci_toggle_state "client_speed_limit" "core" "up_low" "${up_low}"
	
	uplink="${uplink}""kbit"
	up_low="${up_low}""kbit"


	
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		csl_debug "csl_tc_add_parent_rule uplink up_low:${up_low}, uplink:${uplink}"
		tc class add dev $wan_ifname parent 1:1 classid 1:3 htb rate ${up_low} ceil ${uplink} prio 3
	done

	# add downlink tc
	local down_band
	if [ "${qos_enable}" == "on" ]; then
		if [[ -n "$qos_rDownband" ]]; then
		    down_band=$((qos_rDownband))
		elif [[ "$qos_down_unit" == "mbps" ]]; then
		    down_band=$((qos_down_band*1000))
		fi
	else
		down_band=${max_wan_speed}
	fi
	local downlink=$((${qos_percent}*${down_band}/100))
	local down_low=$((${qos_low}*${downlink}/100))
	if [ ${downlink} -le 0 ]; then
		downlink=1
	fi
	if [ ${down_low} -le 0 ]; then
		down_low=1
	fi

	# set state
	uci_toggle_state "client_speed_limit" "core" "downlink" "${downlink}"
	uci_toggle_state "client_speed_limit" "core" "down_low" "${down_low}"
	
	downlink="${downlink}""kbit"
	down_low="${down_low}""kbit"
	
	csl_debug "csl_tc_add_parent_rule downlink down_low:${down_low}, downlink:${downlink}"
	tc class add dev $lanDev parent 2:1 classid 2:3 htb rate ${down_low} ceil ${downlink} prio 3
}

csl_tc_del_parent_rule() {
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		tc class del dev $wan_ifname parent 1:1 classid 1:3
	done
	
	tc class del dev $lanDev parent 2:1 classid 2:3
	
	# del tc root
	. /lib/qos/core_qos.sh
	fw_del_tc_root

	# revert state
	#uci_revert_state "client_speed_limit"
}

csl_fw_add_rule() {
	csl_debug "csl_fw_add_rule start"
	if [ -z "$1" -o -z "$2" ]; then
		return 0
	fi
	local client_mac=$1
	local mac=${client_mac//-/}
	mac=$(echo ${mac} | tr [a-z] [A-Z])

	client_mac=${client_mac//-/:}
	client_mac=$(echo ${client_mac} | tr [a-z] [A-Z])
	csl_debug "client_mac=${client_mac} mac=${mac}"
	
	local up_mark=$2
	local down_mark=`expr ${up_mark} + 16`

	# add lan fw rules,上行流量
	local mac_limit="lan_limit_""${mac}"
	local client_lan_rule="lan_rule_""${mac}"
	
	local mac_rule=$(fw list 4 m | grep "${mac}")
	[ -z "${mac_rule}" ] && {
		# set mark
		fw add 4 m ${client_lan_rule}
		fw add 4 m ${client_lan_rule} "MARK --set-xmark ${up_mark}/0xfff0"
		fw add 4 m ${client_lan_rule} "CONNMARK --set-xmark ${up_mark}/0xfff0"
		fw add 4 m ${client_lan_rule} ACCEPT
		fw add 4 m client_speed_limit_lan_rule ${client_lan_rule} { "-m connmark --mark ${up_mark}/0xfff0" }
		# match mac
		fw add 4 m ${mac_limit}
		fw add 4 m client_speed_limit_lan_rule ${mac_limit}
		fw add 4 m ${mac_limit} ${client_lan_rule} { "-m mac --mac-source ${client_mac} ${csl_remove_guest_mark}" }

		# add wan fw rules,下行流量
		local client_wan_rule="wan_rule_""${mac}"
		fw add 4 m ${client_wan_rule}
		fw add 4 m ${client_wan_rule} "MARK --set-xmark ${down_mark}/0xfff0"
		fw add 4 m ${client_wan_rule} ACCEPT
		fw add 4 m client_speed_limit_wan_rule ${client_wan_rule} { "-m connmark --mark ${up_mark}/0xfff0" }

		# BCM, only for bcm fcache now
		[ -e /proc/fcache/ ] && {
			# set tc flags
			iptables -t mangle -I ${client_lan_rule} -j BLOGTG --set-tcflag 1
			iptables -t mangle -I ${client_wan_rule} -j BLOGTG --set-tcflag 1
			# clear acceleration entry
			fc flush --mac "${client_mac}"
		}
	}
	csl_debug "csl_fw_add_rule end"
}

csl_fw_del_rule() {
	csl_debug "csl_fw_del_rule start"
	if [ -z "$1" -o -z "$2" ]; then
		return 0
	fi

	local client_mac=$1
	local mac=${client_mac//-/}
	mac=$(echo ${mac} | tr [a-z] [A-Z])

	client_mac=${client_mac//-/:}
	client_mac=$(echo ${client_mac} | tr [a-z] [A-Z])
	csl_debug "client_mac=${client_mac} mac=${mac}"
	
	local up_mark=$2
	local down_mark=`expr ${up_mark} + 16`

	local mac_limit="lan_limit_""${mac}"
	local client_lan_rule="lan_rule_""${mac}"
	local client_wan_rule="wan_rule_""${mac}"
	
	local mac_rule=$(fw list 4 m | grep "${mac}")
	[ -n "${mac_rule}" ] && {
		fw flush 4 m ${client_lan_rule}
		fw flush 4 m ${mac_limit}
		fw del 4 m client_speed_limit_lan_rule ${client_lan_rule} { "-m connmark --mark ${up_mark}/0xfff0" }
		fw del 4 m client_speed_limit_lan_rule ${mac_limit}
		fw del 4 m ${client_lan_rule}
		fw del 4 m ${mac_limit}
		
		fw flush 4 m ${client_wan_rule}
		fw del 4 m client_speed_limit_wan_rule ${client_wan_rule} { "-m connmark --mark ${up_mark}/0xfff0" }
		fw del 4 m ${client_wan_rule}
	}
	csl_debug "csl_fw_del_rule end"
}

csl_fw_add_parent_rule() {
	# add lan fw rules,上行流量
	local lan_rule=$(fw list 4 m | grep "client_speed_limit_lan_rule")
	[ -z "${lan_rule}" ] && {
		fw add 4 m client_speed_limit_lan_rule
		fw add 4 m zone_lan_qos client_speed_limit_lan_rule 1
	}
	
	# add wan fw rules,下行流量
	local wan_rule=$(fw list 4 m | grep "client_speed_limit_wan_rule")
	[ -z "${wan_rule}" ] && {
		fw add 4 m client_speed_limit_wan_rule
		fw add 4 m zone_wan_qos client_speed_limit_wan_rule 1
	}
}
csl_fw_del_parent_rule() {
	is_del_tc_root_client_speed_limit
	if [ $? == 1 ] ; then
		fw flush 4 m client_speed_limit_lan_rule
		fw del 4 m zone_lan_qos client_speed_limit_lan_rule 
		fw del 4 m client_speed_limit_lan_rule

		fw flush 4 m client_speed_limit_wan_rule
		fw del 4 m zone_wan_qos client_speed_limit_wan_rule
		fw del 4 m client_speed_limit_wan_rule
	fi
}
