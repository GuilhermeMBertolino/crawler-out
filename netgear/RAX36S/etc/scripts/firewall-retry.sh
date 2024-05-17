#! /bin/sh

NETWALL=/usr/sbin/net-wall

RETRYING=/tmp/cache/netwall/retrying
RETRYCNT=/tmp/cache/netwall/retrycnt
RETRYCMD=/tmp/cache/netwall/retrycmd

firewall_retry()
{
	local trytime
	local waittime=5

	echo $$ > $RETRYING

	[ ! -f "$RETRYCNT" ] && echo 0 > $RETRYCNT

	trytime=$(cat $RETRYCNT)
	let trytime+=1

	if [ $trytime -gt 60 ]; then
		rm -rf $RETRYING
		return
	fi
	echo $trytime > $RETRYCNT

	sleep $waittime

	rm -rf $RETRYING

	if [ -f "$RETRYCMD" ]; then
		local cmd=$(cat $RETRYCMD)
		[ "$cmd" = "start" -o "$cmd" = "stop" ] && $NETWALL $cmd
	fi
}

firewall_v6_retry()
{
	local trytime
	local waittime=5

	echo $$ > ${RETRYING}-v6

	[ ! -f "${RETRYCNT}-v6" ] && echo 0 > ${RETRYCNT}-v6

	trytime=$(cat ${RETRYCNT}-v6)
	let trytime+=1

	if [ $trytime -gt 60 ]; then
		rm -rf ${RETRYING}-v6
		return
	fi
	echo $trytime > ${RETRYCNT}-v6

	sleep $waittime

	rm -rf ${RETRYING}-v6

	if [ -f "${RETRYCMD}-v6" ]; then
		local cmd=$(cat ${RETRYCMD}-v6)
		[ "$cmd" = "start" -o "$cmd" = "stop" ] && $NETWALL -6 $cmd
	fi
}

if [ "$1" = "v6" ]; then
	firewall_v6_retry
else
	firewall_retry
fi

