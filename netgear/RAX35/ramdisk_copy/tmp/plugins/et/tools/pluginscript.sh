#!/bin/sh
ROOT_DIR=/tmp/plugins/et/tools
$ROOT_DIR/create-commands.sh $1 
MAX_FIELDS=`cat $ROOT_DIR/endurance.template1 |awk -F ':' '{print NF}'`
cp -f $ROOT_DIR/endurance.template1 $ROOT_DIR/endurance.template.bkup1
	FILE_NAME=$ROOT_DIR/endurance.template.bkup1
	rm -rf $ROOT_DIR/test1.plugin
	until [ $MAX_FIELDS -lt 1 ]
	do
	FIELD_ID=`cat $FILE_NAME  |awk -F ":" '{print $1}'`
	PLUGINID=`echo $FIELD_ID|awk -F "-" '{ print $1}'`
	COMMAND_IDS=`echo $FIELD_ID|awk -F "-" '{print $2}'`
	COMMANDS=`echo $COMMAND_IDS | cut -d "(" -f2 | cut -d ")" -f1`
	MAX_CMDS=`echo $COMMANDS |awk -F ',' '{print NF}'`
	until [ $MAX_CMDS -lt 1 ]
	do
                COMMANDID=`echo $COMMANDS|awk -F "," '{print $1}'`
                PLUGINNAME=`grep PLUGIN_ID=$PLUGINID /etc/pad/plugins/*.plugin`
                PLUGIN_NAME=`echo $PLUGINNAME | cut -d ':' -f 1`
		sed -n "/COMMAND_ID=$COMMANDID\b/,/CMD_END/p" $PLUGIN_NAME >> $ROOT_DIR/test1.plugin
                COMMANDS=`echo $COMMANDS | sed "s/$COMMANDID,//"`
		MAX_CMDS=`expr $MAX_CMDS - 1`
	 done
	FIELD_ID_REPLACE=`echo $FIELD_ID`:
	sed -i "s/$FIELD_ID_REPLACE//" $FILE_NAME
	echo "plugin_desc=Endurance test result $1" > /tmp/plugins/endurance.plugin
	echo "version= " >> /tmp/plugins/endurance.plugin
	echo "  " >> /tmp/plugins/endurance.plugin
	cat $ROOT_DIR/test1.plugin >> /tmp/plugins/endurance.plugin
	MAX_FIELDS=`expr $MAX_FIELDS - 1`
	done
	rm -rf $ROOT_DIR/endurance.template1  $ROOT_DIR/endurance.template.bkup1 $ROOT_DIR/test1.plugin
