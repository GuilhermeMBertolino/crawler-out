#!/bin/sh
sleep 1
eval `flash get HARDWARE_MODEL`
if [ $1 == 'preseted' ]; then
eval `flash get PRESET_VERSION`
dateStr=$PRESET_VERSION
else
dateStr=`date  '+%Y%m%d'`
fi
filename=\"Config-$HARDWARE_MODEL-$dateStr.dat\"
eval `flash get CSID`
echo $CSID >>/var/config.dat

echo "Pragma: no-cache\n"
echo "Cache-control: no-cache\n"
echo "Content-type: application/octet-stream"
echo "Content-Transfer-Encoding: binary"			#  "\n" make Un*x happy
echo "Content-Disposition: attachment; filename=$filename"
echo ""

cat /var/config.dat 2>/dev/null

