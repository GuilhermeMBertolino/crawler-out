#!/bin/sh
#
# For RAXE300 2G is wl1, 5G is wl0, 6G is wl2
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl1_radio)
if [ "$RADIO_STATUS" == "1" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 2G off" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 2.4GHz signal is OFF
	touch /tmp/wifi_sch_off_2.4G
	nvram set wl1_radio=0
	nvram commit restart
fi
