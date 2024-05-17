#!/bin/sh   
while [ 1 ]
do 	
	snmpd -c /etc/snmpd.conf -f;
	sleep 2;
done
