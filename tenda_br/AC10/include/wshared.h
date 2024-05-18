/*****************************************************************************
作用范围: 提供给上层业务的接口头文件，同时供内部WShare 与 WServer使用

*****************************************************************************/


#ifndef __AP_WSHARED_H__
#define __AP_WSHARED_H__
#include <sys/types.h>

#define WLAN_SERVER_SOCKET_PATH     "/var/wlan_server_socket"
/*available channels, 2.4G:1-14,5G: 8 36,40,52,56,60,64,100,104,108,112,116,120,124,128,132,136,140,149,153,157,161,165 179 181 188*/
#define MAX_CHANNELS_NUM            32  

#define WIFISON_LAN "lan"
#define WIFISON_LAN_BR "br-"WIFISON_LAN
#define WIFISON_GUEST "guest"
#define WIFISON_GUEST_BR "br-"WIFISON_GUEST
#define WIFISON_ETH_NAME_PATH "/var/wifison_eth_name"

/* 频谱分析采集定义 */
#define FSS_FFT_BIN_MAX             56

typedef enum sideband_flag
{
    SIDEBAND_NONE,      /*none*/
    SIDEBAND_UPPER,     /*lower*/
    SIDEBAND_LOWER      /*upper*/
}sideband_flag_e;

typedef struct flow_statistic{
     unsigned long rxpacks;
     unsigned long txpacks;
     unsigned long long txbytes;
     unsigned long long rxbytes;    
}flow_statistic_t;

typedef struct channel_list
{
    int num;
    int channel[MAX_CHANNELS_NUM];
}channel_list_t;

/*begin 2018/05/11，黄志鑫，获取可用信道列表的入参*/
typedef struct channel_list_inparam
{
    int bw;             /*当前带宽*/
    sideband_flag_e sb; /*当前带宽的边带*/
    char country[3];    /*当前国家码*/
}channel_list_inparam_t;
/*end 2018/05/11，黄志鑫，获取可用信道列表的入参*/

typedef struct station_info
{
    char mac[18];
    char link_time[16];     /*unit: second*/
    char rssi[8];           /*unit: dBm*/
    char noise[8];          /*unit: dBm*/
    char quality[8];        /*unit: percent(%)*/
    char link_rate[16];     /*unit: Mbps*/
    char tx_rate[16];       /*unit: Mbps*/
    char rx_rate[16];       /*unit: Mbps*/
    unsigned long long tx_bytes;  /*unit: bytes*/
    unsigned long long rx_bytes;  /*unit: bytes*/
}station_info_t;

typedef struct chanscore_info
{
    unsigned int num;
    unsigned int chan[MAX_CHANNELS_NUM];
    unsigned int chanscore[MAX_CHANNELS_NUM];
    unsigned int chanlevel[MAX_CHANNELS_NUM];
}chanscore_info_t;



/*ap scan results*/
typedef struct ap_info
{
    char ssid[48+1];        /*12个中文字符以上，gb2312导致转换成utf-8数据溢出*/
    char ssid_encode[8];    /*utf-8,gb2312*/
    char mac[18];
    char nettype[8];       /*b,g,bg,bgn,bgn+ac;a,an,an+ac*/
    char channel[8];
    char bandwidth[8];     /*20,40,80,auto*/    
    char nctrlsb[8];        /*none,lower,upper*/
    char signal[8];
    char security[32];      /*none,wep,wpa&wpa2/aes*/
}ap_info_t;

/*dev probe list*/
#define MACADDRLEN                  6
#define MACADDRLEN_WEB              18
#define WLAN_SSID_MAXLEN            32
#define WLAN_NETMODE_MAXLEN         16
#define WLAN_NETTYPE_MAXLEN         8
#define MAX_DEV_PROBE_NUM           64//原值为32

typedef struct probe_info
{
    char               mac[MACADDRLEN_WEB];
    int                rssi;
    int                channel;
    char               netmode[WLAN_NETMODE_MAXLEN];            /*记录设备支持的网络类型*/
    char               nettype[WLAN_NETTYPE_MAXLEN];  //ap或者ad-hoc
    char               ssid[WLAN_SSID_MAXLEN +1];
}probe_info_t;

