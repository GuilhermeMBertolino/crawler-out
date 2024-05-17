#!/bin/sh
UBI_VOL_ID_MISC2=$(ubinfo /dev/ubi0 -N misc2 | grep 'Volume ID' | cut -d':' -f2  | cut -d'(' -f1 | cut -d' ' -f4)
UBI_VOL_ID_MISC3=$(ubinfo /dev/ubi0 -N misc3 | grep 'Volume ID' | cut -d':' -f2  | cut -d'(' -f1 | cut -d' ' -f4)
echo "=============S36 Mount acos file system!"
if [ -z $UBI_VOL_ID_MISC2 ]; then
    echo "=============Create misc2!"
    ubimkvol /dev/ubi0 -n 51 -s 4MiB -N misc2
else
    echo "=============misc2 exist!!"
fi
echo "=============mount misc2 to /misc2@"
mount -t ubifs ubi:misc2 /misc2

if [ -z $UBI_VOL_ID_MISC3 ]; then
    echo "=============Create misc3!"
    ubimkvol /dev/ubi0 -n 52 -s 4MiB -N misc3
else
    echo "=============misc3 exist!!"
fi
echo "=============mount misc3 to /misc3@"
mount -t ubifs ubi:misc3 /misc3
