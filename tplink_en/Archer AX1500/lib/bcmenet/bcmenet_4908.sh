#!/bin/sh

###############################################################################
# @ TP-Link
# for BCM4908+53134S arch
# this script provides low level switch config APIs for upper applications.
###############################################################################

debug_this_script=1

#
# enable/disable vlan
#
# param 	[$1] 	unit, 0: internal switch, 1: external switch 53134
#  			[$2] 	type, 0: disable, 1: enable
#  			[$3] 	vlan mode, 0: SVL, 1: IVL
bcm_4908_set_vlan ()
{
	local cmd=""
	local setval=""

	local reg="0x3400"
	local reglen="1"

	if [ $# -lt 2 ] ; then
		echo  "error bcm_4908_set_vlan(): A minimum of 2 arguments is required" >&2
		return 1
	fi

	# unit
	if [ $1 -eq 0 ] ; then
		cmd="regaccess -v"
	elif [ $1 -eq 1 ] ; then
		cmd="pmdioaccess -x"
	else 
		echo "error bcm_4908_set_vlan(): unknown switch $1" >&2
		return 1
	fi

	# type
	if [ $2 -eq 1 ] ; then
		if [ $# -lt 3 ] ; then
			echo "error bcm_4908_set_vlan(): need vlan mode" >&2
			return 1
		fi
		# vlan mode
		if [ $3 -eq 0 ] ; then
			setval="0x83"		#SVL
		elif [ $3 -eq 1 ] ; then
			setval="0xe3"		#IVL
		else 
			echo "error bcm_4908_set_vlan(): unknown vlan mode $3" >&2
			return 1
		fi
	elif [ $2 -eq 0 ] ; then
		setval="0x63"
	else 
		echo "error bcm_4908_set_vlan(): invalid type $2" >&2
		return 1
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval} > /dev/null
	else
		echo "ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}"
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}
	fi
}

#
# set port default vlan id 
#
# param		[$1]	unit, 0: internal switch, 1: external switch 53134
#			[$2]	port(0-8)
#			[$3]	vlan id 1-4094
bcm_4908_set_vlan_pvid ()
{
	local cmd=""
	local setval=""

	local reg=""
	local regpage="0x34"
	local regoffset1="111111112"
	local regoffset2="02468ace0"
	local reglen="2"

	if [ $# -lt 3 ] ; then
		echo  "error bcm_4908_set_vlan_pvid(): 3 params required" >&2
		return 1
	fi

	# unit
	if [ $1 -eq 0 ] ; then
		cmd="regaccess -v"
	elif [ $1 -eq 1 ] ; then
		cmd="pmdioaccess -x"
	else 
		echo "error bcm_4908_set_vlan_pvid(): unknown switch $1" >&2
		return 1
	fi

	if [[ $2 -ge 0 && $2 -le 8 ]] ; then
		reg="${regpage}${regoffset1:$2:1}${regoffset2:$2:1}"
	else
		echo "error bcm_4908_set_vlan_pvid(): invalid port $2" >&2
		return 1
	fi

	if [[ $3 -ge 1 && $3 -le 4094 ]] ; then
		setval=$3
	else
		echo "error bcm_4908_set_vlan_pvid(): invalid vlan id $3" >&2
		return 1
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval} > /dev/null
	else
		echo "ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}"
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}
	fi
}

