#!/bin/sh
# utf-8 coding

cfm set ipv6.wan.d6c.iapd 1
#设置ipv6接入方式为pppoev6
cfm set ipv6.wan.type 1pppoe   
#设置ipv6 wan口使用dhcpv6协议获取的dns地址
cfm set ipv6.wan.auto_dns 1
#通知netctrl关闭ipv6模块wan口 
cfm post netctrl 66?op=1
#设置用户名密码
cfm set wan1.ppoe.userid houyinghui
cfm set wan1.ppoe.pwd houyinghui
cfm set wan1.ppoe.mtu 1492
#0表示不开启，1表示开启
cfm set wan1.ppoe.mppe 0
#可选，默认为空
cfm set wan1.ppoe.sev "" 
#可选，默认为空
cfm set wan1.ppoe.ac ""  
#2表示PPPOE接入
cfm set wan1.connecttype 2 
#12表示配置改变消息、1表示wan1、2表示接入类型为PPPOE、0状态机所需，固定为0
cfm post multiWAN 12 1 2 0 
