#!/bin/sh

for i in 1;
do
	#for brecis linux
	#ping -c 1 168.95.1.1 
	#for BusyBox v1.00-rc2(RDC3210)
	ping 192.168.122.18
	ping 168.95.1.1
	for j in 1 2;
	do
		echo "ping"
	done
done
