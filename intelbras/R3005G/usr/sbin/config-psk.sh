#!/bin/sh

PSK_FILE=/etc/racoon/psk.txt

usage() 
{
	echo "usage: config-psk.sh [option]..."
	echo "options:"
	echo "	-h				:	print this help"
	echo "	-i				:	ipaddress"
	echo "	-p				:	password"
	exit
}

if [ $# -lt 2 ]; then
        usage
fi

for arg in $*
	do
		if [ "$1" != "" ]
		then
			case "$1" in
				"-i")
					IP="$2"
					shift ;;
				"-p")
					PASSWORD="$2"
					shift ;;
				"-h")
					usage ;;
				*)
					echo "illegal option -- $2"
					usage ;;
				esac
				shift
		fi
	done
	
if [ "$IP" = "" ]; then
	IP=any
fi

if [ ! -f "$PSK_FILE" ]; then
echo "#  IPADDRESS			PASSWORD " >$PSK_FILE
fi

#have_same_remote_ip=`cat $PSK_FILE|grep $IP|wc -l`
have_same_remote_ip=0
if [ $have_same_remote_ip -eq 0 ]; then
	echo "$IP			$PASSWORD"  >>$PSK_FILE
fi

chmod 400 $PSK_FILE	
