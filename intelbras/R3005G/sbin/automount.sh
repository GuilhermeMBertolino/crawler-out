#! /bin/sh
echo "$1"  >>/tmp/automount.log
echo "$2" >>/tmp/automount.log

if [ "$1" == "" ]; then
	echo "parameter is none"  >>/tmp/automount.log 
	exit 1
fi

num=`echo $1 | awk -F "" '{print $NF}'`
devName=${1%%d*}
mounted=`mount | grep $1 | wc -l`
usb_led=`nvram get usb_led`

if [ $mounted -ge 1 ]; then
	echo "R/tmp/mnt/$1" >>/tmp/automount.log

	mntdir=` mount | grep $1 | awk '{print \$3}'`
	disks=` mount | grep $1 | awk '{print \$1}'`

	if [ "$usb_led" != "" ]; then
		if [ "$mntdir" == "/tmp/mnt/sda1" ]; then
			ledAlways $usb_led 0
		fi
	fi

	for i in $disks; do
		umount $i
	done
	umount $mntdir

	if ! rm -r "$mntdir"; then
		echo "del $mntdir error" >>/tmp/automount.log
	fi

	df > /tmp/df_file
	exit 0
fi

IsUsb=0
if [ "$devName" == "s" ]; then
	IsUsb=`ls /sys/dev/block/ -l |grep $1 |grep usb |wc -l`
	echo "IsUsb = $IsUsb"  >>/tmp/automount.log 

	if [ $IsUsb -ge 1 ]; then
		#eg: sda
		if [ `expr length $1` = 3 ]; then
			if [ $IsUsb -gt 1 ]; then
				exit 0
			fi
			num=1
		else
			dev=`echo $1 | cut -c1-3`
			FirstPart=`ls /dev/$dev[1-9] -l |sed -n '1p' |awk '{print $NF}' |cut -c9`
			if [ $num = $FirstPart ]; then
				num=1
			fi
		fi

		if [ $num = 1 ]; then
			mntdir="/tmp/mnt/sda1"
		else
			mntdir="/tmp/mnt/$1"
		fi

	else
		#hard disk
		if [ `expr length $1` = 3 ]; then
			exit 0
		fi
		dev=`echo $1 | cut -c1-3`
		ext=`fdisk -l |grep $dev |grep Ext |wc -l`
		if [ $ext = 1 ]; then
			# extended partition
			if [ `fdisk -l |grep $1 |grep Ext |wc -l` = 1 ]; then
				exit 0
			fi

			FirstPart=`ls /dev/$dev[1-9] -l |sed -n '2p' |awk '{print $NF}' |cut -c9`
			if [ $num = $FirstPart ]; then
				num=1
			fi
		fi

		if [ $num = 1 ]; then
			mntdir="/root/hd"
		else
			mntdir="/root/hd$num"
		fi
	fi
else
	if [ "$num" -le "1" ]; then
		num=1
		mntdir="/tmp/mnt/mmc1"
	else
		mntdir="/tmp/mnt/mmc$num"
	fi
fi

	echo "mount $mntdir , num = $num"  >>/tmp/automount.log 
#	if [ $num != 1 ]; then
#		echo "not first partition exit!" >>/tmp/automount.log 
#		exit 1
#	fi
	
	echo "mkdir -p $mntdir" >>/tmp/automount.log
	if ! mkdir -p "$mntdir"; then
		echo "mkdir -p $mntdir failed!" >>/tmp/automount.log
		exit 1
	fi		
	
	if ! ntfs-3g "/dev/$1" "$mntdir" ; then
		if ! mount -t vfat -o iocharset=utf8,codepage=936,rw,fmask=0000,dmask=0000 "/dev/$1" "$mntdir"; then
			if ! mount "/dev/$1" "$mntdir"; then
				# failed to mount, clean up mountpoint
				if ! rm -r "$mntdir"; then
					exit 1
				fi
			fi
		fi	
	fi

if [ $num = 1 ]; then
	if [ "$mntdir" == "/tmp/mnt/sda1" ]; then
		mkdir -p /tmp/mnt/sda1/usb
		mkdir -p /tmp/mnt/sda1/share
		if [ "$usb_led" != "" ]; then 
			ledAlways $usb_led 1
		fi
	fi

	if [ "$mntdir" == "/root/hd" ]; then
		[ -d "/root/hd/hd" ] || {
			mkdir -p /root/hd/hd
		}
		[ -d "/root/hd/hd_share" ] || {
			mkdir -p /root/hd/hd_share
		}
	fi

	if [ "$mntdir" == "/tmp/mnt/mmc1" ]; then
		[ -d "/tmp/mnt/mmc1/mmc" ] || {
			mkdir -p /tmp/mnt/mmc1/mmc
		}
		[ -d "/tmp/mnt/mmc1/mmc_share" ] || {
			mkdir -p /tmp/mnt/mmc1/mmc_share
		}
	fi

	smb_num=`mount | grep smbd | wc -l`
	usb_share_enable=`nvram get usb_share_enable`
	if [ $usb_share_enable = 1 -a $smb_num = 0 ];then
		killall smbd
		smbd &
	fi

	if [ $IsUsb -ge 1 ]; then
		simple_cache 0
		simple_cache 1
	fi

fi
df > /tmp/df_file

exit 0

