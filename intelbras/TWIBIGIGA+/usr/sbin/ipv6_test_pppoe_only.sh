#!/bin/sh
# utf-8 coding

#
# 使用lab环境PPPOE-only测试的脚本，主要就是设置cfm值，llm
#

# 以shell脚本的形式测试
if [ $1 == shell ]; then

    # 设置cfm值
    cfm set ipv6.wan.type 1pppoe       
    cfm set ipv6.wan.d6c.iapd 0
    cfm set ipv6.wan.d6c.iana 1 

    cfm set ipv6.lan.addr 2001:5:1:1234::1
    cfm set ipv6.lan.prefix 2001:5:1:1234::
    cfm set ipv6.lan.prefix_len 64

    cfm set ipv6.lan.auto_dns 0
    cfm set ipv6.lan.dns1 2001:2::2
    cfm set ipv6.lan.dns2 "" 

    cfm set ipv6.wan.pppoe.username intelbras
    cfm set ipv6.wan.pppoe.password intelbras

    # 启动lan侧的服务
    start_radvd.sh
    start_dhcp6s.sh

    # 重启ppp进程
    start_pppoe_ipv6.sh

else  # 以发消息的形式测试

    # 设置cfm值
    cfm set ipv6.wan.type 1pppoe       
    cfm set ipv6.wan.d6c.iapd 0
    cfm set ipv6.wan.d6c.iana 1 

    cfm set ipv6.lan.addr 2001:5:1:1234::1
    cfm set ipv6.lan.prefix 2001:5:1:1234::
    cfm set ipv6.lan.prefix_len 64

    cfm set ipv6.lan.auto_dns 0
    cfm set ipv6.lan.dns1 2001:2::2
    cfm set ipv6.lan.dns2 "" 

    cfm set ipv6.wan.pppoe.username intelbras
    cfm set ipv6.wan.pppoe.password intelbras

    # 重启LAN服务
    cfm post wan6Ctrl LANCFGCHANGE

    # 进行wan重连
    cfm post wan6Ctrl WANCFGCHANGE

fi