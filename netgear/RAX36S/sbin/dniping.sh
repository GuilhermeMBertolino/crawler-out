#!/bin/sh

customer_domain="www.netgear.com"
wait_time="6"
pid="$$"

ps | grep -v grep| grep dniping | grep -v $pid > /tmp/ping_$pid
[ "`cat /tmp/ping_$pid`" != "" ] && rm /tmp/ping_$pid && exit
rm /tmp/ping_$pid
[ "`cat /tmp/WAN_status`" = "Link down" ] && wait_time="1"

while [ "$wait_time" -gt "0" ]; do
	rm -rf /tmp/ping_result /tmp/ping_result_error /tmp/ping_terror
	ping -A -c 4 $customer_domain > /tmp/ping_result 2>/tmp/ping_terror
	[ "$?" = "0" ] && break
	wait_time=$(( $wait_time - 1 ))
done
cp /tmp/ping_terror /tmp/ping_result_error

