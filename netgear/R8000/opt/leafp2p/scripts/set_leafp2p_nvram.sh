#-------------------------------------------------------------------------
#  Copyright 2019, Foxconn
#  Author: Joe Tu
#-------------------------------------------------------------------------

#!/bin/sh
nvram set leafp2p_remote_url=https://peernetwork.netgear.com/peernetwork/services/LeafNetsWebServiceV2
nvram set leafp2p_service_0=RouterRemote,0,1,1,1,1,6:135,6:136,6:137,6:138,6:139,6:445,6:548,17:135,17:136,17:137,17:138,17:139,17:445,17:548
nvram set leafp2p_replication_url=https://readyshare.netgear.com/device/entry
nvram set leafp2p_run=0
nvram set leafp2p_sys_prefix=/opt/remote
nvram set leafp2p_rescan_devices=1
nvram set leafp2p_path=/opt/leafp2p
nvram set leafp2p_replication_hook_url=https://readyshare.netgear.com/device/hook
nvram set leafp2p_firewall=0
nvram set leafp2p_services=1
nvram set leafp2p_log_type=1
nvram set leafp2p_log_file_name=/tmp/leafd.log
nvram set leafp2p_debug=5
nvram set leafp2p_log_entry_limit=10000
nvram set leafp2p_log_entry_flush=1

nvram commit
