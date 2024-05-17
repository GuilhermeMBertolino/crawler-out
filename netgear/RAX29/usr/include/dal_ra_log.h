/************
 *
 * Filename:	dal_ra_log.h
 * Purpose:	logging functionality for the ra process
 *		It can be configured to log to console and to log file 
 * Copyright:	(c) Netgear Inc.
 *		2020 All rights reserved 
 * Author:	@VVDN TECHNOLOGIES
 *
 ************/

/* Define to prevent recursive inclusion---------------------*/

#ifndef _INTF_LOG_H_
#define _INTF_LOG_H_

#include <stdio.h>

/*
 *  debug output levels.
 *  One of them has to be set to __log_level
 */
#define RA_LOG_DEBUG	1
#define RA_LOG_INFO	    2
#define RA_LOG_WARNING	3
#define RA_LOG_ERROR	4
#define RA_LOG_SILENT	5 /** only for declaring __log_level - no debug output */

/** define which adds filename, line number to log */
#define log(log_level, ...)                                                    \
  log_printf(log_level, __FILE__, __LINE__, __VA_ARGS__)

/* define functions which have to be used for debug messages ,
 * Always call these functions for logging!
 * developer needs to be careful to define the levels
 */
#define log_debug(...) log(RA_LOG_DEBUG, __VA_ARGS__)
#define log_info(...) log(RA_LOG_INFO, __VA_ARGS__)
#define log_warning(...) log(RA_LOG_WARNING, __VA_ARGS__)
#define log_error(...) log(RA_LOG_ERROR, __VA_ARGS__)

/** log function - NOT to be called directly, internally used */
extern void __attribute__((format(printf, 4, 5)))
log_printf(int log_level, const char *fname, int lineno, const char *fmt, ...);
extern void set_log_level(_Bool checkForConfiguration, char *moduleName, char *exec_binaryName);
/** default log level have to be declared somewhere: RA_LOG_DEBUG, RA_LOG_INFO,
 * RA_LOG_WARNING, RA_LOG_ERROR, RA_LOG_SILENT */
extern int __log_level;

/** variable which have to be declared somewhere to output debug to stdin: 0 -
 * no, 1 - yes */
extern int __log_to_console;

/** variable which have to be declared somewhere to output debug to log file: 0
 * - no, 1 - yes */
extern int __log_to_file;

extern char __log_file_name[BUFFER_SIZE_32];
extern char __exec_binary_name[BUFFER_SIZE_32];
#endif /* _INTF_LOG_H_ */
