#!/bin/sh
#Copyright(c) 2015 Shenzhen TP-LINK Technologies Co.Ltd.
#
#\file		getisp	
#
#date:2015/1/21
#author:lilangji

MODEMLIB=/usr/lib/modem
. ${MODEMLIB}/usbmodem_log.sh
log() {
	echo "==>Modem Get ISP" "$@" >> /dev/console
}

#get mcc and mnc from imsi
#input :imsi such as 250026605286579
#return :mcc¡¢mnc
get_mcc_mnc()
{
	local mcc=""
	local mnc=""
	if [ $# -lt 1 ];then
		exit 1 
	else 
		local imsi=$(echo $1 | sed 's/\"//g')
		local index=1
		local count=0	
		while [ $index -le ${#imsi} ]
		do
			strtmp=`echo $imsi | awk -v indextmp="$index" '{print substr($0,indextmp,1)}'`

			if [ $strtmp -ge '0' -a $strtmp -le '9' ];then
				#((count++))
				count=$(($count+1))
			else
				count=0
			fi
			if [ $count -eq 15 ];then
				break
			fi
			index=$(($index+1))
		done
		if [ $count -eq 15 ];then
			mcc=`echo $imsi | awk -v indextmp="$index" '{print substr($0,indextmp-14,3)}'`
			mnc=`echo $imsi | awk -v indextmp="$index" '{print substr($0,indextmp-14+3,3)}'`
			echo "$mcc"
			echo "$mnc"
		fi
	fi
}

#get isp_name from 3g.json through mcc and mnc
#input :mcc¡¢mnc
#output :isp_name
get_isp_name()
{
	if [ $# -lt 2 ];then
		exit 1
	fi
	local FILE_ISP_JSON="/www/webpages/data/location.json"
	if [ ! -e $FILE_ISP_JSON ];then
		echo "file not found"
		exit 1
	fi
	awk -v mcc="$1"\
		-v mnc="$2"\
	'\
	BEGIN {
			locationIndex=""
			ispIndex=""
			ispName=""
			dialNum=""
			apn=""
			userName=""
			passWord=""
			findCountry=0
			findIsp=0
			locationMCC=sprintf("\"location_mcc\": \"%s\"", mcc)
			mncMatch[void]=""
		}
	{
		if($0 ~ /location[0-9]/ )
		{
			if(0==findCountry)
			{
				split($0,arr,"\"")
				locationIndex=substr(arr[2],9,length(arr[2])-length("location"))
			}
			else
			{
				
				exit 0
			}
		}
		if($0 ~ /isp[0-9]/ )
		{
			split($0,arr,"\"")
			ispIndex=substr(arr[2],4,length(arr[2])-length("isp"))
		}
		if(index($0,locationMCC) != 0)
		{
			findCountry=1
		}
		if(1 == findCountry && index($0,"isp_mnc") != 0 )
		{
			split($0,mncMatch,"\"")
			if(mncMatch[4] != "")
			{
				if((2 == length(mncMatch[4]) && index(mncMatch[4],substr(mnc,1,2)) != 0)\
				|| (3 == length(mncMatch[4]) && index(mncMatch[4],mnc) != 0))
				{
					findIsp=1
				}
			}
		}
		if(1 == findCountry && 1 == findIsp)
		{
			if(index($0,"isp_name") != 0)
			{
				split($0,fields,"\"")
				ispName=fields[4]
			}
			if(index($0,"dial_num") != 0)
			{
				split($0,fields,"\"")
				dialNum=fields[4]
			}
			if(index($0,"apn") != 0)
			{
				split($0,fields,"\"")
				apn=fields[4]
			}
			if(index($0,"username") != 0)
			{
				split($0,fields,"\"")
				userName=fields[4]
			}
			if(index($0,"password") != 0)
			{
				split($0,fields,"\"")
				passWord=fields[4]
				exit 0
			}
		}
	}\
	END{
		if (0 == findCountry)
			locationIndex = ""
		if (0 == findIsp)
			ispIndex = ""
		print  locationIndex "," ispIndex "," ispName "," dialNum "," apn "," userName "," passWord
	}\
	' < $FILE_ISP_JSON 
}
#get_isp_name $1 $2

#get isp params from 3g.json through locationIndex and ispIndex
#input :locationIndex,ispIndex
#output :isp params
get_isp_params()
{
	if [ $# -lt 2 ];then
		exit 1
	fi
	local FILE_ISP_JSON="/www/webpages/data/location.json"
	if [ ! -e $FILE_ISP_JSON ];then
		echo "file not found"
		exit 1
	fi
	awk -v location_index="$1"\
		-v isp_index="$2"\
	'\
	BEGIN {
			dialNum=""
			apn=""
			userName=""
			passWord=""
			findCountry=0
			findIsp=0
			locationIndex=sprintf("\"location%s\":", location_index)
			ispIndex=sprintf("\"isp%s\":", isp_index)
		}
	{
		if($0 ~ /location[0-9]/ )
		{
			if(index($0,locationIndex) != 0)
			{
				findCountry=1
			}
			else
			{			
				findCountry=0
			}
		}
		if(1 == findCountry && $0 ~ /isp[0-9]/ )
		{
			if(index($0,ispIndex) != 0)
			{
				findIsp=1
			}
			else
			{			
				findIsp=0
			}
		}
		if(1 == findCountry && 1 == findIsp)
		{
			if(index($0,"dial_num") != 0)
			{
				split($0,fields,"\"")
				dialNum=fields[4]
			}
			if(index($0,"apn") != 0)
			{
				split($0,fields,"\"")
				apn=fields[4]
			}
			if(index($0,"username") != 0)
			{
				split($0,fields,"\"")
				userName=fields[4]
			}
			if(index($0,"password") != 0)
			{
				split($0,fields,"\"")
				passWord=fields[4]
				exit 0
			}
		}
	}\
	END{
		if (0 == findCountry)
			locationIndex = ""
		if (0 == findIsp)
			ispIndex = ""
		print  locationIndex "," ispIndex "," dialNum "," apn "," userName "," passWord
	}\
	' < $FILE_ISP_JSON 
}

log "start get isp automatically"
syslog $LOG_GETISP "start run getisp.sh to get isp automatically." 
if [ $# = 0 ]; then
	proto=$(uci get modem.modeminfo.proto)
	case ${proto} in
	"3g" | "ncm" )
		device=$(uci get modem.modeminfo.cport)
		;;
	"qmi" | "mbim" )
		device="cdc-wdm0"
		;;
	esac
elif [ $# = 2 ]; then
	proto=$1
	device=$2
elif [ $# = 3 ];then
	local locationIndex=$(uci get modem.modemisp.locindex)
	local ispIndex=$(uci get modem.modemisp.ispindex)
	local isp_params=$(get_isp_params $locationIndex $ispIndex)
	locationIndex=$(echo $isp_params | awk '{split($0, arr, ",")
			print arr[1]}')
	ispIndex=$(echo $isp_params | awk '{split($0, arr, ",")
		print arr[2]}')
	local dialNum=$(echo $isp_params | awk '{split($0, arr, ",")
		print arr[3]}')
	local apn=$(echo $isp_params | awk '{split($0, arr, ",")
		print arr[4]}')
	local userName=$(echo $isp_params | awk '{split($0, arr, ",")
		print arr[5]}')
	local passWord=$(echo $isp_params | awk '{split($0, arr, ",")
		print arr[6]}')
	if [ "$ispIndex" ]; then
		uci set modem.modemisp.dial_num=$dialNum
		uci set modem.modemisp.apn=$apn
		uci set modem.modemisp.username=$userName
		uci set modem.modemisp.password=$passWord
		uci commit modem
		log "get isp params succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"
		#syslog $LOG_GETISP "get imsi succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"
	else
		log "modem get isp info fail"
		#syslog $LOG_GETISP "get imsi fail please fill parameters manually."
	fi
	exit 0
else
	log "wrong parameters"
	exit 1
fi
syslog $LOG_GETISP "proto=$proto device=$device." 
case ${proto} in
"3g" | "ncm" )
	get_count=0
	ox=""
	while [ ${#ox} -lt 2 -a $get_count -lt 3 ]
	do
		ox=$(gcom -d /dev/${device} -s /etc/gcom/getimsi.gcom 2>/dev/null)
		syslog $LOG_GETISP "run the command to get imsi(gcom -d /dev/${device} -s /etc/gcom/getimsi.gcom),the retval is $ox,times:$get_count."
        local input=$ox
        if echo $input | grep -q '+CIMI'
        then
            input=$(echo $input | sed -n '/+CIMI:/'p | awk -F ':' '{print $2}')
            input=${input//" "/""}
            ox=$input
        fi		
		log "getisp,times:$get_count"
		get_count=$(($get_count+1))
	done
	if [ ${#ox} -lt 2 ]; then
		log "modem get imsi fail please fill parameters manually"
		syslog $LOG_GETISP "get imsi fail please fill parameters manually."
	else
		mcc_mnc=$(get_mcc_mnc $ox)
		mcc=$(echo $mcc_mnc | awk '{print $1}')
		mnc=$(echo $mcc_mnc | awk '{print $2}')
		ispinfo=$(get_isp_name $mcc $mnc)
		locationIndex=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[1]}')
		ispIndex=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[2]}')
		ispName=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[3]}')
		dialNum=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[4]}')
		apn=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[5]}')
		userName=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[6]}')
		passWord=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[7]}')
		if [ "$ispIndex" ]; then
			uci set modem.modemisp.locindex=$locationIndex
			uci set modem.modemisp.ispindex=$ispIndex
			uci set modem.modemisp.dial_num=$dialNum
			uci set modem.modemisp.apn=$apn
			uci set modem.modemisp.username=$userName
			uci set modem.modemisp.password=$passWord
			uci set modem.modemisp.setisp="auto"
			uci set modem.modemisp.ispstatus='1'
			uci commit modem
			log "get imsi succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"
			syslog $LOG_GETISP "get imsi succeed.mcc:$mcc mnc:$mnc"
			syslog $LOG_GETISP "get imsi succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"

		else
			log "modem get isp info fail"
			syslog $LOG_GETISP "get imsi fail please fill parameters manually."
		fi
	fi	
	;;
"qmi" )
	get_count=0
	ox=""
	while [ ${#ox} -lt 2 -a $get_count -lt 3 ]
	do
		ox=$(uqmi -d /dev/${device} -s --get-imsi 2>/dev/null)
		syslog $LOG_GETISP "run the command to get imsi(uqmi -d /dev/${device} -s --get-imsi),the retval is $ox,times:$get_count."
		log "getisp,times:$get_count"
		get_count=$(($get_count+1))
	done

	if [ ${#ox} -lt 2 ]; then
		log "modem get imsi fail please fill parameters manually"
		syslog $LOG_GETISP "get imsi fail please fill parameters manually."
	else
		mcc_mnc=$(get_mcc_mnc $ox)
		mcc=$(echo $mcc_mnc | awk '{print $1}')
		mnc=$(echo $mcc_mnc | awk '{print $2}')
		ispinfo=$(get_isp_name $mcc $mnc)
		locationIndex=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[1]}')
		ispIndex=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[2]}')
		ispName=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[3]}')
		dialNum=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[4]}')
		apn=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[5]}')
		userName=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[6]}')
		passWord=$(echo $ispinfo | awk '{split($0, arr, ",")
			print arr[7]}')
		if [ "$ispIndex" ]; then
			uci set modem.modemisp.locindex=$locationIndex
			uci set modem.modemisp.ispindex=$ispIndex
			uci set modem.modemisp.dial_num=$dialNum
			uci set modem.modemisp.apn=$apn
			uci set modem.modemisp.username=$userName
			uci set modem.modemisp.password=$passWord
			uci set modem.modemisp.setisp="auto"
			uci set modem.modemisp.ispstatus='1'
			uci commit modem
			log "get imsi succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"
			syslog $LOG_GETISP "get imsi succeed.mcc:$mcc mnc:$mnc"
			syslog $LOG_GETISP "get imsi succeed.locindex:$locationIndex ispindex:$ispIndex dial_num:$dialNum apn:$apn username:$userName password:$passWord"
		else
			log "modem get isp info fail"
			syslog $LOG_GETISP "get imsi fail please fill parameters manually"
		fi
	fi
	;;
"mbim" )
	
	;;
"dhcp" )
	;;
esac
