#!/bin/sh

CONSOLEDEV="/dev/console"
SLEEPTIME=60

while :
do
	XMLDBSTA=`ps | grep '[x]mldb ' | scut -f 4` 
	SERVDSTA=`ps | grep '[s]ervd ' | scut -f 4` 
	
	if [ "$XMLDBSTA" == "" ]; then
		echo "xmldb not exist. reboot." > $CONSOLEDEV
		reboot
	elif [ "$XMLDBSTA" == "Z" ]; then
		echo "xmldb is zombie. reboot." > $CONSOLEDEV
		reboot
	fi

	if [ "$SERVDSTA" == "" ]; then
		echo "servd not exist. reboot." > $CONSOLEDEV
		reboot
	elif [ "$SERVDSTA" == "Z" ]; then
		echo "servd is zombie. reboot." > $CONSOLEDEV
		reboot
	fi

	sleep $SLEEPTIME;
done
