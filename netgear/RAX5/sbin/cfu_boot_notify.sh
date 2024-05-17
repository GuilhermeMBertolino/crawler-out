#!/bin/sh
if [ ! -e /tmp/fw/cfu_notify ]; then
    inet_link="`getdb.sh -s`"
    inet_check="$(uci -P /var/state get network.inet.check)"
    routerMode="`getdb.sh -r`"
    #For AP DHCP mode and Router L2TP/PPTP mode, maybe have timing issue or status error issue.
    #So, polling the status in here.
    for i in 1 2 3 4 5
    do
        if [ "$inet_link" == "up" ] || [ "$inet_check" == "1" ]; then
            break;
        fi
        echo -e "\033[35m $0 wait internet ready in $routerMode mode, try $i !! \033[0m" > /dev/console
        sleep 2s
        inet_link="`getdb.sh -s`"
        inet_check="$(uci -P /var/state get network.inet.check)"
    done

    if [ "$inet_link" == "up" ] || [ "$inet_check" == "1" ]; then
        touch /tmp/fw/cfu_notify
        echo -e "\033[35m CFU boot notify!! \033[0m" > /dev/console
        /sbin/pucfu -d -l -n
        sleep 30s
        echo -e "\033[35m AutoFW check at system bootup!! \033[0m" > /dev/console
        /sbin/pufwUpgrade -a
    fi
fi
