#!/bin/sh

usage() 
{
	echo "usage: config-ipsec.sh [option]..."
	echo "options:"
	echo "	-h			:	print this help"
	echo "	-L			:	l2tp over ipsec"
	echo "	-R			:	roadwarrior"
	echo "	-S			:	server mode"
	echo "  -m                      :       exchange mode(main/aggressive)"
	echo "	-ln			:	local network"
	echo "	-rn			:	remote networek"
	echo "	-lt			:	local tunnel ipaddr"
	echo "	-rt			:	remote tunnel ipaddr"
	echo "	-p			:	preshared key password"
	echo "	-p1g			:	phase 1 group(1/2/5)"
	echo "	-p1e			:	phase 1 encryption algorithm(3des/des/aes128/aes192/aes256)"
	echo "	-p1h			:	phase 1 hash algorithm(md5/sha1)"
	echo "	-p1l			:	phase 1 lifetime(sec)"
	echo "	-p2g			:	phase 2 group(1/2/5/0, 0: disable pfs)"
	echo "	-p2e                    :       phase 2 encryption algorithm(3des/des/aes128/aes192/aes256)"
        echo "	-p2a                    :       phase 2 authentication algorithm(md5/sha1)"
        echo "	-p2l                    :       phase 2 lifetime(sec)"
	echo "	-ipc			:	ip compression algorithm(1/0, 1:enable; 0: disable)"
	echo "	-dd			:	dpd delay(sec)"
	echo "	-dt			:	dpd timeout(sec)"
	echo "	-mi			:	my_identifier, identifier sent to the remote host"
	echo "	-mt			:	my_identifier type. address/fqdn/user_fqdn"
	echo "	-pi			:	peers_identifier, peer's identifier to be received"
	echo "	-pt			:	peers_identifier type. address/fqdn/user_fqdn"
	exit
}

if [ $# -lt 3 ]; then
	usage
fi

#echo "** $* **"
mode=net
server=no

for arg in $*
	do
		if [ "$1" != "" ]
		then
			case "$1" in
				"-ln")
					LOCAL_NET="$2"
					shift ;;
				"-rn")
					REMOTE_NET="$2"
					shift ;;
				"-L")
					mode=l2tp ;;
				"-R")
					mode=roadwarrior ;;
				"-S")
					server=yes ;;
				"-m")
					MODE="$2"
					shift ;;
				"-lt")
					LOCAL_TUNNEL="$2"
					shift ;;
				"-rt")
					REMOTE_TUNNEL="$2"
					shift ;;
				"-p1g")
					P1GROUP="$2"
					shift ;;
				"-p1e")
					P1ENCRY="$2"
					shift ;;
				"-p1h")
					P1HASH="$2"
					shift ;;
				"-p1l")
					P1LIFETIME="$2"
					shift ;;
				"-p2g")
                                        P2GROUP="$2"
                                        shift ;;
                                "-p2e")
                                        P2ENCRY="$2"
                                        shift ;;
                                "-p2a")
                                        P2AUTH="$2"
                                        shift ;;
                                "-p2l")
                                        P2LIFETIME="$2"
                                        shift ;;
				"-ipc")
					IPCOMP="$2"
					shift ;;
				"-dd")
					DPD_DELAY="$2"
					shift ;;
				"-dt")
					DPD_TIMEOUT="$2"
					shift ;;
				"-p")
					PASSWORD="$2"
					shift ;;
				"-mi")
					MY_IDENT="$2"
					shift ;;
				"-mt")
					MY_IDENT_TYPE="$2"
					shift ;;
				"-pi")
					PEER_IDENT="$2"
					shift ;;
				"-pt")
					PEER_IDENT_TYPE="$2"
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

if [ "$P1GROUP" = "" ]; then
	P1GROUP=2
fi

if [ "$P1ENCRY" = "" ]; then
	P1ENCRY=3des
fi

if [ "$P1HASH" = "" ]; then
	P1HASH=md5
fi

if [ "$P1LIFETIME" = "" ]; then
	P1LIFETIME=3600
fi


if [ "$P2GROUP" = "" ]; then
        P2GROUP=2
fi

if [ "$P2ENCRY" = "" ]; then
        P2ENCRY=3des
fi

if [ "$P2AUTH" = "" ]; then
        P2AUTH=md5
fi

if [ "$P2LIFETIME" = "" ]; then
        P2LIFETIME=3600
