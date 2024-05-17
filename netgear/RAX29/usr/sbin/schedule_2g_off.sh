#!/bin/sh
#
# For PEGA_REX 2.4G is wl1, RAX30 2.4G is wl0
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl0_radio)
if [ "$RADIO_STATUS" == "1" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 2G off" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 2.4GHz signal is OFF
	touch /tmp/wifi_sch_off_2.4G
	nvram set wl0_radio=0
	nvram commit restart
fi
