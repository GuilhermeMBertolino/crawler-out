
# Copyright (C) 2011-2014 TP-LINK

#### Notice: global variable defined in this file can't be changed

#
# vlan id generation method type
# 0 : generate nothing(initial value)
# 1 : generate single vlan tag automaticly
# 2 : generate dual vlan tag automaticly
# 3 : generate in specific way
# 
gen_vid_mode=1

#
# wan interface vlan id generation method type
# 0 : generate nothing for internet tag off mode
# 1 : generate internet vlan interface for internet tag off mode
# 2 : always use wan ori ifname for all vid
# 
gen_wan_vid_mode=2

#
# disable vlan id conflict with iptv wan vids set when gen_vid_mode is 1/2/3
# 0 : not to solve conflict vid generated
# 1 : need to solve conflict vid generated(initial value)
#
disable_conflict=1

#
# 0: add lan port to br-iptv
# 1: not add lan port to br-iptv
no_iptv_lan_port=1

#
# 0: add 
# 1:
no_voip_lan_port=1

#
# specific vlan id sequence to lan port which effect when gen_vid_mode is 3 or 4
# initial value is none
#
specific_lan_vid=""

#
# specific tx vlan id sequence to lan port which effect when gen_vid_mode is 4
# initial value is none
#
specific_lan_txvid=""

#
# Wan default vid
# initial value is 0
#
WAN_DFT_ID="0"

#VLAN setting API
#is_switch_vlan_config_finish()

clear_switch_vlan()
{
	local vids=$(uci_get_state switch core sw_vlan_list)
	for vid in $vids
	do
		[ "$vid" -gt 0 ] || continue
		echo $vid > /proc/net/vlan/groupIndex
		echo "0,0,0,$vid,1,0" >/proc/net/vlan/vlanGroup
	done
}



WAN_PORT_MASK=2  # 1<<1 = 0x02
CPU_PORT_MASK=64  # CPU1_PHY_PORT_SET (1<<6 == 0x40 == 64)

# UI_LAN1(logic_bit2) ==> PHY2 == 4
# UI_LAN2(logic_bit4) ==> PHY3 == 8
# UI_LAN3(logic_bit8) ==> PHY4 == 16
logic_port_mask_to_phy_mask()
{
	local ret=0
	local input=$1
	if [ $((input&2)) -eq 2 ]; then
		ret=4
	fi
	if [ $((input&4)) -eq 4 ]; then
		ret=$((ret+8))
	fi
	if [ $((input&8)) -eq 8 ]; then
		ret=$((ret+16))
	fi

	echo $ret
}

# local $1 = lan_id
# local $2 = iptv_id
# local $3 = voip_id
# local $4 = iptv_port_mask
# local $5 = voip_port_mask
# local $6 = phy_port_index
get_lan_port_pvid()
{
	local iptv_port_mask=$4
	local voip_port_mask=$5
	local phy_port_index=$6

	local ret=0
	local mask=$((1<<phy_port_index))

	if [ $((iptv_port_mask&mask)) -eq $mask ]; then
		echo $2
		return
	fi

	if [ $((voip_port_mask&mask)) -eq $mask ]; then
		echo $3
		return
	fi

	echo $1
}

get_all_port_pvid()
{
	local lan_id=$1
	local iptv_id=$2
	local voip_id=$3

	local iptv_port_mask=$4
	local voip_port_mask=$5
	local wan_pvid=$6

	local p1=$(get_lan_port_pvid $lan_id $iptv_id $voip_id $iptv_port_mask $voip_port_mask 2)
	local p2=$(get_lan_port_pvid $lan_id $iptv_id $voip_id $iptv_port_mask $voip_port_mask 3)
	local p3=$(get_lan_port_pvid $lan_id $iptv_id $voip_id $iptv_port_mask $voip_port_mask 4)

	# p0 unuse; p1=wan(dft 8); p2=lan1; p3=lan2; p4=lan3
	echo "9,$wan_pvid,$p1,$p2,$p3,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0"
}

