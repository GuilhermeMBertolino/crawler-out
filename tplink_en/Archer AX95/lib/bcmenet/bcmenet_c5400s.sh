#!/bin/sh

#########################################################################
# @ TP-Link
# for 4908+53134 arch LAG/IPTV config
# this file is misnamed for history reason, now it also support 4908+B50212
#########################################################################

. /lib/bcmenet/bcmenet_4908.sh

# moved from iptv_core.sh
PHY_LAN_PORT_NUM=4

# set at c5400s_get_interface_group, according PHY_LAN_PORT_NUM
portSeq=""

# iptv lan1-lan4
LAN_PHY_PORT_SET="1 2 3 4"

GetConfigFlag=0

# be careful, the name may be conflicted with iptv_core.sh

iptv_enable=""
iptv_mode=""

#
int_wan="eth0"
lan_ifs=""
internet_ifs=""
iptv_ifs=""
ipphone_ifs=""
passpthrou_ifs=""
lan_real_ifs=""

# passthough bridge interfaces
pt_int_ifs=""
pt_iptv_ifs=""
pt_phone_ifs=""

# used as port isolate
internetPortMask=0
iptvPortMask=0
ipphonePortMask=0
bridgePortMask=0

# if following vlan vid conflict with WAN vlan id when IPTV bridge port set
# increase a step and check again until no conflict found
conflictStep=10

# internal p0-p8 vlan id
# if any passthrough port and vlan id conflict with wan vlan id
# these vid will be changed by `c5400s_get_interface_group`
#
vid_p0="1000"
vid_p1="1001"
vid_p2="1002"
vid_p3="1003"

# vlan mode ifname
# (port ifname) mapping
lan1if=""
lan2if=""
lan3if=""
lan4if=""

########## WAN vlan id
internet_vid=""
internet_vprio=""
internet_tag=""
iptv_vid=""
iptv_vprio=""
iptv_tag=""
mciptv_vid=""
mciptv_vprio=""
mciptv_enable=""
ipphone_vid=""
ipphone_vprio=""

c5400s_find_lan_vid ()
{
	local lanvid=0
	local tries=0
	local oldlanvid=0
	local maxtries=10
	local conflictfound=1
	local wanvids="${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"

	while [ ${tries} -lt ${maxtries} -a ${conflictfound} -eq 1 ] ; do
		conflictfound=0
		for wanvid in ${wanvids} ; do
			local conflict=0
			for lanport in ${portSeq} ; do
				eval "oldlanvid=\${vid_p$((lanport-1))}"
				lanvid=$((oldlanvid+tries*conflictStep))
				if [ "${lanvid}" == "${wanvid}" ] ; then
					conflict=1
					break
				fi
			done
			if [ "${conflict}" -eq 1 ] ; then
				tries=$((tries+1))
				conflictfound=1
				break;
			fi
		done
	done

	if [ ${conflictfound} -eq 1 ] ; then
		echo "***err: can't find lan vlan id" >&2
		return 1
	fi

	# set new vid
	for lanport in ${portSeq} ; do
		eval "oldlanvid=\${vid_p$((lanport-1))}"
		lanvid=$((oldlanvid+tries*conflictStep))
		eval "vid_p$((lanport-1))=\${lanvid}"
	done
}

c5400s_clear_all_bcmvlan ()
{
	# del all wan vlan interfaces
	bcm_4908_del_vlan_if ${lan_ifs} "${int_wan}"
}

# when Router boot up, this is the default mode
#
# wan interface: eth0
# lan interface: eth1-eth4, eth5(external phy B50212E)
roboswitch_normal_mode_config ()
{
	# disable vlan
	bcm_4908_set_vlan 0 0

	c5400s_clear_all_bcmvlan
}

