#!/bin/sh
# This script loads/unloads the loadable kernel modules for Wireless feature for non-HND images
# usage:
# bcm-wlan-drivers.sh operation [module]
#
# operation:  start, stop, restart
# [module]:   WLAN kernel module/s
#
# Script uses below order to find the WLAN modules to operate on
# argument $2, nvram (kernel_modules), default list based on image
# check existance of driver in the system before loading

trap "" 3
#The following will be populated by buildFS during the make process:
KERNELVER=4.19.183
HNDROUTER=y
CPEROUTER=y
WLAN_BTEST=
PROD_FW_PATH="/etc/wlan/dhd"
CONFIG_WLDPDCTL=y
BRCM_CHIP=6756
WLAN_REMOVE_INTERNAL_DEBUG=y
if [ ! -z $WLAN_REMOVE_INTERNAL_DEBUG ]; then
    dhd_console_ms=0
else
    dhd_console_ms=250
fi
SYSTEM_INFO_INDICATOR=$(cat /proc/nvram/wl_nand_manufacturer)
is_mfg=$(($SYSTEM_INFO_INDICATOR & 2))
SYSTEM_UBOOT=$(($SYSTEM_INFO_INDICATOR & 8))
if [ ! -z $PROD_FW_PATH ]; then
    MFG_FW_PATH=$PROD_FW_PATH"/mfg"
else
    MFG_FW_PATH="/etc/wlan/dhd/mfg"
fi

WLDPDCTL=0

#wl_unitlist -knvram or environment varible to define radio interface
#name index order. Ex. 
#    1 0 2: one dhd(wl1) and one NIC(wl0)
#    1 2 0: two dhd(wl1/2) and one NIC(wl0)
if [ $SYSTEM_UBOOT -gt 0 ]; then
    WIFI_DRV_LOAD_ORDER=/proc/environment/wl_unitlist
else
    WIFI_DRV_LOAD_ORDER=/proc/brcm/blxparms/wl_unitlist
fi

if  [ -e $WIFI_DRV_LOAD_ORDER ]; then
    UNITLIST="$(cat $WIFI_DRV_LOAD_ORDER)"
else
    UNITLIST=`nvram kget wl_unitlist`
    if [ -z "$UNITLIST" ]; then
        UNITLIST="0 1 2"
    fi
fi
echo "UNITLIST:$UNITLIST"

# CSP:CS00012198059, Kernel panic issue.
# Follow 2021.08.24 Broadcom Matt's instruction, replace fcache.arma7.o_saved
# and add nvram 'dhd_rnr_offload_override' value
#OFFLOAD_OVERRIDE=`nvram kget dhd_rnr_offload_override`
#if [ "$OFFLOAD_OVERRIDE" != "0" ]; then
#    nvram kset dhd_rnr_offload_override=0
#    nvram kcommit
#    sync
#fi

# Enable runner dhd offload (default is enable)
OFFLOAD_OVERRIDE=`nvram kget dhd_rnr_offload_override`
if [ ! -z "$OFFLOAD_OVERRIDE" ]; then
    nvram kunset dhd_rnr_offload_override
    nvram kcommit
    sync
fi

# Add default OTP value
  # 5GHz
  nvram kset 1:tempthresh=101
  # 2.4GHz
  nvram kset sb/0/tempthresh=103
  # 6GHz
  nvram kset sb/1/tempthresh=103
  nvram kcommit
  sync

# Add for nvram ed_thresh change
  # 2.4GHz
  nvram kunset sb/0/eu_edthresh2g
  nvram kunset sb/0/ed_thresh2g
  # 5GHz
  nvram kunset 1:eu_edthresh2g
  nvram kunset 1:eu_edthresh5g
  # 6GHz
  nvram kset sb/1/boardflags4=0x4020008
  nvram kset sb/1/ed_thresh5g=-74
  nvram kset sb/1/eu_edthresh5g=-80
  nvram kset sb/1/subband_ed_adj=0x9602
  nvram kcommit; sync

