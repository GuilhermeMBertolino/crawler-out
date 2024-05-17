#!/bin/sh

wrcsman "0x80070002 1"
rc=2

if [ "$1" != "" ]
then
	NTP $1
else
	NTP
fi

[ $? -ne 0 ] && rc=3
wrcsman "0x80070002 $rc"

exit $rc

