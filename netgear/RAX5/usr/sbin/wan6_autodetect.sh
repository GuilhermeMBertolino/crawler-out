#!/bin/sh

#. /usr/share/libubox/jshn.sh

wan6_mode="$(uci get network.wan_v6.conntype)"
file_path="/tmp/ipv6autodetect"
ifname="$(uci get network.wan.ifname)"
dt_type="$(uci get network.wan_v6.detect_type)"

# wait v4 up
check_v4up()
{
        route=""
        x=180
        while [ $x -gt 0 ]
        do
                route=$(ip route | grep "default")
                if [ "$route" == "" ]; then
                        sleep 3s
                        x=$(( $x - 3 ))
                else
			echo "IP route UP" > /dev/console
                        break
                fi
        done
        if [ "$route" == "" ]; then
	     echo "IP route fail" > /dev/console
             exit 0
        fi
}

# $1 for other mode change to auto detect
if [ "$wan6_mode" != "autoDetect" ] && [ "$1" != "ui" ]; then
    exit 0
else
    port_state=$(swconfig dev MT7530 port 0 get link | cut -d" " -f 2)
    #echo "Port 0 $port_state" > /dev/console
    if [ "$port_state" == "link:up" ] && [ ! -f "/tmp/over_detect6" ]; then
        check_v4up
        # dhcpv6 port may already be in use, so down wan v6
        ifdown wan_v6
        echo "Start detect $ifname $file_path" > /dev/console
        pu_ipv6autodetect $ifname $file_path
        # get detect result
        detect_ret=$(cat /tmp/ipv6autodetect)
        echo "Detect result $detect_ret" > /dev/console
        ifup wan_v6
        # Check config and detection results are different
        if [ "$dt_type" != "$detect_ret" ];then
            if [ "$detect_ret" == "DHCP" ]; then
uci batch <<EOF
                set network.wan_v6.detect_type='DHCP'
                set network.wan_v6.proto='dhcpv6'
                set network.wan_v6.reqaddress='force'
                delete network.wan_v6pthru
                set dhcp.lan.dhcpv6='server'
                set dhcp.lan.ra='server'
                commit network
                commit dhcp
EOF
            elif [ "$detect_ret" == "Auto Config" ]; then
uci batch <<EOF
                set network.wan_v6.detect_type='Auto Config'
                set network.wan_v6.proto='dhcpv6'
                set network.wan_v6.reqaddress='try'
                delete network.wan_v6pthru
                set dhcp.lan.dhcpv6='server'
                set dhcp.lan.ra='server'
                commit network
                commit dhcp
EOF
            elif [ "$detect_ret" == "6to4 Tunnel" ]; then
uci batch <<EOF
                set network.wan_v6.detect_type='6to4 Tunnel'
                set network.wan_v6.proto='6to4'
                delete network.wan_v6.reqaddress
                delete network.wan_v6pthru
                set dhcp.lan.dhcpv6='server'
                set dhcp.lan.ra='server'
                commit network
                commit dhcp
EOF
            elif [ "$detect_ret" == "Pass Through" ]; then
uci batch <<EOF
                set network.wan_v6.detect_type='Pass Through'
                set network.wan_v6.proto='none'
                set network.wan_v6pthru='interface'
                set network.wan_v6pthru.ifname='eth1'
                set network.wan_v6pthru.proto='v6passthru'
                set network.wan_v6pthru.passthru_ifname='pthru_ipv6'
                delete network.wan_v6.reqaddress
                set dhcp.lan.dhcpv6='disabled'
                set dhcp.lan.ra='disabled'
                commit network
                commit dhcp
EOF
            else
                echo "WAN6 Auto Not Detect" > /dev/console
            fi

            ifup wan_v6
            if [ "$detect_ret" != "" ]; then
                touch /tmp/over_detect6
                # skip UI
                if [ "$1" != ui ]; then
                    /etc/init.d/network restart
                    touch /var/state/ipv6changed
                    /etc/init.d/odhcpd reload
                fi
            fi
        fi
    #else
        # rm /tmp/ipv6autodetect*
    fi
fi