#
# set vlan table
#
# param		[$1]	unit, 0: internal switch, 1: external switch 53134
#			[$2]	vlan id 1-4094
#			[$3]	forward map
#			[$4]	untag map
bcm_4908_set_vlan_table ()
{
	local unit=""
	local vid=""
	local fwd_map=""
	local untag_map=""

	if [ $# -lt 3 ] ; then
		echo  "error bcm_4908_set_vlan_table(): 4 params required" >&2
		return 1
	fi

	# unit
	if [[ $1 -eq 0 || $1 -eq 1 ]] ; then
		unit=$(($1+1))	# ethswctl roboswitch unit is 1, 53134 is 2, so plus 1
	else 
		echo "error bcm_4908_set_vlan_table(): unknown switch $1" >&2
		return 1
	fi

	# check vlan id
	if [[ $2 -ge 1 && $2 -le 4094 ]] ; then
		vid=$2
	else
		echo "error bcm_4908_set_vlan_table(): invalid vlan id $2" >&2
		return 1
	fi

	# check fwd map
	if [ $(($3&~0x1ff)) -eq 0 ] ; then
		fwd_map=$3
	else
		echo "error bcm_4908_set_vlan_table(): invalid fwd map $3" >&2
		return 1
	fi

	# check untag map
	if [ $(($4&~0x1ff)) -eq 0 ] ; then
		untag_map=$4
	else
		echo "error bcm_4908_set_vlan_table(): invalid untag map $4" >&2
		return 1
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c vlan -n ${unit} -v ${vid} -f ${fwd_map} -u ${untag_map} > /dev/null
	else
		echo "ethswctl -c vlan -n ${unit} -v ${vid} -f ${fwd_map} -u ${untag_map}"
		ethswctl -c vlan -n ${unit} -v ${vid} -f ${fwd_map} -u ${untag_map}
	fi
} 

#
# set phy mode, speed/duplex
#
# param		[$1]	unit, 0: internal switch, 1: external switch 53134
#			[$2]	port, 0-3
#			[$3]	speed, 0: auto negotiation, 10: 10Mbps, 100: 100Mbps, 1000: 1000Mbps
#			[$4]	duplex, 0: half duplex, 1: full duplex
#
# note: the SDK rc5 don't support set LAG port phy mode.
#		if set, some unknown things changed, so never set LAG port phy mode.
#
bcm_4908_set_lan_phy_mode ()
{
	local err_pre="error bcm_4908_set_phy_mode()"

	local getifname_prefix="The interface name for unit 1 port % is "
	local getifname_result=""
	local ifname=""
	local port=""
	local params=""
	local params1=""
	local params2=""

	if [ $# -lt 3 ] ; then
		echo  "${err_pre}: at least 3 params required" >&2
		return 1
	fi

	# check port
	if [[ $2 -ge 0 && $2 -le 7 ]] ; then
		port=$2
	else
		echo  "${err_pre}: invalid port $2" >&2
		return 1
	fi

	# speed
	if [ $3 -eq 0 ] ; then
		params1="auto"
		params2="-x 0"
	elif [[ $3 -eq 10 || $3 -eq 100 || $3 -eq 1000 ]] ; then 
		if [ $# -lt 4 ] ; then
			echo  "${err_pre}: duplex required if speed is not AN" >&2
			return 1
		fi
		if [ $4 -eq 0 ] ; then
			params1="${3}HD"
			params2="-x $3 -y 0"
		elif [ $4 -eq 1 ] ; then
			params1="${3}FD"
			params2="-x $3 -y 1"
		else
			echo "${err_pre}: invalid duplex $4" >&2
			return 1	
		fi
	else
		echo  "${err_pre}: invalid speed $3" >&2
		return 1		
	fi

	# unit
	if [ $1 -eq 0 ] ; then
		# get the ifname,
		# the output of `ethswctl getifname` like this: `The interface name for unit 1 port 1 is eth2`
		# we fetch the ifname frome the output string
		getifname_prefix=${getifname_prefix/%/${port}}
		getifname_result=$(ethswctl getifname 1 ${port})
		ifname=${getifname_result#${getifname_prefix}}
		if [ ${ifname} ] ; then
			cmd="ethctl ${ifname} media-type"
		else
			echo  "${err_pre}: ifname unknown of unit $1 port ${port}, output: ${getifname_result}" >&2
			return 1
		fi
		params=${params1}
	elif [ $1 -eq 1 ] ; then
		cmd="ethswctl -c media-type-53134"
		params="-p ${port} ${params2}"
	else 
		echo "${err_pre}: unknown switch $1" >&2
		return 1
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		${cmd} ${params} > /dev/null
	else
		echo "${cmd} ${params}"
		${cmd} ${params}
	fi
}

# valid input param
# auto, 1000F, 1000H, 100F, 100H, 10F, 10H
#
bcm_4908_set_wan_phy_mode ()
{
	local err_pre="***error bcm_4908_set_wan_phy_mode()"
	local cmd=""
	local params1=""

	if [ $# -lt 1 ] ; then
		echo  "${err_pre}: at least 1 params required" >&2
		return 1
	fi

	if [ $1 == "auto" ] ; then
		params1="auto"
	elif [[ $1 == "2500F" || $1 == "1000F" || $1 == "1000H" || $1 == "100F" || $1 == "100H" || $1 == "10F" || $1 == "10H" ]] ; then 
		params1="${1}D"
	else
		echo  "${err_pre}: invalid value $1" >&2
		return 1		
	fi

	local wan_sec=$(uci get switch.wan.switch_port)
	local wan_dev=$(uci get switch.${wan_sec}.ifname)

	# ethctl will sleep some seconds, 
	# we don't need waste time to wait it finish
	# so here, let it run at background,
	cmd="ethctl ${wan_dev} media-type ${params1} &"

	if [ ${debug_this_script} -eq 1 ] ; then
		echo "${cmd}"
	fi

	eval ${cmd}
}

#
# flush all arl entries
# we add our code to enet drivers, 53134 arl table is also flushed.
#
bcm_4908_arl_flush ()
{
	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c arlflush > /dev/null
	else
		echo "ethswctl -c arlflush"
		ethswctl -c arlflush
	fi
}

#
# set port based vlan
#
# param 	[$1]	unit, 0: internal switch, 1: external switch 53134
#			[$2]	port, 0-8
#			[$3]	port egress enable mask 
#
bcm_4908_set_pbvlan ()
{
	local err_pre="error bcm_4908_set_pbvlan()"

	local cmd=""
	local setval=""
	
	local reg=0
	local reglen="2"

	if [ $# -lt 3 ] ; then
		echo  "${err_pre}: 3 params required" >&2
		return 1
	fi

	# unit
	if [ $1 -eq 0 ] ; then
		cmd="regaccess -v"
	elif [ $1 -eq 1 ] ; then
		cmd="pmdioaccess -x"
	else 
		echo "${err_pre}: unknown switch $1" >&2
		return 1
	fi

	# check port and get reg
	if [[ $2 -ge 0 && $2 -le 8 ]] ; then
		reg="$((0x3100+2*$2))"
	else
		echo "${err_pre}: invalid port $2" >&2
		return 1
	fi

	# check forward port map
	if [[ $(($3&~0x1ff)) -eq 0 ]] ; then
		setval=$3
	else
		echo "${err_pre}: invalid forward map $3" >&2
		return 1
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval} > /dev/null
	else
		echo "ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}"
		ethswctl -c ${cmd} ${reg} -l ${reglen} -d ${setval}
	fi
}

bcm_4908_config_trunk ()
{
	local err_pre="error bcm_4908_config_trunk()"
	local cmd="ethswctl -c trunk"
	local lag1=""
	local lag2=""

	if [ $# -lt 1 ] ; then
		echo  "${err_pre}: 1 params required" >&2
		return 1
	fi

	lag1="-x $1"

	if [ $# -gt 1 ] ; then
		lag2="-y $2"
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c trunk ${lag1} ${lag2} > /dev/null
	else
		echo "ethswctl -c trunk ${lag1} ${lag2}"
		ethswctl -c trunk ${lag1} ${lag2}
	fi
}

bcm_4908_set_wan_port ()
{
	local err_pre="error bcm_4908_set_wan_port()"
	local wanif=""

	if [[ $# -lt 1 ||  -z $1 ]] ; then
		echo  "${err_pre}: wan interface required" >&2
		return 1
	fi

	wanif=$1

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c wan -o enable -i $1 > /dev/null
	else
		echo "ethswctl -c wan -o enable -i $1"
		ethswctl -c wan -o enable -i $1
	fi
}

bcm_4908_port_tm_init ()
{
	local err_pre="error bcm_4908_port_tm_init()"

	if [[ $# -lt 1 ||  -z $1 ]] ; then
		echo  "${err_pre}: at least 1 interface required" >&2
		return 1
	fi

	for if in $@ ; do
		if [ ${debug_this_script} -eq 0 ] ; then
			tmctl porttminit --devtype 0 --if ${if} --flag 1 > /dev/null
		else
			echo "tmctl porttminit --devtype 0 --if ${if} --flag 1"
			tmctl porttminit --devtype 0 --if ${if} --flag 1 
		fi
	done
}

#
# param 	$1 hash algorithm, 0: src mac + dst mac, 1: DA, 2: SA
#
bcm_4908_set_trunk ()
{
	local err_pre="error bcm_4908_set_trunk()"
	local algo=""

	if [ $# -lt 1 ] ; then
		echo  "${err_pre}: hash algo required" >&2
		return 1
	fi

	if [ $1 -eq 0 ] ; then
		algo="sada"
	elif [ $1 -eq 1 ] ; then
		algo="da"
	elif [ $1 -eq 2 ] ; then
		algo="sa"
	else
		echo  "${err_pre}: invalid hash algo $1" >&2
		return 1	
	fi

	if [ ${debug_this_script} -eq 0 ] ; then
		ethswctl -c trunk -o ${algo} > /dev/null
	else
		echo "ethswctl -c trunk -o ${algo}"
		ethswctl -c trunk -o ${algo}
	fi
}

# 
# del all vlan interface on real device
# param  	$1...$n 	real device
#
bcm_4908_del_vlan_if ()
{
	local err_pre="error bcm_4908_del_vlan_if()"
	local cmd="vlanctl --if-del-all"

	if [[ $# -lt 1 ||  -z $1 ]] ; then
		echo  "${err_pre}: at least 1 real device required" >&2
		return 1
	fi

	for if in $@ ; do
		if [ ${debug_this_script} == "1" ] ; then
			echo "${cmd} ${if}"
		fi
		${cmd} ${if}
	done
}

bcm_4908_set_vlan_mode ()
{
	local err_pre="error bcm_4908_set_vlan_mode()"
	local dev=""
	local mode=""
	local modecmd=""
	local cmd=""

	if [ $# -lt 2 ] ; then
		echo  "${err_pre}: dev and mode required" >&2
		return 1
	fi

	dev=$1
	mode=$2

	case "${mode}" in

		"ont")
			modecmd="--set-if-mode-ont"
			;;

		"rg")
			modecmd="--set-if-mode-rg"
			;;
	esac

	if [ -n "modecmd" ] ; then
		cmd="vlanctl --if ${dev} ${modecmd}"
	else
		echo  "${err_pre}: invalid mode: ${mode}" >&2
		return 1
	fi

	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd}"
	fi

	${cmd}
}

# normal vlan
# rx the packages with a vlan tag and pop the tag
# tx the packages with no vlan tag and push a tag
# 
bcm_4908_create_normal_vlan_if ()
{
	local err_pre="***error bcm_4908_create_lan_vlan_if()"

	local realIf=""
	local vlanIf=""
	local rxvid=""
	local txvid=""
	local prio="0"

	if [ $# -lt 4 ] ; then
		echo "${err_pre}: at least 4 params required" >&2
		return 1
	fi

	realIf=$1
	vlanIf=$2
	rxvid=$3
	txvid=$4

	if [ $# -ge 5 ] ; then
		prio=$5
	fi

	cmd1="vlanctl --mcast --if-create-name ${realIf} ${vlanIf}"
	cmd2="vlanctl --if ${realIf} --rx --tags 1 --filter-vid ${rxvid} 0 --pop-tag --set-rxif ${vlanIf} --rule-append"
	cmd3="vlanctl --if ${realIf} --tx --tags 0 --filter-txif ${vlanIf} --push-tag --set-vid ${txvid} 0 --set-pbits ${prio} 0 --rule-append"


	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd1}"
		echo "${cmd2}"
		echo "${cmd3}"
	fi

	ifconfig ${realIf} up

	${cmd1}
	${cmd2}
	${cmd3}
}

# internet mode vlan
# tx/rx packages with no tag
#
bcm_4908_create_int_vlan_if ()
{
	local err_pre="error bcm_4908_create_wan_internet_if()"
	local realIf=""
	local vlanIf=""

	local cmd1=""
	local cmd2=""
	local cmd3=""

	if [ $# -lt 2 ] ; then
		echo "${err_pre}: at least 3 params required" >&2
		return 1
	fi

	realIf=$1
	vlanIf=$2

	cmd1="vlanctl --mcast --if-create-name ${realIf} ${vlanIf}"
	cmd2="vlanctl --if ${realIf} --rx --tags 0 --set-rxif ${vlanIf} --rule-append"
	cmd3="vlanctl --if ${realIf} --tx --tags 0 --filter-txif ${vlanIf} --rule-append"

	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd1}"
		echo "${cmd2}"
		echo "${cmd3}"
	fi

	ifconfig ${realIf} up

	${cmd1}
	${cmd2}
	${cmd3}
}

# tx/rx 2 kinds of vlan tag package
#
bcm_4908_create_iptv_mcast_vlan_if ()
{
	local err_pre="***error bcm_4908_create_wan_iptv_if()"
	local realIf=""
	local vlanIf=""
	local vid=""
	local prio=""
	local mvid=0
	local mprio=0
	local cmd1=""
	local cmd2=""
	local cmd3=""
	local cmd4=""
	local cmd5=""

	if [ $# -lt 6 ] ; then
		echo "${err_pre}: at least 4 params required" >&2
		return 1
	fi

	realIf=$1
	vlanIf=$2
	vid=$3
	prio=$4
	mvid=$5
	mprio=$6

	cmd1="vlanctl --mcast --if-create-name ${realIf} ${vlanIf}"
	cmd2="vlanctl --if ${realIf} --rx --tags 1 --filter-vid ${mvid} 0 --pop-tag --set-rxif ${vlanIf} --rule-append"
	cmd3="vlanctl --if ${realIf} --tx --tags 0 --filter-txif ${vlanIf} --filter-multicast --push-tag --set-vid ${mvid} 0 --set-pbits ${mprio} 0 --rule-append"
	cmd4="vlanctl --if ${realIf} --rx --tags 1 --filter-vid ${vid} 0 --pop-tag --set-rxif ${vlanIf} --rule-append"
	cmd5="vlanctl --if ${realIf} --tx --tags 0 --filter-txif ${vlanIf} --push-tag --set-vid ${vid} 0 --set-pbits ${prio} 0 --rule-append"


	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd1}"
		echo "${cmd2}"
		echo "${cmd3}"
		echo "${cmd4}"
		echo "${cmd5}"
	fi

	ifconfig ${realIf} up

	${cmd1}
	${cmd2}
	${cmd3}
	${cmd4}
	${cmd5}
}

# $1 port, 0-5
# $2 traffic control
#
bcm_4908_set_53134_port_traffic ()
{
	local err_pre="***error bcm_4908_set_port_traffic()"
	local port=""
	local value=""
	local cmd=""

	if [ $# -lt 2 ] ; then
		echo "${err_pre}: at least 2 params required" >&2
		return 1
	fi

	port=$1
	value=$2

	if [ ${port} -lt 0 -o ${port} -gt 5 ] ; then
		echo "${err_pre}: invalid port ${port}" >&2
		return 1
	fi

	cmd="ethswctl -c pmdioaccess -x ${port} -l 1 -d ${value}"

	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd}"
	fi

	${cmd}
}

# $1 unit, 0 runner, 1 roboswitch, 2 external switch 53134
# $2 port
# $3 value
#
bcm_4908_set_pause ()
{
	local err_pre="***error bcm_4908_set_pause()"
	local unit=""
	local port=""
	local value=""
	local cmd=""

	if [ $# -lt 3 ] ; then
		echo "${err_pre}: at least 3 params required" >&2
		return 1
	fi

	unit=$1
	port=$2
	value=$3

	if [ "${unit}" != "0" -a "${unit}" != "1" -a "${unit}" != "2" ] ; then
		echo "${err_pre}: invalid unit ${unit}" >&2
		return 1
	fi

	if [ "${port}" -lt 0 -o "${port}" -gt 8 -a "${port}" -ne 255 ] ; then
		echo "${err_pre}: invalid port ${port}" >&2
		return 1
	fi

	if [ "${value}" -lt 0 -o "${value}" -gt 6 ] ; then
		echo "${err_pre}: invalid value ${value}" >&2
		return 1
	fi

	cmd="ethswctl -c pause -n $unit -p $port -v $value"
	
	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd}"
	fi

	${cmd}
}

# $1 0-3 lan port used as additional wan
bcm_4908_set_addl_wan ()
{
	local err_pre="***error bcm_4908_set_addl_wan()"
	local port=""

	if [ $# -lt 1 ] ; then
		echo "${err_pre}: port required" >&2
		return 1
	fi

	port=$1

	if [ "${port}" != "-1" -a "${port}" -lt 0 -o "${port}" -gt 3 ] ; then
		echo "${err_pre}: invalid port ${port}" >&2
		return 1
	fi

	cmd="ethswctl -c add_wan -p $port"
	
	if [ ${debug_this_script} == "1" ] ; then
		echo "${cmd}"
	fi

	${cmd}
}

# For ENET RXQ Ingress QoS
bcm_set_iq()
{
	# set icmp to high prio queue
	iqctl setdefaultprio --prototype 0 --protoval 1 --prio 1
}

setup_fc()
{
	config_load sysmode
	config_get mode "sysmode" "mode"

	if [ $mode != 'router' ]; then
		# disable L2 accel
		fc config --accel-mode 0
	fi
}

# network.lua call this script to set trunk hash mode
# internet.lua call this script to set wan phy mode
if [ $# -ge 1 ] ; then
	local exported_cmds="bcm_4908_set_trunk bcm_4908_set_wan_phy_mode"
	for cmd in ${exported_cmds} ; do
		if [ $cmd == $1 ] ; then
			if [ ${debug_this_script} -eq 0 ] ; then
				$@
			else
				echo "bcmenet_4908.sh $@"
				$@
			fi
		fi
	done
fi
