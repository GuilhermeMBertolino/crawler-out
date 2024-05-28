#!/bin/sh

local uVid uPid uMa uPr uSe
local idV idP

export MODEMLIB=/usr/lib/modem
export MODEMTMP=/tmp/modem
export BUSFILE=/proc/bus/usb/devices
export MODEMCFG=/etc/config/modem
export NETWORKCFG=/etc/config/network

#. ${MODEMLIB}/modem_scan.sh
. ${MODEMLIB}/usbmodem_log.sh

local modeswitch="/usr/bin/usb_modeswitch"

log() {
	echo "==>handle card" "$@" >> /dev/console
}

sanitize() {
	sed -e 's/[[:space:]]\+$//; s/[[:space:]]\+/_/g' "$@"
}

find_usb_attrs() {
	local usb_dir="/sys$DEVPATH"
	[ -f "$usb_dir/idVendor" ] || usb_dir="${usb_dir%/*}"

	uVid=$(cat "$usb_dir/idVendor")
	uPid=$(cat "$usb_dir/idProduct")
	uMa=$(sanitize "$usb_dir/manufacturer")
	uPr=$(sanitize "$usb_dir/product")
	uSe=$(sanitize "$usb_dir/serial")
}

display_top() {
	log "*****************************************************************"
	log "*"
}

display_bottom() {
	log "*****************************************************************"
}


display() {
	local line1=$1
	log "* $line1"
	log "*"
}

#
# delay until httpd done
#
bootdelay() {
	if [ ! -f /tmp/run/uhttpd_main.pid ]; then
		log "Delay for boot up"
		sleep 10
		while [ ! -f /tmp/run/uhttpd_main.pid ]; do
			sleep 1
		done
		sleep 10
	fi
}

wait_proc_mount() {
	local count=0
	while [ ! -f $BUSFILE ]; do
		count=$(($count+1))
		if [ $count -gt 5 ];then
			log "before mode-switch,no procfs!!!!!!"
			syslog $LOG_MODESWITCH_S "before mode-switch,no procfs.times_sum=5"
			break
		fi
		syslog $LOG_MODESWITCH_S "before mode-switch,check procfs times=$count."
		log "before mode-switch,check procfs times=$count."
		sleep 2
	done
	syslog $LOG_MODESWITCH_S "end check procfs times_sum=$count."
}

check_success_switch()
{
	usb_dir="/sys$DEVPATH"
	idV="$(sanitize "$usb_dir/idVendor")"
	idP="$(sanitize "$usb_dir/idProduct")"
	
	cat $BUSFILE > ${MODEMTMP}/checkswitchmode
	${MODEMLIB}/check_switchmode.lua $idV $idP
	local retval=$?
	rm -f ${MODEMTMP}/checkswitchmode
	return $retval
}