# this func is called only when iptv "on"
# so here no need check again.
#
# port isolation is supported here
#
# for C4000
# there are two ways to do port isolate: PBVLAN 802.1Q vlan
# because if there are any bridge port, we must enable 802.1Q vlan
# to simplify the work, we use 802.1Q vlan to do port isolate.
#
roboswitch_vlan_mode_config ()
{	
	local m=${internetPortMask}
	local n=${iptvPortMask}
	local t=${ipphonePortMask}
	local b=${bridgePortMask}

	local err_pre="***error roboswitch_vlan_mode_config()"

	# don't check $((m|n|t|b)) -ne $((0xff))
	# because addtional wan is not count
	#
	if [[ $((m&n)) -ne 0 || $((m&t)) -ne 0 || $((m&b)) -ne 0 || \
		$((n&t)) -ne 0 || $((n&b)) -ne 0 || $((t&b)) -ne 0 ]] ; then
		echo "${err_pre}: invalid port mask $m $n $t $b" >&2
		return 1
	fi

	# const untag map
	local ip0untag="0x1Bf" ip1untag="0x1Bf" ip2untag="0x1Bf" ip3untag="0x1Bf"	# untag all port except P6, unavailable on RoboSwitch

	local tmpvid=""
	local tmp0untag=""
	local tmp0fwd=""

	# enable vlan and set to SVL mode
	bcm_4908_set_vlan 0 1 0

	# set vlan table of vid id 1
	# the default fwdmap and untagmap is 0, must set
	# or egress packets from CPU will carry vlan tag with vid 1
	bcm_4908_set_vlan_table 0 1 0x1bf 0x1bf

	# set port default vid, vlan table
	for i in ${portSeq} ; do
		local k=$((i-1))
		eval "tmpvid=\${vid_p$k}"
		eval "tmp0untag=\${ip${k}untag}"
		# calculate fwd map to support port isolate
		for mask in ${internetPortMask} ${iptvPortMask} ${ipphonePortMask} ${bridgePortMask} ; do
			local phyMask=$((mask&0xf))
			if [ $((mask&(1<<k))) -ne 0 ] ; then
				tmp0fwd=$((0x130|phyMask))			# 0x130 fwd to IMP port 4/5/8
				break
			fi
		done
		local phyport=$k
		bcm_4908_set_vlan_pvid 0 $phyport ${tmpvid}
		bcm_4908_set_vlan_table 0 ${tmpvid} ${tmp0fwd} ${tmp0untag}
	done
}

# set passthrough vlan table
# the frame ingress/egress the passthrough port carry VLAN tag
# only need set vlan table to forward these frames to correct ports
# passthrough should isolate with other ports
#
roboswitch_passthrough_vlan_table_config ()
{
	local err_pre="***err roboswitch_passthrough_vlan_table_config ()"
	local untag_map_robo=0
	local fwd_map_robo=0

	vlanidlist=$@

	local phyMask=$((bridgePortMask&0xf))
	fwd_map_robo=phyMask
	# no doubt imp port in fwd map
	fwd_map_robo=$((fwd_map_robo|0x130))
	
	for vlanid in ${vlanidlist} ; do
		if [ -z "${vlanid}" -o "$((vlanid))" -lt 2 -o "$((vlanid))" -gt 4094 ] ; then
			echo "$err_pre: invalid vlan id ${vlanid}" >&2
			return 1
		fi
		bcm_4908_set_vlan_table 0 ${vlanid} ${fwd_map_robo} ${untag_map_robo}
	done
}

