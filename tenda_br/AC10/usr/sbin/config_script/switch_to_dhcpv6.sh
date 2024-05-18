#!/bin/sh
# utf-8 coding

cfm set ipv6.wan.d6c.iapd 1
#设置ipv6接入方式为dhcpv6
cfm set ipv6.wan.type 0dhcp   
cfm set ipv6.wan.auto_dns 1
#通知netctrl重启ipv6模块
cfm post netctrl 66?op=5

