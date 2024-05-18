# Copyright (C) 2014-2015 TP-link
. /lib/config/uci.sh

crontab_cmd="* * * * * /sbin/gec_check"

GEC_DEBUG_TEST=1

gec_debug()
{
	[ ${GEC_DEBUG_TEST} -gt 0 ] && {
		echo "[ guest network effective time ctrl core_gbc.sh ] $1"	> /dev/console
	}
}

gec_load() {
	gec_debug "gec_load "
	local finish_time=$(uci get guestnetwork_effectivetime_ctrl.settings.finish_time)
	
	local now=`date '+%s'`

	echo "finish_time:${finish_time}"
	echo "now:${now}"
	
	if [ "${now}" -lt "${finish_time}" ]; then
		local CRON_FILE="/etc/crontabs/root"
		local TMP_CRONTAB="/tmp/gec_cron"
		local GEC_SBIN="/sbin/gec_check"
		local cron_item=`grep "${GEC_SBIN}" ${CRON_FILE}`
		[ "${cron_item}" != "${crontab_cmd}" ] && {
						echo "${crontab_cmd}" > ${TMP_CRONTAB}
						crontab -l | grep -v "${GEC_SBIN}" | cat - "${TMP_CRONTAB}" | crontab -
						rm -f ${TMP_CRONTAB}
		}	
	fi
}

gec_check_time() {
	local finish_time=$(uci get guestnetwork_effectivetime_ctrl.settings.finish_time)
	local now=`date '+%s'`
	local new_remain_time=`expr $finish_time - $now`

	if [ "${new_remain_time}" -gt 0 ]; then
		uci set guestnetwork_effectivetime_ctrl.settings.remain_time="${new_remain_time}"
	fi
	
	if [ "${finish_time}" -ge 0 -a "${now}" -ge "${finish_time}" ]; then
		gec_debug "will turn off guest network"
		# set config
		uci set guestnetwork_effectivetime_ctrl.settings.finish_time="-1"
		uci set guestnetwork_effectivetime_ctrl.settings.remain_time="-1"
		uci set guestnetwork_effectivetime_ctrl.settings.type="none"
		
		# get guest network ifname
		local guest_ifname_2g=$(uci get profile.@wireless[0].wireless_guest_ifname_2g -c "/etc/profile.d" -q)
		local guest_ifname_5g=$(uci get profile.@wireless[0].wireless_guest_ifname_5g -c "/etc/profile.d" -q)
		local guest_ifname_5g_2=$(uci get profile.@wireless[0].wireless_guest_ifname_5g_2 -c "/etc/profile.d" -q)
		local guest_ifname_6g=$(uci get profile.@wireless[0].wireless_guest_ifname_6g -c "/etc/profile.d" -q)

		if [ -n "${guest_ifname_2g}" ];then
			local tmp=$(uci show | grep ${guest_ifname_2g})
			local gst_2g_section=$(echo ${tmp}|awk -F '.' '{print $2}')
			# set guest config
			uci set wireless.${gst_2g_section}.enable="off"
			# turn down guest
			wl -i "$guest_ifname_2g" bss down
		fi
		
		if [ -n "${guest_ifname_5g}" ];then
			local tmp=$(uci show | grep ${guest_ifname_5g})
			local gst_5g_section=$(echo ${tmp}|awk -F '.' '{print $2}')
			# set guest config
			uci set wireless.${gst_5g_section}.enable="off"
			# turn down guest
			wl -i "$guest_ifname_5g" bss down
		fi
		
		if [ -n "${guest_ifname_5g_2}" ];then
			local tmp=$(uci show | grep ${guest_ifname_5g_2})
			local gst_5g2_section=$(echo ${tmp}|awk -F '.' '{print $2}')
			# set guest config
			uci set wireless.${gst_5g2_section}.enable="off"
			# turn down guest
			wl -i "$guest_ifname_5g_2" bss down
		fi
		
		if [ -n "${guest_ifname_6g}" ];then
			local tmp=$(uci show | grep ${guest_ifname_6g})
			local gst_6g_section=$(echo ${tmp}|awk -F '.' '{print $2}')
			# set guest config
			uci set wireless.${gst_6g_section}.enable="off"
			# turn down guest
			wl -i "$guest_ifname_6g" bss down
		fi
		
		# delete the gbc_check
		crontab -l | grep -v "$crontab_cmd" | crontab -
		
	fi

	uci commit
}

gec_exit() {
	gec_debug "gec_exit "
	crontab -l | grep -v "$crontab_cmd" | crontab -
}