#!/bin/sh
if [ -z $CIRCLE_TMP ]; then
	echo "env variable CIRCLE_TMP not set"
	exit 1
fi
if [ -z $CIRCLE_DATA ]; then
	echo "env variable CIRCLE_ROOT not set"
	exit 1
fi

mkdir -p ${CIRCLE_TMP}/debug
rm -f ${CIRCLE_TMP}/debug.tgz
large_file_flag=0

while getopts "L" opt; do
    case "$opt" in
    L)
		large_file_flag=1
		;;
    esac
done

#Add tmp files
mkdir -p ${CIRCLE_TMP}/debug/tmp
cp -f ${CIRCLE_TMP}/CIRCLE_* ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/MAC ${CIRCLE_TMP}/TZ ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/gwmac ${CIRCLE_TMP}/networkstatus ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/*.log ${CIRCLE_TMP}/tid_debug.txt ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/battery_percent ${CIRCLE_TMP}/eth_connected ${CIRCLE_TMP}/flag_* ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/iplist ${CIRCLE_TMP}/ip6list.txt ${CIRCLE_TMP}/ip6-router.txt ${CIRCLE_TMP}/managed_devices.txt ${CIRCLE_TMP}/debug/tmp/
cp -f ${CIRCLE_TMP}/versions  ${CIRCLE_TMP}/torlist.ver ${CIRCLE_TMP}/debug/tmp/

#Add CIRCLE_DATA Files 
mkdir -p ${CIRCLE_TMP}/debug/data
cp -f ${CIRCLE_DATA}/hotspot_pass  ${CIRCLE_TMP}/debug/data/hotspot_pass
cp -f ${CIRCLE_DATA}/cloudhost  ${CIRCLE_TMP}/debug/data/cloudhost
cp -f ${CIRCLE_DATA}/cloudenv  ${CIRCLE_TMP}/debug/data/cloudenv
cp -f ${CIRCLE_DATA}/circle_uuid  ${CIRCLE_TMP}/debug/data/circle_uuid
cp -f ${CIRCLE_DATA}/compatible_mode  ${CIRCLE_TMP}/debug/data/compatible_mode
cp -f ${CIRCLE_DATA}/platforms.ver  ${CIRCLE_TMP}/debug/data/platforms.ver
cp -f ${CIRCLE_DATA}/platforms.xml  ${CIRCLE_TMP}/debug/data/platforms.xml
cp -f ${CIRCLE_DATA}/circle-customized.txt  ${CIRCLE_TMP}/debug/data/circle-customized.txt
cp -f ${CIRCLE_DATA}/circleservers  ${CIRCLE_TMP}/debug/data/circleservers
cp -f ${CIRCLE_DATA}/circleservers.ver  ${CIRCLE_TMP}/debug/data/circleservers.ver

mkdir -p ${CIRCLE_TMP}/debug/data/api_log
cp -f ${CIRCLE_DATA}/api_log*  ${CIRCLE_TMP}/debug/data/api_log

mkdir -p ${CIRCLE_TMP}/debug/tracking
cp -fr ${CIRCLE_DATA}/tracking  ${CIRCLE_TMP}/debug/tracking

#Add command output files
mkdir -p ${CIRCLE_TMP}/debug/out
ifconfig > ${CIRCLE_TMP}/debug/out/ifconfig.out
uptime > ${CIRCLE_TMP}/debug/out/uptime.out
date > ${CIRCLE_TMP}/debug/out/date.out

if [ "$large_file_flag" -gt 0 ]; then
	cp -f ${CIRCLE_TMP}/circle-queue.bin  ${CIRCLE_TMP}/debug/circle-queue.bin
	cp -f ${CIRCLE_TMP}/dnscache.bin  ${CIRCLE_TMP}/debug/dnscache.bin
fi
tar -C ${CIRCLE_TMP} -czf ${CIRCLE_TMP}/debug.tgz debug
rm -rf ${CIRCLE_TMP}/debug

if [ ! -s ${CIRCLE_TMP}/debug.tgz ] ; then
	echo "failed to create debug.tgz file"
	exit 1
fi
exit 0
