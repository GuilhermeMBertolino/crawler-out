#!/bin/sh
#
# For PEGA_REX 5G low is wl2, RAX30 5G is wl1
# TODO : Get wl inteface by function or pre-defined macro
#

RADIO_STATUS=$(nvram get wl1_radio)
if [ "$RADIO_STATUS" == "0" ]; then
	date >> /tmp/wifiSch.log; echo "WiFi 5G On" >> /tmp/wifiSch.log
	logger -p local5.warn [Wlan][Wireless signal schedule] The wireless 5GHz signal is ON
	rm -f /tmp/wifi_sch_off_5G
	nvram set wl1_radio=1
	nvram commit restart
fi