#Add For RF Change (New Board limit - 20220802 11:04 From RF Jeff21)
  # [2G]
  nvram kset sb/0/maxp2ga0=110
  nvram kset sb/0/maxp2ga1=110
  nvram kset sb/0/cckbw202gpo=0x0000
  nvram kset sb/0/cckbw20ul2gpo=0x0000
  nvram kset sb/0/dot11agofdmhrbw202gpo=0x2000
  nvram kset sb/0/ofdmlrbw202gpo=0x0000
  nvram kset sb/0/mcsbw202gpo=0x65430000
  nvram kset sb/0/mcsbw402gpo=0x87532100
  nvram kset sb/0/mcs1024qam2gpo=0xA888
  nvram kset sb/0/mcs8poexp=0
  nvram kset sb/0/mcs9poexp=0
  nvram kset sb/0/mcs10poexp=0
  nvram kset sb/0/mcs11poexp=0
  # [5G]
  nvram kset 1:maxp5gb0a0=102
  nvram kset 1:maxp5gb0a1=102
  nvram kset 1:maxp5gb0a2=102
  nvram kset 1:maxp5gb0a3=102
  nvram kset 1:maxp5gb1a0=102
  nvram kset 1:maxp5gb1a1=102
  nvram kset 1:maxp5gb1a2=102
  nvram kset 1:maxp5gb1a3=102
  nvram kset 1:maxp5gb2a0=102
  nvram kset 1:maxp5gb2a1=102
  nvram kset 1:maxp5gb2a2=102
  nvram kset 1:maxp5gb2a3=102
  nvram kset 1:maxp5gb3a0=102
  nvram kset 1:maxp5gb3a1=102
  nvram kset 1:maxp5gb3a2=102
  nvram kset 1:maxp5gb3a3=102
  nvram kset 1:maxp5gb4a0=102
  nvram kset 1:maxp5gb4a1=102
  nvram kset 1:maxp5gb4a2=102
  nvram kset 1:maxp5gb4a3=102
  nvram kset 1:maxp5gb5a0=102
  nvram kset 1:maxp5gb5a1=102
  nvram kset 1:maxp5gb5a2=102
  nvram kset 1:maxp5gb5a3=102
  nvram kset 1:maxp5gb6a0=102
  nvram kset 1:maxp5gb6a1=102
  nvram kset 1:maxp5gb6a2=102
  nvram kset 1:maxp5gb6a3=102
  nvram kset 1:mcsbw205glpo=0x87643210
  nvram kset 1:mcsbw405glpo=0x87643210
  nvram kset 1:mcsbw805glpo=0x87654210
  nvram kset 1:mcsbw1605glpo=0x98765310
  nvram kset 1:mcs1024qam5glpo=0xDBDBAAA9
  nvram kset 1:mcsbw205gmpo=0x87643210
  nvram kset 1:mcsbw405gmpo=0x87643210
  nvram kset 1:mcsbw805gmpo=0x87654210
  nvram kset 1:mcsbw1605gmpo=0x98765310
  nvram kset 1:mcs1024qam5gmpo=0xDBDBAAA9
  nvram kset 1:mcsbw205ghpo=0x87643210
  nvram kset 1:mcsbw405ghpo=0x87643210
  nvram kset 1:mcsbw805ghpo=0x87654210
  nvram kset 1:mcsbw1605ghpo=0x98765310
  nvram kset 1:mcs1024qam5ghpo=0xDBDBAAA9
  nvram kset 1:mcsbw205gx1po=0x87643210
  nvram kset 1:mcsbw405gx1po=0x87643210
  nvram kset 1:mcsbw805gx1po=0x87654210
  nvram kset 1:mcsbw1605gx1po=0x98765310
  nvram kset 1:mcs1024qam5gx1po=0xDBDBAAA9
  nvram kset 1:mcsbw205gx2po=0x87643210
  nvram kset 1:mcsbw405gx2po=0x87643210
  nvram kset 1:mcsbw805gx2po=0x87654210
  nvram kset 1:mcsbw1605gx2po=0x98765310
  nvram kset 1:mcs1024qam5gx2po=0xDBDBAAA9
  nvram kset 1:mcsbw205gx3po=0x98765310
  nvram kset 1:mcsbw405gx3po=0x98765310
  nvram kset 1:mcsbw805gx3po=0x98765310
  nvram kset 1:mcsbw1605gx3po=0x98765310
  nvram kset 1:mcs1024qam5gx3po=0xBBBBBBBB
  nvram kset 1:mcsbw205gx4po=0xA9765420
  nvram kset 1:mcsbw405gx4po=0xA9765420
  nvram kset 1:mcsbw805gx4po=0xA9765420
  nvram kset 1:mcsbw1605gx4po=0x87654200
  nvram kset 1:mcs1024qam5gx4po=0xBBBBBBBB
  nvram kset 1:mcs8poexp=0
  nvram kset 1:mcs9poexp=0
  nvram kset 1:mcs10poexp=0
  nvram kset 1:mcs11poexp=0
  # [6G]
  nvram kset sb/1/maxp5gb0a0=102
  nvram kset sb/1/maxp5gb0a1=102
  nvram kset sb/1/maxp5gb1a0=102
  nvram kset sb/1/maxp5gb1a1=102
  nvram kset sb/1/maxp5gb2a0=102
  nvram kset sb/1/maxp5gb2a1=102
  nvram kset sb/1/maxp5gb3a0=102
  nvram kset sb/1/maxp5gb3a1=102
  nvram kset sb/1/maxp5gb4a0=102
  nvram kset sb/1/maxp5gb4a1=102
  nvram kset sb/1/maxp5gb5a0=102
  nvram kset sb/1/maxp5gb5a1=102
  nvram kset sb/1/maxp5gb6a0=102
  nvram kset sb/1/maxp5gb6a1=102
  nvram kset sb/1/mcsbw205glpo=0xEDBA8710
  nvram kset sb/1/mcsbw405glpo=0xFEDB9710
  nvram kset sb/1/mcsbw805glpo=0xFDCA8810
  nvram kset sb/1/mcsbw1605glpo=0xEDBA9710
  nvram kset sb/1/mcs1024qam5glpo=0x0F2F0FFF
  nvram kset sb/1/mcslr5glpo=0x0000
  nvram kset sb/1/mcsbw205gmpo=0xBB986510
  nvram kset sb/1/mcsbw405gmpo=0xDDDA7510
  nvram kset sb/1/mcsbw805gmpo=0xCBA99810
  nvram kset sb/1/mcsbw1605gmpo=0xCCA98610
  nvram kset sb/1/mcs1024qam5gmpo=0x0DFDDDCC
  nvram kset sb/1/mcslr5gmpo=0x0000
  nvram kset sb/1/mcsbw205ghpo=0xBB986510
  nvram kset sb/1/mcsbw405ghpo=0xDDDA7510
  nvram kset sb/1/mcsbw805ghpo=0xCBA99810
  nvram kset sb/1/mcsbw1605ghpo=0xCCA98610
  nvram kset sb/1/mcs1024qam5ghpo=0x0DFDDDCC
  nvram kset sb/1/mcslr5ghpo=0x0000
  nvram kset sb/1/mcsbw205gx1po=0xBB986510
  nvram kset sb/1/mcsbw405gx1po=0xDDDA7510
  nvram kset sb/1/mcsbw805gx1po=0xCBA99810
  nvram kset sb/1/mcsbw1605gx1po=0xCCA98610
  nvram kset sb/1/mcs1024qam5gx1po=0x0DFDDDCC
  nvram kset sb/1/mcslr5gx1po=0x0000
  nvram kset sb/1/mcsbw205gx2po=0xBB986510
  nvram kset sb/1/mcsbw405gx2po=0xDDDA7510
  nvram kset sb/1/mcsbw805gx2po=0xCBA99810
  nvram kset sb/1/mcsbw1605gx2po=0xCCA98610
  nvram kset sb/1/mcs1024qam5gx2po=0x0DFDDDCC
  nvram kset sb/1/mcslr5gx2po=0x0000
  nvram kset sb/1/mcsbw205gx3po=0xBB986510
  nvram kset sb/1/mcsbw405gx3po=0xDDDA7510
  nvram kset sb/1/mcsbw805gx3po=0xCBA99810
  nvram kset sb/1/mcsbw1605gx3po=0xCCA98610
  nvram kset sb/1/mcs1024qam5gx3po=0x0DFDDDCC
  nvram kset sb/1/mcslr5gx3po=0x0000
  nvram kset sb/1/mcsbw205gx4po=0xEDCB9810
  nvram kset sb/1/mcsbw405gx4po=0xEEDB9810
  nvram kset sb/1/mcsbw805gx4po=0xDDCB9810
  nvram kset sb/1/mcsbw1605gx4po=0xEECBA810
  nvram kset sb/1/mcs1024qam5gx4po=0x00FFFEEE
  nvram kset sb/1/mcslr5gx4po=0x0000
  nvram kset sb/1/mcs8poexp=0
  nvram kset sb/1/mcs9poexp=0
  nvram kset sb/1/mcs10poexp=0x80000000
  nvram kset sb/1/mcs11poexp=0xFE020200

  nvram kcommit; sync