roboswitch_passthrough_vlan_mode_config ()
{
	if [ ${bridgePortMask} -eq 0 ] ; then
		return 0
	fi

	local realIf=""
	local wan_vlan_if=""

	local int_list=""
	local iptv_list=""
	local ipphone_list=""
	local tmpif=""
	local vid_list=""

	for port in ${portSeq} ; do
		if [ $((bridgePortMask&(1<<(port-1)))) -eq 0 ] ; then
			continue
		fi
			
		eval "realIf=\${lan${port}if}"

		[ -n "${lan_real_ifs}" ] && lan_real_ifs="${lan_real_ifs} "
		lan_real_ifs="${lan_real_ifs} ${realIf}"

		ifconfig $realIf up

		# create LAN port to bridge internet vlan 
		if [ "${internet_tag}" = "on" ] ; then
			tmpif="${realIf}.${internet_vid}"
			[ -n "${int_list}" ] && int_list="${int_list} "
			int_list="${int_list}${tmpif}"
			bcm_4908_create_normal_vlan_if ${realIf} ${tmpif} ${internet_vid} ${internet_vid} ${internet_vprio}
		else
			tmpif="${realIf}.${internet_vid}"
			[ -n "${int_list}" ] && int_list="${int_list} "
			int_list="${int_list}${tmpif}"
			bcm_4908_create_int_vlan_if ${realIf} ${tmpif}
		fi

		if [ "${iptv_vid}" != "0" ] ; then
			if [ "${iptv_tag}" = "on" ] ; then
				tmpif="${realIf}.${iptv_vid}"
				[ -n "${iptv_list}" ] && iptv_list="${iptv_list} "
				iptv_list="${iptv_list}${tmpif}"
				if [ "${mciptv_enable}" = "on" ] ; then
					bcm_4908_create_iptv_mcast_vlan_if ${realIf} ${tmpif} ${iptv_vid} ${iptv_vprio} ${mciptv_vid} ${mciptv_vprio}
				else
					bcm_4908_create_normal_vlan_if ${realIf} ${tmpif} ${iptv_vid} ${iptv_vid} ${iptv_vprio}
			fi
			else
				tmpif="${realIf}.${iptv_vid}"
				[ -n "${int_list}" ] && int_list="${int_list} "
				int_list="${int_list}${tmpif}"
				bcm_4908_create_int_vlan_if ${realIf} ${tmpif}
			fi
		fi
		
		if [ "${ipphone_vid}" != "0" ] ; then
			tmpif="${realIf}.${ipphone_vid}"
			[ -n "${ipphone_list}" ] && ipphone_list="${ipphone_list} "
			ipphone_list="${ipphone_list}${tmpif}"
			bcm_4908_create_normal_vlan_if ${realIf} ${tmpif} ${ipphone_vid} ${ipphone_vid} ${ipphone_vprio}
		fi

		bcm_4908_set_vlan_mode ${realIf} "rg"
	done

	[ "${internet_vid}" != "0" ] && vid_list="${vid_list} ${internet_vid}"

	[ "${iptv_vid}" != "0" ] && {
		vid_list="${vid_list} ${iptv_vid}"
		[ "${mciptv_enable}" = "on" ] && vid_list="${vid_list} ${mciptv_vid}"
	}

	[ "${ipphone_vid}" != "0" ] && vid_list="${vid_list} ${ipphone_vid}"

	# NOTICE: no need for 4-port products like c4000/ax1500
	# set vlan table of roboswitch
	#roboswitch_passthrough_vlan_table_config ${vid_list}

	pt_int_ifs=${int_list}
	pt_iptv_ifs=${iptv_list}
	pt_phone_ifs=${ipphone_list}

	echo "pass internet: \"${int_list}\""
	echo "pass iptv    : \"${iptv_list}\""
	echo "pass ipphone : \"${ipphone_list}\""
	echo "vid list     : \"${vid_list}\""
	echo "lan_real_ifs : \"${lan_real_ifs}\""

}

