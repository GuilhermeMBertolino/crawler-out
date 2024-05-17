#!/bin/sh 
#wait for br-lan ready
br_ready=0
while [ $br_ready -eq 0 ]
do
        if [ -e /proc/sys/net/ipv4/neigh/br-lan/ucast_solicit ]; then
            br_ready=1
        fi

        usleep 500000
done

#change br-lan setting to reduce the deleting neigh timing
#echo -e "\033[31mneigh_probe_reduce....\033[0" > /dev/console
echo 3 > /proc/sys/net/ipv4/neigh/default/gc_thresh1

echo 1 > /proc/sys/net/ipv4/neigh/br-lan/ucast_solicit
echo 1 > /proc/sys/net/ipv4/neigh/br-lan/mcast_solicit
echo 1 > /proc/sys/net/ipv4/neigh/br-lan/delay_first_probe_time
echo 10 > /proc/sys/net/ipv4/neigh/br-lan/gc_stale_time
echo 30 > /proc/sys/net/ipv4/neigh/br-lan/base_reachable_time
 
