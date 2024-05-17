/************
 *
 * Filename:    dal_ra_def.h
 * Purpose:     definition for dal structures
 * Copyright:   (c) Netgear Inc.
 * 		2020 All rights reserved
 * Author:      @ VVDN TECHNOLOGIES
 *
 ************/

/* Define to prevent recursive inclusion---------------------*/

#ifndef _DALRA_DEF_H_
#define _DALRA_DEF_H_
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
#define BUFFER_SIZE_1224        1224
#define BUFFER_SIZE_2048        2048
#define BUFFER_SIZE_4096	4096
#define RAFIELD_BUFFER_SIZE	8
#define EPOCH_BUFFER_SIZE	16
#define MSG_BUFFER_SIZE 	64
#define FILE_BUFFER_SIZE	128
#define JSON_BUFFER_SIZE	256
#define UPAGENT_LOG_SIZE	131070
#define BDBOX_SUBSCRIPTION_STATUS_BUFFER_MAX_SIZE  16

/* Defines for the return values */
#define FAIL -1


#ifndef FALSE
#define FALSE 0
#endif
#ifndef TRUE
#define TRUE (!FALSE)
#endif

/* Defines for the DAL-RA-SPC related activities */
#define MODULENAME "Ra"
#define POLL_DELAY 5
#define MAX_RETRY 3

/* Defines for the debugging */
#define DEBUG 0

/* Supported d2 Error Types */
enum check_d2_error {

  ERROR_OK_RA,
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

enum SpcActState {
  ACTIVATED = 1,
  PROVISIONED = 2,
  DEACTIVATED = 3,
  NONE = 4,
};
 
enum SpcToggle {
  ENABLED = 1,
  DISABLED = 2,
};

// return codes for ra module
enum ra_ret_codes {
    RA_RET_SUCCESS,
    RA_RET_FAILURE
};

char ra_toggle[BUFFER_SIZE_16];       //stores the spc status for toggling
char raspcstatus[BUFFER_SIZE_16];
char raState[BUFFER_SIZE_32];          // stores the action for ra
char raAction[BUFFER_SIZE_32];          // stores the action for ra
char racircleaction[BUFFER_SIZE_16];    //stores circleaction for ra
char raEnableConfig[BUFFER_SIZE_8];     // stores the access token for ra
char racircleId[BUFFER_SIZE_128];        // stores the circleid for ra
char rantpResult[BUFFER_SIZE_8];         //stores the ntp result from updated by ODM in table
char raJson_path[BUFFER_SIZE_64];        //stores the folder path for json file
char racloudhost[BUFFER_SIZE_64];       // stores the cloudhost for ra
char racuuid[BUFFER_SIZE_128];           // stores the cuuid for ra
char raProHwUrl[BUFFER_SIZE_128];        // stores the provision hw url for ra
int raLastTime;    // stores the refresh token for ra
int raLastErrorTime;    // stores the refresh token for ra
int raErrorId;    // stores the refresh token for ra
char raErrorMessage[BUFFER_SIZE_128];    // stores the refresh token for ra
int noResRetryCount;  //stores the retry count for no response in CUUID
int failResRetryCount;  //stores the retry count for fail response in CUUID

//char *caRunningStatusSet = "";
//char *caProvisionStatusSet = "";
//char *caRcClientStatusSet = "";

/* DAL */
int signal_user2_handler();
void print_err(enum check_d2_error err);
//!< Function to print the d2 error message
void showD2Err(int line_number, const char* table, char* field, enum d2_error err);
#ifdef __cplusplus
}
#endif
#endif //_DALRASPC_DEF_H_
