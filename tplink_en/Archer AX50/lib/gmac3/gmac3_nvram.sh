#!/bin/sh

#
# Note 1 for gmac3.
# (1) <Software Setting> Base on gmac3_enable, gmac3_nvram_adjust may change some nvram variables (vlan1, vlan2 etc..)
#     before et driver starting up, because et driver needs those variables to init.
# (2) <Hardware Setting> However, some boards may not be capable of GMAC3, which can only be check by et driver.
#     So, we check the capability of GMAC3 after et starting up.
# (3) By gmac3_capable_confirm, if GMAC3 is not cap, we must restore previous nvram variables
#     (changed by step 1) and unset gmac3_enable, then reboot this board.
#
#      gmac3_nvram_adjust  ---> et driver ---->  gmac3_capable_confirm -----> go (running).
#                                                          |
#                                                          --<restore>------> reboot .
#

#
# Note 2 for gmac3.
# For theory of GMAC3, to see src/include/hndfwd.h
# port 5 is linked to GMAC0, which is connected to DHD by FWDER0.
# port 7 is linked to GMAC1, which is connected to DHD by FWDER1.
# port 8 is linked to GMAC2, which connect the switch to the Linux router network.
#

#
# Note 3 for gmac3.
# (1) In et driver, if et<ID>macaddr is 00:00:00:00:00:00, then GMAC<ID> is treated as FWDER<ID>.
#     else this GMAC is a ETHERNET GMAC.
#
# (2) vlanports must be setted carefully.
#

# stolen from router/rc/rc.c
gmac3_nvram_adjust() {
	local gmac3_enable
	local gmac3_configured
	local fa_mode
	
	# gmac3_enable nvram control everything
	gmac3_enable=$(nvram get gmac3_enable)

	# nvram variables will be changed when gmac3_enable
	gmac3_configured=`gmac3_nvram_configured`

	fa_mode=$(nvram get ctf_fa_mode)
	if [ "$fa_mode" == "2" ] || [ "$fa_mode" == "1" ] ;
	then
		echo "GMAC3 based forwarding not compatible with ETFA - AuX port...\n"
		return;
	fi

	# Note: we don't check if capable of gmac3 here
	if [ "$gmac3_enable" == "1" ] ;
	then
		echo "GMAC3 on."

		if [ "$gmac3_configured" == "1" ] ;
		then
			return;
		fi
		
		# The vlan2ports will be change to "0 8u" dynamically by
		# robo_fa_imp_port_upd. Keep nvram vlan2ports unchange.
		gmac3_override_nvram

		echo "Override GMAC3 nvram..."
	else
		echo "GMAC3 off."

		if [ "$gmac3_configured" == "1" ] ;
		then
			gmac3_getback_nvram
			echo "Restore GMAC3 nvram..."
		fi
	fi

	# nvram commit
}

gmac3_capable_confirm ()
{
	local gmac3_enable
	local gmac3_configured
	
	# gmac3_enable nvram control everything
	gmac3_enable=$(nvram get gmac3_enable)

	# nvram variables will be changed when gmac3_enable
	gmac3_configured=`gmac3_nvram_configured`

	# Note: check if capable of gmac3 here
	if ! echo "$(et -i eth0 cap)" | grep -q "gmac3" ;
	then
		echo "GMAC3 not supported..."
		if [ "$gmac3_enable" == "1" ] ;
		then
			nvram unset "gmac3_enable"
		fi

		if [ "$gmac3_configured" == "1" ] ;
		then
			gmac3_getback_nvram
			echo "Restore GMAC3 nvram..."
		fi

		nvram commit
		echo "********* Do reboot for gmac3 *************"
		reboot
	fi
}

gmac3_nvram_configured ()
{
	local gmac3_configured="0"

	if [ "$(nvram get wandevs)" == "et2" ] &&
		[ "$(nvram get fwd_wlandevs)" != "" ] &&
		[ "$(nvram get fwddevs)" != "" ] ;
	then
		gmac3_configured="1"
	fi
	
	echo "$gmac3_configured"
}

