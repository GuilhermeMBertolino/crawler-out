/************
 *
 * Filename:	fw_check.h
 *
 * Purpose:	API calls of fw_check library
 *
 * Copyright:	(c) Netgear Inc.
 *		2017 All rights reserved
 *
 * Author:	@ VVDN TECHNOLOGIES
 *
 ************/

#include <stdbool.h>
#include <d2lib/d2api.h>

#ifdef __cplusplus
extern "C" {
#endif

#define ONE_DAY_SECONDS 86400   //!< Seconds in one day
#define MAX_CHECKAUTO_CFU_CALL 5    //!< Maximum number of checkAutoCFU calls allowed

//!< function to print d2 error
void showD2Err(int line_number, const char* table, char* field, enum d2_error err);

/**
  * Supported Error Types
  */
#define BUFF_LEN_129 129
#define BUFF_LEN_64 64
#define BUFF_LEN_16 16
#define MAX_CHECKAUTO_CFU_CALL 5

enum fw_check_error {

  ERROR_OK,
  ERROR_DAL,
  ERROR_INIT,
  ERROR_TIMEOUT,
  ERROR_CONNECT,
  ERROR_INVALID_INPUT,
  ERROR_INTERNAL,
  ERROR_NO_URL,
  ERROR_FAILURE,
  ERROR_CHECKAUTO_CALL_NOT_ALLOWED,
  ERROR_UNKNOWN,
};

/*
 * If one wishes to redirect logging, they can by overwriting debug ptr
 * e.g.
 *      debug = myCustomLogFunction;
 */
enum logLev { LIB_ERROR, LIB_DEBUG, LIB_INFO };


void (*fw_debug)(enum logLev ll, const char *fmt, ...);

/**
  * Supported reasons for library call
  */
typedef enum call_reason {

  CHECK_UNSPECIFIED,
  CHECK_AUTO,
  CHECK_ON_DEMAND_UPAPP,
  CHECK_ON_DEMAND_GUI,
  CHECK_ON_DEMAND_INSTALLATION,
} reason_type;

/*
 * Library Function declarations below
 */

const char *error_message(enum fw_check_error);

/**
  * Init Check_new_fw library
  *
  * @return enum fw_check_error type
  **/

enum fw_check_error fw_check_init(void);

/**
  * UnInit Check_new_fw library
  *
  * @return enum fw_check_error type
  **/

enum fw_check_error fw_check_uninit(void);

/**
  * Function that should be called by the caller in case of
  * new Firmware check.
  *
  * @param: enum call_reason type mode, boolean type beta_acceptance, char
  *pointer to be filled with URL, url length
  *
  * @return fw_check_error type
  **/

enum fw_check_error get_check_fw(const enum call_reason mode,
                                 bool beta_acceptance, char *url,
                                 int url_length);

/**
  * Function that should be called by the caller to notify
  * after the upgrade procedure is attempted
  *
  * @param: none	// Only CHECK_BOOT applicable
  *
  * @return fw_check_error type
  **/

enum fw_check_error boot_notify();

#ifdef __cplusplus
};
#endif
