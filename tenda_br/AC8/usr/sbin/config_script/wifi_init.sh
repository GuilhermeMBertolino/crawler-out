#!/bin/sh
# utf-8 coding

wcli -c band wlan0 wlan1


brctl addif br0 wlan1
brctl addif br0 wlan0
