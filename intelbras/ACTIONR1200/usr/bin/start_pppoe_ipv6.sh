#!/bin/sh
# utf-8 coding

#
# ipv6的wan配置为PPPOE时的处理脚本，llm
# 

IFNAME=$1

if [[ -z ${IFNAME} ]]; then
    IFNAME="vlan2"
    echo "default ifname vlan2"    
fi


USERNAME=`cfm get ipv6.wan.pppoe.username`
PASSWORD=`cfm get ipv6.wan.pppoe.password`

OPTIONS_CONFIG="/etc/ppp/option.wan.ipv6"
LOG_FILE="/var/pppoev6.log"

# 生成配置文件

echo "
noauth
logfile ${LOG_FILE}
user \"${USERNAME}\"
password \"${PASSWORD}\"
dump
debug
hide-password
# noipdefault
nodetach
usepeerdns
# mru 1480
# mtu 1480
unit 1
ipv6cp-accept-local
lcp-echo-failure 8
lcp-echo-interval 20
plugin /lib/rp-pppoe.so ${IFNAME}
+ipv6
persist
" > ${OPTIONS_CONFIG}

# 重启进程
killall -9 pppd_ipv6
pppd_ipv6 file ${OPTIONS_CONFIG} &




