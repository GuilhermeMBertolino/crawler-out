#!/bin/sh
# Let interfaces become non-host, kernel will not send router solicit or handle router advertisement
# To do so, just set forwarding to 1 (tom, 20130625)
echo 1 > /proc/sys/net/ipv6/conf/default/forwarding
echo 2 > /proc/sys/net/ipv6/conf/default/accept_dad
echo 1 > /proc/sys/net/ipv6/conf/default/disable_ipv6
 
# Alphanetworks, HuanYao: Set default policy as ACCEPT to start enable IPv6 routing. 
# We set default policy as DROP in S16ipv6.sh.
# Bug Fix for IPv6 firewall will not work when set allow only in UI.
# If DUT boot up, the conntrack will be established once the Internet is connected.
echo "Set DEFAULT policy as DROP." > /dev/console 
ip6tables -P FORWARD DROP

