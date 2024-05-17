
#!/bin/sh

path=${1-"/tmp/padlogs"}
timestamp=${2-"00000000_000000"}
remove=${3-9999}

tempfile="${path}/logger${timestamp}*"

find_space_infilesys () {
	local avail_space=0
	df $path | awk '{ x = $4 } ; END { if(x > 1) print x }'
}

get_filesystem_type () {
	for i in "$(sed -n 's/^.* \([^ ]*\) '${1}' .*$/\1/p' /proc/mounts)"; do
		if [ "A${i}A" != "AA" ]; then
			pathfound=$(find_space_infilesys $i)
			if [ ${i} == /overlay ] || [ ${i} == /dev ]; then
				continue
                        fi
			if [ "A${pathfound}A" != "AA" ]; then
				echo "--------------"
				echo "$1: copy $tempfile to ${i} ($pathfound Mbytes)" 
				cp $tempfile ${i}
				pad_cleanup.sh ${i} $remove
				echo "--------------"
			fi
		fi 
	done
}

get_storage_location () {
	local fstype_usb="ext3 ext4 fat vfat tfat ubifs ramfs tntfs" 
	for j in $fstype_usb; do
		get_filesystem_type $j 
	done
}


get_storage_location


