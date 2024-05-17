#!/bin/sh
#WAN=eth1
WAN=$1
OPTIONS=/etc/ppp/options
RPPTP=/etc/ppp/peers/rpptp
PAPFILE=/etc/ppp/pap-secrets
CHAPFILE=/etc/ppp/chap-secrets
RESOLV=/etc/ppp/resolv.conf
PPPFILE=/var/run/ppp
FIRSTFILE=/etc/ppp/firstpptp
CONNECTFILE=/etc/ppp/connectfile

eval `flash get PPTP_USER_NAME`
eval `flash get PPTP_PASSWORD`
eval `flash get PPTP_IP_ADDR`
eval `flash get PPTP_SUBNET_MASK`
eval `flash get PPTP_SERVER_IP_ADDR`
eval `flash get PPTP_MTU_SIZE`
eval `flash get DNS_MODE`
eval `flash get DNS1`
eval `flash get DNS2`
eval `flash get DNS3`
eval `flash get WAN_DHCP`
#disconnect.sh all

if [ $DNS_MODE = 1 ]; then
      if [ "$DNS1" != '0.0.0.0' ]; then
        DNS="$DNS -s $DNS1"
      fi
      if [ "$DNS2" != '0.0.0.0' ]; then
        DNS="$DNS -s $DNS2"
      fi
      if [ "$DNS3" != '0.0.0.0' ]; then
        DNS="$DNS -s $DNS3"
      fi
    dnrd $DNS
 else
   # Changed By Araujo
   # Remove 168.95.1.1 in favor of user specification.
    dnrd -s $DNS
fi

ifconfig $WAN addr $PPTP_IP_ADDR  netmask $PPTP_SUBNET_MASK
route del  default dev $WAN
if [ -n "$PPTP_USER_NAME" ] ; then
#  echo "name \"$PPTP_USER_NAME\"" > $OPTIONS
#  echo "#################################################" > $PAPFILE  
#  echo "\"$PPTP_USER_NAME\"	*	\"$PPTP_PASSWORD\"" >> $PAPFILE
#  echo "#################################################" > $CHAPFILE
#  echo "\"$PPTP_USER_NAME\"	*	\"$PPTP_PASSWORD\"" >> $CHAPFILE
	flash gen-pptp $OPTIONS $PAPFILE $CHAPFILE
fi

echo "lock" >> $OPTIONS  
echo "noauth" >> $OPTIONS  
echo "nobsdcomp" >> $OPTIONS  
echo "nodeflate" >> $OPTIONS  
echo "usepeerdns" >> $OPTIONS  
echo "lcp-echo-interval 20" >> $OPTIONS
echo "lcp-echo-failure 3" >> $OPTIONS
echo "mtu $PPTP_MTU_SIZE" >> $OPTIONS

echo "remotename PPTP" > $RPPTP
echo "linkname PPTP" >> $RPPTP
echo "ipparam PPTP" >> $RPPTP
echo "pty \"pptp $PPTP_SERVER_IP_ADDR  --nolaunchpppd\"" >> $RPPTP
echo "name $PPTP_USER_NAME" >> $RPPTP

eval `flash get PPTP_SECURITY_ENABLED`

if [ $PPTP_SECURITY_ENABLED != 0 ]; then
	echo "require-mppe" >> $RPPTP
	echo "require-mppe-40" >> $RPPTP
	echo "require-mppe-128" >> $RPPTP
	echo "nomppe-stateful" >> $RPPTP
fi

echo "persist" >> $RPPTP
echo "noauth" >>$RPPTP
echo "file /etc/ppp/options" >>$RPPTP
echo "nobsdcomp" >>$RPPTP
echo "nodetach" >>$RPPTP
echo "novj" >>$RPPTP

PID_FILE=/var/run/ppp0.pid
DNRD_PID=/var/run/dnrd.pid
if [ $WAN_DHCP = 4 ]; then
  if [ ! -f $FIRSTFILE ]; then
  {
  echo "pass" > $FIRSTFILE
  while [ true ]; do
  eval `flash get WAN_DHCP`
  if [ $WAN_DHCP != 4 ]; then
    break
  fi

  if [ ! -r "$CONNECTFILE" ]; then
    echo "pass" > $CONNECTFILE 
    upnp.sh
    sleep 5 
    pppd call rpptp 
  fi
  sleep 3
  done
  rm -f $FIRSTFILE
  } &
  fi
fi

