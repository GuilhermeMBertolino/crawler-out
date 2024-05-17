#!/bin/sh   

CFGFILE=$1
while [ 1 ]
do 	
	openvpn --config $CFGFILE ;
	sleep 1;
done