#<<PEGA Shane: Add for 6GHz AX mode 256QAM only by referring to RAX28
UBOOT_ENV_MODEL=/proc/environment/model
if  [ -e $UBOOT_ENV_MODEL ]; then
    MODEL="$(cat $UBOOT_ENV_MODEL)"
    if [ "$MODEL" == "RAXE290" ];  then
        WIFI_BOARDFLAGS4=`nvram kget sb/1/boardflags4`
        IS256QAM=$((WIFI_BOARDFLAGS4 & 0x800))
        if [ $IS256QAM -eq 0 ];  then
            NEW_WIFI_BOARDFLAGS4=$((WIFI_BOARDFLAGS4 | 0x800))
            HEX_DIGITS="0123456789abcdef"
            until [ $NEW_WIFI_BOARDFLAGS4 == 0 ]; do
              rem_v=$((NEW_WIFI_BOARDFLAGS4 % 16))
              NEW_WIFI_BOARDFLAGS4=$((NEW_WIFI_BOARDFLAGS4 / 16))
              hex_d=${HEX_DIGITS:$rem_v:1}
              NEW_WIFI_BOARDFLAGS4_IN_HEX="${hex_d}${NEW_WIFI_BOARDFLAGS4_IN_HEX}"
            done
            nvram kset sb/1/boardflags4=0x$NEW_WIFI_BOARDFLAGS4_IN_HEX
            nvram kcommit
            sync
        fi
    fi
