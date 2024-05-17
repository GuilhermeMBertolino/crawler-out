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

