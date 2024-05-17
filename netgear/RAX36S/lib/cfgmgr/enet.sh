#the following line combines the last line to prevent this file from being sourced twice
if [ "x$enet_sh" = "x" ]; then enet_sh="sourced"
. /lib/cfgmgr/cfgmgr.sh

# this file is target depedent, it provids
# 1. following variables :
#      RawEth=         # name of raw eth NIF. not assigned means 2 eth NIFs, otherwise 1 eth NIF.
#      RawEthLan=      # name of raw eth NIF for lan.
#      RawEthWan=      # name of raw eth NIF for wan.
#      WanIndepPhy=    # 0 means RawEthWan doesn't have independent phy (ie. connects to switch).
#                      # 1 means RawEthWan has independent phy (ie. doesn't connects to switch).
# 2. following functions :
#      et_init()       # initialize ethernet & switch.
#      sw_configvlan() # configure switch vlan for all kind of opmode.
#

RawEth=
RawEthLan=eth1
RawEthLan1=eth2
RawEthLan2=eth3
RawEthLan3=eth4
RawEthLan5G=eth5
RawEthLanX=eth5
RawEthWan=eth0
WanIndepPhy=0
enable_bond=0
BondEth=bond0
# BondEth2(bond2) is only for RAX60 and BondEth(bond0) is not used
BondEth2=bond2
[ "$($CONFIG get ipv6_type)" = "bridge" ] && enable_bond=0

wan_preference=$($CONFIG get wan_preference)
if [ "$wan_preference" = "2" ]; then
    RawEthWan=eth5
    RawEthLanX=eth0
elif [ "$wan_preference" = "1" ]; then
    RawEthWan=bond3
fi
    
# for ap148-r7500 (8327 switch) : 
#    sw port0 -> CPU (RawEthWan)
#    sw port6 -> CPU (RawEthLan) 
#    sw port1 -> LAN4 
#    sw port2 -> LAN3 
#    sw port3 -> LAN2 
#    sw port4 -> LAN1 
#    sw port5 -> WAN 

ssdk_sh=echo
swconfig=echo
swconf=/tmp/sw.conf
ssdk_cmds_file=/tmp/ssdk.sh

et_landefmac()
{
	[ -f /tmp/lan_mac ] && cat /tmp/lan_mac || \
	echo "00:03:7f:$(hexdump -n 4 /dev/urandom | awk 'NR==1 {print $2$3}' \
	                 | sed 's/../&:/g' | cut -c 1-8)"
}

et_wandefmac()
{
	[ -f /tmp/wan_mac ] && cat /tmp/wan_mac || \
	echo "00:03:7f:$(hexdump -n 4 /dev/urandom | awk 'NR==1 {print $2$3}' \
	                 | sed 's/../&:/g' | cut -c 1-8)"
}

et_init()
{
	sw_init
	$CONFIG set lan_factory_mac="$(et_landefmac)"
	$CONFIG set wan_factory_mac="$(et_wandefmac)"
	ethtool -K $RawEthLan gro on # enable ethlan GRO to improve smb write performance
	ethctl $RawEthWan media-type auto
}

sw_init()                                                                                            
{                                                                                                    
	echo "switch init"
	# workaround of switch hw issue on r7500                                                      
	#$ssdk_sh debug reg set 0x04 0x07700000 4 >/dev/null                                           
	#$ssdk_sh debug reg set 0xe4 0x0006a545 4 >/dev/null                                           

	# Gets below commands from HW (Jerry.yh.huang@deltaww.com)
	# Increase PHY PSGMII level
	$ssdk_sh debug phy set 0x5 0xb 0xaa
	# Decrease CPU PSGMII level
	devmem=/sbin/devmem
	$devmem 0x07a0021c w 0x288a
	$devmem 0x07a0019c w 0xbee0

	# Disable WAN Port "FDB entry learning" to support AP Mode dns hijack
	$ssdk_sh fdb portLearn set 5 disable
}                                                                                                    

sw_printconf_add_switch()
{
	cat <<EOF
config switch
	option name 'switch0'
	option reset '1'
	option enable_vlan '1'

EOF
}

sw_printconf_add_vlan() # $1: device, $2: vlan, $3: vid, $4: ports
{
	cat <<EOF
config switch_vlan
	option device '$1'
	option vlan '$2'
	option vid '$3'
	option ports '$4'

EOF
}

sw_tmpconf_start()
{
	rm -f $swconf.tmp*
}

sw_tmpconf_add_vlan() # $1: vlanindex, $2: vid, $3: ports
{
	cat <<EOF > "$swconf.tmp$1"
vid="$2"
ports="$3"
EOF
}

