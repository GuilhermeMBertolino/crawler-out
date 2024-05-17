: '
/*
 * Copyright (c) 2022  Qualcomm Technologies, Inc.
 *
 * All Rights Reserved.
 * Confidential and Proprietary - Qualcomm Technologies, Inc.
 */
'

#!/bin/ash

if [ ! -e "/sys/bus/platform/devices/40ff000.dcc" ]; then
	echo "DCC is not enabled"
	exit 1
fi

#Configuration for APP0 Tprobe
MEMNOC_APP0_TENUREPROBE_BASE=0x400400
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x8)) w 0x0
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x120)) w 0x40000000
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x128)) w 0xffffffff
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x138)) w 0x1f
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x20)) w 0x8
devmem $((MEMNOC_APP0_TENUREPROBE_BASE+0x168)) w 0x3f

#Configuration for SYS0 Tprobe
MEMNOC_SYS0_TENUREPROBE_BASE=0x400600
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x8)) w 0x0
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x120)) w 0x40000000
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x128)) w 0xffffffff
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x138)) w 0x1f
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x20)) w 0x16
devmem $((MEMNOC_SYS0_TENUREPROBE_BASE+0x168)) w 0x3f

#Configuration for SYS1 Tprobe
MEMNOC_SYS1_TENUREPROBE_BASE=0x400A00
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x8)) w 0x0
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x120)) w 0x40000000
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x128)) w 0xffffffff
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x138)) w 0x1f
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x20)) w 0x7
devmem $((MEMNOC_SYS1_TENUREPROBE_BASE+0x168)) w 0x3f

#Configuration for WCSS_Q6 Tprobe
MEMNOC_WCSS_Q6_TENUREPROBE_BASE=0x400800
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x8)) w 0x0
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x120)) w 0x40000000
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x128)) w 0xffffffff
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x138)) w 0x1f
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x20)) w 0x64
devmem $((MEMNOC_WCSS_Q6_TENUREPROBE_BASE+0x168)) w 0x3f

MEMNOC_DBHN_TRACEPRB_BASE=0x00402000
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x8)) w 0x0
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x10)) w 0x7
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x120)) w 0x0
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x128)) w 0xffffffff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x138)) w 0x1d
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x168)) w 0x3f
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x188)) w 0x1ff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x178)) w 0x4000
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x180)) w 0xff00
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x220)) w 0x0
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x228)) w 0xffffffff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x238)) w 0x1e
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x268)) w 0x3f
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x288)) w 0x1ff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x278)) w 0x4000
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x280)) w 0xff00
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x320)) w 0x0
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x328)) w 0xffffffff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x338)) w 0x1d
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x368)) w 0x3f
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x388)) w 0x1ff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x378)) w 0x4100
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x380)) w 0xff00
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x420)) w 0x0
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x428)) w 0xffffffff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x438)) w 0x1e
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x468)) w 0x3f
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x488)) w 0x1ff
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x478)) w 0x4100
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x480)) w 0xff00
devmem $((MEMNOC_DBHN_TRACEPRB_BASE+0x8)) w 0x25

SNOC_MEMNOC0_TRACEPRB_BASE=0x581800
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x8)) w 0x0
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x10)) w 0x7
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x120)) w 0x0
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x128)) w 0xffffffff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x138)) w 0x1d
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x140)) w 0xf
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x168)) w 0x3f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x188)) w 0x1ff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x220)) w 0x0
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x228)) w 0xffffffff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x238)) w 0x1e
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x240)) w 0xf
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x268)) w 0x3f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x288)) w 0x1ff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x320)) w 0x0
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x328)) w 0xffffffff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x338)) w 0x1f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x340)) w 0xf
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x368)) w 0x3f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x388)) w 0x1ff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x420)) w 0x0
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x428)) w 0xffffffff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x438)) w 0x1f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x440)) w 0xf
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x468)) w 0x3f
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x488)) w 0x1ff
devmem $((SNOC_MEMNOC0_TRACEPRB_BASE+0x8)) w 0x25

SNOC_MEMNOC1_TRACEPRB_BASE=0x583000
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x8)) w 0x0
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x10)) w 0x7
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x120)) w 0x0
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x128)) w 0xffffffff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x138)) w 0x1d
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x140)) w 0xf
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x168)) w 0x3f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x188)) w 0x1ff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x220)) w 0x0
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x228)) w 0xffffffff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x238)) w 0x1e
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x240)) w 0xf
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x268)) w 0x3f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x288)) w 0x1ff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x320)) w 0x0
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x328)) w 0xffffffff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x338)) w 0x1f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x340)) w 0xf
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x368)) w 0x3f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x388)) w 0x1ff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x420)) w 0x0
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x428)) w 0xffffffff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x438)) w 0x1f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x440)) w 0xf
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x468)) w 0x3f
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x488)) w 0x1ff
devmem $((SNOC_MEMNOC1_TRACEPRB_BASE+0x8)) w 0x25