# local $1 = inet_id
# local $2 = iptv_id
# local $3 = voip_id
# local $4 = mc_id
# local $5 = inet_port_mask
# local $6 = iptv_port_mask
# local $7 = voip_port_mask
# local $8 = wan_or_iptv_tag (1:wan_tag, 2:iptv_tag, 3:all_tag)
# local $9 = lan_id
# local $10 = bridge_port_mask
# local $11 = inet_pri
# local $12 = iptv_pri
# local $13 = voip_pri
# local $14 = mc_pri
setup_switch_vlan_tagmode()
{
	local inet_id=$1
	local iptv_id=$2
	local voip_id=$3
	local mc_id=$4
	local inet_port_mask=$(logic_port_mask_to_phy_mask $5)
	local iptv_port_mask=$(logic_port_mask_to_phy_mask $6)
	local voip_port_mask=$(logic_port_mask_to_phy_mask $7)
	local wan_or_iptv_tag=$8
	local lan_id=$9
	local bridge_port=$(logic_port_mask_to_phy_mask $10)
	local wan_pvid=8

	local tmpnum
	local num2

	# enable vlan
	echo "1 1" > /proc/net/vlan/vlanEnable

	# add interent-lan vlan group, set lan port untagged; cpu tag
	echo $lan_id > /proc/net/vlan/hwNatLanVlanId
	echo $lan_id > /proc/net/vlan/groupIndex
	# add cpu & lan port to lan_vid_group vlan; 0x40 = CPU_PORT_MASK; 0 = NAT_VLAN
	tmpnum=$((inet_port_mask+CPU_PORT_MASK))
	tmpnum=$(printf %x $tmpnum)
	echo "1,$tmpnum,40,$lan_id,0,0" >/proc/net/vlan/vlanGroup

	# add internet wan vlan group, set wan port tagged or untag; cpu tag
	echo $inet_id > /proc/net/vlan/wanVlanId
	echo $inet_id > /proc/net/vlan/groupIndex
	# add cpu & wan port to lan_vid_group vlan; 0x42(66) = CPU_PORT_MASK + WAN_PORT_MASK; 0x40 = CPU_PORT_MASK; 0 = NAT_VLAN
	tmpnum=$((66+bridge_port))
	tmpnum=$(printf %x $tmpnum)
	if [ $wan_or_iptv_tag = 1 -o $wan_or_iptv_tag = 3 ]; then
		num2=$((66+bridge_port))   # wan/bridge_port/cpu tagged;
		num2=$(printf %x $num2)
	else
		num2=40   # only cpu tagged
	fi
	echo "1,$tmpnum,${num2},$inet_id,0,0" >/proc/net/vlan/vlanGroup
	echo "$inet_id,${11}" > /proc/net/vlan/priority


	if [ $voip_id -ne 0 ]; then
		# add bridge vlan group for VOIP, set voip-port untagged; wan port tagged; cpu tag
		echo $voip_id > /proc/net/vlan/groupIndex
		# add cpu & wan & voip port to lan_vid_group vlan; 0x40 = CPU_PORT_MASK; 1 = BRIDGE_VLAN
		tmpnum=$((voip_port_mask+CPU_PORT_MASK+WAN_PORT_MASK+bridge_port))
		tmpnum=$(printf %x $tmpnum)
		num2=$((CPU_PORT_MASK+WAN_PORT_MASK+bridge_port))
		num2=$(printf %x $num2)
		echo "1,$tmpnum,${num2},$voip_id,1,0" >/proc/net/vlan/vlanGroup
		echo "$voip_id,${13}" > /proc/net/vlan/priority
	fi

	if [ $iptv_id -ne 0 -a $mc_id -ne 0 ]; then
		# add bridge vlan group for MC-IPTV, set iptv-port untagged; wan port tagged or untag; cpu tag
		echo $mc_id > /proc/net/vlan/groupIndex
		# add cpu & wan & iptv port to lan_vid_group vlan; 1 = BRIDGE_VLAN
		tmpnum=$((iptv_port_mask+CPU_PORT_MASK+WAN_PORT_MASK+bridge_port))
		tmpnum=$(printf %x $tmpnum)
		num2=$((CPU_PORT_MASK+WAN_PORT_MASK+bridge_port))  # wan/bridge_port/cpu tagged;
		num2=$(printf %x $num2)
		echo "1,$tmpnum,${num2},$mc_id,1,0" >/proc/net/vlan/vlanGroup
		echo "$mc_id,${14}" > /proc/net/vlan/priority

		# eth-driver hook; replace vlan tag
		echo "not_mc $iptv_vid" > /proc/iptv_vid
		echo "mc $mc_id" > /proc/iptv_vid
	else
		echo "not_mc 0" > /proc/iptv_vid
	fi

	if [ $iptv_id -ne 0 ]; then
		# add bridge vlan group for IPTV, set iptv-port untagged; wan port tagged or untag; cpu tag
		echo $iptv_id > /proc/net/vlan/groupIndex
		# add cpu & wan & iptv port to lan_vid_group vlan; 0x42(66) = CPU_PORT_MASK + WAN_PORT_MASK; 0x40 = CPU_PORT_MASK; 1 = BRIDGE_VLAN
		tmpnum=$((iptv_port_mask+CPU_PORT_MASK+WAN_PORT_MASK+bridge_port))
		tmpnum=$(printf %x $tmpnum)
		if [ $wan_or_iptv_tag = 2 -o $wan_or_iptv_tag = 3 ]; then
			num2=$((66+bridge_port))  # wan/bridge_port/cpu tagged; 66 = 0x42
			num2=$(printf %x $num2)
		else
			num2=40   # only cpu tagged;; 0x40 = 64
			wan_pvid=$iptv_id
		fi
		echo "1,$tmpnum,${num2},$iptv_id,1,0" >/proc/net/vlan/vlanGroup
		echo "$iptv_id,${12}" > /proc/net/vlan/priority
	fi

	# set port pvid
	echo $(get_all_port_pvid $lan_id $iptv_id $voip_id $iptv_port_mask $voip_port_mask $wan_pvid) > /proc/net/vlan/pvid
}

