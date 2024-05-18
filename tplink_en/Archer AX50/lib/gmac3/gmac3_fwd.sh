#!/bin/sh

. /lib/gmac3/gmac3_nvram.sh

gmac3_fwd_up ()
{
	gmac3_ifaces=$(nvram get fwddevs)
	
	for iface in $gmac3_ifaces
	do
		ifconfig $iface up
	done
}

gmac3_fwd_promisc ()
{
	gmac3_ifaces=$(nvram get fwddevs)
	
	for iface in $gmac3_ifaces
	do
		ifconfig $iface promisc
	done
}

gmac3_fwd_allmulti ()
{
	gmac3_ifaces=$(nvram get fwddevs)
	
	for iface in $gmac3_ifaces
	do
		ifconfig $iface allmulti
	done
}


gmac3_fwd_action ()
{
	local gmac3_configured=`gmac3_nvram_configured`
	
	if [ "$gmac3_configured" == "1" ] ;
	then
		gmac3_fwd_promisc
		gmac3_fwd_allmulti
		gmac3_fwd_up
	fi
}
