#!/bin/sh

. /opt/lantiq/etc/ugw_notify_defs.sh

event_name="$1"

if [ "$event_name" == "delall" ]; then
        ubus call servd notify '{
                "notify_id": '$NOTIFY_DHCP_DNSMASQ_DELALL', "type": false
        }'
	exit 0
fi

mac="$2"
ip_addr="$3"
time_at="$DNSMASQ_LEASE_EXPIRES"
leasetime="$DNSMASQ_TIME_REMAINING"
#CUSTOMIZE_FOR_NETGEAR, 20200421, Add option 55 of dhcp for DIL.
dhcpoption55="$DNSMASQ_REQUESTED_OPTIONS"
if [ "$4" == "" ]; then
	hostname="Unknown"
else
	hostname="$4"
fi
#CUSTOMIZE_FOR_NETGEAR, 20200203, Add vendor of dhcp option and remove debug mode for DIL.
vendor=$(echo $DNSMASQ_VENDOR_CLASS | sed 's/ /%20/g')
if [ "$event_name" == "add" ] || [ "$event_name" == "old" ]; then
        ubus call servd notify '{
                "notify_id": '$NOTIFY_DHCP_CLIENT_UP', "type": false,
                "pn1": "ip_addr", "pv1": "'$ip_addr'",
                "pn2": "time_at", "pv2": "'$time_at'",
                "pn3": "mac", "pv3": "'$mac'" ,
                "pn4": "active", "pv4": "1" ,
                "pn5": "leasetime", "pv5": "'$leasetime'",
                "pn6": "hostname", "pv6": "'$hostname'",
                "pn7": "vendor", "pv7": "'$vendor'",
                "pn8": "dhcpoption55", "pv8": "'$dhcpoption55'"
        }'

elif [ "$event_name" == "del" ]; then
        ubus call servd notify '{
                "notify_id": '$NOTIFY_DHCP_CLIENT_DOWN', "type": false,
                "pn1": "ip_addr", "pv1": "'$ip_addr'",
                "pn2": "time_at", "pv2": "'$time_at'",
                "pn3": "mac", "pv3": "'$mac'" ,
                "pn4": "active", "pv4": "0" ,
                "pn5": "leasetime", "pv5": "'$leasetime'"
        }'
fi

# send DHCP event to Beerocks module for managing IRE's/STA's
# this would be moved to Beerocks App SL when it's available
ubus call dhcp_event dhcp_event '{
	"op":"'$event_name'",
	"mac":"'$mac'",
	"ip":"'$ip_addr'",
	"hostname":"'$hostname'"
}'
