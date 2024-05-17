#!/bin/sh
#
# Script to set run time log levels for DAL subsystems
#
# Copyright 2020 Netgear Inc.
#
# $1 - Module name: "dal_ash", "bst", "fing_dil" , "upagent", "dalh", "csh", "ra"
# $2 - Log level: "LOG_DEBUG" , "LOG_ERROR", "LOG_WARNING" , "LOG_SILENT" , "LOG_INFO"
# $3 - Log_To_Console : "true or false"
# $4 - Log_To_file: "true or false"
# $5 - Log_file_name: "Name of the log file"
#
# Need to make this release tag flexible and configurable
#

Pkgs="dal_ash bst csh dalh fing_dil upagent ra"
logLevels="LOG_DEBUG LOG_ERROR LOG_WARNING LOG_SILENT LOG_INFO"

moduleName=$1
userLogLevel=$2
userLogToConsole=$3
userLogToFile=$4
userFileName=$5

###################################################################################
# function    : setd2Value
# param 1     : DAL subsystem module name, input by the user
# param 2     : Log level for the DAL subsytem, input by the user
# param 3     : Log to console value for the DAL subsystem, input by user
# param 4     : Log to file value for DAL subsystem, Input by user
# Description : This function is used to change the log level for the DAL subsystem 
#               in runtime.
###################################################################################
 
setd2value() {

   case $1 in

     dal_ash)
	d2 -c dallogcfg[0].AshLogLevel ${2}
	d2 -c dallogcfg[0].AshLogToConsole ${3}
	d2 -c dallogcfg[0].AshLogToFile ${4}
 	d2 -c dallogcfg[0].AshLogFileName "/tmp/dal_ash.log"
	d2 -c dallogcfg[0].AshConfigurationApply true
        ;;

     bst)
        d2 -c dallogcfg[0].BstLogLevel ${2}
        d2 -c dallogcfg[0].BstLogToConsole ${3}
        d2 -c dallogcfg[0].BstLogToFile ${4}
        d2 -c dallogcfg[0].BstLogFileName "/tmp/bst.log"
	d2 -c dallogcfg[0].BstConfigurationApply true
        ;;

     csh)
    	d2 -c dallogcfg[0].CshLogLevel ${2}
        d2 -c dallogcfg[0].CshLogToConsole ${3}
        d2 -c dallogcfg[0].CshLogToFile ${4}
        d2 -c dallogcfg[0].CshLogFileName "/tmp/csh.log"
	d2 -c dallogcfg[0].CshConfigurationApply true
        ;;

     dalh)
	d2 -c dallogcfg[0].DalhLogLevel ${2}
        d2 -c dallogcfg[0].DalhLogToConsole ${3}
        d2 -c dallogcfg[0].DalhLogToFile ${4}
        d2 -c dallogcfg[0].DalhLogFileName "/tmp/dalh.log"
	d2 -c dallogcfg[0].DalhConfigurationApply true
	;;

     fing_dil)
	d2 -c dallogcfg[0].FingLogLevel ${2}
        d2 -c dallogcfg[0].FingLogToConsole ${3}
        d2 -c dallogcfg[0].FingLogToFile ${4}
        d2 -c dallogcfg[0].FingLogFileName "/tmp/fing_dil.log"
	d2 -c dallogcfg[0].FingConfigurationApply true
        ;;
     
      upagent)
	d2 -c dallogcfg[0].UpagentLogLevel ${2}
        d2 -c dallogcfg[0].UpagentLogToConsole ${3}
        d2 -c dallogcfg[0].UpagentLogToFile ${4}
        d2 -c dallogcfg[0].UpagentLogFileName "/tmp/UpAgent.log"
	d2 -c dallogcfg[0].UpagentConfigurationApply true
        ;;

      ra)
        d2 -c dallogcfg[0].RaLogLevel ${2}
        d2 -c dallogcfg[0].RaLogToConsole ${3}
        d2 -c dallogcfg[0].RaLogToFile ${4}
        d2 -c dallogcfg[0].RaLogFileName "/tmp/Ra.log"
        d2 -c dallogcfg[0].RaConfigurationApply true
        ;;


     *)
        echo "ERROR: Failed to set the values for the DAL subsystem!!!"
        ;;
     
     esac
   	
     echo ""
     echo "Log Level changed sucessfully for $1!!!"
     echo ""

   exit
}

###################################################################################
# function    : comparemodule
# param 1     : DAL subsystem module name, input by the user
# Description : This function is used to compare the module, input by the user
###################################################################################

compareModules() {
   boolean=false
   ## Compare the dal subsystem module name with the input provided by user
   for package in ${Pkgs}
   do
      if [ $moduleName = ${package} ]; then
         echo "Module name matched: $package"
         boolean=true
         break;
      fi
   done

   ## Comapre the boolean value for the DAL subsystems
   if [ "$boolean" = false ]; then
        echo "ERROR: DAL subsystem module name \"$moduleName\" is incorrect!!!"
	echo "INFO: Valid Option are below -  case sensitive"
        echo "	dal_ash -- For Armor module"
        echo "	bst -- For Background Speed Test module"
        echo "	csh -- For CircleV2 module"
        echo "	dalh -- For dalh module"
        echo "	fing_dil -- For Fing module"
	echo "	upagent -- For UpAgent module"   
	echo "  ra -- For dal-ra module"     
        exit
   fi
} 


