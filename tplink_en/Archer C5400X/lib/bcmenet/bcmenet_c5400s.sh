#!/bin/sh

#########################################################################
# @ TP-Link
# for 4908+53134 arch LAG/IPTV config
# this file is misnamed for history reason, now it also support 4908+B50212
#########################################################################

. /lib/bcmenet/bcmenet_4908.sh

# moved from iptv_core.sh
PHY_LAN_PORT_NUM=8

# set at c5400s_get_interface_group, according PHY_LAN_PORT_NUM
portSeq=""

# C4000 port map
# moved from iptv_func.sh
LAN_PHY_PORT_SET="4 3 2 1 8 7 6 5"

VALID_LAG_PORTS="1 2 3 4"

GetConfigFlag=0

# be careful, the name may be conflicted with iptv_core.sh

# additional wan has the highest priority
addlwan="-1"

##########
lagif="ethlaga"
lagmask=0
lag1portmap=0
lag2portmap=0

iptv_enable=""
iptv_mode=""

#
int_wan="eth0"
int_53134="eth5"
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

# 53134 p0-p3 vlan id
vid_p4="2000"
vid_p5="2001"
vid_p6="2002"
vid_p7="2003"

#
txvid_p4="3000"
txvid_p5="3001"
txvid_p6="3002"
txvid_p7="3003"

# vlan mode ifname
lan1if="eth1"
lan2if="eth2"
lan3if="eth3"
lan4if="eth4"
lan5if="${int_53134}.${vid_p4}"
lan6if="${int_53134}.${vid_p5}"
lan7if="${int_53134}.${vid_p6}"
lan8if="${int_53134}.${vid_p7}"


########## WAN vlan id
internet_vid=""
internet_vprio=""
internet_tag=""
iptv_vid=""
iptv_vprio=""
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
			# check 53134 tx vid
			for k in 4 5 6 7 ; do
				eval "oldlanvid=\${txvid_p${k}}"
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

	for k in 4 5 6 7 ; do
		eval "oldlanvid=\${txvid_p${k}}"
		lanvid=$((oldlanvid+tries*conflictStep))
		eval "txvid_p${k}=\${lanvid}"		
	done

	# set 53134 vlan ifname
	for lanport in 5 6 7 8 ; do
		eval "lan${lanport}if=${int_53134}.\${vid_p$((lanport-1))}"
	done
}

c5400s_clear_all_bcmvlan ()
{
	# del all 53134/wan vlan interfaces
	bcm_4908_del_vlan_if "${int_53134}" "${int_wan}"
}

# when Router boot up, this is the default mode
#
# wan interface: eth0
# lan interface: eth1-eth4, eth5(53134)
roboswitch_normal_mode_config ()
{
	# disable vlan
	bcm_4908_set_vlan 0 0
	bcm_4908_set_vlan 1 0

	c5400s_clear_all_bcmvlan
}

