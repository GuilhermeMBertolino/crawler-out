#!/bin/sh

result=0
mtd_part_name="userdata"
mtd_part_dev="/dev/mtdblock2"
mtd_part_size=0x40000
dir_userdata="/var/userdata"
slk="/var/.userdata_locked"
tmp="/var/userdata.tar"
tbz="${tmp}.bz2"
hsh="/var/hashes/userdata_md5"

func_get_mtd()
{
	local mtd_part mtd_char mtd_idx mtd_hex
	mtd_part=`cat /proc/mtd | grep \"$mtd_part_name\"`
	mtd_char=`echo $mtd_part | cut -d':' -f1`
	mtd_hex=`echo $mtd_part | cut -d' ' -f2`
	mtd_idx=`echo $mtd_char | cut -c4-5`
	if [ -n "$mtd_idx" ] && [ $mtd_idx -ge 2 ] ; then
		mtd_part_dev="/dev/mtdblock${mtd_idx}"
		mtd_part_size=`echo $((0x$mtd_hex))`
	else
		#echo "Userdata" "Cannot find MTD partition: $mtd_part_name" > /dev/console
		exit 1
	fi
}

func_mdir()
{
	[ ! -d "/var/hashes" ] && mkdir -p -m 755 "/var/hashes"
}

func_load()
{
	local fsz

	bzcat $mtd_part_dev > $tmp 2>/dev/null
	fsz=`stat -c %s $tmp 2>/dev/null`
	if [ -n "$fsz" ] && [ $fsz -gt 0 ] ; then
		md5sum $tmp > $hsh
		tar xf $tmp -C /var/ 2>/dev/null
	else
		result=1
		rm -f $hsh
		#echo "User load" "Invalid user data in MTD partition: $mtd_part_dev" > /dev/console
	fi
	rm -f $tmp
	rm -f $slk
}

func_tarb()
{
	rm -f $tmp
	cd /var
	#find * -print0 | xargs -0 touch -c -h -t 201001010000.00
	#find * ! -type d -print0 | sort -z | xargs -0 tar -cf $tmp 2>/dev/null
	tar -cf userdata.tar userdata/
	cd - >>/dev/null
	if [ ! -f "$tmp" ] ; then
		echo "User" "Cannot create tarball file: $tmp" > /dev/console
		exit 1
	fi
}

func_save()
{
	local fsz
	rm -f $tbz
	md5sum -c -s $hsh 2>/dev/null
	if [ $? -eq 0 ] ; then
		#echo "Userdata hash is not changed, skip write to MTD partition. Exit." > /dev/console
		rm -f $tmp
		return 0
	fi
	md5sum $tmp > $hsh
	bzip2 -9 $tmp 2>/dev/null
	fsz=`stat -c %s $tbz 2>/dev/null`
	if [ -n "$fsz" ] && [ $fsz -ge 16 ] && [ $fsz -le $mtd_part_size ] ; then
		cat $tbz > $mtd_part_dev
		if [ $? -eq 0 ] ; then
			result=0
			#echo "User save success write to MTD partition: $mtd_part_dev" > /dev/console
		else
			result=1
			#echo "User save" "Error write to MTD partition: $mtd_part_dev" > /dev/console
		fi
	else
		result=1
		#echo "User save" "Invalid storage final data size: $fsz" > /dev/console
	fi
	rm -f $tmp
	rm -f $tbz
}

func_erase()
{
	result=1
}


case "$1" in
load)
	func_get_mtd
	func_mdir
	func_load
	;;
save)
	[ -f "$slk" ] && exit 1
	func_get_mtd
	func_mdir
	func_tarb
	func_save
	;;
erase)
	func_get_mtd
	func_erase
	;;
*)
	echo "Usage: $0 {load|save|erase}"
	exit 1
	;;
esac

exit $result