get_iptv_cfg()
{
	local internet_item=""
	local iptv_item=""
	local ipphone_item=""
	local internet_item=""

	# iptv enable/mode
	iptv_enable=$(uci get iptv.iptv.enable)
	iptv_mode=$(uci get iptv.iptv.mode)
	iptv_igmp_snooping_enable=$(uci get iptv.iptv.igmp_snooping_enable 2>/dev/null)
	iptv_ports=$(uci get iptv.iptv.lanport 2>/dev/null)

	internet_item=$(uci get iptv.$iptv_mode.internet_item 2>/dev/null)
	iptv_item=$(uci get iptv.$iptv_mode.iptv_item 2>/dev/null)
	ipphone_item=$(uci get iptv.$iptv_mode.ipphone_item 2>/dev/null)
	mciptv_item=$(uci get iptv.$iptv_mode.mciptv_item 2>/dev/null)

	# wan iptv vlan config
	if [ -z "$internet_item" -a -z "$iptv_item" -a -z "$ipphone_item" -a -z "$mciptv_item" ]; then
		# set default value to be compatable with the old
		internet_vid=$(uci get iptv.iptv.internet_vid 2>/dev/null)
		internet_vprio=$(uci get iptv.iptv.internet_vprio 2>/dev/null)
		internet_tag=$(uci get iptv.iptv.internet_tag 2>/dev/null)
		iptv_vid=$(uci get iptv.iptv.iptv_vid 2>/dev/null)
		iptv_vprio=$(uci get iptv.iptv.iptv_vprio 2>/dev/null)
		iptv_tag=$(uci get iptv.iptv.iptv_tag 2>/dev/null)
		ipphone_vid=$(uci get iptv.iptv.ipphone_vid 2>/dev/null)
		ipphone_vprio=$(uci get iptv.iptv.ipphone_vprio 2>/dev/null)
		mciptv_vid=$(uci get iptv.iptv.mciptv_vid 2>/dev/null)
		mciptv_vprio=$(uci get iptv.iptv.mciptv_vprio 2>/dev/null)
		mciptv_enable=$(uci get iptv.iptv.mciptv_enable 2>/dev/null)
	else
		if [ "$internet_item" != "off" ]; then
			internet_vid=$(uci get iptv.$iptv_mode.internet_vid 2>/dev/null)
			[ -z "$internet_vid" ] && internet_vid="0"

			internet_vprio=$(uci get iptv.$iptv_mode.internet_vprio 2>/dev/null)
			[ -z "$internet_vprio" ] && internet_vprio="0"

			internet_tag=$(uci get iptv.$iptv_mode.internet_tag 2>/dev/null)
			[ -z "$internet_tag" ] && internet_tag="off"
		else
			internet_vid="0"
			internet_vprio="0"
			internet_tag="off"
		fi

		if [ "$iptv_item" != "off" ]; then
			iptv_vid=$(uci get iptv.$iptv_mode.iptv_vid 2>/dev/null)
			[ -z "$iptv_vid" ] && iptv_vid="0"

			iptv_vprio=$(uci get iptv.$iptv_mode.iptv_vprio 2>/dev/null)
			[ -z "$iptv_vprio" ] && iptv_vprio="0"

			iptv_tag=$(uci get iptv.$iptv_mode.iptv_tag 2>/dev/null)
			[ -z "$iptv_tag" ] && iptv_tag="on"
		else
			iptv_vid="0"
			iptv_vprio="0"
			iptv_tag="off"
		fi

		if [ "$ipphone_item" != "off" ]; then
			ipphone_vid=$(uci get iptv.$iptv_mode.ipphone_vid 2>/dev/null)
			[ -z "$ipphone_vid" ] && ipphone_vid="0"

			ipphone_vprio=$(uci get iptv.$iptv_mode.ipphone_vprio 2>/dev/null)
			[ -z "$ipphone_vprio" ] && ipphone_vprio="0"
		else
			ipphone_vid="0"
			ipphone_vprio="0"
		fi

		if [ "$mciptv_item" != "off" ]; then
			mciptv_vid=$(uci get iptv.$iptv_mode.mciptv_vid 2>/dev/null)
			[ -z "$mciptv_vid" ] && mciptv_vid="0"

			mciptv_vprio=$(uci get iptv.$iptv_mode.mciptv_vprio 2>/dev/null)
			[ -z "$mciptv_vprio" ] && mciptv_vprio="0"

			mciptv_enable=$(uci get iptv.$iptv_mode.mciptv_enable 2>/dev/null)
			[ -z "$mciptv_enable" ] && mciptv_enable="off"
		else
			mciptv_vid="0"
			mciptv_vprio="0"
			mciptv_enable="off"
		fi

		if [ "$internet_item" == "on" -a "$internet_tag" == "off" ]; then
			if [ "$iptv_item" != "on" -o  "$iptv_tag" != "off" ]; then
				for i in `seq 2 4094`
				do
					if [ "$i" != "$iptv_vid" -a "$i" != "$ipphone_vid" ]; then
						if [ "$mciptv_enable" == "off" -o "$i" != "$mciptv_vid" ]; then
							internet_vid="$i"
							break
						fi
					fi
				done
			fi
		fi

		if [ "$iptv_item" == "on" -a  "$iptv_tag" == "off" ]; then
			if [ "$internet_item" != "on" -o "$internet_tag" != "off" ]; then
				for i in `seq 2 4094`
				do
					if [ "$i" != "$internet_vid" -a "$i" != "$ipphone_vid" ]; then
						if [ "$mciptv_enable" == "off" -o "$i" != "$mciptv_vid" ]; then
							iptv_vid="$i"
							break
						fi
					fi
				done
			fi
		fi
	fi

	iptv_porttype=$(uci get iptv.$iptv_mode.porttype 2>/dev/null)
	
	# iptv port type, port map support here from logical->physical
	local portIndex=1	
	for i in ${LAN_PHY_PORT_SET} ; do
		[ -n "${portSeq}" ] && portSeq="${portSeq} "
		portSeq="${portSeq}${portIndex}"

		# set default value to be compatable with the old
		if [ -z "$iptv_ports" ]; then
			eval "iptv_lan${i}=\$(uci get iptv.iptv.lan${portIndex})"
		else
			local porttype=$(eval "echo \"${iptv_porttype}\" | awk '{print \$${portIndex}}'")
			eval "iptv_lan${i}=\${porttype}"
		fi
		portIndex=$((portIndex+1))
	done	
}

