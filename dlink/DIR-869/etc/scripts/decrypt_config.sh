#!/bin/bash 
sign=`xmldbc -g /runtime/device/image_sign`
tpyrcrsu 4
key=`cat /tmp/imagesign`
for filename in "$@"
do
openssl enc -aes-256-cbc -in $filename -out /var/config_.xml.gz -d -k $key
echo "[$filename] decrypt!" > /dev/console
done
