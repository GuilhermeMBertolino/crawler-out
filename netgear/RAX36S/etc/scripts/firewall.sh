#! /bin/sh

###############################################################################
### THIS SCRIPT IS A QUICK ENTRY TO MANAGE NET-WALL RULEs
###
###     Consider some times we need to add|delete|change firewall rules on
###     urgent, and it's not easy to modify net-wall source code directly,
###     so add this quick entry to manage firewall rules.
###
###     Each time when `net-wall start|restart` command executes, this script
###     will be called with parameter "start", and of course, `net-wall stop`
###     will call this script with parameter "stop".
###
### NOTE: THIS SCRIPT IS *JUST* A QUICK ENTRY, PLEASE MANAGE FIREWALL RULES
### IN NET-WALL SOURCE CODE AS FAR AS POSSIBLE. AND PLEASE MOVE SOME CHANGES
### IN THIS FILE INTO NET-WALL SOURCE CODE IN THE FUTURE TO KEEP THIS FILE
### IS CONCISE TO REDUCE AFFECTS OF NET-WALL'S PERFORMANCE.
###############################################################################

IPTB=/usr/sbin/iptables
CONFIG=${CONFIG:-/bin/config}

LIBDIR=/etc/scripts/firewall
CONFDIR=/tmp/cache/netwall/config

NETWALL_RESULT=/tmp/cache/netwall/result

RETRYING=/tmp/cache/netwall/retrying
RETRYCNT=/tmp/cache/netwall/retrycnt
RETRYCMD=/tmp/cache/netwall/retrycmd

NF_FLUSH_ALL=1
NF_FLUSH_DNAT=2
NF_FLUSH_SIP=3
NF_FLUSH_BLKSITE=4
NF_FLUSH_VPNPASS=5

get_configs()
{
	:
}

