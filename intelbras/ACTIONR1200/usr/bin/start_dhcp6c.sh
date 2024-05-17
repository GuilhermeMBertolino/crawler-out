#!/bin/sh
# utf-8 coding

#
# 启动dhcp6c脚本，llm
# 根据cfm变量配置dhcp6c.conf，然后启动dhcp6c
# ipv6.wan.d6c.iana=0   无状态配置
# ipv6.wan.d6c.iapd=1   前缀代理

IFNAME=$1

if [[ -z ${IFNAME} ]]; then
    IFNAME="vlan2"
    echo "default ifname vlan2"    
fi

# 写配置文件
CONFIG_PATH=/etc/dhcp6c.conf
IA_NA=`cfm get ipv6.wan.d6c.iana`
IA_PD=`cfm get ipv6.wan.d6c.iapd`

echo "# dhcp6c config file"                         > ${CONFIG_PATH}
echo "interface ${IFNAME}{"                         >> ${CONFIG_PATH}
echo "    request domain-name;"                     >> ${CONFIG_PATH}
echo "    request domain-name-servers;"             >> ${CONFIG_PATH}
echo "    script \"/usr/bin/dhcp6c_up.sh\";"        >> ${CONFIG_PATH}
if [ "${IA_NA}" == "1" ]; then
    echo "    send ia-na 1;"                        >> ${CONFIG_PATH}
fi
if [ "${IA_PD}" == "1" ]; then
    echo "    send ia-pd 0;"                        >> ${CONFIG_PATH}
fi
echo "};"                                           >> ${CONFIG_PATH}

echo "id-assoc na 1{"                               >> ${CONFIG_PATH}
echo "};"                                           >> ${CONFIG_PATH}
echo "id-assoc pd 0{"                               >> ${CONFIG_PATH}
echo "    prefix-interface br0{"                    >> ${CONFIG_PATH}
echo "        sla-id 0;"                            >> ${CONFIG_PATH}
echo "        sla-len 0;"                           >> ${CONFIG_PATH}
echo "    };"                                       >> ${CONFIG_PATH}
echo "};"                                           >> ${CONFIG_PATH}

killall -9 dhcp6c
dhcp6c ${IFNAME} -d &
