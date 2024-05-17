#!/bin/sh
# $1 : Channel 
# $2 : STA inf
if [ "$1" != "" ]; then
	if [ "$2" = "ath1" ]; then
		iwconfig ath0 channel $1
	elif [ "$2" = "ath3" ]; then
		iwconfig ath2 channel $1
	fi
fi
