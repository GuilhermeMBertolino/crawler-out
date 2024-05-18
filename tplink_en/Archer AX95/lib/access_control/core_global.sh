# Copyright (C) 2009-2010 OpenWrt.org
wifi_macfilter_set_black() {
	wifi macfilter deny
}

wifi_macfilter_set_white() {
	wifi macfilter allow
}

wifi_macfilter_disable() {
	wifi macfilter
}


fw_config_get_global() {
	fw_config_get_section "$1" global { \
		string enable "off" \
		string access_mode "black" \
	} || return
}

fw_config_get_white_list() {
	fw_config_get_section "$1" white_list { \
		string name "" \
		string mac "" \
	} || return
}

fw_config_get_black_list() {
	fw_config_get_section "$1" black_list { \
		string name "" \
		string mac "" \
	} || return
}

fw_load_all() {
	fw_config_once fw_load_global global
}

fw_exit_all() {
	wifi_macfilter_disable
	fw flush i r access_control
	fw s_del i r zone_lan_notrack access_control
	fw del i r access_control
}

fw_load_global() {
	fw_config_get_global $1
	case $global_enable in
		on )
		fw add i r access_control
		fw s_add i r zone_lan_notrack access_control 1
		local guest_setting="`uci get access_control.settings.guest_enable`"
		local sysmode=`uci get sysmode.sysmode.mode`
		local ap_mode_support=`uci get profile.@access_control[0].ap_mode_support -c "/etc/profile.d"`

		case $global_access_mode in
		 	black )
			if [ "$sysmode" = "router" ]; then
				rm /tmp/state/access_control
				config_foreach fw_load_black_list black_list
				wifi_macfilter_set_black
			elif [ "$sysmode" = "ap" -a "$ap_mode_support" = "yes" ]; then
				rm /tmp/state/access_control
				touch /tmp/state/access_control
				config_foreach fw_load_black_list black_list

				local mac_list=
				if [ -e /tmp/state/access_control ]; then
					mac_list=$(cat /tmp/state/access_control)
				fi

				# add mac to black list
				ac_macfilter_wrap_black $mac_list &
			fi
			fw s_add i r access_control RETURN
		 		;;
		 	white )
			if [ "$sysmode" = "router" ]; then
				rm /tmp/state/access_control
				config_foreach fw_load_white_list white_list
				wifi_macfilter_set_white
			elif [ "$sysmode" = "ap" -a "$ap_mode_support" = "yes" ]; then
				#save the white list after last operation
				if [ -s /tmp/state/access_control ];then
					rm /tmp/state/access_control_tmp
					cp /tmp/state/access_control /tmp/state/access_control_tmp
				fi

				rm /tmp/state/access_control
				touch /tmp/state/access_control
				config_foreach fw_load_white_list white_list

				#get mac in last white list but not in current white list
				local kick_maclist=
				kick_maclist=$(cat /tmp/state/access_control_tmp /tmp/state/access_control /tmp/state/access_control | sort | uniq -u)

				#del mac
				ac_macfilter_wrap_white $kick_maclist &
			fi
			fw s_add i r access_control DROP
		 		;;
		esac

        case $guest_setting in
            off )
			local guest_ifname_2g=$(uci get profile.@wireless[0].wireless_guest_ifname_2g -c "/etc/profile.d" -q)
			local guest_ifname_5g=$(uci get profile.@wireless[0].wireless_guest_ifname_5g -c "/etc/profile.d" -q)
			local guest_ifname_5g_2=$(uci get profile.@wireless[0].wireless_guest_ifname_5g_2 -c "/etc/profile.d" -q)
			local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d" -q)			

			if [ "$guest_ifname_2g" = "" ];then
				fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in wl0.1" }
			else
				fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in $guest_ifname_2g" }
			fi
			if [ "$guest_ifname_5g" = "" ];then
				fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in wl1.1" }
			else
				fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in $guest_ifname_5g" }
			fi

			[ "$support_triband" = "yes" ] && {
				if [ "$guest_ifname_5g_2" = "" ];then
					fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in wl2.1" }
				else
					fw s_add i r access_control ACCEPT ^ { "-m physdev --physdev-in $guest_ifname_5g_2" }
				fi
			}
            ;;
        esac

		# comment codes below for preventing the request from being discarded, such as cloud and VPN connection.
		# conntrack -F
		syslog $LOG_INF_FUNCTION_ENABLE
		syslog $LOG_NTC_FLUSH_CT_SUCCESS
			;;
		off )
		wifi_macfilter_disable
		syslog $LOG_INF_FUNCTION_DISABLE
			;;
	esac
	
}

fw_load_white_list() {
	fw_config_get_white_list $1
	local mac=$(echo $white_list_mac | tr [a-z] [A-Z])
	local rule="-m mac --mac-source ${mac//-/:}"
	fw s_add i r access_control RETURN { "$rule" }
	echo "$mac" >> /tmp/state/access_control
	syslog $ACCESS_CONTROL_LOG_DBG_WHITE_LIST_ADD "$mac"
}

fw_load_black_list() {
	fw_config_get_black_list $1
	local mac=$(echo $black_list_mac | tr [a-z] [A-Z])
	local rule="-m mac --mac-source ${mac//-/:}"
	fw s_add i r access_control DROP { "$rule" }
	echo "$mac" >> /tmp/state/access_control
	syslog $ACCESS_CONTROL_LOG_DBG_BLACK_LIST_ADD "$mac"
}
