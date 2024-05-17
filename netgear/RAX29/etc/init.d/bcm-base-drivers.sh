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

# bcmlibs
insmod /lib/modules/4.19.183/extra/bcmlibs.ko  

# KNVRAM
insmod /lib/modules/4.19.183/extra/wlcsm.ko  

# UBUS


#I2C 

# PON

# MPM

# BPM
insmod /lib/modules/4.19.183/extra/bcm_bpm.ko  

# VLAN
insmod /lib/modules/4.19.183/extra/bcmvlan.ko  

# RDPA

# RDPA_User


# General
insmod /lib/modules/4.19.183/extra/bcm_license.ko  
insmod /lib/modules/4.19.183/extra/chipinfo.ko  

# Ingress
# Must
insmod /lib/modules/4.19.183/extra/bcm_ingqos.ko  

# RDPA

insmod /lib/modules/4.19.183/extra/pktflow.ko  
insmod /lib/modules/4.19.183/extra/cmdlist.ko  
insmod /lib/modules/4.19.183/extra/archer.ko  
if [ $mfg_nvram_mode -eq 0 ]; then
echo "No need for adsl driver"
fi

# insert

# enet


insmod /lib/modules/4.19.183/extra/bcm_enet.ko  
insmod /lib/modules/4.19.183/extra/tdts.ko  
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

# NetXL

#Voice 


#load usb
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ehci-hcd.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ehci-platform.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ehci-pci.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ohci-hcd.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ohci-platform.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/ohci-pci.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/xhci-hcd.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/host/xhci-plat-hcd.ko  
insmod /lib/modules/4.19.183/extra/bcm_usb.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/class/usblp.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/storage/usb-storage.ko  
insmod /lib/modules/4.19.183/kernel/drivers/usb/storage/uas.ko  

# other

insmod /lib/modules/4.19.183/extra/pwrmngtd.ko  

insmod /lib/modules/4.19.183/extra/bcm_thermal.ko  

# presecure
insmod /lib/modules/4.19.183/extra/otp.ko  

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


