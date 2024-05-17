#!/bin/sh
eval `flash get DNS_MODE`
eval `flash get WAN_DHCP`
eval `flash get PPP_MTU_SIZE`
eval `flash get PPTP_MTU_SIZE`
RESOLV=/etc/ppp/resolv.conf
PIDFILE=/var/run/dnrd.pid
CONNECTFILE=/etc/ppp/connectfile

echo "pass" > $CONNECTFILE

if [ $WAN_DHCP = 4 ]; then
  ptpgw0=`ifconfig ppp0 | grep -i "P-t-P:"`
  ptpgw1=`echo $ptpgw0 | cut -f3 -d:`
  ptpgw=`echo $ptpgw1 | cut -f1 -d " "`
  route add -net default gw $ptpgw dev ppp0
fi

if [ $DNS_MODE != 1 ]; then
  if [ -r "$RESOLV" ] ; then
    if [ -f $PIDFILE ]; then
      PID=`cat $PIDFILE`
      kill -9 $PID 
      rm -f $PIDFILE
    fi
    line=0
    cat $RESOLV | grep nameserver > /tmp/ddfile 
    line=`cat /tmp/ddfile | wc -l`
    num=1
    while [ $num -le $line ];
    do
      pat0=` head -n $num /tmp/ddfile | tail -n 1`
      pat1=`echo $pat0 | cut -f2 -d " "`
      DNS="$DNS -s $pat1"
      num=`expr $num + 1`
    done
    num=1
    while [ $num -le 5 ];
    do
      dnrd $DNS
      if [ -f $PIDFILE ]; then
        break
      else
        sleep 1
        num=`expr $num + 1`
      fi
    done
  fi
fi
if [ $WAN_DHCP = 4 ]; then
  ifconfig ppp0 mtu $PPTP_MTU_SIZE txqueuelen 25
else
  ifconfig ppp0 mtu $PPP_MTU_SIZE txqueuelen 25
fi
upnp.sh
if [ -f /bin/vpn.sh ]; then
      echo 'Setup VPN'
      vpn.sh all
fi
