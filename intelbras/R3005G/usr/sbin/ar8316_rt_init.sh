#!/bin/sh

usage()
{
	echo "Usage:"
	echo "  $0 L1234 	- config RT3052 with VLAN and WAN at port 4"
	echo "  $0 L123 	- config RT3052 with VLAN and WAN at port 0"
	echo "  $0 L12 		- config RT3052 with VLAN 5 at port 0 and VLAN 1~4 at port 1~4"
	echo "  $0 L1 		- config RT3052 with VLAN 1~5 at port 0~4"	
	exit 0
}

config8316()
{
	switch reg w 14 405555
	switch reg w 98 7f00
	switch reg w e4 00

	switch reg w 70 60606060
	switch reg w 74 ffffff60
	switch reg w 48 a005
	switch reg w 4c a
	
#关闭学习
	switch reg w 94 7f00	
	
#	wys ar reg w 78 100

#打开CPU口接收组播包
	wys ar reg w 0x2c 0x3f003e

#处理大包
	wys ar regbit w 104 13 1 1
	wys ar regbit w 204 13 1 1
	wys ar regbit w 304 13 1 1
	wys ar regbit w 404 13 1 1
	wys ar regbit w 504 13 1 1
	wys ar regbit w 604 13 1 1
	

	
#1qmode val 0:disable ; 1: 进入的打上相应的pvid。
	wys ar regbit w 108 30 2 1
	wys ar regbit w 208 30 2 1 
	wys ar regbit w 308 30 2 1 
	wys ar regbit w 408 30 2 1 
	wys ar regbit w 508 30 2 1 
	wys ar regbit w 608 30 2 1

#进入的打上相应的pvid。
	wys ar regbit w 208 12 1 1 
	wys ar regbit w 308 12 1 1 
	wys ar regbit w 408 12 1 1
	wys ar regbit w 508 12 1 1
	wys ar regbit w 608 12 1 1
		 
#出口规则  0: unmodified 1:untag 2,tag
	wys ar regbit w 104 8 2 2
	wys ar regbit w 204 8 2 1
	wys ar regbit w 304 8 2 1
	wys ar regbit w 404 8 2 1
	wys ar regbit w 504 8 2 1
	wys ar regbit w 604 8 2 1

	wys arvlan add 1
	wys arvlan add 2
	wys ar regbit w 108 0 12 0
	wys ar regbit w 208 0 12 1	

	if [ "$1" = "LLLLW" ]; then		 
	# 11111 100001
		wys arvlan member 1 1f 0  
		wys arvlan member 2 21 0
	  
		wys ar regbit w 308 0 12 1 
		wys ar regbit w 408 0 12 1 
		wys ar regbit w 508 0 12 1 
		wys ar regbit w 608 0 12 2
		
		#禁止MAC学习
		wys ar regbit w 604 14 1 0
		
	elif [ "$1" = "LLLWW" ]; then
	  wys arvlan add 3
	 # 1111 10001 100001
		wys arvlan member 1 f 0  
		wys arvlan member 2 11 0
		wys arvlan member 3 21 0
	 
		wys ar regbit w 308 0 12 1 
		wys ar regbit w 408 0 12 1 
		wys ar regbit w 508 0 12 2 
		wys ar regbit w 608 0 12 3	
		
		#禁止MAC学习
		wys ar regbit w 504 14 1 0	
		wys ar regbit w 604 14 1 0
	
	elif [ "$1" = "LLWWW" ]; then
		wys arvlan add 3
		wys arvlan add 4
	 # 111 1001 10001 100001
		wys arvlan member 1 7 0 
		wys arvlan member 2 9 0  
		wys arvlan member 3 11 0
		wys arvlan member 4 21 0
			 
		wys ar regbit w 308 0 12 1 
		wys ar regbit w 408 0 12 2 
		wys ar regbit w 508 0 12 3 
		wys ar regbit w 608 0 12 4
		
		#禁止MAC学习
		wys ar regbit w 404 14 1 0
		wys ar regbit w 504 14 1 0	
		wys ar regbit w 604 14 1 0
			
	elif [ "$1" = "LWWWW" ]; then
		wys arvlan add 3
		wys arvlan add 4
		wys arvlan add 5
	 # 11 101 1001 10001 100001
		wys arvlan member 1 3 0 
		wys arvlan member 2 5 0 
		wys arvlan member 3 9 0  
		wys arvlan member 4 11 0
		wys arvlan member 5 21 0
	 
		wys ar regbit w 308 0 12 2 
		wys ar regbit w 408 0 12 3 
		wys ar regbit w 508 0 12 4 
		wys ar regbit w 608 0 12 5
		
		#禁止MAC学习
		wys ar regbit w 304 14 1 0
		wys ar regbit w 404 14 1 0
		wys ar regbit w 504 14 1 0	
		wys ar regbit w 604 14 1 0
			
	fi
}




if [ "$1" = "L1234" ]; then
	config8316 LLLLW
	ifconfig eth2 up
	vconfig add eth2 1
	vconfig add eth2 2
	ifconfig eth2.1 up
	ifconfig eth2.2 up
elif [ "$1" = "L123" ]; then
	config8316 LLLWW
	ifconfig eth2 up
	vconfig add eth2 1
	vconfig add eth2 2
	vconfig add eth2 3
	ifconfig eth2.1 up
	ifconfig eth2.2 up
	ifconfig eth2.3 up	

elif [ "$1" = "L12" ]; then
	config8316 LLWWW
	ifconfig eth2 up
	vconfig add eth2 1
	vconfig add eth2 2
	vconfig add eth2 3
	vconfig add eth2 4
	ifconfig eth2.1 up
	ifconfig eth2.2 up
	ifconfig eth2.3 up
	ifconfig eth2.4 up	

elif [ "$1" = "L1" ]; then
	config8316 LWWWW
	ifconfig eth2 up
	vconfig add eth2 1
	vconfig add eth2 2
	vconfig add eth2 3
	vconfig add eth2 4
	vconfig add eth2 5
	ifconfig eth2.1 up
	ifconfig eth2.2 up
	ifconfig eth2.3 up
	ifconfig eth2.4 up
	ifconfig eth2.5 up	
else
	echo "unknown vlan type $2"
	echo ""
	usage $0
fi
