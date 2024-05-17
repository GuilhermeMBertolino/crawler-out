#!/bin/sh

WIFIMODE=$1
CHANBW=$2
IEEEMODE=$3
PTP=$4

if [ -z $PTP ]; then
	PTP=1
fi

insmod ubond is_ptp=$PTP
insmod asf
insmod qdf
insmod ath_spectral
insmod mem_manager
insmod umac
insmod ath_dfs
insmod ath_hal
insmod ath_rate_atheros
insmod ath_dev
insmod qca_da
insmod ath_pktlog
insmod qca_ol tgdeb=0 is_ubnt_ptp=$PTP

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

sleep 1

if [ $PTP -eq 1 ]; then
	echo 1 > /proc/net/is_ubnt_ptp
else
	echo 0 > /proc/net/is_ubnt_ptp
fi

PTP_ADDR=`ethtool -P ath0 | cut -d ' ' -f 3`
echo $PTP_ADDR > /proc/net/ubnt_board_mac
