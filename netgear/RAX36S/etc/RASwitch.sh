#!/bin/bash
set -x;
MODULE_NAME=$1
VALUE=$2

if [ $# -ne 2 ]
then 
	echo "" 
	echo "     !!!Invalid number of argument" 
	echo "usage: ./RASwitch.sh <module_name> <true/false>"
	echo "For example:"
	echo "./RASwitch.sh armor true/false"

else

	module_name=$(echo "$MODULE_NAME" | awk '{print tolower($0)}')
	value=$(echo "$VALUE" | awk '{print tolower($0)}')
	if [ $module_name == "armor" ]
	then
		if [ $value == "true" || $value == "false" ]
		then
			echo "switching armor"
			d2 -c armorraswitch[0].armorRaSwitch $value
		else
			echo "PLease provide correct value (either true/false)"
		fi
	else
		echo "Please provide correct module name"

	fi
fi