# $1 = iptv_id
# $2 = lan_id
# $3 = iptv_mask (iptv port mask)
# $4 = lan_mask
setup_switch_vlan_bridgemode()
{
	local iptv_id=$1
	local lan_id=$2
	local iptv_mask=$(logic_port_mask_to_phy_mask $3)
	local lan_mask=$(logic_port_mask_to_phy_mask $4)

	local tmpnum

	# enable vlan
	echo "1 1" > /proc/net/vlan/vlanEnable

	# add interent-lan vlan group, set lan port untagged; cpu tag
	echo $lan_id > /proc/net/vlan/hwNatLanVlanId
	echo $lan_id > /proc/net/vlan/groupIndex
	# add cpu & lan port to lan_vid_group vlan; 0x40 = CPU_PORT_MASK; 0 = NAT_VLAN
	tmpnum=$((lan_mask+CPU_PORT_MASK))
	tmpnum=$(printf %x $tmpnum)
	echo "1,$tmpnum,0,$lan_id,0,0" >/proc/net/vlan/vlanGroup

	# add internet wan vlan group, set wan port tagged or untag; cpu tag
	echo $iptv_id > /proc/net/vlan/wanVlanId
	echo $iptv_id > /proc/net/vlan/groupIndex
	# add cpu & wan port to lan_vid_group vlan; 0x42(66) = CPU_PORT_MASK + WAN_PORT_MASK; 0x40 = CPU_PORT_MASK; 1 = BRIDGE_VLAN
	tmpnum=$((iptv_mask+CPU_PORT_MASK+WAN_PORT_MASK))
	tmpnum=$(printf %x $tmpnum)
	echo "1,$tmpnum,0,$iptv_id,1,0" >/proc/net/vlan/vlanGroup

	echo "not_mc 0" > /proc/iptv_vid

	# set port pvid
	echo $(get_all_port_pvid $lan_id $iptv_id 0 $iptv_mask 0 $iptv_id) > /proc/net/vlan/pvid

	echo "0,0" > /proc/net/vlan/priority
}


setup_switch_vlan_disable()
{
	echo "0 0" > /proc/net/vlan/vlanEnable &
	echo "0,0" > /proc/net/vlan/priority &
}
