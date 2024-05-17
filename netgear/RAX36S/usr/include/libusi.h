//
//  libusi.h
//  doc
//
//  Created by Andrey Zmushko on 8/12/19.
//  Copyright © 2019 NETGEAR. All rights reserved.
//

#ifndef libusi_h
#define libusi_h

#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif
    
    typedef struct config {
        char* profilePath;
        char* storageFile;
        char* logFile;
        unsigned logSize;
        int logCount;
        int logLevel;
    } GlobalConfig;

    int usiGet(const char* key,  char** value); // allocate memory for value, return: 0 - success, negative value - error status
    int usiSet(const char* key, const char* value); // return: 0 - success, negative value - error status
    int usiUnset(const char* key); // return: 0 - success, negative value - error status
    int usiShow(char** content); // allocate memory for content, return: 0 - success, negative value - error status
    int usiCommit(void); // return: 0 - success, negative value - error status
    const char* usiStrerror(int); // error status in human format
    const char* usiGetCurrentProfile(void); // current profile
    const char* usiGetCurrentConfig(void); // current config
    int usiSetProfile(const char* path); // set current profile
    int usiSetConfigFile(const char* path); // set current config
    int usiSetStorageFile(const char* path); // set current storage file

#ifdef __cplusplus
}
#endif

#endif /* libusi_h */
