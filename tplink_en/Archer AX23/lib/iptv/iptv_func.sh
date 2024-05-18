# Copyright (C) 2011-2014 TP-LINK

. /lib/functions.sh
. /lib/iptv/iptv_arch.sh
. /lib/network/network_arch.sh

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

# $1: vid
create_vlan_entry()
{
	return
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

# $1: vid
delete_vlan_entry()
{
	local vid=$1

	return
}

add_vlan_member()
{
	[ $# -lt 2 ] && return
	local vid=$1
	local port=$2

	return
}

# $1: vid
# $2: port
del_vlan_member()
{
	return
}

# $1: port
# $2: vid
set_pvid()
{
	[ $# -ne 2 ] && return
	local port=$1
	local vid=$2

	return
}

# $1: ports- 1 2 3 4
# $2: vid
set_port_member_vid() 
{
	local ports=$1
	local vid=$2

	for port in $ports; do
		local port_id=${port%:*}
		set_pvid $port_id $vid
	done
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
	#local vid=${1#*.}
	#local dev=${1%%.*}

	#[ -n "$vid" ] && dev=$1

	ifconfig $dev up
}

down_iface()
{
	local dev=$1
	local vid=${1#*.}
	local dev=${1%%.*}

	[ -n "$vid" ] && dev=$1
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
	return
}

# destroy virtual device and corresponding vlan entry.
# $1: father device, likes eth0, eth1, etc
# $2: vid
destroy_vdevice()
{
	return
}

set_8021q_prio()
{
	echo "vconfig set_egress_map $1 $2 $3"
	vconfig set_egress_map $1 $2 $3
}

create_br()
{
	return
}

destroy_br()
{
	return
}

is_dev_existen()
{
	return
}

# $1: dev_name
# $2: br_name
is_in_br()
{
	return
}

add_br_member()
{
	return
}

# $1: br_name
# $2: dev_name
del_br_member()
{
	return
}

flush_fdb()
{
	return
}

wifi_update()
{
	return
}

pre_start()
{
	# when only set igmp configure, need to take it effect.
	/etc/init.d/multicast restart
}

reset_normal_mode()
{
	return
}

clear_all_switch_vlans()
{
	return
}

config_switch_vlans()
{
	return
}
