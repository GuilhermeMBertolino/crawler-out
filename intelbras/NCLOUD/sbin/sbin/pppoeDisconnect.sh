#!/bin/sh

killall -q pppd
rm -f /tmp/pppoeConnectPass

PPPFILE=/var/run/ppp0.pid
if [ -r "$PPPFILE" ]; then
  rm -rf $PPPFILE
fi

echo "chenfei"
ifconfig ppp0 down
