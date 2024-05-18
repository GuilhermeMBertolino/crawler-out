#!/bin/sh
# utf-8 coding

#配置dns
cfm set ipv6.lan.dns1 2001:2::3
cfm set ipv6.lan.dns2 2001:2::4
#设置lan侧为手动dns服务器，如果需要配置成自动dns则设置为1
cfm set ipv6.lan.auto_dns 0

#lan侧设置为无状态服务端，如果需要配置成有状态则设置为0
cfm set ipv6.lan.d6s.stateless 1

#配置lan侧前缀和前缀长度，但是这个前缀是否使用取决于前缀代理是否开启，前缀代理的值是ipv6.wan.d6c.iapd
cfm set ipv6.lan.prefix 2001:3::
cfm set ipv6.lan.prefix_len 64

#设置这个值可以让lan侧的物理口down一下
cfm set ipv6.lan.phy.restart 1

#通知netctrl重启ipv6 lan侧服务
cfm post netctrl 67?op=11
