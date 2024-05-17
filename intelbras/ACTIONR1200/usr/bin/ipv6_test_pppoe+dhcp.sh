#!/bin/sh
# utf-8 coding

#
# 使用lab环境PPPOE+dhcp测试的脚本，主要就是设置cfm值，llm
#

# 以shell脚本的形式测试
if [ $1 == shell ]; then

    # 设置cfm值
    cfm set ipv6.wan.type 1pppoe       
    cfm set ipv6.wan.d6c.iapd 1
    cfm set ipv6.wan.d6c.iana 1 

    cfm set ipv6.wan.pppoe.username intelbras
    cfm set ipv6.wan.pppoe.password intelbras

    # 这里可以起lan侧服务也可以不用起，反正会在dhcp6up时重启lan服务

    # 重启PPP进程
    start_pppoe_ipv6.sh &

else  # 以发消息的形式测试

    # 设置cfm值
    cfm set ipv6.wan.type 1pppoe       
    cfm set ipv6.wan.d6c.iapd 1
    cfm set ipv6.wan.d6c.iana 1 

    cfm set ipv6.wan.pppoe.username intelbras
    cfm set ipv6.wan.pppoe.password intelbras

    # 进行wan重连
    cfm post wan6Ctrl WANCFGCHANGE
fi