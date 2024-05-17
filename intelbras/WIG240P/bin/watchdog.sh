#!/bin/sh
#####################################################################################################
#
#	watchdog.sh
#
#	Descri: Shell script que executado em background que efetua o ping watchdog. Eh chamado
#       no init.sh
#
#	Data: 31/03/2010
#	Autor: Leonardo A. Plesch - le046319
#	Intelbras S.A.        
#
#####################################################################################################
TOOL=flash
GETMIB="$TOOL get"
pingTimes=0

##watch webs
#ps > /var/ps.watch
#webs_running=`cat /var/ps.watch | sed -n '/\bwebs\b/p'`
#if [ -z "${webs_running}" ];then
#	echo "webs is down, re-up..."
#	webs &
#fi
count1=0
infiniteLoop=1
watch_interval=3

while [ $infiniteLoop = 1 ]; do

#Rotina de delay
	#debug 
	# echo "Rotina de delay"        
	#

        eval `$GETMIB WATCHDOG_INTERVAL`


        #debug
        #echo "WATCHDOG_INTERVAL:"
        #echo $WATCHDOG_INTERVAL 
        #
	 
	#debug
        #echo "watch_interval:"
        #echo $watch_interval
        #

        while [ $count1 -lt $watch_interval ]
        do
                eval `$GETMIB WATCHDOG_INTERVAL`
		
		#debug
		#echo "count1:"
		#echo $count1
		#		

                if [ $WATCHDOG_INTERVAL -gt 0 ] && [ $watch_interval -ne $WATCHDOG_INTERVAL ] 
                then
                        watch_interval=$WATCHDOG_INTERVAL
                        count1=0

                        #debug
                        #echo "MUDOU O INTERVALO DE WATCHDOG"
		else
			count1=`expr $count1 + 1`
                        #debug
                        #echo "Nao mudou o intervalo de Watchdog"
                        #
                fi

		#debug
		#echo "watch_interval loop Sleep"
		#echo $watch_interval
		#

                sleep 60
        done

        count1=0;
#>

	
#>Executa o ping
	pingTimes=0
	
	#debug
	#echo Executando Ping Watchdog
	#
	eval `$GETMIB WATCHDOG_ENABLE`
	if [ $WATCHDOG_ENABLE -eq 1 ]
	then
		eval `$GETMIB WATCHDOG_IP`
		#debug
		#echo Ping Watchdog Habilitado
		#

		#ping for 5 times
		for tempVar in 1 2 3 4 5
		do
			#debug
			#echo "in for...."
			#
			ping  $WATCHDOG_IP
			#
			#count how many times ping fail
			if [ $? -gt 0 ]; then
     				pingTimes=`expr $pingTimes + 1`
  			fi
			sleep 4
		done
		#debug
		#echo pingTime:$pingTimes
		#

		#if more than 4 packet lost(means 5 packet lost),reboot
		if [ $pingTimes -gt 4 ]
		then
			#debug
			#echo "ping fail for 5 times, and system will reboot..."
			#
			reboot
		fi
	fi
#>
done
