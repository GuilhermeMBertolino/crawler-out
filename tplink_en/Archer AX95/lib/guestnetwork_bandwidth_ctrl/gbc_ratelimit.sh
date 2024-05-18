# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh
. /lib/guestnetwork_bandwidth_ctrl/gbc_config.sh

support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d" -q)
support_fourband=$(uci get profile.@wireless[0].support_fourband -c "/etc/profile.d" -q)
support_6g=$(uci get profile.@wireless[0].support_6g -c "/etc/profile.d" -q)

fw_config_append guestnetwork_bandwidth_ctrl
fw_config_append qos_v2
gbc_config_get_global global
gbc_config_get_qos qos

ifaces="wan"
lanDev="br-lan"
[ -e /proc/ppa/ ] && {
	lanDev="ifb1"
	accel_handler_load
}

GBC_DEBUG_TEST=1
gbc_debug()
{
	[ ${GBC_DEBUG_TEST} -gt 0 ] && {
		echo "[guest_bandwidth] $1"
	}
}

is_del_tc_root_guestnetwork_bandwidth() {
	gbc_debug "is_del_tc_root_guestnetwork_bandwidth start"
	
	if [ "${global_enable_2g}" == "on" -o "${global_enable_5g1}" == "on" ]; then
		gbc_debug "is_del_tc_root_guestnetwork_bandwidth return 0" 
		return 0
	fi
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ "${global_enable_5g2}" == "on" ]; then
			gbc_debug "is_del_tc_root_guestnetwork_bandwidth 5g2 return 0" 
			return 0
		fi
	fi
	if [ "${support_6g}" == "yes" ]; then
		if [ "${global_enable_6g}" == "on" ]; then
			gbc_debug "is_del_tc_root_guestnetwork_bandwidth 6g return 0" 
			return 0
		fi
	fi
	
	gbc_debug "is_del_tc_root_guestnetwork_bandwidth return 1" 
	return 1

	gbc_debug "is_del_tc_root_guestnetwork_bandwidth end"
}

