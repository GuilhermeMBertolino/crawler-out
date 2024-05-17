#!/bin/sh
if [ ! -e /tmp/fw/cfu_notify ]; then
    internet_status="`getdb -s`"
    routerMode="`getdb -r`"
    #For AP DHCP mode and Router L2TP/PPTP mode, maybe have timing issue or status error issue.
    #So, polling the status in here.
    for i in 1 2 3 4 5
    do
        if [ $internet_status == "up" ] || [ -e /tmp/Wan_Online ]; then
            break;
        fi
        echo -e "\033[35m wait internet ready in $routerMode mode, try $i !! \033[0m" > /dev/console
        sleep 2s
        internet_status="`getdb -s`"
    done
    if [ $internet_status == "up" ] || [ -e /tmp/Wan_Online ]; then
        touch /tmp/fw/cfu_notify
        echo -e "\033[35m CFU boot notify!! \033[0m" > /dev/console
        /bin/pucfu -d -l -n
        sleep 30s
        echo -e "\033[35m AutoFW check at system bootup!! \033[0m" > /dev/console
        /bin/pufwUpgrade -a
    fi
fi
