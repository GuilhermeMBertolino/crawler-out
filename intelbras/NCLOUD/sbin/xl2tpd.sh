#!/bin/sh

XL2TPD_FILE1=/etc_ro/xl2tpd.conf
XL2TPD_FILE2=/etc_ro/ppp/options.xl2ptd

if [ ! -n "$2" ]; then
  echo "insufficient arguments!"
  echo "Usage: $0 <user> <password> <server_ip>"
  exit 0
fi

USER_NAME="$1"
PASSWORD="$2"
SERVER_IP="$3"

echo "[lac l2tp]"  > $XL2TPD_FILE1
echo "name = $USER_NAME"  >> $XL2TPD_FILE1
echo "lns = $SERVER_IP" >> $XL2TPD_FILE1
echo "pppoptfile = $XL2TPD_FILE2" >> $XL2TPD_FILE1
echo "autodial = yes" >> $XL2TPD_FILE1

echo "debug"  > $XL2TPD_FILE2
echo "remotename l2tp" >> $XL2TPD_FILE2
echo "user \"$USER_NAME\"" >> $XL2TPD_FILE2
echo "password \"$PASSWORD\"" >> $XL2TPD_FILE2
echo "unit 0" >> $XL2TPD_FILE2
echo "lock" >> $XL2TPD_FILE2
echo "nodeflate" >> $XL2TPD_FILE2
echo "nobsdcomp" >> $XL2TPD_FILE2
echo "noauth" >> $XL2TPD_FILE2
echo "persist" >> $XL2TPD_FILE2
echo "usepeerdns" >> $XL2TPD_FILE2
echo "nopcomp" >> $XL2TPD_FILE2
echo "noaccomp" >> $XL2TPD_FILE2
echo "lcp-echo-failure 3" >> $XL2TPD_FILE2
echo "lcp-echo-interval 15" >> $XL2TPD_FILE2
