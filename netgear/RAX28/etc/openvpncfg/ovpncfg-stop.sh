#!/bin/sh

echo "wan interface name = " $1

killall openvpn >/dev/null 2>&1
ip link delete tun0 >/dev/null 2>&1
ip link delete tap0 >/dev/null 2>&1

iptables -w -D INPUT -j FW_OPENVPN_INPUT || true
iptables -w -F FW_OPENVPN_INPUT

# KKHuang: Prevent packets from going to DMZ host
iptables -w -t nat -F FW_NAT_PREROUTING_VPN

iptables -w -X FW_OPENVPN_INPUT

iptables -w -t nat -D POSTROUTING -s 192.168.254.0/24 -o $1 -j MASQUERADE

fc flush

