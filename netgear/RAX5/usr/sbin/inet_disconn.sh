#!/bin/sh

[ -z "$wan_mode" ] && wan_mode=$(uci get network.inet_global.wan_mode)

case "$wan_mode" in
    DHCP) 
        #echo "Disonnect DHCP"
        wan_if="wan"
        ;;
    Static) 
        #echo "Disonnect Static"
        wan_if="wan"
        ;;
    PPPoE) 
        #echo "Disonnect PPPoE"
        wan_if="wan"
        ;;
    PPTP) 
        #echo "Disonnect PPTP"
        wan_if="pptp"
        ;;
    L2TP) 
        #echo "Disonnect L2TP"
        wan_if="l2tp"
        ;;
esac

ifdown $wan_if