fi
#PEGA>>

# PCIe Wireless Card Status - bad card detection
pwlcs_preload()
{
  # Check if PWLCS is enabled or not
  # 0/not present - Disabled
  # N             - Enabled for N cards (N is generally 2 or 3)
  # Also need to compile DHD with DSLCPE_PWLCS flag
  MAXPWLCS=`nvram kget pwlcsmaxcrd`
  if [ "$MAXPWLCS" == "" ];  then
    MAXPWLCS=0
  fi

  if [ $MAXPWLCS != 0 ];  then
    echo "PWLCS:: DHD pre-load processing ..."
    needcommit=0
    card=0
    panic_on_oops=`cat /proc/sys/kernel/panic_on_oops`

    #disable panic_on_oops to stop auto rebooting on dhd fail
    echo 0 > /proc/sys/kernel/panic_on_oops

    # Initialize card status to GOOD, if not present
    while [ $card -lt $MAXPWLCS ]
    do
      status=`nvram kget pwlcspcie$card`
      if [ "$status" == "" ];  then
        echo "PWLCS:: PCIe[$card] status intializing to GOOD"
        nvram kset pwlcspcie$card="GOOD"
        needcommit=1
      fi
      echo "PWLCS:: PCIe[$card] pre-load status = $status"
      card=$(($card+1))
    done

    # Commit changes if needed
    if [ $needcommit == 1 ];  then
      nvram kcommit
      sync
    fi
  fi
}

pwlcs_postload()
{
  if [ $MAXPWLCS != 0 ];  then
    echo "PWLCS:: DHD post-load processing ..."
    needcommit=0
    card=0

    # Get the updated card status changed by DHD
    while [ $card -lt $MAXPWLCS ]
    do
      status=`nvram kget pwlcspcie$card`
      echo "PWLCS:: PCIe[$card] post-load status = $status"

      # Save and commit driver changes to the nvram
      nvram kset pwlcspcie$card="$status"
      nvram kcommit
      sync

      #restore the panic_on_oops for the rest of the system
      echo $panic_on_oops > /proc/sys/kernel/panic_on_oops

      # Check if card is a bad card
      case "$status" in
        *BOOT*)
          ifexists=`cat /proc/net/dev |grep wl$card`
          set -- $ifexists
          if [ "$1" == "" ];  then
            echo "==============================================================================="
            echo "Detected bad WLAN card on PCIe$card, rebooting system"
            echo "==============================================================================="
            # Trigger magic Sys Request reboot for fast reboot
            echo b > /proc/sysrq-trigger
          fi
        ;;
      esac
      card=$(($card+1))
    done
  fi
}

# to get instance base mixed with dhd and wl
get_unit()
{
#   selection method - first available unit

    for unit in $UNITLIST; do
        wlx=`cat /proc/net/dev |grep wl$unit`
        if [ -z "$wlx" ]; then
            break
        fi
    done

     echo "$unit"
}

