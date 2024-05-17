#!/bin/sh
. /lib/functions.sh

[ "$1" == "0" ] &&
{
    uci_toggle_state network inet check 0
} || {
    sleep 1
    success=0
    route | grep default > /dev/null
    result=$?

    for i in 1 2 3
    do
        [ $result = '1' ] && break
        traceroute  -q 1 -w 1 -n -f $i -m $i "www.netgear.com" 2>&1 | grep -E "sendto|\*" > /dev/null
        success=$?
        [ "$success" = '1' ] && break
    done

    if [ "$success" = "1" ]; then
        uci_toggle_state network inet check 1
        uci -c /var/state set hotplug_phy.port.wan_check=G
    else
        uci -c /var/state set hotplug_phy.port.wan_check=A
        uci_toggle_state network inet check 0
    fi

    uci -c /var/state commit hotplug_phy
    killall -USR2 led_control
}
# return $success

