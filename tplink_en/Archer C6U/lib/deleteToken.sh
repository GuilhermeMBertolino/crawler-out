#!/bin/sh

#This script is used to delete token when expired.

tokenfile=$1
expired=$2

execfile=`basename $0`
ps -w|grep "$execfile $tokenfile" |grep -v grep |awk '{print $1}' |grep -v $$ |xargs kill -9 >/dev/null 2>&1

sleep $expired

[ -f $tokenfile ] && rm -f $tokenfile

echo "Token expired, delete $tokenfile." >/dev/console 2>&1
