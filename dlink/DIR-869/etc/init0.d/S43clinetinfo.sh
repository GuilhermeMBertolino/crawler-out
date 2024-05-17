#!/bin/sh
#this should be after smart 404(S41)...
routermode="`xmldbc -g /device/layout`"

if [ "$routermode" != "router" ] ; then
echo "not enable mydlink in NOT router mode"
exit 0
fi

echo [$0]: $1 ... > /dev/console
if [ "$1" = "start" ]; then
MODE=`xmldbc -g /device/router/mode`
if [ "$MODE" == "1W2L" ] ; then
arpmonitor -i br0 -i br1 &
else
arpmonitor -i br0 &
fi
fi