# create dummy network interfaces for power down units
wldpdctl_init()
{
  if [ ! -z $CPEROUTER ]; then
    if [ ! -z $CONFIG_WLDPDCTL ]; then
      WLDPDCTL=$(nvram kget wl_dpdctl_enable)
    fi
  fi

  if [ -z $WLDPDCTL ]; then
    WLDPDCTL=0
  fi

  if [ $WLDPDCTL = 1 ]; then
    for unit in $UNITLIST; do
      pwrdn=`nvram kget wl${unit}_dpd`
      if [[ -z "$pwrdn" ]]; then
        pwrdn="0"
      fi
      if [ "$pwrdn" = "1" ]; then
        ip link add wl$unit type dummy
        echo "Created dummy network interface wl$unit"
      fi
    done
  fi
}

# remove dummy network interfaces for power down units
wldpdctl_deinit()
{
  if [ ! -z $CPEROUTER ]; then
    if [ ! -z $CONFIG_WLDPDCTL ]; then
      WLDPDCTL=$(nvram kget wl_dpdctl_enable)
    fi
  fi

  if [ -z $WLDPDCTL ]; then
    WLDPDCTL=0
  fi

  if [ $WLDPDCTL = 1 ]; then
    intfl=`cat /proc/net/dev | grep " wl" | cut -d ":" -f1`
    for intf in $intfl; do
      noarp=`ifconfig $intf | grep NOARP`
      if [[ -z "$noarp" ]]; then
        dummy="0"
      else
        dummy="1"
      fi
      if [ "$dummy" = "1" ]; then
        ip link delete $intf
        echo "Deleted dummy network interface $intf"
      fi
    done
  fi
}

# Load given WLAN drivers
# modules_list contains the list of drivers to be loaded
load_modules()
{

        # set the default module list and parameters
        # check whether the module exists or not before adding
        # set the module parameters based on hnd (cperouter) or wlemf (legacy)
        if [ ! -z $CPEROUTER ]; then
            #CPE Router
            dhd_module_params="iface_name=wl dhd_console_ms=$dhd_console_ms"
            wl_module_params="intf_name=wl%d"
            echo " ####  mfg mode:$is_mfg ########"
            if [ $is_mfg -gt 0 ]; then
                dhd_module_params=$dhd_module_params" firmware_path=$MFG_FW_PATH"
            fi
        else
            #Legacy
            dhd_module_params="iface_name=wl dhd_console_ms=0 firmware_path=/etc/wlan/dhd mfg_firmware_path=/etc/wlan/dhd/mfg dhd_dpc_prio=5"
            wl_module_params="intf_name=wl%d"
        fi

        wldpdctl_init

        echo "loading WLAN kernel modules ... $modules_list"

        for module in $modules_list
        do
            case "$module" in
                firmware_class)
                    if [ -f /lib/modules/$KERNELVER/kernel/drivers/base/firmware_loader/firmware_class.ko ]; then
                       insmod /lib/modules/$KERNELVER/kernel/drivers/base/firmware_loader/firmware_class.ko
                    fi
                    ;;
                cfg80211)
                    insmod /lib/modules/$KERNELVER/kernel/net/wireless/$module.ko
                    ;;
                wlemf|emf|igs)
                    #no module parameters
                    module_params=""
                    ;;
                hnd)
                    module_params=""
                    if  [ $is_mfg -gt 0 ] && [ -f /lib/modules/$KERNELVER/extra/hnd_mfgtest.ko ]; then
                        module="hnd_mfgtest"
                    fi
                    ;;
                wl)
                    module_params=$wl_module_params
                    if  [ $is_mfg -gt 0 ] && [ -f /lib/modules/$KERNELVER/extra/wl_mfgtest.ko ]; then
                        module="wl_mfgtest"
                    fi
                    ;;
                dhd)
                    module_params=$dhd_module_params
                    ;;
                wlshared)
                    module_params=""
                    ;;
                *)
                    echo "wlan-drivers: unrecognized module [$module] in the load module list"
                    module_params=""
                    ;;
            esac

            if [ "$module" == "dhd" ] || [ "$module" == "wl" ] || [ "$module" == "wl_mfgtest" ]; then
                idx=`get_unit`
                instance_base="instance_base=$idx"
                module_params=$module_params" "$instance_base
            fi

            if [ -e /lib/modules/$KERNELVER/extra/$module.ko ]; then
                if [ "$module" == "dhd" ]; then
                    pwlcs_preload
                    insmod /lib/modules/$KERNELVER/extra/$module.ko $module_params
                    pwlcs_postload
                else
                    nic_nvram=`nvram kget wl_path`
                    if [ "$module" == "wl" ] && [ -f "$nic_nvram" ] ; then
                        echo "*** wl$idx Using alternate nic driver from $nic_nvram"
                        insmod $nic_nvram $module_params
                    else
                        insmod /lib/modules/$KERNELVER/extra/$module.ko $module_params
                    fi
                fi
            fi
        done

        # Configuing wlan related threads
        wlaffinity auto
}