sw_tmpconf_adjust_vlan() # $1: vlanindex, $2: vid, $3: ports
{
	local vid ports i=1

	while [ $i -le $1 ]; do
		. "$swconf.tmp$i"
		if [ "$vid" = "$2" ]; then
			for p in $3; do
				echo $ports | grep -q '\<'$p'\>' && continue
				ports="$ports $p"
			done
			sw_tmpconf_add_vlan "$i" "$vid" "$ports"
			return 0
		fi
		i=$(($i + 1))
	done

	return 1
}

sw_tmpconf_generate_swconf() # $1: vlanindex
{
	local vid ports i=1

	sw_printconf_add_switch
	while [ $i -le $1 ]; do
		. "$swconf.tmp$i"
		sw_printconf_add_vlan "switch0" "$i" "$vid" "$ports"
		i=$(($i + 1))
	done
}

sw_print_ssdk_cmds_start()
{
	echo -n
}

sw_print_ssdk_cmds_set_ports_pri() # $1: ports, $2: pri
{
	local p

	for p in $ports; do
		echo $p | grep -q "t" && continue

		cat <<EOF
$ssdk_sh qos ptDefaultCpri set $p $2
EOF
	done
}

sw_configvlan_factory()
{
	sw_printconf_add_switch > $swconf
	if [ "x$($CONFIG get factory_tt3)" = "x1" ]; then
		sw_printconf_add_vlan "switch0" "1" "1" "1 2 3 4 5" >> $swconf

		# This LED will be shut down later by other modules,
		# so I run this again in init.d/done to make sure it's on
		ledcontrol -n usb1 -c amber -s on
	else
		sw_printconf_add_vlan "switch0" "1" "1" "6 1 2 3 4 5" >> $swconf
	fi
	$swconfig dev switch0 load $swconf
}

sw_configvlan_normal()
{
	sw_printconf_add_switch > $swconf
	sw_printconf_add_vlan "switch0" "1" "1" "6 1 2 3 4" >> $swconf
	sw_printconf_add_vlan "switch0" "2" "2" "0 5" >> $swconf

	$swconfig dev switch0 load $swconf
}

i_mask() # $1: 1 / 2 / 3 / 4
{
	case $1 in
	1) echo 8 ;;
	2) echo 4 ;;
	3) echo 2 ;;
	4) echo 1 ;;
	esac
}

eth_mask()
{
	module_name=$(cat /module_name)
	if [ "$module_name" = "RAX10" -o "$module_name" = "RAX10v2" -o "$module_name" = "RAX36S" -o "$module_name" = "R6700AXv2" -o "$module_name" = "WAX204" ]; then
		case $1 in
			1) echo 8;;
			2) echo 4;;
			3) echo 2;;
			4) echo 1;;
		esac
	else
		case $1 in
			1) echo 1;;
			2) echo 2;;
			3) echo 4;;
			4) echo 8;;
		esac
	fi
}

orange_free_isp() #$1: interface $2: vid
{
	brctl addbr br$2
	vlanctl --if-create-name $1 $1.$2
	vlanctl --if-create-name $1 $1.0
	vlanctl --if $1 --set-if-mode-rg
	ifconfig $1.$2 up
	ifconfig $1.0 up
	brctl delif brwan $RawEthWan
	vlanctl --if-create-name $RawEthWan $RawEthWan.$2
	vlanctl --if-create-name $RawEthWan $RawEthWan.0
	vlanctl --if $RawEthWan --set-if-mode-rg
	ifconfig $RawEthWan.$2 up
	ifconfig $RawEthWan.0 up

	vlanctl --if $RawEthWan --rx --tags 0 --set-rxif $RawEthWan.0 --rule-append
	vlanctl --if $RawEthWan --tx --tags 0 --filter-txif $RawEthWan.0 --rule-append
	vlanctl --if $RawEthWan --tx --tags 1 --filter-txif $RawEthWan.$2 --rule-append
	vlanctl --if $RawEthWan --rx --tags 1 --set-rxif $RawEthWan.$2 --rule-append

	vlanctl --if $1 --rx --tags 0 --set-rxif $1.0 --rule-append
	vlanctl --if $1 --tx --tags 0 --filter-txif $1.0 --rule-append
	vlanctl --if $1 --tx --tags 1 --filter-txif $1.$2 --rule-append
	vlanctl --if $1 --rx --tags 1 --set-rxif $1.$2 --rule-append

	brctl addif br0 $1.0
	brctl addif brwan $RawEthWan.0
	brctl addif br$2 $1.$2
	brctl addif br$2 $RawEthWan.$2
	ifconfig br$2 up
	bcmmcastctl mode -i br$2 -p 1 -m 0
	bcmmcastctl mode -i br$2 -p 2 -m 0
}


