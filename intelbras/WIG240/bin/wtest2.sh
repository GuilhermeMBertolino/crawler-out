#!/bin/sh
#
# script file to start Wlan interface
#
# Usage: wtest2.sh
#
# written by Eason 2006/3/17 08:29¤W¤È
#
echo "WLAN INTERFACE IS ENABLED!!"
flash set WLAN_DISABLED 0
init.sh gw bridge
webs&
#init.sh ap wan
