#!/bin/sh

#=============================================================================
# smp_affinity: 1 = CPU1, 2 = CPU2, 3 = CPU3, 4 = CPU4
# rps_cpus: wxyz = CPU3 CPU2 CPU1 CPU0 (ex:0xd = 0'b1101 = CPU1, CPU3, CPU4)
#=============================================================================

#. /sbin/config.sh

OPTIMIZED_FOR="wifi"
#LIST=`cat /proc/interrupts | sed -n '1p'`
#NUM_OF_CPU=0; for i in $LIST; do NUM_OF_CPU=`expr $NUM_OF_CPU + 1`; done;
NUM_OF_CPU=4

#wifiChannel1=`nvram_get 2860 Channel`
#wifiChannel2=`nvram_get rtdev Channel`
#if [ "$wifiChannel1" -gt "14" ]; then
#        wifiDomain1="5G"
#        echo "Wi-Fi(1): 5G"
#else
#        wifiDomain1="2_4G"
#        echo "Wi-Fi(1): 2.4G"
#fi
#
#if [ "$wifiChannel2" -gt "14" ]; then
#        wifiDomain2="5G"
#        echo "Wi-Fi(2): 5G"
#else
#        wifiDomain2="2_4G"
#        echo "Wi-Fi(2): 2.4G"
#fi

# wifiDomain1=`uci get wireless.@wifi-device[0].band`
# wifiDomain2=`uci get wireless.@wifi-device[1].band`
wifiDomain1="5G"
wifiDomain2="2_4G"

case `cat /proc/cpuinfo | grep MT76` in
  *7621*)
    CONFIG_RALINK_MT7621=y
    ;;
  *7623*)
    CONFIG_ARCH_MT7623=y
    ;;
esac

echo "OPTIMIZED_FOR -> $OPTIMIZED_FOR"
echo "NUM_OF_CPU -> $NUM_OF_CPU"
echo "wifiDomain1 -> $wifiDomain1"
echo "wifiDomain2 -> $wifiDomain2"
echo "CONFIG_RALINK_MT7621 -> $CONFIG_RALINK_MT7621"
echo "CONFIG_ARCH_MT7623 -> $CONFIG_ARCH_MT7623"

#
# $1 - value
# $2 - proc path
#
write_proc() {
	[ -f $2 ] && {
		echo $1 > $2
		echo -n $1 ">" $2, "= "
		cat $2
	}
}

echo 2 > /proc/irq/3/smp_affinity  #GMAC
echo 4 > /proc/irq/4/smp_affinity  #PCIe0
echo 8 > /proc/irq/24/smp_affinity #PCIe1
echo 8 > /proc/irq/25/smp_affinity #PCIe2
echo 8 > /proc/irq/19/smp_affinity #VPN
echo 8 > /proc/irq/20/smp_affinity #SDXC
echo 4 > /proc/irq/22/smp_affinity #USB

echo 3 > /sys/class/net/ra0/queues/rx-0/rps_cpus
echo "ra0 RPS: CPU0/1"
echo 5 > /sys/class/net/rai0/queues/rx-0/rps_cpus
echo "rai0 RPS: CPU0/2"
echo 3 > /sys/class/net/apcli0/queues/rx-0/rps_cpus
echo 5 > /sys/class/net/apclii0/queues/rx-0/rps_cpus

echo 9 > /sys/class/net/eth0/queues/rx-0/rps_cpus
echo 9 > /sys/class/net/eth1/queues/rx-0/rps_cpus

echo 3 > /sys/class/net/wwan0/queues/rx-0/rps_cpus
echo "wwan0 RPS: CPU0/1"

echo 9 > /sys/class/net/eth0/queues/rx-0/rps_cpus
echo "eth0/1 RPS: CPU0/3"

#echo 5 > /sys/class/net/eth0/queues/rx-0/rps_cpus
#echo 5 > /sys/class/net/eth1/queues/rx-0/rps_cpus
#echo "eth0 RPS: CPU0/CPU2"