MEMNOC_DTB_TRACEPRB_BASE=0x00402800
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x8)) w 0x0
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x10))  w 0x7
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x100)) w 0x77
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x104)) w 0x77
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x118)) w 0xff
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x120)) w 0x3
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x200)) w 0x22
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x204)) w 0x22
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x218)) w 0xff
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x220)) w 0x3
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x300)) w 0x55
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x304)) w 0x55
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x318)) w 0xff
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x320)) w 0x3
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x400)) w 0x77
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x404)) w 0x77
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x418)) w 0xff
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x420)) w 0x3
devmem $((MEMNOC_DTB_TRACEPRB_BASE+0x8)) w 0x25

MEMNOC_EC_BASE=0x405000
devmem $((MEMNOC_EC_BASE+0x8)) w 0x0
devmem $((MEMNOC_EC_BASE+0x50)) w 0xffff
devmem $((MEMNOC_EC_BASE+0x100)) w 0x0
devmem $((MEMNOC_EC_BASE+0x180)) w  0x4a
devmem $((MEMNOC_EC_BASE+0x200)) w 0x4c
devmem $((MEMNOC_EC_BASE+0x280)) w  0x4e
devmem $((MEMNOC_EC_BASE+0x300)) w  0x50
devmem $((MEMNOC_EC_BASE+0x380)) w  0x40
devmem $((MEMNOC_EC_BASE+0x400)) w  0x42
devmem $((MEMNOC_EC_BASE+0x480)) w  0x44

SNOC_EC_BASE=0x582000
devmem $((SNOC_EC_BASE+0x8)) w  0x0
devmem $((SNOC_EC_BASE+0x50)) w 0xffff
devmem $((SNOC_EC_BASE+0x100)) w 0x0
devmem $((SNOC_EC_BASE+0x180)) w 0x28
devmem $((SNOC_EC_BASE+0x200)) w 0x2a
devmem $((SNOC_EC_BASE+0x280)) w 0x2c
devmem $((SNOC_EC_BASE+0x300)) w 0x2e
devmem $((SNOC_EC_BASE+0x380)) w 0x32
devmem $((SNOC_EC_BASE+0x400)) w 0x34
devmem $((SNOC_EC_BASE+0x480)) w 0x36
devmem $((SNOC_EC_BASE+0x500)) w 0x38

echo 0 > /sys/bus/platform/devices/40ff000.dcc/enable
echo 1 > /sys/bus/platform/devices/40ff000.dcc/config_reset
echo 1 > /sys/bus/platform/devices/40ff000.dcc/curr_list

#Configure the MAINCTL for APP0, SYS0, SYS1, WCSS_Q6
echo "0x400408 0x126" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400608 0x126" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400A08 0x126" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400808 0x126" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x405008 0x5" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x582008 0x5" > /sys/bus/platform/devices/40ff000.dcc/config_write


echo 4095 > /sys/bus/platform/devices/40ff000.dcc/loop
for i in $(seq 0 1 89)
do
	echo "0x040FF000 1024" > /sys/bus/platform/devices/40ff000.dcc/config_write
done
echo 1 > /sys/bus/platform/devices/40ff000.dcc/loop

#APP0 Counters
echo "0x400420 0x17" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS0 Counters
echo "0x400620 0x17" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS1 Counters
echo "0x400A20 0x17" > /sys/bus/platform/devices/40ff000.dcc/config
#WCSS Q6 Counters
echo "0x400820 0x17" > /sys/bus/platform/devices/40ff000.dcc/config

#Stop the Tprobe
echo "0x400410 0x1" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400408 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400610 0x1" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400608 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400A10 0x1" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400A08 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400810 0x1" > /sys/bus/platform/devices/40ff000.dcc/config_write
echo "0x400808 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write
#Stop the memnoc event counter
echo "0x405008 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write
#Stop the snoc event counter
echo "0x582008 0x0" > /sys/bus/platform/devices/40ff000.dcc/config_write

#Read the LatMax for all ports
echo "0x400480 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
echo "0x400680 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
echo "0x400A80 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
echo "0x400880 0x1" > /sys/bus/platform/devices/40ff000.dcc/config

#Read MEMNOC Event counters
#memnoc cycle counter
echo "0x405140 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#APP0 read byte counter
echo "0x4051c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#APP0 write byte counter
echo "0x405240 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#Q6 read byte counter
echo "0x4052c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#Q6 write byte counter
echo "0x405340 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#DDR total read+write byte counter
echo "0x4053c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#DDR total read  byte counter
echo "0x405440 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#DDR total write byte counter
echo "0x4054c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config

#Read SNOC Event counters
#snoc cycle counter
echo "0x582140 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS0 read byte counter
echo "0x5821c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS0 write byte counter
echo "0x582240 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS0 read+write byte counter
echo "0x5822c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS1 read byte counter
echo "0x5823c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS1 write  byte counter
echo "0x582440 0x1" > /sys/bus/platform/devices/40ff000.dcc/config
#SYS1 read+write byte counter
echo "0x5824c0 0x1" > /sys/bus/platform/devices/40ff000.dcc/config

echo 1 > /sys/bus/platform/devices/40ff000.dcc/enable
echo 1 > /sys/bus/platform/devices/40ff000.dcc/trigger

#Copy the DCC SRAM buffer to parse the counters
cp /dev/dcc_sram /tmp/tprobe_counters.bin

if [ -e "/tmp/tprobe_counters.bin" ]; then
	echo "Tenure Probe counters collected in /tmp/tprobe_counters.bin"
else
	echo "Failed to collect the Tenureprobe counters"
fi
