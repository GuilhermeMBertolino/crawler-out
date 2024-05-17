#!/bin/sh
# utf-8 coding

#
# 设置DNS的脚本,llm
# 

#    这里要考虑什么呢？
#  1. ipv4和ipv6的dns在同一个文件里面，不能相互覆盖
#  2. ipv6的dns需要额外写在resolv6.conf里面，方便配置dhcp6s和radvd时读取
#  3. 写dns前需要先删掉之前的dns记录
#  4. 不能出现两条一样的dns (本脚本暂未进行这个过滤)

# 入参就是dns的列表
DNS_LIST=$@

if [[ -z "${DNS_LIST}" ]]; then
    echo "args err, no dns input!"
    exit 0    
fi

# 现有的ipv4的resolv.conf文件
# ~ # cat /etc/resolv.conf 
# options timeout:1
# options attempts:1
# nameserver 192.168.123.1

# 把iPv4的内容先提取出来
cat /etc/resolv.conf | grep -v nameserver > /tmp/resolv.conf
cat /etc/resolv.conf | grep nameserver | grep -v ":" >> /tmp/resolv.conf

# 把resolv6.conf清空
echo > /etc/resolv6.conf

# 把ipv6的地址弄进去
for DNS in ${DNS_LIST}
do
    echo "nameserver ${DNS}" >> /tmp/resolv.conf
    echo "nameserver ${DNS}" >> /etc/resolv6.conf
done

# 把临时文件拷贝回去
cp /tmp/resolv.conf /etc/resolv.conf

