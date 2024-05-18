#!/bin/sh

NETCTRL_OP_EXTEND_LINK_DOWN=21
NETCTRL_OP_EXTEND_LINK_UP=22

usage()
{
	echo "usage: $0 <interface> down/up"
}

extend_link_up()
{
	cfm post netctrl wifi?op=$NETCTRL_OP_EXTEND_LINK_UP
}

extend_link_down()
{
	cfm post netctrl wifi?op=$NETCTRL_OP_EXTEND_LINK_DOWN
}

if [ $# -lt 2 ]; then
	usage $0
elif [ $2 = "up" ]; then
	echo "$0: $1 link up"
	extend_link_up
elif [ $2 = "down" ]; then
	echo "$0: $1 link down"
	extend_link_down
fi

