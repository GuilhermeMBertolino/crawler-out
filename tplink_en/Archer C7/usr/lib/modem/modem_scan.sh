#!/bin/sh

ignore_tty()
{
	local tty=$1

	local dev="$idV $idP $tty"

	
	local ignorance0="19d2 2002 ttyUSB1"
	local ignorance1="19d2 0031 ttyUSB1"
	local ignorance2="2357 9000 ttyUSB1"
	local ignorance3="2357 0201 ttyUSB1"
	local ignorance4="2001 7d02 ttyUSB1"
	local ignorance5="2001 7d02 ttyUSB3"
	local ignorance6="2001 7d02 ttyUSB4"

	if [ "$dev" = "$ignorance0" -o "$dev" = "$ignorance1" -o "$dev" = "$ignorance2" -o "$dev" = "$ignorance3" -o "$dev" = "$ignorance4" -o "$dev" = "$ignorance5" -o "$dev" = "$ignorance6" ]; then
		return 1
	fi

	return 0
}



log() {
	echo "Modem scan tty" "$@" >> /dev/console
}

modem_scan_allport()
{	
	local ret=1
	rm -f ${MODEMTMP}/search_tty
	rm -f ${MODEMTMP}/alltty
	rm -f ${MODEMTMP}/ttylist

	cat $BUSFILE > ${MODEMTMP}/search_tty
	${MODEMLIB}/search_tty.lua $idV $idP

	local retval=$?

	if [ $retval = 1 ]; then
		return 1
	fi

	tty_list=$(cat ${MODEMTMP}/alltty)
	syslog $LOG_ALLPORT "serch the all port,tty_list is $tty_list"
	for t in ${tty_list} 
	do
		ignore_tty $t
		retval=$?
		if [ $retval = 1 ]; then
			log "ignore tty $t" 
			continue
		fi

		ox=$(modem_scan -d /dev/${t} -f "chat -V -E -f /etc/chat/chat-modem-configure" 2>/dev/null)
		syslog $LOG_ALLPORT "run script chat-modem-configure with device ${t},retval=$ox"

		if `echo ${ox} | grep "established" 1>/dev/null 2>&1`
		then			
			log "modem-configure OK"
			syslog $LOG_ALLPORT "modem-configure OK,device ${t} is available"
			echo "${t}" >> "${MODEMTMP}/ttylist"
			ret=0
			sleep 1
			continue
		else
			ox=$(modem_scan -d /dev/${t} -f "chat -V -E -f /etc/chat/chat-gsm-test-qualcomm" 2>/dev/null)
			syslog $LOG_ALLPORT "run script chat-gsm-test-qualcomm with device ${t},retval=$ox"
			if `echo ${ox} | grep "established" 1>/dev/null 2>&1`
			then
				log "modem-gsm-test-qualcomm OK"
				syslog $LOG_ALLPORT "modem-configure fail,modem-gsm-test-qualcomm OK,device ${t} is available"
				echo "${t}" >> "${MODEMTMP}/ttylist"
				ret=0			
			else
				log "try next tty"
				syslog $LOG_ALLPORT "all modem-configure and modem-gsm-test-qualcomm fail,device ${t} is not available,try next tty"
				sleep 1
				continue
			fi
		fi
	done

	rm -f ${MODEMTMP}/search_tty
	rm -f ${MODEMTMP}/alltty
	
	return $ret

}

modem_scan_cport()
{
	local ret=1	

	tty_list=$(cat ${MODEMTMP}/ttylist)
	syslog $LOG_START_SCAN_CPORT "start search available cport in $tty_list"
	for t in ${tty_list}
	do
		OX=$(gcom -d /dev/${t} -s /etc/gcom/reset.gcom 2>/dev/null)
		syslog $LOG_START_SCAN_CPORT "run script reset.gcom with device ${t},retval=$OX"
		if `echo ${OX} | grep "OK" 1>/dev/null 2>&1`
		then
			log "Modem Reset OK"
			syslog $LOG_START_SCAN_CPORT "modem reset OK,device ${t} is available"
			uci set modem.modeminfo.cport=${t}
			uci commit
			ret=0
			break			
		else
			log "try next tty"
			syslog $LOG_START_SCAN_CPORT "modem reset Fail,device ${t} is not available,try next tty"
			sleep 1
			continue
		fi
	done

	return $ret

}
