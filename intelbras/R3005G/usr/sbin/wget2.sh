#!/bin/sh  
 
O_FILE_BAK=$1_$3
O_FILE_NEW=$1
O_FILE_GZIP=$1.gz
URL=$2

wget -O "$O_FILE_BAK" "$URL"

mv "$O_FILE_BAK" "$O_FILE_NEW"
gzip "$O_FILE_NEW"
mv "$O_FILE_GZIP" "$O_FILE_NEW"
sleep 1
echo 3 > /proc/sys/vm/drop_caches
exit 0