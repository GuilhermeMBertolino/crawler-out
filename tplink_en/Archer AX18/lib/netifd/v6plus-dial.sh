#!/bin/sh

[ -n "$INCLUDE_ONLY" ] || {
    . /lib/functions.sh
    . /lib/functions/network.sh
    . /lib/netifd/netifd-proto.sh
	. /usr/share/libubox/jshn.sh
	. /lib/network/network_arch.sh
}

DHCP_SCRIPT="/lib/netifd/dhcp.script"
DHCP_PIDFILE="/var/run/udhcpc-v6plus.pid"
TMP_FILE_PORT="/tmp/v6plus/v6plus_port"
IPQ50XX_FLUSHFMR_FILE="/proc/sys/dev/nss/ipip6/flush_fmr_rule"
IPQ50XX_ADDFMR_FILE="/sys/kernel/debug/qca-nss-tunipip6/configure_fmr_rule_manully"
IPQ50XX_OLDFMR_FILE="/tmp/v6plus-fmrs-old"
IPQ50XX_NEWFMR_FILE="/tmp/v6plus/v6plus-fmrs"

glink=$1
gmtu=$2
gtunlink=$3
gcfg=$4
giface=$5

v6plus_fw_setup_fun(){
	local peeraddr=$1
	local fakeip=$2
	#iptables -t nat -I V6PLUS -p tcp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports
	#iptables -t nat -I V6PLUS -p udp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports
	#iptables -t nat -I V6PLUS -p icmp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports
	#fw add 4 f  nat v6plus_output
	#fw s_add 4 f  {"-i v6plus-$gcfg -j"} v6plus_output
	#fw s_add 4 f  v6plus_output {"-p tcp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports"}
	#fw s_add 4 f  v6plus_output {"-p udp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports"}
	#fw s_add 4 f  v6plus_output {"-p icmp --sport 1:65535 -j V6PORTS --to-source $peeraddr:/tmp/v6plus/v6plus_ports"}
	iptables -t nat -N v6plus_checkports
	
	iptables -t nat -D zone_lan_prerouting -j v6plus_checkports
	iptables -t nat -A zone_lan_prerouting -j v6plus_checkports
	
	iptables -t nat -F v6plus_checkports
	iptables -t nat -I v6plus_checkports -p tcp -j CHECKPORTS --param ${peeraddr}-${fakeip}:${TMP_FILE_PORT}
	iptables -t nat -I v6plus_checkports -p udp -j CHECKPORTS --param ${peeraddr}-${fakeip}:${TMP_FILE_PORT}
	iptables -t nat -I v6plus_checkports -p icmp -j CHECKPORTS --param ${peeraddr}-${fakeip}:${TMP_FILE_PORT}
	
	iptables -t nat -N v6plus_output
	iptables -t nat -D zone_wan_nat -j v6plus_output
	iptables -t nat -I zone_wan_nat -j v6plus_output
	iptables -t nat -F v6plus_output
	iptables -t nat -I v6plus_output -p tcp --sport 1:65535 -j V6PORTS --to-source ${peeraddr}:${TMP_FILE_PORT}
	iptables -t nat -I v6plus_output -p udp --sport 1:65535 -j V6PORTS --to-source ${peeraddr}:${TMP_FILE_PORT}
	iptables -t nat -I v6plus_output -p icmp -j V6PORTS --to-source ${peeraddr}:${TMP_FILE_PORT}
	
}

v6plus_fw_teardown_fun()
{
	#nat_chain_flush v6plus_output
	#fw s_del 4 f  {"-i v6plus-$gcfg -j"} v6plus_output
	#fw del 4 f  nat v6plus_output
	iptables -t nat -F v6plus_output
	iptables -t nat -D zone_wan_nat -j v6plus_output
	iptables -t nat -X v6plus_output
	
	iptables -t nat -F v6plus_checkports
	iptables -t nat -D zone_lan_prerouting -j v6plus_checkports
	iptables -t nat -X v6plus_checkports
}

disconnect_hgw_fun()
{
	local pidfile=$1
	ubus call network.interface.hgw disconnect
	[ -f "$pidfile" ] && {
		pid=$(cat "$pidfile")
		time=6
		#waiting for $pid killed
		while [ $time -ne 0 -a -d "/proc/$pid" ]; do
			echo killing udhcpd > /dev/console
			let "time=time - 1"
			sleep 1
		done
		[ -d "/proc/$pid" ] && {
			proto_kill_command "hgw" 9
			sed -i '/\./d' /tmp/resolv.conf.auto
		}
	}
}

