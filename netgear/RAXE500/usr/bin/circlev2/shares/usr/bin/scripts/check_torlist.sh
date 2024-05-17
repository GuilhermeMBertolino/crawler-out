#!/bin/sh
# Copyright (c) 2018-2020 Circle Media Labs Inc.

if [ -z $CIRCLE_TMP ]; then
	echo "env variable CIRCLE_TMP not set"
	exit 1
fi
if [ -z $CIRCLE_ROOT ]; then
	echo "env variable CIRCLE_ROOT not set"
	exit 1
fi
if [ -z $CIRCLE_DATA ]; then
	echo "env variable CIRCLE_DATA not set"
	exit 1
fi
if [ -z $CIRCLE_BASE ]; then
	echo "env variable CIRCLE_BASE not set"
	exit 1
fi
. ${CIRCLE_ROOT}/scripts/dlvars.sh

TORVER=`cat $CIRCLE_TMP/torlist.ver`

rm -f $CIRCLE_TMP/torlist.new.tgz
${CURL} ${CURLOPTS} --max-time 30 -o $CIRCLE_TMP/torlist.new.tgz -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" "https://$DOWNLOAD_CLOUD/dev/firmware/get_torlist.php?DEVID=$MAC&VER=$TORVER&SIG=1" || exit
if [ -s $CIRCLE_TMP/torlist.new.tgz ]; then
	echo "Downloaded torlist ver $TORVER"
	cd $CIRCLE_TMP
	gunzip -c $CIRCLE_TMP/torlist.new.tgz | tar xf - torlist torlist.ver
	if [ -s $CIRCLE_TMP/torlist ]; then
		$CIRCLE_ROOT/ipsetload torlist $CIRCLE_TMP/torlist
		echo "Splitting torlist into IPv4 and IPv6 addresses"
		ipv4_regex="([0-9]{1,3}[\.]){3}[0-9]{1,3}"
		cat $CIRCLE_TMP/torlist | grep -E -o $ipv4_regex > $CIRCLE_TMP/torlistv4
		cat $CIRCLE_TMP/torlist | grep -E -v $ipv4_regex > $CIRCLE_TMP/torlistv6

		echo "Loading IPv4 torlist addresses into torlist ipset"
		$CIRCLE_ROOT/ipsetload torlist $CIRCLE_TMP/torlistv4

		echo "Loading IPv6 torlist addresses into torlistv6 ipset"
		$CIRCLE_ROOT/ipsetload torlistv6 $CIRCLE_TMP/torlistv6
	fi

	rm -f $CIRCLE_TMP/torlist.new.tgz
	echo "Installed torlist $TORVER successfully"
fi
