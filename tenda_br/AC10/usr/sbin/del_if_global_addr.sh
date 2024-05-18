#!/bin/sh
# utf-8 coding

# 删掉接口的全局IPV6地址
# llm

IFNAME=$1

if [[ -z ${IFNAME} ]] ; then
    echo "args err!"
    exit 0    
fi

# 获取全局地址列表
ADDR_LIST=`ifconfig ${IFNAME} | grep "Scope:Global" | awk '{print $3}'` 

# 逐条删除
for ADDR in ${ADDR_LIST}
do
    ip -6 addr del ${ADDR} dev ${IFNAME}
done
#删除全局地址对应的路由，一般来说在删除全局地址的时候内核会删除对应的路由，
#但是tmd隧道接入的时候eth1接口由ra报文生成的路由在删除地址时不会删除，坑爹啊
for ADDR in ${ADDR_LIST}
do
    ip -6 route del ${ADDR} dev ${IFNAME}
done