#!/bin/sh

l2tp_pt=`nvram_get 2860 l2tpPassThru`
pptp_pt=`nvram_get 2860 pptpPassThru`
ipsec_pt=`nvram_get 2860 ipsecPassThru`
wan_mode=`nvram_get 2860 wanConnectionMode`

if [ "$wan_mode" = "PPPOE" -o "$wan_mode" = "PPTP"  -o "$wan_mode" = "L2TP" ]; then
	wan_iface="ppp0"
else
	wan_iface="eth2.2"
fi

# note: they must be flush iptables
iptables -D FORWARD -p udp --dport 1701 -j ACCEPT >/dev/null 2>&1
iptables -D FORWARD -p udp --dport 1701 -j DROP >/dev/null 2>&1

iptables -D FORWARD -p tcp --dport 1723 -j ACCEPT >/dev/null 2>&1
iptables -D FORWARD -p tcp --sport 1723 -j ACCEPT >/dev/null 2>&1
iptables -D FORWARD -p tcp --dport 1723 -j DROP >/dev/null 2>&1

iptables -D FORWARD -p udp --dport 500 -i $wan_iface -o br0 -j ACCEPT >/dev/null 2>&1
iptables -D FORWARD -p udp --dport 500 -j DROP >/dev/null 2>&1

iptables -D FORWARD -p icmp -j ACCEPT >/dev/null 2>&1
iptables -D FORWARD -i $wan_iface -j ACCEPT >/dev/null 2>&1

# note: they exec
if [ "$l2tp_pt" = "1" ]; then	
	iptables -A FORWARD -p udp --dport 1701 -j ACCEPT
else
	iptables -A FORWARD -p udp --dport 1701 -j DROP
fi

if [ "$pptp_pt" = "1" ]; then	
	iptables -A FORWARD -p tcp --dport 1723 -j ACCEPT
	iptables -A FORWARD -p tcp --sport 1723 -j ACCEPT
else
	iptables -A FORWARD -p tcp --dport 1723 -j DROP
fi

if [ "$ipsec_pt" = "1" ]; then	
	iptables -A FORWARD -p udp --dport 500 -i $wan_iface -o br0 -j ACCEPT
else
	iptables -A FORWARD -p udp --dport 500 -j DROP
fi

if [ "$l2tp_pt" = "1" -o "$pptp_pt" = "1" ]; then	
	iptables -A FORWARD -p icmp -j ACCEPT
	iptables -A FORWARD -i $wan_iface -j ACCEPT
fi


