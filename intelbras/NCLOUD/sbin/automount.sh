#! /bin/sh
if [ "$1" == "" ]; then
	echo "parameter is none" 
	exit 1
else
	echo "***** $1 *****"
fi

cmdFlag=-1
mounted=`mount | grep $1 | wc -l`
# mounted, assume we umount
if [ $mounted -ge 1 ]; then
	killall -q ntfs-3g 
	umount -l "/media/$1"
#	if ! umount -l "/media/$1" ; then
#		exit 1
#	fi
	rm -rf "/media/$1"
# not mounted, lets mount under /media
else
mkdir -p "/media/$1"
#mounted=`mount | grep $1 | wc -l`
#num=5
#getDiskinfo=`fdisk -l | grep  $1 `
#fsName=`echo "$getDiskinfo" | sed 's/.*\(....\)$/\1/'`

#if [[ "$fsName" = "NTFS" ]];then
#	while [ $mounted -lt 1 -a $num -gt 0 ]
#	do
#		echo "ntfs/exfat mount $1" >> /tmp/1
		ntfs-3g "/dev/$1" "/media/$1" -o force 1>/dev/null 2>&1
		mount "/dev/$1" "/media/$1" 1>/dev/null 2>&1
#		mounted=`mount | grep $1 | wc -l`
#		num=`expr $num - 1`
#	done        
#else  
#	while [ $mounted -lt 1 -a $num -gt 0 ]
#	do
#		echo "other mount $1" >> /tmp/1
#		mount "/dev/$1" "/media/$1"		
#		mounted=`mount | grep $1 | wc -l`
#		num=`expr $num - 1`
#	done
#fi

#if [ $mounted -lt 1 ]; then
#	rm -r "/media/$1"
#	exit 1
#fi

if [ "$2" != "" ]; then
	exit 1
fi

fi
# Goahead need to know the event happened.
# Send SIGTTIN to goahead only for the first partition while multi-partitions 
firstpartition=`fdisk -l | grep -E "NTFS|FAT" | head -n 1 |sed 's/\/dev\///g' | sed 's/^\(....\).*/\1/'`
if [[ "$firstpartition" = "$1" ]];then
	sleep 2
	killall -SIGTTIN goahead
fi

exitname=`fdisk -l`
if [[ "$exitname" = "" ]];then
	killall -SIGTTIN goahead
fi

exit 0

