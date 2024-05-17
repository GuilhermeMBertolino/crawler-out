#!/bin/sh
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
insmod /lib/modules/4.19.183/kernel/drivers/mtd/mtdoops.ko mtddev=$mtdoops record_size=$rec_size
fi

# bcmlibs
insmod /lib/modules/4.19.183/extra/bcmlibs.ko  

# KNVRAM
insmod /lib/modules/4.19.183/extra/wlcsm.ko  

# UBUS

insmod /lib/modules/4.19.183/extra/bdmf.ko  

#I2C 

# PON

# MPM
insmod /lib/modules/4.19.183/extra/bcm_mpm.ko  

# BPM
insmod /lib/modules/4.19.183/extra/bcm_bpm.ko  

# VLAN
insmod /lib/modules/4.19.183/extra/bcmvlan.ko  

# RDPA
insmod /lib/modules/4.19.183/extra/rdpa_gpl.ko  
if test -e  /lib/modules/4.19.183/extra/rdpa_prv.ko
then
  if echo $(/bin/pspctl dump OperationMode) | grep -q 'FC'
  then
    insmod /lib/modules/4.19.183/extra/rdpa.ko  
    echo 'FC operation mode loaded!'
  else
    insmod /lib/modules/4.19.183/extra/rdpa_prv.ko  
    echo 'Provision operation mode loaded!'
  fi
else
  insmod /lib/modules/4.19.183/extra/rdpa.ko  
fi

# RDPA_User
insmod /lib/modules/4.19.183/extra/rdpa_usr.ko  

insmod /lib/modules/4.19.183/extra/rdpa_mw.ko  

# General
insmod /lib/modules/4.19.183/extra/bcm_license.ko  
insmod /lib/modules/4.19.183/extra/chipinfo.ko  

# Ingress
# Must
insmod /lib/modules/4.19.183/extra/bcm_ingqos.ko  

# RDPA
insmod /lib/modules/4.19.183/extra/rdpa_cmd.ko  

insmod /lib/modules/4.19.183/extra/pktflow.ko  
insmod /lib/modules/4.19.183/extra/cmdlist.ko  
if [ $mfg_nvram_mode -eq 0 ]; then
echo "No need for adsl driver"
fi

# insert

# enet


insmod /lib/modules/4.19.183/extra/bcm_enet.ko  
# moving
insmod /lib/modules/4.19.183/extra/pktrunner.ko  
insmod /lib/modules/4.19.183/extra/bcmmcast.ko  

# EAPFWD:

if [ $mfg_nvram_mode -gt 0 ]; then
echo "Manufacture mode, load driver done!"
exit 0
fi

#load SATA/AHCI

# PCIe
insmod /lib/modules/4.19.183/extra/bcm_pcie_hcd.ko  

# pcie

# WLAN
insmod /lib/modules/4.19.183/extra/wfd.ko  

# NetXL

#Voice 


#load usb
# kernel/drivers/usb/usb-common.ko
# kernel/drivers/usb/core/usbcore.ko
# kernel/drivers/usb/host/ehci-hcd.ko
# kernel/drivers/usb/host/ehci-platform.ko
# kernel/drivers/usb/host/ehci-pci.ko
# kernel/drivers/usb/host/ohci-hcd.ko
# kernel/drivers/usb/host/ohci-platform.ko
# kernel/drivers/usb/host/ohci-pci.ko
# kernel/drivers/usb/host/xhci-hcd.ko
# kernel/drivers/usb/host/xhci-plat-hcd.ko
# extra/bcm_usb.ko
# kernel/drivers/usb/class/usblp.ko
# kernel/drivers/usb/storage/usb-storage.ko
# kernel/drivers/usb/storage/uas.ko
# extra/btusbdrv.ko

# other

insmod /lib/modules/4.19.183/extra/pwrmngtd.ko  
insmod /lib/modules/4.19.183/extra/bcmflex.ko  
insmod /lib/modules/4.19.183/extra/bcmspu.ko  

insmod /lib/modules/4.19.183/extra/bcm_thermal.ko  

# presecure
insmod /lib/modules/4.19.183/extra/otp.ko  

# LTE


 test -e /rom/etc/rdpa_init.sh && /rom/etc/rdpa_init.sh

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