gbc_tc_add_down_rule() {
	gbc_debug "gbc_tc_add_down_rule start"
	if [[ -n "$qos_rDownband" ]]; then
	    qos_down_band=$((qos_rDownband))
	elif [[ "$qos_down_unit" == "mbps" ]]; then
	    qos_down_band=$((qos_down_band*1000))
	fi

	local limitrate
	local ceil_limitrate
	
	local downlink=$((${qos_percent}*${qos_down_band}/100))
	local down_low=$((${qos_low}*${downlink}/100))
	if [ ${downlink} -le 0 ]; then
		downlink=1
	fi
	if [ ${down_low} -le 0 ]; then
		down_low=1
	fi
	
	# 2.4G
	if [ "${global_enable_2g}" == "on" ]; then
		# wan --> guest_ifname_2g	 0x0070,112
		ceil_limitrate=${global_down_band_2g}
		limitrate=`expr ${ceil_limitrate} / 10`
		if [ "${qos_enable}" == "on" ]; then
			if [ ${down_low} -lt ${limitrate} ]; then
				limitrate=${down_low}
			fi
			if [ ${downlink} -lt ${ceil_limitrate} ]; then
				ceil_limitrate=${downlink}
			fi
		fi
		if [ ${limitrate} -le 0 ]; then
			limitrate=1
		fi
		limitrate="${limitrate}""kbit"
		ceil_limitrate="${ceil_limitrate}""kbit"
		
		gbc_debug "2.4G wan-->guest_ifname_2g limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
		
		tc class add dev $lanDev parent 2:4 classid 2:112 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
		tc qdisc add dev $lanDev parent 2:112 handle 112: sfq perturb 10

		tc filter add dev $lanDev parent 2:0 protocol all prio 3 handle 0x0070/0xfff0 fw classid 2:112
	fi

	# 5G
	if [ "${global_enable_5g1}" == "on" ]; then
		# wan --> guest_ifname_5g	 0x0090,144
		ceil_limitrate=${global_down_band_5g1}
		limitrate=`expr ${ceil_limitrate} / 10`
		if [ "${qos_enable}" == "on" ]; then
			if [ ${down_low} -lt ${limitrate} ]; then
				limitrate=${down_low}
			fi
			if [ ${downlink} -lt ${ceil_limitrate} ]; then
				ceil_limitrate=${downlink}
			fi
		fi
		if [ ${limitrate} -le 0 ]; then
			limitrate=1
		fi
		limitrate="${limitrate}""kbit"
		ceil_limitrate="${ceil_limitrate}""kbit"
		
		gbc_debug "5G wan-->guest_ifname_5g limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
		
		tc class add dev $lanDev parent 2:4 classid 2:144 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
		tc qdisc add dev $lanDev parent 2:144 handle 144: sfq perturb 10

		tc filter add dev $lanDev parent 2:0 protocol all prio 3 handle 0x0090/0xfff0 fw classid 2:144
	fi

	# 5G2
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ "${global_enable_5g2}" == "on" ]; then
			# wan --> guest_ifname_5g2	 0x00b0,176
			ceil_limitrate=${global_down_band_5g2}
			limitrate=`expr ${ceil_limitrate} / 10`
			if [ "${qos_enable}" == "on" ]; then
				if [ ${down_low} -lt ${limitrate} ]; then
					limitrate=${down_low}
				fi
				if [ ${downlink} -lt ${ceil_limitrate} ]; then
					ceil_limitrate=${downlink}
				fi
			fi
			if [ ${limitrate} -le 0 ]; then
				limitrate=1
			fi
			limitrate="${limitrate}""kbit"
			ceil_limitrate="${ceil_limitrate}""kbit"
			
			gbc_debug "5G2 wan-->guest_ifname_5g2 limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
			
			tc class add dev $lanDev parent 2:4 classid 2:176 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
			tc qdisc add dev $lanDev parent 2:176 handle 176: sfq perturb 10

			tc filter add dev $lanDev parent 2:0 protocol all prio 3 handle 0x00b0/0xfff0 fw classid 2:176
		fi
	fi

	# 6G
	if [ "${support_6g}" == "yes" ]; then
		if [ "${global_enable_6g}" == "on" ]; then
			# wan --> guest_ifname_6g	 0x00d0,208
			ceil_limitrate=${global_down_band_6g}
			limitrate=`expr ${ceil_limitrate} / 10`
			if [ "${qos_enable}" == "on" ]; then
				if [ ${down_low} -lt ${limitrate} ]; then
					limitrate=${down_low}
				fi
				if [ ${downlink} -lt ${ceil_limitrate} ]; then
					ceil_limitrate=${downlink}
				fi
			fi
			if [ ${limitrate} -le 0 ]; then
				limitrate=1
			fi
			limitrate="${limitrate}""kbit"
			ceil_limitrate="${ceil_limitrate}""kbit"
			
			gbc_debug "6G wan-->guest_ifname_6g limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
			
			tc class add dev $lanDev parent 2:4 classid 2:208 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
			tc qdisc add dev $lanDev parent 2:208 handle 208: sfq perturb 10

			tc filter add dev $lanDev parent 2:0 protocol all prio 3 handle 0x00d0/0xfff0 fw classid 2:208
		fi
	fi
	
	gbc_debug "gbc_tc_add_down_rule end"
}

