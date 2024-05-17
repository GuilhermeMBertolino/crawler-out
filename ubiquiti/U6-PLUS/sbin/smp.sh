#!/bin/sh

PROD_SYSID=`awk -F= '/systemid=/{print $2}' /proc/ubnthal/system.info`
[ "${PROD_SYSID}" = "a642" ] && /sbin/smp-mt7981.sh
[ "${PROD_SYSID}" = "a643" ] && /sbin/smp-mt7981.sh
/sbin/smp-mt7981.sh