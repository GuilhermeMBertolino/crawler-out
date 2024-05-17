#!/bin/sh
# utf-8 coding

#
# 使用lab环境DHCP测试的脚本，主要就是设置cfm值，llm
#

# 以shell脚本的形式测试
if [ $1 == shell ]; then

    # 设置cfm值,开启IAPD和IANA选项，其他全部自动
    cfm set ipv6.wan.type 0dhcp     
    cfm set ipv6.wan.d6c.iapd 1 
    cfm set ipv6.wan.d6c.iana 1

    # 执行启动脚本
    start_dhcp6c.sh eth1

else  # 以发消息的形式测试

    # 设置cfm值,开启IAPD和IANA选项，其他全部自动
    cfm set ipv6.wan.type 0dhcp     
    cfm set ipv6.wan.d6c.iapd 1 
    cfm set ipv6.wan.d6c.iana 1

    # 进行wan重连
    cfm post wan6Ctrl WANCFGCHANGE

fi