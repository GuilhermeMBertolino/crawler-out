#!/bin/sh
# utf-8 coding

#
# ipv6的tunnel 6in4 脚本
# 

#获取参数
TUN_LOCAL_IP=`cfm get ipv6.tun6rd.localipv4.ip`
TUN_LOCAL_IP_PREFIX=`cfm get ipv6.tun6rd.localipv4.prefix`
TUN_LOCAL_IP_FREFIX_LEN=`cfm get ipv6.tun6rd.localipv4.prefix.len`
TUN_V6NET_PREFIX=`cfm get ipv6.tun6rd.prefixv6`
TUN_V6NET_PREFIX_LEN=`cfm get ipv6.tun6rd.prefixv6.len`
TUN_INF_IPV6=`cfm get ipv6.tun6rd.infip`
TUN_INF_IPV6_PREFIXLEN=`cfm get ipv6.tun6rd.infip.prefix.len`
TUN_ROUTE=`cfm get ipv6.tun6rd.route`

#设置隧道
ip tunnel add 6rd mode sit local ${TUN_LOCAL_IP} ttl 64
ip tunnel 6rd dev 6rd 6rd-prefix ${TUN_V6NET_PREFIX}/${TUN_V6NET_PREFIX_LEN} 6rd-relay_prefix ${TUN_LOCAL_IP_PREFIX}/${TUN_LOCAL_IP_FREFIX_LEN}
ip addr add ${TUN_INF_IPV6}/${TUN_INF_IPV6_PREFIXLEN} dev 6rd
ip link set 6rd up
ip -6 route del default
ip route add ::/0 via ${TUN_ROUTE} dev 6rd


# 启动dhcp6s
start_dhcp6s.sh br0

# 启动radvd
#start_radvd.sh br0

#ip tunnel add 6rd mode sit local 192.168.3.4 ttl 64
#ip tunnel 6rd dev 6rd 6rd-prefix 2001:db8::/32 6rd-relay_prefix 192.168.0.0/16
#ip addr add 2001:db8:0304::c0a8:0304/48 dev 6rd
#ip link set 6rd up
#ip route add ::/0 via ::192.168.2.3 dev 6rd