# enable vlan to support 4 interfaces on 53134
# port isolation is supported here
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
	local ip0untag="0x13f" ip1untag="0x13f" ip2untag="0x13f" ip3untag="0x13f"	# except P7, which egress to 53134
	local ip4untag="0xf" ip5untag="0xf" ip6untag="0xf" ip7untag="0xf"			# except IMP and P7, which egress to CPU and 53134
	local ep0untag="0x10f" ep1untag="0x10f" ep2untag="0x10f" ep3untag="0x10f"	# all port untaged
	local ep4untag="0xf" ep5untag="0xf" ep6untag="0xf" ep7untag="0xf"			# except P8, which egress to CPU and RoboSwitch

	local tmpvif=""
	local tmpvid=""
	local tmptxvid=""
	local tmp0untag=""
	local tmp1untag=""
	local tmp0fwd=""
	local tmp1fwd=""

	# enable vlan and set to SVL mode
	bcm_4908_set_vlan 0 1 0
	bcm_4908_set_vlan 1 1 0
	
	# set vlan table of vid id 1
	# the default fwdmap and untagmap is 0, must set
	# or egress packets from CPU will carry vlan tag with vid 1
	bcm_4908_set_vlan_table 0 1 0x1bf 0x1bf
	bcm_4908_set_vlan_table 1 1 0x10f 0x10f

	# set port default vid, vlan table
	for i in ${portSeq} ; do
		local k=$((i-1))
		eval "tmpvid=\${vid_p$k}"
		eval "tmp0untag=\${ip${k}untag}"
		eval "tmp1untag=\${ep${k}untag}"
		# calculate fwd map to support port isolate
		for mask in ${internetPortMask} ${iptvPortMask} ${ipphonePortMask} ${bridgePortMask} ; do
			if [ $((mask&(1<<k))) -ne 0 ] ; then
				tmp0fwd=$((0x130|(mask&0xf)))
				if [ 0 -ne $(((mask>>4)&0xf)) ] ; then
					tmp0fwd=$((tmp0fwd|0x80))
				fi
				tmp1fwd=$((0x100|((mask>>4)&0xf)))
				break
			fi
		done
		bcm_4908_set_vlan_pvid $((k/4)) $((k%4)) ${tmpvid}
		bcm_4908_set_vlan_table 0 ${tmpvid} ${tmp0fwd} ${tmp0untag}
		bcm_4908_set_vlan_table 1 ${tmpvid} ${tmp1fwd} ${tmp1untag}
	done

	# set 53134 tx vlan table
	for i in 4 5 6 7 ; do
		eval "tmptxvid=\${txvid_p$i}"
		tmp0fwd="0x1b0"
		tmp0untag="0x0"
		tmp1fwd=$((0x100|(1<<(i-4))))
		tmp1untag=$((1<<(i-4)))
		bcm_4908_set_vlan_table 0 ${tmptxvid} ${tmp0fwd} ${tmp0untag}
		bcm_4908_set_vlan_table 1 ${tmptxvid} ${tmp1fwd} ${tmp1untag}
	done

	# create vlan interface
	for i in 4 5 6 7 ; do
		eval "tmpvid=\${vid_p$i}"
		eval "tmptxvid=\${txvid_p${i}}"
		eval "tmpvif=\${lan$((i+1))if}"
		bcm_4908_create_normal_vlan_if ${int_53134} ${tmpvif} ${tmpvid} ${tmptxvid}
	done

	bcm_4908_set_vlan_mode ${int_53134} "rg"
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
	local untag_map_53134=0
	local fwd_map_robo=0
	local fwd_map_53134=0

	if [ $# -lt 1 ] ; then
		echo "$err_pre: vlan id list required" >&2
		return 1
	fi

	if [ $bridgePortMask -eq 0 ] ; then
		return 1
	fi

	vlanidlist=$@

	fwd_map_robo=$((bridgePortMask&0xf))

	# if any passthrough ports on 53134 enable fwdmap of port 7
	[ $((bridgePortMask&0xf0)) -ne 0 ] && fwd_map_robo=$((fwd_map_robo|0x80))

	# no doubt imp port in fwd map
	fwd_map_robo=$((fwd_map_robo|0x130))

	fwd_map_53134=$(((bridgePortMask&0xf0)>>4))

	[ $fwd_map_53134 -ne 0 ] && fwd_map_53134=$((fwd_map_53134|0x100))
	
	for vlanid in ${vlanidlist} ; do
		if [ -z "${vlanid}" -o "$((vlanid))" -lt 2 -o "$((vlanid))" -gt 4094 ] ; then
			echo "$err_pre: invalid vlan id ${vlanid}" >&2
			return 1
		fi
		bcm_4908_set_vlan_table 0 ${vlanid} ${fwd_map_robo} ${untag_map_robo}
		if [ $fwd_map_53134 -ne 0 ] ; then
			bcm_4908_set_vlan_table 1 ${vlanid} ${fwd_map_53134} ${untag_map_53134}
		fi
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

	local mask53134=0xf0
	local mask53134Set=0
	local ext_non1st=0
	local ext_switch=0

	for port in ${portSeq} ; do
		if [ $((bridgePortMask&(1<<(port-1)))) -eq 0 ] ; then
			continue
		fi
			
		# for 53134 only need set once, all 53134 shared the common vlan
		ext_non1st=0
		ext_switch=0
		if [ $((mask53134&(1<<(port-1)))) -ne 0 ] ; then
			ext_switch=1
			if [ $mask53134Set -eq 0 ] ; then
				mask53134Set=$port
			else
				ext_non1st=1
			fi
		fi
		
		if [ ${ext_switch} -eq 0 ] ; then
			eval "realIf=\${lan${port}if}"
		else
			realIf=${int_53134}
		fi

		if [ ${ext_non1st} -eq 0 ] ; then
			[ -n "${lan_real_ifs}" ] && lan_real_ifs="${lan_real_ifs} "
			lan_real_ifs="${lan_real_ifs} ${realIf}"
		fi

		ifconfig $realIf up

		# create LAN port to bridge internet vlan 
		if [ "${internet_tag}" = "on" ] ; then
			if [ ${ext_non1st} -eq 0 ] ; then
				tmpif="${realIf}.${internet_vid}"
				[ -n "${int_list}" ] && int_list="${int_list} "
				int_list="${int_list}${tmpif}"
				bcm_4908_create_normal_vlan_if ${realIf} ${tmpif} ${internet_vid} ${internet_vid} ${internet_vprio}
			fi
		else
			if [ $ext_switch -eq 0 ] ; then
				tmpif="${realIf}.${internet_vid}"
				bcm_4908_create_int_vlan_if ${realIf} ${tmpif}
			else
				eval "tmpif=\${lan${port}if}"
			fi

			[ -n "${int_list}" ] && int_list="${int_list} "
			int_list="${int_list}${tmpif}"
		fi

		if [ "${iptv_vid}" != "0" -a ${ext_non1st} -eq 0 ] ; then
			tmpif="${realIf}.${iptv_vid}"
			[ -n "${iptv_list}" ] && iptv_list="${iptv_list} "
			iptv_list="${iptv_list}${tmpif}"
			if [ "${mciptv_enable}" = "on" ] ; then
				bcm_4908_create_iptv_mcast_vlan_if ${realIf} ${tmpif} ${iptv_vid} ${iptv_vprio} ${mciptv_vid} ${mciptv_vprio}
			else
				bcm_4908_create_normal_vlan_if ${realIf} ${tmpif} ${iptv_vid} ${iptv_vid} ${iptv_vprio}
			fi
		fi
		
		if [ "${ipphone_vid}" != "0" -a ${ext_non1st} -eq 0 ] ; then
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

	# set vlan table of roboswitch
	roboswitch_passthrough_vlan_table_config ${vid_list}

	pt_int_ifs=${int_list}
	pt_iptv_ifs=${iptv_list}
	pt_phone_ifs=${ipphone_list}

	echo "pass internet: \"${int_list}\""
	echo "pass iptv    : \"${iptv_list}\""
	echo "pass ipphone : \"${ipphone_list}\""
	echo "vid list     : \"${vid_list}\""
	echo "lan_real_ifs : \"${lan_real_ifs}\""

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
	local addlwan1=0
	local lagnum=0
	local porttype=""
	local portgroup=""
	local tmpif=""

	########################## FIXME: using a better way to get all config

	local add_wan_enable=$(uci get switch.addl_wan.addl_wan_enable)
	local add_wan_port_logical=$(uci get switch.addl_wan.addl_wan_port)
	portIndex=1
	for i in ${LAN_PHY_PORT_SET} ; do
		if [ "$portIndex" == "$add_wan_port_logical" ] ; then
			local add_wan_port=$i
			break
		fi
		portIndex=$((portIndex+1))
	done

	# LAG enable/ports
	local agg_enable=$(uci get switch.lan_agg.enable_agg)
	local agg_ports=$(uci get switch.lan_agg.lacpports)

	# iptv enable/mode
	iptv_enable=$(uci get iptv.iptv.enable)
	iptv_mode=$(uci get iptv.iptv.mode)

	# wan iptv vlan config
	internet_vid=$(uci get iptv.iptv.internet_vid)
	internet_vprio=$(uci get iptv.iptv.internet_vprio)
	internet_tag=$(uci get iptv.iptv.internet_tag)
	iptv_vid=$(uci get iptv.iptv.iptv_vid)
	iptv_vprio=$(uci get iptv.iptv.iptv_vprio)
	mciptv_vid=$(uci get iptv.iptv.mciptv_vid)
	mciptv_vprio=$(uci get iptv.iptv.mciptv_vprio)
	mciptv_enable=$(uci get iptv.iptv.mciptv_enable)
	ipphone_vid=$(uci get iptv.iptv.ipphone_vid)
	ipphone_vprio=$(uci get iptv.iptv.ipphone_vprio)

	# iptv port type, port map support here from logical->physical
	portIndex=1
	for i in ${LAN_PHY_PORT_SET} ; do
		[ -n "${portSeq}" ] && portSeq="${portSeq} "
		portSeq="${portSeq}${portIndex}"
		eval "local iptv_lan${i}=\$(uci get iptv.iptv.lan${portIndex})"
		portIndex=$((portIndex+1))
	done

	# find a unused vlan for lan 
	if [ ${iptv_enable} == "on" ] ; then
		c5400s_find_lan_vid
	fi

	##############

	# get additional wan
	if [ "${add_wan_enable}" == "1" ] ; then
		if [ "${add_wan_port}" -ge 1 -a "${add_wan_port}" -le 4 ] ; then
			addlwan1=${add_wan_port}
			addlwan=$((add_wan_port-1))
		else
			echo "***err: invalid additional wan port ${add_wan_port}"
			addlwan="-1"
		fi
	else
		addlwan="-1"
	fi

	# get LAG Mask
	if [ ${agg_enable} == "1" ] ; then
		for i in ${agg_ports} ; do
			local agg_port_valid=0
			for lport in ${VALID_LAG_PORTS} ; do
				if [ "${lport}" == "$i" ] ; then
					agg_port_valid=1
					break
				fi
			done
			local k=-1
			# convert to physical port
			portIndex=1
			for j in ${LAN_PHY_PORT_SET} ; do
				if [ "$portIndex" == "$i" ] ; then
					k=$j
					break
				fi
				portIndex=$((portIndex+1))
			done
			if [ ${agg_port_valid} -eq 1 -a $k -ne -1 -a $((${lagmask}&(1<<($k-1)))) -eq 0 -a $k -ne ${addlwan1} ] ; then
				lagmask=$((lagmask|(1<<(k-1))))
				lagnum=$((lagnum+1))
			else
				echo "***err: invalid agg_ports, i: $i" >&2
				lagmask=0
				break
			fi	
		done
	fi

	if [ ${agg_enable} == "1" -a ${lagnum} -ne 2 ] ; then
		echo "***err: invalid agg_ports, num: ${lagnum}" >&2
		lagmask=0
	fi

	lag1portmap=${lagmask}
	lag2portmap=0

	if [ ${lagmask} -ne 0 ] ; then
		for i in ${VALID_LAG_PORTS} ; do
			if [ $((${lagmask}&(1<<($i-1)))) -ne 0 ] ; then
				lagif="${lagif}$i"
			fi
		done
		lan_ifs="${lagif}"	
	fi

	for i in 1 2 3 4 ; do
		if [ $((${lagmask}&(1<<($i-1)))) -eq 0 -a $i -ne ${addlwan1} ] ; then
			eval "tmpif=\${lan${i}if}"
			[ -n "${lan_ifs}" ] && lan_ifs="${lan_ifs} "
			lan_ifs="${lan_ifs}${tmpif}"
		fi
	done

	lan_ifs="${lan_ifs} ${int_53134}"

	if [ ${iptv_enable} == "on" ] ; then
		internetPortMask=${lagmask}
		for i in ${portSeq} ; do
			# this LAN has been configed as additional wan, skip it
			if [ $i -eq ${addlwan1} ] ; then
				continue
			fi
			if [ $((${lagmask}&(1<<($i-1)))) -eq 0 ] ; then
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
			fi
		done
		# add LAG interface to internet ifs
		[ ${lagmask} -ne 0 ] && internet_ifs="${lagif} ${internet_ifs}"
	else
		internet_ifs="${lan_ifs}"
	fi

	if [ -z "${internet_ifs}" ] ; then
		echo "***err: no internet interfaces" >&2
	fi

	echo "Addl     WAN: \"${addlwan}\""
	echo "LAN      ifs: \"${lan_ifs}\""
	echo "Internet ifs: \"${internet_ifs}\""
	echo "IPTV     ifs: \"${iptv_ifs}\""
	echo "IP-Phone ifs: \"${ipphone_ifs}\""
	echo "Bridge   ifs: \"${passpthrou_ifs}\""

	GetConfigFlag=1
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
	    #eth0 must add behind $internet_ifs,as lua may match the first eth iface to get lan mac
		internet_ifs="$internet_ifs eth0"
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
		# when boot, always init them to eth0, if iptv enabled, iptv will set them correctly.
		wantype=`uci get network.wan.type 2>/dev/null`
		if [ "$(uci get network.wan.ifname)" != "eth0" -o "$wantype" == "bridge" ] ; then
			anychange=1
			c5400s_uci_set_interface "wan" "eth0"
		fi

		for ent in internet wanv6 ; do
			if ifname=`uci get network.$ent.ifname 2> /dev/null` ; then
				if [ $ifname != "eth0" ] ; then
					anychange=1
					uci set network.$ent.ifname="eth0"
				fi
			fi
		done

		for ent in wan internet staticv6 dhcpv6 pppoev6 6to4 dslite ; do
			if ifname=`uci get protocol.$ent.ifname 2> /dev/null` ; then
				if [ $ifname != "eth0" ] ; then
					protchange=1
					uci set protocol.$ent.ifname="eth0"
				fi
			fi
		done

	fi

	if [ $anychange -ne 0 ] ; then
		uci commit network
	fi
	if [ $protchange -ne 0 ] ; then
		uci commit protocol
	fi
}

# output all lan phy state to stdout
# the format like this:
#	unit 1 port 0 down
#	unit 1 port 1 up 1000M FD
#	unit 1 port 2 down
#	unit 1 port 3 down
#	unit 1 port 7 down
#
c5400s_get_lan_phy_state ()
{
	{
		flock -s -w 5 0
		if [ $? -ne 0 ] ; then
			echo "flock /tmp/swmdk_phystate failed" >&2
		fi
		cat <&0
	} 0< /tmp/swmdk_phystate
}
