#!/bin/sh

echo "wan interface name = " $1

killall openvpn >/dev/null 2>&1
ip link delete tun0 >/dev/null 2>&1
ip link delete tap0 >/dev/null 2>&1



