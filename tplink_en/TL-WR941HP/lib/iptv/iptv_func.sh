# Copyright (C) 2011-2014 TP-LINK

. /lib/functions.sh

BOARD_TYPE=qca
# SET OF LAN PHY PORT: LAN1->1 LAN2->2 LAN3->3 LAN4->4
LAN_PHY_PORT_SET=$(uci get profile.lan.phyport_seq -c /etc/profile.d)
WAN_PHY_PORT_SET="5"

# Default LAN CPU PORT: Format->PortID:Pvid
LAN_DFT_CPU="0"
# The number of GMAC
GMAC_NUM=2

KMOD_PATH=/lib/modules/iplatform

select_vid()
{
	local used="$1"
	local vid=1

	for id in `seq 4094`; do
		! list_contains used $id && {
			vid=$id
			break		
		}
	done
	
	echo $vid
}

# $1: vid
# $2: used vid
is_used_vid()
{
	local vid=$1
	local used=$2
	if list_contains used $vid; then
		echo 1;
	else 
		echo 0;
	fi
}



# $1 base number
# $2 power
power()
{
	local base=$1
	local power=$2
	local val=1
	[ "$base" = "0" ] && {
	echo 1
	return
	}
	for i in $(seq $power)
	do
		val=$(($val * $base))
	done
	echo $val
}

#power 2 3
#power 0 0
#power 0 1
#power 1 0

set_bit()
{
	local old_val=$1
	local bit=$2
	local bit_val=
	bit_val=$(power 2 $bit)
	local new_val=$(($old_val | $bit_val))
	printf "0x%x" $new_val
}

clear_bit()
{
	[ $# != 2 ] && return
	local old_val=$1
	local bit=$2
	local bit_val=
	bit_val=$(power 2 $bit)
	local nor_bit_val=$((0xffffffff ^ $bit_val))
	local new_val=$(($old_val & $nor_bit_val))
	printf "0x%x" $new_val
}

clear_bit 0

disable_all_port_learn()
{

	ssdk_sh fdb portLearn set 0 disable
	ssdk_sh fdb portLearn set 1 disable
	ssdk_sh fdb portLearn set 2 disable
	ssdk_sh fdb portLearn set 3 disable
	ssdk_sh fdb portLearn set 4 disable
}

enable_all_port_learn()
{

	ssdk_sh fdb portLearn set 0 enable
	ssdk_sh fdb portLearn set 1 enable
	ssdk_sh fdb portLearn set 2 enable
	ssdk_sh fdb portLearn set 3 enable
	ssdk_sh fdb portLearn set 4 enable
}

flush_fdb()
{
	ssdk_sh fdb entry flush 0

}

enable_vlan()
{
swconfig dev switch0 set enable_vlan 1
swconfig dev switch0 set apply 1
}

disable_vlan()
{
//swconfig dev switch0 set enable_vlan 0
swconfig dev switch0 vlan 0 set ports '0 1 2 3 4'
swconfig dev switch0 set apply 1
}

# $1: vid
delete_vlan_entry()
{
	swconfig dev switch0 vlan $1 set ports '' 

}


#$1: dev name
#$2: vid
create_vif()
{
	[ $# -ne 2 ] && return
	vconfig add $1 $2
}

destroy_vif()
{
	echo "vconfig rem $1"
	vconfig rem $1
}

up_iface()
{
	local dev=$1

	ifconfig $dev up
}

down_iface()
{
	local dev=$1

	ifconfig $dev down
}

# create virtual device and corresponding vlan entry.
# $1: father device, likes eth0, eth1, etc
# $2: vid
# $3: port "1 2"
# $4: output tag ? t/* 
# $5: cpu port number
# $6: cpu port output tag ? t/* 
create_vdevice()
{
	[ $# != 6 ] && return
	local father_device=$1
	local vid=$2
	local port=$3
	local output_tag=$4
	local cpu_port=$5
	local cpu_tag=$6
	local vlan_member

	echo "create vdevice vid=$vid device=$father_device port=$port cpu_port=$cpu_port tag=$output_tag cpu_tag=$cpu_tag"
	

	append vlan_member $port
	if [ $cpu_tag = "t" ]; then
	cpu_port=$cpu_port't'
	append vlan_member $cpu_port
	
	
	swconfig dev switch0 vlan $vid set ports "$port $cpu_port"
	create_vif $father_device $vid
	up_iface "$father_device.$vid"
	else
	append vlan_member $cpu_port
	vlan_member=\'vlan_member\'	
	swconfig dev switch0 vlan $vid set ports  $vlan_member	
	fi
	
	swconfig dev switch0 set apply 1
	
}

# destroy virtual device and corresponding vlan entry.
# $1: father device, likes eth0, eth1, etc
# $2: vid
destroy_vdevice()
{
	local father_device=$1
	local vid=$2
	down_iface "$father_device.$vid"
	destroy_vif "$father_device.$vid"
	delete_vlan_entry $1
}

set_8021q_prio()
{
	echo "vconfig set_egress_map $1 $2 $3"
	vconfig set_egress_map $1 $2 $3
}

create_br()
{
	local dev=$1

	brctl addbr $dev
}

destroy_br()
{
	local dev=$1

	brctl delbr $dev
}

is_dev_existen()
{
	local tmp=$(cat /proc/net/dev | grep "$1")
	if [ -n "$tmp" ];then
		echo 1
	else
		echo 0
	fi
}

# $1: dev_name
# $2: br_name
is_in_br()
{
	local tmp=$(brctl show "$2" | grep "$1$")
	if [ -n "$tmp" ];then
		echo 1
	else
		echo 0
	fi
}

add_br_member()
{
	local vid=${2#*.}
	local dev=${2%%.*}

	[ -n "$vid" ] && dev=$2
	brctl addif $1 $dev
}

# $1: br_name
# $2: dev_name
del_br_member()
{
	[ $# != 2 ] && return;
	local vid=${2#*.}
	local dev=${2%%.*}

	if [ $(is_in_br $2 $1) -eq "1" ]; then
		echo "del $2 from $1"
		[ -n "$vid" ] && dev=$2
		brctl delif $1 $dev
	fi
}

each_wifi_iface()
{
	config_get iface_mode "$1" "mode"
	if [ "$iface_mode" = "ap" ]; then
		ebtables -A IPTV -o $1 --pkttype-type multicast -j DROP
	fi
}

add_wifi_mc_drop_rules()
{

ebtables -N IPTV
ebtables -A FORWARD -j IPTV
ebtables -A OUTPUT -j IPTV
config_load wireless
config_foreach each_wifi_iface wifi-iface

}


remove_wifi_mc_drop_rules()
{

ebtables -F IPTV
ebtables -D FORWARD -j IPTV
ebtables -D OUTPUT -j IPTV
ebtables -X IPTV

}





