# Copyright (C) 2011-2014 TP-LINK

. /lib/network/network_init.sh
. /lib/iptv/iptv_arch.sh
. /lib/config/uci.sh

IptvConfigInitFlag=0

# if following vlan vid conflict with WAN vlan id when IPTV bridge port set
# increase a step and check again until no conflict found
conflictStep=1

# internal vlan id
# txvids if for some special mcu
vid_start=1
vids=""
txvids=""

########## iptv info which could be used directly when include this file
internet_ifs=""
iptv_ifs=""
ipphone_ifs=""
passpthrou_ifs=""
mciptv_ifs=""

# used as port isolate
# real ports to allowed
internetPortMask=0
internetPort=""
iptvPortMask=0
iptvPort=""
ipphonePortMask=0
ipphonePort=""
bridgePortMask=0
bridgePort=""

# config
iptv_enable=""
iptv_mode=""
iptv_igmp_snooping_enable=""
iptv_ports=""
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
iptv_porttype=""

get_used_portseq()
{
	local type_name=$1

	if [ "$type_name" = "internet" ]; then
		echo "$internetPort"
	elif [ "$type_name" = "iptv" ]; then
		echo "$iptvPort"
	elif [ "$type_name" = "ipphone" ]; then
		echo "$ipphonePort"
	elif [ "$type_name" = "bridge" ]; then
		echo "$bridgePort"
	else
		echo ""
	fi
}

get_vid_by_portindex()
{
	local index=$1
	local findvid=0

	if [ -n "$vids" ]; then
		findvid=$(eval "echo \"${vids}\" | awk '{print \$${index}}'")
	fi

	echo "$findvid"
}

get_vid_by_port()
{
	local port=$1
	local index=1
	local findvid=0
	local lanports=$(get_lan_portseq)
	
	#add by wanghao
	[ -n "$vids" ] || vids=$(uci_get_state iptv core vids)
	#add end

	if [ -n "$vids" -a "$lanports" ]; then
		for i in $lanports; do
			if [ $port -eq $i ]; then
				findvid=$(eval "echo \"${vids}\" | awk '{print \$${index}}'")
			fi
			index=$((index+1))
		done
	fi

	echo "$findvid"
}

get_txvid_by_portindex()
{
	local index=$1
	local findvid=0

	if [ -n "$txvids" ]; then
		findvid=$(eval "echo \"${txvids}\" | awk '{print \$${index}}'")
	fi

	echo "$findvid"
}

get_txvid_by_port()
{
	local port=$1
	local index=1
	local findvid=0
	local lanports=$(get_lan_portseq)

	if [ -n "$txvids" -a "$lanports" ]; then
		for i in $lanports; do
			if [ $port -eq $i ]; then
				findvid=$(eval "echo \"${txvids}\" | awk '{print \$${index}}'")
			fi
			index=$((index+1))
		done
	fi

	echo $findvid
}

get_iptv_portmask()
{
	local type=$1
	local mask=0

	if [ "$type" = "internet" ]; then
		mask=$internetPortMask
	elif [ "$type" = "iptv" ]; then
		mask=$iptvPortMask
	elif [ "$type" = "ipphone" ]; then
		mask=$ipphonePortMask
	elif [ "$type" = "bridge" ]; then
		mask=$bridgePortMask
	else
		mask=$((internetPortMask|iptvPortMask|ipphonePortMask|bridgePortMask))
	fi

	echo $mask
}

get_iptv_iface()
{
	local type=$1
	local ifaces=""

	if [ "$type" = "internet" ]; then
		ifaces="$internet_ifs"
	elif [ "$type" = "iptv" ]; then
		ifaces="$iptv_ifs"
	elif [ "$type" = "ipphone" ]; then
		ifaces="$ipphone_ifs"
	elif [ "$type" = "bridge" ]; then
		ifaces="$passpthrou_ifs"
	fi

	echo "$ifaces"
}


#
# Get iptv config
#
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
		else
			iptv_vid="0"
			iptv_vprio="0"
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
	fi

	iptv_porttype=$(uci get iptv.$iptv_mode.porttype 2>/dev/null)
	
	# set default value to be compatable with the old
	#if [ -n "$iptv_ports" -o -n "$iptv_porttype" ]; then
	if [ -z "$iptv_ports" ]; then
		iptv_ports=""
		iptv_porttype=""
		local portindex=1
		local porttype
		local portnum=$(get_lan_portnum)

		if [ -n "$portnum" -a $portnum -ne 0 ]; then
			for phyport in 1, $portnum ; do
				porttype=$(uci get iptv.iptv.lan${portIndex} 2>/dev/null)
				if [ -n "$porttype" ]; then
					append iptv_ports ${portindex}
					append iptv_porttype ${porttype}
				fi
				portindex=$((portindex+1))
			done
		fi
	fi
}

