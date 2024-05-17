#!/bin/sh
#
# $Id: //WIFI_SOC/release/SDK_4_1_0_0/source/user/rt2880_app/scripts/system.sh#1 $
#
# usage: system.sh
#

#CLOSE_WAIT
echo 120 > /proc/sys/net/ipv4/tcp_keepalive_time
echo 3 > /proc/sys/net/ipv4/tcp_keepalive_intvl
echo 2 > /proc/sys/net/ipv4/tcp_keepalive_probes

echo 4096 > /proc/sys/vm/min_free_kbytes
echo 600 > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_established 
echo 4096 > /proc/sys/net/ipv4/netfilter/ip_conntrack_max
#echo 4096 > /proc/sys/net/ipv4/ip_conntrack_max 
echo 120 > /proc/sys/net/ipv4/netfilter/ip_conntrack_generic_timeout 
echo 15 > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_syn_recv
echo 60 > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_fin_wait 
echo 2 > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_max_retrans 
echo 6 > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_syn_recv 
#优化网络设置接收队列 
echo 3000 > /proc/sys/net/core/netdev_max_backlog
#打开TIME-WAIT套接字重用功能，对于存在大量连接的WEB服务器非常有效 
echo 1 > /proc/sys/net/ipv4/tcp_tw_reuse 
echo 1 > /proc/sys/net/ipv4/tcp_tw_recycle 
#减少处于FIN-WAIT-2连接状态的时间，使系统可以处理更多的连接 
echo 30 > /proc/sys/net/ipv4/tcp_fin_timeout 
#减少TCP KeepAlive边接侦测的时间，使系统可以处理更多的连接。 
#echo 1800 > /proc/sys/net/ipv4/tcp_keepalive_time 
#增加TCP SYN队列长度，使系统可以处理更多的并发连接。 
echo 8192 > /proc/sys/net/ipv4/tcp_max_syn_backlog


