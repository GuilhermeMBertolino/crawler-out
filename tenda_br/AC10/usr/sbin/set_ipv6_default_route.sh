#!/bin/sh
# utf-8 coding

# 设置默认路由的脚本,传入两个参数，一个是wan接口名，一个是默认路由的地址
# llm

WAN_IFNAME=$1
ADDR=$2

if [[ -z ${WAN_IFNAME} ]] || [[ -z ${ADDR} ]]; then
    echo "args err!"
    exit 0    
fi


# 判断一下是否有默认路由
# default via fe80::d096:4eff:fe6c:8d72 dev eth1  metric 1024  mtu 1500 advmss 1440 hoplimit 4294967295
DEFAULT_ROUTE=`ip -6 route | grep default | awk '{print $3}'`
if [[ "${DEFAULT_ROUTE}" != "${ADDR}" ]]; then
    echo "ipv6 change default route: ${ADDR}"
    ip -6 route del default
    ip -6 route add default via ${ADDR} dev ${WAN_IFNAME}
fi

