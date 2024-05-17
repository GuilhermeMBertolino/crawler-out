#!/bin/sh
echo -e "\033[35m Update d2 ... \033[0m" > /dev/console
d2 -c general.devicemodel "`uci -P /var/state get netgear.board.model`"
d2 -c general.devicename "`uci get system.@system[0].hostname`"
d2 -c general.fwrevision "`uci -P /var/state get netgear.fw.cur_ver| awk -F '_' '{printf $1}'`"
d2 -c general.hwrevision "`uci -P /var/state get netgear.board.hwver`"
d2 -c general.fsn "`uci -P /var/state get netgear.board.sn`"
d2 -c general.sku "`uci -P /var/state get netgear.board.sku`"
d2 -c general.RegionName "`uci -P /var/state get netgear.board.sku|awk '{print tolower($0)}'`"
#Per spec - Region:(Internal use): ODM MUST NOT touch this field
#general.Region depends on RegionName, should be updated by d2_countryname.sh
d2 -c general.lan_ifname "br-lan"
d2 -c general.GatewayIP `/usr/bin/getdb.sh -I`
d2 -c general.GatewayMAC "`/usr/bin/getdb.sh -M`"
d2 -c general.NetworkAddress "`/usr/bin/getdb.sh -n`"
d2 -c general.defaultmac "`/usr/bin/getdb.sh -m`"
d2 -c general.RouterMode "`/usr/bin/getdb.sh -r`"
d2 -c general.Manufacturer Pegatron
d2 -c general.Internetstatus "$(/usr/bin/getdb.sh -s)"
# DNS IP should be the LAN PC used DNS IP address, RAX5 used LAN IP to be DNS IP 
d2 -c general.dnsip `/usr/bin/getdb.sh -I`
d2 -c xagentcfg[0].lan_ifname "br-lan"
d2 -c xagentcfg[0].lan_ipaddr "`/usr/bin/getdb.sh -I`"

echo -e "\033[35m .. Done \033[0m" > /dev/console

