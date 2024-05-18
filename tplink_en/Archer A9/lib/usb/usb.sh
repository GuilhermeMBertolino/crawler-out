#!/bin/sh

#syslog define
PROJ_LOG_ID_USB=294
#MSG(USB_DEVICE_STORAGE_FOUND, 51, INF, "[USB %1]New USB device #%2 founded - %3 - Storage")
USB_DEVICE_STORAGE_FOUND=51
#MSG(USB_DEVICE_HUB_FOUND, 52, INF, "[USB %1]New USB device #%2 founded - %3 - Hub)")
USB_DEVICE_HUB_FOUND=52
#MSG(USB_DEVICE_PRINTER_FOUND, 53, INF, "[USB %1]New USB device #%2 founded - %3 - Printer")
USB_DEVICE_PRINTER_FOUND=53
#MSG(USB_DEVICE_DISCONNECT, 54, INF, "[USB %1]USB device #%2 Disconnect")
USB_DEVICE_DISCONNECT=54
#MSG(USB_DEVICE_STORAGE_VOLUMN, 60, INF, "[USB %1]USB device #%2 Storage size %3")
USB_DEVICE_STORAGE_VOLUMN=60

# ddns_syslog log_id log_param
usb_syslog()
{
    local log_id=$1
    shift
    logx -p $$ $PROJ_LOG_ID_USB $log_id "$@"
}

usb_devconn() 
{
	local usb_devfile="/proc/bus/usb/devices"
	local usb_tmp_dir="/tmp/usb"
	local usb_tmp_file="$usb_tmp_dir/usb_device_info"
	local busnum=$1
	local devnum=$2
	local devpath=$3
	local portnum="?"
	local speedstr="?"
	local _busnum, _devnum, _speed, _level, _class
	local T, I
	local item=0
	
	[ -d $usb_tmp_dir ] || mkdir -p $usb_tmp_dir

	if [ "x$busnum" == "x"|| "x$devnum" == "x" || "x$devpath" == "x" ]
	then
		return
	fi

	portnum=$(echo $( expr "$devpath" : ".*\(usb[0-9].*\)" ) | cut -d "-" -f 2 | cut -d "/" -f 1)
	case "$portnum" in 
	[0-9]*)  
		;; 
	*)
		portnum="?"
		;; 
	esac

	#scan
	cat $usb_devfile > $usb_tmp_file
	while read myline
	do
		if [ $item == 1 -a "$myline" == "\n" ]
		then
			item=0
		fi

		T=$(echo "$myline" | grep "T:  Bus=")
		if  [ "x$T" != "x" ]
		then
			if [ $item == 0 ]
			then
				_busnum=$( expr "$myline" : ".*Bus= *0*\([1-9]*[0-9]\).*" )
				_devnum=$( expr "$myline" : ".*Dev#= *0*\([1-9]*[0-9]\).*" )

				[ "x${busnum:0:1}" == "x0" ] && busnum=$( expr "$busnum" : "0*\([1-9]*[0-9]\)" )
				[ "x${devnum:0:1}" == "x0" ] && devnum=$( expr "$devnum" : "0*\([1-9]*[0-9]\)" )

				if [ "x$busnum" == "x$_busnum" -a "x$devnum" == "x$_devnum" ]
				then
					item=1
					_level=$( expr "$myline" : ".*Lev= *\([0-9]*\).*" )
					_speed=$( expr "$myline" : ".*Spd= *0*\([1-9]*[0-9]\).*" )

					if [ "x$_speed" == "x5000" ]
					then
						speedstr="Super speed"
					elif [ "x$_speed" == "x480" ]
					then
						speedstr="High speed"
					elif [ "x$_speed" == "x12" ]
					then
						speedstr="Full speed"
					fi
				fi
			fi
		else
			if [ $item == 1 ]
			then
				manufacturer=$(echo "$manu" | sed 's/^S:  Manufacturer=\(.*\)$/\1/g')

				#Last, save new printer info
				I=$(echo "$myline" | grep "^I:\* If#.*Cls=")
				if [ "x$I" != "x" ]
				then
					_class=$( expr "$myline" : ".*Cls= *\([0-9]*\).*" )
					
					if [ "x$_class" == "x07" ]
					then
						#printer
						usb_syslog $USB_DEVICE_PRINTER_FOUND $portnum $portnum "$speedstr"

					elif [ "x$_class" == "x08" ]
					then
						#storage
						usb_syslog $USB_DEVICE_STORAGE_FOUND $portnum $portnum "$speedstr"

					elif [ "x$_class" == "x09" -a "x$_level" == "x01" ]
					then
						#hub
						usb_syslog $USB_DEVICE_HUB_FOUND $portnum $portnum "$speedstr"

					fi
				fi
			fi
		fi
	done < $usb_tmp_file
}

usb_devdisconn()
{
	local devpath=$1
	local portnum

	if [ "x$devpath" == "x" ]
	then
		return
	fi

	portnum=$(echo $( expr "$devpath" : ".*\(usb[0-9].*\)" ) | cut -d "-" -f 2 | cut -d "/" -f 1)
	case "$portnum" in 
	[0-9]*)  
		;; 
	*)
		portnum="?"
		;; 
	esac

	usb_syslog $USB_DEVICE_DISCONNECT $portnum $portnum
}


usb_storsize()
{
	local devpath=$1
	local line, size, device

	if [ "x$devpath" == "x" ]
	then
		return
	fi

	[ -d $usb_tmp_dir ] || mkdir -p $usb_tmp_dir

	#get size
	device=$(basename $devpath)
	line=$(fdisk -l |grep "Disk .*$device:")
	size=$( expr "$line" : "Disk *.*$device: *\(.*\),.*" )

	#get port number
	portnum=$(echo $( expr "$devpath" : ".*\(usb[0-9].*\)" ) | cut -d "-" -f 2 | cut -d ":" -f 1 | cut -d "/" -f 1)
	case "$portnum" in 
	[0-9]*)  
		;; 
	*)
		portnum="?"
		;; 
	esac

	if [ "x$size" != "x" ]
	then
		usb_syslog $USB_DEVICE_STORAGE_VOLUMN $portnum $portnum "$size"
	fi
}