gbc_tc_del_down_rule() {
	gbc_debug "guestnetwork bandwidth del tc down rules"
	# 2.4G£¬wan --> guest_ifname_2g	 0x0070,112
	tc filter del dev $lanDev parent 2:0 protocol all prio 3 handle 0x0070/0xfff0 fw classid 2:112
	tc class del dev $lanDev parent 2:4 classid 2:112

	# 5G£¬wan --> guest_ifname_5g	 0x0090,144
	tc filter del dev $lanDev parent 2:0 protocol all prio 3 handle 0x0090/0xfff0 fw classid 2:144
	tc class del dev $lanDev parent 2:4 classid 2:144

	# 5G2£¬wan --> guest_ifname_5g2	 0x00b0,176
	tc filter del dev $lanDev parent 2:0 protocol all prio 3 handle 0x00b0/0xfff0 fw classid 2:176
	tc class del dev $lanDev parent 2:4 classid 2:176

	# 6G£¬wan --> guest_ifname_6g	 0x00d0,208
	tc filter del dev $lanDev parent 2:0 protocol all prio 3 handle 0x00d0/0xfff0 fw classid 2:208
	tc class del dev $lanDev parent 2:4 classid 2:208
}

gbc_tc_add_up_rule() {
	gbc_debug "gbc_tc_add_up_rule start"
	if [[ -n "$qos_rUpband" ]]; then
	    qos_up_band=$((qos_rUpband))
	elif [[ "$qos_up_unit" == "mbps" ]]; then
	    qos_up_band=$((qos_up_band*1000))
	fi

	local limitrate
	local ceil_limitrate
	
	local uplink=$((${qos_percent}*${qos_up_band}/100))
	local up_low=$((${qos_low}*${uplink}/100))
	if [ ${uplink} -le 0 ]; then
		uplink=1
	fi
	if [ ${up_low} -le 0 ]; then
		up_low=1
	fi
	
	# 2.4G
	if [ "${global_enable_2g}" == "on" ]; then
		# guest_ifname_2g --> wan	 0x0060,96
		ceil_limitrate=${global_up_band_2g}
		limitrate=`expr ${ceil_limitrate} / 10`
		if [ "${qos_enable}" == "on" ]; then
			if [ ${up_low} -lt ${limitrate} ]; then
				limitrate=${up_low}
			fi
			if [ ${uplink} -lt ${ceil_limitrate} ]; then
				ceil_limitrate=${uplink}
			fi
		fi
		if [ ${limitrate} -le 0 ]; then
			limitrate=1
		fi
		limitrate="${limitrate}""kbit"
		ceil_limitrate="${ceil_limitrate}""kbit"
		
		gbc_debug "2.4G guest_ifname_2g-->wan limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"

		for i in $ifaces; do
			#local wan_ifname=$(uci get network.$i.ifname)
			local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
			[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
			[ -z $wan_ifname ] && {
				continue
			}
			tc class add dev $wan_ifname parent 1:4 classid 1:96 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
			tc qdisc add dev $wan_ifname parent 1:96 handle 96: sfq perturb 10

			tc filter add dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x0060/0xfff0 fw classid 1:96
		done
	fi

	# 5G
	if [ "${global_enable_5g1}" == "on" ]; then
		# guest_ifname_5g --> wan	 0x0080,128
		ceil_limitrate=${global_up_band_5g1}
		limitrate=`expr ${ceil_limitrate} / 10`
		if [ "${qos_enable}" == "on" ]; then
			if [ ${up_low} -lt ${limitrate} ]; then
				limitrate=${up_low}
			fi
			if [ ${uplink} -lt ${ceil_limitrate} ]; then
				ceil_limitrate=${uplink}
			fi
		fi
		if [ ${limitrate} -le 0 ]; then
			limitrate=1
		fi
		limitrate="${limitrate}""kbit"
		ceil_limitrate="${ceil_limitrate}""kbit"
		
		gbc_debug "5G guest_ifname_5g --> wan limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
		
		for i in $ifaces; do
			#local wan_ifname=$(uci get network.$i.ifname)
			local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
			[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
			[ -z $wan_ifname ] && {
				continue
			}
			tc class add dev $wan_ifname parent 1:4 classid 1:128 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
			tc qdisc add dev $wan_ifname parent 1:128 handle 128: sfq perturb 10

			tc filter add dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x0080/0xfff0 fw classid 1:128
		done
	fi

	# 5G2
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ "${global_enable_5g2}" == "on" ]; then
			# guest_ifname_5g2 --> wan	 0x00a0,160
			ceil_limitrate=${global_up_band_5g2}
			limitrate=`expr ${ceil_limitrate} / 10`
			if [ "${qos_enable}" == "on" ]; then
				if [ ${up_low} -lt ${limitrate} ]; then
					limitrate=${up_low}
				fi
				if [ ${uplink} -lt ${ceil_limitrate} ]; then
					ceil_limitrate=${uplink}
				fi
			fi
			if [ ${limitrate} -le 0 ]; then
				limitrate=1
			fi
			limitrate="${limitrate}""kbit"
			ceil_limitrate="${ceil_limitrate}""kbit"
			
			gbc_debug "5G2 guest_ifname_5g2 --> wan limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
			
			for i in $ifaces; do
				#local wan_ifname=$(uci get network.$i.ifname)
				local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
				[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
				[ -z $wan_ifname ] && {
					continue
				}
				tc class add dev $wan_ifname parent 1:4 classid 1:160 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
				tc qdisc add dev $wan_ifname parent 1:160 handle 160: sfq perturb 10

				tc filter add dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x00a0/0xfff0 fw classid 1:160
			done
		fi
	fi

	# 6G
	if [ "${support_6g}" == "yes" ]; then
		if [ "${global_enable_6g}" == "on" ]; then
			# guest_ifname_6g --> wan	 0x00c0,192
			ceil_limitrate=${global_up_band_6g}
			limitrate=`expr ${ceil_limitrate} / 10`
			if [ "${qos_enable}" == "on" ]; then
				if [ ${up_low} -lt ${limitrate} ]; then
					limitrate=${up_low}
				fi
				if [ ${uplink} -lt ${ceil_limitrate} ]; then
					ceil_limitrate=${uplink}
				fi
			fi
			if [ ${limitrate} -le 0 ]; then
				limitrate=1
			fi
			limitrate="${limitrate}""kbit"
			ceil_limitrate="${ceil_limitrate}""kbit"
			
			gbc_debug "6G guest_ifname_6g --> wan limitrate:${limitrate}, ceil_limitrate:${ceil_limitrate}"
			
			for i in $ifaces; do
				#local wan_ifname=$(uci get network.$i.ifname)
				local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
				[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
				[ -z $wan_ifname ] && {
					continue
				}
				tc class add dev $wan_ifname parent 1:4 classid 1:192 htb rate "${limitrate}" ceil "${ceil_limitrate}" prio 3
				tc qdisc add dev $wan_ifname parent 1:192 handle 192: sfq perturb 10

				tc filter add dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x00c0/0xfff0 fw classid 1:192
			done
		fi
	fi
        
	gbc_debug "gbc_tc_add_up_rule end"
}

gbc_tc_del_up_rule() {
	gbc_debug "guestnetwork bandwidth del tc up rules"
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		# 2.4G guest_ifname_2g --> wan	 0x0060,96
		tc filter del dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x0060/0xfff0 fw classid 1:96
		tc class del dev $wan_ifname parent 1:4 classid 1:96

		# 5G guest_ifname_5g --> wan	 0x0080,128
		tc filter del dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x0080/0xfff0 fw classid 1:128
		tc class del dev $wan_ifname parent 1:4 classid 1:128

		# 5G2 guest_ifname_5g2 --> wan	 0x00a0,160
		tc filter del dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x00a0/0xfff0 fw classid 1:160
		tc class del dev $wan_ifname parent 1:4 classid 1:160

		# 6G guest_ifname_6g --> wan	 0x00c0,192
		tc filter del dev $wan_ifname parent 1:0 protocol all prio 3 handle 0x00c0/0xfff0 fw classid 1:192
		tc class del dev $wan_ifname parent 1:4 classid 1:192
	done
}		

gbc_tc_add_parent_rule() {
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
	
	uplink="${uplink}""kbit"
	up_low="${up_low}""kbit"
	
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		gbc_debug "guest uplink up_low:${up_low}, uplink:${uplink}"
		tc class add dev $wan_ifname parent 1:1 classid 1:4 htb rate ${up_low} ceil ${uplink} prio 3
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
	
	downlink="${downlink}""kbit"
	down_low="${down_low}""kbit"
	
	gbc_debug "guest downlink down_low:${down_low}, downlink:${downlink}"
	tc class add dev $lanDev parent 2:1 classid 2:4 htb rate ${down_low} ceil ${downlink} prio 3
}

gbc_tc_del_parent_rule() {
	for i in $ifaces; do
		#local wan_ifname=$(uci get network.$i.ifname)
		local wan_ifname=$(uci get profile.@wan[0].wan_ifname -c "/etc/profile.d" -q)
		[ -z $wan_ifname ] && wan_ifname=$(uci get network.$i.ifname)
		[ -z $wan_ifname ] && {
			continue
		}
		tc class del dev $wan_ifname parent 1:1 classid 1:4
	done

	tc class del dev $lanDev parent 2:1 classid 2:4
	
	# del tc root
	. /lib/qos/core_qos.sh
	fw_del_tc_root
}

gbc_fw_add_rule() {
	gbc_debug "gbc_fw_add_rule start"

	# guest_ifname --> wan
	if [ "${global_enable_2g}" == "on" -o "${global_enable_5g1}" == "on" -o "${global_enable_5g2}" == "on" -o "${global_enable_6g}" == "on" ]; then
		local lan_rule=$(fw list 4 m | grep "limit_guest_wan_rule")
		[ -z "${lan_rule}" ] && {
			fw add 4 m limit_guest_wan_rule
			fw add 4 m zone_lan_qos limit_guest_wan_rule 1
		}
	fi
	# 2.4G guest_ifname_2g --> wan	 0x0060
	if [ "${global_enable_2g}" == "on" ]; then
		fw add 4 m limit_guest_2g_wan_rule 
		#fw add 4 m limit_guest_2g_wan_rule "MARK --set-xmark 0x0060/0xfff0"
		fw add 4 m limit_guest_2g_wan_rule "CONNMARK --set-xmark 0x0060/0xfff0"
		fw add 4 m limit_guest_2g_wan_rule ACCEPT
		fw add 4 m limit_guest_wan_rule limit_guest_2g_wan_rule { "-m mark --mark 0x0060/0xfff0" }
		#fw add 4 m limit_guest_wan_rule limit_guest_2g_wan_rule { "-i br-lan" }
		# BCM, only for bcm fcache now
		[ -e /proc/fcache/ ] && {
			# set tc flags
			iptables -t mangle -I limit_guest_2g_wan_rule -j BLOGTG --set-tcflag 1
			# clear acceleration entry
			local guest_ifname_2g=$(uci get profile.@wireless[0].wireless_guest_ifname_2g -c "/etc/profile.d" -q)
			fc flush --if "${guest_ifname_2g}"
		}
	fi
	
	# 5G guest_ifname_5g --> wan	 0x0080
	if [ "${global_enable_5g1}" == "on" ]; then
		fw add 4 m limit_guest_5g_wan_rule 
		fw add 4 m limit_guest_5g_wan_rule "CONNMARK --set-xmark 0x0080/0xfff0"
		fw add 4 m limit_guest_5g_wan_rule ACCEPT
		fw add 4 m limit_guest_wan_rule limit_guest_5g_wan_rule { "-m mark --mark 0x0080/0xfff0" }	
		# BCM, only for bcm fcache now
		[ -e /proc/fcache/ ] && {
			# set tc flags
			iptables -t mangle -I limit_guest_5g_wan_rule -j BLOGTG --set-tcflag 1
			# clear acceleration entry
			local guest_ifname_5g=$(uci get profile.@wireless[0].wireless_guest_ifname_5g -c "/etc/profile.d" -q)
			fc flush --if "${guest_ifname_5g}"
		}
	fi

	# 5G2 guest_ifname_5g_2 --> wan  0x00a0
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ "${global_enable_5g2}" == "on" ]; then
			fw add 4 m limit_guest_5g2_wan_rule 
			fw add 4 m limit_guest_5g2_wan_rule "CONNMARK --set-xmark 0x00a0/0xfff0"
			fw add 4 m limit_guest_5g2_wan_rule ACCEPT
			fw add 4 m limit_guest_wan_rule limit_guest_5g2_wan_rule { "-m mark --mark 0x00a0/0xfff0" }
			# BCM, only for bcm fcache now
			[ -e /proc/fcache/ ] && {
				#  set tc flags
				iptables -t mangle -I limit_guest_5g2_wan_rule -j BLOGTG --set-tcflag 1
				# clear acceleration entry
				local guest_ifname_5g_2=$(uci get profile.@wireless[0].wireless_guest_ifname_5g_2 -c "/etc/profile.d" -q)
				fc flush --if "${guest_ifname_5g_2}"
			}
		fi
	fi

	# 6G guest_ifname_6g --> wan  0x00c0
	if [ "${support_6g}" == "yes" ]; then
		if [ "${global_enable_6g}" == "on" ]; then
			fw add 4 m limit_guest_6g_wan_rule 
			fw add 4 m limit_guest_6g_wan_rule "CONNMARK --set-xmark 0x00c0/0xfff0"
			fw add 4 m limit_guest_6g_wan_rule ACCEPT
			fw add 4 m limit_guest_wan_rule limit_guest_6g_wan_rule { "-m mark --mark 0x00c0/0xfff0" }
			# BCM, only for bcm fcache now
			[ -e /proc/fcache/ ] && {
				#  set tc flags
				iptables -t mangle -I limit_guest_6g_wan_rule -j BLOGTG --set-tcflag 1
				# clear acceleration entry
				local guest_ifname_6g=$(uci get profile.@wireless[0].wireless_guest_ifname_6g -c "/etc/profile.d" -q)
				fc flush --if "${guest_ifname_6g}"
			}
		fi
	fi
	
	# wan --> guest_ifname
	if [ "${global_enable_2g}" == "on" -o "${global_enable_5g1}" == "on" -o "${global_enable_5g2}" == "on" -o "${global_enable_6g}" == "on" ]; then
		local wan_rule=$(fw list 4 m | grep "limit_wan_guest_rule")
		[ -z "${wan_rule}" ] && {
			fw add 4 m limit_wan_guest_rule
			fw add 4 m zone_wan_qos limit_wan_guest_rule 1
		}
	fi
	# 2.4G guest_ifname_2g --> wan	 0x0070
	if [ "${global_enable_2g}" == "on" ]; then
		fw add 4 m limit_wan_guest_2g_rule
		fw add 4 m limit_wan_guest_2g_rule "MARK --set-xmark 0x0070/0xfff0"
		fw add 4 m limit_wan_guest_2g_rule ACCEPT
		fw add 4 m limit_wan_guest_rule limit_wan_guest_2g_rule { "-m connmark --mark 0x0060/0xfff0" }
		# BCM, set tc flags, only for bcm fcache now
		[ -e /proc/fcache/ ] && {
			iptables -t mangle -I limit_wan_guest_2g_rule -j BLOGTG --set-tcflag 1
			fc flush --if "${guest_ifname_2g}"
		}
	fi
	
	# 5G guest_ifname_5g --> wan	 0x0090
	if [ "${global_enable_5g1}" == "on" ]; then
		fw add 4 m limit_wan_guest_5g_rule
		fw add 4 m limit_wan_guest_5g_rule "MARK --set-xmark 0x0090/0xfff0"
		fw add 4 m limit_wan_guest_5g_rule ACCEPT
		fw add 4 m limit_wan_guest_rule limit_wan_guest_5g_rule { "-m connmark --mark 0x0080/0xfff0" }
		# BCM, set tc flags, only for bcm fcache now
		[ -e /proc/fcache/ ] && {
			iptables -t mangle -I limit_wan_guest_5g_rule -j BLOGTG --set-tcflag 1
			fc flush --if "${guest_ifname_5g1}"
		}
	fi

	# 5G2 guest_ifname_5g_2 --> wan  0x00b0
	if [ "${support_triband}" == "yes" -a "${support_6g}" != "yes" -o "${support_fourband}" == "yes" ]; then
		if [ "${global_enable_5g2}" == "on" ]; then
			fw add 4 m limit_wan_guest_5g2_rule
			fw add 4 m limit_wan_guest_5g2_rule "MARK --set-xmark 0x00b0/0xfff0"
			fw add 4 m limit_wan_guest_5g2_rule ACCEPT
			fw add 4 m limit_wan_guest_rule limit_wan_guest_5g2_rule { "-m connmark --mark 0x00a0/0xfff0" }
			# BCM, set tc flags, only for bcm fcache now
			[ -e /proc/fcache/ ] && {
				iptables -t mangle -I limit_wan_guest_5g2_rule -j BLOGTG --set-tcflag 1
				fc flush --if "${guest_ifname_5g2}"
			}
		fi
	fi

	# 6G guest_ifname_6g --> wan  0x00d0
	if [ "${support_6g}" == "yes" ]; then
		if [ "${global_enable_6g}" == "on" ]; then
			fw add 4 m limit_wan_guest_6g_rule
			fw add 4 m limit_wan_guest_6g_rule "MARK --set-xmark 0x00d0/0xfff0"
			fw add 4 m limit_wan_guest_6g_rule ACCEPT
			fw add 4 m limit_wan_guest_rule limit_wan_guest_6g_rule { "-m connmark --mark 0x00c0/0xfff0" }
			# BCM, set tc flags, only for bcm fcache now
			[ -e /proc/fcache/ ] && {
				iptables -t mangle -I limit_wan_guest_6g_rule -j BLOGTG --set-tcflag 1
				fc flush --if "${guest_ifname_6g}"
			}
		fi
	fi
	gbc_debug "gbc_fw_add_rule end"
}

gbc_fw_del_rule() {
	gbc_debug "gbc_fw_del_rule start"
	# guest_ifname --> wan
	fw flush 4 m limit_guest_wan_rule
	fw flush 4 m limit_guest_2g_wan_rule
	fw flush 4 m limit_guest_5g_wan_rule
	fw flush 4 m limit_guest_5g2_wan_rule
	fw flush 4 m limit_guest_6g_wan_rule
	
	fw del 4 m limit_guest_2g_wan_rule
	fw del 4 m limit_guest_5g_wan_rule
	fw del 4 m limit_guest_5g2_wan_rule
	fw del 4 m limit_guest_6g_wan_rule
	fw del 4 m zone_lan_qos limit_guest_wan_rule
	fw del 4 m limit_guest_wan_rule

	# wan --> guest_ifname
	fw flush 4 m limit_wan_guest_rule
	fw flush 4 m limit_wan_guest_2g_rule
	fw flush 4 m limit_wan_guest_5g_rule
	fw flush 4 m limit_wan_guest_5g2_rule
	fw flush 4 m limit_wan_guest_6g_rule

	fw del 4 m limit_wan_guest_2g_rule
	fw del 4 m limit_wan_guest_5g_rule
	fw del 4 m limit_wan_guest_5g2_rule
	fw del 4 m limit_wan_guest_6g_rule
	fw del 4 m zone_wan_qos limit_wan_guest_rule
	fw del 4 m limit_wan_guest_rule
	
	gbc_debug "gbc_fw_del_rule end"
}

