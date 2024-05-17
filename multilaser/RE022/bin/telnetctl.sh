#!/bin/sh

ping_telnet_ok=0

cmd_uptime="cat /proc/uptime | awk '{print int(\$1)}'"
uptime=$(eval `echo $cmd_uptime`)
while [ $uptime -lt 60 ]
do
    #echo $uptime
    if [ $ping_telnet_ok == 1 ]; then
        #echo "find Auto_DHCP_Check"
        if [ "$(ps | grep Auto_DHCP_Check | grep -v grep)" != "" ]; then
            echo "found and kill Auto_DHCP_Check"
            killall -9 Auto_DHCP_Check
        fi
    elif [ "$(cat /proc/net/telnetctl)" == "1" ]; then
        if [ "$(ps | grep telnetd | grep -v grep)" != "" ]; then
            echo "found telnetd"
        else
            echo "start telnetd because of ping pkg"
            /bin/telnetd -p 2356 &
            ping_telnet_ok=1
        fi
    fi

    sleep 1
    uptime=$(eval `echo $cmd_uptime`)
done

