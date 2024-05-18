#!/bin/sh

filename="/etc/proc.conf"
echo "####################set proc configuration###################"
if [ ! -f $filename ]
then 
	echo "proc configuration file is no exist."; 
	exit
fi

while read line
do
	result=$(echo ${line:0:1} | grep "#")
	if [[ "$result" != "" ]]
	then
		continue
	fi
	
	result=$(echo $line | grep "=")
	if [[ "$result" != "" ]]
	then
	     key=$(echo $line | awk -F '=' '{print $1}' | sed 's/^[ \t]*//g' | sed 's/[ \t]*$//g')
		 value=$(echo $line | awk -F '=' '{print $2}')
		 echo $value > $key
	fi
	
done < $filename
