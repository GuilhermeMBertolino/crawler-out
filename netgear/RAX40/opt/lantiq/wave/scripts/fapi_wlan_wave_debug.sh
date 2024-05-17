#!/bin/sh

script_name="$0"

if [ -e /etc/wave/scripts/fapi_wlan_wave_lib_common.sh ]; then 
	## else RDK
	[ ! "$LIB_COMMON_SOURCED" ] && . /etc/wave/scripts/fapi_wlan_wave_lib_common.sh
else
	# we always should have the debug tools so explicity set path to common.
	[ ! "$LIB_COMMON_SOURCED" ] && . /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh
fi


command=$1
pc_ip=$2
param1=$3


interface_down()
{
	local wave_count

	rm -f ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}

	. ${CONF_DIR}/fapi_wlan_wave_discover.txt
	wave_count=$((PCI_LTQ_COUNT+AHB_WLAN_COUNT))

	if [ "$wave_count" = "2" ]
	then
		(. $ETC_PATH/fapi_wlan_wave_down wlan2)
		touch ${CONF_IN_PROGRESS}_wlan2}
	fi

	(. $ETC_PATH/fapi_wlan_wave_down wlan0)
	touch ${CONF_IN_PROGRESS}_wlan0}
}

restart_wave()
{
	(. $ETC_PATH/fapi_wlan_wave_complete_recovery wlan0)
}

