#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 avirasentinelfull

echo "Stop the service"
/etc/init.d/avirasentinelfull stop
killall avirasentinelfull

echo "Remove binary files"
rm -rf /usr/bin/avira/avirasentinelfull

echo "Remove configuration files"
rm -rf /usr/share/.avira/avirasentinelfull

echo "Remove reg&auth files"
rm -rf /tmp/.avira/avirasentinelfull

echo "Disable the service"
/etc/init.d/avirasentinelfull disable
rm /etc/init.d/avirasentinelfull
exit 0