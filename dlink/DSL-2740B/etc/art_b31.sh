#!/bin/sh

killall -9 hostapd 2>/dev/null
killall -9 wpa_supplicant>/dev/null

ifconfig ath0 down
ifconfig ath1 down
ifconfig ath2 down
ifconfig ath3 down

wlanconfig ath0 destroy
wlanconfig ath1 destroy
wlanconfig ath2 destroy
wlanconfig ath3 destroy

#remove Atheros Carrier modules
rmmod /lib/modules/$KERNELVER/net/11n/wlan_scan_sta.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_scan_ap.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_acl.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_wep.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_tkip.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_ccmp.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan_xauth.ko
rmmod /lib/modules/$KERNELVER/net/11n/ath_pci.ko
rmmod /lib/modules/$KERNELVER/net/11n/ath_rate_atheros.ko
rmmod /lib/modules/$KERNELVER/net/11n/wlan.ko
rmmod /lib/modules/$KERNELVER/net/11n/ath_dfs.ko
rmmod /lib/modules/$KERNELVER/net/11n/ath_hal.ko

#remove Atheros SAG modules
rmmod /lib/modules/$KERNELVER/net/adf.ko
rmmod /lib/modules/$KERNELVER/net/asf.ko
rmmod /lib/modules/$KERNELVER/net/ath_hal.ko
rmmod /lib/modules/$KERNELVER/net/ath_rate_atheros.ko
rmmod /lib/modules/$KERNELVER/net/ath_dfs.ko
rmmod /lib/modules/$KERNELVER/net/ath_dev.ko
rmmod /lib/modules/$KERNELVER/net/umac.ko
rmmod /lib/modules/$KERNELVER/net/ath_pktlog.ko

wget ftp://ayecom:ayecom@192.168.1.111/art.ko -O /var/art.ko
wget ftp://ayecom:ayecom@192.168.1.111/mdk_client.out -O /var/mdk_client.out

chmod 777 /var/art.ko
chmod 777 /var/mdk_client.out
insmod /var/art.ko
/var/mdk_client.out &

