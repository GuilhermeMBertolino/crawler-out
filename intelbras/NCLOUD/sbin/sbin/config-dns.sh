#!/bin/sh

# $Id: //WIFI_SOC/release/SDK_4_1_0_0/source/user/rt2880_app/scripts/config-dns.sh#1 $
# usage: config-dns.sh [<dns1>] [<dns2>]

fname="/etc/resolv.conf"
fbak="/etc/resolv_conf.bak"

# in case no previous file
touch $fname

# backup file without nameserver part
sed -e '/nameserver/d' $fname > $fbak

# set primary and seconday DNS
if [ "$1" != "" ]; then
  echo "nameserver $1" > $fname
else # empty dns
  rm -f $fname
fi
if [ "$2" != "" ]; then
  echo "nameserver $2" >> $fname
fi

cat $fbak >> $fname
rm -f $fbak

