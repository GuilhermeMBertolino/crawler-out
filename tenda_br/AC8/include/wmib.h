#ifndef __AP_WMIB_H__
#define __AP_WMIB_H__
#define  WIFI_BAND "band"
#define  WIFI_ENABLE "enable"
#define  WIFI_MAXBSS "maxbss"
#define  WIFI_WORKMODE "workmode"
#define  WIFI_COUNTRYCODE "countrycode"
#define  WIFI_COUNTRYREV "countryrev"
#define  WIFI_NETTTYPE "nettype"
#define  WIFI_CHANNEL "channel"
#define  WIFI_BANDWIDTH "bandwidth"
#define  WIFI_SIDEBAND_FLAG "sideband_flag"
#define  WIFI_SSID_ISOLATE "ssid_isolate"
#define  WIFI_MAXPOWER "maxpower"
#define  WIFI_CURPOWER "curpower"
#define  WIFI_POWERLVL "power"
#define  WIFI_WMM_ENABLE "wmm_enable"
#define  WIFI_WMM_APSD "wmm_apsd"
#define  WIFI_WMM_TABLE_EN "wmm_table_enable"
#define  WIFI_WME_AP_BK "wme_ap_bk"
#define  WIFI_WME_AP_BE "wme_ap_be"
#define  WIFI_WME_AP_VI "wme_ap_vi"
#define  WIFI_WME_AP_VO "wme_ap_vo"
#define  WIFI_WME_STA_BK "wme_sta_bk"
#define  WIFI_WME_STA_BE "wme_sta_be"
#define  WIFI_WME_STA_VI "wme_sta_vi"
#define  WIFI_WME_STA_VO "wme_sta_vo"
#define  WIFI_BEACON "beacon"
#define  WIFI_FRAG "frag"
#define  WIFI_RTS "rts"
#define  WIFI_DTIM "dtim"
#define  WIFI_SGI_TX "sgi_tx"
#define  WIFI_SGI_RX "sgi_rx"
#define  WIFI_CUTRSSI "cutrssi"
#define  WIFI_RSSI_ENABLE "rssi_enable"
#define  WIFI_ATF "atf"
#define  WIFI_PROBE_SUPPRESSION "probe_suppression"
#define  WIFI_INTERFERENCE "interference"
#define  WIFI_EXPIRE_TIME "expire_time"
#define  WIFI_BASIC_RATES "basic_rates"
#define  WIFI_SUPPORT_RATES "support_rates"
#define  WIFI_SSID5G_PRIO "ssid5g_prio"
#define  WIFI_SSID5G_PRIORSSI "ssid5g_priorssi"
#define  WIFI_SSID2G_PRIORSSI "ssid2g_priorssi"
#define  WIFI_CHAIN_TX "txchainmask"
#define  WIFI_CHAIN_RX "rxchainmask"
#define  WIFI_MAC "mac"
#define  WIFI_WPS_PIN "wps_pin"
#define  WIFI_TUNNEL "tunnel"
#define  WIFI_PREAMBLE "preamble"
#define  WIFI_FORCE_RATE "force_rate"
#define  WIFI_TXPOWER11b_OFFSET "txpower11b_offset"
#define  WIFI_DISTANCE "distance"
#define  WIFI_DISTANCE_AUTO "distance_auto"
#define  WIFI_VLAN_TRUNK "vlan_trunk"
#define  WIFI_ACS_RESCAN_TIME "acs_rescan_time"
#define  WIFI_ANTIJAMMING_ENABLE "antijamming_enable"
#define  WIFI_SPEC_CHANNEL "spec_channel"
#define  WIFI_CHANNEL_SHIFT "channel_shift"
#define  WIFI_TDMA "tdma"
#define  WIFI_ACS_INVAILD_CH "acs_invaild_ch"
#define  WIFI_DFS "dfs"
#define  WIFI_TXBF "txbf"
#define  WIFI_TXBF_MU "txbf_mu"
#define  WIFI_MACFILER_ENABLE "macfilter_enable"
#define  WIFI_BEACON_RATE "beacon_rate"
#define  WIFI_STEERING_ENABLE "steering_enable"
#define  WIFI_STEERING_BLACKLIST "steering_blacklist"
#define  WIFI_STEERING_LEGACY "steering_legacy"
#define  WIFI_RX_ALL_MCAST_BCAST "rx_all_mbcast"
#define  WIFI_TPC "tpc"
#define  WIFI_WPS_UUID "wps_uuid"
#define  WIFI_BURST "burst"
#define  WIFI_REINIT "reinit"
#define  WIFI_MESH_ENABLE "mesh_enable"
#define  WIFI_MESH_ID "mesh_id"
#define  WIFI_MESH_KEY_TYPE "mesh_key_type"
#define  WIFI_MESH_KEYS "mesh_keys"
#define  WIFI_BAND_5G_SELECTED "band5g_select"
#define  WIFI_QOS_ENHANCE_ENABLE "qos_enhance_enable"
#define  WIFI_THER_PROTECT "thermal_protect"
#define  WIFI_BSS_ENABLE "bss_enable"
#define  WIFI_BSS_SSID "bss_ssid"
#define  WIFI_BSS_SSID_ENCODE "bss_ssid_encode"
#define  WIFI_BSS_SECURITY "bss_security"
#define  WIFI_BSS_WEP_TYPE "bss_wep_type"
#define  WIFI_BSS_WEP_KEY "bss_wep_key"
#define  WIFI_BSS_WEP_KEY1 "bss_wep_key1"
#define  WIFI_BSS_WEP_KEY2 "bss_wep_key2"
#define  WIFI_BSS_WEP_KEY3 "bss_wep_key3"
#define  WIFI_BSS_WEP_KEY4 "bss_wep_key4"
#define  WIFI_BSS_WEP_KEY1_FORMAT "bss_wep_key1_format"
#define  WIFI_BSS_WEP_KEY2_FORMAT "bss_wep_key2_format"
#define  WIFI_BSS_WEP_KEY3_FORMAT "bss_wep_key3_format"
#define  WIFI_BSS_WEP_KEY4_FORMAT "bss_wep_key4_format"
#define  WIFI_BSS_WPAPSK_TYPE "bss_wpapsk_type"
#define  WIFI_BSS_WPAPSK_CRYPTO "bss_wpapsk_crypto"
#define  WIFI_BSS_WPAPSK_KEY "bss_wpapsk_key"
#define  WIFI_BSS_WPA_TYPE "bss_wpa_type"
#define  WIFI_BSS_WPA_CRYPTO "bss_wpa_crypto"
#define  WIFI_BSS_RADIUS_IP "bss_radius_ip"
#define  WIFI_BSS_RADIUS_PORT "bss_radius_port"
#define  WIFI_BSS_RADIUS_KEY "bss_radius_key"
#define  WIFI_BSS_MCAST2UCAST "bss_mcast2ucast"
#define  WIFI_BSS_STA_ISOLATE "bss_sta_isolate"
#define  WIFI_BSS_STA_MAXNUM "bss_sta_maxnum"
#define  WIFI_BSS_STA_DENYTYPE "bss_sta_denytype"
#define  WIFI_BSS_MACMODE "bss_macmode"
#define  WIFI_BSS_MACLIST "bss_maclist"
#define  WIFI_BSS_WPS_ENABLE "bss_wps_enable"
#define  WIFI_BSS_HIDE "bss_hide"
#define  WIFI_BSS_WPAPSK_REKEY_TIME "bss_wpapsk_rekey_time"
#define  WIFI_BSS_WPA_REKEY_TIME "bss_wpa_rekey_time"
#define  WIFI_BSS_BRIDGE_ID "bss_brid"
#define  WIFI_BSS_AUTO_HIDE "bss_auto_hide"
#define  WIFI_BSS_ATF_RATE "bss_atf_rate"
#define  WIFI_BSS_KEEPDOWN "bss_keepdown"
#define  WIFI_BSS_LIMIT_FARSTA "bss_limit_farsta"
#define  WIFI_BSS_DOT11K "bss_dot11k"
#define  WIFI_BSS_DOT11V "bss_dot11v"
#define  WIFI_BSS_DOT11R "bss_dot11r"
#define  WIFI_EXTEND_ENABLE "extend_enable"
#define  WIFI_EXTEND_MAC "extend_mac"
#define  WIFI_EXTEND_CHANNEL "extend_channel"
#define  WIFI_EXTEND_BANDWIDTH "extend_bandwidth"
#define  WIFI_EXTEND_SIDEBAND_FLAG "extend_sideband_flag"
#define  WIFI_EXTEND_SSID "extend_ssid"
#define  WIFI_EXTEND_SSID_ENCODE "extend_ssid_encode"
#define  WIFI_EXTEND_SECURITY "extend_security"
#define  WIFI_EXTEND_WEP_TYPE "extend_wep_type"
#define  WIFI_EXTEND_WEP_KEY "extend_wep_key"
#define  WIFI_EXTEND_WEP_KEY1 "extend_wep_key1"
#define  WIFI_EXTEND_WEP_KEY2 "extend_wep_key2"
#define  WIFI_EXTEND_WEP_KEY3 "extend_wep_key3"
#define  WIFI_EXTEND_WEP_KEY4 "extend_wep_key4"
#define  WIFI_EXTEND_WEP_KEY1_FORMAT "extend_wep_key1_format"
#define  WIFI_EXTEND_WEP_KEY2_FORMAT "extend_wep_key2_format"
#define  WIFI_EXTEND_WEP_KEY3_FORMAT "extend_wep_key3_format"
#define  WIFI_EXTEND_WEP_KEY4_FORMAT "extend_wep_key4_format"
#define  WIFI_EXTEND_WPAPSK_TYPE "extend_wpapsk_type"
#define  WIFI_EXTEND_WPAPSK_CRYPTO "extend_wpapsk_crypto"
#define  WIFI_EXTEND_WPAPSK_KEY "extend_wpapsk_key"
#define  WIFI_EXTEND_WDS_MAC1 "extend_wds_mac1"
#define  WIFI_EXTEND_WDS_MAC2 "extend_wds_mac2"
#define  WIFI_EXTEND_WDS_MAC3 "extend_wds_mac3"
#define  WIFI_EXTEND_WDS_MAC4 "extend_wds_mac4"
#define  WIFI_EXTEND_MCAST2UCAST "extend_mcast2ucast"
#define  WIFI_EXTEND_WPS_ENABLE "extend_wps_enable"
#define  WIFI_RF_11N_THER"11N_THER"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_11N_THER_2"11N_THER_2"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_11N_PA_TYPE"11N_PA_TYPE"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_11N_XCAP"11N_XCAP"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_REG_DOMAIN"REG_DOMAIN"MIB_RF_HW"11"validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_5G_HT40_1S_A"TX_POWER_5G_HT40_1S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_5G_HT40_1S_B"TX_POWER_5G_HT40_1S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_40BW2S_20BW2S_A"TX_POWER_DIFF_5G_40BW2S_20BW2S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_20BW1S_OFDM1T_A"TX_POWER_DIFF_5G_20BW1S_OFDM1T_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_20BW1S_OFDM1T_B"TX_POWER_DIFF_5G_20BW1S_OFDM1T_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_40BW2S_20BW2S_B"TX_POWER_DIFF_5G_40BW2S_20BW2S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_80BW1S_160BW1S_A"TX_POWER_DIFF_5G_80BW1S_160BW1S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_80BW1S_160BW1S_B"TX_POWER_DIFF_5G_80BW1S_160BW1S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_80BW2S_160BW2S_A"TX_POWER_DIFF_5G_80BW2S_160BW2S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_5G_80BW2S_160BW2S_B"TX_POWER_DIFF_5G_80BW2S_160BW2S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_TX_POWER_HT40_1S_B"TX_POWER_HT40_1S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_CCK_A"TX_POWER_CCK_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_CCK_B"TX_POWER_CCK_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_HT20"TX_POWER_DIFF_HT20"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_HT40_2S"TX_POWER_DIFF_HT40_2S"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_DIFF_OFDM"TX_POWER_DIFF_OFDM"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_TX_POWER_HT40_1S_A"TX_POWER_HT40_1S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_TX_POWER_TSSI_5G_HT40_1S_A"TX_POWER_TSSI_5G_HT40_1S_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_TX_POWER_TSSI_5G_HT40_1S_B"TX_POWER_TSSI_5G_HT40_1S_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_TSSI_ENABLE"11N_TSSI_ENABLE"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_DP_PATH_A_OK"RF_DPK_DP_PATH_A_OK"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_DP_PATH_B_OK"RF_DPK_DP_PATH_A_OK"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_PWSF_2G_A"RF_DPK_PWSF_2G_A"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_PWSF_2G_B"RF_DPK_PWSF_2G_B"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_A0"RF_DPK_LUT_2G_EVEN_A0"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_A1"RF_DPK_LUT_2G_EVEN_A1"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_A2"RF_DPK_LUT_2G_EVEN_A2"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_B0"RF_DPK_LUT_2G_EVEN_B0"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_B1"RF_DPK_LUT_2G_EVEN_B1"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_EVEN_B2"RF_DPK_LUT_2G_EVEN_B2"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_A0"RF_DPK_LUT_2G_ODD_A0"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_A1"RF_DPK_LUT_2G_ODD_A1"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_A2"RF_DPK_LUT_2G_ODD_A2"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_B0"RF_DPK_LUT_2G_ODD_B0"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_B1"RF_DPK_LUT_2G_ODD_B1"MIB_RF_HW""validate_RF_HWNULL} 
#define  WIFI_RF_DPK_LUT_2G_ODD_B2"RF_DPK_LUT_2G_ODD_B2"MIB_RF_HW""validate_RF_HWNULL} 
#endif
