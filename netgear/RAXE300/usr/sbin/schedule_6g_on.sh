#!/bin/sh
#
# For RAXE300 2G is wl1, 5G is wl0, 6G is wl2
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl2_radio)
if [ "$RADIO_STATUS" == "0" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 6G On" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 6GHz signal is ON
	rm -f /tmp/wifi_sch_off_6G
	nvram set wl2_radio=1
	nvram commit restart
fi
