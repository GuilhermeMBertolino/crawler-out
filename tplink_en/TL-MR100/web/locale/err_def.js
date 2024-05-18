var NO_ERROR=0,CMM_ERROR=1,CMM_RSL_CONFLICT_KEY=1001,CMM_CFG_FILE_TOO_LONG=4500,CMM_CFG_FILE_FORMAT_ERR=4501,CMM_UPDATE_FILE_LEN_ERR=4502,CMM_UPDATE_FILE_VER_ERR=4503,CMM_GET_SIGN_ERR=4504,CMM_RESTORE_DEFAULT_CFG_ERR=4505,CMM_UPDATE_ADDI_HW_VER_ERR=4506,CMM_APP_PORT_ALREADY_IN_USE=4620,CMM_APP_PORT_CONFLICT_WITH_PORT_MAPPING=4622,CMM_APP_PORT_CONFLICT_WITH_PORT_TRIGGER=4623,CMM_APP_PORT_CONFLICT_WITH_DMZ=4624,CMM_APP_PORT_CONFLICT_WITH_UPNP_PORT_MAPPING=4625,CMM_PORT_CONFLICT_WITH_REMOTE_HTTP_SERVICE=4626,CMM_PORT_CONFLICT_WITH_REMOTE_HTTPS_SERVICE=4627,CMM_PORT_CONFLICT_WITH_REMOTE_FTP_SERVICE=4628,CMM_PORT_CONFLICT_WITH_REMOTE_SFTP_SERVICE=4629,CMM_PORT_CONFLICT_WITH_REMOTE_STORAGE_HTTP_SERVICE=4630,CMM_PORT_CONFLICT_WITH_CWMP_SERVICE=4631,CMM_PORT_CONFLICT_WITH_OPENVPN_SERVICE=4632,CMM_PORT_CONFLICT_WITH_PPTPVPN_SERVICE=4633,CMM_FW_ILLEGAL_IP=4700,CMM_FW_NOT_LAN_IP=4701,CMM_FW_LAN_IP=4702,CMM_FW_ILLEGAL_PORT=4703,CMM_FW_ILLEGAL_MAC=4704,CMM_FW_EMPTY_INTERNAL_HOST=4705,CMM_FW_EMPTY_EXTERNAL_HOST=4706,CMM_FW_EMPTY_TASK_SCHEDULE=4707,CMM_FW_EMPTY_RULE=4708,CMM_FW_ILLEGAL_RULE=4709,CMM_FW_CONFLICT_INTERNAL_HOST=4710,CMM_FW_CONFLICT_EXTERNAL_HOST=4711,CMM_FW_CONFLICT_TASK_SCHEDULE=4712,CMM_FW_CONFLICT_RULE=4713,CMM_FW_EMPTY_URL=4714,CMM_FW_REACH_MAX_URL=4715,CMM_FW_REQ_DENY=4716,CMM_FW_SET_TIMER_ERROR=4717,CMM_FW_MALLOC_RULE_FAILED=4718,CMM_FW_SET_DEFAULT_ACTION_FAILED=4719,CMM_FW_SET_URL_FAILED=4720,CMM_PC_INHOST_IS_NOT_MAC=4721,CMM_PC_EXHOST_IS_NOT_URL=4722,CMM_PC_MAC_IS_SAME_WITH_PARENT_MAC=4723,CMM_FW_NAME_INCLUDE_INVALID_CHAR=4724,CMM_FW_NAME_END_WITH_SPACE=4725,CMM_FW_INVILID_URL=4726,CMM_PC_MAC_IS_SAME_WITH_CHILD_MAC=4727,CMM_FW_RULE_REACH_MAX=4728,CMM_PC_RULE_REACH_MAX=4729,CMM_TC_DOWN_BANDWIDTH=4800,CMM_TC_UP_BANDWIDTH=4801,CMM_TC_CONFLICT=4802,CMM_TC_START_IP_ERROR=4803,CMM_TC_END_IP_ERROR=4804,CMM_TC_DOWN_TOTAL_BW=4805,CMM_TC_UP_TOTAL_BW=4806,CMM_TC_UP_TOTAL_BW_VOIP=4807,CMM_TC_VOIP_BW_ZERO=4808,CMM_IQOS_UP_BW_SMALL=4810,CMM_IQOS_DOWN_BW_SMALL=4811,CMM_IQOS_CONFLITCT_RULE=4812,CMM_IQOS_BANDWIDTH_ERR=4813,CMM_IQOS_RULE_PORT_FORMAT_ERR=4814,CMM_TC_MAX_ERROR=4849,CMM_QOS_EMPTY_QUEUE=4850,CMM_QOS_WRR_TOTALBW_ZERO=4851,CMM_QOS_MAX_PRIO=4852,CMM_QOS_SAME_QUEUE_NAME=4853,CMM_QOS_SAME_QUEUE_PRIO=4854,CMM_QOS_MAX_QUEUE_WEIGHT=4855,CMM_QOS_SCH_NOT_SUPPORTED=4856,CMM_QOS_SAME_APP_NAME=4857,CMM_QOS_NONEXIST_APP_INTF=4858,CMM_QOS_NOT_WAN_APP_INTF=4859,CMM_QOS_NONEXIST_APP_QUEUE=4860,CMM_QOS_NONEXIST_CLS_INTF=4861,CMM_QOS_NONEXIST_CLS_QUEUE=4862,CMM_QOS_EMPTY_CLS_INGRESS_INTF=4863,CMM_QOS_SAME_CLS_NAME=4864,CMM_QOS_SAME_CLS_CRITERION=4865,CMM_QOS_CLS_SRC_IP_NON_LAN=4866,CMM_QOS_CLS_DEST_IP_LAN=4867,CMM_QOS_CLS_SRC_IP_LAN=4868,CMM_QOS_CLS_DEST_IP_NON_LAN=4869,CMM_QOS_INTF_INVALID=4870,CMM_DMZ_IP_NOT_IN_LAN_SUBNET=4903,CMM_DMZ_IP_SAME_AS_LAN_IP=4904,CMM_PVPN_PORT_CONFLICT_WITH_DMZ=4905,CMM_OVPN_PORT_CONFLICT_WITH_DMZ=4906,CMM_VS_INVALID_LOCAL_IP_PARAM=4930,CMM_VS_PROTO_TYPE_ERR=4931,CMM_VS_ADD_NEW_INTERNAL_ERR=4932,CMM_VS_DEL_OLD_INTERNAL_ERR=4933,CMM_VS_RECORD_ALREADY_FULL=4934,CMM_VS_RECORD_ALREADY_EXIST=4935,CMM_VS_PORT_OUT_RANGE=4936,CMM_VS_IP_NOT_IN_LAN_SUBNET=4937,CMM_VS_CONFLICT_REMOTE_WEB_PORT=4938,CMM_VS_IP_SAME_AS_LAN_IP=4940,CMM_PVPN_PORT_CONFLICT_WITH_VS=4950,CMM_OVPN_PORT_CONFLICT_WITH_VS=4951,CMM_PT_RECORD_ALREADY_FULL=4970,CMM_PT_OPEN_PROTO_TYPE_ERR=4971,CMM_PT_TRIG_PROTO_TYPE_ERR=4972,CMM_PT_TRIG_PORT_CONFLICT=4973,CMM_PT_TRIG_PORT_OUT_RANGE=4974,CMM_PT_OPEN_PORT_OUT_RANGE=4975,CMM_PT_ADD_NEW_INTERNAL_ERR=4976,CMM_PT_DEL_OLD_INTERNAL_ERR=4977,CMM_PT_RECORD_ALREADY_EXIST=4978,CMM_PT_OPEN_PROTO_FORMAT_ERR=4979,CMM_PVPN_PORT_CONFLICT_WITH_PT=4980,CMM_OVPN_PORT_CONFLICT_WITH_PT=4981,CMM_LAN_IP_ERR=5e3,CMM_LAN_MASK_ERR=5001,CMM_LAN_IP_MASK_DISMATCH=5002,CMM_LAN_IP_IN_THE_SAME_SUBNET_WITH_WAN=5003,CMM_LAN_IP_IN_THE_SAME_SUBNET_WITH_OTHER_LAN=5004,CMM_LAN_UNEXPECT_EXISTING_LAN_IP_AND_MASK=5005,CMM_DHCPS_SRV_MIN_ADDR_ERR=5010,CMM_DHCPS_SRV_MAX_ADDR_ERR=5011,CMM_DHCPS_SRV_GATEWAY_ADDR_ERR=5012,CMM_DHCPS_SRV_DNS1_ADDR_ERR=5013,CMM_DHCPS_SRV_DNS2_ADDR_ERR=5014,CMM_DHCPS_SRV_RELAY_SRV_ADDR_ERR=5015,CMM_DHCPS_SRV_RELAY_SRV_ADDR_EMPTY=5016,CMM_DHCPS_SRV_MIN_ADDR_NOT_IN_THE_SAME_SUBNET=5017,CMM_DHCPS_SRV_MAX_ADDR_NOT_IN_THE_SAME_SUBNET=5018,CMM_DHCPS_SRV_GATEWAY_ADDR_NOT_IN_THE_SAME_SUBNET=5019,CMM_DHCPS_FIX_MAP_MAC_ADDR_ERR=5020,CMM_DHCPS_FIX_MAP_IP_ADDR_ERR=5021,CMM_DHCPS_FIX_MAP_IP_NOT_IN_THE_SAME_SUBNET=5022,CMM_DHCPS_FIX_MAP_MAC_CONFLICT=5023,CMM_DHCPS_FIX_MAP_IP_CONFLICT=5024,CMM_DHCPS_FIX_MAP_IP_SAME_AS_LAN_IP=5025,CMM_DHCPS_CONDITIONAL_POOL_DEVICE_NAME_EMPTY=5030,CMM_DHCPS_CONDITIONAL_POOL_VID_EMPTY=5031,CMM_DHCPS_CONDITIONAL_POOL_MIN_ADDR_ERR=5032,CMM_DHCPS_CONDITIONAL_POOL_MAX_ADDR_ERR=5033,CMM_DHCPS_CONDITIONAL_POOL_IPRouters_ADDR_ERR=5034,CMM_DHCPS_CONDITIONAL_POOL_DNS1_ADDR_ERR=5035,CMM_DHCPS_CONDITIONAL_POOL_DNS2_ADDR_ERR=5036,CMM_DHCPS_CONDITIONAL_POOL_MIN_ADDR_NOT_IN_THE_SAME_SUBNET=5038,CMM_DHCPS_CONDITIONAL_POOL_MAX_ADDR_NOT_IN_THE_SAME_SUBNET=5039,CMM_DHCPS_CONDITIONAL_POOL_GATEWAY_ADDR_NOT_IN_THE_SAME_SUBNET=5040,CMM_DHCPS_CONDITIONAL_POOL_DEVICE_NAME_CONPLICT=5041,CMM_DHCPS_CONDITIONAL_POOL_VID_CONPLICT=5042,CMM_DHCPS_CONDITIONAL_POOL_POOLS_CONPLICT=5043,CMM_DHCPS_CONDITIONAL_POOL_OPTION_CODE_INVALID=5044,CMM_DHCPS_CONDITIONAL_POOL_OPTION_VALUE_EMTPY=5045,CMM_DHCPS_CONDITIONAL_POOL_VID_ERR=5046,CMM_DHCPS_SRV_IP_NOT_BE_LAN_IP=5047,CMM_DEFAULT_ROUTE_NAME_ERR=5100,CMM_STATIC_ROUTE_DEST_IP_ERR=5101,CMM_STATIC_ROUTE_DEST_SUB_ERR=5102,CMM_STATIC_ROUTE_GATEWAY_ERR=5103,CMM_STATIC_ROUTE_SUB_DISMATCH_IP=5104,CMM_STATIC_ROUTE_DEST_CONFLICT_LAN=5105,CMM_STATIC_ROUTE_DEST_CONFLICT_WAN=5106,CMM_STATIC_ROUTE_ENTRY_CONFLICT=5107,CMM_STATIC_ROUTE_NOT_SAME_NET=5108,CMM_STATIC_ROUTE_NAME_ERR=5109,CMM_STATIC_ROUTE_CONN_ERR=5110,CMM_DNS_DEFAULT_NAME_ERR=5200,CMM_DNS_SET_ERR=5201,CMM_DDNS_PH_START_ERROR=5210,CMM_DDNS_PH_CFG_MSG_ERROR=5211,CMM_DDNS_PH_RT_MSG_ERROR=5212,CMM_DDNS_PH_STATE_GET_ERROR=5213,CMM_DDNS_PH_USR_ERROR=5214,CMM_DDNS_PH_PWD_ERROR=5215,CMM_DDNS_PH_NO_RUN=5216,CMM_DYNDNS_USERNAME_ERROR=5217,CMM_DYNDNS_PASSWORD_ERROR=5218,CMM_DYNDNS_USERDOMAIN_ERROR=5219,CMM_DYNDNS_SERVER_ERROR=5220,CMM_NOIPDNS_USERNAME_ERROR=5221,CMM_NOIPDNS_PASSWORD_ERROR=5222,CMM_NOIPDNS_USERDOMAIN_ERROR=5223,CMM_NOIPDNS_SERVER_ERROR=5224,CMM_USERDEFINE_UPDATEURL_ERROR=5225,CMM_UDDNS_USERNAME_ERROR=5226,CMM_UDDNS_PASSWORD_ERROR=5227,CMM_UDDNS_USERDOMAIN_ERROR=5228,CMM_UDDNS_URL_LONG_ERROR=5229,CMM_SNTP_SET_ERR=5300,CMM_SNTP_YEAR_ERR=5303,CMM_SNTP_MONTH_ERR=5304,CMM_SNTP_DAY_ERR=5305,CMM_SNTP_HOUR_ERR=5306,CMM_SNTP_MONUTES_ERR=5307,CMM_SNTP_SECONDS_ERR=5308,CMM_DST_START_INVALID=5310,CMM_DST_END_INVALID=5311,CMM_DST_CFG_INVALID=5312,CMM_ARP_BIND_ENTRY_OVERFLOW=5400,CMM_ARP_BIND_ENTRY_CONFLICT_WHEN_EDIT=5401,CMM_ARP_BIND_ENTRY_CONFLICT_WHEN_IMPORT=5402,CMM_ARP_BIND_ENTRY_IP_ADDR_ERR=5403,CMM_ARP_BIND_ENTRY_MAC_ADDR_ERR=5404,CMM_ARP_BIND_ENTRY_STATE_ERR=5405,CMM_ARP_BIND_ENTRY_IP_NOT_IN_LAN_SUBNET=5406,CMM_ARP_BIND_ADD_SYS_ENTRY_FAILED=5407,CMM_ARP_BIND_DEL_SYS_ENTRY_FAILED=5408,CMM_ARP_BIND_SET_SYS_ENTRY_FAILED=5409,CMM_ARP_BIND_PARAM_FORMAT_ERR=5410,CMM_WANDETECT_ALREADY_START=5511,CMM_IPTV_INVALIED_VCI=5520,CMM_IPTV_INVALIED_VPI=5521,CMM_IPTV_INVALIED_LANPORT=5522,CMM_IPTV_BR_NOTIN_GROUP=5523,CMM_IPTV_LAN_NOTIN_GROUP=5524,CMM_IPTV_LANPORT_ALREADY_USED=5525,CMM_IPTV_ETHWAN_NOT_ENABLE=5526,CMM_IPTV_LANPORT_EMPTY=5527,CMM_IPTV_IP_IN_SAME_SUBNET_WITH_WAN=5528,CMM_IPTV_INVALIED_VLAN_ENABLE=5529,CMM_IPTV_INVALIED_VLAN_ID=5530,CMM_IPTV_INVALIED_VLAN_PR=5531,CMM_ETHWAN_INTF_NOTIN_DFTGROUP=5550,CMM_ETHWAN_INTF_NAME_IS_NULL=5551,CMM_ETHWAN_VIR_PORTS_IS_NOT_EN=5552,CMM_ETHWAN_LANPORT_ALREADY_USED=5554,CMM_ETHWAN_INTF_NOT_EXIST=5555,CMM_WAN_DSL_SCR_INVAD=5570,CMM_WAN_DSL_PCR_INVAD=5571,CMM_WAN_DSL_SCR_LARGER_THAN_PCR=5572,CMM_WAN_DSL_MBS_INVAD=5573,CMM_WAN_DSL_CFG_HAS_NO_INTF=5574,CMM_WAN_DSL_ERR_LINKTYPE=5575,CMM_WAN_INVALID_AC_TYPE=5650,CMM_WAN_LINK_CFG_IFNAME_NULL=5651,CMM_WAN_NO_LINK_CFG_OBJ=5652,CMM_WAN_UNKNOWN_CONN_TYPE=5653,CMM_WAN_CAL_FAKE_MAC_FAILED=5654,CMM_WAN_INVALID_VID=5655,CMM_WAN_VID_CONFLICT=5656,CMM_WAN_NO_VID_CONFLICT=5657,CMM_WAN_IP_BOOL_FORMAT_ERROR=5700,CMM_WAN_IP_PARAM_NOT_VALID_VALUE=5701,CMM_WAN_IP_INVALID_IP_ADDR_FORMAT=5702,CMM_WAN_IP_IFNAME_ERROR=5703,CMM_WAN_IP_MAC_ADDR_ERROR=5704,CMM_WAN_IP_CLONE_MAC_ADDR_ERROR=5705,CMM_WAN_IP_MAC_OVERRIDE_ERROR=5706,CMM_WAN_IP_MAC_CLONE_ERROR=5707,CMM_WAN_IP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5708,CMM_WAN_IP_DNS_ADDR_ERROR=5709,CMM_WAN_IP_IP_ADDR_ERROR=5710,CMM_WAN_IP_GATEWAY_ADDR_ERROR=5711,CMM_STATIC_IP_INTF_ERR=5712,CMM_IPOA_NONE_SINGLE_PVC_MULTI_CONN=5713,CMM_WAN_IPOA_INTF_ERROR=5717,CMM_WAN_L2TP_BOOL_FORMAT_ERROR=5800,CMM_WAN_L2TP_PARAM_NOT_VALID_VALUE=5801,CMM_WAN_L2TP_IP_INVALID_IP_ADDR_FORMAT=5802,CMM_WAN_L2TP_PPP_INVALID_IP_ADDR_FORMAT=5803,CMM_WAN_L2TP_IFNAMEIP_ERROR=5804,CMM_WAN_L2TP_L2IFNAME_ERROR=5805,CMM_WAN_L2TP_MAC_ADDR_ERROR=5806,CMM_WAN_L2TP_CLONE_MAC_ADDR_ERROR=5807,CMM_WAN_L2TP_MAC_OVERRIDE_ERROR=5808,CMM_WAN_L2TP_MAC_CLONE_ERROR=5809,CMM_WAN_L2TP_IP_DNS_ADDR_ERROR=5810,CMM_WAN_L2TP_IP_IP_ADDR_ERROR=5811,CMM_WAN_L2TP_PPP_IP_ADDR_ERROR=5812,CMM_WAN_L2TP_IP_GATEWAY_ADDR_ERROR=5813,CMM_WAN_L2TP_PPP_GATEWAY_ADDR_ERROR=5814,CMM_WAN_L2TP_IP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5815,CMM_WAN_L2TP_PPP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5816,CMM_WAN_L2TP_ALREADY_EXIST=5817,CMM_WAN_PPTP_BOOL_FORMAT_ERROR=5850,CMM_WAN_PPTP_PARAM_NOT_VALID_VALUE=5851,CMM_WAN_PPTP_IP_INVALID_IP_ADDR_FORMAT=5852,CMM_WAN_PPTP_PPP_INVALID_IP_ADDR_FORMAT=5853,CMM_WAN_PPTP_IFNAMEIP_ERROR=5854,CMM_WAN_PPTP_L2IFNAME_ERROR=5855,CMM_WAN_PPTP_MAC_ADDR_ERROR=5856,CMM_WAN_PPTP_CLONE_MAC_ADDR_ERROR=5857,CMM_WAN_PPTP_MAC_OVERRIDE_ERROR=5858,CMM_WAN_PPTP_MAC_CLONE_ERROR=5859,CMM_WAN_PPTP_IP_DNS_ADDR_ERROR=5860,CMM_WAN_PPTP_IP_IP_ADDR_ERROR=5861,CMM_WAN_PPTP_PPP_IP_ADDR_ERROR=5862,CMM_WAN_PPTP_IP_GATEWAY_ADDR_ERROR=5863,CMM_WAN_PPTP_PPP_GATEWAY_ADDR_ERROR=5864,CMM_WAN_PPTP_IP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5865,CMM_WAN_PPTP_PPP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5866,CMM_WAN_PPTP_ALREADY_EXIST=5867,CMM_PPP_BOOL_FORMAT_ERROR=5900,CMM_PPP_PARAM_NOT_VALID_VALUE=5901,CMM_INVALID_PPP_ADDR_FORMAT=5902,CMM_PPP_INTF_ERROR=5903,CMM_PPP_MAC_OVERRIDE_ERROR=5904,CMM_PPP_MAC_CLONE_ERROR=5905,CMM_WAN_EXCEED_LIMITED_NUM=5906,CMM_WAN_NO_DSL_INTF_ERROR=5907,CMM_PPPOA_NONE_SINGLE_PVC_MULTI_CONN=5908,CMM_WAN_PPP_IP_IN_THE_SAME_SUBNET_WITH_LAN=5909,CMM_WAN_INVALID_DNS=5910,CMM_WAN_NO_PPPOA_INTF=5911,CMM_WAN_PPPOA_ASSIGN_PVC_FAIL=5912,CMM_WAN_PPPOA_NO_DSL_CFG=5913,CMM_WAN_GENERATE_MAC_FAILED=5914,CMM_WAN_UNKOWN_PPP_CONN_TYPE=5915,CMM_PPP_NO_ETH_CFG_INTF=5916,CMM_PPP_SEC_CONN_PARAM_NOT_VALID_VALUE=5918,CMM_WAN_PPP_SEC_CONN_IP_IN_THE_SAME_SUBNET_WITH_LAN=5919,CMM_WAN_PPP_SEC_CONN_IP_ADDR_ERROR=5920,CMM_USB_MORE_ALIVE_DEV=6100,CMM_USB_MORE_ALIVE_LOG=6101,CMM_USB_VOLUME_UMOUNT_FAIL=6102,CMM_USB_NOBODY_ERROR=6103,CMM_USB_ILLEGAL_FOLDER_PATH=6104,CMM_USB_3G_UNLOCK_PIN_CODE_FAIL=6110,CMM_USB_3G_FILE_TOO_LONG=6111,CMM_USB_3G_FILE_FORMAT_ERR=6112,CMM_USB_3G_TOO_MANY_ENTRIES=6113,CMM_USB_3G_UPLOAD_PARSE_FAILED=6114,CMM_USB_3G_ENTRY_ALREADY_EXIST=6115,CMM_USB_3G_MODEM_ENTRIES_FULL=6116,CMM_USB_SERVER_NAME_LENGTH=6117,CMM_USB_SELECT_VOLUME=6118,CMM_USB_BROWSE_FOLDER_PATH=6119,CMM_USB_NO_DEVICE=6120,CMM_ROUTE6_ADDR_VALID=6200,CMM_ROUTE6_DEFAULT_ROUTE_NAME_ERR=6201,CMM_ROUTE6_PREFIX_LEN_VALID=6210,CMM_ROUTE6_ENTRY_DUPLICATE=6211,CMM_ROUTE6_DEST_CONFLICT_LAN=6212,CMM_ROUTE6_GW_PFX_NOT_SAME_WITH_WAN=6213,CMM_ROUTE6_GW_PFX_NOT_SAME_WITH_LAN=6214,CMM_ROUTE6_DEST_IP_ERR=6215,CMM_ROUTE6_GATEWAY_ERR=6216,CMM_ROUTE6_CONN_ERR=6217,CMM_ROUTE6_DEST_CONFLICT_WAN=6218,CMM_WAN6_CONN_TYPE_INVALID=6220,CMM_TUNNEL6_6RD_PREFIX_INVALID=6230,CMM_LTEWAN_SEND_AT_ERR=6600,CMM_LTEWAN_PIN_VALID=6601,CMM_LTEWAN_PUK_VALID=6602,CMM_VOIP_FEATURE_CODE_LEN_ERROR=7003,CMM_VOIP_FEATURE_CODE_STRING_ERROR=7004,CMM_VOIP_FEATURE_CODE_CONFLICT_ERROR=7005,CMM_VOIP_FORBIDDEN_CALL_CONFLICT=7006,CMM_VOIP_DIALPLAN_CONFLICT=7007,CMM_VOIP_PROFILE_CONFLICT_ERROR=7009,CMM_VOIP_NUM_AND_REGISTRAR_CONFLICT_ERROR=7010,CMM_VOIP_HS_NAME_EMPTY=7011,CMM_VOIP_HS_NAME_CONFLICT=7012,CMM_VOIP_CONTACT_INVALID=7013,CMM_VOIP_CONTACT_CONFLICT=7014,CMM_DECT_HANDSET_BUSY=7100,CMM_DECT_BASE_BUSY=7101,CMM_DECT_BASE_DISABLE=7106,CMM_VOICEAPP_ENDPT_BUSY=7200,CMM_VOICEAPP_BASE_BUSY=7201,CMM_VOICEAPP_BASE_DISABLE=7202,CMM_VOICEAPP_NAMEPWD_CONFLICT=7203,CMM_TELEBOOK_FILE_FORMAT_ERR=7300,CMM_TELEBOOK_FILE_SIZE_ERR=7301,CMM_WLAN_PARAM_CONFLICTE=7500,CMM_WLAN_INVALID_PARAM_VALUE=7501,CMM_WLAN_SSID_CONFLICTE=7503,CMM_WLAN_MACFILTER_ADDR_CONFLICT=7504,CMM_WLAN_SSID_CONFLICTE_WITH_GUESTNET=7505,CMM_WLAN_READ_DEFAULT_PIN_FAILED=7508,CMM_WLAN_SSID_HIDE_WPS_CONFLICT=7510,CMM_WLAN_INVALID_GROUP_KEY_PERIOD=7511,CMM_SPEEDTEST_DISCONNECTED=7601,CMM_SPEEDTEST_NOCONNECTION=7602,CMM_SPEEDTEST_INVALID_PARAM=7603,CMM_WAKE_ON_LAN_MAC_CONFLICT=7701,CMM_TUNNEL_NAME_ALREADY_EXITS=7800,CMM_TUNNEL_LOCAL_IP_SHOULD_IN_LAN=7801,CMM_TUNNEL_REMOTE_IP_CONFLICT_LAN=7802,CMM_OVPN_PORT_CONFLICT=7810,CMM_OVPN_SUBNET_CONFLICT_WITH_LAN=7813,CMM_OVPN_SUBNET_CONFLICT_WITH_PVPN=7814,CMM_LANIP_CONFLICT_WITH_OVPN=7815,CMM_PVPN_SUBNET_CONFLICT_WITH_LAN=7820,CMM_PVPN_SUBNET_CONFLICT_WITH_OVPN=7821,CMM_LANIP_CONFLICT_WITH_PVPN=7823,CMM_DMZ_CONFLICT_WITH_PVPN=7824,CMM_PT_CONFLICT_WITH_PVPN=7825,CMM_VS_CONFLICT_WITH_PVPN=7826,CMM_DMZ_CONFLICT_WITH_OVPN=7827,CMM_PT_CONFLICT_WITH_OVPN=7828,CMM_VS_CONFLICT_WITH_OVPN=7829,CMM_UPNP_CONFLICT_WITH_PVPN=7830,CMM_UPNP_CONFLICT_WITH_OVPN=7831,CMM_EMAILADDR_INVAD=8e3,CMM_AUTH_USER_EMPTY=8001,CMM_AUTH_PWD_EMPTY=8002,CMM_SMTPSERV_ADDR_INVAD=8003,CMM_RECEIVER_EMAILADDR_INVAD=8004,CMM_METHOD_NOT_SUPPORTED=9e3,CMM_REQUEST_DENIED=9001,CMM_INTERNAL_ERROR=9002,CMM_INVALID_ARGUMENTS=9003,CMM_RESOURCE_EXCEEDED=9004,CMM_INVALID_PARAM_NAME=9005,CMM_INVALID_PARAM_TYPE=9006,CMM_INVALID_PARAM_VALUE=9007,CMM_INVALID_CONFIG_FILE=9802,CMM_OBJECT_NOT_FOUND=9804,CMM_INSTANCE_NOT_FOUND=9805,CMM_OBJECT_BUF_EXCEEDED=9808,CMM_REACH_MAX_INSTANCE_NUM=9812,CMM_INVALID_STRING_LENGTH=9014,ERR_HTTP_BASE=71e3,HTTP_ERR_FORMAT=71011,ERR_HTTP_ERR_GET=71012,ERR_HTTP_ERR_SET=71013,ERR_HTTP_ERR_CGI_INVALID_FORMAT=71014,ERR_HTTP_ERR_CGI_INVALID_OP=71015,ERR_HTTP_ERR_CGI_INVALID_CGI=71016,ERR_HTTP_ERR_CGI_INVALID_ANSI=71017,ERR_HTTP_ERR_IO=71111,ERR_HTTP_ERR_SOFT_UP=71211,ERR_HTTP_ERR_ISP_UP=71212,ERR_HTTP_ERR_ISP_NEWEST=71213,ERR_HTTP_ERR_CONF_UP=71221,ERR_HTTP_ERR_USER_TYPE=71231,ERR_HTTP_ERR_USER_CMM_ARG=71232,ERR_HTTP_ERR_USER_PWD_NOT_CORRECT=71233,ERR_HTTP_ERR_USER_WEB_ARG=71234,ERR_HTTP_ERR_TOOL_GET_IPMAC=71241,HTTP_ERR_TELEBOOK_UP=71311,ERR_UNKOWN=8e4,ERR_EXIT=80001,ERR_NONE_FILE=80002,ERR_GET=80011,ERR_SET=80012,ERR_NUM_INVAD=80101,ERR_NUM_OUTRANGE=80102,ERR_STR_NOT_ASCII=80201,ERR_IP_FORMAT=80301,ERR_IP_BROADCAST=80302,ERR_IP_SUBNETA_NET_0=80303,ERR_IP_LOOPBACK=80304,ERR_IP_SUBNETC_HOST_255=80305,ERR_IP_MULTICAST=80306,ERR_IP_PRESERVED=80307,ERR_MASK_INVAD=80308,ERR_IPMASK_SUBNET_INVAD=80309,ERR_IPMASK_HOST_INVAD=80310,ERR_IPGW_NOT_SAME_SUBNET=80311,ERR_GATEWAY_IP_FORMAT=80312,ERR_MAC_FORMAT=80401,ERR_MAC_ZERO=80402,ERR_MAC_BROADCAST=80403,ERR_MAC_MULTICAST=80404,ERR_FILE_NOT_FOUND=80405,ERR_CWMP_URL_INVAD=84400,ERR_CWMP_PATH_INVAD=84401,ERR_CWMP_PORT_INVAD=84402,ERR_CONF_FILE_NONE=84500,ERR_FIRM_FILE_NONE=84501,ERR_ISP_FILE_NONE=84502,ERR_HAS_NO_NEW_VER=84503,ERR_NEW_VER_FIRST=84504,ERR_SERVER_DOWN=84505,ERR_ALREADY_UPGRADING=84506,ERR_START_UPGRADE=84507,ERR_NETWORK_WEAK=84508,ERR_USER_OLD_PWD_EMPTY=84600,ERR_USER_OLD_PWD_ASCII=84601,ERR_USER_NAME_EMPTY=84602,ERR_USER_NAME_ASCII=84603,ERR_USER_PWD_EMPTY=84604,ERR_USER_PWD_ASCII=84605,ERR_USER_NAME_PWD_CONFLICT=84606,ERR_USER_PWD_LEN_INVALID=84607,ERR_USER_PWD_LEN1_INVALID=84608,ERR_USER_PWD_RULES_INVALID=84609,ERR_APP_LOCAL_HOST=84620,ERR_APP_REMOTE_HOST=84621,ERR_HTTP_LOCAL_PORT=84640,ERR_HTTPS_LOCAL_PORT=84641,ERR_HTTP_HTTPS_LOCAL_CONFILICT=84642,ERR_HTTP_REMOTE_PORT=84643,ERR_HTTP_REMOTE_HTTPS_LOCAL_CONFILICT=84644,ERR_HTTPS_REMOTE_PORT=84645,ERR_HTTP_LOCAL_HTTPS_REMOTE_CONFILICT=84646,ERR_HTTP_HTTPS_REMOTE_CONFILICT=84647,ERR_TIME_YEAR_INVAD=84661,ERR_TIME_MONTH_INVAD=84662,ERR_TIME_DAY_INVAD=84663,ERR_TIME_HOUR_INVAD=84664,ERR_TIME_MINUTE_INVAD=84665,ERR_TIME_SECOND_INVAD=84666,ERR_TIME_NTP_SERVER=84667,ERR_NTP_FAIL=84668,ERR_DIAG_PACKET_SIZE=84681,ERR_DIAG_TIME_OUT=84682,ERR_DIAG_EWAN_OFF=84683,ERR_DIAG_PING_COUNT=84684,ERR_DIAG_IP_ADDR=84685,ERR_DIAG_TTL=84686,ERR_FW_ENTRYNAME_INVAD=84700,ERR_FW_URL_INVAD=84701,ERR_FW_RULE_INVAD=84702,ERR_FW_TIME_INVAD=84703,ERR_FW_URL_NULL=84704,ERR_SERVICE_FILTER_PORT_INVALID=84705,ERR_LED_SCHEDULE_TIME_INVAD=84706,ERR_FW_DEVICE_NAME_INVAD=84707,ERR_FW_DESC_NAME_INVAD=84708,ERR_FW_DEVICE_NAME_EXIST=84709,ERR_FW_DESC_NAME_EXIST=847010,ERR_TC_IP_PORT_INVAD=84800,ERR_TC_NUM_INVAD=84801,ERR_PORT_NUM_INVAD=84802,ERR_PORT_ORDER_INVAD=84803,ERR_EMPTY_START_PORT=84804,ERR_TC_IP_ORDER_INVAD=84805,ERR_TC_BW_ORDER_INVAD=84806,ERR_TC_EMPTY_START_IP=84807,ERR_TC_BW_NULL=84808,ERR_TC_BW_UP_LARGER=84809,ERR_TC_BW_DOWN_LARGER=84810,ERR_QOS_TOTALBW_INVAD=84850,ERR_QOS_TOTALBW_INVAD_SP=84851,ERR_QOS_QUEUE_DIR=84852,ERR_QOS_QUEUE_NAME=84853,ERR_QOS_QUEUE_NAME_LENGTH=84854,ERR_QOS_QUEUE_WEIGHT_NUM=84855,ERR_QOS_QUEUE_SCH=84856,ERR_QOS_CLS_NAME=84857,ERR_QOS_CLS_NAME_LENGTH=84858,ERR_QOS_CLS_INTF_INVAD=84859,ERR_MAC_MASK_INVAD=84860,ERR_QOS_EMPTY_QUEUE=84861,ERR_QOS_APP_NAME=84862,ERR_VS_PORT_INVAD=84930,ERR_FW_ADD_FAILED=84931,ERR_FTP_DATA_PORT_CONFLICT=84932,ERR_VS_INTER_PORT_INVAD=84933,ERR_LAN_IP_INVAD=85e3,ERR_LAN_MASK_INVAD=85001,ERR_LAN_IPMASK_INVAD=85002,ERR_DHCP_START_IP_INVAD=85010,ERR_DHCP_END_IP_INVAD=85011,ERR_DHCP_LEASE_INVAD=85012,ERR_DHCP_GATEWAY_INVAD=85013,ERR_DOMAIN_INVAD=85014,ERR_DHCP_DNS1_INVAD=85015,ERR_DHCP_DNS2_INVAD=85016,ERR_DHCP_RMT_SRV_EMPTY=85017,ERR_DHCP_RMT_SRV_INVAD=85018,ERR_LAN_SEC_IP_INVAD=85019,ERR_DHCP_POOL_INVAD=85020,ERR_DHCP_START_IP_INVAD_1=85021,ERR_DHCP_END_IP_INVAD_1=85022,ERR_DHCP_COND_POOL_DEV_NAME_EMPTY=85040,ERR_DHCP_COND_POOL_VID_EMPTY=85041,ERR_DHCP_COND_POOL_START_IP_INVAD=85042,ERR_DHCP_COND_POOL_END_IP_INVAD=85043,ERR_DHCP_COND_POOL_GW_INVAD=85044,ERR_DHCP_COND_POOL_OPT_VAL_EMPTY=85045,ERR_DHCP_COND_DNS1_INVAD=85046,ERR_DHCP_COND_DNS2_INVAD=85047,ERR_GATEWAY_INVAD=85048,ERR_DHCP_COND_POOL_VID_INVAD=85049,ERR_DHCP_COND_POOL_DEV_NAME_INVALID=85050,ERR_IPV4_ADDRESS=85090,ERR_IPV6_ADDRESS=85091,ERR_DNS_NAME=85092,ERR_DDNS_USERNAME_EMPTY=85200,ERR_DDNS_PWD_EMPTY=85201,ERR_DDNS_DOMAIN_INVAD=85202,ERR_DDNS_DOMAIN_EMPTY=85203,ERR_USERDEFINE_UPDATEURL=85204,ERR_ARP_CONFLICT=85401,ERR_SEL_INVAD=85402,ERR_AUTOPVC_VPI_INVAD=85501,ERR_AUTOPVC_VCI_INVAD=85502,ERR_AUTOPVC_EXSIST_INVAD=85503,ERR_IPTV_LANPORT_EMPTY=85520,ERR_DSL_MODULATION_MODE_NULL=85591,ERR_WAN_VPI_VCI_INVAD=85601,ERR_WAN_PCR_INVAD=85602,ERR_WAN_SCR_INVAD=85603,ERR_WAN_MBS_INVAD=85604,ERR_WAN_CONNECTIONTYPE_NULL=85605,ERR_WAN_CONNECTIONTYPE_INVAD=85606,ERR_WAN_MTU_INVAD=85607,ERR_WAN_DNSADDR_INVAD=85608,ERR_WAN_SECDNS_INVAD=85609,ERR_WAN_ECHOTIME_INVAD=85610,ERR_WAN_USERNAME_INVAD=85611,ERR_WAN_PWD_INVAD=85612,ERR_WAN_PPPOE_MTU_INVAD=85613,ERR_WAN_DEFGATEWAY_INVAD=85614,ERR_AUTOPVC_INVAD=85615,ERR_AUTOPVC_IP_FORMAT=85616,ERR_GROUP_INVAD=85617,ERR_INTERFACE_INVAD=85618,ERR_GROUP_NAME_INVAD=85619,ERR_PWD_INVAD=85620,ERR_USERNAME_INVAD=85621,ERR_WAN_SCR_EMPTY=85622,ERR_WAN_PCR_EMPTY=85623,ERR_WAN_SCR_LARGER_THAN_PCR=85624,ERR_WAN_INTER_GROUPNAME_INVALID=85625,ERR_WAN_MBS_EMPTY=85626,ERR_WAN_DA_SERVER_NAME_EMPTY=85627,ERR_WAN_DA_DNS_EMPTY=85628,ERR_WAN_VLAN_ID_CONFLICT=85629,ERR_WAN_VLAN_ID_INVALID=85630,ERR_WAN_VLAN_PR_INVALID=85631,ERR_CONNID_EMPTY=85632,ERR_ONLINENO_EMPTY=85633,ERR_SUFFIX_EMPTY=85634,ERR_WAN_RECONTIME_INVALID=85635,ERR_WAN_RECONTIME_EMPTY=85636,ERR_WAN_DNSADDR_LAN_CONFLICT=85637,ERR_STAIP_IP_INVAD=85700,ERR_STAIP_MASK_INVAD=85701,ERR_STAIP_GW_INVAD=85702,ERR_STAIP_IP_MASK_CONFLICT=85703,ERR_STAIP_GW_MASK_CONFLICT=85704,ERR_STAIP_IP_GW_CONFLICT=85705,ERR_STAIP_DNS1_INVAD=85706,ERR_STAIP_DNS2_INVAD=85707,ERR_IPOA_PVC_INVAD=85708,ERR_WAN_HOST_NAME_INVALID=85800,ERR_WAN_DNS_INVAD=85801,ERR_IDLETIME_INVAD=85900,ERR_PPPOA_PVC_INVAD=85901,ERR_PPPOE_HOST_UNIQ_INVAD=85902,ERR_SNMP_RCOMMUNITY_EMPTY=86e3,ERR_SNMP_SCOMMUNITY_EMPTY=86001,ERR_SNMP_TRAP_IP_INVAD=86002,ERR_USB_SHARE_NAME_EMPTY=86111,ERR_USB_SHARE_NAME_NOT_ASCII=86112,ERR_USB_INVALID_CHAR_IN_FOLDER_NAME=86113,ERR_USB_DIR_NAME_EMPTY=86114,ERR_USB_DIR_NAME_NOT_ASCII=86115,ERR_USB_DIR_EXIST=86116,ERR_USB_SHARE_NAME_EXIST=86117,ERR_USB_DIR_NOT_EXIST=86118,ERR_USB_INVALID_CHAR_IN_USER_NAME=86119,ERR_USB_CONFLICT_USER_NAME=86120,ERR_USB_FTP_PORT_EMPTY=86121,ERR_USB_FTP_PORT_NOT_NUM=86122,ERR_USB_FTP_PORT_RANGE=86123,ERR_USB_FTP_PORT_CONFLICT=86124,ERR_USB_DLNA_SERVER_NAME_EMPTY=86125,ERR_USB_DLNA_SERVER_NAME_NOT_ASCII=86126,ERR_USB_DLNA_INVALID_SERVER_NAME=86127,ERR_USB_HTTP_PORT_ERR=86129,ERR_USB_HTTP_PORT_CONFLICT=86131,ERR_USB_HTTPS_PORT_ERR=86132,ERR_USB_HTTPS_PORT_CONFLICT=86133,ERR_USB_3G_FILE_NONE=86180,ERR_IP6_WAN_CONN_NONE=86200,ERR_LAN6_PREFIX_EMPTY=86201,ERR_LAN6_PREFIX_INVALID=86202,ERR_LAN6_PREFIX_LEN_EMPTY=86203,ERR_LAN6_PREFIX_LEN_INVALID=86204,ERR_LAN6_DHCP6S_START_ID_EMPTY=86205,ERR_LAN6_DHCP6S_END_ID_EMPTY=86206,ERR_LAN6_LEASE_TIME_EMPTY=86207,ERR_LAN6_DHCP6S_START_ID_INVALID=86208,ERR_LAN6_DHCP6S_END_ID_INVALID=86209,ERR_LAN6_LEASE_TIME_INVALID=86210,ERR_LAN6_DHCP6S_ADDR_CONFLICT=86211,ERR_WAN6_IP_STACK_NONE=86220,ERR_WAN6_ADDR_INVAD=86221,ERR_WAN6_PFXLEN_INVAD=86222,ERR_WAN6_DNS_INVAD=86223,ERR_ROUTE6_DST_ADDR_VALID=86240,ERR_ROUTE6_PREFIX_LEN_VALID=86241,ERR_ROUTE6_GW_ADDR_VALID=86242,ERR_ROUTE6_GW_VALID=86243,ERR_TUNNEL6_DSLITE_REMOTE_INVALID=86250,ERR_TUNNEL6_DSLITE_WAN_CONN_ERR=86251,ERR_TUNNEL6_6RD_PREFIX_LEN_INVALID=86252,ERR_TUNNEL6_6RD_PREFIX_INVALID=86253,ERR_TUNNEL6_6RD_BR_INVALID=86254,ERR_TUNNEL6_6RD_IP_MASK_LEN_INVALID=86255,ERR_TUNNEL6_6RD_NOT_SUPPORT_AUTO=86256,ERR_TUNNEL6_6RD_WAN_CONN_ERR=86257,ERR_TUNNEL6_6TO4_WAN_CONN_ERR=86258,ERR_FW6_ADDR_INVAD=86260,ERR_FW6_PFXLEN_INVAD=86261,ERR_VOIP_ACCOUNT_MUCH_DEL_ERROR=86400,ERR_VOIP_ACCOUNT_MUCH_ADD_ERROR=86401,ERR_VOIP_PROFILE_CONFLICT_ERROR=86402,ERR_VOIP_NUM_AND_REGISTRAR_CONFLICT_ERROR=86403,ERR_VOIP_PREFIX_CONFLICT_ERROR=86404,ERR_VOIP_DEST_EMPTY_ERROR=86405,ERR_VOIP_PREFIX_MAXLEN_ERROR=86406,ERR_VOIP_STRIP_LENGTH_ERROR=86407,ERR_VOIP_INTERFACE_ENABLE_ERROR=86408,ERR_VOIP_DIALPLAN_ADD_ERROR=86409,ERR_VOIP_INTERFACE_BAR_ERROR=86410,ERR_VOIP_ENTRY_MAX_ERROR=86411,ERR_VOIP_SPEEDDIAL_CONFLICT_ERROR=86412,ERR_VOIP_USB_DISCONNECT=86413,ERR_VOIP_USB_NO_FILES_ERROR=86414,ERR_VOIP_USB_CAP_NOT_EGOUGH=86415,ERR_VOIP_DIALPLAN_DEL=86416,ERR_VOIP_TOO_MANY_DIALPLAN=86417,ERR_VOIP_USB_BUSY_ERROR=86418,ERR_VOIP_CHAR_ERROR=86419,ERR_VOIP_NOT_EMPTY=86420,ERR_VOIP_VALUE_LEN_ERROR=86421,ERR_VOIP_NUMBER_OUT_RANGE=86422,ERR_VOIP_VALUE_INVALID=86423,ERR_VOIP_VALUE_FORMAT_ERROR=86424,ERR_VOIP_CONTAIN_ILLEGAL_CHAR=86425,ERR_VOIP_INVALID_IP=86426,ERR_VOIP_EXIST_ERROR=86427,ERR_VOIP_LIST_CONFILICT=86428,ERR_VOIP_PROFILE_NAME_CONFLICT_ERROR=86429,ERR_VOIP_DECT_MUCH_ADD_ERROR=86430,ERR_VOIP_ANONYMOUS_CONFILICT_ERROR=86431,ERR_VOIP_TELEPHONE_NUMBER_LIST_FULL_ERROR=86432,ERR_VOIP_THROUGH_INCOMEING_ERROR=86433,ERR_VOIP_THROUGH_OUTGOING_ERROR=86434,ERR_VOIP_DND_TIME_ERROR=86435,ERR_VOIP_FORWARD_SELECT_ERROR=86436,ERR_VOIP_NUMBER_EMPTY_ERROR=86437,ERR_VOIP_DIAL_VIA_ERROR=86438,ERR_VOIP_THROUGHT_NUMBER_CONFLICT_ERROR=86439,ERR_VOIP_REGISTRAR_ADDRESS_EMPTY=86440,ERR_VOIP_CONTACT_CONFLICT_ERROR=86441,ERR_VOIP_CONTACT_NUMBER_EMPTY=86442,ERR_VOIP_CONTACT_NAME_EMPTY=86443,ERR_VOIP_SPEEDDIAL_TEL_NUM_EMPTY=86444,ERR_VOIP_VOICEMAIL_PIN_IS_DEFAULT=86445,ERR_VOIP_USB_NOT_AVAILABLE=86446,ERR_VOIP_USB_NO_VOICEMAIL=86447,ERR_VOIP_USB_NO_SPACE=86448,ERR_VOIP_USB_ERROR_GENERAL=86449,ERR_VOIP_USB_BACKING_UP=86450,ERR_VOIP_USB_WRITE_FAILED=86451,ERR_VOIP_USB_READ_FAILED=86452,ERR_VOIP_NUMBER_HEAD_SAME_ERROR=86453,ERR_PUSHSVC_TEST_GERNERAL=86470,ERR_PUSHSVC_TEST_TIMEOUT=86471,ERR_PUSHSVC_TEST_RESOLVE=86472,ERR_PUSHSVC_TEST_CONNECT=86473,ERR_PUSHSVC_TEST_SSL=86474,ERR_PUSHSVC_TEST_STARTTLS=86475,ERR_PUSHSVC_TEST_USER=86476,ERR_PUSHSVC_TEST_EMAIL=86477,ERR_PUSHSVC_TEST_IO=86478,ERR_PUSHSVC_TEST_RES=86479,ERR_OVPN_WAN_DISCONN=86500,ERR_OVPN_DDNS_NOTEN_WAN_CONN=86501,ERR_OVPN_DDNS_DISCONN_WAN_CONN=86502,ERR_OVPN_RECOMMEND_DDNS_EN=86503,ERR_OVPN_PORT_INVALID=86504,ERR_OVPN_PORT_EXISTS=86505,ERR_OVPN_TIME_NOT_SET=86506,ERR_PVPN_ERR_CLI_IP_ENDNUM=86507,ERR_PVPN_INVALID_USERNAME_PASSWORD=86508,ERR_OVPN_SUBNET_INVAD=86509,ERR_OVPN_NETMASK_INVAD=86510,ERR_OVPN_NETMASK_INVAD_VALUE=86511,ERR_OVPN_SUBNET_NETMASK_INVAD=86512,ERR_OVPN_CERT_NOT_GEN_EXP=86513,ERR_PVPN_ERR_CLI_IP_MORE_THAN_TEN=86514,ERR_PVPN_ERR_CLI_IP_STARTNUM_GREATER=86515,ERR_LTE_USSD_CMD_INVALID=86529,ERR_LTE_USSD_4G_ONLY_NOT_SUPPORT=86530,ERR_LTE_USSD_ISP_NOT_SUPPORT=86531,ERR_LTE_USSD_SIM_ERROR=86532,ERR_WLAN_SSID_IS_EMPTY=87500,ERR_WLAN_SSID_LEN_OUTRANGE=87501,ERR_WLAN_WDS_SSID_IS_EMPTY=87502,ERR_WLAN_WDS_SSID_LEN_OUTRANGE=87503,ERR_WLAN_WDS_BSSID_IS_EMPTY=87504,ERR_WLAN_WDS_BSSID_INVALID=87505,ERR_WLAN_WDS_ASCII_KEY_INVALID=87506,ERR_WLAN_WDS_ASCII_KEY_OUTRANGE=87507,ERR_WLAN_WDS_HEX_KEY_INVALID=87508,ERR_WLAN_WDS_HEX_KEY_OUTRANGE=87509,ERR_WLAN_WDS_PSK_OUTRANGE=87510,ERR_WLAN_WDS_AUTO_CHANNEL=87511,ERR_WLAN_WDS_CHANNEL=87512,ERR_WLAN_SSID_IS_ILLEGAL=87513,ERR_WLAN_BEACONINTERVAL_INVAD=87550,ERR_WLAN_RTSINTERVAL_INVAD=87551,ERR_WLAN_FRAGTH_INVAD=87552,ERR_WLAN_DTIMTH_INVAD=87553,ERR_WLAN_BEACONINTERVAL_OUTRANGE=87554,ERR_WLAN_RTSINTERVAL_OUTRANGE=87555,ERR_WLAN_FRAGTH_OUTRANGE=87556,ERR_WLAN_DTIMTH_OUTRANGE=87557,ERR_WLAN_PIN_EMPTY=87600,ERR_WLAN_PIN_LEGNTH_INVALID=87601,ERR_WLAN_PIN_INVALID=87602,ERR_WLAN_PIN_CHECKSUM_FAIL=87603,ERR_WLAN_11N_WEP_CONFLICT=87650,ERR_WLAN_11N_TKIP_CONFLICT=87651,ERR_WLAN_QSS_WPA_CONFLICT=87652,ERR_WLAN_QSS_TKIP_CONFLICT=87653,ERR_WLAN_QSS_WEP_CONFLICT=87654,ERR_WLAN_MSSID_WEP_CONFLICT=87655,ERR_WLAN_GUESTNETWORK_WEP_CONFLICT=87656,ERR_WLAN_QSS_CONFLICT=87657,ERR_WLAN_WIRELESS_SCHEDULE_INVALID=87658,ERR_WLAN_QSS_WPA3_CONFLICT=87759,ERR_WLAN_WEP_NO_KEY=87700,ERR_WLAN_WEP_KEY_LENGTH_INVALID=87701,ERR_WLAN_WEP_KEY_HEX_INVALID=87702,ERR_WLAN_WEP_KEY_ASCII_INVALID=87703,ERR_WLAN_WPA_PSK_EMPTY=87704,ERR_WLAN_WPA_PSK_LENGTH_INVALID=87705,ERR_WLAN_WPA_PSK_HEX_INVALID=87706,ERR_WLAN_WPA_PSK_ASCII_INVALID=87707,ERR_WLAN_WPA_INTERVAL_INVALID=87708,ERR_WLAN_WPA_PORT_INVALID=87709,ERR_WLAN_WPA_PWD_EMPTY=87710,ERR_WLAN_WPA_PWD_INVALID=87711,ERR_QS_WLAN_PWD_EMPTY=87712,ERR_QS_WLAN_PWD_LENGTH_INVALID=87713,ERR_QS_WLAN_PWD_HEX_INVALID=87714,ERR_QS_WLAN_PWD_ASCII_INVALID=87715,ERR_WLAN_WPA_PSK_SPACE_INVALID=87716,ERR_WLAN_WPA_PSK_RULES_INVALID=87717,ERR_WLAN_PWD_RULES_INVALID=87718,ERR_QS_WLAN_PWD_ENCRYPTION_NONE_2G=87730,ERR_QS_WLAN_PWD_ENCRYPTION_NONE_5G=87731,ERR_QS_WLAN_PWD_ENCRYPTION_NONE_BOTH=87732,ERR_WLAN_MAC_LIST_EMPTY=87750,ERR_WLAN_MAC_INVALID=87751,ERR_WLAN_MAC_CONFLICT=87752,ERR_WLAN_MAC_FILTER_INVALID=87753,ERR_WLAN_MAC_FILTER_DESCRIP_INVALID=87754,ERR_WLAN_5G_REGION_CHANGED=87755,ERR_WLAN_MODE_INVALID=87756,ERR_WLAN_DISABLED=87757,ERR_WLAN_CHANNEL_CONFLICTE_WITH_WDS=87758,ERR_PIN_CODE_EMPTY=89e3,ERR_PIN_ASCII=89001,ERR_PIN_CODE_CONFLICT=89002,ERR_3G_INVLIAD_DIALNUM=89003,ERR_PIN_CODE=89004,ERR_IPSEC_GW_INVALID=89201,ERR_IPSEC_LOCALIP_INVALID=89202,ERR_IPSEC_LOCALMASK_INVALID=89203,ERR_IPSEC_REMOTEIP_INVALID=89204,ERR_IPSEC_REMOTEMASK_INVALID=89205,ERR_IPSEC_PRESHAREDKEY_INVALID=89206,ERR_IPSEC_PHASE1_KEYLIFETIME_INVALID=89207,ERR_IPSEC_PHASE2_KEYLIFETIME_INVALID=89208,ERR_IPSEC_MANUAL_ENKEY_INVALID=89209,ERR_IPSEC_AES_ENKEY_INVALID=89210,ERR_IPSEC_MANUAL_ENKEY_DIGITONLY=89211,ERR_IPSEC_MANUAL_AUKEY_INVALID=89212,ERR_IPSEC_SPI_VALUE_INVALID=89213,ERR_IPSEC_MYIDENTIFIER_EMPTY=89214,ERR_IPSEC_PEERIDENTIFIER_EMPTY=89215,ERR_IPSEC_MODE_INVALID=89216,ERR_IPSEC_TUNNELS_FULL=89217,ERR_IPSEC_MODE_AGGRESSIVE=89218,ERR_LTE_SMS_PHONE_NUM_LEN=89500,ERR_LTE_SMS_PHONE_NUM_FORMAT=89501,ERR_LTE_PROFILE_NAME_EMPTY=89502,ERR_LTE_PROFILE_NAME_MAXLEN_ERROR=89503,ERR_LTE_PROFILE_NAME_ILLEGAL_CHAR=89504,ERR_LTE_PROFILE_USERNAME_MAXLEN_ERROR=89505,ERR_LTE_PROFILE_USERNAME_ILLEGAL_CHAR=89506,ERR_LTE_PROFILE_PASSWORD_MAXLEN_ERROR=89507,ERR_LTE_PROFILE_PASSWORD_ILLEGAL_CHAR=89508,ERR_LTE_PROFILE_APN_MAXLEN_ERROR=89509,ERR_LTE_PROFILE_APN_ILLEGAL_CHAR=89510,ERR_LTE_PIN_LENGTH_ERROR=89511,ERR_LTE_PIN_EMPTY=89512,ERR_LTE_PIN_ILLEGAL_CHAR=89513,ERR_LTE_PIN_CONFIRM_VALUE_ERROR=89514,ERR_LTE_PUK_LENGTH_ERROR=89515,ERR_LTE_PUK_EMPTY=89516,ERR_LTE_PUK_ILLEGAL_CHAR=89517,ERR_LTE_PROFILE_SAME_PROFILE_NAME=89518,ERR_LTE_PROFILE_SSID_MAXLEN_ERROR=89519,ERR_LTE_PROFILE_SSID_ILLEGAL_CHAR=89520,ERR_LTE_DATA_MAXLEN_ERROR=89521,ERR_LTE_DATA_INVALID_ALERT_PERCENT=89522,ERR_LTE_DATA_INVALID_PAYMENT_DAY=89523,ERR_LTE_SENDMSG_SUCC=89524,ERR_LTE_SENDMSG_FAIL=89525,ERR_LTE_NTWKNODE_CARD_NOTOK=89526,ERR_LTE_PROFILE_APN_EMPTY=89527,ERR_LTE_CDMA_NO_CENT=89528,ERR_LTE_SMS_MSG_TOO_LONG=89529,ERR_LTE_SMS_MSG_EMPTY=89530,ERR_LTE_DATA_INVALID_ALERT_PERCENT_OPEN_INTERVAL=89531,ERR_LTE_DATA_MAXLEN_ERROR_NO_ZERO=89532,ERR_LTE_NO_NET_SEARCH=89533,ERR_LTE_NO_BAND_SEARCH=89534,ERR_INTERNAL=9e4,ERR_NOT_FOUND=90404,ERR_NOT_ACCEPTED=90500,ERR_NETWORK=102e3;