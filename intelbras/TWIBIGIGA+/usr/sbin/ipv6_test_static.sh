#!/bin/sh
# utf-8 coding

#
# 使用lab环境静态测试的脚本，主要就是设置cfm值，llm
#

# 以shell脚本的形式测试
if [ $1 == shell ]; then

    # 设置cfm值
    cfm set ipv6.wan.type 2static       
    cfm set ipv6.wan.d6c.iapd 0 
    cfm set ipv6.wan.addr 2001:4::20
    cfm set ipv6.wan.prefix_len 64
    cfm set ipv6.wan.route 2001:4::1
    cfm set ipv6.wan.dns1 2001:2::2 
    cfm set ipv6.wan.dns2 2001:2::3 
    cfm set ipv6.lan.addr 2001:5::1     
    cfm set ipv6.lan.prefix 2001:5:: 
    cfm set ipv6.lan.prefix_len 64

    # 执行启动脚本
    start_static_ipv6.sh eth1

else  # 以发消息的形式测试

    # 设置cfm值
    cfm set ipv6.wan.type 2static       
    cfm set ipv6.wan.d6c.iapd 0 
    cfm set ipv6.wan.addr 2001:4::20
    cfm set ipv6.wan.prefix_len 64
    cfm set ipv6.wan.route 2001:4::1
    cfm set ipv6.wan.auto_dns 0
    cfm set ipv6.wan.dns1 2001:2::2 
    cfm set ipv6.wan.dns2 2001:2::3 
    cfm set ipv6.lan.addr 2001:5::1     
    cfm set ipv6.lan.prefix 2001:5:: 
    cfm set ipv6.lan.prefix_len 64

    # 重启LAN服务
    cfm post wan6Ctrl LANCFGCHANGE

    # 进行wan重连
    cfm post wan6Ctrl WANCFGCHANGE
fi
