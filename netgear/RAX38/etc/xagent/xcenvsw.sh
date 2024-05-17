#!/bin/sh
#
# Copyright: (c) 2018 Netgear, Inc.
#            All rights reserved
#

# package list
PKGS="xagent remGenie upagent bst"


switch() {
	for pkg in ${PKGS};
	do
		echo "Switching ${pkg} to ${1} environment" > /dev/kmsg
		( cd ${pkg}; ./switch.sh $1 )
	done
}

check_server() {
        if [ $1 == 'chpcloud' ]
        then
        ( cd ./upagent; ./switch.sh $2 )
        elif [ $1 == 'xcloud' ]
        then
        ( cd ./xagent; ./switch.sh $2 )
        elif [ $1 == 'bdcloud' ]
        then
                if [ $2 == 'qa' ]
                then
                sh /usr/share/armor/change_cloud_server.sh set_server qa
                elif [ $2 == 'prod' ]
                then
                sh /usr/share/armor/change_cloud_server.sh set_server production
                else
                echo " server $2 is not supported by BDServices"
                fi   
        elif [ $1 == 'bst' ]
        then
        ( cd ./bst; ./switch.sh $2 )
        elif [ $1 == 'remGenie' ]
        then
        ( cd ./remGenie; ./switch.sh $2 )
        fi      
}

while [ 1 ];
do
	# wait for value change
	d2 -w XagentCtrl.xcenv
	
	case "$(d2 -s XagentCtrl.xcenv)" in
	dev)
	   # switch config to dev environment
       getvalua=$(d2 -s XagentCtrl.xcserver)
       if [ $getvalua == 'all' ]
       then
	   switch dev
       else
       check_server $getvalua dev
       fi
	   ;;
	qa)
	   # switch config to QA environment
       getvalub=$(d2 -s XagentCtrl.xcserver)
       if [ $getvalub == 'all' ]
       then
	   switch qa
	   #switch bdcloud to the QA server 
           sh /usr/share/armor/change_cloud_server.sh set_server qa
       else
       check_server $getvalub qa
       fi
	   ;;
	qa2)
	   # switch config to QA environment
       getvaluc=$(d2 -s XagentCtrl.xcserver)
       if [ $getvaluc == 'all' ]
       then
	   switch qa2
       else
       check_server $getvaluc qa2
       fi
	   ;;
	beta)
	   # switch config to BETA environment
       getvalud=$(d2 -s XagentCtrl.xcserver)
       if [ $getvalud == 'all' ]
       then
	   switch beta
       else
       check_server $getvalud beta
       fi
	   ;;
	staging)
	   # switch config to staging environment
       getvalue=$(d2 -s XagentCtrl.xcserver)
       if [ $getvalue == 'all' ]
       then
	   switch staging
       else
       check_server $getvalue staging
       fi
	   ;;
	prod)
	   # switch config to production environment
       getvaluf=$(d2 -s XagentCtrl.xcserver)
       if [ $getvaluf == 'all' ]
       then
	   switch prod
	   #switch bdcloud to the production server 
           sh /usr/share/armor/change_cloud_server.sh set_server production
       else
       check_server $getvaluf prod
       fi
	   ;;
	*)
	   # some sort of error
	   echo "Unsupported xcloud env: $(d2 -s XagentCtrl.xcenv)" > /dev/kmsg 
	   ;;
	esac
	
	# reset value back
	d2 -c XagentCtrl.xcenv none
       d2 -c XagentCtrl.xcserver all

done
