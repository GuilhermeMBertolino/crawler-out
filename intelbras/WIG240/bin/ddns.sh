#!/bin/sh
FIRSTDDNS=/var/firstddns
OLDIP=/var/oldip
LINKFILE=/etc/ppp/link
renew=1
num=0
if [ ! -f $FIRSTDDNS ] || [ $1 = 'option' ]; then
{
echo "pass" > $FIRSTDDNS
while [ true ];do
  num=`expr $num + 1`
  if [ $num -ge 8640 ]; then
    num=0
    renew=1
  fi
  sleep 10
  eval `flash get DDNS_ENABLED`
  if [ ! -f $FIRSTDDNS ]; then
    break
  fi
  if [ $DDNS_ENABLED = 0 ]; then
    rm -f $FIRSTDDNS
    break
  fi
  eval `flash get WAN_DHCP`
  if [ $WAN_DHCP = 0 ] || [ $WAN_DHCP = 1 ]; then
   if [ $renew != 1 ]; then 
     continue
   fi
  fi
  if [ $WAN_DHCP = 3 ] || [ $WAN_DHCP = 4 ]; then
   if [ ! -f $LINKFILE ]; then
     continue
   fi
   if [ -f  /etc/ppp/resolv.conf ]; then
     cat /etc/ppp/resolv.conf > /etc/resolv.conf
   fi
   s1=`ifconfig ppp0 | grep "inet addr"`
   s2=`echo $s1 | cut -f2 -d:`
   s3=`echo $s2 | cut -f1 -d " "`
   if [ ! -f $OLDIP ]; then
    echo "0.0.0.0" > $OLDIP
   fi
   str=`cat $OLDIP`
   if [ $renew != 1 ] && [ $s3 = $str ]; then 
     continue
   fi
  fi
  eval `flash get DNS_MODE`
  eval `flash get DDNS_TYPE`
  eval `flash get DDNS_DOMAIN_NAME`
  eval `flash get DDNS_USER`
  eval `flash get DDNS_PASSWORD`

  if [ $WAN_DHCP = 0 ] || [ $DNS_MODE = 1 ]; then
    eval `flash get DNS1`
    if [ $DNS1 != 0.0.0.0 ]; then
    echo "nameserver $DNS1" > /etc/resolv.conf
    fi
    eval `flash get DNS2`
    if [ $DNS2 != 0.0.0.0 ]; then
    echo "nameserver $DNS2" >> /etc/resolv.conf
    fi
    eval `flash get DNS3`
    if [ $DNS3 != 0.0.0.0 ]; then
    echo "nameserver $DNS3" >> /etc/resolv.conf
    fi
  fi
  if [ $WAN_DHCP = 3 ] || [ $WAN_DHCP = 4 ]; then
    {
    if [ $DDNS_TYPE = 0 ]; then
      {
      updatedd dyndns $DDNS_USER:$DDNS_PASSWORD $DDNS_DOMAIN_NAME
      ret=`echo $?`
      }
    else 
      {
      updatedd tzo $DDNS_USER:$DDNS_PASSWORD $DDNS_DOMAIN_NAME
      ret=`echo $?`
      }
    fi
    if [ $ret = 0 ]; then
      echo $s3 > $OLDIP
      num=0
      renew=0
    fi
    }
  else
    {
    if [ $DDNS_TYPE = 0 ]; then
      {
      updatedd dyndns $DDNS_USER:$DDNS_PASSWORD $DDNS_DOMAIN_NAME
      ret=`echo $?`
      }
    else
      { 
      updatedd tzo $DDNS_USER:$DDNS_PASSWORD $DDNS_DOMAIN_NAME
      ret=`echo $?`
      }
    fi
    if [ $ret = 0 ]; then
      num=0
      renew=0
    fi
    }
  fi
done
} &
fi

