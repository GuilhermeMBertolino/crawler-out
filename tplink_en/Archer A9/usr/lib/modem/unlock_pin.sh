#!/bin/sh

# return value:
# 0 : pin is already unlocked.
# 1 : need pin code.
# 2 : need PUK code.
# 3 : wrong pincode
# 4 : unlock sucessfully
# 5 : unknown pin status
# 6 : fail
# 7 : modem identifying
# 8 : another instance is running
MODEMLIB=/usr/lib/modem

. ${MODEMLIB}/usbmodem_log.sh
log() {
	echo "==>Modem Unlock PIN" "$@" >> /dev/console
}

# qmi_unlock_pin cdc-wdm0 1234
qmi_unlock_pin()
{
	local dev_full_path
	local count=0
	local count_st=0
	dev_full_path="$( ls /dev/"$1" )"
	local conn_st
	while [ $count_st -lt 6 ]; do
		conn_st=`ubus call network.interface.mobile status`
		count_st=$(($count_st+1))
		echo $conn_st | grep "disconnected"
		if [ $? -eq 0 ];then
			break;
		fi
		sleep 1
	done
	syslog $LOG_UNLOCK_PIN "run the command to ensure the uim initialized(uqmi -s -d $dev_full_path --get-pin-status)"
	while uqmi -s -d $dev_full_path --get-pin-status | grep '"UIM uninitialized"' > /dev/null; do
		count=$(($count+1))
		sleep 1
		if [ $count -gt 15 ];then
			log "uqmi get pin status:UIM uninitialized"
			syslog $LOG_UNLOCK_PIN "uqmi get pin status:UIM uninitialized.count=$count"
			break
		fi
	done
	syslog $LOG_UNLOCK_PIN "run the command to check pin is disabled or not(uqmi -s -d $dev_full_path --get-pin-status)."
	uqmi -s -d $dev_full_path --get-pin-status | grep '"disabled"'
	if [ $? -eq 0 ];then
		#echo pin is disabled.
		syslog $LOG_UNLOCK_PIN "the pin is disabled."
		return 0
	fi
	syslog $LOG_UNLOCK_PIN "run the command to unlock pin(uqmi -s -d $dev_full_path --verify-pin1 $2)."
	uqmi -s -d $dev_full_path --verify-pin1 "$2" || {
		log "unable to verify PIN"	
		local ret=""
		qmi_query_pin $1 $2
		ret=$?
		if [ $ret -eq 2 ];then
			return 2
		fi
		syslog $LOG_UNLOCK_PIN "qmi_unlock_pin with PINCODE $2 fail."
		return 3
	}
	local val=""
	qmi_query_pin $1 $2
	val=$?
	if [ $val -eq 2 ];then
		return 2
	fi
	syslog $LOG_UNLOCK_PIN "qmi_unlock_pin with PINCODE $2 succeed."
	return 4
}

# at_unlock_pin ttyUSB1 1234
tty_unlock_pin()
{
	device="$1"
	export PINCODE="$2"
	syslog $LOG_UNLOCK_PIN "run the command to unlock pin(gcom -d /dev/${device} -s /etc/gcom/setpin.gcom)."
	gcom -d /dev/${device} -s /etc/gcom/setpin.gcom || {
		log "unlock pin fail: ${device}"		
		local ret=""
		tty_query_pin $1 $2
		ret=$?
		if [ $ret -eq 2 ];then
			#syslog $LOG_UNLOCK_PIN "the count of tty unlock is more than 3,need PUK."
			return 2
		fi
		syslog $LOG_UNLOCK_PIN "tty_unlock_pin with PINCODE $PINCODE fail."
		return 3
	}
	local val=""
	tty_query_pin $1 $2
	val=$?
	if [ $val -eq 2 ];then
		return 2
	fi	
	syslog $LOG_UNLOCK_PIN "tty_unlock_pin with PINCODE $PINCODE succeed."
	return 4
}

_unlock_pin()
{
	local ret=3
	case "$1" in
	"3g" | "ncm" )
		tty_unlock_pin $2 $3
		ret=$?
		;;
	"qmi" )
		qmi_unlock_pin $2 $3
		ret=$?
		;;
	"mbim" )
		
		;;
	esac

	return $ret
}


## qmi_query_pin cdc-wdm0 1234
qmi_query_pin()
{
	local dev_full_path
	local count=0
	dev_full_path="$( ls /dev/"$1" )"
	while uqmi -s -d $dev_full_path --get-pin-status | grep '"UIM uninitialized"' > /dev/null; do
		count=$(($count+1))
		sleep 1
		if [ $count -gt 15 ];then
			log "uqmi get pin status:UIM uninitialized"
			break
		fi
	done
	ox=$(uqmi -s -d $dev_full_path --get-pin-status)
	syslog $LOG_UNLOCK_PIN "run the command to query the pin status(uqmi -s -d $dev_full_path --get-pin-status) ox=$ox"
	ox_tmp=$(echo $ox| awk '{split($0,arr,",");print arr[1]}')
	syslog $LOG_UNLOCK_PIN "get pin1 status ox_tmp=$ox_tmp"
	if `echo ${ox_tmp} | grep "pin1_status" | grep "disabled" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "qmi query pin status,the retval is 0(pin is disabled)."
		return 0
	elif `echo ${ox_tmp} | grep "pin1_status" | grep "not_verified" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "qmi query pin status,the retval is 1(pin is enabled)."
		return 1
	elif `echo ${ox_tmp} | grep "pin1_status" | grep "verified" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "qmi query pin status,the retval is 4(unlock pin succeed)."
		return 4
	elif `echo ${ox_tmp} | grep "pin1_status" | grep "blocked" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "qmi query pin status,the retval is 2(need PUK)."
		return 2
	fi
	syslog $LOG_UNLOCK_PIN "qmi query pin status,the retval is 5(qmi query pin status fail)."
	return 5
}

