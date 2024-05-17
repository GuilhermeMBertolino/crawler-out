#!/bin/sh
#
# script file to start Wlan interface
#
# Usage: wstart.sh
#
# written by Eason 2006/2/23 03:39¤U¤È
#
echo "WLAN INTERFACE IS ENABLED!!"
flash set WLAN_DISABLED 0
init.sh gw all
webs&
#init.sh ap wan
