#!/bin/sh

# Copyright (c) 2020 Shenzhen TP-LINK Technologies Co.Ltd.
#
# wangxiaolong@tp-link.com.cn
# 2020-11-18
# Content:
#	Create for mtk wireless-script
# 	This is a default extend-script, should be put in /lib/wifi

special_mac_set() {
	echo special_mac_set $@ > $STDOUT

	local vif=$1

	#参考case： 【TP-LINK】AX23v1(MR7621+MT7905+MT7975) 新版FW 0406个别信道EVM差
	#对于mt7915, 为了过SRRC/CE认证，20200710之后的fw版本中的一个修改会影响下面信道和带宽
	#11ax20 2G@ CH1~2 (bounded@2400M) /CH12~13 (bounded@2483.5)+ 11ax20 5G@CH48 (bouned@5250)
	#导致MCS11的EVM变差(-43-->-37)，产测模式和用户模式都受影响。
	#将830AB55C的 bit[31:30] 设置回 01 可以rollback 此修改。
	#认证软件中可去除此修改以保证认证顺利通过。
	mac_val_ori=`iwpriv $vif mac 830AB55C| cut -d: -f2`
	mac_val_ori=0x$mac_val_ori

	#clean bit[31:30]
	mac_val_clear=$((mac_val_ori&(~(3<<30))))
	#set bit[31:30] to 01
	mac_val_set=$((mac_val_clear|(1<<30)))
	printf "mac_val_ori:%x to mac_val_set:%x\n" $mac_val_ori $mac_val_set > $STDOUT
	iwpriv $vif mac 830AB55C=`printf "%x" $mac_val_set`
}