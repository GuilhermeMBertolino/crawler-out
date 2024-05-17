/************
 *
 * Filename:	dal_ra_internal.h
 * Purpose:     function declarations used in csh process
 * Copyright:   (c) Netgear Inc.
 *              2020 All rights reserved
 * Author:      @ VVDN TECHNOLOGIES
 *
 ************/

/* Define to prevent recursive inclusion---------------------*/

#ifndef _INTERNAL_H_
#define _INTERNAL_H_

#include <dal_ra_def.h>
#include <stdbool.h>

struct context {
  char loglevel[BUFFER_SIZE_16];
};

void _RASPCaction(void *up);
void _RASPCstateaction(void *up);
void _RASPCFailAction(void *up);
void _logDebugCb(void *up);
int dal_ra_init(void);
int dal_armor_ra_init(void);
void dal_ra_destroy(void);
int set_module_version_detail(const char *fieldname , const char * version);
int ra_spc_cb_on_change(const char *tbl, const char *fld, void (*foo)(void *),
                          void *up);
void *ra_spc_dal_get_handle(void);
void *ra_armor_dal_get_handle(void);
void *ra_armor_switch_dal_get_handle(void);
void good_bye(char *fd);
int generic_command_handler(char *get, char **output);
void show_d2_err(enum d2_error err);
int dynlog_lib_init(void);
int dynlog_lib_uninit(void);
int ra_armor_destroy(void);
/**
 * RA->Router Analytics
 * CDIL->Connected Device Identification List
 * @brief-> Router Analytics for CDIL feature
 */
/* Functions used in RA debug process */
void RA_cdil_timeout(void *up __attribute__((unused)));
int ra_debug_write_jsonfile(void);
#endif /* _INTERNAL_H_ */