fuzzy_switch()
{
	file_19d2=`find /etc/usb_modeswitch.d/ -name "19d2*" -type f | sort` 
	file_12d1=`find /etc/usb_modeswitch.d/ -name "12d1*" -type f | sort`
	file_others=`find /etc/usb_modeswitch.d/ -name "ffff*" -type f | sort`
	local vid
	local pid
	if [ $# -lt 2 ];then
		return 0
	else
		vid=$1
		pid=$2
	fi
	if [ "$vid" = "19d2" ];then
		for file in $file_19d2
		do 
		    syslog $LOG_MODESWITCH_S "fuzzy switch with $file."
			usb_modeswitch -v $vid -p $pid -c $file
			sleep 8
			check_success_switch $vid $pid
			local ret=$?
			if [ $ret = 1 ];then
				return 1
			fi
		done
	elif [ "$vid" = "12d1" ];then
		for file in $file_12d1
		do 
			syslog $LOG_MODESWITCH_S "fuzzy switch with $file."
			usb_modeswitch -v $vid -p $pid -c $file
			sleep 8
			check_success_switch $vid $pid
			local ret=$?
			if [ $ret = 1 ];then
				return 1
			fi
		done
	else
		for file in $file_others
		do 
			syslog $LOG_MODESWITCH_S "fuzzy switch with $file."
			usb_modeswitch -v $vid -p $pid -c $file
			sleep 8
			check_success_switch $vid $pid
			local ret=$?
			if [ $ret = 1 ];then
				return 1
			fi
		done		
	fi
	return 0
}


if [ ! -d "${MODEMTMP}" ]; then
	mkdir -p "$MODEMTMP"
fi

#
# Add Modem and connect
#
if [ "$ACTION" = add ]; then

	if [ -z $BUSNUM ]; then
		exit 0
	fi

	if echo $DEVICENAME | grep -q ":" ; then
		exit 0
	fi

	find_usb_attrs
	
	if [ -z $uMa ]; then
		log "Ignoring Unnamed Hub"
		exit 0
	fi

	UPR=${uPr}
	CT=`echo $UPR | tr '[A-Z]' '[a-z]'`
	if echo $CT | grep -q "hub" ; then
		log "Ignoring Named Hub"
		exit 0
	fi

	if [ $uVid = 1d6b ]; then
		log "Ignoring Linux Hub"
		exit 0
	fi
    
	wait_proc_mount
    modem_printer $uVid $uPid
    if [ "$?" = "0" ];then
        log "Ignoring printer"
        exit 0
    fi

    if [ "$uVid" = "0930" -a "$uPid" = "6545" ];then
		log "storage"
		exit 0
	fi
	bootdelay
	syslog $LOG_CARD_PLUGIN
	if [ -f ${MODEMTMP}/modem_handled ]; then
		log "Modem is handled"
		syslog $LOG_HANDLED_TWICE
		exit 0
	elif [ -f ${MODEMTMP}/modem_handling ]; then
		log "modem is handling"
		syslog $LOG_HANDLEING_TWICE
		exit 0
	fi

	log "Add : $DEVICENAME: Manufacturer=${uMa:-?} Product=${uPr:-?} Serial=${uSe:-?} $uVid $uPid"
	syslog $LOG_MODEM_INFO_ORI "$uVid" "$uPid" "${uMa:-?}" "${uPr:-?}" "${uSe:-?}"
	idV=$uVid
	idP=$uPid

	FILEN=$uVid:$uPid
	FILEM=$uVid:
	display_top; display "Start of Modem Detection and Connection Information" 
	display "Product=${uPr:-?} $uVid $uPid"; display_bottom

	uci set modem.modeminfo.defaultvid=$uVid
	uci set modem.modeminfo.defaultpid=$uPid
	uci set modem.modeminfo.modem_type=$uPr
	
	uci set modem.modemisp.ispstatus='0'
	uci commit modem

	cat ${BUSFILE} > ${MODEMTMP}/prembim
	${MODEMLIB}/mbimfind.lua $uVid $uPid 
	local retval=$?
	rm -f ${MODEMTMP}/prembim
	awk -f $MODEMLIB/log_awk $BUSFILE
	if [ $retval -eq 11 ]; then
		display_top; display "Found MBIM Modem at $DEVICENAME"; display_bottom
		echo 2 >/sys/bus/usb/devices/$DEVICENAME/bConfigurationValue
		syslog $LOG_IS_MBIM
		uci set modem.modeminfo.proto="mbim"
		uci commit modem
	else
		check_success_switch
		local befval=$?
		if [ $befval = 0 ]; then
		syslog $LOG_MODESWITCH_S "start switch mode of modem."
		if grep "$FILEN" /etc/usb-mode.json > /dev/null ; then
			#logx -p $$ 292 5
			echo "1" > ${MODEMTMP}/modem_handling
			uci set modem.modemconf.modemstatus=1
			uci commit modem

                        syslog $LOG_MODESWITCH_S "modeswitch with modeswtich vid pid."
			modeswitch $idV $idP  >> /dev/console
                        sleep 10

			check_success_switch
			local switch_ret=$?
			if [ $switch_ret = 0 ]; then
				syslog $LOG_MODESWITCH_S "modeswitch with specific pid fail, start usbmode switch."
				usbmode -s >> /dev/console
				sleep 8 
			fi
			


		elif grep "$FILEM" /etc/usb-mode.json > /dev/null; then
			#logx -p $$ 292 6
				syslog $LOG_MODESWITCH_S "no switch message with usb-mode,start fuzzy switch."
			if [ "$uVid" = "04e8" -o "$uVid" = "04E8" ];then
				log "vid=04e8 stroge device."
				exit 0
			fi
			echo "1" > ${MODEMTMP}/modem_handling
			uci set modem.modemconf.modemstatus=1
			uci commit modem
			fuzzy_switch $uVid $uPid
				#sleep 10
		else
			syslog $LOG_MODESWITCH_S "fuzzy switch fail,this device does not have a switch data file ."
			display_top; display "This device does not have a switch data file" 
			display "Product=${uPr:-?} $uVid $uPid"; display_bottom
			exit 0
		fi
		else
			log  "this device dont modeswitch."
			syslog $LOG_MODESWITCH_S "this device dont modeswitch."
			echo "1" > ${MODEMTMP}/modem_handling
			uci set modem.modemconf.modemstatus=1
			uci commit modem
		fi
	fi
	#sleep 10
	check_success_switch
	local retval=$?
	if [ $retval = 0 ]; then
		log "Cannot switch this modem"
		rm -f ${MODEMTMP}/modem_handling
		uci set modem.modemconf.modemstatus=3
		uci commit modem
		#logx -p $$ 292 7
		syslog $LOG_N_MODESWITCH_FAIL
		#syslog $LOG_N_MODESWITCH_FAIL
		exit 0
	fi

	echo $DEVPATH > /tmp/modem_dev_path
	echo $DEVPATH >> /dev/console

	PORTFILE="/tmp/modem/USBPORTNUM"
	if [ -e $PORTFILE ];then
		USBPORT=$(cat $PORTFILE)
		if [ -n $USBPORT ];then
			ledcli ${USBPORT}_twinkle
		fi			
	fi

	uci delete network.mobile
	uci commit network
	/etc/init.d/network reload
    sleep 2

	uci set modem.modeminfo.targetvid=$idV
	uci set modem.modeminfo.targetpid=$idP
	uci commit modem
	#logx -p $$ 292 8 "$idV" "$idP"
	syslog $LOG_MODESWITCH_SUCCEED "$idV" "$idP"
	#syslog $LOG_N_MODESWITCH_SUCCEED
	awk -f $MODEMLIB/log_awk $BUSFILE
	display_top; display "Switched to : $idV:$idP"; display_bottom

	if [ $idV = 2357 -a $idP = 9000 ]; then
		sleep 10
	fi


	if [ "$idV" = 1bbb -a "$idP" = 022c ]; then
		if [ -d "/lib/print_server" ]; then
			. /lib/print_server/printer_driver.sh
			stop_printer_driver
			syslog "print_server stop."
		fi
	fi
	ox=`modem_handle -a >> /dev/console`
	sleep 2

	if [ "$idV" = 1bbb -a "$idP" = 022c ]; then	
		if [ -f "/etc/init.d/print_server" ]; then
			/etc/init.d/print_server  start
			syslog "print_server start."
		fi
	fi
	if [ $ox -ne 0 ]; then
		log "modem_handle failed"
		syslog $LOG_HANDLE_MODEM_FAIL
		rm -f ${MODEMTMP}/modem_handling
		uci set modem.modemconf.modemstatus=3
		uci commit modem
		exit 0
	fi
	syslog $LOG_HANDLE_MODEM_SUCCEED
	awk -f $MODEMLIB/log_awk $BUSFILE

	echo "######################################################" >> /dev/console
	echo "################before transfer control to bottom half" >> /dev/console
	
	sem_notifier
	echo "################after transfer control to bottom half" >> /dev/console

fi

#
# Remove Modem
#
if [ "$ACTION" = remove ]; then

	if [ -z $BUSNUM ]; then
		log "non busnum"
		exit 0
	fi

	if echo $DEVICENAME | grep -q ":" ; then
		exit 0
	fi
	
	if [ -d "/sys$DEVPATH" ]; then
		log "devpath exist"
		exit 0
	fi

	record_dev_path=`cat /tmp/modem_dev_path`

	echo $record_dev_path >> /dev/console
	echo $DEVPATH >> /dev/console

	if [ x"$record_dev_path" != x"$DEVPATH" ]; then
		log "not a modem unpluged"
		exit 0
	fi

	rm /tmp/modem_dev_path
        rm -f /tmp/3g4gclick

	syslog $LOG_REMOVE_CARD
	modem_handle -r >> /dev/console
	
	ifdown mobile
	uci delete network.mobile
	#uci commit network
    uci_commit_flash network
	/etc/init.d/network reload
	killall -9 usbmode
	killall -9 usb_modeswitch
	killall -9 modem_handle
	killall -9 unlock_pin.sh
	killall -9 getisp.sh
	display_top; display "Remove : $DEVICENAME : Modem"; display_bottom

	uci set modem.modemconf.modemstatus=0
	uci set modem.modemisp.ispstatus=0
	uci set modem.modemisp.pinlock=0
	uci set modem.modemisp.pincode=""
	uci set modem.modemisp.modem_signal=32
	local setisp=$(uci get modem.modemisp.setisp)
	if [ x$setisp = "xselect" ];then
		uci set modem.modemisp.setisp="auto"
	fi
	uci commit modem
	rm -rf ${MODEMTMP}
	
fi

