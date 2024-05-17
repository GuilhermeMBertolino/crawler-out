#!/bin/sh

# assume ready state

if [ "$1" = "" ] ; then
    duration=30
else
    duration=$1
fi

# fast blinking 
echo "true" > /proc/ubnthal/status/IsLocated
/usr/bin/syswrapper.sh reload
/usr/bin/sleep $1

# back to READY
echo "false" > /proc/ubnthal/status/IsLocated
/usr/bin/syswrapper.sh reload
