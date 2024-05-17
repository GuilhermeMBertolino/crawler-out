#!/bin/sh

usage() {
	echo "Usage: $0 <countrycode>"
}

set_ccode() {
	CCODE_CURRENT=$(iwpriv wifi0 getCountryID |  sed 's/wifi0     getCountryID://')
	if [ $CCODE_CURRENT -eq $1 ]; then
		return 0
	fi

	RADIO_CONF=/etc/sysinit/radio.conf
	RADIO_CONF_NEW=/etc/sysinit/radio.conf.new

	killall -USR1 ustatsd

	sed "/umtd/s/^/#/" -i /etc/inittab
	sed "/wpa_supplicant/s/^/#/" -i /etc/inittab
	sed "/hostapd/s/^/#/" -i /etc/inittab
	kill -1 1

	/usr/etc/init.d/plugin stop umtd
	/usr/etc/init.d/plugin stop wpasupplicant
	/usr/etc/init.d/plugin stop aaa

	while ps | grep -q -E "[h]ostapd.*aaa|[w]pa_supplicant|[u]mtd"; do sleep 1; done

	/usr/etc/init.d/plugin stop radio
	/usr/bin/garp

	/usr/bin/sed "s/regdomain [0-9]*/regdomain $1/g" $RADIO_CONF > $RADIO_CONF_NEW
	/usr/bin/mv $RADIO_CONF_NEW $RADIO_CONF

	/usr/bin/sed "s/setCountryID [0-9]*/setCountryID $1/g" $RADIO_CONF > $RADIO_CONF_NEW
	/usr/bin/mv $RADIO_CONF_NEW $RADIO_CONF

	/usr/etc/init.d/plugin start radio

	ifconfig wlan0 up
	ifconfig ath0 up

	sed "/hostapd/s/^#//" -i /etc/inittab
	sed "/wpa_supplicant/s/^#//" -i /etc/inittab
	sed "/umtd/s/^#//" -i /etc/inittab
	kill -1 1

	killall -USR2 ustatsd

	/usr/bin/garp
}

save_cfg() {
	CFG_SYSTEM="/tmp/system.cfg"
	CFG_SYSTEM_SORTED="/tmp/.system.cfg.$$"
	CFG_RUNNING="/tmp/running.cfg"

	sort $CFG_SYSTEM > $CFG_SYSTEM_SORTED
	cp $CFG_SYSTEM_SORTED $CFG_RUNNING
	cp $CFG_SYSTEM_SORTED $CFG_SYSTEM
	bgnd -r cfgmtd -e $CFG_SYSTEM_SORTED \
		-- /sbin/cfgmtd -w -f $CFG_SYSTEM_SORTED \
		-p /etc/ 2>/dev/null &
}

if [ $# -lt 1 ]; then
	usage
	exit 254
fi

set_ccode $*
save_cfg

exit 0
