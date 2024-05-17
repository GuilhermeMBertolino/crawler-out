#!/bin/sh
#
# For RAXE300 2G is wl1, 5G is wl0, 6G is wl2
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl0_radio)
if [ "$RADIO_STATUS" == "0" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 5G On" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 5GHz signal is ON
	rm -f /tmp/wifi_sch_off_5G
	nvram set wl0_radio=1
	nvram commit restart
fi
