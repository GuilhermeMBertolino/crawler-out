#!/bin/sh
file_2g="/tmp/2g_rf"
file_5g="/tmp/5g_rf"
file_2g_checksum="/tmp/2g_rf_checksum"
file_5g_checksum="/tmp/5g_rf_checksum"

echo "To get 2G RF checksum, file will be stored in $file_2g_checksum"
nvram show |grep pci/1/1/pa2ga >> $file_2g
nvram show |grep pci/2/1/pa2ga >> $file_2g
nvram show |grep pci/1/1/maxp2ga >> $file_2g
nvram show |grep pci/1/1/rxgains2gelnagaina >> $file_2g
nvram show |grep pci/2/1/rxgains2gelnagaina >> $file_2g
nvram show |grep pci/1/1/mcsbw >> $file_2g

md5sum $file_2g > $file_2g_checksum
rm -f $file_2g

echo "To get 5G RF checksum, file will be stored in $file_5g_checksum"
nvram show |grep pci/2/1/pa5ga >> $file_5g
nvram show |grep pci/2/1/maxp5ga >> $file_5g
nvram show |grep pci/2/1/rxgains5gelnagaina >> $file_5g
nvram show |grep pci/2/1/mcsbw >> $file_5g

md5sum $file_5g > $file_5g_checksum
rm -f $file_5g