#!/bin/sh

[ -z "$wan_mode" ] && wan_mode=$(uci get network.inet_global.wan_mode)

case "$wan_mode" in
    DHCP) 
        #echo "Connect DHCP"
        wan_if="wan"
        ;;
    Static) 
        #echo "Connect Static"
        wan_if="wan"
        ;;
    PPPoE) 
        #echo "Connect PPPoE"
        wan_if="wan"
        ;;
    PPTP) 
        #echo "Connect PPTP"
        wan_if="pptp"
        ;;
    L2TP) 
        #echo "Connect L2TP"
        wan_if="l2tp"
        ;;
esac

ifup $wan_if

