#!/bin/sh
#
# script file to startup
TOOL=flash
GETMIB="$TOOL get"
LOADDEF="$TOOL default"
LOADDEFBLUETOOTHHW="$TOOL default-bluetoothhw"
LOADDEFCUSTOMERHW="$TOOL default-customerhw"
LOADDEFDPKHW="$TOOL default-dpk"
LOADDEFSW="$TOOL default-sw"
LOADDS="$TOOL reset"   #reset current setting and backup current setting from dafault setting
RESET_CS_FROM_BACKUPCS="$TOOL reset_cs_from_backupcs"
RESET_BACKUPCS_FROM_CS="$TOOL reset_backupcs_from_cs"
RESET_DS_FROM_BACKUPDS="$TOOL reset_ds_from_backupds"
RESET_BACKUPDS_FROM_DS="$TOOL reset_backupds_from_ds"

RESET_HS_FROM_BACKUPHS="$TOOL reset_hs_from_backuphs"
RESET_BACKUPHS_FROM_HS="$TOOL reset_backuphs_from_hs"
RESET_BLUETOOTHHS_FROM_BACKUPBLUETOOTHHS="$TOOL reset_bluetoothhs_from_backupbluetoothhs"
RESET_BACKUPBLUETOOTHHS_FROM_BLUETOOTHHS="$TOOL reset_backupbluetoothhs_from_bluetoothhs "
RESET_CUSTOMERHS_FROM_BACKUPCUSTOMERHS="$TOOL reset_customerhs_from_backupcustomerhs"
RESET_BACKUPCUSTOMERHS_FROM_CUSTOMERHS="$TOOL reset_backupcustomerhs_from_customerhs"


# See if flash data is valid
$TOOL virtual_flash_init
$TOOL test-hwconf
if [ $? != 0 ]; then
	echo 'HW configuration invalid!'
	$TOOL test-backuphwconf
	if [ $? = 0 ]; then
		echo 'HW configuration invalid, reset HW configuration from backup HW setting!'
		$RESET_HS_FROM_BACKUPHS
	else 
		echo ' reset HW from DEFAULT! '
		$LOADDEF  
	fi
fi

$TOOL test-backuphwconf
RET=$?
if [ $RET != 0 ] && [ $RET != 1 ] ; then
        $RESET_BACKUPHS_FROM_HS      # reset backup hw setting from hw setting
	echo 'BACKUP HW configuration invalid, reset from HW configuration ! '
fi

$TOOL test-bluetoothhwconf
if [ $? != 0 ]; then
        echo 'BLUETOOTH HW configuration invalid!'
	$TOOL test-backupbluetoothhwconf
        if [ $? = 0 ]; then
                echo 'BLUETOOTH HW configuration invalid, reset from backup BLUETOOTH HW setting!'
                $RESET_BLUETOOTHHS_FROM_BACKUPBLUETOOTHHS
        else 
                echo ' reset BLUETOOTH HW  from DEFAULT! '
	        $LOADDEFBLUETOOTHHW
	fi
fi

$TOOL test-backupbluetoothhwconf
RET=$?
if [ $RET != 0 ] && [ $RET != 1 ] ; then
	echo 'BACKUP bluetooth HW configuration invalid, reset from bluetooth HW configuration ! '
        $RESET_BACKUPBLUETOOTHHS_FROM_BLUETOOTHHS      # reset backup bluetooth hw setting from bluetooth hw setting
fi

$TOOL test-customerhwconf
if [ $? != 0 ]; then
        echo 'CUSTOMER HW configuration invalid!'
	$TOOL test-backupcustomerhwconf
	if [ $? = 0 ]; then
		echo 'CUSTOMER HW configuration invalid, reset from backup CUSTOMER HW setting!'
                $RESET_CUSTOMERHS_FROM_BACKUPCUSTOMERHS
	else 
		echo ' CUSTOMER HW reset from DEFAULT! '
      		$LOADDEFCUSTOMERHW
	fi
fi
	
$TOOL test-backupcustomerhwconf
RET=$?
if [ $RET != 0 ] && [ $RET != 1 ] ; then
	 echo 'BACKUP customer HW configuration invalid, reset from customer HW configuration ! '
        $RESET_BACKUPCUSTOMERHS_FROM_CUSTOMERHS      # reset backup customer hw setting from customer hw setting
fi
$TOOL test-dpkconf
if [ $? != 0 ];then
        echo 'RF DPK configuration invalid, reset default'
        $LOADDEFDPKHW
fi

$TOOL test-dsconf
if [ $? != 0 ]; then
	echo 'default setting invalid!'
	$TOOL test-backupdsconf
	if [ $? = 0 ]; then
		echo 'reset default setting from backup default setting!'
		$RESET_DS_FROM_BACKUPDS  #reset default setting from backup default setting
	else
		echo 'reset default/current with value in code'
		$LOADDEFSW     #reset default setting,current setting,backup default setting and backup current setting with default value in code.
	fi
fi

$TOOL test-backupdsconf
RET=$?
if [ $RET != 0 ] && [ $RET != 1 ]; then
	$RESET_BACKUPDS_FROM_DS      #nothing to do (or reset backup default setting from default setting)
fi

$TOOL test-csconf
if [ $? != 0 ]; then
	echo 'Current configuration invalid!'
	$TOOL test-backupcsconf
	if [ $? = 0 ]; then
		echo 'reset current setting from backup current setting!'
		$RESET_CS_FROM_BACKUPCS  #reset current setting from backup current setting
	else
		echo 'reset current setting from default setting!'
		$LOADDS                  #reset current setting and backup current setting from default setting
	fi
fi

$TOOL test-backupcsconf
RET=$?
if [ $RET != 0 ] && [ $RET != 1 ]  ; then
	$RESET_BACKUPCS_FROM_CS      #nothing to do (or reset backup current setting from current setting)
fi
$TOOL test-alignment
if [ $? != 0 ]; then
        echo 'Please refine linux/.config change offset to fit flash erease size!!!!!!!!!!!!!!!!!'
fi

# voip flash check
if [ "$VOIP_SUPPORT" != "" ]; then
$TOOL voip check
fi

if [ ! -e "$SET_TIME" ]; then
	flash settime
fi

# Generate WPS PIN number
eval `$GETMIB HW_WSC_PIN`
if [ "$HW_WSC_PIN" = "" ]; then
	$TOOL gen-pin
fi

# Enable Multicast and Broadcast Strom control and disable it in post_startup.sh
echo "1 3" > /proc/StormCtrl
syslogd

