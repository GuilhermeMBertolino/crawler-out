# Copyright (C) 2009-2010 OpenWrt.org
wifi_macfilter_set_black() {
    wifi macfilter deny &
}

wifi_macfilter_set_white() {
    wifi macfilter allow &
}

wifi_macfilter_disable() {
    wifi macfilter &
}

# wifi_macfilter_add() {
#     wifi macfilter add "$1" &
# }

# wifi_macfilter_delete() {
#     wifi macfilter del "$1" &
# }


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
    fw flush 4 r access_control
    fw s_del 4 r zone_lan_notrack access_control
    fw del 4 r access_control
}

fw_load_global() {
    fw_config_get_global $1
    case $global_enable in
        on )
        fw add 4 r access_control
        fw s_add 4 r zone_lan_notrack access_control 1

        case $global_access_mode in
             black )
            rm /tmp/state/access_control
            touch /tmp/state/access_control
            config_foreach fw_load_black_list black_list

            local mac_list=
            if [ -e /tmp/state/access_control ]; then
                mac_list=$(cat /tmp/state/access_control)
            fi
            ac_macfilter_wrap_black $mac_list &          

            fw s_add 4 r access_control RETURN
                 ;;
             white )
            rm /tmp/state/access_control
            touch /tmp/state/access_control
            config_foreach fw_load_white_list white_list

            ac_macfilter_wrap_white &
            fw s_add 4 r access_control DROP
                 ;;
        esac 

        #conntrack -F
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
    fw s_add 4 r access_control RETURN { "$rule" }
    echo "$mac" >> /tmp/state/access_control
    syslog $ACCESS_CONTROL_LOG_DBG_WHITE_LIST_ADD "$mac"
}

fw_load_black_list() {
    fw_config_get_black_list $1
    local mac=$(echo $black_list_mac | tr [a-z] [A-Z])
    local rule="-m mac --mac-source ${mac//-/:}"
    fw s_add 4 r access_control DROP { "$rule" }
    echo "$mac" >> /tmp/state/access_control
    # wifi_macfilter_add $mac
    syslog $ACCESS_CONTROL_LOG_DBG_BLACK_LIST_ADD "$mac"
}