get_lan_wan_ifs()
{
    local wan_sec=$(uci get switch.wan.switch_port)
    int_wan=$(uci get switch.${wan_sec}.ifname)

    lan_ifs=""
    local lan4_sec=$(uci get switch.lan4.switch_port)
    local lan_list="lan1 lan2 lan3 ${lan4_sec}"
    local portIndex=1
    for lan in ${lan_list}
    do
        local ifname=$(uci get switch.${lan}.ifname)
        eval "lan${portIndex}if=${ifname}"
        portIndex=$((portIndex+1))
        [ -n "${lan_ifs}" ] && lan_ifs="${lan_ifs} "
        lan_ifs="${lan_ifs}${ifname}"
    done

    echo "lan1=$lan1if lan2=$lan2if lan3=$lan3if lan4=$lan4if" >/dev/console
}

# the one and only API to get port types, including Dual WAN/Dual LAN/IPTV 
# logical to physical port map is supported at here.
#
# ports in config layer such as webpages, LUA are all logical ports
# ports in action layer are all physical ports
#
c5400s_get_interface_group ()
{
	if [ $GetConfigFlag -ne 0 ] ; then
		return
	fi

	local portIndex=1
	local porttype=""
	local portgroup=""
	local tmpif=""

	########################## FIXME: using a better way to get all config

	# init lan wan
	get_lan_wan_ifs

	# Get IPTV config
	get_iptv_cfg

	# find a unused vlan for lan 
	if [ ${iptv_enable} == "on" ] ; then
		c5400s_find_lan_vid
	fi

	##############

	if [ ${iptv_enable} == "on" ] ; then
		for i in ${portSeq} ; do
			#if [ $((${lagmask}&(1<<($i-1)))) -eq 0 ] ; then
				eval "porttype=\${iptv_lan${i}}"
				if [ ${porttype} == "IPTV" ] ; then
					iptvPortMask=$((iptvPortMask|(1<<(i-1))))
					portgroup="iptv_ifs"
				elif [ ${porttype} == "IP-Phone" ] ; then
					ipphonePortMask=$((ipphonePortMask|(1<<(i-1))))
					portgroup="ipphone_ifs"
				elif [ ${porttype} == "Bridge" ] ; then
					bridgePortMask=$((bridgePortMask|(1<<(i-1))))
					portgroup="passpthrou_ifs"
				else
					internetPortMask=$((internetPortMask|(1<<(i-1))))
					portgroup="internet_ifs"
				fi
				eval "[ -n \"\${${portgroup}}\" ] && ${portgroup}=\"\${${portgroup}} \""
				eval "${portgroup}=\"\${${portgroup}}\${lan${i}if}\""
			#fi
		done
	else
		internet_ifs="${lan_ifs}"
	fi

	if [ -z "${internet_ifs}" ] ; then
		echo "***err: no internet interfaces" >&2
	fi

	echo "LAN      ifs: \"${lan_ifs}\""
	echo "Internet ifs: \"${internet_ifs}\""
	echo "IPTV     ifs: \"${iptv_ifs}\""
	echo "IP-Phone ifs: \"${ipphone_ifs}\""
	echo "Bridge   ifs: \"${passpthrou_ifs}\""

	GetConfigFlag=1
}


