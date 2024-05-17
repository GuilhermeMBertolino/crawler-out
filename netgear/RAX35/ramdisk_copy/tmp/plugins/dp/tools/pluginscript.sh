#!/bin/sh
ROOT_DIR=/tmp/plugins/dp/tools
$ROOT_DIR/create-commands.sh $1 
MAX_FIELDS=`cat $ROOT_DIR/datapath.template1 |awk -F ':' '{print NF}'`
cp -f $ROOT_DIR/datapath.template1 $ROOT_DIR/datapath.template.bkup1
	FILE_NAME=$ROOT_DIR/datapath.template.bkup1
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
	echo "plugin_desc=Datapath-Debug $1" > /tmp/plugins/datapath.plugin
	echo "version= " >> /tmp/plugins/datapath.plugin
	echo "  " >> /tmp/plugins/datapath.plugin
	cat $ROOT_DIR/test1.plugin >> /tmp/plugins/datapath.plugin
	MAX_FIELDS=`expr $MAX_FIELDS - 1`
	done
	rm -rf $ROOT_DIR/datapath.template1  $ROOT_DIR/datapath.template.bkup1 $ROOT_DIR/test1.plugin