gmac3_backup_nvram ()
{
	if [ "$(nvram get $1)" != "" ] ;
	then
		nvram set old_$1="$(nvram get $1)"
	fi
}

gmac3_override_nvram ()
{
	# backup old embedded nvram
	gmac3_backup_nvram "et0macaddr"
	gmac3_backup_nvram "et1macaddr"
	gmac3_backup_nvram "et2macaddr"
	gmac3_backup_nvram "et0mdcport"
	gmac3_backup_nvram "et1mdcport"
	gmac3_backup_nvram "et2mdcport"
	gmac3_backup_nvram "et0phyaddr"
	gmac3_backup_nvram "et1phyaddr"
	gmac3_backup_nvram "et2phyaddr"
	gmac3_backup_nvram "vlan1ports"
	gmac3_backup_nvram "vlan2ports"
	gmac3_backup_nvram "vlan1hwname"
	gmac3_backup_nvram "vlan2hwname"
	gmac3_backup_nvram "wandevs"

	# change mac, mdcport, phyaddr
	nvram set et2macaddr="$(nvram get et0macaddr)"
	nvram set et2mdcport="$(nvram get et0mdcport)"
	nvram set et2phyaddr="$(nvram get et0phyaddr)"
	nvram set et1mdcport="$(nvram get et0mdcport)"
	nvram set et1phyaddr="$(nvram get et0phyaddr)"
	nvram set et0macaddr="00:00:00:00:00:00"
	nvram set et1macaddr="00:00:00:00:00:00"

	# change vlan ports
	if [ "$(nvram get vlan1ports)" == "" ] ;
	then
		echo "Default vlan1ports is not specified, override GMAC3 defaults..."
		nvram set vlan1ports="1 2 3 4 5 7 8*"
	else
		nvram set vlan1ports="$(echo $(nvram get vlan1ports) | sed -r 's/[0-9](\*|u)/5 7 8\*/g')"
	fi

	if [ "$(nvram get vlan2ports)" == "" ] ;
	then
		echo "Default vlan2ports is not specified, override GMAC3 defaults..."
		nvram set vlan2ports="0 8u"
	else
		nvram set vlan2ports="$(echo $(nvram get vlan2ports) | sed -r 's/[0-9](\*|u)/8u/g')"
	fi

	# change wandevs vlan hw name
	nvram set wandevs="et2"
	nvram set vlan1hwname="et2"
	nvram set vlan2hwname="et2"
	
	# set fwd_wlandevs
	nvram set fwd_wlandevs="eth1 eth2 wl0.1 wl1.1"
	
	# set fwddevs
	nvram set fwddevs="fwd0 fwd1"
}

gmac3_restore_nvram ()
{
	if [ "$(nvram get old_$1)" != "" ] ;
	then
		nvram set "$1"="$(nvram get old_$1)"
		nvram unset "old_$1"
	else
		nvram unset "$1"
	fi
}

gmac3_getback_nvram ()
{
	gmac3_restore_nvram "et0macaddr"
	gmac3_restore_nvram "et1macaddr"
	gmac3_restore_nvram "et2macaddr"
	gmac3_restore_nvram "et0mdcport"
	gmac3_restore_nvram "et1mdcport"
	gmac3_restore_nvram "et2mdcport"
	gmac3_restore_nvram "et0phyaddr"
	gmac3_restore_nvram "et1phyaddr"
	gmac3_restore_nvram "et2phyaddr"
	gmac3_restore_nvram "vlan1ports"
	gmac3_restore_nvram "vlan2ports"
	gmac3_restore_nvram "vlan1hwname"
	gmac3_restore_nvram "vlan2hwname"
	gmac3_restore_nvram "wandevs"
	
	nvram unset "fwd_wlandevs"
	nvram unset "fwddevs"
}
