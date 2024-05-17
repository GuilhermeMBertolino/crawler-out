#!/bin/sh /etc/rc.common
#Copyright (c) 2023 Qualcomm Technologies, Inc.
#All Rights Reserved.
#Confidential and Proprietary - Qualcomm Technologies, Inc.

USE_PROCD=1
start_service() {
	ifname=$1
	ctrl_path=$2
	arguments=$3
	procd_open_instance
	procd_set_param command /usr/sbin/hostapd_cli -i $ifname -p $ctrl_path $arguments
	procd_set_param stderr 1
	procd_close_instance
}
