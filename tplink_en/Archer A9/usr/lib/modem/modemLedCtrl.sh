PORTFILE="/tmp/modem/USBPORTNUM"
state=$1
if [ -e $PORTFILE ];then
	USBPORT=$(cat $PORTFILE)
	if [ -n $USBPORT ];then
		uci set ledctrl.$USBPORT.ledon=$state
        	ledcli $USBPORT
	fi
fi
