#!/bin/sh

notify_portlink_changed()
{
	pid=$(cat /var/run/switch_led)
	if [ $(($pid)) -gt 1 ] ; then
		# Notify to online test.
		kill -s USR1 $(($pid))
	fi
}

notify_online_test()
{
	pid=$(cat /var/run/switch_led)
	if [ $(($pid)) -gt 1 ] ; then
		# Notify to online test.
		kill -s USR2 $(($pid))
	fi
}