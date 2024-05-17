#!/bin/sh
# utf-8 coding

#
# ipv6的tunnel 6in4 脚本
# 

#获取参数
TUN_LOCAL_IP=`cfm get ipv6.tun6in4.localip`
TUN_REMOTE_IP=`cfm get ipv6.tun6in4.remoteip`
TUN_INF_IPV6=`cfm get ipv6.tun6in4.itfip`
TUN_INF_IPV6_PREFIXLEN=`cfm get ipv6.tun6in4.itfiplen`

#设置隧道

ip tunnel add 6in4 mode sit remote ${TUN_REMOTE_IP} local ${TUN_LOCAL_IP} ttl 255
ip link set 6in4 up
ip addr add ${TUN_INF_IPV6}/${TUN_INF_IPV6_PREFIXLEN} dev 6in4
ip -6 route del default
ip -6 route add ::/0 dev 6in4

# 启动dhcp6s
start_dhcp6s.sh br0

# 启动radvd
#start_radvd.sh br0

