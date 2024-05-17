#!/bin/sh

PROD_SYSID=`awk -F= '/systemid=/{print $2}' /proc/ubnthal/system.info`
[ "${PROD_SYSID}" = "a620" ] && /sbin/smp-mt7622.sh || /sbin/smp-mt7621.sh
