#!/bin/sh
echo [$0] ["$1"] [$2]  [$3] > /dev/console
case "$1" in
getSPstatus)
	rm /var/spresult
	wget  http://"$2"/HNAP1/ -O /var/spresult --header 'SOAPACTION: http://purenetworks.com/HNAP1/GetSPStatus'  --header 'Authorization: Basic YWRtaW46MTIzNDU2' --header 'Content-Type: text/xml' --post-data '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetSPStatus xmlns="http://purenetworks.com/HNAP1/" /></soap:Body></soap:Envelope>'
	STATUS=`grep "<RelayEnabled>true</RelayEnabled>" /var/spresult`
	if [ "$STATUS" == "" ]; then
		echo "off"
	else
		echo "on"
	fi
	;;
setSPstatus)
	PlugName=`grep PlugName /var/spresult | sed -r 's/.*<PlugName>//' | sed -r 's/<\/PlugName>.*//'`
	rm /var/spsetresult
	if [ "$3" == "on" ]; then
		wget  http://"$2"/HNAP1/ -O /var/spsetresult --header 'SOAPACTION: http://purenetworks.com/HNAP1/SetSPRelayMode'  --header 'Authorization: Basic YWRtaW46MTIzNDU2' --header 'Content-Type: text/xml' --post-data '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SetSPRelayMode xmlns="http://purenetworks.com/HNAP1/"><RelayInfo><PlugName>'"$PlugName"'</PlugName><RelayEnabled>true</RelayEnabled></RelayInfo></SetSPRelayMode></soap:Body></soap:Envelope>'
	fi
	if [ "$3" == "off" ]; then
		wget  http://"$2"/HNAP1/ -O /var/spsetresult --header 'SOAPACTION: http://purenetworks.com/HNAP1/SetSPRelayMode'  --header 'Authorization: Basic YWRtaW46MTIzNDU2' --header 'Content-Type: text/xml' --post-data '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SetSPRelayMode xmlns="http://purenetworks.com/HNAP1/"><RelayInfo><PlugName>'"$PlugName"'</PlugName><RelayEnabled>false</RelayEnabled></RelayInfo></SetSPRelayMode></soap:Body></soap:Envelope>'
	fi
	#wget  http://192.168.0.184/HNAP1/ -O /var/spsetresult --header 'SOAPACTION: http://purenetworks.com/HNAP1/SetSPRelayMode'  --header 'Authorization: Basic YWRtaW46MTIzNDU2' --header 'Content-Type: text/xml' --post-data '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SetSPRelayMode xmlns="http://purenetworks.com/HNAP1/"><RelayInfo><PlugName>'"$PlugName"'</PlugName><RelayEnabled>true</RelayEnabled></RelayInfo></SetSPRelayMode></soap:Body></soap:Envelope>'
	STATUS=`grep "<SetSPRelayModeResult>OK</SetSPRelayModeResult>" /var/spsetresult`
	if [ "$STATUS" == "" ]; then
		echo "FAIL"
	else
		echo "OK"
	fi
	;;
*)
	echo "hnapsp.sh [getSPstatus|setSPstatus] ipaddr [on|off]"
	echo error
	;;
esac
