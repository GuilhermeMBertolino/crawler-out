#!/bin/sh

# Install xunyou files and start xunyou daemon
sku=`cat /proc/environment/sku`
if [ $sku == "PR" ]; then
    if [ ! -f "/data/xunyou" ]; then
        tar -xzf /etc/xunyou_plugin.tar.gz -C /data
    fi

    routerMode="`getdb -r`"
    if [ $routerMode == "router" ]; then
        cd /data/xunyou
        ./xunyou_daemon.sh start
        cd -
    fi
fi