burn_cal_file()
{
	local no_restart tftp_path interfaces_list interface_name burn_both cal_status

	no_restart=$1
	[ -z "$pc_ip" ] && echo "The PC IP parameter is missing." && exit

	tftp_path=${param1%\/*}
	interfaces_list=${param1##*\/}
	if [ "$tftp_path" = "$interfaces_list" ]
	then
		tftp_path=""
	else
		tftp_path="$tftp_path/"
	fi

	cd /tmp/
	cal_status=0
	interface_name=${interfaces_list%%,*}
	while [ -n "$interface_name" ]
	do
		if [ "$interface_name" = "all" ]
		then
			tftp -gr "${tftp_path}cal_wlan0.bin" -l cal_wlan0.bin $pc_ip
			cal_status=$(( $cal_status + `echo $?` ))
			tftp -gr "${tftp_path}cal_wlan2.bin" -l cal_wlan2.bin $pc_ip
			cal_status=$(( $cal_status + `echo $?` ))
			tftp -gr "${tftp_path}cal_wlan4.bin" -l cal_wlan4.bin $pc_ip
			cal_status=$(( $cal_status + `echo $?` ))
		else
			tftp -gr "${tftp_path}cal_${interface_name}.bin" -l cal_${interface_name}.bin $pc_ip
			cal_status=$(( $cal_status + `echo $?` ))
		fi
		interfaces_list=${interfaces_list#$interface_name}
		interfaces_list=${interfaces_list#,}
		interface_name=${interfaces_list%%,*}
	done

	tar czf eeprom.tar.gz cal_*.bin
	if [ -d /nvram ]
	then
		cp /tmp/eeprom.tar.gz /nvram/
	else
		upgrade /tmp/eeprom.tar.gz wlanconfig 0 0
	fi
	cal_status=$(( $cal_status + `echo $?` ))

	if [ "$cal_status" -eq 0 ]
	then
		rm -f /opt/lantiq/wave/confs/*
		if [ -z "$no_restart" ]
		then
			sync
			reboot
		fi
	else
		echo "***********************************"
		echo "ERROR - calibration file not burned!"
		echo "***********************************"
	fi

	cd - > /dev/null
}

replace_driver()
{
	[ -z "$pc_ip" ] && echo "Parameter missing: execute $script_name driver <your PC IP>" && exit
	echo "Make sure your tftp is set to the folder with the mtlk.ko and mtlkroot.ko files"
	cd $DRIVER_PATH
	tftp -gr mtlk.ko $pc_ip
	sleep 5
	tftp -gr mtlkroot.ko $pc_ip
	sleep 1
	sync
	#restart_wave
	reboot
}

replace_fw()
{
	[ -z "$pc_ip" ] && echo "Parameter missing: execute $script_name fw <your PC IP>" && exit
	echo "Make sure your tftp is set to the folder with the FW binary file"

	cd $IMAGES_PATH
	[ -e ap_upper_ar10.bin ] && tftp -gr ap_upper_ar10.bin $pc_ip
	[ -e ap_upper_gen4.bin ] && tftp -gr ap_upper_gen4.bin $pc_ip

	# If platform is Gen5, get the gen5 FW binaries
	if [ "$CONFIG_IFX_CONFIG_CPU" = "GRX500" ]
	then
		tftp -gr ap_upper_gen5.bin $pc_ip
		tftp -gr ap_lower_gen5.bin $pc_ip
	fi
	#restart_wave
	reboot
	cd - > /dev/null
}

tftp_bins()
{
	cd /tmp
	serverip=`uboot_env --get --name serverip`

	rm -f /tmp/ls.txt /tmp/ls.unix

	tftp -gr ls.txt $serverip

	if [ $? -eq 0 ]
	then
		# dos2unix by using awk
		awk '{ sub("\r$", ""); print }' ls.txt > ls.unix

		rcd_list=`ls $ETC_PATH`
		MINI_FO_MOUNTED="NO"

		for file in `cat ls.unix`
		do
			echo "echo \" +++ Downloading $file +++\"" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
			echo "rm -f $file" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
			echo "tftp -gr $file $serverip" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
			echo "chmod +x $file" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
			if [ `echo $rcd_list | grep $file` ]
			then
				if [ "$MINI_FO_MOUNTED" = "NO" ]
				then
					echo "mini_fo.sh mount $ETC_PATH" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
					MINI_FO_MOUNTED=YES
				fi
				echo "mv $file ${ETC_PATH}/${file}" >> ${CONF_DIR}/${FAPI_WLAN_WAVE_RUNNNER}
			fi
		done
	else
			echo -e "*******************************************************"
			for i in 3 5 9
			do
				echo -e "\033[3${i}m ***Download of ls.txt FAILED, Loading image from flash***"
				usleep 50000
			done
			echo -e "*******************************************************"
	fi
	cd - > /dev/null
}

internal_radio()
{
	internal_state=$pc_ip
	# Create notification to modify WaveDisableAHB state accoring to user's input
	if [ "$internal_state" = "0" ] || [ "$internal_state" = "1" ]
	then
		value_set=$((internal_state^1))
		clish -c "configure wlan" -c "set radio wlan0 WaveDisableAHB $value_set"
		echo "Removing ${CONF_DIR} and rebooting...."
		rm -rf ${CONF_DIR}
		reboot
	else
		echo "Illegal value set in WaveDisableAHB ($internal_state)" > /dev/console
	fi
}

wave600_defaults()
{
	# Define local parameters
	local interface_name

	interface_name="$pc_ip"

	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveFastpathEnabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveFastRecoveryEnabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveFullRecoveryEnabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveCompleteRecoveryEnabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveBfMode:Disabled"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveExplicitBeamforming:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveImplicitBeamforming:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} HtLDPCenabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} HtSTBCenabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} VhtLDPCenabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} VhtSTBCtxEnabled:false"
	build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} VhtSTBCrxEnabled:false"

	echo -e "WaveFastpathEnabled->false\nWaveFastRecoveryEnabled->false\nWaveFullRecoveryEnabled->false\nWaveCompleteRecoveryEnabled->false\nWaveBfMode->Disabled\nWaveExplicitBeamforming->false\nWaveImplicitBeamforming->false\nHtLDPCenabled->false\nHtSTBCenabled->false\nVhtLDPCenabled->false\nVhtSTBCtxEnabled->false\nVhtSTBCrxEnabled->false" > /dev/console
	echo -e "###############################################################################" > /dev/console
	echo -e "#########                  Reboot is needed                          ##########" > /dev/console
	echo -e "###############################################################################" > /dev/console
}

bcl_mode_enable()
{
	# Define local parameters
	local user_select

	echo -e "#####################" > /dev/console
	echo -e "## 1. BCL ON       ##" > /dev/console
	echo -e "## 2. BCL OFF      ##" > /dev/console
	echo -e "#####################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	[ "$user_select" = "1" ] && sed -i 's/bcl_mode=""/bcl_mode="bcl=1"/g' /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
	[ "$user_select" = "2" ] && rm -f /overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
	rm -rf ${CONF_DIR}
	sync
	echo -e "###############################################################################" > /dev/console
	echo -e "######### change configuation of BCL Rebooting wait...             ############" > /dev/console
	echo -e "###############################################################################" > /dev/console
	sleep 5
	reboot
}

dual_pci_enable()
{
	local user_select trace stringToReplace dual_pci_db_val do_reboot
	
	do_reboot="YES"
	
	echo -e "####### dual_pci set mode ############" > /dev/console
	echo -e "## 0. dual_pci Disabled             ##" > /dev/console
	echo -e "## 1. dual_pci card0 enabled        ##" > /dev/console
	echo -e "## 2. dual_pci card1 enabled(dflt)  ##" > /dev/console
	echo -e "## 3. dual_pci both cards enabled   ##" > /dev/console
	echo -e "## 4. dual_pci factory (DB value)   ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	dual_pci_db_val=`cat /opt/lantiq/wave/confs/fapi_wlan_wave_hw_init_runner | grep dual_pci`
	dual_pci_db_val=${dual_pci_db_val##*dual_pci=}
	dual_pci_db_val=${dual_pci_db_val//,/}
	
	stringToReplace=`sed -n '/dual_pci_enable=\"/{p;q}' /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init`

	case $user_select in
	"0")
		if [ "$dual_pci_db_val" != "00" ]; then
			sed -i "s/$stringToReplace/dual_pci_enable=\"00\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
			trace="Change configuation to dual_pci disabled"
		else
			do_reboot="NO"
		fi
	;;
	"1")
		if [ "$dual_pci_db_val" != "10" ]; then
			sed -i "s/$stringToReplace/dual_pci_enable=\"10\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
			trace="Change configuation to dual_pci card0 enabled"
		else
			do_reboot="NO"
		fi
	;;
	"2")
		if [ "$dual_pci_db_val" != "01" ]; then
			sed -i "s/$stringToReplace/dual_pci_enable=\"01\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
			trace="Change configuation to dual_pci card1 enabled"
		else
			do_reboot="NO"
		fi
	;;
	"3")
		if [ "$dual_pci_db_val" != "11" ]; then
			sed -i "s/$stringToReplace/dual_pci_enable=\"11\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
			trace="Change configuation to dual_pci both cards enabled"
		else
			do_reboot="NO"
		fi
	;;
	"4")
		rm -f /overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
		trace="Change configuation to dual_pci factory (DB value)"
	;;
	esac

	if [ "$do_reboot" = "YES" ]; then
		[ -d ${CONF_DIR} ] && rm -rf ${CONF_DIR}
		sync
		echo -e "###########################################################################################" > /dev/console
		echo -e "$trace" > /dev/console
		echo -e "dual_pci configuation changed Rebooting wait...                                          ##" > /dev/console
		echo -e "###########################################################################################" > /dev/console
		sleep 5
		reboot
	else
		echo -e "dual_pci configuation no change is needed" > /dev/console
	fi
}

fapi_cli_mode()
{
	# Define local parameters
	local user_select num_of_vaps myi index

	echo -e "######## FOR DEBUG ONLY ! #######" > /dev/console
	echo -e "##Follow 1-3 for fapi cli mode ##" > /dev/console
	echo -e "#################################" > /dev/console
	echo -e "## 1. cli factory              ##" > /dev/console
	echo -e "## 2. cli load                 ##" > /dev/console
	echo -e "## 3. cli init + apply         ##" > /dev/console
	echo -e "## 4. Number of VAPs to create ##" > /dev/console
	echo -e "## 5. Return to UGW            ##" > /dev/console
	echo -e "#################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	if [ "$user_select" = "4" ]; then
       echo -ne "NumOfVaps>>" > /dev/console;read num_of_vaps
       cur_num_vap=`ifconfig | grep -c vap_ssid`
	   myi=$((1 + cur_num_vap))
	   num_of_vaps=$((num_of_vaps + myi))
	   while [ $myi -lt $num_of_vaps ]; do
		 let index=myi+7
		 /usr/sbin/fapi_wlan_cli createVap -i 0 -v $index -s vap_ssid_${myi}
		 /usr/sbin/fapi_wlan_cli apply
		 ifconfig | grep wlan
		 let myi=myi+1
	   done
	   echo -e "############# DONE CREATING VAPS ##########" > /dev/console
	fi
	if [ "$user_select" = "1" ]; then
		rm -rf /opt/lantiq/wave/db/instance
		sync
		/usr/sbin/fapi_wlan_cli factory
	fi
	if [ "$user_select" = "2" ]; then
		echo -ne "Make sure fapi_wlan_wave_init_in_progress removed..., press any key" > /dev/console;read p
		/usr/sbin/fapi_wlan_cli load
	fi
	
	if [ "$user_select" = "3" ]; then
		/usr/sbin/fapi_wlan_cli init
		/usr/sbin/fapi_wlan_cli apply
		echo -e "#################################" > /dev/console
		echo -e "## FAPI CLI MODE               ##" > /dev/console
		echo -e "## NO WEB INTERFACE            ##" > /dev/console
		echo -e "## fapi_wlan_cli only          ##" > /dev/console
		echo -e "#################################" > /dev/console
	fi
	
	if [ "$user_select" = "5" ]; then 
		echo -ne "Return to UGW: wait system reboot..., press any key" > /dev/console;read p
		rm -f /opt/lantiq/wave/fapi_rpc_mode
		rm -rf /opt/lantiq/wave/db/instance
		rm -rf ${CONF_DIR}
		sync
		reboot
	fi

}

yocto_debug()
{
	mkdir /nvram/wave_scripts/
	cp /etc/wave/scripts/* /nvram/wave_scripts/
}

check_overlay()
{
	(. ${ETC_PATH}/fapi_wlan_wave_check_overlay.sh no_sleep)
}

dump_fapi()
{
	if [ -d /opt/lantiq ]
	then
		vendor_name="lantiq"
	elif [ -d /opt/intel ]
	then
		vendor_name="intel"
	else
		echo "TODO: add support in puma for dump fapi" > /dev/console
		exit 0
	fi
	cd /opt/${vendor_name}/wave/
	ts=`date +%s`
	which csdutil > /dev/null
	[ $? -eq 0 ] && csdutil decrypt /opt/${vendor_name}/config/.run-data.xml ${CONF_DIR}/db_dump.xml
	echo "##### ifconfig output #####" >> ${CONF_DIR}/commands_output.txt
	ifconfig >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### ifconfig -a output #####" >> ${CONF_DIR}/commands_output.txt
	ifconfig -a >> ${CONF_DIR}/commands_output.txt
	echo "##### List of STAs connected - wlan0 #####" >> ${CONF_DIR}/commands_output.txt
	iw dev wlan0 station dump >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### List of STAs connected - wlan2 #####" >> ${CONF_DIR}/commands_output.txt
	iw dev wlan2 station dump >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### List of STAs connected - wlan4 #####" >> ${CONF_DIR}/commands_output.txt
	iw dev wlan4 station dump >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### hostapd wlan0 status output #####" >> ${CONF_DIR}/commands_output.txt
	hostapd_cli -iwlan0 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### hostapd wlan2 status output #####" >> ${CONF_DIR}/commands_output.txt
	hostapd_cli -iwlan2 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### hostapd wlan4 status output #####" >> ${CONF_DIR}/commands_output.txt
	hostapd_cli -iwlan4 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### supplicant wlan1 status output #####" >> ${CONF_DIR}/commands_output.txt
	wpa_cli -iwlan1 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### supplicant wlan3 status output #####" >> ${CONF_DIR}/commands_output.txt
	wpa_cli -iwlan3 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "##### supplicant wlan5 status output #####" >> ${CONF_DIR}/commands_output.txt
	wpa_cli -iwlan5 stat >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "" >> ${CONF_DIR}/commands_output.txt
	echo "version.sh output #####" >> ${CONF_DIR}/commands_output.txt
	version.sh >> ${CONF_DIR}/commands_output.txt

	cp ${TEMP_DIR}/* ${CONF_DIR}
	cp -rf /opt/${vendor_name}/wave/hostapd_debug ${CONF_DIR}
	tar czf fapi_dump_${ts}.tar.gz confs
	echo "FAPI dump file created: /opt/${vendor_name}/wave/fapi_dump_${ts}.tar.gz" > /dev/console
}

get_all_chipids()
{
	chip_id_0=`check_wave_chip_id wlan0`
	chip_id_2=`check_wave_chip_id wlan2`
	chip_id_4=`check_wave_chip_id wlan4`
	echo " ##################################################################################### " >/dev/console
	echo "           chipids: wlan0=$chip_id_0 wlan2=$chip_id_2 wlan4=$chip_id_4" >/dev/console
	echo " ##################################################################################### " >/dev/console
	echo "wlan0=$chip_id_0 wlan2=$chip_id_2 wlan4=$chip_id_4" > /tmp/chipid.txt
}

dump_db()
{
	csdutil decrypt /opt/lantiq/config/.run-data.xml /tmp/db-dump.txt
	echo " ##################################################################################### " >/dev/console
	echo " ############              /tmp/db-dump.txt was created                   ############ " >/dev/console
	echo " ##################################################################################### " >/dev/console
}

recovery_dbg_func()
{
	local user_select taskid user_select_card user_error_type
	
	echo -e "####### RECOVERY DBG #################" > /dev/console
	echo -e "## 0. Re-Start daemon +debug        ##" > /dev/console
	echo -e "## 1. Re-Start daemon In NLCB+debug ##" > /dev/console
	echo -e "## 2. Send dump evacuation          ##" > /dev/console
	echo -e "## 3. Send Check socket(N/A)        ##" > /dev/console
	echo -e "## 4. Send Complete recovery        ##" > /dev/console
	echo -e "## 5  Send MAC error                ##" > /dev/console
	echo -e "## 6. Send DUT MODE                 ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -e "NLCB=debug /opt/lantiq/lib/fapi_wave_recoveryd DEBUGON &" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select
	if [ $user_select -gt 1 ]; then
		echo -e "Enter card:" > /dev/console
		echo -ne ">>" > /dev/console;read user_select_card
	fi
	if [ $user_select -eq 5 ]; then
		echo -e "Enter error type:" > /dev/console
		echo -ne ">>" > /dev/console;read user_error_type
	fi

	case $user_select in
	"0")
		taskid=`ps |  grep recoveryd | awk 'NR==1{print $1}'`
		kill $taskid
		/opt/lantiq/usr/sbin/fapi_wave_recoveryd DEBUGON &
	;;
	"1")
		taskid=`ps |  grep recoveryd | awk 'NR==1{print $1}'`
		kill $taskid
		NLCB=debug /opt/lantiq/usr/sbin/fapi_wave_recoveryd DEBUGON &
	;;
	"2")
		echo "Sending: echo 1 $user_select_card --> Debug/rcvry_msg_tx" >/dev/console
		echo 1 $user_select_card > /proc/net/mtlk/wlan0/Debug/rcvry_msg_tx
	;;
	"3")
		echo "Sending: echo 4 $user_select_card --> Debug/rcvry_msg_tx" >/dev/console
		echo 4 $user_select_card > /proc/net/mtlk/wlan0/Debug/rcvry_msg_tx
	;;
	"4")
		echo "Sending: echo 3 $user_select_card --> Debug/rcvry_msg_tx" >/dev/console
		echo 3 $user_select_card > /proc/net/mtlk/wlan0/Debug/rcvry_msg_tx
	;;
	"5")
		echo "Sending: echo 5 $user_select_card $user_error_type --> Debug/rcvry_msg_tx" >/dev/console
		echo 5 $user_select_card $user_error_type > /proc/net/mtlk/wlan0/Debug/rcvry_msg_tx
	;;
	"6")
		echo "Sending: echo 6 $user_select_card --> Debug/rcvry_msg_tx" >/dev/console
		echo 6 $user_select_card > /proc/net/mtlk/wlan0/Debug/rcvry_msg_tx
	;;
	esac

}

sigma_manager_dbg_func()
{
	local user_select taskid interface_name mac_address

	echo -e "####### SMD DBG ######################" > /dev/console
	echo -e "## 0. Re-Start daemon               ##" > /dev/console
	echo -e "## 1. EXIT daemon                   ##" > /dev/console
	echo -e "## 2. Send 2 dummy STAs             ##" > /dev/console
	echo -e "## 3. Check if SMD exist            ##" > /dev/console
	echo -e "## 4. Send 4 dummy STAs             ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	case $user_select in
	"0")
		echo -e "####### SMD Re-Start daemon ######################" > /dev/console
		taskid=`ps |  grep sigmaManagerDaemon | awk 'NR==1{print $1}'`
		kill $taskid
		/opt/lantiq/wave/scripts/sigmaManagerDaemon.sh &
	;;
	"1")
		echo -e "####### SMD EXIT daemon ######################" > /dev/console
		echo "EXIT" > /tmp/sigmaManagerPipe
	;;
	"2")
		echo -e "####### SMD Send 2 dummy STAs ######################" > /dev/console
		echo -e "####### SMD dummy STA1 of 2 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name1
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address1
		echo -e "STA1: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name1},MAC,${mac_address1}" > /dev/console
		echo -e "####### SMD dummy STA2 of 2 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name2
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address2
		echo -e "STA2: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name2},MAC,${mac_address2}" > /dev/console

		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name1},MAC,${mac_address1}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name2},MAC,${mac_address2}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
	;;
	"3")
		taskid=""
		echo -e "####### SMD Daemon exist? ######################" > /dev/console
		taskid=`ps |  grep sigmaManagerDaemon | awk 'NR==1{print $1}'`
		if [ "$taskid" != "" ]; then
			echo -e "SMD Daemon exist:taskid=$taskid" > /dev/console
		fi
	;;
	"4")
		echo -e "####### SMD Send 4 dummy STAs ######################" > /dev/console
		echo -e "####### SMD dummy STA1 of 4 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name1
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address1
		echo -e "STA1: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name1},MAC,${mac_address1}" > /dev/console
		echo -e "####### SMD dummy STA2 of 4 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name2
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address2
		echo -e "STA2: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name2},MAC,${mac_address2}" > /dev/console
		echo -e "####### SMD dummy STA3 of 4 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name3
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address3
		echo -e "STA1: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name3},MAC,${mac_address3}" > /dev/console
		echo -e "####### SMD dummy STA4 of 4 ######################" > /dev/console
		echo -e "Enter interface:" > /dev/console
		echo -ne ">>" > /dev/console;read interface_name4
		echo -e "Enter STA MAC:" > /dev/console
		echo -ne ">>" > /dev/console;read mac_address4
		echo -e "STA2: FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name4},MAC,${mac_address4}" > /dev/console

		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name1},MAC,${mac_address1}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name2},MAC,${mac_address2}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name3},MAC,${mac_address3}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
		[ -e ${SMDPIPE} ] && echo "FAPI_SMD_OFDMA_STA_CON,WLAN,${interface_name4},MAC,${mac_address4}" > ${SMDPIPE} || echo "NO RUNNING SMD" > /dev/console
	;;
	esac

}

recovery_set_mode_func()
{
	local user_select trace stringToReplace

	echo -e "####### recovery set mode ############" > /dev/console
	echo -e "## 0. Recovery Disabled             ##" > /dev/console
	echo -e "## 1. Recovery card0 enabled        ##" > /dev/console
	echo -e "## 2. Recovery card1 enabled        ##" > /dev/console
	echo -e "## 3. Recovery both cards enabled   ##" > /dev/console
	echo -e "## 4. Recovery factory (DB value)   ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	stringToReplace=`sed -n '/cards_recovery_enable=\"\"/{p;q}' /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh`

	case $user_select in
	"0")
		sed -i "s/$stringToReplace/cards_recovery_enable=\"00\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh
		trace="Change configuation to Recovery disabled"
	;;
	"1")
		sed -i "s/$stringToReplace/cards_recovery_enable=\"10\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh
		trace="Change configuation to Recovery card0 enabled"
	;;
	"2")
		sed -i "s/$stringToReplace/cards_recovery_enable=\"01\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh
		trace="Change configuation to Recovery card1 enabled"
	;;
	"3")
		sed -i "s/$stringToReplace/cards_recovery_enable=\"11\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh
		trace="Change configuation to Recovery both cards enabled"
	;;
	"4")
		rm -f /overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_lib_convert.sh
		trace="Change configuation to Recovery factory (DB value)"
	;;
	esac

	[ -d ${CONF_DIR} ] && rm -rf ${CONF_DIR}
	sync
	echo -e "###########################################################################################" > /dev/console
	echo -e "$trace" > /dev/console
	echo -e "Recovery configuation changed Rebooting wait...                                          ##" > /dev/console
	echo -e "###########################################################################################" > /dev/console
	sleep 5
	reboot
}

info_get_func()
{
	echo -e "#####################LSPCI#######################" > /dev/console
	lspci
	echo -e "#####################MODEL NAME##################" > /dev/console
	cat ./etc/config.sh | grep CONFIG_IFX_MODEL_NAME
	echo -e "#####################EEPROM######################" > /dev/console
	cat ${CONF_DIR}/eeprom_info
	echo -e "#####################VERSION#####################" > /dev/console
	version.sh
	head -8 cat /proc/net/mtlk/version
	uname --all
	cat /proc/version
	iw --version
	iwpriv --version | head -2
	busybox | head -3
	cat /etc/version
	cat /proc/cpuinfo | head -2
	echo -e "#####################WLAN0#####################" > /dev/console
	cat ${CONF_DIR}/iw_info_phy0
	echo -e "#####################WLAN2#####################" > /dev/console
	cat ${CONF_DIR}/iw_info_phy1
}

clish_info_get_func()
{
	local user_select trace user_select_string

	echo -e "####### Clish info ###################" > /dev/console
	echo -e "## 0. Clish cli commands            ##" > /dev/console
	echo -e "## 1. Clish search for param        ##" > /dev/console
	echo -e "## 2. Clish trace enable            ##" > /dev/console
	echo -e "## 3. Clish trace disable           ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select
	if [ $user_select -eq 1 ]; then
		echo -e "Enter param string to search:" > /dev/console
		echo -ne ">>" > /dev/console;read user_select_string
	fi


	case $user_select in
	"0")
		echo -e "############ show clish commands ###############" > /dev/console
		echo -e "## clish -c \"show wlan radio <wlanx>\"         ##" > /dev/console
		echo -e "## clish -c \"show wlan SSID <wlanx>\"          ##" > /dev/console
		echo -e "## clish -c \"show wlan ap <wlanx>\"            ##" > /dev/console
		echo -e "## clish -c \"show wlan ap security <wlanx>\"   ##" > /dev/console
		echo -e "########################## set clish commands ##############################" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"set radio <wlanx> <param> <value>\"       ##" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"set ap <wlanx> <param> <value>\"          ##" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"set ssid <wlanx> <param> <value>\"        ##" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"set ap security <wlanx> <param> <value>\" ##" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"add vap <wlanx> <vap name>\"              ##" > /dev/console
		echo -e "## clish -c \"configure wlan\" -c \"del vap <vap name index>\"                ##" > /dev/consolet clish commands ##############################" > /dev/console
		echo -e "############################################################################" > /dev/console
	;;
	"1")
		echo -e "########################## param section ##############################" > /dev/console
		grep -i "$user_select_string" /opt/lantiq/cli/map-files/wlan_param.map
		echo -e "########################## param values  ##############################" > /dev/console
		grep -i "$user_select_string" /opt/lantiq/cli/xmls/wlan.xml | grep PARAM
	;;
	"2")
			[ -e /usr/bin/clish ] && mv /usr/bin/clish /usr/bin/clishApp
			rm -f ${USRSBINDIR}/clish
			ln -s ${ETC_PATH}/fapi_wlan_wave_clish.sh ${USRSBINDIR}/clish
			echo -e "########################## clish trace enable ##############################" > /dev/console
	;;
	"3")
			[ -e /usr/bin/clishApp ] && mv /usr/bin/clishApp /usr/bin/clish
			rm -f ${USRSBINDIR}/clish
			ln -s /usr/bin/clish ${USRSBINDIR}/clish
			echo -e "########################## clish trace disable ##############################" > /dev/console
	;;
	*)
		echo -e "## Not a valid selection exiting ##" > /dev/console
		exit
	;;
	esac
}

iw_values()
{
	cd /opt/${vendor_name}/wave/

	iw wlan0 iwlwav help | grep "iwlwav g" | awk '{print "echo "$4": `iw wlan0 iwlwav "$4"`"}' > all_iw.sh
	chmod +x all_iw.sh

	# Exclude un-supported iw commnads
	sed -i "/"gShortCyclcPrfx:"/d" ./all_iwprivs.sh
	sed -i "/"gFixedPower:"/d" ./all_iwprivs.sh
	sed -i "/"gUnconnTime:"/d" ./all_iwprivs.sh
	sed -i "/"gRestrictAcMode:"/d" ./all_iwprivs.sh
	sed -i "/"gPdThresh:"/d" ./all_iwprivs.sh
	sed -i "/"gFastDrop:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPkeyIdx:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPs:"/d" ./all_iwprivs.sh
	sed -i "/"gLtPathEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gIpxPpaEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gRadarRssiTh:"/d" ./all_iwprivs.sh
	sed -i "/"gCtrlBFilterBank:"/d" ./all_iwprivs.sh
	sed -i "/"gEnableMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gConfigMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gPowerSelection:"/d" ./all_iwprivs.sh

	./all_iw.sh > ${CONF_DIR}/iw_wlan0.txt
	iw wlan2 iwlwav help | grep "iwlwav g" | awk '{print "echo "$4": `iw wlan2 iwlwav "$4"`"}' > all_iw.sh
	chmod +x all_iw.sh

	# Exclude un-supported iw commnads
	sed -i "/"gShortCyclcPrfx:"/d" ./all_iwprivs.sh
	sed -i "/"gFixedPower:"/d" ./all_iwprivs.sh
	sed -i "/"gUnconnTime:"/d" ./all_iwprivs.sh
	sed -i "/"gRestrictAcMode:"/d" ./all_iwprivs.sh
	sed -i "/"gPdThresh:"/d" ./all_iwprivs.sh
	sed -i "/"gFastDrop:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPkeyIdx:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPs:"/d" ./all_iwprivs.sh
	sed -i "/"gLtPathEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gIpxPpaEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gRadarRssiTh:"/d" ./all_iwprivs.sh
	sed -i "/"gCtrlBFilterBank:"/d" ./all_iwprivs.sh
	sed -i "/"gEnableMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gConfigMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gPowerSelection:"/d" ./all_iwprivs.sh

	./all_iw.sh > ${CONF_DIR}/iw_wlan2.txt
	iw wlan4 iwlwav help | grep "iwlwav g" | awk '{print "echo "$4": `iw wlan4 iwlwav "$4"`"}' > all_iw.sh
	chmod +x all_iw.sh

	# Exclude un-supported iw commnads
	sed -i "/"gShortCyclcPrfx:"/d" ./all_iwprivs.sh
	sed -i "/"gFixedPower:"/d" ./all_iwprivs.sh
	sed -i "/"gUnconnTime:"/d" ./all_iwprivs.sh
	sed -i "/"gRestrictAcMode:"/d" ./all_iwprivs.sh
	sed -i "/"gPdThresh:"/d" ./all_iwprivs.sh
	sed -i "/"gFastDrop:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPkeyIdx:"/d" ./all_iwprivs.sh
	sed -i "/"gPeerAPs:"/d" ./all_iwprivs.sh
	sed -i "/"gLtPathEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gIpxPpaEnabled:"/d" ./all_iwprivs.sh
	sed -i "/"gRadarRssiTh:"/d" ./all_iwprivs.sh
	sed -i "/"gCtrlBFilterBank:"/d" ./all_iwprivs.sh
	sed -i "/"gEnableMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gConfigMRCoex:"/d" ./all_iwprivs.sh
	sed -i "/"gPowerSelection:"/d" ./all_iwprivs.sh

	./all_iw.sh > ${CONF_DIR}/iw_wlan4.txt
	rm -f all_iw.sh

	tar czf iw_values.tar.gz iw_wlan*
	echo "iw values file created: /opt/${vendor_name}/wave/iw_values.tar.gz" > /dev/console
}

reboot_fapi()
{
	local user_select trace user_select_string

	echo -e "####### Reboot FAPI ###############################" > /dev/console
	echo -e "## 0. reboot (removing conf files)               ##" > /dev/console
	echo -e "## 1. reboot reomve conf+all overlay             ##" > /dev/console
	echo -e "## 2. reboot reomve conf+script overlay          ##" > /dev/console
	echo -e "###################################################" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	if [ "$user_select" = "0" ]; then
		rm -rf ${CONF_DIR}
		rm -rf /tmp/wlan_wave/*
		echo -e "## 0. reboot (removing conf files) ##" > /dev/console
	elif [ "$user_select" = "1" ]; then
		rm -rf ${CONF_DIR}
		rm -rf /tmp/wlan_wave/*
		rm -rf /overlay/*
		echo -e "## 1. reboot reomve conf+all overlay ##" > /dev/console
	elif [ "$user_select" = "2" ]; then
		rm -rf ${CONF_DIR}
		rm -rf /tmp/wlan_wave/*
		rm -rf /overlay/opt/${vendor_name}/scripts/*
		echo -e "## 2. reboot reomve conf+script overlay ##" > /dev/console
	fi
	sync
	reboot
}

interactive_burn_cal_file()
{
	local no_restart interface_name cal_status pc_ip_param pc_mac1 pc_mac2

	echo -e "######################################" > /dev/console
	echo -e "# check ping 192.168.1.1 from tftp PC#" > /dev/console
	echo -e "############# interface ##############" > /dev/console
	echo -e "## 0. wlan0                         ##" > /dev/console
	echo -e "## 2. wlan2                         ##" > /dev/console
	echo -e "## 4. wlan4                         ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select_string
	interface_name="wlan$user_select_string"

	no_restart=""
	echo -e "Do you want to reboot?(y/n)" > /dev/console
	echo -ne ">>" > /dev/console;read user_select_string

	[ "$user_select_string" = "n" ] || [ "$user_select_string" = "N" ] && no_restart=1
	arp
	pc_mac1=`arp | awk 'NR==1{print $4}'`
	pc_mac2=`arp | awk 'NR==2{print $4}'`

	pc_ip_param=""
	[ "$pc_mac1" != "00:00:00:00:00:00" ] && pc_ip_param=`arp | awk 'NR==1{print $2}'`
	[ "$pc_ip_param" = "" ] && [ "$pc_mac2" != "00:00:00:00:00:00" ] && pc_ip_param=`arp | awk 'NR==2{print $2}'`
	echo -e "Your PC tftp Application IP [$pc_ip_param]" > /dev/console

	[ "$pc_ip_param" = "" ] && echo -e "Error:PC tftp Application Traget connectivity issue" > /dev/console && exit

	pc_ip_param=${pc_ip_param/"("/}
	pc_ip_param=${pc_ip_param/")"/}

	cd /tmp/
	cal_status=0
	echo -e "Loading calibration from tftp..." > /dev/console
	tftp -gr "cal_${interface_name}.bin" -l cal_${interface_name}.bin $pc_ip_param
	cal_status=$(( $cal_status + `echo $?` ))

	echo -e "Burning calibration for interface[$interface_name]..." > /dev/console
	tar czf eeprom.tar.gz cal_*.bin
	if [ -d /nvram ]
	then
		cp /tmp/eeprom.tar.gz /nvram/
	else
		upgrade /tmp/eeprom.tar.gz wlanconfig 0 0
	fi
	cal_status=$(( $cal_status + `echo $?` ))

	if [ "$cal_status" -eq 0 ]
	then
		if [ -z "$no_restart" ]
		then
			sync
			reboot
		fi
	else
		echo "***********************************"
		echo "ERROR - calibration file not burned!"
		echo "***********************************"
	fi
	echo -e "****************************************************************" > /dev/console
	echo -e "Burning calibration for interface[$interface_name]DONE ...reboot is needed" > /dev/console
	echo -e "****************************************************************" > /dev/console
	sleep 5
	cd - > /dev/null
}

change_ssid()
{
	local user_select_interface user_select_ssid

	echo -e "######## change_ssid interface #######" > /dev/console
	echo -e "## 0. wlan0                         ##" > /dev/console
	echo -e "## 2. wlan2                         ##" > /dev/console
	echo -e "## 4. wlan4                         ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select_interface
	echo -ne "Enter SSID name:>>" > /dev/console;read user_select_ssid
	clish -c "configure wlan" -c "set SSID wlan$user_select_interface SSID $user_select_ssid"
}

create_vaps()
{
	local user_select_interface user_select_ssid user_select_vap_prefix num_of_vaps cur_num_vap myi

	echo -e "######## create vaps interface #######" > /dev/console
	echo -e "## 0. wlan0                         ##" > /dev/console
	echo -e "## 2. wlan2                         ##" > /dev/console
	echo -e "## 4. wlan4                         ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select_interface
	echo -ne "Enter vaps prefix name:>>" > /dev/console;read user_select_vap_prefix
	echo -ne "Enter Num Of Vaps to create>>" > /dev/console;read num_of_vaps

   cur_num_vap=`ifconfig | grep -c "wlan$user_select_interface."`
   let cur_num_vap=$cur_num_vap-1
   myi=$((1 + cur_num_vap))
   num_of_vaps=$((num_of_vaps + myi))
   while [ $myi -lt $num_of_vaps ]; do
	 clish -c "configure wlan" -c "add vap wlan$user_select_interface $user_select_vap_prefix$myi"
     let myi=myi+1
	 ifconfig | grep wlan
   done

    echo -e "############# DONE CREATING VAPS ##########" > /dev/console
}

delete_vaps()
{
	local user_select_interface cur_num_vap vap_index num_of_vaps

	echo -e "######## del vaps of interface #######" > /dev/console
	echo -e "## 0. wlan0                         ##" > /dev/console
	echo -e "## 2. wlan2                         ##" > /dev/console
	echo -e "## 4. wlan4                         ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select_interface

	cur_num_vap=`ifconfig | grep -c "wlan$user_select_interface."`

	let num_of_vaps=$cur_num_vap-1
	vap_index=0
	while [ $vap_index -lt $num_of_vaps ]; do
		clish -c "configure wlan" -c "del vap wlan$user_select_interface.$vap_index"
		let vap_index=vap_index+1
	done

	ifconfig | grep wlan
	echo -e "############# DONE DEL VAPS ##########" > /dev/console
}

cgrn_dut_mode_start()
{
	# Move to DUT mode
	${ETC_PATH}/fapi_wlan_wave_dut_drvctrl.sh stop
	${ETC_PATH}/fapi_wlan_wave_dut_drvctrl.sh start

	# Start DUT server
	killall dutserver
	if [ -f "$RDKBOS_WIFI_UTIL" ]
	then
		/bin/dutserver &
	else
		${BINDIR}/dutserver &
	fi
}

is_gen6b_chipset()
{
	local interface_name ret_val
	echo -e "Enter interface_name (wlan0,wlan2,wlan4):" > /dev/console
	echo -ne ">>" > /dev/console;read interface_name
	ret_val=`is_gen6b $interface_name`
	echo $ret_val
}

file_edit_func()
{
    local file_name user_select_string stringToReplace line_num

   echo -e "######################################" > /dev/console
   echo -e "#######     file edit     ############" > /dev/console
   echo -e "######################################" > /dev/console
   echo -e "Enter file to edit:" > /dev/console
   echo -ne ">>" > /dev/console;read file_name
   echo -e "Enter string to replace or add:" > /dev/console
   echo -ne ">>" > /dev/console;read user_select_string
   echo -e "Enter replace(1) or add by line number(2):" > /dev/console
   echo -ne ">>" > /dev/console;read user_select_mode

	if [ "$user_select_mode" = "1" ]; then
		stringToReplace=`sed -n "/${user_select_string}/{p;q}" $file_name`

		if [ "$stringToReplace" != "" ]; then
			echo -e "Enter string to replace $stringToReplace:" > /dev/console
			echo -ne ">>" > /dev/console;read user_replace_string
			sed -i "s/${stringToReplace}/${user_replace_string}/g" $file_name
		else
			echo -e "String was not found in file" > /dev/console
		fi
	else
		echo -e "Add ${user_select_string} to the file:$file_name" > /dev/console
		echo -e "Enter line number in the file:" > /dev/console
		echo -ne ">>" > /dev/console;read line_num
		sed -i "${line_num}i ${user_select_string}" $file_name
	fi
}

hostapd_debug_func()
{
	local user_select line_num

	echo -e "######## hostapd debug setting #######" > /dev/console
	echo -e "## 1. hostapd -dt                   ##" > /dev/console
	echo -e "## 2. hostapd -ddt                  ##" > /dev/console
	echo -e "## 3. remove hostadp debug          ##" > /dev/console
	echo -e "## e.g. /tmp/hostapd_wlan2 -dt -e /tmp/hostapd_ent_wlan2 /opt/lantiq/wave/confs/hostapd_wlan2.conf ##" > /dev/console
	echo -e "######################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	line_num=`grep -Fn '### Start hostapd ###' /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh`
	line_num=${line_num%%:*}
	line_num=$((line_num-1))
	sed -i "${line_num}i\hostapd_log_level=1" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh

	line_num=`grep -Fn 'hostapd_log_str="dd"' /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh`
	line_num=${line_num%%:*}
	line_num=$((line_num+2))

	if [ "$user_select" = "1" ]; then
		sed -i "${line_num}i\hostapd_log_str=\"d\"" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh
		echo -e "## 1. hostapd -dt log at:/tmp/wlan_wave/ ##" > /dev/console
	elif [ "$user_select" = "2" ]; then
		sed -i "${line_num}i\hostapd_log_str=\"dd\"" /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh
		echo -e "## 2. hostapd -ddt log at:/tmp/wlan_wave/ ##" > /dev/console
	elif [ "$user_select" = "3" ]; then
		rm -f /overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh
		echo -e "## 3. remove hostadp debug ##" > /dev/console
	fi
	sync
	reboot
}

check_sum_debug_func()
{

	local user_select

	echo -e "######## CHECK_SUM_DEBUG       ######" > /dev/console
	echo -e "## 0. Disable                      ##" > /dev/console
	echo -e "## 1. Enable                       ##" > /dev/console
	echo -e "#####################################" > /dev/console
	echo -ne ">>" > /dev/console;read user_select
	[ "$user_select" = "1" ] && touch ${WAVE_DIR}/CHECK_SUM_DEBUG
	[ "$user_select" = "0" ] && rm -f ${WAVE_DIR}/CHECK_SUM_DEBUG
	sync
}

is_gen6d2_chipset()
{
	local interface_name ret_val
	echo -e "Enter interface_name (wlan0,wlan2,wlan4):" > /dev/console
	echo -ne ">>" > /dev/console;read interface_name
	ret_val=`is_gen6d2 $interface_name`
	echo $ret_val
}

pdxp_fast_path_set()
{
	local user_select trace stringToReplace

	echo -e "####### pdxp_fast_path_set ############" > /dev/console
	echo -e "## 0. fast_path Disabled             ##" > /dev/console
	echo -e "## 1. fast_path Enabled              ##" > /dev/console
	echo -e "## 2. fast_path factory (DB value)   ##" > /dev/console
	echo -e "####### pdxp_fast_path_set ############" > /dev/console
	echo -e "Enter selection:" > /dev/console
	echo -ne ">>" > /dev/console;read user_select

	stringToReplace=`sed -n '/fastpath_cmd="\"/{p;q}' /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init`

	case $user_select in
	"0")
		sed -i "s/$stringToReplace/fastpath_cmd=\"fastpath=0\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
		trace="Change configuation to fast_path Disabled"
	;;
	"1")
		sed -i "s/$stringToReplace/fastpath_cmd=\"fastpath=1\"/g" /opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
		trace="Change configuation to fast_path Enabled"
	;;
	"2")
		rm -f /overlay/opt/lantiq/wave/scripts/fapi_wlan_wave_hw_init
		trace="Change configuation to fast_path factory (DB value)"
	;;
	esac

	[ -d ${CONF_DIR} ] && rm -rf ${CONF_DIR}
	sync
	echo -e "###########################################################################################" > /dev/console
	echo -e "$trace" > /dev/console
	echo -e "fast_path configuation changed Reboot is needed                                          ##" > /dev/console
	echo -e "###########################################################################################" > /dev/console
}

wlan_status_info()
{
		local hstpd_wlan_cnt
		hstpd_wlan_cnt=$(ps | grep -c hostapd_wlan)
		[ $hstpd_wlan_cnt -gt 1 ] &&	echo -e "\e[4mwlan0\e[0m" > /dev/console;hostapd_cli -i wlan0 stat | grep -w -i 'ssid\|channel\|freq\|num_sta'
		[ $hstpd_wlan_cnt -gt 2 ] && echo -e "\n\e[4mwlan2\e[0m" > /dev/console;hostapd_cli -i wlan2 stat | grep -w -i 'ssid\|channel\|freq\|num_sta'
}

case $command in
	if_down)
		interface_down
	;;
	if_up)
		interface_up
	;;
	restart)
		restart_wave
	;;
	burn_cal)
		burn_cal_file
	;;
	burn_cal_dut)
		burn_cal_file no_restart
	;;
	driver)
		replace_driver
	;;
	fw)
		replace_fw
	;;
	tftp_bins)
		tftp_bins
	;;
	"set_internal"|"internal")
		internal_radio
	;;
	wave600defaults)
		wave600_defaults
	;;
	bcl)
		bcl_mode_enable
	;;
	"dualpci_on"|"dp")
		dual_pci_enable
	;;
	yocto_debug)
		yocto_debug
	;;
	"check_overlay"|"co")
		check_overlay
	;;
	"dump_fapi"|"df")
		dump_fapi
	;;
	"chipid")
		get_all_chipids
	;;
	"climode"|"cm")
		fapi_cli_mode
	;;
	"db")
		dump_db
	;;
	"recovery_dbg"|"rdbg")
		recovery_dbg_func
	;;
	"smd_dbg"|"smdd")
		sigma_manager_dbg_func
	;;
	"recovery_set"|"rcst")
		recovery_set_mode_func
	;;
	"wave_info"|"wi")
		info_get_func
	;;
	"clish_info"|"ci")
		clish_info_get_func
	;;
	"iw_values"|"iw")
		iw_values
	;;
	"iburn_cal"|"ibc")
		interactive_burn_cal_file
	;;
	"ssid")
		change_ssid
	;;
	"vapsc")
		create_vaps
	;;
	"vapsd")
		delete_vaps
	;;
	"reboot"|"rfa")
		reboot_fapi
	;;
	"cgrn_dut_mode_start"|"cgrdut")
		cgrn_dut_mode_start
	;;
	"is_gen6b"|"gen6b")
		is_gen6b_chipset
	;;
	"is_gen6d2"|"gen6d2")
		is_gen6d2_chipset
	;;
	"clishdbg"|"cdbg")
		echo 2 | clish_info_get_func
	;;
	"file_edit"|"fe")
		file_edit_func
	;;
	"hostapd_debug"|"hstdbg")
		hostapd_debug_func
	;;
	"checksumdbg"|"csdbg")
		check_sum_debug_func
	;;
	"pdxp_fastpath_set"|"pfs")
		pdxp_fast_path_set
	;;
	"wlan_status"|"ws")
		wlan_status_info
	;;
	*)
		echo -e "$script_name: Unknown command $command\n \
		Usage: $script_name COMMAND [Argument 1] [Argument 2]\n" \
		 "\n" \
		 "Commnads:\n" \
		 "if_down        Bring down all the interfaces.\n" \
		 "if_up          Bring up all the interfaces.\n" \
		 "restart        Restart the Wlan interfaces (including rmmod and insmod of Wlan driver)\n" \
		 "burn_cal       Burn the calibration files\n" \
		 "  Arguments:\n" \
		 "  Argument 1:  Your PC IP\n" \
		 "  Argument 2:  The interface name or names to which calibration is burned: wlan0/wlan2/wlan4/all\n" \
		 "               Names can be specified in a comma-separated list: wlan0,wlan2\n" \
		 "               This argument can contain also the path in the tftp server before the interface name: /path/wlan\n" \
		 "               Example: $script_name burn_cal <PC IC> /private_folder/wlan0,wlan2,wlan4\n" \
		 "burn_cal_dut   Burns calibration file without restart\n" \
		 "  Arguments:\n" \
		 "  Argument 1:  Your PC IP\n" \
		 "  Argument 2:  The interface name to which calibration is burned: wlan0/wlan2/both\n" \
		 "               Default value if Argument 2 is not set: wlan0\n" \
		 "               This argument can contain also the path in the tftp server before the interface name: /path/wlan\n" \
		 "               Example: $script_name burn_cal_dut <PC IC> /private_folder/both\n" \
		 "driver         Replace driver binaries (mtlk.ko and mtlkroot.ko)\n" \
		 "  Arguments:\n" \
		 "  Argument 1:  Your PC IP\n" \
		 "               Make sure to have the mtlk.ko and mtlkroot.ko files in the tftp folder in your PC\n" \
		 "fw             Replace FW binary (ap_upper and ap_lower binaries)\n" \
		 "  Arguments:\n" \
		 "  Argument 1:  Your PC IP\n" \
		 "               Make sure to have the ap_upper and ap_lower files in the tftp folder in your PC\n" \
		 "set_internal   Enable/disable internal on-board WLAN (internal also can be used)\n" \
		 "  Arguments:\n" \
		 "  Argument 1:  Mode to set: 0/1\n" \
		 "wave600defaults <interface name> e.g: wlan0,wlan2,wlan4\n" \
		 "yocto_debug    Add ability to edit FAPI scripts on yocto based platforms. Edit the scritps in the folder /nvram/wave_scripts/\n" \
		 "check_overlay  Compare between the driver, FW, progmodels version in version.sh and in driver /proc\n" \
		 "               List files in /overlay folder (co also can be used)\n" \
		 "dump_fapi      Create a tarball FAPI and SL debug (df also can be used)\n" \
		 "bcl            Enable/Disable bcl\n" \
		 "chipid         get all detected chip ids per interface\n" \
		 "dualpci_on     (dp)Enable DUAL PCI\n" \
		 "climode        (cm)creating vaps in rpc mode make sure create DB was done and then follow steps 1-4\n" \
		 "db             creating data base text file\n" \
		 "recovery_dbg    (rdbg) recovery debug\n" \
		 "smd_dbg         (smdd) Sigma Manager Daemon debug options\n" \
		 "recovery_set    (rcst) recovery set\n" \
		 "wave_info       (wi) get all version information related to wlan and more\n" \
		 "clish_info      (ci) get all clish information\n" \
		 "iw              (iw) Create a tarball with the complete output of all iw getters on all radios (iw also can be used)\n" \
		 "iburn_cal       (ibc) interactive calibration files burnning\n" \
		 "ssid             change SSID\n" \
		 "vapsc            create vaps\n" \
		 "vapsd            delete all vaps\n" \
		 "reboot          (rfa) reboot with deleting all FAPI conf files\n" \
		 "cgrdut          (cgrn_dut_mode_start) On Cougar Run: Move to DUT mode, start DUT server and disable logging\n" \
		 "is_gen6b         (gen6b) check if the chip is B0 ret_val 1/0 \n" \
		 "clishdbg        (cdbg) enable the clish trace and validity check\n" \
		 "file_edit       (fe) edit file on target - replace or add \n" \
		 "hostapd_debug   (hstdbg) hostapd debug mode d or dd \n" \
		 "checksumdbg     (csdbg) enable the check sum dbg\n" \
		 "is_gen6d2        (gen6d2) check if the chip is 6d2 ret_val 1/0 \n" \
		 "pdxp_fastpath_set(pfs) disable or enable fast path for PDXP wlan0 only (use #2 beofre switching from state to state) \n" \
		 "wlan_status      (ws) gives wlan status info 1/0 \n"
	;;
esac
