#!/bin/sh
. /tmp/plugins/et/tools/endurance.sh
ROOT_DIR=/tmp/plugins/et/tools
if [ "$1" = "na" -o $# -eq 0 ]; then
PATH1=ENDURANCE-TEST-ONE
else
PATH1=$1
fi
functionname=`echo $PATH1|sed 's/-//g'`
$functionname
cat $ROOT_DIR/test1.plugin >  $ROOT_DIR/endurance.template1
rm -rf $ROOT_DIR/test1.plugin
