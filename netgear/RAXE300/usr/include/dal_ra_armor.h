/************
 **
 **Filename  :dal_ra_armor.h
 **Purpose   :RA-armor functionality
 **Copyright :(c) Netgear Inc.
 **          2020 All rights reserved 
 **Author    :@VVDN TECHNOLOGIES
 **
 *************/

/*Define to prevent recursive inclusion---------------------*/

#ifndef _DALRA_ARMOR_H_
#define _DALRA_ARMOR_H_

#include <dal_ra_def.h>
#include <stdbool.h>
#include <d2lib/d2api.h>

#define	MAXIMUM_BUFF_SIZE		8
#define	MAXIMUM_DATA_SIZE		64

struct action {
    char item[BUFFER_SIZE_64];
    void (*foo)(void *up);
    void *up;
};
enum ArmorEvents {
    ARMOR_BDA_INIT_RESPONSE = 0,
    ARMOR_BD_SERVICES_STATUS,
    ARMOR_BD_RESGISTER_TO_CLOUD_RESPONSE,
    ARMOR_CLOUD_REGISTRATION_STATUS,
    ARMOR_BD_SUBSCRIPTION_CHANGED_STATUS,
    CHP_CHANGE_BD_STATUS_RESPONSE,
    CHP_RESET_BD_RESPONSE,
    ARMOR_STATUS_CHANGE_ACTION,
    ARMOR_BD_INIT_DOWNLOAD,
    ARMOR_BD_VA_STATUS,
    ARMOR_RESTORE_DATA,
    ARMOR_RA_DAILY_EVENT_ACTION,
};


void _RA_armor_action(void *up);
void _RA_armor_expiry(void *up);
void _RA_BD_enable_disable_Event(void *up __attribute__((unused)));
void _RA_armor_bdregisterToCloud(void *up __attribute__((unused)));
void _ARMOR_RA_Daily_Event(void *up __attribute__((unused)));
void _RA_armor_bdInitStatus(void *up __attribute__((unused)));
void _RA_BD_VA_Scan_Event(void *up __attribute__((unused)));
void _RA_BD_subscription_event(void *up __attribute__((unused)));
void _RA_BD_reset_event(void *up __attribute__((unused)));
void _RA_BD_change_status_event(void *up __attribute__((unused)));
void _RA_RestoreStorageData_Event(void *up __attribute__((unused)));
int get_armor_action_state(const char *dal_armor_table,char *dal_event,char *ra_action_data);
void calculate_timestamp(char *epochtime_string);
int ra_armor_write_jsonfile(char *armor_event, enum ArmorEvents armor_eventType);
void _RA_armor_activation(void *up);
int ra_armor_cb_on_change(const char *tbl, const char *fld, void (*foo)(void *),
        void *up);
int ra_armor_switch_cb_on_change(const char *tbl, const char *fld, void (*foo)(void *),
        void *up);

void _RA_armor_bdregisterToCloud(void *up);
void _RA_BD_alivestate(void *up);
void _RA_BD_VA_Scan_Event(void *up __attribute__((unused)));
void _RA_BD_Registration_Status(void *up __attribute__((unused)));
void _RA_upagent_ash_event(void *up __attribute__((unused)));
void _RA_BD_download_event(void *up __attribute__((unused)));
void dal_ra_armor_subscribe(void *up __attribute__((unused)));
#endif
