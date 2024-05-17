/************
 *
 * Filename:    csh_def.h
 * Purpose:     definition for dal structures
 * Copyright:   (c) Netgear Inc.
 * 				2019, 2020 All rights reserved
 * Author:      @ VVDN TECHNOLOGIES
 *
 ************/

/* Define to prevent recursive inclusion---------------------*/

#ifndef _CSH_DEF_H_
#define _CSH_DEF_H_
#include <d2lib/d2api.h>
#ifdef __cplusplus
extern "C" {
#endif

/*Define buffer size */
#define BUFFER_SIZE_8 		8
#define BUFFER_SIZE_16 		16
#define BUFFER_SIZE_32 		32
#define BUFFER_SIZE_64 		64
#define BUFFER_SIZE_128	 	128
#define BUFFER_SIZE_256 	256
#define BUFFER_SIZE_512 	512
#define BUFFER_SIZE_1024 	1024
#define BUFFER_SIZE_2048    2048
#define BUFFER_SIZE_4096	4096
/* Defines for the return values */
#define FAIL -1

/* Defines for CircleDebug table Error codes  */
#define CA_CTL_BIN_ERR              100
#define CA_FAIL_ERR                 110
#define CA_STOP_FAIL_ERR	    115
#define CA_UUID_FAIL_ERR            120
#define CA_PROVISION_API_ERR        150
#define CA_CURL_UUID_ERR            200
#define CA_CURL_PROVISION_ERR       210
#define CA_ACL_DIS_ERR              300
#define CA_ACL_ENB_ERR              302
#define CA_CURL_UUID_TIMEOUT_ERR    220

#ifndef FALSE
#define FALSE 0
#endif
#ifndef TRUE
#define TRUE (!FALSE)
#endif

/* Defines for the CSH related activities */
#define MODULENAME "Csh"
#define CIRCLECTL_PATH "/usr/bin"
#define CIRCLECTL_START "/circlectl start | while IFS= read -r line; do printf '[%s][%s]\n' \"($(date '+%Y-%m-%d %H:%M:%S'))\" \"$line\"; done >> /tmp/circlectl.log"
#define CIRCLECTL_RESTART "/circlectl restart | while IFS= read -r line; do printf '[%s][%s]\n' \"($(date '+%Y-%m-%d %H:%M:%S'))\" \"$line\"; done >> /tmp/circlectl.log"
#define CIRCLECTL_STOP "/circlectl stop | while IFS= read -r line; do printf '[%s][%s]\n' \"($(date '+%Y-%m-%d %H:%M:%S'))\" \"$line\"; done >> /tmp/circlectl.log"
#define POLL_DELAY 15
#define POLL_DELAY_UUID 5
#define MAX_RETRY 3
#define CIRCLE_UUID_URL "https://127.0.0.1:4567/api/CIRCLEUUID?api=1.0&host=android"
//#define PROVISION_HARDWARE_URL "https://127.0.0.1:4567/api/PROVISION?api=1.0&cloudhost=https://vc.dev.test.meetcircle-netgear.co"
#define IS_HARDWARE_ONLINE_URL "https://vc.dev.meetcircle-netgear.co/api/QUERY/hardware/hardware/isOnline?api=1.0"
#define SET_IS_ENABLE_URL "https://vc.dev.meetcircle-netgear.co/api/UPDATE/hardware/hardware/isEnabled"

/* Defines for enabling/disabling circle related APIs */
//#define IS_HARDWARE_ONLINE /* Uncomment to enable isHardware Online API */
//#define SET_IS_ENABLE /* Uncomment to enable Set isEnable API */

/* Defines for the debugging */
#define DEBUG 0

/* Supported d2 Error Types */
enum check_d2_error {

  ERROR_OK_CSH,
  ERROR_TIMEOUT,
  ERROR_SHUTDOWN,
  ERROR_NOSUCH_ITEM,
  ERROR_TOO_LONG,
  ERROR_INVALID_INPUT,
  ERROR_WRONG_TYPE,
  ERROR_ENCODING,
  ERROR_D2,
  ERROR_UNKNOWN
};

enum circleState {
  NONE = 1,
  ACTIVATE = 2,
  DEACTIVATE = 3,
  PROVISION = 4,
};

struct cuuid_response {
  char cuuid_result[BUFFER_SIZE_16];
  char cuuid[BUFFER_SIZE_128];
  
}__attribute__((packed));

struct deactivate_response {
  char is_online[BUFFER_SIZE_16];
  char is_online_result[BUFFER_SIZE_16];
  char is_enabled[BUFFER_SIZE_16];
  char is_enabled_result[BUFFER_SIZE_16];
}__attribute__((packed));

char provision_hw_response[BUFFER_SIZE_16];

/* DAL */
bool aclEnableFlag;
uint32_t circleState;
char circleAction[BUFFER_SIZE_32];     // stores the action for Circle
char circleStatus[BUFFER_SIZE_32];     // stores the true circle status
char device_mode[BUFFER_SIZE_32];      //store the device mode from general table
char circleStatusUPA[BUFFER_SIZE_16];     // stores the circle status as in activationStatusUPA field
char spc_state[BUFFER_SIZE_32];
char sealServiceState[BUFFER_SIZE_8];
char toggleState[BUFFER_SIZE_8];
int signal_user2_handler();
#ifdef __cplusplus
}
#endif
#endif //_CSH_DEF_H_
