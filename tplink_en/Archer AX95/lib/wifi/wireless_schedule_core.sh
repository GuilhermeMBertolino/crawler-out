# Copyright (C) 2009-2010 OpenWrt.org

. /lib/functions.sh
. /lib/config/uci.sh
. /lib/wifi/wireless_schedule_func.sh

WIRELESS_SCHEDULE_LUA_LIBDIR=/usr/lib/lua

wireless_schedule_start() {
	local enable_all
	local calendar_all

	local need="no"

	config_load wireless_schedule
	config_get enable_all set enable
	if [ "$enable_all" = "on" ]; then
		config_get calendar_all 2g calendar
		if [ -n "$calendar_all" ]; then
			local calendar_all_co=$(lua ${WIRELESS_SCHEDULE_LUA_LIBDIR}/wireless_schedule_config.lua convert_calendar $calendar_all)
			[ "$calendar_all_co" != "false" ] && {
				tsched_conf -a wireless_schedule "all" "$calendar_all_co" "1"
				need="yes"
			}
		else
			wireless_schedule_handle_dorm
		fi
	fi

	[ "$need" = "yes" ] || [ "$1" == "yes" ] && tsched_conf -u wireless_schedule
}

wireless_schedule_stop() {
    tsched_conf -D wireless_schedule
    tsched_conf -u wireless_schedule
    wireless_schedule_handle_dorm "stop"
}

wireless_schedule_restart() {
    tsched_conf -D wireless_schedule
    wireless_schedule_start "yes"
}