# at_unlock_pin ttyUSB1 1234
tty_query_pin()
{
	device="$1"
	PINCODE="$2"
	ox=$(gcom -d /dev/${device} -s /etc/gcom/getpinstatus.gcom 2>/dev/null)
	syslog $LOG_UNLOCK_PIN "run the command to query the pin status(gcom -d /dev/${device} -s /etc/gcom/getpinstatus.gcom),ox=$ox"
	if `echo ${ox} | grep "ready" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "tty query pin status,the retval is 0(pin is disabled)."
		return 0
	elif `echo ${ox} | grep "simpin" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "tty query pin status,the retval is 1(pin is enabled)."
		return 1
	elif `echo ${ox} | grep "simpuk" 1>/dev/null 2>&1`; then
		syslog $LOG_UNLOCK_PIN "tty query pin status,the retval is 2(need PUK)."
		return 2
	fi
	syslog $LOG_UNLOCK_PIN "tty query pin status,the retval is 5(query pin status fail)."
	return 5
}

_query_pin()
{
	local ret=6
	case "$1" in
	"3g" | "ncm" )
		tty_query_pin $2
		ret=$?
		;;
	"qmi" )
		qmi_query_pin $2
		ret=$?
		;;
	"mbim" )
		
		;;
	esac
	return $ret
}

# unlock_pin auto/manual qmi/at dev [PIN]
unlock_pin()
{
	local ret=6
	
	if [ -e /tmp/modem/unlocking_pin ]; then
		echo there is an instance of unlock_pin currently running.
		return 8
	else
		echo 1 > /tmp/modem/unlocking_pin
	fi
	
	if [ "$1" = "auto" ]; then
		if [ -e /tmp/modem/autounlock_fail ]; then
			log "auto unlock can not try again"
			rm /tmp/modem/unlocking_pin
			return 4
		fi
		PINCODE=$(uci get modem.modemisp.pincode)
		syslog $LOG_UNLOCK_PIN "the pincode is $PINCODE."
		if [ -z $PINCODE ]; then
			rm /tmp/modem/unlocking_pin
			return 3
		fi
		_unlock_pin $2 $3 $PINCODE
		ret=$?
		if [ $ret -ne 0 -a $ret -ne 4 ]; then
			echo 1 > /tmp/modem/autounlock_fail
		fi
		
		rm /tmp/modem/unlocking_pin
		return $ret
	elif [ "$1" = "manual" ]; then
		PINCODE=$(uci get modem.modemisp.pincode)
		syslog $LOG_UNLOCK_PIN "the pincode is $PINCODE."
		if [ -z $PINCODE ]; then
			rm /tmp/modem/unlocking_pin
			return 3
		fi
		_unlock_pin $2 $3 $PINCODE
		ret=$?
		if [ $ret -eq 0 -o $ret -eq 4 ]; then
			rm /tmp/modem/autounlock_fail
		fi
		
		rm /tmp/modem/unlocking_pin
		return $ret
	elif [ "$1" = "query" ]; then
		#syslog $LOG_UNLOCK_PIN "query" "$2" "$3" "" ""
		_query_pin $2 $3
		ret=$?
		rm /tmp/modem/unlocking_pin
		return $ret
	else
		rm /tmp/modem/unlocking_pin
		return 5
	fi

}
local retCfg=""
local clickFlag=0
if [ $# = 1 -o $# = 2 ]; then
	proto=$(uci get modem.modeminfo.proto)
	case ${proto} in
	"3g" | "ncm" )
		device=$(uci get modem.modeminfo.cport)
		;;
	"qmi" | "mbim" )
		device="cdc-wdm0"
		;;
	esac
	if [ $# = 2 ]; then
		clickFlag=$2
	fi
elif [ $# = 3 ]; then
	proto=$2
	device=$3
else
	retCfg=5
	uci set modem.modemisp.pinlock=$retCfg
	uci commit modem
	return $retCfg
fi
# unlock_pin auto/manual/query proto device

log "start unlock pin $1 ${proto} ${device}"
syslog $LOG_UNLOCK_PIN "start run unlock_pin.sh $1,proto=$proto device=$device."
if [ x$1 = x"manual" ];then
	local pinTmp=$(uci get modem.modemisp.pincode)
	if [ x$pinTmp = x"" ];then
		log "pincode is null."
		exit 0
	else
		uci set modem.modemisp.pinlock=8
		uci commit modem
	fi
fi
unlock_pin $1 ${proto} ${device}
retCfg=$?
#sometimes the first unlock_pin action return 5(failed), try one more usually success.
if [ $retCfg = 5 ];then
unlock_pin $1 ${proto} ${device}
retCfg=$?
fi
setisp=$(uci get modem.modemisp.setisp)
if [ x$1 = x"manual" -a $retCfg = 4 ];then
	if [ x$setisp = x"auto" ];then
		log " ret=$retCfg unlock pin success,start get isp**********************************************"
		${MODEMLIB}/getisp.sh
	fi
	/etc/init.d/network reload
	if [ $clickFlag = 1 ];then
		ubus call network.interface.mobile connect
	fi
	
fi

uci set modem.modemisp.pinlock=$retCfg
uci commit modem

log "run unlock_pin.sh finshed,the retval is $retCfg"
syslog $LOG_UNLOCK_PIN "run unlock_pin.sh finshed,the retval is $retCfg"
return $retCfg


