#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 avirasentinellite

echo "Stop the service"
/etc/init.d/avirasentinellite stop
killall avirasentinellite

echo "Remove binary files"
rm -rf /usr/bin/avira/avirasentinellite

echo "Remove configuration files"
rm -rf /usr/share/.avira/avirasentinellite

echo "Remove reg&auth files"
rm -rf /tmp/.avira/avirasentinellite

echo "Disable the service"
/etc/init.d/avirasentinellite disable
rm /etc/init.d/avirasentinellite
exit 0