typedef enum extend_link{
    EXTEND_LINK_INVALID,    /* invalid state */
    EXTEND_LINK_DOWN,       /* interface down */
    EXTEND_LINK_IDLE,       /* interface up, before link */
    EXTEND_LINK_SCANNING,   /* scanning uper-AP */
    EXTEND_LINK_CONNECTED,  /* connected success */
    EXTEND_LINK_ERROR       /* connect error */
}extend_link_e;

typedef enum wifi_wps_status
{
    WPS_STATUS_INIT,
    WPS_STATUS_STOP,
    WPS_STATUS_START,
    WPS_STATUS_PBC_OVERLAP,
    WPS_STATUS_ERROR,
    WPS_STATUS_SUCCESS,
    /* WPS-PBC session is going on */
    WPS_STATUS_PBC_PROGRESSING,
    WPS_STATUS_PBC_TIMEOUT,
    /* NO WPS session recorded */
    WPS_STATUS_NONE,
    WPS_STATUS_MAX
}wifi_wps_status_e;

typedef enum wifi_wps_error_indication
{
    WPS_EI_NO_ERROR,
    WPS_EI_SECURITY_TKIP_ONLY_PROHIBITED,
    WPS_EI_SECURITY_WEP_PROHIBITED,
    WPS_EI_AUTH_FAILURE,
    WPS_EI_UNKNOWN,
    WPS_EI_MAX
}wifi_wps_ei_e;

#define SSID_LEN 32
#define PSK_HEX 64
#define PSK_ASCII 63
#define SERC_MODE_LEN 20
typedef struct wpa_network
{
    char ssid[SSID_LEN+1];
    char psk[PSK_HEX+1];
    char key_mgmt[SERC_MODE_LEN+1];
} wpa_network_t;

typedef struct wps_stats
{
    enum wifi_wps_status status;
    enum wifi_wps_error_indication ei;
    /* provide wireless information after wps-pair */
    wpa_network_t network;
}wps_stats_t;

typedef struct interface_stats
{
    char state;         //0-disable 1-enable
}interface_stats_t;


typedef struct chan_info //dynamic channel infomation
{
    char channel[8];
    char bandwidth[8];       /*20,40,80*/    
    char side_flag[8];       /*none,lower,upper*/ 
}chan_info_t;

typedef struct spectrum_info
{
   int channel;
   int bss_num;
   int noisefloor;
   int chanload;
}spectrum_info_t;

/* 频谱分析用户数据结构体 */
typedef struct td_fss_usr_data_s {
        u_int16_t   channel;
        int8_t    cur_bin_pwr[FSS_FFT_BIN_MAX]; 
        int8_t    max_bin_pwr[FSS_FFT_BIN_MAX]; 
        int8_t    agv_bin_pwr[FSS_FFT_BIN_MAX]; 
} __attribute__((packed)) td_fss_usr_data_t;

#define CUSTOM_MAX_IE_SIZE 128
#define CUSTOM_MAX_IE_NUM 128
/* OUI in hex */
#define CUSTOM_IE_OUI "c85359"

typedef struct td_custom_ie_head
{
    /* type(the first byte) can be used to distinguish different messages */
    u_int8_t        type;
    u_int8_t        nonce;
    u_int8_t        mac[6];
    u_int8_t        reserved[4];
} __attribute__((__packed__)) td_custom_ie_head_t;

typedef struct td_custom_ie_info
{
    td_custom_ie_head_t* head;
    char length;
} td_custom_ie_info_t;

typedef struct td_custom_ie_report
{
    td_custom_ie_info_t ies[CUSTOM_MAX_IE_NUM];
    char ie_num;
    /* truncated==1 means that some ie cache in driver is not copyed for small buffer */
    char truncated;
} td_custom_ie_report_t;

typedef enum wifison_damon
{
    WIFISON_HYD_LAN,    /* default hyd damon, listen on 127.0.0.1:7777 */
    WIFISON_HYD_GUEST,  /* hyd damon for wifison original guest network, listen on 127.0.0.1:7778 */
    WIFISON_LBD         /* reserved for lbd which listen on 127.0.0.1:7787 */
} wifison_damon_e;

/*
function:       tpi_wifi_get_osifname
description:    get os ifname of mib ifname
input:      mibif
output:     osif
return:         ok:osif, false: NULL
*/
char* tpi_wifi_get_osifname(char *mibif, char *osif);

