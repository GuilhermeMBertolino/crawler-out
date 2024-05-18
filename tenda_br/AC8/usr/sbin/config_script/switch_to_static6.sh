#!/bin/sh
# utf-8 coding
cfm set ipv6.wan.d6c.iapd 0
cfm set ipv6.wan.type 2static
#设置ipv6 wan口地址
cfm set ipv6.wan.addr 2001::123
#设置ipv6 wan口地址前缀长度
cfm set ipv6.wan.prefix_len 64
#设置ipv6 wan口网关地址
cfm set ipv6.wan.route 2001::1
#设置ipv6 wan口不使用dhcpv6获取dns地址
cfm set ipv6.wan.auto_dns 0
#设置ipv6 wan口dns地址
cfm set ipv6.wan.dns1 2001:2::5
cfm post netctrl 66?op=5
