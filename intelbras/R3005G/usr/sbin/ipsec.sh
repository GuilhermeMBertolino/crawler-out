#!/bin/sh   
while [ 1 ]
do 	
	ipsec_daemon -l /etc/racoon/ipsec_daemon.log;
	sleep 1;
done