expend_ipv6_addr()
{
	local ip6addr=$1
	local expended=":0:"
	
	if echo $ip6addr |grep -q "::"; then
		count1=`echo $ip6addr |tr -cd : |wc -c`                                     
		let "count=7 - $count1"                               
		
		while [ $count -ne 0 ]; do                          
			expended=${expended}0:                
			let "count=count - 1"                                                              
		done
		ip6addr=`echo ${ip6addr/"::"/$expended}`
	fi
	echo "$ip6addr"|awk -F: '{for(i=1;i<=NF;i++)x=x""sprintf ("%4s", $i);gsub(/ /,"0",x);print x}'
}

v6plus_core_fun(){
	local v6plus_state
	local remote_addr
	local local_addr
	local link=$1
	local mtu=$2
	local tunlink=$3
	local cfg=$4
	local ifnamedev=$5
	local fake_ip="192.0.0.1"
	local wanv6_vid
	
	DHCP_PIDFILE_HGW="/var/run/udhcpc-$ifnamedev.pid"
	
	config_load /etc/config/network
	config_get v6plus_state $cfg state "1"
	config_get v6plus_carrier $cfg carrier
	config_get remote_addr $cfg remoteIPv6Address
	config_get local_addr $cfg localIPv6Address
	config_get peeraddr $cfg localIPAddress
	
	echo "state : "$v6plus_state > /dev/console
	
	case $v6plus_state in 
		"0"| 0 )
			#V6PLUS_DEAD
			echo "V6PLUS_DEAD: " > /dev/console
			v6plus_fw_teardown_fun
			;;
		"1"| 1 )
			#V6PLUS_START
			echo "V6PLUS_START: dailing dhcp  " > /dev/console
			
			ubus call network.interface.hgw connect
			count=30 
			while [ $count -ne 0 ]; do                              
				echo Waiting for dynamic address > /dev/console
				sleep 1 
				if network_get_ipaddr ipaddr "hgw"; then
					echo Get dynamic address, goto state:2 > /dev/console
					ubus call v6plusUbus set '{"state":2}' &
					return
				fi
				let "count=count - 1"
			done
			echo Cannt get dynamic address, goto state:4 > /dev/console
			[ -f "$DHCP_PIDFILE_HGW" ] && ubus call network.interface.hgw disconnect
			ubus call v6plusUbus set '{"state":4}' &
			;;
		"2"| 2 )
			#CMSG_V6PLUS_CHECK_HGW
			echo "CMSG_V6PLUS_CHECK_HGW: dailing dhcp successed" > /dev/console
			;;
		"3"| 3 )
			#RULES_MAP_ACC
			echo "RULES_MAP_ACC: Get map rules" > /dev/console
			;;
		"4"| 4 )
			#V6PLUS_HGW_OFF
			echo "V6PLUS_HGW_OFF: dailing  " > /dev/console
			disconnect_hgw_fun $DHCP_PIDFILE_HGW
			while ! network_get_ipaddr6 ip6addr "$tunlink"; do                              
				echo waiting for ipv6 address > /dev/console
				sleep 2     
			done                            
			echo ipv6 address is $ip6addr > /dev/console
			ip6_expended=$(expend_ipv6_addr "$ip6addr")
			echo ip6_expended=$ip6_expended > /dev/console
			addr_flag=$(cat /proc/net/if_inet6 |grep "$ip6_expended" |awk '{print $5}')
			echo addr_flag=$addr_flag > /dev/console
			if [ -n "$addr_flag" ]; then
				let "flag=0x$addr_flag & 0x40"
				while [ $flag -ne 0 ]; do                              
					echo waiting for the ipv6 address state to be not tentative > /dev/console
					sleep 2
					addr_flag=$(cat /proc/net/if_inet6 |grep "$ip6_expended" |awk '{print $5}')
					let "flag=0x$addr_flag & 0x40"
				done
			else
				#error
				sleep 10
			fi
			ubus call v6plusUbus set '{"state":3, "prefixlen":64, "wanV6Addr":"'$ip6addr'"}' &
			;;
		"5"| 5 | "6"| 6 )
			#V6PLUS_HGW_B_ON or V6PLUS_HGW_J_ON
			echo "V6PLUS_HGW_ON: keep dhcp " > /dev/console
			disconnect_hgw_fun $DHCP_PIDFILE_HGW
			local lastip=/var/run/udhcpc-$ifnamedev.ip
			local reqip
			[ -f $lastip ] && reqip=$(cat $lastip)
			udhcpc \
				-p ${DHCP_PIDFILE} \
				-s ${DHCP_SCRIPT} -O 33 -O 121 -O 249 -f -R -a -t 3 -i ${ifnamedev} ${reqip:+-r $reqip} \
				-V 'MSFT 5.0' -M &
			;;
		"7"| 7 )
			#V6PLUS_HGW_OCN_ON
			echo "V6PLUS_HGW_OCN_ON: keep dhcp " > /dev/console
			;;
		"8"| 8 )
			#RULES_MAP_FAILED
			proto_init_update "$link"
			proto_send_update "$cfg"
			echo "RULES_MAP_FAILED: Timeout Random(10min-30min) " > /dev/console
			;;
		"9"| 9 )
			#GET_RULES_40XERROR
			proto_init_update "$link"
			proto_send_update "$cfg"
			echo "GET_RULES_40XERROR: Timeout Random(3h-24h) " > /dev/console
			;;
		"10"| 10 )
			#GET_RULES_50XERROR
			echo "GET_RULES_50XERROR: Timeout Random(1min-10min)" > /dev/console
			;;
		"11"| 11 )
			#GET_RULES_FAILED
			echo "GET_RULES_FAILED: Timeout Random(10min-30min)" > /dev/console
			;;
		"12"| 12 )
			#V6PLUS_UPDATE
			echo "V6PLUS_UPDATE: " > /dev/console
			;;
		"13"| 13 )
			#RULES_MAP_SUCCED
			echo "RULES_MAP_SUCCED: Timeout Random(3h-24h)" > /dev/console
			echo "remote_addr :  $remote_addr " > /dev/console
			echo "local_addr  :  $local_addr " > /dev/console
			echo "peeraddr    :  $peeraddr " > /dev/console
			
			tunlink=${tunlink:-wanv6}
			mtu=${mtu:-65000}
	
			proto_init_update "$link" 1
			proto_add_tunnel
			json_add_string mode ip4ip6
			#json_add_string mode ipip6
			json_add_int mtu "${mtu:-65000}"
			json_add_int ttl "${ttl:-64}"
			json_add_string local "$local_addr"
			json_add_string remote "$remote_addr"
			json_add_string fakeip ${fake_ip}
			json_add_string encaplimit "${encaplimit:-4}"
			[ -n "$tunlink" ] && json_add_string link "$tunlink"
			proto_close_tunnel
			proto_send_update "$cfg"
			
			proto_init_update "$link" 1
			proto_set_keep 1
			proto_add_ipv4_address "$peeraddr" "" "" ""
			proto_add_ipv4_route "0.0.0.0" 0
			proto_add_ipv6_address "$local_addr" 64
			proto_send_update "$cfg"
			
			json_load "`ubus call network.interface.wanv6 status`"
			json_get_var l3_device "l3_device"
			ifconfig $l3_device add "$local_addr/64" 
			uci set network.wan.device6=$l3_device
			uci commit	
		
			/etc/init.d/parental_control restart
	
			case $v6plus_carrier in
				[1-3])
					echo JPNE or BIGLOBE set FMR > /dev/console
					v6plus_sendFmr -l ${local_addr}  -r ${remote_addr} -i ${link} -t ${ttl:-64}
					local model=$(uci get profile.@global[0].model -c "/etc/profile.d" -q)
					if [ "$model" = "QCA_IPQ50XX" ];then
						local update=0
						if [ ! -f $IPQ50XX_OLDFMR_FILE ]; then
							cp $IPQ50XX_NEWFMR_FILE $IPQ50XX_OLDFMR_FILE
							update=1
						else
							md5_old=$(md5sum $IPQ50XX_OLDFMR_FILE | cut -d" " -f1)
							md5_new=$(md5sum $IPQ50XX_NEWFMR_FILE | cut -d" " -f1)
							echo "$md5_old, $md5_new" > /dev/console
							if [ "$md5_old" != "$md5_new" ];then
								cp $IPQ50XX_NEWFMR_FILE $IPQ50XX_OLDFMR_FILE
								update=1
							fi
						fi
						if [ $update -eq 1 ];then
							### flush nss driver old fmr rules
							if [ -f $IPQ50XX_FLUSHFMR_FILE ]; then
								echo "netdev=v6plus-wan" > $IPQ50XX_FLUSHFMR_FILE
							fi
							### add nss driver new fmr rules
							if [ -f $IPQ50XX_ADDFMR_FILE ]; then
								echo 1 >  $IPQ50XX_ADDFMR_FILE
							fi
						fi
					fi
					;;
				4)
					echo OCN need not set FMR > /dev/console
					;;
			esac
			v6plus_fw_setup_fun ${peeraddr} ${fake_ip}
			ifconfig $link mtu $mtu
			wanv6_vid=${l3_device##*.}
			[ $wanv6_vid -ge 0 ] || wanv6_vid=$WAN_DEFUALT_VID
			[ -x "/usr/bin/hw_nat" ] && hw_nat -W 1_${wanv6_vid}
			;;
	esac
	
}


v6plus_core_fun $glink $gmtu $gtunlink $gcfg $giface


