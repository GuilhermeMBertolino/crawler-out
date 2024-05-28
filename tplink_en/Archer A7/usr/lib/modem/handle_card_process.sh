#/bin/sh

local uVid uPid uMa uPr uSe
local idV idP

export MODEMLIB=/usr/lib/modem
export MODEMTMP=/tmp/modem
export BUSFILE=/proc/bus/usb/devices
export MODEMCFG=/etc/config/modem
export NETWORKCFG=/etc/config/network

. ${MODEMLIB}/modem_scan.sh
. ${MODEMLIB}/usbmodem_log.sh

log() {
	echo "==>handle card" "$@" >> /dev/console
}

echo "ENABLE_USB" >> /dev/console

/usr/bin/usbpoweron &

while :
do
	echo "############################### top half stand by" >> /dev/console

	sem_receiver

	echo "###############################taken over contorl from bottom half" >> /dev/console
	
	proto=$(uci get modem.modeminfo.proto)

	idV=$(uci get modem.modeminfo.targetvid)
	idP=$(uci get modem.modeminfo.targetpid)
	defVid=$(uci get modem.modeminfo.defaultvid)
	defPid=$(uci get modem.modeminfo.defaultpid)

	if [ $proto = "ncm" ] && [ $idV = "12d1" ] && [ $idP = "1506" ] && [ $defVid = "12d1" ] && [ $defPid = "14fe" ];then
		proto="dhcp"
		uci set modem.modeminfo.proto="dhcp"
		uci set modem.modeminfo.ifname="usb0"
		echo "########handle_process set proto = dhcp" > /dev/console
	fi

	case ${proto} in
	"3g" | "ncm" )
		if [ -e /dev/ttyUSB0 -o -e /dev/ttyACM0 ];then
			log "device OK"
		else
			log "wait device"
			sleep 10
		fi
		if [ $proto = "ncm" ];then
			if [ $idV = "12d1" ] && [ $idP = "1506" ];then
				echo "this is E3276 send reset cmd" >> /dev/console
				resetTTY=$(uci get modem.modeminfo.cport)
				comgt -d "/dev/$resetTTY" -s /etc/gcom/reset.gcom
			fi

		fi
		
		if [ $proto = "3g" ];then
			if [ $idV = "19d2" ] && [ $idP = "0079" ];then
				echo "this is ZTE A356" >> /dev/console
				COMMAND="AT+CFUN=1" gcom -d /dev/ttyUSB1 -s /etc/gcom/runcommand.gcom		
			fi
		fi

		cport=$(uci get modem.modeminfo.cport)

		if [ "${cport}" = "UNSURE_TTY" ]; then
		    
			local found=0
			local retval=$(modem_scan_allport)
			
			if [ "$retval" = 1 ]; then
				log "modem scan allport fail"
				
				syslog $LOG_SEARCHPORT_FAIL
				
				rm -f ${MODEMTMP}/modem_handling
				
				uci set modem.modemconf.modemstatus=3
				
				uci commit modem
				
				exit 0
			fi
			
			local retval=$(modem_scan_cport)
			
			if [ "$retval" = 1 ]; then
				log "modem scan cport fail"
				syslog $LOG_SCAN_CPORT_FAIL 
				rm -f ${MODEMTMP}/modem_handling
				uci set modem.modemconf.modemstatus=3
				uci commit modem
				exit 0
			fi
		fi

		cport=$(uci get modem.modeminfo.cport)
		if [ "${cport}" = "UNSURE_TTY" -o "${cport}" = "NO_TTY" ]; then
			log "no cport found"
		else
			${MODEMLIB}/unlock_pin.sh "query" ${proto} ${cport}
			local pin_lock=$(uci get modem.modemisp.pinlock)
			local setisp_flag=$(uci get modem.modemisp.setisp)
			if [ $pin_lock = 0 -o $pin_lock = 4 ] && [ x$setisp_flag = "xauto" ]; then				
				${MODEMLIB}/getisp.sh
			fi
		fi
		;;
	"qmi" )
		if [ -e /dev/cdc-wdm0 ];then
			log "device OK"
		else
			log "wait device"
			sleep 10
		fi
		${MODEMLIB}/unlock_pin.sh "query"
		local pin_lock=$(uci get modem.modemisp.pinlock)
		local setisp_flag=$(uci get modem.modemisp.setisp)
		if [ $pin_lock = 0 -o $pin_lock = 4 ] && [ x$setisp_flag = "xauto" ]; then
			log "start get isp"
			${MODEMLIB}/getisp.sh
		fi

		;;
	"mbim" )
		
		;;
	"dhcp" )
		log "dhcp modem delay."
		sleep 10
		;;
	esac

	uci delete network.mobile
	
	uci set network.mobile=interface
	
	uci set network.mobile.proto=$proto  
	
	uci set network.mobile.ifname=$(uci get modem.modeminfo.ifname)
	
	uci set network.mobile.apn=$(uci get modem.modemisp.apn)
	
	uci set network.mobile.dialnumber=$(uci get modem.modemisp.dial_num)
	
	uci set network.mobile.username=$(uci get modem.modemisp.username)
	
	uci set network.mobile.password=$(uci get modem.modemisp.password)
	
	uci set network.mobile.auth=$(uci get modem.modemisp.authentype)
	
	uci set network.mobile.conn_mode=$(uci get modem.modemconf.connectmode)
	
	uci set network.mobile.connectable="1"
	
	uci set network.mobile.hostname="WR942NDV1_RU"
	
	uci set network.mobile.broadcast="1"
	
	uci set network.mobile.auto="0"
	
	local idle_time=$(uci get modem.modemconf.maxidletime) 
	
	uci set network.mobile.idle_time=$(expr $idle_time \* 60)
	
	local dns_manual=$(uci get modem.modemconf.manualdns)
	
	if [ x$dns_manual = x"on" ];then
		uci set network.mobile.dns_mode="static"
		uci set network.mobile.peerdns="0"
		local pdns=$(uci get modem.modemconf.primarydns)
		local sdns=$(uci get modem.modemconf.seconddns)
		uci set network.mobile.dns="$pdns $sdns"
	fi
	
	case ${proto} in
	"3g" )
		dport=$(uci get modem.modeminfo.dport)
		uci set network.mobile.device="/dev/${dport}"
        if [ $dport = "UNSURE_TTY" ];then
           uci set network.mobile.testTTY="1"
           uci set network.mobile.nextTryTTY=`head -1 /tmp/modem/ttylist` 
        fi
		;;
	"ncm" )
		cport=$(uci get modem.modeminfo.cport)
		uci set network.mobile.device="/dev/${cport}"
		;;
	"qmi" | "mbim")
		uci set network.mobile.device="/dev/cdc-wdm0"
		;;
	esac
	uci commit network
	awk -f $MODEMLIB/log_awk $NETWORKCFG
	echo "1" > ${MODEMTMP}/modem_handled
	rm -f ${MODEMTMP}/modem_handling
	uci set modem.modemconf.modemstatus=2
	uci commit modem
	
	awk -f $MODEMLIB/log_awk $MODEMCFG
	
	local modem_st=$(uci get modem.modemconf.modemstatus)
	local pin_st=$(uci get modem.modemisp.pinlock)
	if [ $modem_st = 2 ] && [ $pin_st = 0 -o $pin_st = 4 ];then
		log "start network reload"
		syslog $LOG_START_CONNECTING
		/etc/init.d/network reload		
		sleep 3	
	fi

#	ifup mobile
	
done
