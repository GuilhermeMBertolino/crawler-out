#!/bin/sh

. /lib/network/switch.sh

interface=$1
device=$2
action=$3

#echo -e "\033[35m$0 $interface $device $action\033[0m" > /dev/console

mask2cdr ()
{
   # Assumes there's no "255." after a non-255 byte in the mask
   local x=${1##*255.}
   set -- 0^^^128^192^224^240^248^252^254^ $(( (${#1} - ${#x})*2 )) ${x%%.*}
   x=${1%%$3*}
   echo $(( $2 + (${#x}/4) ))
}

cdr2mask ()
{
   # Number of args to shift, 255..255, first non-255 byte, zeroes
   set -- $(( 5 - ($1 / 8) )) 255 255 255 255 $(( (255 << (8 - ($1 % 8))) & 255 )) 0 0 0
   [ $1 -gt 1 ] && shift $1 || shift
   echo ${1-0}.${2-0}.${3-0}.${4-0}
}

check_conflict ()
{
    # LAN
    ip1=$1
    mask1=$2
    # WAN
    ip2=$3
    mask2=$4

    #echo "check LAN:$ip1/$mask1, WAN:$ip2/$mask2" > /dev/console
    #Get IP1 interface information
    mask1_1=$(echo $mask1 | awk -F . '{printf $1}')
    mask1_2=$(echo $mask1 | awk -F . '{printf $2}')
    mask1_3=$(echo $mask1 | awk -F . '{printf $3}')
    ip1_1=$(echo $ip1 | awk -F . '{printf $1}')
    ip1_2=$(echo $ip1 | awk -F . '{printf $2}')
    ip1_3=$(echo $ip1 | awk -F . '{printf $3}')
    ip1_1=$(( ip1_1&mask1_1 ))
    ip1_2=$(( ip1_2&mask1_2 ))
    ip1_3=$(( ip1_3&mask1_3 ))
    prefix1=$(mask2cdr $mask1)

    mask2_1=$(echo $mask2 | awk -F . '{printf $1}')
    mask2_2=$(echo $mask2 | awk -F . '{printf $2}')
    mask2_3=$(echo $mask2 | awk -F . '{printf $3}')
    ip2_1=$(echo $ip2 | awk -F . '{printf $1}')
    ip2_2=$(echo $ip2 | awk -F . '{printf $2}')
    ip2_3=$(echo $ip2 | awk -F . '{printf $3}')
    ip2_1=$(( ip2_1&mask2_1 ))
    ip2_2=$(( ip2_2&mask2_2 ))
    ip2_3=$(( ip2_3&mask2_3 ))
    prefix2=$(mask2cdr $mask2)

    if [ $prefix2 == 0 ] || [ $prefix1 == 0 ]; then
        #echo "IP error, exit" > /dev/console
        exit
    fi

    #translate IP with the same network prefix
    prefix=$prefix1
    if [ $prefix2 -le $prefix1 ]; then
        #use prefix2
        ip1_1=$(( ip1_1&mask2_1 ))
        ip1_2=$(( ip1_2&mask2_2 ))
        ip1_3=$(( ip1_3&mask2_3 ))
        prefix=$prefix2
    fi
    if [ $prefix1 -le $prefix2 ]; then
        #use prefix1
        #change WAN IP as LAN prefix
        ip2_1=$(( ip2_1&mask1_1 ))
        ip2_2=$(( ip2_2&mask1_2 ))
        ip2_3=$(( ip2_3&mask1_3 ))
        prefix=$prefix1
    fi

    #Show compare date to console
    #echo "Compare.." > /dev/console
    #echo "$ip1_1.$ip1_2.$ip1_3/$prefix" > /dev/console
    #echo "$ip2_1.$ip2_2.$ip2_3/$prefix" > /dev/console

    theSame=0
    #check network is the same or not
    if [ "$ip1_1" == "$ip2_1" ] && [ "$ip1_2" == "$ip2_2" ] && [ "$ip1_3" == "$ip2_3" ]; then
        #echo "the same subnet" > /dev/console
        theSame=1
    fi

    echo $theSame
}

write_file ()
{
cat <<EOF >> /var/etc/lanip
config interface
        option ip '192.168.1.1'
        option mask '255.255.255.0'
        option used '0'

config interface
        option ip '10.0.0.1'
        option mask '255.255.255.0'
        option used '0'

config interface
        option ip '172.16.0.1'
        option mask '255.255.255.0'
        option used '0'
EOF
}


init_lanip ()
{
    if [ ! -e /var/etc/lanip ]; then
        #echo "init lanip file" > /dev/console
        #the mask and prefix use the default value
        write_file
    fi
}

lan_downup()
{
    # link down switch port
    lan_ports_down

    sleep 2

    # link up switch port
    lan_ports_up
}

#arg1= LAN IP address
#arg2= LAN IP netmask
change_lanip ()
{
    used_0=$(uci -c /var/etc get lanip.@interface[0].used)
    used_1=$(uci -c /var/etc get lanip.@interface[1].used)
    used_2=$(uci -c /var/etc get lanip.@interface[2].used)
    ip0=$(uci -c /var/etc get lanip.@interface[0].ip)
    ip1=$(uci -c /var/etc get lanip.@interface[1].ip)
    ip2=$(uci -c /var/etc get lanip.@interface[2].ip)

    #Get LAN IP address first byte to check
    lanip=$(echo $1 | awk -F . '{printf $1}')

    # Update UCI
    if [ "$lanip" == "192" ]; then
        if [ $used_1 == "0" ]; then
            uci set network.lan.ipaddr=$ip1
            ip1_1=$(echo $ip1 | awk -F . '{printf $1}')
            ip1_2=$(echo $ip1 | awk -F . '{printf $2}')
            ip1_3=$(echo $ip1 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip1_1.$ip1_2.$ip1_3.2
            uci set dhcp.lan.end_ip=$ip1_1.$ip1_2.$ip1_3.254
        elif [ $used_2  == "0" ]; then
            uci set network.lan.ipaddr=$ip2
            ip2_1=$(echo $ip2 | awk -F . '{printf $1}')
            ip2_2=$(echo $ip2 | awk -F . '{printf $2}')
            ip2_3=$(echo $ip2 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip2_1.$ip2_2.$ip2_3.2
            uci set dhcp.lan.end_ip=$ip2_1.$ip2_2.$ip2_3.254
        fi
    elif [ "$lanip" == "10" ]; then
        if [ $used_2 == "0" ]; then
            uci set network.lan.ipaddr=$ip2
            ip2_1=$(echo $ip2 | awk -F . '{printf $1}')
            ip2_2=$(echo $ip2 | awk -F . '{printf $2}')
            ip2_3=$(echo $ip2 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip2_1.$ip2_2.$ip2_3.2
            uci set dhcp.lan.end_ip=$ip2_1.$ip2_2.$ip2_3.254
        elif [ $used_0  == "0" ]; then
            uci set network.lan.ipaddr=$ip0
            ip0_1=$(echo $ip0 | awk -F . '{printf $1}')
            ip0_2=$(echo $ip0 | awk -F . '{printf $2}')
            ip0_3=$(echo $ip0 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip0_1.$ip0_2.$ip0_3.2
            uci set dhcp.lan.end_ip=$ip0_1.$ip0_2.$ip0_3.254
        fi
    elif [ "$lanip" == "172" ]; then
        if [ $used_0 == "0" ]; then
            uci set network.lan.ipaddr=$ip0
            ip0_1=$(echo $ip0 | awk -F . '{printf $1}')
            ip0_2=$(echo $ip0 | awk -F . '{printf $2}')
            ip0_3=$(echo $ip0 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip0_1.$ip0_2.$ip0_3.2
            uci set dhcp.lan.end_ip=$ip0_1.$ip0_2.$ip0_3.254
        elif [ $used_1  == "0" ]; then
            uci set network.lan.ipaddr=$ip1
            ip1_1=$(echo $ip1 | awk -F . '{printf $1}')
            ip1_2=$(echo $ip1 | awk -F . '{printf $2}')
            ip1_3=$(echo $ip1 | awk -F . '{printf $3}')
            uci set dhcp.lan.start_ip=$ip1_1.$ip1_2.$ip1_3.2
            uci set dhcp.lan.end_ip=$ip1_1.$ip1_2.$ip1_3.254
        fi
    fi

    #User maybe change mask. Don't change mask, just use the running settings
    #uci set network.lan.netmask=255.255.255.0
    uci commit network
    uci commit dhcp
    #echo "LAN IP change to $(uci get network.lan.ipaddr)" > /dev/console
    ## /etc/init.d/network restart #PeguBU6, YochengLian, 2022.08.05, Fix RAX5-IR006 and No more restart services by this script directly.
    ## /etc/init.d/dropbear restart
    ## /etc/init.d/telnet restart
    touch /var/state/dhcpconfigchanged
    ## /usr/sbin/lan_linkdownup.sh #PeguBU6, YochengLian, 2022.08.05, Fix RAX5-IR006 and No more run the link down/up by this script directly.
    touch /tmp/conflict_alarm
    /usr/bin/lua /usr/bin/configApply.lua #PeguBU6, YochengLian, 2022.08.05, Fix RAX5-IR006 and to run as CGI POST handler procedure(will trigger ucitrack).
}

#arg1= WAN IP address
#arg2= WAN IP netmask
record_wanip ()
{
    #echo "check WAN IP........" > /dev/console
    #Check WAN IP is in lanip list or not
    #Record interface information if WAN IP is in the list 
    wanip=$1
    wanmask=$2
    prefix=$(mask2cdr $2)

    for i in 0 1 2; do
        #echo "check list: $i" > /dev/console
        ipaddr=$(uci -c /var/etc get lanip.@interface[$i].ip)
        mask=$(uci -c /var/etc get lanip.@interface[$i].mask)
        if [ $(check_conflict $ipaddr $mask $wanip $wanmask) == 1 ]; then
            uci -c /var/etc set lanip.@interface[$i].used=1
            uci -c /var/etc set lanip.@interface[$i].name="$interface"
            uci -c /var/etc set lanip.@interface[$i].dev="$device"
            uci -c /var/etc commit lanip
            #echo "entry $i used by $interface $device" > /dev/console
            break
        fi
    done
}

#arg1: interface
#arg2: device
clean_wanip ()
{
    local interface="$1"
    local device="$2"
    #echo "check $interface, $device" > /dev/console
    clean=0
    for i in 0 1 2; do
        used=$(uci -c /var/etc get lanip.@interface[$i].used)
        if [ $used == 1 ]; then
            r_itf=$(uci -c /var/etc get lanip.@interface[$i].name)
            r_device=$(uci -c /var/etc get lanip.@interface[$i].dev)
            if [ -n "$device" ] && [ "$r_device" == "$device" ]; then
                clean=1
                break
            elif [ "$r_itf" == "$interface" ]; then
                clean=1
                break
            fi
        fi
    done
    
    if [ $clean == 1 ]; then
        uci -c /var/etc set lanip.@interface[$i].used=0
        uci -c /var/etc set lanip.@interface[$i].name=""
        uci -c /var/etc set lanip.@interface[$i].dev=""
        uci -c /var/etc commit lanip
        #echo "... clean entry $i" > /dev/console
    fi
}

installevent_lan_wan_conflict ()
{
    local blank_state="$(uci_get "netgear.system.blank_state")"
    if [ "$blank_state" == "1" ]; then
        #echo "LAN/WAN conflict during blank state, send installEvent - lan wan conflict" > /dev/console
        ubus call ntgr_ra_iot.installEvent send '{"eventType":"lan wan conflict"}'
    fi
}

if [ $action == "ifdown" ]; then
    clean_wanip $interface $device
    #echo -e "\033[35m$0 done\033[0m\r\n" > /dev/console
else
    # here, maybe ifup or ifupdate
    init_lanip

    if [ $action == "ifupdate" ]; then
        #echo -e "\033[35mClean WAN IP first\033[0m\r\n" > /dev/console
        clean_wanip $interface $device
        #echo -e "\033[35m$0 done\033[0m\r\n" > /dev/console
    fi

    lan=$(ip -4 addr show br-lan | grep inet | awk '{print $2}')
    lanip=$(echo $lan | awk -F / '{print $1}')
    lanprefix=$(echo $lan | awk -F / '{print $2}')
    lanmask=$(cdr2mask $lanprefix)

    if [ "$device" == "eth1" ]; then
        wan=$(ip -4 addr show $device | grep inet | awk '{print $2}')
        wanip=$(echo $wan | awk -F / '{print $1}')
    else
        wan=$(ip -4 addr show $device | grep inet | awk '{print $4}')
        wanip=$(ip -4 addr show $device | grep inet | awk '{print $2}')
    fi
    wanprefix=$(echo $wan | awk -F / '{print $2}')
    wanmask=$(cdr2mask $wanprefix)

    conflict=$(check_conflict $lanip $lanmask $wanip $wanmask)
    if [ $conflict == 1 ]; then
        echo -e "\033[35m IP confliction detected, change LAN IP\033[0m" > /dev/console
        logger -t check_ipconflict "LAN IP $lanip/$lanmask conflicted with interface $device $wanip/$wanmask."
        installevent_lan_wan_conflict
        change_lanip $lanip $lanmask
    else
        record_wanip $wanip $wanmask
    fi
    #echo -e "\033[35m$0 done\033[0m\r\n" > /dev/console
fi

