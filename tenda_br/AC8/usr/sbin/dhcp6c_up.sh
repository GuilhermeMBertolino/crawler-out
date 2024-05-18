#!/bin/sh
# utf-8 coding

#
# dhcp6c 收到reply后的执行脚本，llm
# dhcp6c可能会设置的环境变量为
# "new_sip_servers"
# "new_sip_name"
# "new_domain_name_servers"
# "new_domain_name"
# "new_ntp_servers"
# "new_nis_servers"
# "new_nis_name"
# "new_nisp_servers"
# "new_nisp_name"
# "new_bcmcs_servers"
# "new_bcmcs_name"
#

RESTART_LAN=0
LAN_AUTO_DNS=`cfm get ipv6.lan.auto_dns`

# 获取DNS
# new_domain_name_servers=2001:2222::1 2001:2222::2
DNS=`env | grep "new_domain_name_servers=" | awk -F '=' '{print $2}'`

# 判断dns是否有更新
# 这次reply的dns是最新的，上一次的dns在/etc/resolv6.conf里面
OLD_DNS=`cat /etc/resolv6.conf | grep "nameserver" | awk '{print $2}'`

# 调试打印
env > /tmp/dhcp6c_up_debug
echo "##OLD_DNS:${OLD_DNS}###" >> /tmp/dhcp6c_up_debug
echo "##NEW_DNS:${DNS}###" >> /tmp/dhcp6c_up_debug


# 注意这个判断里面没有加引号，类似于宽等于
if [ -z ${OLD_DNS} ] || [ ${DNS} != ${OLD_DNS} ]; then
    echo " wan dns change: ${OLD_DNS} >> ${DNS}" > /dev/console
    
    # 总是设置DNS（生成resolve.conf文件），因为插拔网线后，这个resolve.conf文件没有了
    #（不是我删的,怀疑是multiWan删的）
    # 算了吧，总是在我触不及防的地方被删掉，就不管串口能不能ping通域名了,不放外面了
    set_ipv6_dns.sh ${DNS}

    if [ "${LAN_AUTO_DNS}" == "1" ]; then
        RESTART_LAN=1
    fi
fi  


######################################################
# 处理LAN侧
######################################################

IA_PD=`cfm get ipv6.wan.d6c.iapd`
LAN_ADDR=`cfm get ipv6.lan.addr`
#LAN_PREFIX_LEN=`cfm get ipv6.lan.prefix_len`

# 这个是老前缀，最新的前缀在/var/ipv6_wan_status
WAN_PD_PREFIX=`cfm get ipv6.wan.pd_prefix`
WAN_PD_PREFIX_LEN=`cfm get ipv6.wan.pd_prefix_len`

if [ "${IA_PD}" != "0" ]; then
    new_prefix=`cat /var/ipv6_wan_status | grep new_prefix`
    if [ "${new_prefix}" != "" ]; then
        LAN_PREFIX=${new_prefix:11}
    fi
    new_prefix_len=`cat /var/ipv6_wan_status | grep prefix_len`
    if [ "${new_prefix_len}" != "" ]; then
        LAN_PREFIX_LEN=${new_prefix_len:11}
    fi

    # echo "@@@@@@@@@ lan_prefix: ${LAN_PREFIX}@@@@@@@@@@@@@@" >/dev/console
    # 判断前缀和前缀长度是否有变化，有则重启radvd和dhcp6s
    if [ "${LAN_PREFIX}" != "${WAN_PD_PREFIX}" ] \
        || [ "${LAN_PREFIX_LEN}" != "${WAN_PD_PREFIX_LEN}" ]; then
        if [ "${new_prefix}" != "" ] && [ "${new_prefix_len}" != "" ]; then
            cfm set ipv6.wan.pd_prefix ${LAN_PREFIX}
            cfm set ipv6.wan.pd_prefix_len ${LAN_PREFIX_LEN}
            cfm set ipv6.lan.phy.restart "1"
            echo " prefix change: ${WAN_PD_PREFIX}/${WAN_PD_PREFIX_LEN} >> 
                ${LAN_PREFIX}/${LAN_PREFIX_LEN} " > /dev/console
            RESTART_LAN=1
        fi
    fi
fi

if [ "${RESTART_LAN}" == "1" ]; then
    # 重启radvd和dhcp6s
    echo "send msg to netctrl, restart dhcp6s radvd" > /dev/console
	//因为netctrl和wan6ctl合并，直接发送消息到netctrl。
	//其中68=NETCTRL_MODULE_IPV6，11=NETCTRL_MODULE_LAN6_OP_RESTART，注意消息的对应关系
	cfm post netctrl 68?op=11
fi
