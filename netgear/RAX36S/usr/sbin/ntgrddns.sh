#!/bin/sh

#Purpose:
#update ntgrddns related parameters from config database

CONFIG=/bin/config
[ -d "/tmp/ntgrddns" ] || mkdir -p "/tmp/ntgrddns"
CLIENT_ID_FILE="/tmp/ntgrddns/client_id"
CLIENT_KEY_FILE="/tmp/ntgrddns/client_key"
NDDNS_CFGED_FILE="/tmp/ntgrddns/nddns_cfged"
SYSDNSPROVIDERLIST_FILE="/tmp/ntgrddns/sysDNSProviderlist"
ENDIS_DDNS_FILE="/tmp/ntgrddns/endis_ddns"
HOSTNAME_FILE="/tmp/ntgrddns/hostname_check"
DNS_ACCOUNT_FILE="/tmp/ntgrddns/n_dns_have_account"
SYSDNSHOST_FILE="/tmp/ntgrddns/sysDNSHost_tmp"
SYSDNSUSER_FILE="/tmp/ntgrddns/sysDNSUser_tmp"
SYSDNSPW_FILE="/tmp/ntgrddns/sysDNSPassword_tmp"
TIME_ZONE_FILE="/tmp/ntgrddns/time_zone"
WAN_IFNAME="/tmp/ntgrddns/wan_ifname"

$CONFIG get client_id >$CLIENT_ID_FILE
$CONFIG get client_key >$CLIENT_KEY_FILE
$CONFIG get nddns_cfged >$NDDNS_CFGED_FILE
$CONFIG get sysDNSProviderlist >$SYSDNSPROVIDERLIST_FILE
$CONFIG get endis_ddns >$ENDIS_DDNS_FILE
$CONFIG get hostname_check >$HOSTNAME_FILE
$CONFIG get n_dns_have_account >$DNS_ACCOUNT_FILE
$CONFIG get sysDNSHost_tmp >$SYSDNSHOST_FILE
$CONFIG get sysDNSUser_tmp >$SYSDNSUSER_FILE
$CONFIG get sysDNSPassword_tmp >$SYSDNSPW_FILE
$CONFIG get time_zone >$TIME_ZONE_FILE

wan_proto=`$CONFIG get wan_proto`
if [ "x$wan_proto" == "x3g" -o "x$wan_proto" == "xpppoe" -o "x$wan_proto" == "xl2tp" -o "x$wan_proto" == "xpptp" ]; then
	wan_ifname="ppp0"
elif [ "x$wan_proto" == "xwimax" ]; then
	wan_ifname=`$CONFIG get wan_ifname_wimax`
else
	wan_ifname=`$CONFIG get wan_ifname`
fi
echo "$wan_ifname" >$WAN_IFNAME
