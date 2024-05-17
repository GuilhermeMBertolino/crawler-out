#!/bin/sh

RACOON_FILE=/etc/racoon/racoon.conf

usage() 
{
	echo "usage: config-racoon.sh [option]..."
	echo "options:"
	echo "	-h			:	print this help"
	echo "	-L			:	l2tp over ipsec"
	echo "	-R			:	roadwarrior"
	echo "	-S			:	server mode"
	echo "	-ln			:	local network"
	echo "	-rn			:	remote networek"
	echo "	-rt			:	remote tunnel ipaddr"
	echo "	-m			:	exchange mode(main/aggressive/base)"
	echo "	-p1g			:	phase 1 group(1/2/5)"
	echo "	-p1e			:	phase 1 encryption algorithm(3des/des/aes128/aes192/aes256)"
	echo "	-p1h			:	phase 1 hash algorithm(md5/sha1)"
	echo "	-p1l			:	phase 1 lifetime(sec)"
	echo "	-p2g			:	phase 2 group(0/1/2/5, 0:disable pfs)"
	echo "	-p2e                    :       phase 2 encryption algorithm(3des/des/aes128/aes192/aes256)"
        echo "	-p2a                    :       phase 2 authentication algorithm(md5/sha1)"
        echo "	-p2l                    :       phase 2 lifetime(sec)"
	echo "	-ipc			:	ip compression algorithm(1/0, 1:en; 0:dis)"
	echo "  -dd                     :       dpd delay(sec)"
	echo "  -dt                     :       dpd timeout(sec)"
	echo "	-mi			:	my_identifier, identifier sent to the remote host"
	echo "	-mt			:	my_identifier type. address/fqdn/user_fqdn"
	echo "	-pi			:	peers_identifier, peer's identifier to be received"
	echo "	-pt			:	peers_identifier type. address/fqdn/user_fqdn"
	exit
}

if [ $# -lt 1 ]; then
	usage
fi

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
				"-rt")
					REMOTE_TUNNEL="$2"
					shift ;;
				"-m")
					MODE="$2"
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

if [ "$P1ENCRY" = "aes128" ]; then
	P1ENCRY="aes 128"
else

if [ "$P1ENCRY" = "aes192" ]; then
        P1ENCRY="aes 192"
else

if [ "$P1ENCRY" = "aes256" ]; then
        P1ENCRY="aes 256"
fi
fi
fi

if [ "$P2ENCRY" = "aes128" ]; then
        P2ENCRY="aes 128"
else

if [ "$P2ENCRY" = "aes192" ]; then
        P2ENCRY="aes 192"
else

if [ "$P2ENCRY" = "aes256" ]; then
        P2ENCRY="aes 256"
fi
fi
fi


if [ "$mode" = "l2tp" ]; then
	if [ "$server" = "no" ]; then
		MODE=main
	else
		MODE=main,aggressive,base
		REMOTE_TUNNEL=anonymous
	fi
fi

if [ "$mode" = "roadwarrior" ]; then
	MODE=aggressive
	REMOTE_TUNNEL=anonymous
fi

if [ "$mode" = "net" ]; then
	if [ "$REMOTE_TUNNEL" = "dynamic" ]; then
		REMOTE_TUNNEL=anonymous
	fi
fi

if [ ! -f "$RACOON_FILE" ]; then
echo "path pre_shared_key \"/etc/racoon/psk.txt\";" >$RACOON_FILE
echo "" >>$RACOON_FILE
echo "listen{" >>$RACOON_FILE
echo "  adminsock \"/var/run/racoon.sock\";" >>$RACOON_FILE
echo "}" >>$RACOON_FILE
fi

if [ "$REMOTE_TUNNEL" != "anonymous" ]; then
	have_same_remote_ip=`cat $RACOON_FILE|grep "remote $REMOTE_TUNNEL"|wc -l`
else
	have_same_remote_ip=0
fi

