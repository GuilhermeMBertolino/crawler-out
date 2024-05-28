#!/bin/sh

. /lib/config/uci.sh
. /lib/functions.sh

WS_DEBUG=0
if [ "$WS_DEBUG" == 1 ]; then
	WS_CONSOLE="/dev/console"
else
	WS_CONSOLE="/dev/null"
fi

wifi_state=""
wireless_schedule_get_config() {
	local section="$1"
	local option="$2"
	local disabled=$(uci get wireless.$section.$option)
	if [ "$disabled" = "$3" ]; then
		wifi_state="0"
	else
		wifi_state="1"
	fi
}

wireless_schedule_set_config() {
    local section="$1"
    uci set wireless.$section.disabled="$2"
    if [ "$#" -eq "3" ]
    then
	uci set wireless.$section.disabled_by="$3"
    fi
    uci commit wireless
}

wireless_schedule_reload_wifi() {
    uci_toggle_state wireless_schedule changed "" "yes"

    local changed=$(uci_get_state wireless_schedule changed)
    if [ "$changed" = "yes" ]; then
        uci_toggle_state wireless_schedule changed "" "no"
         echo "Reload wifi" > $WS_CONSOLE
        /sbin/wifi reload &
    fi
}

wireless_schedule_handle_active() {
	local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d") or "no"
	local wifi_state
	echo "Reload all wifi-device active" > $WS_CONSOLE
	config_load wireless
	config_foreach wireless_schedule_get_config wifi-device "disabled" "on"
	echo "Active wifi state: $wifi_state" > $WS_CONSOLE
	config_foreach wireless_schedule_set_config wifi-device "on" "1"
	uci_toggle_state wireless_schedule 2g_disable "" 1
	uci_toggle_state wireless_schedule 5g_disable "" 1
	[ "$support_triband" = "yes" ] && uci_toggle_state wireless_schedule 52g_disable "" 1
	if [ "$wifi_state" = "0" ]; then
		echo "Wifi-devices are active" > $WS_CONSOLE
		return
	fi

	wireless_schedule_reload_wifi
}

wireless_schedule_handle_dorm() {
	local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d") or "no"
	echo "Reload all wifi-device dorm" > $WS_CONSOLE
	config_load wireless
	config_foreach wireless_schedule_get_config wifi-device "disabled" "off"
	echo "Dorm wifi state: $wifi_state" > $WS_CONSOLE
	if [ "$wifi_state" = "0" ]; then
		echo "Wifi-devices are dorm" > $WS_CONSOLE
		return
	elif [ "$1" == "stop" ]; then
		echo "Stop wireless schedule" > $WS_CONSOLE
		config_foreach wireless_schedule_get_config wifi-device "disabled_by" "0"
		if [ "$wifi_state" = "0" ]; then
			echo "Disabled by wifi button" > $WS_CONSOLE
			return
		fi
	fi
	config_foreach wireless_schedule_set_config wifi-device "off"
	uci_toggle_state wireless_schedule 2g_disable "" 0
	uci_toggle_state wireless_schedule 5g_disable "" 0
	[ "$support_triband" = "yes" ] && uci_toggle_state wireless_schedule 52g_disable "" 0

	wireless_schedule_reload_wifi
}

wireless_schedule_handle_reset() {
    local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d") or "no"

    uci_toggle_state wireless_schedule 2g_disable "" 0
    uci_toggle_state wireless_schedule 5g_disable "" 0
    [ "$support_triband" = "yes" ] && uci_toggle_state wireless_schedule 52g_disable "" 0

    wireless_schedule_reload_wifi
}

wireless_schedule_disable_wifi() {
    local band=$1

    [ "$band" = "5g_2" ] && band="52g"

    local disable=$(uci_get_state wireless_schedule ${band}_disable)
    return $((! ${disable:-0}))
}

wifi_wireless_schedule() {
    local cmd=$1

    shift 1

    case $cmd in
        get_wifi_disable) 
            local band=$1
            local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d")

            if [ "$band" = "all" ]; then
                local disable_2g=$(uci_get_state wireless_schedule 2g_disable)
                [ -z "$disable_2g" ] && disable_2g="0"
                echo "disable_2g: ${disable_2g}"
                local disable_5g=$(uci_get_state wireless_schedule 5g_disable)
                [ -z "$disable_5g" ] && disable_5g="0"
                echo "disable_5g: ${disable_5g}"
                [ "$support_triband" = "yes" ] && {
                    local disable_52g=$(uci_get_state wireless_schedule 52g_disable)
                    [ -z "$disable_52g" ] && disable_52g="0"
                    echo "disable_52g: ${disable_52g}"
                }
            else
                local disable=$(uci_get_state wireless_schedule ${band}_disable)
                echo "disable_${band}: ${disable}"
            fi
            ;;

        *)
            ;;
    esac

    echo "over"
}

