#!/bin/sh
cfg="$1"
cmd="$2"
ipset=""
local=""
shift

. /etc/tunnels/"$cfg"

check=$(ip a show $dev up) 2>/dev/null
link_up=0

if [ "" != "$check" ];
then
    if [ "$DEBUG" != "" ];
    then
       echo "$dev already up"
    fi
    link_up=1
fi

case $cmd in
    up)
	if [ $link_up -gt 0 ];
	then
	    # updating parameters on an up link not supported at this time
	    exit 0;
	fi
    ;;
    down)
	if [ $link_up -eq 0 ];
	then
	    # already down
	    exit 0;
	fi
    ;;
    *)
	echo "Unknown command $cmd"
    ;;
esac

case $cmd in
    up)
	if [ "$ipsec" != "" ]; then
	    ipsec up $ipsec
	fi
	needs=no
	for dep in $depends; do
	    check=$(ip a show $dep up)
	    if [ "" == "$check" ];
	    then
		needs=yes
	    fi
	done
	if [ "$needs" == "yes" ];
	then
	    echo "depends on [$depends] - not ready"
	    exit
	fi

	if [ $ipv6 == "yes" ];
	then
	    ipset="ipv6";
	else
	    ipset="ipv4";
	fi
	# FIXME there needs to be a smarter way to do this!  But it does work, for now.
	case $ipset in
	    ipv4)
		local=$(ip addr | grep 'state UP' -A2 |
			       tail -n1 | awk '{print $2}' | cut -f1  -d'/')
		;;
	    ipv6)
		local=$(ip addr | grep 'state UP' -A4 |
			       tail -n1 | awk '{print $2}' | cut -f1  -d'/')
		;;
	    *)
		exit 1
		;;
	esac

	case $mode in
	    gre)
		added_cmds=""
		if [ "0$mtu" -gt 0 ]; then
		    added_cmds="nopmtudisc"
		fi
		case $ipset in
		    ipv4)
			ip link add $dev type gretap local $local remote $remote \
			   $added_cmds
			;;
		    ipv6)
			ip link add $dev type ip6gretap local $local remote $remote \
			   $added_cmds
			;;
		esac
		;;
	    l2tpv3)
		if [ "$encap" == "udp" ];
		then
		    ip l2tp add tunnel tunnel_id $tunnel_id \
		       peer_tunnel_id $peer_tunnel_id \
		       encap udp udp_sport $udp_sport udp_dport $udp_dport \
		       local $local remote $remote
		else
		    ip l2tp add tunnel tunnel_id $tunnel_id \
		       peer_tunnel_id $peer_tunnel_id \
		       encap ip local $local remote $remote
		fi
		if [ "$l2spec_type" == "none" ];
		then
		    ip l2tp add session name $dev tunnel_id $tunnel_id \
		       session_id $session_id peer_session_id $peer_session_id \
		       l2spec_type none
		else
		    ip l2tp add session name $dev tunnel_id $tunnel_id \
		       session_id $session_id peer_session_id $peer_session_id
		fi
		;;
	    *)
		echo "Unknown mode $mode"
		exit 1
		;;
	esac
	if [ "0$mtu" -gt 0 ]; then
	    ip link set $dev mtu $mtu up
	else
	    ip link set $dev up
	fi
	if [ "$bridge" != "" ]; then
	    brctl addif $bridge $dev
	fi
    ;;
    down)
	case $mode in
	    gre)
		ip link del $dev
		;;
	    l2tpv3)
		ip l2tp del session tunnel_id $tunnel_id session_id $session_id
		ip l2tp del tunnel tunnel_id $tunnel_id
		;;
	    *)
		echo "Unknown mode $mode"
		exit 1
		;;
	esac
	if [ "$ipsec" != "" ]; then
	    ipsec down $ipsec
	fi
    ;;
esac

exit 0;
