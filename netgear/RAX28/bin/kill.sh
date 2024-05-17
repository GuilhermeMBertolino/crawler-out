#!/bin/sh

wl -i wl0 down
wl -i wl1 down
wl -i wl2 down

ifconfig eth0 down
ifconfig eth1 down
ifconfig eth2 down
ifconfig eth3 down

#kill apps who is going to bring up others
wdtctl -d stop
killall debug_monitor


# stop armor
/data/bitdefender/bin/bd stop

APPS="nmbd crond rex_statusd ntgr_trafficmeter smbd upnp urlfilterd hostapd radvd pudalcb"

for app in $APPS
do
    echo "kill process $app...."
    killall -SIGTERM $app
done