/*
function:       tpi_wifi_get_wifison_ifname
description:    get os ifname of mib ifname in wifison workmode
                wlan0.0~wlan0.5 for fonthual, wlan0.7 for backhaul ap,
                wlan0.x for backhaul sta, wlan0.6 reserved for wifison native guest.
                If wlan0.6 is enabled, two bridges will be used for traffic separation.
                The os ifname of wlan0.6/wlan0.7/wlan0.x is unknown until wifison is configured.
input:      mibif
output:     osif
return:         ok:osif, false: NULL
*/
char* tpi_wifi_get_wifison_ifname(char *mibif, char *osif);

/*
function:       tpi_wifi_exec_hyd_cmd
description:    execute a command of hyd(or lbd), and get the output string
input:          cmd: command to execute, damon: where to send the command
output:         output: command output string
return:         ok:0, false: -1
*/
int tpi_wifi_exec_hyd_cmd(const char* cmd, char* output, int output_size, wifison_damon_e damon);


/*
function:       tpi_wifi_get_wps_status
description:    get wps status of `osifname`
input:      osifname
output:     status
return:         success:0, failed:-1
*/
int tpi_wifi_get_wps_status(char *osifname, wps_stats_t* status);

int tpi_ifconfig_dev_down_up(char *osifname, int need_up);

/*
function:       tpi_wifi_check_downup
description:    get interface downup status
input:      osifname
output:     
return:         up:1, down:0
*/
int tpi_wifi_check_downup(char *osifname);

/*
function:       tpi_wifi_get_mibif_band
description:    get band of mib ifname
input:      mibif
output:     
return:         5G:5, 2.4G:2
*/
int tpi_wifi_get_mibif_band(char *mibif);

/*
function:       tpi_wifi_scan
description:    ap scan once
input:      osif: scan interface
output:     
return:         ok:0, failed:-1
*/
int tpi_wifi_scan(char *osif);

/*
function:       tpi_wifi_get_scanresults
description:    get apscan results
input:      osif: scan interface        
            num: ap max number
output:     aplist: ap list buffer
return:         ap real number
*/
int tpi_wifi_get_scanresults(char *osif, ap_info_t *aplist, int num);


/*
function:       tpi_wifi_scan_results
description:    do scan && get results
input:      osif: scan interface        
            num: ap max number
            count: get fail count, 1s/pre
output:     aplist: ap list buffer
return:         ap real number
*/
int tpi_wifi_scan_results(char *osif, ap_info_t *aplist, int num,unsigned char count);

/*
function:       tpi_wifi_get_clientlist
description:    get bss station list
input:      osif: bss interface     
            num: station max number
output:     aplist: station list buffer
return:         station real number
*/
int tpi_wifi_get_clientlist(char *osif, station_info_t *stalist, int num);

/*
function:       tpi_wifi_get_channel_list
description:    get available channels of specific interface,not include 0
input:      osif: radio interface
            bw: current bandwidth
            sb: sideband flag, none/upper/lower
output:     channels: channel list
return:         -1:error, 0:ok
*/
int tpi_wifi_get_channel_list(char *osif, int bw, sideband_flag_e sb, channel_list_t *channels);

/*
function:       tpi_wifi_get_channel_list_by_country
description:    根据国家和带宽返回可用信道列表
input:      osif: 主接口名
            inparam.bw: 当前带宽
            inparam.sb: 40M/80M的边带none/upper/lower
            inparam.country: 国家码
output:     channels: 可用channel 列表
return:         -1:error, 0:ok
*/
int tpi_wifi_get_channel_list_by_country(char *osif, channel_list_inparam_t inparam, channel_list_t *channels);

/*
function:       tpi_wifi_get_flow_statistic 
description:    get flow statistic of interface
input:      osif: wifi interface            
output:     fstat: flow statistic data
return:         -1:failed, 0:ok
*/
int tpi_wifi_get_flow_statistic(char *osif, flow_statistic_t *fstat);

int tpi_wifi_get_interface_status(char *ifname, interface_stats_t *status);

/*
function:       tpi_wifi_get_extend_state
description:    get ap-extend link status
input:      osif: ap-extend interface       
output:
return:         ap-extend link status
*/
extend_link_e tpi_wifi_get_extend_state(char *osif);