# FIXME: using a better way to check network device
# now delete all old devices, and create some new
#
config_network_device ()
{

	while uci delete network.@device[0] > /dev/null 2>&1 ; do
		:
	done

	/sbin/network_firm $@
}

config_if () {
	# moved from /etc/init.d/boot
	config_load sysmode
	config_get mode sysmode mode
	local internetIf
	if [ $mode = "ap" ]; then
		internetIf=$int_wan
	else
		# always init to $int_wan for robust, if iptv enabled, /etc/init.d/iptv will change it
		# internetIf=$(uci get network.wan.ifname)
		internetIf=$int_wan		
	fi
	config_network_device ${internetIf} ${lan_ifs}
}

c5400s_uci_set_interface ()
{
	local iface=""
	local ifname=""
	local bridge=0

	local err_pre="***err uci_set_interface()"

	if [ $# -lt 2 -o -z $1 ] ; then
		echo "${err_pre}: iterface name and interface list required" >&2
		return;
	fi

	iface=$1
	ifname=$2

	if [ $# -ge 3 ] ; then
		bridge=$3
	fi

	case ${iface} in 
		"lan")
			[ -n "${ifname}" ] && uci set network.lan.ifname="${ifname}"
			;;

		"wan")
			[ -n "${ifname}" ] && uci set network.wan.ifname="${ifname}"
			if [ ${bridge} -eq 1 ] ; then
				uci set network.wan.type="bridge"
			else
				uci delete network.wan.type > /dev/null 2>&1
			fi
			;;

		*)
			if [ -n "${ifname}" ] ; then
				if ! uci get network.${iface} > /dev/null 2>&1 ; then
					uci set network.${iface}=interface
					uci set network.${iface}.proto=static
				fi
				uci set network.${iface}.ifname="${ifname}"
				uci set network.${iface}.igmp_snooping=0
				uci set network.${iface}.type="bridge"
			else
				if uci get network.${iface} > /dev/null 2>&1 ; then
					uci delete network.${iface}
				fi
			fi
		;;
	esac
}

