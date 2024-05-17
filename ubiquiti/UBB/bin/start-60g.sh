#!/bin/sh

WIFIMODE=$1
MCS=$2
PTP=$3

if [ -z $MCS ]; then
	MCS=9
fi

if [ -z $PTP ]; then
        PTP=1
fi

PRS_DEVPATH=`find /sys -name prs_attrs`
PRS_ADDR=`ethtool -P eth0 | cut -d ' ' -f 3 | sed "s/://g"`
PTP_ADDR=`ethtool -P eth0 | cut -d ' ' -f 3`

if [ $WIFIMODE == "ap" ]; then
	OPMODE=1
else
	OPMODE=0
fi

if [ $PTP -eq 1 ]; then
	echo 1 > /proc/net/is_ubnt_ptp
	UPOLL=0
else
	echo 0 > /proc/net/is_ubnt_ptp
	UPOLL=1
fi

echo $PTP_ADDR > /proc/net/ubnt_board_mac

MODOPTS="PRS_BRIDGE_MODE_ENABLE=1"
MODOPTS="$MODOPTS PRS_NETWORK_ADDRESS=$PRS_ADDR"
MODOPTS="$MODOPTS PRS_TX_BIND_CPU=2"
MODOPTS="$MODOPTS PRS_RX_BIND_CPU=3"
MODOPTS="$MODOPTS PRS_MAX_MCS=$MCS"
MODOPTS="$MODOPTS PRS_OPMODE=$OPMODE"
MODOPTS="$MODOPTS PRS_IS_PTP=$PTP"
MODOPTS="$MODOPTS PRS_IS_UPOLL=$UPOLL"

echo "PRS module opts: [$MODOPTS]"

insmod lib80211
insmod cfg80211
insmod ubond is_ptp=$PTP
insmod prs_falcon $MODOPTS

echo 2 > /proc/irq/196/smp_affinity

sleep 1

ifconfig wlan0 up

if [ $WIFIMODE == "ap" ]; then
	/usr/bin/hostapd_60g -B /usr/etc/hostapd_60g.cfg
else
	/usr/bin/wpa_supplicant_60g -B -D nl80211 -i wlan0 -c /usr/etc/wpa_60g.cfg
fi
