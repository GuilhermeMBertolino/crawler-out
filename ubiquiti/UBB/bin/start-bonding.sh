#!/bin/sh

WIFIMODE=$1
CHANBW=$2
IEEEMODE=$3

PRS_DEVPATH=`find /sys -name prs_attrs`
MACADDR=`ethtool -P eth0 | cut -d ' ' -f 3 | sed "s/://g"`

insmod /lib/modules/4.9.116/asf.ko
insmod /lib/modules/4.9.116/qdf.ko
insmod /lib/modules/4.9.116/ath_spectral.ko
insmod /lib/modules/4.9.116/mem_manager.ko
insmod /lib/modules/4.9.116/umac.ko
insmod /lib/modules/4.9.116/ath_dfs.ko
insmod /lib/modules/4.9.116/ath_hal.ko
insmod /lib/modules/4.9.116/ath_rate_atheros.ko
insmod /lib/modules/4.9.116/ath_dev.ko
insmod /lib/modules/4.9.116/qca_da.ko
insmod /lib/modules/4.9.116/ath_pktlog.ko
insmod /lib/modules/4.9.116/qca_ol.ko tgdeb=0

insmod /lib/modules/4.9.116/prs_falcon.ko PRS_BRIDGE_MODE_ENABLE=1 PRS_NETWORK_ADDRESS=$MACADDR PRS_TX_BIND_CPU=2 PRS_RX_BIND_CPU=3 $DBSC
echo 2 > /proc/irq/196/smp_affinity

sleep 1

iwpriv wifi0 dl_loglevel 2
iwpriv wifi1 dl_loglevel 2

iwpriv wifi0 chanbw $CHANBW
iwpriv wifi0 enable_ol_stats 1

wlanconfig ath0 create wlanmode $WIFIMODE wlandev wifi0
iwpriv ath0 mode $IEEEMODE
iwconfig ath0 essid "darius-gen3-test"
iwconfig ath0 txpower 10
iwpriv ath0 autoassoc 1
iwpriv ath0 wds 1
iwpriv ath0 shortgi 1
iwpriv wifi0 setCountryID 440
iwconfig ath0 chan 0
ifconfig ath0 up

if [ $WIFIMODE == "ap" ]; then
	/usr/bin/hostapd_60g -B /usr/etc/hostapd_60g.cfg
else
	/usr/bin/wpa_supplicant_60g -B -D nl80211 -i wlan0 -c /usr/etc/wpa_60g.cfg
fi

sleep 1

echo 0 > $PRS_DEVPATH/fwlogs

insmod /lib/modules/4.9.116/ubond.ko

MACADDR=`ethtool -P ath0 | cut -d ' ' -f 3`
ifconfig ubond0 hw ether $MACADDR

echo +ath0 > /sys/class/net/ubond0/slave
echo +wlan0 > /sys/class/net/ubond0/slave

brctl addif br0 ubond0
ifconfig ubond0 up