sw_configvlan_iptv() # $1: iptv_mask
{
	local i mask=$(($1 & 0x1f))
	local port1_gp=$(($1 & 0x1))
	local port2_gp=$(($1 & 0x2))
	local iface
	local iptv_vlan_enable=$($CONFIG get iptv_vlan_enable)
	local iptv_vlan=$($CONFIG get iptv_vlan)

	#enable_lan_aggregation=0 indicate ethernet port aggregation enable option dispaly gray
	if [ $port1_gp -eq $port2_gp ] || [ $port1_gp -gt 0 -a $port2_gp -gt 0 ]; then
		$CONFIG set enable_lan_aggregation="1"
	else
		$CONFIG set enable_lan_aggregation="0"
	fi
	bond_mode=$($CONFIG get link_aggregation_sta)
	if [ "$bond_mode"  = "0" ] || [ ! -e "/proc/net/bonding/$BondEth2" ] ; then
		for i in 1 2 3 4; do
			iface="eth$i"
			ifconfig $iface up
			if [ $(( $(eth_mask $i) & $mask )) -eq 0 ];then
				brctl addif br0 $iface
			else
				if [ "$iptv_vlan_enable" = "1" ]; then
					orange_free_isp $iface $iptv_vlan
				else
					brctl addif brwan $iface
				fi
			fi
		done
	elif [ "$bond_mode"  = "1" ] || [ "$bond_mode"  = "2" ];then
		for i in 3 4; do
			iface="eth$i"
			ifconfig $iface up
			if [ $(( $(eth_mask $i) & $mask )) -eq 0 ];then
				brctl addif br0 $iface
			else
				if [ "$iptv_vlan_enable" = "1" ]; then
					orange_free_isp $iface $iptv_vlan
				else
					brctl addif brwan $iface
				fi
			fi
		done
		ifconfig $BondEth2 up
		if [ $(( 3 & $mask )) -ne 0 ];then #RAX70 lan aggreration port is port1 and port2, mask is 0011
			brctl addif brwan $BondEth2
		else
			brctl addif br0 $BondEth2
		fi
	fi
	ifconfig br0 up
	ifconfig brwan up
	bcmmcastctl mode -i brwan -p 1 -m 0
	bcmmcastctl mode -i brwan -p 2 -m 0
}

sw_configvlan_vlan()
# $1: start
#     add -> $2: br/wan/lan, $3: vid, $4: mask, $5: pri
#     end
{
	case "$1" in
	start)
		sw_tmpconf_start
		sw_print_ssdk_cmds_start > $ssdk_cmds_file
		g_vlanindex=0
		;;
	add)
		local vid=$3 mask=$(($4 & 0xf)) pri=$5
		local i ports

		case "$2" in
			br) ports="0t 5t" ;;
			lan) ports="6" ;;
			wan) ports="0 5" ;;
			vlan) ports="0t 5t 6t" ;
		esac
		for i in 1 2 3 4; do
			[ $(( $(i_mask $i) & $mask )) -eq 0 ] || ports="$ports $i"
		done
		sw_tmpconf_adjust_vlan "$g_vlanindex" "$vid" "$ports" || {
			g_vlanindex=$(($g_vlanindex + 1))
			sw_tmpconf_add_vlan "$g_vlanindex" "$vid" "$ports"
		}
		sw_print_ssdk_cmds_set_ports_pri "$ports" "$pri" >> $ssdk_cmds_file

		;;
	end)
		sw_tmpconf_generate_swconf $g_vlanindex > $swconf
		$swconfig dev switch0 load $swconf
		qt sh $ssdk_cmds_file
		;;
	esac
}

sw_flowctrl()
{
	# QCA request to run below commands to fix the issue that upload throughput is too low.
	$ssdk_sh port flowctrlforcemode set 5 enable
	$ssdk_sh port flowctrl set 5 enable
	$ssdk_sh debug reg set 0x7c 0x17e 4
	$ssdk_sh debug reg set 0x94 0x17e 4
	$ssdk_sh debug reg set 0x808 0x7f004e 4
}

sw_configvlan() # $1 : normal/iptv/vlan/apmode/brmode
{
	local opmode=$1

	shift
	case "$opmode" in
	normal) sw_configvlan_normal "$@" ;;
	iptv) sw_configvlan_iptv "$@" ;;
	vlan) sw_configvlan_vlan "$@" ;;
	factory) sw_configvlan_factory "$@" ;;
	*) sw_configvlan_normal "$@" ;;
	esac

	# sw_flowctrl() are copied from R7800, QCA request that do not use it in AX6000, so disable it
	#sw_flowctrl
}

fi #-------------------- this must be the last line -----------------------------