fi

if [ "$IPCOMP" = "" ]; then
	IPCOMP=1
fi

if [ "$DPD_DELAY" = "" ]; then
	DPD_DELAY=10
fi

if [ "$DPD_TIMEOUT" = "" ]; then
	DPD_TIMEOUT=3
fi

if [ ! -f "/etc/racoon" ]; then
	mkdir -p /etc/racoon
fi

if [ "$mode" = "l2tp" -a "$LOCAL_TUNNEL" != "" ]; then
if [ "$REMOTE_TUNNEL" != "" ]; then
	config-setkey.sh -L -lt $LOCAL_TUNNEL -rt $REMOTE_TUNNEL
else
	config-setkey.sh -L -lt $LOCAL_TUNNEL
fi
exit
fi

if [ "$mode" = "l2tp" ]; then
config-psk.sh -p $PASSWORD
config-setkey.sh -A
	if [ "$server" = "no" ]; then
	config-racoon.sh -L -rt $REMOTE_TUNNEL -p1g $P1GROUP -p1e $P1ENCRY -p1h $P1HASH -p1l $P1LIFETIME -p2g $P2GROUP -p2e $P2ENCRY -p2a $P2AUTH -p2l $P2LIFETIME -ipc $IPCOMP
	else
	config-racoon.sh -L -S -p1g $P1GROUP -p1e $P1ENCRY -p1h $P1HASH -p1l $P1LIFETIME -p2g $P2GROUP -p2e $P2ENCRY -p2a $P2AUTH -p2l $P2LIFETIME -ipc $IPCOMP
	fi
fi

if [ "$mode" = "roadwarrior" ]; then
config-psk.sh -p $PASSWORD
config-setkey.sh -A
config-racoon.sh -R -S -p1g $P1GROUP -p1e $P1ENCRY -p1h $P1HASH -p1l $P1LIFETIME -p2g $P2GROUP -p2e $P2ENCRY -p2a $P2AUTH -p2l $P2LIFETIME -ipc $IPCOMP -dd $DPD_DELAY -dt $DPD_TIMEOUT
fi

if [ "$mode" = "net" ]; then

if [ "$MY_IDENT" != "" -a "$MY_IDENT_TYPE" != "" ]; then
my_ident="-mi $MY_IDENT -mt $MY_IDENT_TYPE"
else
my_ident=
fi

if [ "$PEER_IDENT" != "" -a "$PEER_IDENT_TYPE" != "" ]; then
peer_ident="-pi $PEER_IDENT -pt $PEER_IDENT_TYPE"
else
peer_ident=
fi

if [ "$REMOTE_TUNNEL" = "dynamic" ]; then
	if [ "$PEER_IDENT" != "" ]; then
		config-psk.sh -i $PEER_IDENT -p $PASSWORD
	else
		config-psk.sh -p $PASSWORD
	fi
else
	if [ "$MODE" = "aggressive" -a "$peer_ident" != "" ]; then
		config-psk.sh -i $PEER_IDENT -p $PASSWORD
	else
		config-psk.sh -i $REMOTE_TUNNEL -p $PASSWORD
	fi
	config-setkey.sh -ln $LOCAL_NET -rn $REMOTE_NET -lt $LOCAL_TUNNEL -rt $REMOTE_TUNNEL -m tunnel -p esp
fi

if [ "$server" = "yes" ]; then
config-racoon.sh -ln $LOCAL_NET -rn $REMOTE_NET -rt $REMOTE_TUNNEL -m $MODE -S -p1g $P1GROUP -p1e $P1ENCRY -p1h $P1HASH -p1l $P1LIFETIME -p2g $P2GROUP -p2e $P2ENCRY -p2a $P2AUTH -p2l $P2LIFETIME -ipc $IPCOMP -dd $DPD_DELAY -dt $DPD_TIMEOUT $my_ident $peer_ident
else
config-racoon.sh -ln $LOCAL_NET -rn $REMOTE_NET -rt $REMOTE_TUNNEL -m $MODE -p1g $P1GROUP -p1e $P1ENCRY -p1h $P1HASH -p1l $P1LIFETIME -p2g $P2GROUP -p2e $P2ENCRY -p2a $P2AUTH -p2l $P2LIFETIME -ipc $IPCOMP -dd $DPD_DELAY -dt $DPD_TIMEOUT $my_ident $peer_ident
fi
fi