iptv_lan_snooping_change()
{
	local igmp_snooping_en="$(uci get iptv.iptv.igmp_snooping_enable)"
	local lan_snooping="$(uci get network.lan.igmp_snooping)"
	local iptv_en="$(uci get iptv.iptv.enable)"
	
	if [ "$igmp_snooping_en" = "off" -a "$lan_snooping" = "0" -a "$iptv_en" = "off" ]; then
		uci set network.lan.igmp_snooping=1
		return 0
	fi

	if [ "$igmp_snooping_en" = "off" -a "$lan_snooping" = "1" ]; then
		if [ "$iptv_en" = "on" ]; then
			uci set network.lan.igmp_snooping=0
			return 0
		fi
	elif [ "$igmp_snooping_en" = "on" -a "$lan_snooping" = "0" ]; then
		uci set network.lan.igmp_snooping=1
		return 0
	fi

	return 1
}

# set correct lan ifname because LAG may affect ifname
# rely on c5400s_get_interface_group to get `internet_ifs`
#
c5400s_interface_init_config ()
{
	local anychange=0
	local protchange=0
	config_load sysmode
	config_get mode sysmode mode
	
	if [ "$mode" = "ap" ]; then
	    #$int_wan must add behind $internet_ifs,as lua may match the first eth iface to get lan mac
		internet_ifs="$internet_ifs $int_wan"
	fi

	# make LAG taking affect after LAG config reboot
	if [ "$(uci get network.lan.ifname)" != "${internet_ifs}" ] ; then
		anychange=1
		c5400s_uci_set_interface "lan" "${internet_ifs}"
	fi

	# don't need check wan ifname, it is always right
	if [ "$mode" = "router" ] ; then
		# (now wan ifname maybe error, because we don't save it to flash at iptv config)
		# `network.wan.ifname` and `network.internet.ifname` are runtime params
		# when boot, always init them to $int_wan, if iptv enabled, iptv will set them correctly.
		wantype=`uci get network.wan.type 2>/dev/null`
		if [ "$(uci get network.wan.ifname)" != "${int_wan}" -o "$wantype" == "bridge" ] ; then
			anychange=1
			c5400s_uci_set_interface "wan" "${int_wan}"
		fi

		# !!! FIXME: modify netifd later !!!		
		if ifname=$(uci get profile.@wan[0].wan_ifname -c /etc/profile.d -q) ; then
			if [ "${ifname}" != "${int_wan}" ] ; then
				uci set profile.@wan[0].wan_ifname="${int_wan}" -c /etc/profile.d
				uci commit -c /etc/profile.d
			fi
		fi

		for ent in internet wanv6 ; do
			if ifname=`uci get network.$ent.ifname 2> /dev/null` ; then
				if [ $ifname != "${int_wan}" ] ; then
					anychange=1
					uci set network.$ent.ifname="${int_wan}"
				fi
			fi
		done

		for ent in wan internet static dhcp pppoe pptp l2tp ; do
			if ifname=`uci get protocol.$ent.ifname 2> /dev/null` ; then
				if [ $ifname != "${int_wan}" ] ; then
					protchange=1
					uci set protocol.$ent.ifname="${int_wan}"
				fi
			fi
		done
		
		for ent in staticv6 dhcpv6 pppoev6 pppoeshare 6to4 passthrough dslite v6plus 6rd ; do
			if ifname=`uci get protocol.$ent.ifname 2> /dev/null` ; then
				if [ $ifname != "${int_wan}" ] ; then
					protchange=1
					uci set protocol.$ent.ifname="${int_wan}"
				fi
			fi
		done

		if [ "$(uci get iptv.iptv.wan)" != "${int_wan}" ] ; then			
			uci set iptv.iptv.wan="${int_wan}"
			uci commit iptv
		fi
	fi

	# check lan snooping
	iptv_lan_snooping_change && {
		anychange=1
		echo "[c5400s_interface_init_config]: lan snooping changed" > /dev/console
	}

	if [ $anychange -ne 0 ] ; then
		uci commit network
	fi
	if [ $protchange -ne 0 ] ; then
		uci commit protocol
	fi
}
