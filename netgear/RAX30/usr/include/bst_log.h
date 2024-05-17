/************
 *
 * Filename:    bst_log.h
 * Purpose:     logging functionality of the BST:
 *		 		It can be configured to log to console and to
 *log file Copyright:   (c) Netgear Inc. 2019 All rights reserved Author:      @
 *VVDN TECHNOLOGIES
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
#define BST_LOG_DEBUG   1
#define BST_LOG_INFO    2
#define BST_LOG_WARNING 3
#define BST_LOG_ERROR   4
#define BST_LOG_SILENT  5 /** only for declaring __log_level - no debug output */

#define BUFFER_SIZE_256 256
#define BST_VERSION "1.0.0"
#define BST_VERSION_SUFFIX ""

/** define which adds filename, line number to log */
#define log(log_level, ...)                                                    \
  log_printf(log_level, __FILE__, __LINE__, __VA_ARGS__)

/* define functions which have to be used for debug messages ,
 * Always call these functions for logging!
 * developer needs to be careful to define the levels
 */
#define log_debug(...) log(BST_LOG_DEBUG, __VA_ARGS__)
#define log_info(...) log(BST_LOG_INFO, __VA_ARGS__)
#define log_warning(...) log(BST_LOG_WARNING, __VA_ARGS__)
#define log_error(...) log(BST_LOG_ERROR, __VA_ARGS__)

/** log function - NOT to be called directly, internally used */
extern void __attribute__((format(printf, 4, 5)))
log_printf(int log_level, const char *fname, int lineno, const char *fmt, ...);

/** default log level have to be declared somewhere: BST_LOG_DEBUG, BST_LOG_INFO,
 * BST_LOG_WARNING, BST_LOG_ERROR, BST_LOG_SILENT */
int __log_level = BST_LOG_DEBUG;

/** variable which have to be declared somewhere to output debug to stdin: 0 -
 * no, 1 - yes */
int __log_to_console = 1;

/** variable which have to be declared somewhere to output debug to log file: 0
 * - no, 1 - yes */
int __log_to_file = 0;
const char *__log_file_name = "/tmp/dillog";

#endif /* _INTF_LOG_H_ */
