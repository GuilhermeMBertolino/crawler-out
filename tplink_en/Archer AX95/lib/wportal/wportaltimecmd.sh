#!/bin/sh
. /lib/wportal/wportal.sh
[ -x /tmp/wportal/wportaltime.sh ] && . /tmp/wportal/wportaltime.sh
local cmd=$1
$cmd
