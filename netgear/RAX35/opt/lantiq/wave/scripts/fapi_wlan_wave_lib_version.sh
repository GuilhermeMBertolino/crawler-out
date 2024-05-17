#!/bin/sh
# Update the version information for version.sh execution
# This script is executed by version.sh script in UGW

[ -e /etc/wave_components.ver ] && . /etc/wave_components.ver
[ -e /etc/iwlwav_driver.ver ] && . /etc/iwlwav_driver.ver
[ -e /etc/iwlwav_hostap.ver ] && . /etc/iwlwav_hostap.ver
[ -e /etc/iwlwav_iw.ver ] && . /etc/iwlwav_iw.ver
[ -e /etc/iwlwav_tools.ver ] && . /etc/iwlwav_tools.ver

echo "Wave wlan version: $wave_release_minor"
[ -n "$wave_driver_ver" ] && echo "Wave wlan driver version: $wave_driver_ver"
[ -n "$iwlwav_driver_hash" ] && echo "Wave wlan driver hash: $iwlwav_driver_hash"
[ -n "$iwlwav_hostap_hash" ] && echo "Wave wlan hostap hash: $iwlwav_hostap_hash"
[ -n "$iwlwav_tools_hash" ] && echo "Wave wlan tools hash: $iwlwav_tools_hash"
[ -n "$iwlwav_iw_hash" ] && echo "Wave wlan iw hash: $iwlwav_iw_hash"
[ -n "$wave_mac_ver" ] && echo "Wave wlan MAC FW version: $wave_mac_ver"
[ -n "$wave_tx_sender_ver" ] && echo "Wave wlan tx_sender version: $wave_tx_sender_ver"
[ -n "$wave_rx_handler_ver" ] && echo "Wave wlan rx_handler version: $wave_rx_handler_ver"
[ -n "$wave_host_interface_ver" ] && echo "Wave wlan host_interface version: $wave_host_interface_ver"
[ -n "$wave_tx_sender_gen5b_ver" ] && echo "Wave wlan tx_sender_gen5b version: $wave_tx_sender_gen5b_ver"
[ -n "$wave_rx_handler_gen5b_ver" ] && echo "Wave wlan rx_handler_gen5b version: $wave_rx_handler_gen5b_ver"
[ -n "$wave_host_interface_gen5b_ver" ] && echo "Wave wlan host_interface_gen5b version: $wave_host_interface_gen5b_ver"
[ -n "$wave_tx_sender_gen6_ver" ] && echo "Wave wlan tx_sender_gen6 version: $wave_tx_sender_gen6_ver"
[ -n "$wave_rx_handler_gen6_ver" ] && echo "Wave wlan rx_handler_gen6 version: $wave_rx_handler_gen6_ver"
[ -n "$wave_host_interface_gen6_ver" ] && echo "Wave wlan host_interface_gen6 version: $wave_host_interface_gen6_ver"
[ -n "$wave_tx_sender_gen6b_ver" ] && echo "Wave wlan tx_sender_gen6b version: $wave_tx_sender_gen6b_ver"
[ -n "$wave_rx_handler_gen6b_ver" ] && echo "Wave wlan rx_handler_gen6b version: $wave_rx_handler_gen6b_ver"
[ -n "$wave_host_interface_gen6b_ver" ] && echo "Wave wlan host_interface_gen6b version: $wave_host_interface_gen6b_ver"
[ -n "$wave_tx_sender_gen6d2_ver" ] && echo "Wave wlan tx_sender_gen6d2 version: $wave_tx_sender_gen6d2_ver"
[ -n "$wave_rx_handler_gen6d2_ver" ] && echo "Wave wlan rx_handler_gen6d2 version: $wave_rx_handler_gen6d2_ver"
[ -n "$wave_host_interface_gen6d2_ver" ] && echo "Wave wlan host_interface_gen6d2 version: $wave_host_interface_gen6d2_ver"
[ -n "$wave_ar10_progmodel_ver" ] && echo "Wave wlan AR10 PROGMODEL version: $wave_ar10_progmodel_ver"
[ -n "$wave500_progmodel_ver" ] && echo "Wave wlan Wave500 PROGMODEL version: $wave500_progmodel_ver"
[ -n "$wave500B_progmodel_ver" ] && echo "Wave wlan Wave500B PROGMODEL version: $wave500B_progmodel_ver"
[ -n "$wave600_progmodel_ver" ] && echo "Wave wlan Wave600 PROGMODEL version: $wave600_progmodel_ver"
[ -n "$wave600B_progmodel_ver" ] && echo "Wave wlan Wave600B PROGMODEL version: $wave600B_progmodel_ver"
[ -n "$wave600D2_progmodel_ver" ] && echo "Wave wlan Wave600D2 PROGMODEL version: $wave600D2_progmodel_ver"
[ -n "$wave_fpga_sim_ver" ] && echo "FPGA SIM version: $wave_fpga_sim_ver"
[ -n "$wave_psd_ver" ] && echo "Wave wlan PSD version: $wave_psd_ver"
[ -n "$wave_scripts_ver" ] && echo "Wave wlan scripts version: $wave_scripts_ver"
[ -n "$wave_regulatory_ver" ] && echo "Wave wlan regulatory version: $wave_regulatory_ver"