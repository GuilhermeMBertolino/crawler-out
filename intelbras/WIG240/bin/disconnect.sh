#!/bin/sh
LINKFILE=/etc/ppp/link
PPPFILE=/var/run/ppp0.pid
CONNECTFILE=/etc/ppp/connectfile
TMPFILE=/tmp/tmpfile
PLUTO_PID=/var/run/pluto.pid
FIRSTDDNS=/var/firstddns

eval `flash get PPP_CONNECT_TYPE`
eval `flash get WAN_DHCP`

if [ -r "$CONNECTFILE" ]; then
  rm $CONNECTFILE
fi

if [ -r "$LINKFILE" ]; then
  rm $LINKFILE
fi

PIDFILE=/var/run/dnrd.pid
if [ -f $PIDFILE ]; then
  PID=`cat $PIDFILE`
  kill -9 $PID 
  rm -f $PIDFILE
fi

line=0
ps -A | grep upnpd > $TMPFILE
line=`cat $TMPFILE | wc -l`
num=1
while [ $num -le $line ];
do
 pat0=` head -n $num $TMPFILE | tail -n 1`
 pat1=`echo $pat0 | cut -f2 -dS`
 pat2=`echo $pat1 | cut -f1 -d " "`
 if [ "$pat2" = 'upnpd' ]; then
   pat1=`echo $pat0 | cut -f1 -dS`
   pat2=`echo $pat1 | cut -f1 -d " "`
   kill -9 $pat2
 fi
 num=`expr $num + 1`
done

line=0
ps -A | grep pppd > $TMPFILE
line=`cat $TMPFILE | wc -l`
num=1
while [ $num -le $line ];
do
  pat0=` head -n $num $TMPFILE | tail -n 1`
  pat1=`echo $pat0 | cut -f2 -dS`
  pat2=`echo $pat1 | cut -f1 -d " "`
  if [ "$pat2" = 'pppd' ]; then
    pat1=`echo $pat0 | cut -f1 -dS`
    pat2=`echo $pat1 | cut -f1 -d " "`
    if [ $WAN_DHCP = 3 ] && [ $1 = 'option' ]; then
      kill -15 $pat2
    else
      kill -9 $pat2
    fi
  fi
  num=`expr $num + 1`
done

line=0
ps -A | grep pppoe > $TMPFILE
line=`cat $TMPFILE | wc -l`
num=1
while [ $num -le $line ];
do
  pat0=` head -n $num $TMPFILE | tail -n 1`
  pat1=`echo $pat0 | cut -f2 -dS`
  pat2=`echo $pat1 | cut -f1 -d " "`
  if [ "$pat2" = 'pppoe' ]; then
    pat1=`echo $pat0 | cut -f1 -dS`
    pat2=`echo $pat1 | cut -f1 -d " "`
    kill -9 $pat2
  fi
  num=`expr $num + 1`
done


line=0
ps -A | grep pptp > $TMPFILE
line=`cat $TMPFILE | wc -l`
num=1
while [ $num -le $line ];
do
  pat0=` head -n $num $TMPFILE | tail -n 1`
  pat1=`echo $pat0 | cut -f2 -dS`
  pat2=`echo $pat1 | cut -f1 -d " "`
  if [ "$pat2" = 'pptp' ]; then
    pat1=`echo $pat0 | cut -f1 -dS`
    pat2=`echo $pat1 | cut -f1 -d " "`
    kill -9 $pat2
  fi
  num=`expr $num + 1`
done

if [ -r "$PPPFILE" ]; then
  rm $PPPFILE
fi

if [ -f $PLUTO_PID ];then
  ipsec setup stop
fi
 
if [ -r "$FIRSTDDNS" ]; then
  rm $FIRSTDDNS
fi



