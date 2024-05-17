#!/bin/sh
# utf-8 coding

#
# ipv6的tunnel 6to4 脚本
# 

#获取参数
TUN_LOCAL_IP=`cfm get ipv6.tun6to4.localip`
TUN_INF_IPV6=`cfm get ipv6.tun6to4.itfip`

#设置隧道

ip tunnel add 6to4 mode sit remote any local ${TUN_LOCAL_IP} ttl 255
ip link set 6to4 up
ip addr add ${TUN_INF_IPV6}/16 dev 6to4
ip -6 route del default
ip -6 route add ::/0 dev 6to4

# 启动dhcp6s
start_dhcp6s.sh br0

# 启动radvd
#start_radvd.sh br0

