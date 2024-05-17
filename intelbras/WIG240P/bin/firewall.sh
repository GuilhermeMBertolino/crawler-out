#!/bin/sh

ip=0
port1=0
port2=0
protocol=0
ZERO=0
WAN=eth1
BRIDGE=br0
eval `flash get WAN_DHCP`
eval `flash get IPFILTER_TBL_NUM`
eval `flash get PORTFILTER_TBL_NUM`
eval `flash get MACFILTER_TBL_NUM`
eval `flash get PORTFW_TBL_NUM`
eval `flash get DMZ_HOST`

eval `flash get IPFILTER_ENABLED`
eval `flash get PORTFILTER_ENABLED`
eval `flash get MACFILTER_ENABLED`
eval `flash get PORTFW_ENABLED`
eval `flash get DMZ_ENABLED`
eval `flash get OP_MODE`
eval `flash get WEB_WAN_ACCESS_ENABLED`
#added by Eason
eval `flash get WANACCESS_PORT`
eval `flash get PING_WAN_ACCESS_ENABLED`

# if wireless ISP mode , set WAN to wlan0
eval `flash get  WISP_WAN_ID`
if [ "$OP_MODE" = '2' ];then
	WAN=wlan$WISP_WAN_ID
fi

if [ $WAN_DHCP = 3 ] || [ $WAN_DHCP = 4 ]; then
  WAN=ppp0
fi 



EXT_IP0=`ifconfig $WAN | grep -i "addr:"`
EXT_IP1=`echo $EXT_IP0 | cut -f2 -d:`
EXT_IP=`echo $EXT_IP1 | cut -f1 -d " "`
INT_IP0=`ifconfig $BRIDGE | grep -i "addr:"`
INT_IP1=`echo $INT_IP0 | cut -f2 -d:`
INT_IP=`echo $INT_IP1 | cut -f1 -d " "`

iptables -F
iptables -t nat -F PREROUTING
iptables -t nat -F POSTROUTING
iptables -F INPUT
iptables -F OUTPUT
iptables -F FORWARD
iptables -P OUTPUT ACCEPT

if [ $OP_MODE != 1 ] ; then
	iptables -P INPUT DROP
else
	iptables -P INPUT ACCEPT #default accept
fi

if [ $OP_MODE != 3 ] ; then
	iptables -P FORWARD DROP
else
	iptables -P FORWARD ACCEPT #default accept
fi


echo 1 > /proc/sys/net/ipv4/ip_forward

#if opmode is bridge , exit don't set firewall
#eval `flash get RIP_ENABLED`
#if [ "$OP_MODE" = '1' ] || [ "$RIP_ENABLED" = '1' ] ; then
if [ "$OP_MODE" = '1' ];then
	exit 
fi


iptables -t nat -A POSTROUTING -o $WAN -j MASQUERADE

eval `flash get VPN_PASSTHRU_PPTP_ENABLED`
if [ $VPN_PASSTHRU_PPTP_ENABLED = 0 ];then
       iptables -A FORWARD -p TCP --dport 1723 -j DROP
fi
eval `flash get VPN_PASSTHRU_L2TP_ENABLED`
if [ $VPN_PASSTHRU_L2TP_ENABLED = 0 ];then
       iptables -A FORWARD -p UDP --dport 1701 -j DROP
fi
eval `flash get VPN_PASSTHRU_IPSEC_ENABLED`
if [ $VPN_PASSTHRU_IPSEC_ENABLED = 0 ];then
       iptables -A FORWARD -p UDP --dport 500 -j DROP
fi
#URL filter
eval `flash get URLFILTER_ENABLED`
eval `flash get URLFILTER_TBL_NUM`
if [ $URLFILTER_TBL_NUM -gt 0 ] && [ $URLFILTER_ENABLED -gt 0 ];then
  url="$URLFILTER_TBL_NUM "
  num=1
  while [ $num -le $URLFILTER_TBL_NUM ];
  do
    str=`flash get URLFILTER_TBL | grep URLFILTER_TBL$num`
    str=`echo $str | cut -f2 -d=`
    url="$url $str"
    num=`expr $num + 1`
  done
  echo "$url "> /proc/url_filter
