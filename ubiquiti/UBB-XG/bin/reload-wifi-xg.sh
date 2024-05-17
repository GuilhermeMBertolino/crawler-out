#!/bin/sh

WIFIMODE=$1

stop-wifi-xg.sh $WIFIMODE

sleep 1

start-wifi-xg.sh $WIFIMODE
