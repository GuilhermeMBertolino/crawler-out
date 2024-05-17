#!/bin/sh

. /usr/share/libubox/jshn.sh

get_device_info_from_remote()
{
	token="t=$1"
	devices="devices?"
	url=`/usr/bin/d2 -s xagentcfg[0].genie_remote_url | sed 's/claimDevice//g'`
	full_url="$url$devices$token"
	index=1

	/usr/bin/curl --capath /etc/ssl/certs/ -X GET $full_url -o /tmp/genie_device

	json_load "$(cat /tmp/genie_device)"

	json_select "items"
	while json_get_type statue $index && [ "$statue" = "object" ]; do
		json_select "$index"
		json_get_var sn hardwareId
		json_get_var status online
		artmtd -r sn >/dev/null
		if [ "$sn" = "$(cat /tmp/sn-setted)" -a "$status" = "true" ]; then
			return 1;
		fi
		index=`expr ${index} + 1`
		json_select ".."
	done

	return 0
}

register_for_remote_device()
{
	token="t=$1"
	export  QUERY_STRING=$token
	/www/cgi-bin/genie.cgi
	export -n QUERY_STRING
}

release_device()
{
	token="t=$1"
	devices="releaseDevice?"
	url=`/usr/bin/d2 -s xagentcfg[0].genie_remote_url | sed 's/claimDevice//g'`
	id=`/usr/bin/d2 -s xagentcfg[0].x_agent_id`
	full_url="$url$devices$token&d=$id"

	/usr/bin/curl --capath /etc/ssl/certs/ -X GET $full_url
}

usage()
{
	echo "Usage:" >/dev/console
	echo "genie_enable.sh <token> [enable]" >/dev/console
}

if [ -z $1 ]; then
	usage
	exit
fi

if [ $# -eq 2 ]; then
	release_device $1
	exit
fi

get_device_info_from_remote $1
if [ $? -eq 0 ]; then
	register_for_remote_device $1
fi

