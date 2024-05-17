#!/bin/sh
#
# For RAXE300 2G is wl1, 5G is wl0, 6G is wl2
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl2_radio)
if [ "$RADIO_STATUS" == "1" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 6G off" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 6GHz signal is OFF
	touch /tmp/wifi_sch_off_6G
	nvram set wl2_radio=0
	nvram commit restart
fi
