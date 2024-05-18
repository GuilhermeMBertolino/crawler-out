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
	fw flush e f access_control
	fw s_del e f INPUT access_control
	fw s_del e f FORWARD access_control
	fw del e f access_control
}

fw_load_global() {
	fw_config_get_global $1
	case $global_enable in
		on )
		fw add e f access_control
		fw s_add e f INPUT access_control 1
		fw s_add e f FORWARD access_control 1
        local guest_setting="`uci get access_control.settings.guest_enable`"
		local iptv_en="`uci get iptv.iptv.enable`"

		case $global_access_mode in
		 	black )
			rm /tmp/state/access_control
			config_foreach fw_load_black_list black_list
            wifi_macfilter_set_black
			fw s_add e f access_control RETURN
				;;
			white )
			[ $iptv_en = "on" ] && {
				fw s_add e f access_control ACCEPT ^ { "--logical-in ! br-lan" }
			}
			rm /tmp/state/access_control
			config_foreach fw_load_white_list white_list
            wifi_macfilter_set_white
			fw s_add e f access_control DROP
				;;
		esac

        case $guest_setting in
            off )
			fw s_add e f access_control ACCEPT ^ { "-i ath01" }
			fw s_add e f access_control ACCEPT ^ { "-i ath11" }
            ;;
        esac

		conntrack -F
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
	local rule="--src ${mac//-/:}"
	fw s_add e f access_control RETURN { "$rule" }
	echo "$mac" >> /tmp/state/access_control
	syslog $ACCESS_CONTROL_LOG_DBG_WHITE_LIST_ADD "$mac"
}

fw_load_black_list() {
	fw_config_get_black_list $1
	local mac=$(echo $black_list_mac | tr [a-z] [A-Z])
	local rule="--src ${mac//-/:}"
	fw s_add e f access_control DROP { "$rule" }
	echo "$mac" >> /tmp/state/access_control
	syslog $ACCESS_CONTROL_LOG_DBG_BLACK_LIST_ADD "$mac"
}