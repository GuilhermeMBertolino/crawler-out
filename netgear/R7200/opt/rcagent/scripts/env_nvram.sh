#!/bin/sh
#Script is setting up readycloud_nvram variables needed to register device in cloud

readycloud_nvram set readycloud_fetch_url="https://readycloud.netgear.com/device/entry"
readycloud_nvram set readycloud_hook_url="https://readycloud.netgear.com/device/hook"
readycloud_nvram set readycloud_upload_url="https://readycloud.netgear.com/directio"

#readycloud_nvram set readycloud_fetch_url="https://readycloud-test3.netgear.com/device/entry"
#readycloud_nvram set readycloud_hook_url="https://readycloud-test3.netgear.com/device/hook"
#readycloud_nvram set readycloud_upload_url="https://readycloud-test3.netgear.com/directio"

#set up variables for readycloud_control
readycloud_nvram set rcagent_path="/opt/rcagent"
readycloud_nvram set readycloud_control_path="/opt/rcagent/scripts"
readycloud_nvram set remote_path="/opt/remote"
readycloud_nvram set leafp2p_path="/opt/leafp2p"
readycloud_nvram set readydrop_path="/opt/readydrop"

readycloud_nvram set readycloud_use_xcloud=1
readycloud_nvram set readycloud_use_lantry=1
readycloud_nvram set rcagent_log_to_console=0
readycloud_nvram set rcagent_log_level=error
#readycloud_nvram set rcagent_log_level=trace
readycloud_nvram set rcagent_log_to_file=1

readycloud_nvram set x_claimed_url="https://registration.ngxcld.com/registration/status"
readycloud_nvram set	x_register_url="https://registration.ngxcld.com/registration/register"
readycloud_nvram set x_advisor_url="https://advisor.ngxcld.com/advisor/direct"
readycloud_nvram set x_discovery_url="https://presence.ngxcld.com/presence/presence"
readycloud_nvram set genie_remote_url="https://genieremote.netgear.com/genie-remote/claimDevice"
readycloud_nvram set genie_remote_certificate="/opt/xagent/certs/ca-bundle-mega.crt"
readycloud_nvram set x_handler_1003="/opt/xagent/genie_handler"
readycloud_nvram set x_handler_1004="127.0.0.1:10101"
readycloud_nvram set genie_soap_port="80"
#readycloud_nvram set readycloud_hostname=""
#readycloud_nvram set readycloud_password=""
readycloud_nvram set leafp2p_remote_url="http://peernetwork.netgear.com/peernetwork/services/LeafNetsWebServiceV2"
readycloud_nvram set leafp2p_service_0="RouterRemote,0,1,1,0,1,6:135,6:136,6:137,6:138,6:139,6:445,6:548,17:135,17:136,17:137,17:138,17:139,17:445,17:548"
readycloud_nvram set leafp2p_peer_router_type="1"
readycloud_nvram set leafp2p_replication_url="https://readyshare.netgear.com/device/entry"
#readycloud_nvram set leafp2p_run="1"
readycloud_nvram set leafp2p_sys_prefix="/opt/remote"
#readycloud_nvram set leafp2p_rescan_devices="1"
#readycloud_nvram set leafp2p_debug="0"
#readycloud_nvram set leafp2p_connection_method_type="2"
#readycloud_nvram set leafp2p_peer_route_type="1"
readycloud_nvram set leafp2p_replication_hook_url="https://readyshare.netgear.com/device/hook"
#readycloud_nvram set leafp2p_firewall="0"
#readycloud_nvram set leafp2p_services="1"
#readycloud_nvram set share_api_user0=
#readycloud_nvram set share_api_user1=
#readycloud_nvram set share_api_user2=
#readycloud_nvram set share_api_user3=
#readycloud_nvram set share_api_user4=
#readycloud_nvram set share_api_user5=
#readycloud_nvram set share_api_user6=
#readycloud_nvram set share_api_user7=
#readycloud_nvram set share_api_user8=
#readycloud_nvram set share_api_user9=
#readycloud_nvram set share_api_data0=
#readycloud_nvram set share_api_data1=
#readycloud_nvram set share_api_data2=
#readycloud_nvram set share_api_data3=
#readycloud_nvram set share_api_data4=
#readycloud_nvram set share_api_data5=
#readycloud_nvram set share_api_data6=
#readycloud_nvram set share_api_data7=
#readycloud_nvram set share_api_data8=
#readycloud_nvram set share_api_data9=
#internet API
readycloud_nvram set readycloud_need_persist=1
readycloud_nvram set genie_remote_need_persist=1

readycloud_nvram commit
