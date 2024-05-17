#!/bin/sh
	PID=`pgrep transmission`
	kill $PID
	exit 0