/*
function:       tpi_wifi_get_extend_linktime
description:    get linktime of extend interface
input:      osif: extend interface          
output:     linktime: extend linktime;
return:         -1:failed, 0:ok
*/
int tpi_wifi_get_extend_linktime(char *osif, unsigned long *linktime);
/*
function:       tpi_wifi_get_extend_wdslinktime
description:    get linktime of extend interface
input:      osif: extend interface          
output:     linktime: extend linktime;
return:         -1:failed, 0:ok
*/
int tpi_wifi_get_extend_wdslinktime(char *osif, unsigned long *linktime, char *mac);
/*
function:       tpi_wifi_get_extend_wdslinkstatus
description:    get linktime of extend interface
input:      osif: extend interface          
output:     linktime: extend linktime;
return:         -1:failed, 0:ok
*/
extend_link_e tpi_wifi_get_extend_wdslinkstate(char *osif, char *mac);

/*
function:       tpi_wifi_get_chanscores
description:    get channel scores 
input:      osif: wifi interface            
output:     chanscores: channel scores;
return:         -1:failed, 0:ok
*/
int tpi_wifi_get_chanscores(char *osif, chanscore_info_t *chanscores);

/*
function:        tpi_wifi_get_chaninfo 
description:    get current channel status of interface
input:            osif: wifi interface            
output:          cinfo: current channel, bandwidth and sideband
return:          -1:failed, 0:ok
*/
int tpi_wifi_get_chaninfo(char *osif, chan_info_t *cinfo);
int tpi_wifi_dev_probe_list(char *osif, probe_info_t *devlist, int count);


/*
function:        tpi_wifi_is_scanning 
description:    get current ap scan status
input:            osif: wifi interface            
output:          
return:          0: scan finished or not start, 1: scanning now
*/
int tpi_wifi_is_scanning(char *osif);

/*
function:        tpi_wifi_get_noise 
description:    get current noise dBm
input:            osif: wifi interface            
output:          noise: noise value
return:          -1:fail, 0:ok
*/
int tpi_wifi_get_noise(char *osif, int *noise);
int tpi_wifi_get_spectrum(char *osif,struct spectrum_info *sinfo,int num,int count);

/*
function:        tpi_wifi_get_fss_result 
description:     get current fss result
input:           osif: radio interface  note:[QCA:athx RTK:wlanx]
                 sinfo:fss info
                 num:channel num of setting
output:          sinfo: fss info
return:          -1:fail, 0:ok
*/
void tpi_wifi_set_fss_param(char *ifname, int fss_channel, int fss_en);
int tpi_wifi_get_fss_result(char *osif, td_fss_usr_data_t *sinfo, int num);
    
/*
function:        tpi_wifi_get_custom_ie
description:     get the received custom InfornationElements
input:           buff_len: size of the buffer
output:          buff: ie buffer
return:          pointer of ie report, NULL if failed
*/
td_custom_ie_report_t* tpi_wifi_get_custom_ie(char *buff, int buff_len);

/*
function:           tpi_wifi_set_custom_ie 
description:        add or update a custom ie in iee80211 frame
input:              osif: wifi interface
                    mac: mac address of myself
                    type: 0~0xfe, type defined by product
                    msg: messages to spread
                    msg_len: length of msg
output:             
return:             -1:fail, 0:ok
*/
int tpi_wifi_set_custom_ie(const char* osif, const char* mac, char type, const char* msg, int msg_len);

/*
function:          tpi_wifi_del_custom_ie 
description:       delete a custom ie in iee80211 frame
input:             osif: wifi interface
                   type: type defined by product, 0xff for all
output:            
return:            -1:fail, 0:ok
*/
int tpi_wifi_del_custom_ie(const char* osif, char type);

/*
function:          tpi_wifi_is_apmode 
description:      is bss apmode 
input:             osif: wifi interface
output:            
return:            1:apmode , 0:not apmode,like sta mode
*/
int tpi_wifi_is_apmode(char *osif);

/*
function:          tpi_wifi_iwconfig_is_assoced 
description:      is bss access point assoced 
input:             osif: wifi interface
output:            
return:            1:assoc , 0:not assoc
*/
int tpi_wifi_iwconfig_is_assoced(char *osif);

int tpi_wifi_get_acs_enable(char *osifname);

#endif
