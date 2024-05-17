#!/bin/sh
file_2g="/tmp/2g_rf"
file_5g1="/tmp/5g1_rf"
file_5g2="/tmp/5g2_rf"
file_2g_checksum="/tmp/2g_rf_checksum"
file_5g1_checksum="/tmp/5g1_rf_checksum"
file_5g2_checksum="/tmp/5g2_rf_checksum"

echo "To get 2G RF checksum, file will be stored in $file_2g_checksum"
nvram show |grep 1:pa2ga >> $file_2g
nvram show |grep 1:maxp2ga >> $file_2g
nvram show |grep 1:rxgains2gelnagaina >> $file_2g
nvram show |grep 1:cckbw >> $file_2g
nvram show |grep 1:ofdmlrbw >> $file_2g
nvram show |grep 1:mcsbw >> $file_2g
nvram get 1:pwr_scale_1db >> $file_2g

md5sum $file_2g > $file_2g_checksum
rm -f $file_2g

echo "To get 5G1 RF checksum, file will be stored in $file_5g1_checksum"
nvram show |grep 0:pa5ga >> $file_5g1
nvram show |grep 0:maxp5ga >> $file_5g1
nvram show |grep 0:rxgains5gmelnagaina >> $file_5g1
nvram show |grep 0:rxgains5gelnagaina >> $file_5g1
nvram get 0:mcsbw205ghpo >> $file_5g1
nvram get 0:mcsbw405ghpo >> $file_5g1
nvram get 0:mcsbw805ghpo >> $file_5g1
nvram get 0:mcsbw1605ghpo >> $file_5g1
nvram get 0:pwr_scale_1db >> $file_5g1

md5sum $file_5g1 > $file_5g1_checksum
rm -f $file_5g1

echo "To get 5G2 RF checksum, file will be stored in $file_5g2_checksum"
nvram show |grep 2:pa5ga >> $file_5g2
nvram show |grep 2:maxp5ga >> $file_5g2
nvram show |grep 2:rxgains5gmelnagaina >> $file_5g2
nvram show |grep 2:rxgains5ghelnagaina >> $file_5g2
nvram get 2:mcsbw205ghpo >> $file_5g2
nvram get 2:mcsbw405ghpo >> $file_5g2
nvram get 2:mcsbw805ghpo >> $file_5g2
nvram get 2:mcsbw1605ghpo >> $file_5g2
nvram get 2:pwr_scale_1db >> $file_5g2

md5sum $file_5g2 > $file_5g2_checksum
rm -f $file_5g2