#!/bin/sh
tpyrcrsu 4
sign=`xmldbc -g /runtime/device/image_sign`
devn=`cat /etc/config/devconf`
xmldbc -P /etc/scripts/dlcfg_hlper.php -V ACTION=STARTTODOWNLOADFILE
xmldbc -d /var/config.xml
xmldbc -P /etc/scripts/dlcfg_hlper.php -V ACTION=ENDTODOWNLOADFILE
gzip /var/config.xml
key=`cat /tmp/imagesign`
openssl enc -aes-256-cbc -in /var/config.xml.gz -out /var/config_aes.xml.gz -e -k $key
seama -i /var/config_aes.xml.gz -m signature=$sign -m noheader=1 -m type=devconf -m dev=$devn
mv /var/config_aes.xml.gz.seama /htdocs/web/docs/config.bin
rm -f /var/config_aes.xml.gz /var/config_aes.xml.gz.seama /var/config.xml /var/config.xml.gz
echo "[$0]: config.bin generated!" > /dev/console
