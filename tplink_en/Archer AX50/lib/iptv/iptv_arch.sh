
# Copyright (C) 2011-2014 TP-LINK

#### Notice: global variable defined in this file can't be changed

#
# vlan id generation method type
# 0 : generate nothing(initial value)
# 1 : generate single vlan tag automaticly
# 2 : generate dual vlan tag automaticly
# 3 : generate in specific way
# 
gen_vid_mode=0

#
# wan interface vlan id generation method type
# 0 : generate nothing for internet tag off mode
# 1 : generate internet vlan interface for internet tag off mode
# 
gen_wan_vid_mode=0

#
# disable vlan id conflict with iptv wan vids set when gen_vid_mode is 1/2/3
# 0 : not to solve conflict vid generated
# 1 : need to solve conflict vid generated(initial value)
#
disable_conflict=1

#
# specific vlan id sequence to lan port which effect when gen_vid_mode is 3 or 4
# initial value is none
#
specific_lan_vid=""

#
# specific tx vlan id sequence to lan port which effect when gen_vid_mode is 4
# initial value is none
#
specific_lan_txvid=""

#
# Wan default vid
# initial value is 0
#
WAN_DFT_ID="0"
