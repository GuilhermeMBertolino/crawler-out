#!/bin/sh

CONFIG=/bin/config


wan_proto=$(config get wan_proto)
lan_ipaddr=$(config get lan_ipaddr)
mask=$(config get lan_netmask)
tun_subnet=$(tun_net $lan_ipaddr $mask)
wanifname=$(config get wan_ifname)
wannetwork=$(ip addr show $wanifname|grep "inet\b"|awk '{print $2}')
waninfo=$(ipcalc.sh ${wannetwork%%/*} ${wannetwork#*/})
eval $waninfo
if [ "$NETWORK" = "$tun_subnet" ]; then
	tun_subnet=$(tun_net $IP $NETMASK)
fi

wan_interface="brwan"
lan_interface="br0"
if [ "$wan_proto" = "static" ] || [ "$wan_proto" = "dhcp" ]; then
	iptables -t nat -A ${wan_interface}_masq -s $tun_subnet/$mask -j MASQUERADE
else
	iptables -t nat -A ppp0_masq -s $tun_subnet/$mask -j MASQUERADE
fi

#add for DoH http hijack use for hijack routerlogin/orbilogin, 75.2.84.193 is netgear fixed ip for routerlogin/orbilogin
iptables -t nat -I PREROUTING -i tun0 -s $tun_subnet/$mask -d 75.2.84.193 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 80
iptables -t nat -I PREROUTING -i tun0 -s $tun_subnet/$mask -d 75.2.84.193 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 443
iptables -t nat -I PREROUTING -i tun0 -s $tun_subnet/$mask -d 99.83.191.32 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 80
iptables -t nat -I PREROUTING -i tun0 -s $tun_subnet/$mask -d 99.83.191.32 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 443

iptables -I INPUT 10 -i tun0 -j ${lan_interface}_in
iptables -I OUTPUT  11 -o tun0 -j fw2loc
iptables -I FORWARD 3 -i tun0 -j ${lan_interface}_fwd
iptables -A ${lan_interface}_fwd -o tun0 -j loc2loc
if [ "$wan_proto" = "static" ] || [ "$wan_proto" = "dhcp" ]; then
	iptables -A ${wan_interface}_fwd -o tun0 -j net2loc
else
	iptables -A ppp0_fwd -o tun0 -j net2loc
fi
iptables -I loc2net 5 -s $tun_subnet/$mask -j ACCEPT

config set vpn_tun_ip_for_gui=$tun_subnet