# Unload given WLAN drivers
# modules_list contains the list of drivers to be loaded
unload_modules()
{
    echo "unloading WLAN kernel modules ... $unload_modules_list"

    for module in $unload_modules_list
    do
        echo unload $module
        rmmod $module.ko
    done

    wldpdctl_deinit
}


# Check for arguments.
# User should give atleast one argument to the program.
if [ $# -lt 1 ]; then
    echo "Usage: $0 operation [module] ..."
    echo "       operation:  start, stop, restart"
    echo "       [module]:   WLAN kernel module"
    exit 64
fi

# Do nothing for hnd only builds (HNDROUTER=y and CPEROUTER=)
if [ ! -z $HNDROUTER ]; then
    if [ -z $CPEROUTER ]; then
        echo "Skipping wlan-drivers.sh for HND images ..."
        exit 0
    fi
fi

# Do nothing for WLAN BTEST builds
WLAN_BTEST_FILEPATH=/proc/brcm/blxparms/wlan_btest
if  [ -e $WLAN_BTEST_FILEPATH ]; then
    btest_mode=$(cat $WLAN_BTEST_FILEPATH)
    btest_mode=${btest_mode:1}
    #nvram kset btest_mode=$btest_mode
    #nvram kcommit
else
    btest_mode=`nvram kget wlan_btest`
fi
if [ "$btest_mode" == "1" ];  then
    echo "Skipping wlan-drivers.sh since the kernel nvram wlan_btest=1"
    exit 0
fi
if [ "$WLAN_BTEST" == "y" ]; then
    if [ -f /usr/sbin/utelnetd ] ; then
        /usr/sbin/utelnetd -d
    fi
    echo "Skipping wlan-drivers.sh for BTEST images ..."
    exit 0
fi

# Sanity check for drivers directory
if [ ! -d /lib/modules/$KERNELVER/extra ]; then
    echo "ERROR: wlan-drivers.sh: /lib/modules/$KERNELVER/extra does not exist" 1>&2
    exit 1
fi

# Get the modules list
# Check argument2 first, then nvram, then default based on image
if [ ! -z "$2" ]; then
    modules_list=$2
    unload_modules_list=$modules_list
else
    if [ ! -z $CPEROUTER ]; then
        if [ -f /lib/modules/$KERNELVER/kernel/net/wireless/cfg80211.ko ]; then
            all_wlan_modules="firmware_class cfg80211 hnd emf igs dhd wl"
        else
            all_wlan_modules="hnd emf igs dhd wl"
        fi
    else
        all_wlan_modules="wlemf dhd wl"
    fi

    # add wlshared module
    if [ -f /lib/modules/$KERNELVER/extra/wlshared.ko ]; then
        all_wlan_modules="wlshared $all_wlan_modules"
    fi

    # Update the wlan module list from nvram if exists
    is_nvmodules_list=`nvram show 2>&1 |grep kernel_mods | grep -c '^'`
    if [ $is_nvmodules_list -eq '0' ]; then
        echo "no modules list in nvram, using defaults..."
        modules_list=$all_wlan_modules
    else
        modules_list=`nvram kget kernel_mods`
    fi
    for module in $modules_list
    do
        unload_modules_list="$module $unload_modules_list";
    done
fi

# Parse the first argument
case "$1" in
    start)
        load_modules
        exit 0
        ;;

    stop)
        unload_modules
        exit 0
        ;;

    restart)
        unload_modules
        sleep 3
        load_modules
        exit 0
        ;;

    *)
        echo "wlan-drivers: unrecognized option [$1]"
        exit 1
        ;;
esac