else
  echo "0 "> /proc/url_filter

fi
#IP filter
if [ $IPFILTER_TBL_NUM -gt 0 ] && [ $IPFILTER_ENABLED -gt 0 ];
then
  num=1
  while [ $num -le $IPFILTER_TBL_NUM ];
  do
    IPFILTER_TBL=`flash get IPFILTER_TBL | grep IPFILTER_TBL$num`
    port_ip=`echo $IPFILTER_TBL | cut -f2 -d=`
    ip=`echo $port_ip | cut -f1 -d,`
    protocol=`echo $port_ip | cut -f2 -d,`
    if [ $protocol = 1 ]; then
      iptables -A FORWARD -p TCP -s $ip -j DROP
    fi
    if [ $protocol = 2 ]; then
      iptables -A FORWARD -p UDP -s $ip -j DROP
    fi
    if [ $protocol = 3 ]; then
      iptables -A FORWARD -p TCP -s $ip -j DROP
      iptables -A FORWARD -p UDP -s $ip -j DROP
    fi
    num=`expr $num + 1`
  done
fi

#MAC filter
if [ $MACFILTER_TBL_NUM -gt 0 ] && [ $MACFILTER_ENABLED -gt 0 ];
then
  num=1
  while [ $num -le $MACFILTER_TBL_NUM ];
  do
    MACFILTER_TBL=`flash get MACFILTER_TBL | grep MACFILTER_TBL$num`
    tmp_addr=`echo $MACFILTER_TBL | cut -f2 -d=`
    addr=`echo $tmp_addr | cut -f1 -d,`
    iptables -A FORWARD -m mac --mac-source $addr -j DROP
    num=`expr $num + 1`
  done
fi

# default enable nat speedup
if [ -f /proc/fast_nat ];then
	echo "1" > /proc/fast_nat
	echo "1" > /proc/br_nat_speedup
fi

#PORTfilter
if [ $PORTFILTER_TBL_NUM -gt 0 ] && [ $PORTFILTER_ENABLED -gt 0 ];
then
  num=1
  #if enable port filter , then disable nat speedup for work around
  if [ -f /proc/fast_nat ];then
	echo "0" > /proc/fast_nat
	echo "0" > /proc/br_nat_speedup
  fi

  while [ $num -le $PORTFILTER_TBL_NUM ];
  do
    PORTFILTER_TBL=`flash get PORTFILTER_TBL | grep PORTFILTER_TBL$num`
    port_ip=`echo $PORTFILTER_TBL | cut -f2 -d=`
    port1=`echo $port_ip | cut -f1 -d,`
    tmp_port=`echo $port_ip | cut -f2 -d,`
    port2=`echo $tmp_port | cut -f2 -d ' '`
    protocol=`echo $port_ip | cut -f3 -d,`
    num=`expr $num + 1`
    
    if [ $protocol = 1 ]; then
       iptables -A FORWARD -i eth1 -p TCP --sport $port1:$port2 -j DROP
    fi
    if [ $protocol = 2 ]; then
       iptables -A FORWARD -i eth1 -p UDP --sport $port1:$port2 -j DROP
    fi
    if [ $protocol = 3 ]; then
       iptables -A FORWARD -i eth1 -p TCP --sport $port1:$port2 -j DROP
       iptables -A FORWARD -i eth1 -p UDP --sport $port1:$port2 -j DROP
    fi
  done
