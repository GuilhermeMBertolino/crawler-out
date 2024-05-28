#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 aviraserviceselector

echo "Stop the service"
/etc/init.d/aviraserviceselector stop
killall aviraserviceselector

echo "Remove binary files"
rm -rf /usr/bin/avira/aviraserviceselector

echo "Remove configuration files"
rm -rf /usr/share/.avira/aviraserviceselector

echo "Remove reg&auth files"
rm -rf /tmp/.avira/aviraserviceselector

echo "Disable the service"
/etc/init.d/aviraserviceselector disable
rm /etc/init.d/aviraserviceselector
exit 0