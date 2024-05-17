#!/bin/sh

WIFIMODE=$1

stop-wifi-hd.sh $WIFIMODE

sleep 1

start-wifi-hd.sh $WIFIMODE