get_lan_initvid()
{
	local lanifs="$(get_lan_initifs)"
	local initvids=""
	local tmpvid

	for i in "$(get_lan_initifs)" ; do
		tmpvid=${i##*.}
		if [ -n "$tmpvid" ]; then
			list_contains initvids "$tmpvid" || append initvids "$tmpvid"
		fi
	done

	echo "$initvids"
}

gen_lan_vid_autosingle ()
{
	local lanvid=0
	local tries=0
	local maxtries=10
	local conflictfound=1
	local portindex=1
	local wanvids="${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"
	local portseq=$(get_lan_portseq)

	vids=""
	if [ -n "$portseq" ]; then
		while [ ${tries} -lt ${maxtries} -a ${conflictfound} -eq 1 ] ; do
			conflictfound=0
			portindex=1
			for i in $portseq ; do
				lanvid=$((vid_start+portindex+tries*conflictStep))

				for wanvid in ${wanvids} ; do
					# check vid
					if [ $disable_conflict -eq 1 -a $lanvid -eq $wanvid ] ; then
						conflictfound=1
						break
					fi
				done

				if [ $conflictfound -eq 1 ] ; then
					tries=$((tries+1))
					vids=""
					break
				fi

				append vids "$lanvid"
				portindex=$((portindex+1))
			done
		done
	fi
}

gen_lan_vid_autodual ()
{
	local lanvid=0
	local lantxvid=0
	local tries=0
	local maxtries=10
	local conflictfound=1
	local portindex=1
	local wanvids="${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"
	local portseq=$(get_lan_portseq)

	vids=""
	txvids=""
	if [ -n "$portseq" ]; then
		while [ $tries -lt $maxtries -a $conflictfound -eq 1 ] ; do
			conflictfound=0
			portindex=1
			for i in $portseq ; do
				lanvid=$((vid_start+portindex+tries*conflictStep))
				lantxvid=$((lanvid+1000))

				for wanvid in ${wanvids} ; do
					# check vid
					if [ $disable_conflict -eq 1 -a $lanvid -eq $wanvid ] ; then
						conflictfound=1
						break
					fi

					# check tx vid
					if [ $disable_conflict -eq 1 -a $lantxvid -eq $wanvid ]; then
						conflictfound=1
						break
					fi
				done

				if [ $conflictfound -eq 1 ] ; then
					tries=$((tries+1))
					vids=""
					txvids=""
					break
				fi

				append vids "$lanvid"
				append txvids "$lantxvid"
				portindex=$((portindex+1))
			done
		done
	fi
}

gen_lan_vid_specautosingle ()
{
	local lanvid=0
	local lantxvid=0
	local tries=0
	local maxtries=10
	local conflictfound=1
	local portindex=1
	local wanvids="${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"
	local portseq=$(get_lan_portseq)

	vids=""
	if [ -n "$portseq" ]; then
		while [ ${tries} -lt ${maxtries} -a ${conflictfound} -eq 1 ] ; do
			conflictfound=0
			portindex=1
			for i in $portseq ; do
				if [ -n "$specific_lan_vid" -a $tries -eq 0 ]; then
					lanvid=$(eval "echo \"${specific_lan_vid}\" | awk '{print \$${portindex}}'")
				else
					lanvid=$((vid_start+portindex+tries*conflictStep))
				fi

				for wanvid in ${wanvids} ; do
					# check vid
					if [ $disable_conflict -eq 1 -a $lanvid -eq $wanvid ] ; then
						conflictfound=1
						break
					fi
				done

				if [ $conflictfound -eq 1 ] ; then
					tries=$((tries+1))
					vids=""
					break
				fi

				append vids "$lanvid"
				portindex=$((portindex+1))
			done
		done
	fi
}

gen_lan_vid_specautodual ()
{
	local lanvid=0
	local lantxvid=0
	local tries=0
	local maxtries=10
	local conflictfound=1
	local portindex=1
	local wanvids="${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"
	local portseq=$(get_lan_portseq)

	vids=""
	txvids=""
	if [ -n "$portseq" ]; then
		while [ ${tries} -lt ${maxtries} -a ${conflictfound} -eq 1 ] ; do
			conflictfound=0
			portindex=1
			for i in $portseq ; do
				if [ -n "${specific_lan_vid}" -a -n "${specific_lan_txvid}" -a $tries -eq 0 ]; then
					lanvid=$(eval "echo \"${specific_lan_vid}\" | awk '{print \$${portindex}}'")
					lantxvid=$(eval "echo \"${specific_lan_txvid}\" | awk '{print \$${portindex}}'")
				else
					lanvid=$((vid_start+portindex+tries*conflictStep))
					lantxvid=$((lanvid+1000))
				fi

				for wanvid in ${wanvids} ; do
					# check vid
					if [ $disable_conflict -eq 1 -a $lanvid -eq $wanvid ] ; then
						conflictfound=1
						break
					fi

					# check tx vid
					if [ $disable_conflict -eq 1 -a $lantxvid -eq $wanvid ]; then
						conflictfound=1
						break
					fi
				done

				if [ $conflictfound -eq 1 ] ; then
					tries=$((tries+1))
					vids=""
					txvids=""
					break
				fi

				append vids "$lanvid"
				append txvids "$lantxvid"
				portindex=$((portindex+1))
			done
		done
	fi
}

get_lan_vid()
{
	if [ "$gen_vid_mode" = "1" ]; then
		gen_lan_vid_autosingle
	elif [ "$gen_vid_mode" = "2" ]; then
		gen_lan_vid_autodual
	elif [ "$gen_vid_mode" = "3" ]; then
		gen_lan_vid_specautosingle
	elif [ "$gen_vid_mode" = "4" ]; then
		gen_lan_vid_specautodual
	fi
}

#
# Get iptv lan interface and exclude aggregation interface
#
get_iptv_lan_interface()
{
	local index=1
	local porttype=""
	local tmpif=""
	local initif=""
	local tmpbit=0
	local tmpvid=0
	local vid=0
	local lanportseq=$(get_lan_portseq)
	local wanaggmask
	local lanaggmask
	local lanaggifs=""
	local lanagg_porttype=""
	local lanagg_portseq=""
	local used_vids
	internet_ifs=""
	iptv_ifs=""
	ipphone_ifs=""
	passpthrou_ifs=""
	mciptv_ifs=""

	internetPortMask=0
	internetPort=""
	iptvPortMask=0
	iptvPort=""
	ipphonePortMask=0
	ipphonePort=""
	bridgePortMask=0
	bridgePort=""

	if [ "${iptv_enable}" = "on" -a -n "$lanportseq" ] ; then
		lanaggmask=$(get_lan_aggmask)
		wanaggmask=$(get_wan_aggmask)

		for i in $lanportseq ; do
			tmpbit=$((1<<$i))

			# this LAN has been configed as additional wan, skip it
			if [ $((${wanaggmask}&tmpbit)) -ne 0 ] ; then
				continue
			fi

			#get the iptv port type
			porttype=""
			if [ -n "${iptv_ports}" -a -n "${iptv_porttype}" ]; then
				index=1
				for port in ${iptv_ports} ; do
					if [ $port -eq $i ]; then
						porttype=$(eval "echo \"${iptv_porttype}\" | awk '{print \$${index}}'")
						break
					fi
					index=$((index+1))
				done
			fi

			#get vid
			tmpvid="$(get_vid_by_port $i)"

			# record the lan agg port type/interface/portseq
			if [ $((${lanaggmask}&tmpbit)) -ne 0 ]; then
				append lanagg_porttype $porttype
				append lanagg_portseq $i
				lanaggifs=$(get_lan_aggifs)
				if [ -n "$tmpvid" -a -n "$lanaggifs" -a $tmpvid -ne 0 ]; then
					lanaggifs="${lanaggifs}.${tmpvid}"
				fi
				continue
			fi

			#get the device
			initif="$(get_landev_by_port $i)"
			initif=${initif%%.*}
			if [ -n "$tmpvid" -a -n "$initif" -a $tmpvid -ne 0 ]; then
				tmpif="${initif}.${tmpvid}"
			else
				tmpif="${initif}"
			fi

			if [ "${porttype}" == "IPTV" ] ; then
				iptvPortMask=$((iptvPortMask|tmpbit))
				append iptvPort "$i"
				append iptv_ifs "$tmpif"
			elif [ "${porttype}" == "IP-Phone" ] ; then
				ipphonePortMask=$((ipphonePortMask|tmpbit))
				append ipphonePort "$i"
				append ipphone_ifs "$tmpif"
			elif [ "${porttype}" == "Bridge" ] ; then
				bridgePortMask=$((bridgePortMask|tmpbit))
				append bridgePort "$i"
				append passpthrou_ifs "$tmpif"
			elif [ "${porttype}" == "Internet" ] ; then
				internetPortMask=$((internetPortMask|tmpbit))
				append internetPort "$i"
				append internet_ifs "$tmpif"
			else
				#not iptv ports
				internetPortMask=$((internetPortMask|tmpbit))
				append internetPort "$i"

				vid=${initif##*.}
				if [ -n "$vid" ]; then
					# get the init interface as ethx.y
					append internet_ifs "$tmpif"
				else
					# get the init interface as ethx
					append internet_ifs "$initif"
				fi
			fi
		done

		##set mciptv_ifs 
		[ "${mciptv_enable}" = "on" -a  "$mciptv_vid" -ne 0 ] && {
			used_vids=${vids}
			append used_vids "${internet_vid} ${iptv_vid} ${mciptv_vid} ${ipphone_vid}"
			vid=$(select_vid "$used_vid")
			initif="$(get_landev_by_port $i)"
			initif=${initif%%.*}
			append mciptv_ifs "${initif}.${vid}"
		}

		# add LAG interface to internet ifs
		local typenum=$(eval "echo \"${lanagg_porttype}\" | awk '{print NF}'")
		if [ ${typenum} -eq 1 ]; then
			if [ "${porttype}" == "IPTV" ] ; then
				iptvPortMask=$((iptvPortMask|lanaggmask))
				append iptvPort "$lanagg_portseq"
				append iptv_ifs "$lanaggifs"
			elif [ "${porttype}" == "IP-Phone" ] ; then
				ipphonePortMask=$((ipphonePortMask|lanaggmask))
				append ipphonePort "$lanagg_portseq"
				append ipphone_ifs "$lanaggifs"
			elif [ "${porttype}" == "Bridge" ] ; then
				bridgePortMask=$((bridgePortMask|lanaggmask))
				append bridgePort "$lanagg_portseq"
				append passpthrou_ifs "$lanaggifs"
			else
				internetPortMask=$((internetPortMask|lanaggmask))
				append internetPort "$lanagg_portseq"
				append internet_ifs "$lanaggifs"
			fi
		fi
	else
		if [ "${iptv_igmp_snooping_enable}" == "on" ]; then
			for i in $lanportseq ; do
				#get vid
				tmpvid="$(get_vid_by_port $i)"
				
				#get the device
				initif="$(get_landev_by_port $i)"
				initif=${initif%%.*}
				if [ -n "$tmpvid" -a -n "$initif" -a $tmpvid -ne 0 ]; then
					tmpif="${initif}.${tmpvid}"
				else
					tmpif="${initif}"
				fi
				
				#for IGMP snooping, all ports are internet type.
				append internetPort "$i"
				append internet_ifs "$tmpif"
			done
		else
			internet_ifs=$(get_lan_initifs)
		fi
	fi
}

# the one and only API to get port types, including Dual WAN/Dual LAN/IPTV 
# logical to physical port map is supported at here.
#
# ports in config layer such as webpages, LUA are all logical ports
# ports in action layer are all physical ports
#
iptv_interface_init ()
{
	if [ $IptvConfigInitFlag -ne 0 ] ; then
		return
	fi

	# get the network interface
	get_network_interface

	# wan iptv config
	get_iptv_cfg

	# generate lan vid
	get_lan_vid

	# get iptv lan
	get_iptv_lan_interface

	echo "LAN      ifs: \"${lan_ifs}\""
	echo "Internet ifs: \"${internet_ifs}\""
	echo "IPTV     ifs: \"${iptv_ifs}\""
	echo "IP-Phone ifs: \"${ipphone_ifs}\""
	echo "Bridge   ifs: \"${passpthrou_ifs}\""
	echo "MCIPTV   ifs: \"${mciptv_ifs}\""

	IptvConfigInitFlag=1
}
