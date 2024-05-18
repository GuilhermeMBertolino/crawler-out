#!/bin/sh

. /lib/config/uci.sh

wireless_schedule_reload_wifi() {
    local band=$1
    local time=

    case $band in
        2g)  time=2 ;;
        5g)  time=3 ;;
        52g) time=4 ;;
        *)   time=1 ;;
    esac

    uci_toggle_state wireless_schedule changed "" "yes"
    sleep $time

    local changed=$(uci_get_state wireless_schedule changed)
    if [ "$changed" = "yes" ]; then
        uci_toggle_state wireless_schedule changed "" "no"
        /sbin/wifi reload
    fi
}

wireless_schedule_handle_active() {
    local band=$1

    uci_toggle_state wireless_schedule ${band}_disable "" 1

    wireless_schedule_reload_wifi $band
}

wireless_schedule_handle_dorm() {
    local band=$1

    uci_toggle_state wireless_schedule ${band}_disable "" 0

    wireless_schedule_reload_wifi $band
}

wireless_schedule_handle_reset() {
    local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d")

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