firewall_start()
{
	# start extra firewall rules
	ls ${LIBDIR}/*.rule | while read rule
	do
		$SHELL $rule start
	done
}

firewall_stop()
{
	# stop extra firewall rules
	ls ${LIBDIR}/*.rule | while read rule
	do
		$SHELL $rule stop
	done
}

firewall6_start()
{
        # start extra firewall rules
        ls ${LIBDIR}/*.rule6 | while read rule
        do
                $SHELL $rule start
        done
}

firewall6_stop()
{
        # stop extra firewall rules
        ls ${LIBDIR}/*.rule6 | while read rule
        do
                $SHELL $rule stop
        done
}

diff_changed() #$1: file-name
{
	if [ -f "$CONFDIR/$1-bak" ]; then
		diff $CONFDIR/$1 $CONFDIR/$1-bak > /dev/null
		if [ $? != 0 ]; then
			rm -rf $CONFDIR/$1-bak
			echo 1 > $CONFDIR/$1-chg
			return 1
		fi
		rm -rf $CONFDIR/$1-bak
	fi
	echo 0 > $CONFDIR/$1-chg
	return 0

}

config_change_check()
{
	local i value

	[ -d "$CONFDIR" ] || mkdir -p $CONFDIR

	#check port-triggering config change
	[ -f "$CONFDIR/triggering" ] && mv $CONFDIR/triggering $CONFDIR/triggering-bak
	echo "disable_port_trigger=$($CONFIG get disable_port_trigger)" >> $CONFDIR/triggering
	echo "porttrigger_timeout=$($CONFIG get porttrigger_timeout)" >> $CONFDIR/triggering
	i=1
	val="$($CONFIG get triggering$i)"
	while [ "$val" != "" ]
	do
		echo "triggering$i=$val" >> $CONFDIR/triggering
		let i++
		val="$($CONFIG get triggering$i)"
	done

	diff_changed triggering
	[ $? != 0 ] && return

	#check basic config change
	[ -f "$CONFDIR/basic" ] && mv $CONFDIR/basic $CONFDIR/basic-bak
	local bschg=0
	local sipchg=0
	local dmz=$($CONFIG get wan_endis_dmz)
	echo "wan_endis_dmz=$dmz" >> $CONFDIR/basic
	[ "$dmz" = "1" ] && echo "dmz_ipaddr=$($CONFIG get dmz_ipaddr)" >> $CONFDIR/basic
	echo "wan_nat_fitering=$($CONFIG get wan_nat_fitering)" >> $CONFDIR/basic

	diff_changed basic
	bschg=$?

	[ -f "$CONFDIR/basic-sip" ] && mv $CONFDIR/basic-sip $CONFDIR/basic-sip-bak
	echo "wan_endis_sipalg=$($CONFIG get wan_endis_sipalg)" >> $CONFDIR/basic-sip
	diff_changed basic-sip
	sipchg=$?

	[ -f "$CONFDIR/basic-vpn" ] && mv $CONFDIR/basic-vpn $CONFDIR/basic-vpn-bak
	echo "wan_enable_ipsec=$($CONFIG get wan_enable_ipsec)" >> $CONFDIR/basic-vpn
	echo "wan_enable_pptp=$($CONFIG get wan_enable_pptp)" >> $CONFDIR/basic-vpn
	echo "wan_enable_l2tp=$($CONFIG get wan_enable_l2tp)" >> $CONFDIR/basic-vpn
	diff_changed basic-vpn

	[ $? != 0 -o $bschg != 0 -o $sipchg != 0 ] && return


	#check port-forwarding config change
	[ -f "$CONFDIR/forwarding" ] && mv $CONFDIR/forwarding $CONFDIR/forwarding-bak
	i=1
	val="$($CONFIG get forwarding$i)"
	if [ "$val" = "" ]; then
		echo "" >> $CONFDIR/forwarding
	else
		while [ "$val" != "" ]
		do
			echo "forwarding$i=$val" >> $CONFDIR/forwarding
			let i++
			val="$($CONFIG get forwarding$i)"
		done
	fi

	diff_changed forwarding
	[ $? != 0 ] && return

	#check block-service config change
	[ -f "$CONFDIR/blocksvc" ] && mv $CONFDIR/blocksvc $CONFDIR/blocksvc-bak
	echo "enable_multipppoe_serv=$($CONFIG get enable_multipppoe_serv)" >> $CONFDIR/blocksvc
	local blockctl=$($CONFIG get blockserv_ctrl)
	echo "blockserv_ctrl=$blockctl" >> $CONFDIR/blocksvc
	if [ "$blockctl" = "1" ]; then #schedule
		echo "blk_svc_sched=$($CONFIG get blk_svc_sched)" >> $CONFDIR/blocksvc
		echo "blk_svc_sched_2=$($CONFIG get blk_svc_sched_2)" >> $CONFDIR/blocksvc
	elif [ "$blockctl" = "2" ]; then #alway
		i=1
		val="$($CONFIG get block_services$i)"
		while [ "$val" != "" ]
		do
			echo "block_services$i=$val" >> $CONFDIR/blocksvc
			let i++
			val="$($CONFIG get block_services$i)"
		done
	fi

	diff_changed blocksvc
	[ $? != 0 ] && return

	#check block-sites config change
	[ -f "$CONFDIR/blocksite" ] && mv $CONFDIR/blocksite $CONFDIR/blocksite-bak
	echo "enable_multipppoe=$($CONFIG get enable_multipppoe)" >> $CONFDIR/blocksite
	local blockkey=$($CONFIG get block_skeyword)
	echo "block_skeyword=$blockkey" >> $CONFDIR/blocksite
	if [ "$blockkey" = "1" ]; then #schedule
		echo "blk_site_sched=$($CONFIG get blk_site_sched)" >> $CONFDIR/blocksite
		echo "blk_site_sched_2=$($CONFIG get blk_site_sched_2)" >> $CONFDIR/blocksite
	elif [ "$blockkey" = "2" ]; then #alway
		echo "block_KeyWord_DomainList=$($CONFIG get block_KeyWord_DomainList)" >> $CONFDIR/blocksite
		local trustip=$($CONFIG get block_endis_Trusted_IP)
		echo "block_endis_Trusted_IP=$trustip" >> $CONFDIR/blocksite
		[ "$trustip" = "1" ] && echo "block_trustedip=$($CONFIG get block_trustedip)" >> $CONFDIR/blocksite
	fi

	diff_changed blocksite
	[ $? != 0 ] && return

}

firewall_prepare()
{
	config_change_check
	[ "$(cat $CONFDIR/triggering-chg)" = "1" ] && echo 1 > /proc/trigger_del_flag
}

firewall_flush_state()
{
	[ "$(cat $CONFDIR/basic-chg)" = "1" ] && echo $NF_FLUSH_DNAT > /proc/sys/dni_netfilter/flush_conntrack_table
	[ "$(cat $CONFDIR/basic-sip-chg)" = "1" ] && echo $NF_FLUSH_SIP > /proc/sys/dni_netfilter/flush_conntrack_table
	[ "$(cat $CONFDIR/basic-vpn-chg)" = "1" ] && echo $NF_FLUSH_VPNPASS > /proc/sys/dni_netfilter/flush_conntrack_table
	[ "$(cat $CONFDIR/forwarding-chg)" = "1" ] && echo $NF_FLUSH_DNAT > /proc/sys/dni_netfilter/flush_conntrack_table
	[ "$($CONFIG get block_skeyword)" != "0" -a "$(cat $CONFDIR/blocksite-chg)" = "1" ] && echo $NF_FLUSH_BLKSITE > /proc/sys/dni_netfilter/flush_conntrack_table
	[ "$($CONFIG get blockserv_ctrl)" != "0" -a "$(cat $CONFDIR/blocksvc-chg)" = "1" ] && fc flush
}

firewall_status_check()
{
	local result=$(cat $NETWALL_RESULT)

        if [ "$result" = "fail" ]; then
                echo "$1" > $RETRYCMD
                [ ! -f "$RETRYING" ] && /etc/scripts/firewall-retry.sh &
		return 1
        else
                [ -f "$RETRYCMD" ] && rm -rf $RETRYCMD
                [ -f "$RETRYCNT" ] && rm -rf $RETRYCNT
		return 0
        fi
}

firewall_v6_status_check()
{
        local result=$(cat ${NETWALL_RESULT}-v6)

        if [ "$result" = "fail" ]; then
                echo "$1" > ${RETRYCMD}-v6
                [ ! -f "${RETRYING}-v6" ] && /etc/scripts/firewall-retry.sh "v6" &
		return 1
        else
                [ -f "${RETRYCMD}-v6" ] && rm -rf ${RETRYCMD}-v6
                [ -f "${RETRYCNT}-v6" ] && rm -rf ${RETRYCNT}-v6
		return 0
        fi
}

get_configs
case $1 in
	"start"|"START")
		if firewall_status_check "start" ; then #success
			firewall_start
			firewall_flush_state
		fi
		;;
	"stop"|"STOP")
		if firewall_status_check "stop" ; then
			firewall_stop
		fi
		;;
	"prepare")
		firewall_prepare
		;;
	"v6-start"|"V6-START")
		if firewall_v6_status_check "start" ; then
			firewall6_start
		fi
		;;
        "v6-stop"|"V6-STOP")
		if firewall_v6_status_check "stop" ; then
			firewall6_stop
		fi
		;;
	"check")
                firewall_status_check $2
                ;;
        "v6-check")
                firewall_v6_status_check $2
                ;;
	*)
		printf "Usage: ${0##*/} start|stop\n";;
esac

