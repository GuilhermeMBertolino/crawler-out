#!/bin/sh
# check if loaddefault
IS_DEFAULT=$(nvram get blank_state)
if ( test $IS_DEFAULT = "1" ); then
    echo "[loaddefault] remove w2p5 environment setting";\
    echo "w2p5=0" > /proc/nvram/set
fi

wan_2p5=$(cat /proc/environment/w2p5)
if [ -z $wan_2p5 ]; then
	wan_2p5=0
fi

if [ $wan_2p5 = 1 ]; then
	echo "===w2p5=========RC use 2dot5G as WAN"
	ethctl eth0 phy-crossbar port 9
	ethctl eth5 phy-crossbar port 10
else
	echo "===w2p5=========RC use 2dot5G as LAN"
	# do nothing
fi

