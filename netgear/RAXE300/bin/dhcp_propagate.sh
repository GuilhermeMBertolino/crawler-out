#/bin/sh
#action will be dhcp or ethx
action=$1
#state will be dhcp or ethx
state=$2

#INTF_LIST="eth0.0 eth1.0 eth2.0 eth3.0 eth4.1"
INTF_LIST="eth1.0 eth2.0 eth3.0 eth4.0 eth5.0 eth0.1"
INTF_LIST_MULTIG="eth0.0 eth2.0 eth3.0 eth4.0 eth5.0 eth1.1"
INTF_LIST2="wl0 wl0.1 wl1 wl1.1 wl2 wl2.1"
link_change() {

    skip=$1

    wanport="`getdb -w`"
    echo -e "\033[36;1m WAN Port is $wanport, exit...\033[0m" > /dev/console

    if [ $wanport == "eth0.1" ]; then
        for intf in $INTF_LIST
        do
            if [ $intf != $skip ]; then
                name=`echo $intf | awk -F '.' '{printf $1}'`
                echo -e "\033[35;1mifconfig $name down\033[0m" > /dev/console
                ifconfig $name down
            fi
        done
        for intf in $INTF_LIST2
        do
            echo -e "\033[35;1mifconfig $intf down\033[0m" > /dev/console
            ifconfig $intf down
            sleep 1s
        done

        for intf in $INTF_LIST
        do
            if [ $intf != $skip ]; then
                name=`echo $intf | awk -F '.' '{printf $1}'`
                echo -e "\033[35;1mifconfig $name up\033[0m" > /dev/console
                ifconfig $name up
            fi
        done
        for intf in $INTF_LIST2
        do
            echo -e "\033[35;1mifconfig $intf up\033[0m" > /dev/console
            ifconfig $intf up
            sleep 1s
        done
    else
        for intf in $INTF_LIST_MULTIG
        do
            if [ $intf != $skip ]; then
                name=`echo $intf | awk -F '.' '{printf $1}'`
                echo -e "\033[35;1mifconfig $name down\033[0m" > /dev/console
                ifconfig $name down
            fi
        done
        for intf in $INTF_LIST2
        do
            echo -e "\033[35;1mifconfig $intf down\033[0m" > /dev/console
            ifconfig $intf down
            sleep 1s
        done

        for intf in $INTF_LIST_MULTIG
        do
            if [ $intf != $skip ]; then
                name=`echo $intf | awk -F '.' '{printf $1}'`
                echo -e "\033[35;1mifconfig $name up\033[0m" > /dev/console
                ifconfig $name up
            fi
        done
        for intf in $INTF_LIST2
        do
            echo -e "\033[35;1mifconfig $intf up\033[0m" > /dev/console
            ifconfig $intf up
            sleep 1s
        done

    fi

}

routerMode="`getdb -r`"
if [ $routerMode != "router" ]; then
    echo -e "\033[36;1m$0 $1 $2 \033[0m" > /dev/console
    wanMode="`getdb -a`"
    if [ $wanMode == "Static" ]; then
        echo -e "\033[36;1m WAN is $wanMode, exit...\033[0m" > /dev/console
        exit
    fi
    if [ $action == "dhcp" ]; then
        gateway_ip=`ip route | grep default | awk -F ' ' '{printf $3}'`
        wan_intf=`cat /proc/pega/hostname | grep "$gateway_ip " | awk -F ' ' '{printf $4}'`
        echo -e "\033[36;1m$gateway_ip in $wan_intf\033[0m" > /dev/console
        if [ -z $wan_intf ]; then
            echo -e "\033[36;1mRetry - test $gateway_ip\033[0m" > /dev/console
            ping -4 -c 1 $gateway_ip
            gateway_ip=`ip route | grep default | awk -F ' ' '{printf $3}'`
            wan_intf=`cat /proc/pega/hostname | grep "$gateway_ip " | awk -F ' ' '{printf $4}'`
            echo -e "\033[36;1m$gateway_ip in $wan_intf\033[0m" > /dev/console
        fi
        echo $wan_intf > /tmp/wan_intf
        echo -e "\033[36;1mNew WAN is $wan_intf \033[0m" > /dev/console
        if [ -e /tmp/ap_force_linkchange ]; then 
            rm /tmp/ap_force_linkchange
            echo -e "\033[36;1mlinkchange propagating..\033[0m" > /dev/console
            link_change $wan_intf
        fi
    else
        if [ -e /tmp/wan_intf ]; then
            wan_intf="`cat /tmp/wan_intf`"
            echo -e "\033[36;1mWAN is $wan_intf \033[0m" > /dev/console
            if [ $action == $wan_intf ]; then
                if [ $state == "down" ]; then
                    echo -e "\033[36;1mWAN interface link down\033[0m" > /dev/console
                    touch /tmp/ap_force_linkchange
                    exit 0
                else
                    echo -e "\033[36;1mRenew DHCP\033[0m" > /dev/console
                    killall -SIGUSR1 dhcpc
                fi
            else
                if [ -e /tmp/ap_force_linkchange ]; then 
                    if [ $state == "up" ]; then
                        echo -e "\033[36;1mWAN port change. Renew DHCP\033[0m" > /dev/console
                        killall -SIGUSR1 dhcpc
                    fi
                else
                    echo -e "\033[36;1mOthers interface .. skip\033[0m" > /dev/console
                fi
            fi
        fi
    fi
fi