###################################################################################
# function    : compareLogLevel
# param 1     : DAL subsystem module name, input by the user
# Description : This function is used to compare the module, input by the user
###################################################################################

compareLogLevel() {

   # compare the Loglevel of  DAL susbsystem with userLoglevel input 
   for level in ${logLevels}
   do
      if [ "$userLogLevel" = ${level} ]; then
         echo "LOG level for the $moduleName is: $level"
         return
      fi
   done
   ## Comapre the boolean value for the DAL subsystems
   if [ -z "$userLogLevel" ]; then
        echo "ERROR: Too few arguments, Value of Log Level is required!!!"
   else
	echo "ERROR: For $moduleName, Log level \"$userLogLevel\" is incorrect!!!"
   fi
   echo "INFO: Valid Option are below -  case sensitive"
   echo "	LOG_SILENT -- To disable all the logs for the DAL subsystem"
   echo "	LOG_DEBUG -- To enable the debug logs for the DAL subsystem"
   echo "	LOG_INFO -- To enable only infomation related logs"
   echo "	LOG_ERROR -- To enable only the error related logs"
   echo "	LOG_WARNING -- To enable only warning related logs"	
   exit
}

###################################################################################
# function    : compareboolean
# param 1     : value log to console/ log to file, input by the user
# Description : This function is used to compare value of log to console and 
#		log to file, input by the user
###################################################################################

compareboolean() {

   if [ "$2" = true ]; then
         echo "$1 value is: $2"
	 return
   elif [ "$2" = false ]; then
	 echo "$1 value is: $2"
	 return
   elif [ -z "$2"  ]; then
	echo "ERROR: Too few arguments, $1 Value is missing!!!"
   else
	echo "ERROR: For $1,value \"$2\" is incorrect!!!"
   fi
   echo "INFO: Valid Option are below -  case sensitive"
   echo "	true -- To Enable the logs"
   echo "	false -- To Disbale the logs"
   exit

}

###################################################################################
# function    : main
# Description : This function is used to handle the log levels and chage it
#               in runtime
###################################################################################

main() {
   boolean=false
   ## Compare the dal subsystem module name with the input provided by user
   compareModules
   ## Compare the Log level for the DAL subsystem with the input provided by user
   compareLogLevel
  
   ## if the log level is LOG_SILENT then no need to verify next inputs given by user
   ## i.e LogToConsole, LogToFile, LogFileName

   if [ $userLogLevel = "LOG_SILENT" ]; then
	setd2value $moduleName $userLogLevel "false" "false"
   fi

   ## Compare the value of logToConsole input provided by the user
   compareboolean "LogToConsole" $userLogToConsole

   ## Compare the value of logToFile input provided by the user
   compareboolean "LogToFile" $userLogToFile

   ## Set the log Level in dallogcfg table as per the module input by user
   setd2value $moduleName $userLogLevel $userLogToConsole $userLogToFile

}

######################################################################################
# function    : uasge
# param 1     : Script name
# Description : This function helps users to operate the script to set the log levels
######################################################################################

usage() {
    echo ""
    echo "usage: $0 <DAL subsystem module name> <Log Level> <Log to console> <Log to file>"
    echo ""
    echo "Modules for the DAL subsystem are below -  case sensitive"
    echo "	dal_ash -- Armor module"
    echo "	bst -- Background Speed Test module"
    echo "	csh -- CircleV2 module"
    echo "	dalh -- dalh module"
    echo "	fing_dil -- Fing module"
    echo "	upagent -- UpAgent module"
    echo "      ra -- dal-ra module"

    echo ""

    echo "Log Levels for the DAL Subsystem are below -  case sensitive"
    echo "	LOG_SILENT -- To disable all the logs for the DAL subsystem"
    echo "	LOG_DEBUG -- To enable the debug logs for the DAL subsystem"
    echo "	LOG_INFO -- To enable only infomation related logs"
    echo "	LOG_ERROR -- To enable only the error related logs"
    echo "	LOG_WARNING -- To enable only warning related logs"

    echo "" 

    echo "Value of the Log to console and Log to file  for the DAL Subsystem are below -  case sensitive"
    echo "	true -- To enable the logs for the DAL subsystem"
    echo "	false -- To disable the debug logs for the DAL subsystem"

    echo ""
    echo "For Examples :"
    echo "$0 upagent LOG_SILENT"
    echo "$0 dal_ash LOG_DEBUG  true true"
    echo "$0 fing_dil LOG_DEBUG  true false"
    echo ""
    exit
}

###################################################################################
# function    : check_args
# param 1     : Toatal number of command line arguments, input by the user
# Description : This function is used to validate the command line arguments
###################################################################################
check_args()
{
    if [ $# -eq 0 ]; then
	echo "ERROR: Incomplete command!!!"
        echo "For help : sh $0 --help"
    elif [ $# -gt 4 ]; then
        echo "ERROR: Too many arguments!!!"
        echo "For help : sh $0 --help"
    elif [ $# -eq 1 ]; then
 	if [ $1 = "--help" ]; then
           usage $0
	else
	   main
	fi
    elif [ $# -ge 2 ]; then
	main
    fi	
}

check_args $@

