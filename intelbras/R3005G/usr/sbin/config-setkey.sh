#!/bin/sh

SETKEY_FILE=/etc/racoon/setkey.conf

usage() 
{
	echo "usage: config-setkey.sh [option]..."
	echo "options:"
	echo "	-h				:	print this help"
	echo "	-A				:	anonymous mode"
	echo "	-ln				:	local network"
	echo "	-rn				:	remote network"
	echo "	-lt				:	local tunnel ipaddr"
	echo "	-rt				:	remote tunnel ipaddr"
	echo "	-m				:	mode(transport/tunnel)"
	echo "	-p				:	ipsec protocol(ah/esp)"
	echo "	-L				:	l2tp over ipsec"
	exit
}

if [ $# -lt 1 ]; then
	usage
fi

#anonymous mode
anon=no

l2tp=no

for arg in $*
	do
		if [ "$1" != "" ]
		then
			case "$1" in
				"-ln")
					LOCAL_NET="$2"
					shift ;;
				"-A")
					anon=yes ;;
				"-rn")
					REMOTE_NET="$2"
					shift ;;
				"-lt")
					LOCAL_TUNNEL="$2"
					shift ;;
				"-rt")
					REMOTE_TUNNEL="$2"
					shift ;;
				"-m")
					MODE="$2"
					shift ;;
				"-p")
					IPSEC_PRO="$2"
					shift ;;
				"-h")
					usage ;;
				"-L")
					l2tp=yes ;;
				*)
					echo "illegal option -- $2"
					usage ;;
				esac
				shift
		fi
	done

if [ ! -f "$SETKEY_FILE" ]; then
echo "#!/sbin/setkey -f" >$SETKEY_FILE
echo "flush;" >>$SETKEY_FILE
echo "spdflush;" >>$SETKEY_FILE
fi

#for l2tp over ipsec nat-t
if [ "$l2tp" = "yes" -a "$LOCAL_TUNNEL" != "" ]; then
	if [ "$REMOTE_TUNNEL" != "" ]; then
	echo "spdadd $LOCAL_TUNNEL/32[1701] $REMOTE_TUNNEL/32[1701] any -P out ipsec esp/transport//require;" >>$SETKEY_FILE
	else
	echo "spdadd $LOCAL_TUNNEL/32[1701] 0.0.0.0/0 any -P out ipsec esp/transport//require;" >>$SETKEY_FILE
	fi
exit
fi

if [ "$anon" = "no" ]; then
echo "spdadd $LOCAL_NET $REMOTE_NET any -P out ipsec $IPSEC_PRO/$MODE/$LOCAL_TUNNEL-$REMOTE_TUNNEL/require;" >>$SETKEY_FILE
echo "spdadd $REMOTE_NET $LOCAL_NET any -P in ipsec $IPSEC_PRO/$MODE/$REMOTE_TUNNEL-$LOCAL_TUNNEL/require;" >>$SETKEY_FILE
fi