fi
#PORT Forwarding
if [ $PORTFW_TBL_NUM -gt 0 ] && [ $PORTFW_ENABLED -gt 0 ];
then
  num=1
  while [ $num -le $PORTFW_TBL_NUM ];
  do
    PORTFW_TBL=`flash get PORTFW_TBL | grep PORTFW_TBL$num`
    port_ip=`echo $PORTFW_TBL | cut -f2 -d=`
    ip=`echo $port_ip | cut -f1 -d,`
    port1=`echo $port_ip | cut -f2 -d,`
    tmp_port=`echo $port_ip | cut -f3 -d,`
    port2=`echo $tmp_port | cut -f2 -d ' '`
    protocol=`echo $port_ip | cut -f4 -d,`
    num=`expr $num + 1`

    if [ $protocol = 1 ]; then
       iptables -A PREROUTING -t nat -p TCP --dport $port1:$port2 -d $EXT_IP -j DNAT --to $ip 
       iptables  -A FORWARD  -i $WAN -d $ip -p TCP --dport $port1:$port2 -j ACCEPT

    fi
    if [ $protocol = 2 ]; then
       iptables -A PREROUTING -t nat -p UDP --dport $port1:$port2 -d $EXT_IP -j DNAT --to $ip 
       iptables  -A FORWARD  -i $WAN -d $ip -p UDP --dport $port1:$port2 -j ACCEPT
    fi
    if [ $protocol = 3 ]; then
       iptables -A PREROUTING -t nat -p TCP --dport $port1:$port2 -d $EXT_IP -j DNAT --to $ip 
       iptables -A PREROUTING -t nat -p UDP --dport $port1:$port2 -d $EXT_IP -j DNAT --to $ip 
       iptables  -A FORWARD  -i $WAN -d $ip -p TCP --dport $port1:$port2 -j ACCEPT
       iptables  -A FORWARD  -i $WAN -d $ip -p UDP --dport $port1:$port2 -j ACCEPT
    fi
  done
fi

#Virtual DMZ
if [ "$DMZ_HOST" != '0.0.0.0' ] && [ $DMZ_ENABLED -gt 0 ];
then
  iptables -A PREROUTING -t nat -p ALL -d $EXT_IP -j DNAT --to $DMZ_HOST 
  iptables  -A FORWARD  -i $WAN -d $DMZ_HOST -p all -j ACCEPT
fi


#deny the ping request from WAN interface to bridge interface
if [ "$EXT_IP" != '' ] && [ $PING_WAN_ACCESS_ENABLED = 0 ]; then
  iptables -A INPUT -p icmp --icmp-type echo-request -i $WAN -j DROP
else
  iptables -A INPUT -p icmp --icmp-type echo-request -i $WAN -j ACCEPT
fi

if [ "$EXT_IP" != '' ] && [ $WEB_WAN_ACCESS_ENABLED = 0 ]; then
  iptables -A INPUT -p tcp --dport 80:80 -i $WAN -d $EXT_IP -j DROP
else
  iptables -t nat -A PREROUTING -p tcp -i $WAN -d $EXT_IP --dport $WANACCESS_PORT -j DNAT --to $EXT_IP:80
  iptables -t nat -A PREROUTING -p tcp -i $WAN -d $EXT_IP --dport 80 -j DROP
  iptables -A INPUT -p tcp --dport 80:80 -i $WAN -d $EXT_IP -j ACCEPT
fi
#add the default forward rule after filter
echo "512" > /proc/sys/net/ipv4/ip_conntrack_max
echo "7200" > /proc/sys/net/ipv4/netfilter/ip_conntrack_tcp_timeout_established
iptables -A INPUT -i ! $WAN -j ACCEPT

# let ipsec packet come in
if [ -f /bin/vpn.sh ] && [ $WAN_DHCP != 4 ] && [ $OP_MODE != 1 ]; then 
	eval `flash get IPSECTUNNEL_ENABLED`
	if [ $IPSECTUNNEL_ENABLED -gt 0 ]; then
		iptables -A INPUT -p 50 -i $WAN -j ACCEPT
		iptables -A INPUT -p 51 -i $WAN -j ACCEPT
		iptables -A INPUT -p udp --sport 500 --dport 500 -i $WAN -j ACCEPT
	fi
fi

iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
iptables -A FORWARD -p udp -i $WAN -o $BRIDGE -j ACCEPT
iptables -A FORWARD -p tcp -i $WAN -o $BRIDGE -j ACCEPT
iptables -A FORWARD -p 50 -i $WAN -o $BRIDGE -j ACCEPT
iptables  -A FORWARD -i $BRIDGE -j ACCEPT
iptables  -A FORWARD -i $WAN -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -t mangle -I PREROUTING -i $BRIDGE -j MARK --set-mark 5

DOS_STR=`flash all | grep DOS_ENABLED`
if [ "$DOS_STR" != "" ]; then
  dos.sh &
fi
