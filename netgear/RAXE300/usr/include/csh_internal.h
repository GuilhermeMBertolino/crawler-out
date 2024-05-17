/************
 *
 * Filename:	csh_internal.h
 * Purpose:     function declarations used in csh process
 * Copyright:   (c) Netgear Inc.
 *              2019, 2020 All rights reserved
 * Author:      @ VVDN TECHNOLOGIES
 *
 ************/

/* Define to prevent recursive inclusion---------------------*/

#ifndef _INTERNAL_H_
#define _INTERNAL_H_

#include <csh_def.h>
#include <stdbool.h>

struct context {
  char loglevel[BUFFER_SIZE_16];
};

int get_circle_action();
int get_circle_status();
int get_device_mode();
int get_SPC_Status();
int csh_subscribe(void);
int csh_dal_init(void);
int get_acl_field(void);
int get_sealService_status(void);
int get_toggle_status(void);
void csh_dal_destroy(void);
int set_module_version_detail(const char *fieldname , const char * version);
int csh_cb_on_change(const char *tbl, const char *fld, void (*foo)(void *),
                          void *up);
void *csh_dal_get_handle(void);
void good_bye(char *fd);
int start_circle_agent(void);
int stop_circle_agent(void);
int restart_circle_agent(void);
int generic_command_handler(char *get, char **output);
void show_d2_err(enum d2_error err);
int dynlog_lib_init(void);
int dynlog_lib_uninit(void);
int restart_circle_agent_on_iptable_change();
#endif /* _INTERNAL_H_ */
