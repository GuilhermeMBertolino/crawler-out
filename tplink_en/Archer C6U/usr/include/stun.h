
/*****************************************************************************
Copyright? 2004-2015 TP-LINK TECHNOLOGIES CO., LTD.
File name: stun.h
Description: stunclient. 给出libstun接口
Author: AaronChen
Version: in code
Date: continuing
History: in svn
*****************************************************************************/


#ifndef STUN_H
#define STUN_H

#ifdef __cplusplus
extern "C"
{
#endif

typedef enum {
	NAT_TYPE_START = -1,
	NAT_TYPE_OPEN = 0x00,
	NAT_TYPE_INDEPENDENT_FILTER = 0X02,
	NAT_TYPE_DEPENDENT_FILTER = 0x04,
	NAT_TYPE_PORT_DEPENDENT_FILTER = 0x06,
	NAT_TYPE_DEPENDENT_MAPPING = 0x08,
	NAT_TYPE_FIREWALL = 0x0A,
	NAT_TYPE_BLOCKED = 0x0C,
	NAT_TYPE_END,
}NAT_TYPE;
/**
 * Function: stunGetExtrIpAndPort
 * Description: get current external ip and port
 * Input: 
 *		fd: The udp file descriptor, created automatically and closed by caller if it equals to 0
 *		localPort: The lcoal udp port, genarated Randomly if it equals to 0
 *		svrHostname: The Server Domain or IP Address, can't be null 
 * Output: 
 *		extrIp: external ip address
 *		extrPort: external udp port
 * Return: 1: OK ; 0: Fail
**/
int stunGetExtrIpAndPort(int fd, unsigned short localPort, char *svrHostname,
							unsigned int *extrIp, unsigned short *extrPort);

/**
 * Function: stunGetNatType
 * Description: get current nat type
 * Input: 
 *		priFd: The primary udp file descriptor, created automatically closed by caller if it equals to 0
 *		priPort: The primary lcoal udp port, genarated Randomly if it equals to 0
 *		svrHostname: The Server Domain or IP Address, can't be null 
 * Output: Nat type
 * Return: 1: OK ; 0: Fail
**/
int stunGetNatType(int priFd, unsigned short priPort, char *svrHostname, int *natType);

/**
 * Function: setLogLevel
 * Description: set Log Level
 * Input:  0: debug, 1:warn, 2:error
**/
void setLogLevel(int logLevel);

#ifdef __cplusplus
}
#endif

#endif

