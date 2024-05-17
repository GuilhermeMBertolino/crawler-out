#!/bin/sh

installevent_wifi_status ()
{
    if [ "$1" == "on" ];then
        ubus call ntgr_ra_iot.installEvent send '{"eventType":"wifi on"}'
    else
        ubus call ntgr_ra_iot.installEvent send '{"eventType":"wifi off"}'
    fi
}

blank_state="$(uci -q get netgear.system.blank_state)"
if [ "$blank_state" == "1" ]; then
    installevent_wifi_status $1
fi

