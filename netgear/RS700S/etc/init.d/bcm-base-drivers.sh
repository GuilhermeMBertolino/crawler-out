#!/bin/sh

function interactive_insmod() {
    if [ ! -r /proc/environment/insmod_pause ] || [[ "$yesall" == "yes" ]]; then
        /sbin/insmod $*
        return
    fi
    echo ready to insmod $*
    echo "[y]" to insmod this module, "[s]" to skip this module, "[a]" to insmod all
    read r
    case "$r" in
        y|Y)
            /sbin/insmod $*
            ;;
        s|S)
            echo skipping
            ;;
        a|A)
            yesall="yes"
            /sbin/insmod $*
            ;;
        *)
            ;;
      esac
}

alias insmod=interactive_insmod

WLNANDMFG_FILE=/proc/nvram/wl_nand_manufacturer
if [ -e $WLNANDMFG_FILE ]; then
SYSTEM_INFO_INDICATOR=$(cat  $WLNANDMFG_FILE )
else
SYSTEM_INFO_INDICATOR=0
fi
SYSTEM_UBOOT=$(($SYSTEM_INFO_INDICATOR & 8))
if [ $SYSTEM_UBOOT -gt 0 ]; then
	MFG_NVRAM_MODE_FILEPATH=/proc/environment/mfg_nvram_mode
else
	MFG_NVRAM_MODE_FILEPATH=/proc/brcm/blxparms/mfg_nvram_mode
fi
if  [ -e $MFG_NVRAM_MODE_FILEPATH ]; then
	mfg_nvram_mode=$(cat $MFG_NVRAM_MODE_FILEPATH)
else
	mfg_nvram_mode=0
fi

MTDOOPS_PART=/proc/environment/mtdoops
if [ -e $MTDOOPS_PART ]; then
	mtdoops=$(cat $MTDOOPS_PART)
	rec_size=65536
	log_shift=$(gunzip -c /proc/config.gz | grep CONFIG_LOG_BUF_SHIFT | cut -d '=' -f 2)
	rec_size=$((2**$log_shift))
	mtdsize=$(cat /proc/mtd  | grep $mtdoops | cut -d ' ' -f3)
	if [ "$mtdsize" != "" ]; then   
		mtdsize=$((0x${mtdsize}))
		if [ $rec_size -gt $mtdsize ]; then
			rec_size=$mtdsize
		fi
	else
		mtdoops=""
	fi		
else
	mtdoops=""
fi

trap "" 2


case "$1" in
	start)
		echo "Loading drivers and kernel modules... "
		echo

# Syntax
# line
# conditon
# condition
# for
# -BUILD_FEATURE_A
# will
# -!BUILD_FEATURE_B
# will

# mtdoops
if [ "$mtdoops" != "" ]; then
echo "load mtdoops driver: mtd partition $mtdoops record size $rec_size"
fi

# bcmlibs
insmod /lib/modules/4.19.275/extra/bcmlibs.ko  

# KNVRAM
insmod /lib/modules/4.19.275/extra/bcm_knvram.ko  

# UBUS

insmod /lib/modules/4.19.275/extra/bdmf.ko  
insmod /lib/modules/4.19.275/extra/rdpa_gpl.ko  

#I2C 

# PON

# MPM
insmod /lib/modules/4.19.275/extra/bcm_mpm.ko  

# BPM
insmod /lib/modules/4.19.275/extra/bcm_bpm.ko  

# VLAN
insmod /lib/modules/4.19.275/extra/bcmvlan.ko DSCP2Pbits_Use3LSBs=0 

# RDPA
insmod /lib/modules/4.19.275/extra/rdpa_gpl_ext.ko  
if test -e  /lib/modules/4.19.275/extra/rdpa_prv.ko
then
  if echo $(/bin/pspctl dump OperationMode) | grep -q 'FC'
  then
    insmod /lib/modules/4.19.275/extra/rdpa.ko  
    echo 'FC operation mode loaded!'
  else
    insmod /lib/modules/4.19.275/extra/rdpa_prv.ko  
    echo 'Provision operation mode loaded!'
  fi
else
  insmod /lib/modules/4.19.275/extra/rdpa.ko  
fi

# RDPA_User
insmod /lib/modules/4.19.275/extra/rdpa_usr.ko  

insmod /lib/modules/4.19.275/extra/rdpa_mw.ko  

# General
insmod /lib/modules/4.19.275/extra/bcm_bp3drv.ko modparam_license_dir="/data/licenses" 

# GDX
# Insert
insmod /lib/modules/4.19.275/extra/gdx.ko  

# Ingress
# Must
insmod /lib/modules/4.19.275/extra/bcm_ingqos.ko  

insmod /lib/modules/4.19.275/extra/pktflow.ko  
insmod /lib/modules/4.19.275/extra/cmdlist.ko  
if [ $mfg_nvram_mode -eq 0 ]; then
echo "No need for adsl driver"
fi

# insert

insmod /lib/modules/4.19.275/extra/sw_gso.ko  

# enet


insmod /lib/modules/4.19.275/extra/bcm_enet.ko  
insmod /lib/modules/4.19.275/extra/ndi.ko  
insmod /lib/modules/4.19.275/extra/tdts_crypto.ko  

# RDPA
insmod /lib/modules/4.19.275/extra/rdpa_cmd.ko  

#extra/tdts.ko 
#extra/dpicore.ko 
#extra/dpiqos.ko 
# moving
insmod /lib/modules/4.19.275/extra/pktrunner.ko  
insmod /lib/modules/4.19.275/extra/bcmmcast.ko  

# EAPFWD:

if [ $mfg_nvram_mode -gt 0 ]; then
echo "Manufacture mode, load driver done!"
exit 0
fi

#load SATA/AHCI

# PCIe
insmod /lib/modules/4.19.275/extra/bcm_pcie_hcd.ko  

# pcie

# WLAN
insmod /lib/modules/4.19.275/extra/wfd.ko  

#Voice 


#load usb
insmod /lib/modules/4.19.275/extra/bcm_bca_usb.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ehci-hcd.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ehci-platform.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ehci-pci.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ohci-hcd.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ohci-platform.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/ohci-pci.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/xhci-hcd.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/host/xhci-plat-hcd.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/class/usblp.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/storage/usb-storage.ko  
insmod /lib/modules/4.19.275/kernel/drivers/usb/storage/uas.ko  

# other


insmod /lib/modules/4.19.275/extra/bcm_thermal.ko  

# FPI

# presecure

# LTE


 test -e /etc/rdpa_init.sh && /etc/rdpa_init.sh

# disable ipv6 on archer dummy netdevice
if [ -e /proc/sys/net/ipv6/conf/archer/disable_ipv6 ]; then
	echo 1 > /proc/sys/net/ipv6/conf/archer/disable_ipv6
fi

# Enable the PKA driver.
 test -e /sys/devices/platform/bcm_pka/enable && echo 1 > /sys/devices/platform/bcm_pka/enable

exit 0
		;;

	stop)
		echo "removing bcm base drivers not implemented yet..."
		exit 1
		;;

	*)
		echo "bcmbasedrivers: unrecognized option $1"
		exit 1
		;;

esac


