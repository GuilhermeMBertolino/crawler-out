# Copyright (C) 2009-2010 OpenWrt.org

. /lib/functions.sh
. /lib/config/uci.sh

WIRELESS_SCHEDULE_LUA_LIBDIR=/usr/lib/lua

wireless_schedule_start() {
    local enable_2g   enable_5g   enable_52g
    local calendar_2g calendar_5g calendar_52g

    local need="no"

    config_load wireless_schedule

    config_get enable_2g 2g enable
    if [ "$enable_2g" = "on" ]; then
        config_get calendar_2g 2g calendar
        if [ -n "$calendar_2g" ]; then
            local calendar_2g_co=$(lua ${WIRELESS_SCHEDULE_LUA_LIBDIR}/wireless_schedule_config.lua convert_calendar $calendar_2g)
            [ "$calendar_2g_co" != "false" ] && {
                tsched_conf -a wireless_schedule "2g" "$calendar_2g_co"
                need="yes"
            }
        fi
    fi

    config_get enable_5g 5g enable
    if [ "$enable_5g" = "on" ]; then
        config_get calendar_5g 5g calendar
        if [ -n "$calendar_5g" ]; then
            local calendar_5g_co=$(lua ${WIRELESS_SCHEDULE_LUA_LIBDIR}/wireless_schedule_config.lua convert_calendar $calendar_5g)
            [ "$calendar_5g_co" != "false" ] && {
                tsched_conf -a wireless_schedule "5g" "$calendar_5g_co"
                need="yes"
            }
        fi
    fi

    local support_triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d")
    if [ "$support_triband" = "yes" ]; then
        config_get enable_52g 52g enable
        if [ "$enable_52g" = "on" ]; then
            config_get calendar_52g 52g calendar
            if [ -n "$calendar_52g" ]; then
                local calendar_52g_co=$(lua ${WIRELESS_SCHEDULE_LUA_LIBDIR}/wireless_schedule_config.lua convert_calendar $calendar_52g)
                [ "$calendar_52g_co" != "false" ] && {
                    tsched_conf -a wireless_schedule "52g" "$calendar_52g_co"
                    need="yes"
                }
            fi
        fi
    fi

    [ "$need" = "yes" ] && tsched_conf -u wireless_schedule
}

wireless_schedule_stop() {
    tsched_conf -D wireless_schedule
    tsched_conf -u wireless_schedule
}

wireless_schedule_restart() {
    wireless_schedule_stop
    wireless_schedule_start
}
