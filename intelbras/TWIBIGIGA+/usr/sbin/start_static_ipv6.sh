#!/bin/sh
# utf-8 coding

#
# ipv6的wan配置为静态时的处理脚本，llm
# 

IFNAME=$1

if [[ -z ${IFNAME} ]]; then
    IFNAME="eth1"
    echo "default ifname eth1"    
fi

# 静态的时候似乎这里不需要做什么
# 1. 配置一下wan口地址，默认路由（虽然大多数情况配置这个路由是无效的操作）
# 2. 配置一下resolv.conf
# 3. 启动dhcp6s和radvd

WAN_ROUTE=`cfm get ipv6.wan.route`
WAN_ADDR=`cfm get ipv6.wan.addr`
WAN_PREFIX_LEN=`cfm get ipv6.wan.prefix_len`
WAN_DNS1=`cfm get ipv6.wan.dns1`
WAN_DNS2=`cfm get ipv6.wan.dns2`

# 设置wan ip
ip -6 addr add ${WAN_ADDR}/${WAN_PREFIX_LEN} dev ${IFNAME}

# 设置默认路由
set_ipv6_default_route.sh ${IFNAME} ${WAN_ROUTE}

# 设置dns
set_ipv6_dns.sh ${WAN_DNS1} ${WAN_DNS2}

# 启动dhcp6s
start_dhcp6s.sh br0

# 启动radvd
start_radvd.sh br0

