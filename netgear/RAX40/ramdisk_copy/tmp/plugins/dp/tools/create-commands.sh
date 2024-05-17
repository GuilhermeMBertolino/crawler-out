#!/bin/sh
. /tmp/plugins/dp/tools/datapath.sh
ROOT_DIR=/tmp/plugins/dp/tools
if [ "$1" = "na" -o $# -eq 0 ]; then
PATH1=LAN-WAN-ETH-NA
else
PATH1=$1
fi
functionname=`echo $PATH1|sed 's/-//g'`
$functionname
cat $ROOT_DIR/test1.plugin >  $ROOT_DIR/datapath.template1
rm -rf $ROOT_DIR/test1.plugin
