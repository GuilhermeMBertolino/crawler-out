#!/bin/sh

sed -i '/syslogd/d' /etc/inittab
sed -i '/iwevent/d' /etc/inittab
sed -i '/lighttpd/d' /etc/inittab
sed -i '/ulogger/d' /etc/inittab
sed -i '/ustatsd/d' /etc/inittab
sed -i '/infctld/d' /etc/inittab
sed -i '/umtd/d' /etc/inittab
sed -i '/udapi-bridge/d' /etc/inittab
sed -i '/udapi-server/d' /etc/inittab
sed -i '/ubnt-gps-reader/d' /etc/inittab

kill -1 1

killall syslogd iwevent lighttpd ulogger ustatsd infctld umtd
killall ubnt-gps-reader bgnd dnsmasq provmode udapi-bridge udapi-server

/bin/stop-wifi-hd.sh
/bin/stop-60g.sh

rmmod ubond
rmmod mac80211
rmmod lib80211
rmmod cfg80211
