#!/bin/sh
echo "Restart the system watchdog"
killall -s SIGUSR1 avirawatchdog

echo "Stop the service"
/etc/init.d/avirawatchdog stop
killall avirawatchdog

echo "Remove binary files"
rm -rf /usr/bin/avira/avirawatchdog

echo "Remove configuration files"
rm -rf /usr/share/.avira/avirawatchdog

echo "Remove reg&auth files"
rm -rf /tmp/.avira/avirawatchdog

echo "Disable the service"
/etc/init.d/avirawatchdog disable
rm /etc/init.d/avirawatchdog
exit 0