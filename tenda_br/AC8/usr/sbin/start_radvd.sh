#!/bin/sh
# utf-8 coding

# radvd启动脚本
# llm

LAN_IFNAME=$1

if [[ -z ${LAN_IFNAME} ]]; then
    LAN_IFNAME="br0"
    echo "default lan ifname br0"    
fi

IA_PD=`cfm get ipv6.wan.d6c.iapd`
LAN_PREFIX=`cfm get ipv6.lan.prefix`
WAN_PD_PREFIX=`cfm get ipv6.wan.pd_prefix`
WAN_PD_PREFIX_LEN=`cfm get ipv6.wan.pd_prefix_len`
LAN_AUTO_ADDR=`cfm get ipv6.lan.addr_auto`
LAN_ADDR=`cfm get ipv6.lan.addr`
LAN_ADDR_PREFIX_LEN=`cfm get ipv6.lan.addr_prefix_len`
LAN_PREFIX_LEN=`cfm get ipv6.lan.prefix_len`
DHCP6S_STATELESS=`cfm get ipv6.lan.d6s.stateless`
LAN_AUTO_DNS=`cfm get ipv6.lan.auto_dns`
LAN_DNS1=`cfm get ipv6.lan.dns1`
LAN_DNS2=`cfm get ipv6.lan.dns2`
WAN_AUTO_DNS=`cfm get ipv6.wan.auto_dns`
WAN_DNS1=`cfm get ipv6.wan.dns1`
WAN_DNS2=`cfm get ipv6.wan.dns2`

# 如果有手动设置地址，那么配置这个地址
if [ "${LAN_AUTO_ADDR}" == "0" ]; then
    ip -6 addr add ${LAN_ADDR}/${LAN_ADDR_PREFIX_LEN} dev ${LAN_IFNAME}
fi

# 获取radvd的前缀信息
if [ "${IA_PD}" == "0" ]; then
    # 根据前缀配置EUI64地址
    EUI64=`ifconfig ${LAN_IFNAME} | grep fe80 | awk -F "::" '{print $2}' | awk -F "/" '{print $1}'`

    # 处理::的情况，有时不需要两个冒号，例如前缀为​ 2001:5:1:1234::/64的情况
    count=`echo ${LAN_PREFIX} | awk -F':' '{print NF-1}'`
    if [ "${count}" == "5" ]; then
        # 去掉前缀的最后一个冒号
        ip -6 addr add ${LAN_PREFIX%:}${EUI64}/${LAN_PREFIX_LEN} dev ${LAN_IFNAME}
    else
        ip -6 addr add ${LAN_PREFIX}${EUI64}/${LAN_PREFIX_LEN} dev ${LAN_IFNAME}
    fi

    RADVD_PREFIX=${LAN_PREFIX}
    RADVD_PREFIX_LEN=${LAN_PREFIX_LEN}
else
    # 配置IA_PD的lan地址，有可能在lan service重启时被删掉了
    IA_PD_ADDR=`cat /tmp/dhpc6c_config_${LAN_IFNAME}_addr`
    ip -6 addr add ${IA_PD_ADDR} dev ${LAN_IFNAME}
    RADVD_PREFIX=${WAN_PD_PREFIX}

    # 如果前缀代理的前缀长度小于64，那么强制设置为64,电脑貌似只认64位前缀
    if [ ${WAN_PD_PREFIX_LEN} -lt 64 ]; then
        RADVD_PREFIX_LEN=64
    else
        RADVD_PREFIX_LEN=${WAN_PD_PREFIX_LEN}
    fi
fi

# 如果是自动DNS则配置resolv6.conf里的DNS，否则用手动DNS
if [ "${LAN_AUTO_DNS}" == "1" ]; then
    if [ "${WAN_AUTO_DNS}" == "0" ]; then
        DNS="${WAN_DNS1} ${WAN_DNS2}"
    else
        DNS_TMP=`cat /etc/resolv6.conf | grep ":" | awk '{print $2}'`
        # 多行转为一行
        for item in $DNS_TMP
        do
            DNS="${DNS} ${item}"
        done
    fi
else
    DNS="${LAN_DNS1} ${LAN_DNS2}"
fi

# 写配置文件
CONFIG_PATH=/etc/radvd.conf
echo "# radvd config file"                               >  ${CONFIG_PATH}
echo "interface ${LAN_IFNAME}"                           >> ${CONFIG_PATH}       
echo "{"                                                 >> ${CONFIG_PATH}                   
echo "    AdvSendAdvert on; "                            >> ${CONFIG_PATH}           
echo "    MinRtrAdvInterval 30; "                        >> ${CONFIG_PATH}
echo "    MaxRtrAdvInterval 100; "                       >> ${CONFIG_PATH}
if [ "${DHCP6S_STATELESS}" == "1" ]; then                                     
echo "    AdvManagedFlag off;"                           >> ${CONFIG_PATH} 
else
echo "    AdvManagedFlag on;"                            >> ${CONFIG_PATH}                          
fi                                                                 
echo "    AdvOtherConfigFlag on;"                        >> ${CONFIG_PATH}   
# 加入DNS配置      
echo "    RDNSS ${DNS} {"                                >> ${CONFIG_PATH}  
echo "    };"                                            >> ${CONFIG_PATH}
echo ""                                                  >> ${CONFIG_PATH}                               
echo "    prefix ${RADVD_PREFIX}/${RADVD_PREFIX_LEN}"    >> ${CONFIG_PATH}    
echo "    {"                                             >> ${CONFIG_PATH}                   
echo "        AdvOnLink on;"                             >> ${CONFIG_PATH}
if [ "${DHCP6S_STATELESS}" == "1" ]; then     
echo "        AdvAutonomous on;"                         >> ${CONFIG_PATH}  
else                        
echo "        AdvAutonomous off;"                        >> ${CONFIG_PATH}
fi                               
echo "    };"                                            >> ${CONFIG_PATH}           
echo "};"                                                >> ${CONFIG_PATH}                       

killall -9 radvd
radvd -m logfile -l /var/radvd.log -d 1
