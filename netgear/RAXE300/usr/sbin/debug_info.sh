#!/bin/sh

FLASH_USAGE=`ubinfo /dev/ubi0 | grep "Total amount of" | awk -F ' ' '{printf $9}'`
FLASH_TOTAL="256MB"
MAX_SESSIONS=`cat /proc/sys/net/netfilter/nf_conntrack_max | awk -F ' ' '{printf $1}'`
CUR_SESSIONS=`cat /proc/sys/net/netfilter/nf_conntrack_count | awk -F ' ' '{printf $1}'`
MEMORY_TOTAL=`cat /proc/meminfo | grep "MemTotal:" | awk -F ' ' '{printf int(($2)/1024)}'`
MEMORY_USAGE=`top -n 1 | grep "Mem" | awk -F ' ' '{printf int($2/1024)}'`
SYSTEM_UPTIME=`uptime`
SKU=`cat /proc/environment/sku`
CPU_USAGE=`mpstat -P ALL -u | tail -n +5 | awk '{print (100-$12)}'`
CPU1_USAGE=`echo $CPU_USAGE | cut -d' ' -f1`
CPU2_USAGE=`echo $CPU_USAGE | cut -d' ' -f2`
CPU3_USAGE=`echo $CPU_USAGE | cut -d' ' -f3`
WLAN_DRIVER_VER=`wl ver | head -n 1 | xargs echo -n`
echo "FLASH_USAGE=$FLASH_USAGE" > /var/debug_info
echo "MAX_SESSIONS=$MAX_SESSIONS" >> /var/debug_info
echo "CUR_SESSIONS=$CUR_SESSIONS" >> /var/debug_info
echo "MEMORY_TOTAL=$MEMORY_TOTAL" >> /var/debug_info
echo "MEMORY_USAGE=$MEMORY_USAGE" >> /var/debug_info
echo "SYSTEM_UPTIME=$SYSTEM_UPTIME" >> /var/debug_info
echo "SKU=$SKU" >> /var/debug_info
echo "CPU1_USAGE=$CPU1_USAGE" >> /var/debug_info
echo "CPU2_USAGE=$CPU2_USAGE" >> /var/debug_info
echo "CPU3_USAGE=$CPU3_USAGE" >> /var/debug_info
echo "WLAN_DRIVER_VER=$WLAN_DRIVER_VER" >> /var/debug_info