if [ $have_same_remote_ip -eq 0 ]; then
	echo "" >>$RACOON_FILE
	echo "remote $REMOTE_TUNNEL {" >>$RACOON_FILE
	echo "	exchange_mode $MODE;" >>$RACOON_FILE

	if [ "$mode" = "l2tp" ]; then
	echo "	doi ipsec_doi;" >>$RACOON_FILE
	echo "	situation identity_only;" >>$RACOON_FILE
	echo "	proposal_check obey;" >>$RACOON_FILE
	fi

	if [ "$mode" != "l2tp" ]; then
	echo "	dpd_delay $DPD_DELAY;" >>$RACOON_FILE
	echo "	dpd_maxfail $DPD_TIMEOUT;" >>$RACOON_FILE
	fi

	echo "	nat_traversal on;" >>$RACOON_FILE

	echo "	ike_frag on;" >>$RACOON_FILE
	#echo "	mode_cfg on;" >>$RACOON_FILE

	if [ "$mode" = "net" ]; then
		if [ "$REMOTE_TUNNEL" = "anonymous" ]; then
			echo "	generate_policy on;" >>$RACOON_FILE
		fi
	else
	echo "	generate_policy on;" >>$RACOON_FILE
	fi

	if [ "$server" = "yes" ]; then
	echo "	passive on;" >>$RACOON_FILE
	fi

	if [ "$MY_IDENT" != "" -a "$MY_IDENT_TYPE" != "" ]; then
	echo	"	my_identifier $MY_IDENT_TYPE \"$MY_IDENT\";" >>$RACOON_FILE 	
	fi
	
	if [ "$PEER_IDENT" != "" -a "$PEER_IDENT_TYPE" != "" ]; then
		echo	"	peers_identifier $PEER_IDENT_TYPE \"$PEER_IDENT\";" >>$RACOON_FILE
		echo  "	verify_identifier on;" >>$RACOON_FILE
	fi
	
	echo "	lifetime time $P1LIFETIME sec;" >>$RACOON_FILE
	echo "" >>$RACOON_FILE

	if [ "$mode" != "l2tp" ]; then
	echo "	proposal {" >>$RACOON_FILE
	echo "		encryption_algorithm $P1ENCRY;" >>$RACOON_FILE
	echo "		hash_algorithm $P1HASH;" >>$RACOON_FILE
	echo "		authentication_method pre_shared_key;" >>$RACOON_FILE
	echo "		dh_group $P1GROUP;" >>$RACOON_FILE
	echo "	}" >>$RACOON_FILE
	else

		if [ "$server" = "no" ]; then
			echo "  proposal {" >>$RACOON_FILE
			echo "                encryption_algorithm $P1ENCRY;" >>$RACOON_FILE
			echo "                hash_algorithm $P1HASH;" >>$RACOON_FILE
			echo "                authentication_method pre_shared_key;" >>$RACOON_FILE
			echo "                dh_group $P1GROUP;" >>$RACOON_FILE
			echo "        }" >>$RACOON_FILE
			echo "" >>$RACOON_FILE
		else
			echo "  proposal {" >>$RACOON_FILE
			echo "		# Win7 pararmeters." >>$RACOON_FILE
			echo "		encryption_algorithm 3des;" >>$RACOON_FILE
			echo "		hash_algorithm sha1;" >>$RACOON_FILE
			echo "		authentication_method pre_shared_key;" >>$RACOON_FILE
			echo "		dh_group $P1GROUP;" >>$RACOON_FILE
			echo "	}" >>$RACOON_FILE
			echo "" >>$RACOON_FILE

			echo "  proposal {" >>$RACOON_FILE
			echo "		# WinXP pararmeters." >>$RACOON_FILE
			echo "		encryption_algorithm 3des;" >>$RACOON_FILE
			echo "		hash_algorithm md5;" >>$RACOON_FILE
			echo "		authentication_method pre_shared_key;" >>$RACOON_FILE
			echo "		dh_group $P1GROUP;" >>$RACOON_FILE
			echo "	}" >>$RACOON_FILE
			echo "" >>$RACOON_FILE

			echo "  proposal {" >>$RACOON_FILE
			echo "		# Gentoo or something ." >>$RACOON_FILE
			echo "		encryption_algorithm aes;" >>$RACOON_FILE
			echo "		hash_algorithm sha1;" >>$RACOON_FILE
			echo "		authentication_method pre_shared_key;" >>$RACOON_FILE
			echo "		dh_group $P1GROUP;" >>$RACOON_FILE
			echo "	}" >>$RACOON_FILE
		fi
	fi
	echo "}" >>$RACOON_FILE
	echo "" >>$RACOON_FILE
fi

if [ "$mode" != "net" ]; then
echo "sainfo anonymous {" >>$RACOON_FILE
else
echo "sainfo address $LOCAL_NET any address $REMOTE_NET any {" >>$RACOON_FILE
fi

if [ "$mode" != "l2tp" -a "$P2GROUP" != "0" ]; then
echo "	pfs_group $P2GROUP;" >>$RACOON_FILE
fi

echo "	lifetime time $P2LIFETIME sec;" >>$RACOON_FILE

if [ "$mode" != "l2tp" ]; then
echo "	encryption_algorithm $P2ENCRY;" >>$RACOON_FILE
echo "	authentication_algorithm hmac_$P2AUTH;" >>$RACOON_FILE
else
	if [ "$server" = "no" ]; then
		echo "	encryption_algorithm $P2ENCRY;" >>$RACOON_FILE
		echo "	authentication_algorithm hmac_$P2AUTH;" >>$RACOON_FILE
	else
		echo "	encryption_algorithm 3des, aes;" >>$RACOON_FILE
		echo "	authentication_algorithm hmac_md5, hmac_sha1;" >>$RACOON_FILE
	fi
fi

#if [ "$IPCOMP" = "1" ]; then
echo " 	compression_algorithm deflate;" >>$RACOON_FILE
#fi

echo "}" >>$RACOON_FILE
