#!/bin/sh
#Note: 1. each mtd device is attached as a ubi device. 2. only one volume is created at the device with the name of dedicated mtd device. So mtd device<->ubi device<->volume

BS_LEN=4096

#input: mtd name
get_mount_point()
{
    mount | eval "awk '/ubi[0-9]{1,}:$1/{print \$3}'"
}

#This method doesn't work if the device is unmounted.
#input: mtd name
get_mount_ubi_num()
{
    mount | eval "awk -F: '/ubi[0-9]{1,}:$1/{print \$1}'" | sed 's|ubi||g'
}

#input: mtd name
get_mtd_num()
{
    while read line
    do
        name=$(echo "$line"|awk '{print $4}')
        [ "$name" = "\"${1}\"" ] && echo "$line" | awk -F'mtd|:' '{print $2}'   
    done < /proc/mtd
}

#input: mtd name
get_ubi_num()
{
    local ubilist=$(ubinfo | awk -F: '/Present UBI devices/{print $2}' | sed 's| ||g' | sed 's|,| |g' | sed 's|ubi||g')
    for ubinum in $ubilist;do
        local volname=$(ubinfo -d $ubinum --all | awk -F: '/Name/{print $2}' | sed 's| ||g')
        [ "$volname" = "$1" ] && {
            echo $ubinum
            return
        }
    done
}

#input: ubi num
get_ubi_vol_count()
{
    ubinfo -d $1 | awk -F: '/Volumes count/{print $2}' | sed 's| ||g'
}

mount_ubi_fs()
{
    ###Detail: try to attach mtd and mount ubifs first. If fails, erase and re build ubifs.
    local mtd_name=$1
    local mount_path=$2
    local mount_option=$3
    [ -z "$mtd_name" ] && {
        echo "no mtd name, exit!"
        exit 1
    }

    [ -z "$mount_path" ] && {
        echo "no mount point, exit!"
        exit 2
    }

    mkdir -p $mount_path || {
        echo "$mount_path doesn't exist or can't be created, exit!"
        exit 3
    }
    local mtd_num=$(get_mtd_num $mtd_name)
    if [ -z "$mtd_num" ]; then
        echo "can't find mtd $mtd_name, exit!"
        exit 4
    fi

    # how many bad blocks permitted per 1024 blocks. default is 25.
    # 0 means handled by kernel.
    local bad_block_precent=0

    #the factory partition is small. use a small percent.
    [ "$mtd_name" = "tp_data" -o "$mtd_name" = "radio" ] && bad_block_precent=10

    ##unmount it in case it's mounted.
    local old_mount_point=$(get_mount_point $mtd_name)
    [ -n "$old_mount_point" ] && {
        umount $old_mount_point || {
            echo "unmount fail, exit"
            exit 5
        }
    }

    local ubi_num=$(get_ubi_num $mtd_name)
    if [ -z "$ubi_num" ]; then
        echo "ubi device is not attached, try to attach it now."
        ubi_num=$(ubiattach -m $mtd_num -b $bad_block_precent | awk -F',' '/UBI device number [0-9]{1,}/{print $1}' | awk '{print $4}')
    fi

    ### if still attach fail, erase it
    ### BE CAREFUL! THE PARTITION MAY BE ERASED!!!
    if [ -z "$ubi_num" ]; then
        echo "no ubi partition for $mtd_name found, create it."
        ## erase mtd
        flash_erase /dev/mtd$mtd_num 0 0 

        ##format mtd
        ubiformat /dev/mtd$mtd_num -y

        ##attach mtd
        ubi_num=$(ubiattach -m $mtd_num -b $bad_block_precent | awk -F',' '/UBI device number [0-9]{1,}/{print $1}' | awk '{print $4}')
    fi

    if [ -z "$ubi_num" ]; then
            echo "can't attach mtd $mtd_name, exit!"
            exit 6
    else
        local volume_count=$(get_ubi_vol_count $ubi_num)
        if [ "$volume_count" = "0" ]; then
            echo "ubi device is empty, create new volume."
            ##make a vol, use mtd name as vol name
            ubimkvol /dev/ubi$ubi_num -m -N $mtd_name
            volume_count=$(get_ubi_vol_count $ubi_num)
        fi

        if [ "$volume_count" = "0" ]; then
            echo "can't make new volume $mtd_name, exit!"
            exit 7
        else
            mount -t ubifs $mount_option ubi$ubi_num:$mtd_name $mount_path
        fi
    fi
}

unmount_ubi_fs()
{
	mtd_name=$1

	[ -z "$mtd_name" ] && {
		echo "no mtd name, exit!"
		exit 1
	}

	local mtd_num=$(get_mtd_num $mtd_name)
	if [ -z "$mtd_num" ]; then
		echo "can't find mtd $mtd_name, exit!"
		exit 1
	fi


	local old_mount_point=$(get_mount_point $mtd_name)
	[ -n "$old_mount_point" ] && umount $old_mount_point
}
