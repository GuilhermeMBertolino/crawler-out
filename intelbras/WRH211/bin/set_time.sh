#!/bin/sh

#把计1: カ絏
#把计2: ServerDomain name
#########################
#カ絏﹚竡跋
Kwajalein="-720"
Samoa="-660"
Hawaii="-600"
Alaska="-540"
Pacific="-480"
Arizona="-420"
Mountain="-420"
Central="-360"
Tegucigalpa="-360"
Bogota="-300"
Eastern="-300"
Indiana="-300"
Atlantic="-240"
Caracas="-240"
Newfoundland="-210"
Brasilia="-180"
Buenos="-180"
MidAtlantic="-120"
Azores="-60"
Casablanca="0"
Dublin="0"
Amsterdam="60"
Belgrade="60"
Brussels="60"
Sarajevo="60"
Athens="120"
Harare="120"
Baghdad="180"
Moscow="180"
Tehran="210"
Abu="240"
Kabul="270"
EKaterinburg="300"
New_Delhi="330"
Astana="360"
Bangkok="420"
Beijing="480"
Seoul="540"
Adelaide="570"
Canberra="600"
Magadan="660"
Fiji="720"
#########################

case "$1" in
	"$Kwajalein"	)
		t_zonearea="australasia"
		t_dir="Pacific/Kwajalein"
		;;
	"$Samoa"	)
		t_zonearea="australasia"
		t_dir="Pacific/Pago_Pago"
		;;
	"$Hawaii"	)
		t_zonearea="northamerica"
		t_dir="Pacific/Honolulu"
		;;
	"$Alaska"	)
		t_zonearea="northamerica"
		#Lily: not sure....so I choose the middle one... -_-
		t_dir="America/Anchorage"
		;;
	"$Pacific"	)
		t_zonearea="northamerica"
		t_dir="America/Los_Angeles"
		;;
	"$Arizona" | "$Mountain"	)
		t_zonearea="northamerica"
		t_dir="America/Denver"
		;;
	"$Central" | "$Tegucigalpa"	)
		t_zonearea="northamerica"
		t_dir="America/Chicago"
		;;
	"$Bogota" | "$Eastern" | "$Indiana"	)
		t_zonearea="northamerica"
		t_dir="America/New_York"
		;;
	"$Atlantic" | "$Caracas"	)
		t_zonearea="northamerica"
		t_dir="Atlantic/Bermuda"
		;;
	"$Newfoundland"	)
		t_zonearea="northamerica"
		t_dir="America/St_Johns"
		;;
	"$Brasilia" | "$Buenos"	)
		t_zonearea="southamerica"
		t_dir="America/Buenos_Aires"
		;;
	"$MidAtlantic"	)
		t_zonearea="africa"
		t_dir="Atlantic/Reykjavik"
		;;
	"$Azores"	)
		t_zonearea="europe"
		t_dir="Atlantic/Azores"
		;;
	"$Casablanca" | "$Dublin"	)
		t_zonearea="europe"
		t_dir="Europe/Dublin"
		;;
	"$Amsterdam" | "$Belgrade" | "$Brussels" | "$Sarajevo"	)
		t_zonearea="europe"
		t_dir="Europe/Amsterdam"
		;;
	"$Athens" | "$Harare"	)
		t_zonearea="europe"
		t_dir="Europe/Athens"
		;;
	"$Baghdad" | "$Moscow"	)
		t_zonearea="asia"
		t_dir="Asia/Baghdad"
		;;
	"$Tehran"	)
		t_zonearea="asia"
		t_dir="Asia/Tehran"
		;;
	"$Abu"	)
		t_zonearea="asia"
		t_dir="Asia/Baku"
		;;
	"$Kabul"	)
		t_zonearea="asia"
		t_dir="Asia/Kabul"
		;;
	"$EKaterinburg"	)
		t_zonearea="asia"
		t_dir="Asia/Karachi"
		;;
	"$New_Delhi"	)
		t_zonearea="asia"
		t_dir="Indian/Maldives"
		;;
	"$Astana"	)
		t_zonearea="asia"
		t_dir="Asia/Colombo"
		;;
	"$Bangkok"	)
		t_zonearea="asia"
		t_dir="Asia/Bangkok"
		;;
	"$Beijing"	)
		t_zonearea="asia"
		t_dir="Asia/Taipei"
		;;
	"$Seoul"	)
		t_zonearea="asia"
		t_dir="Asia/Tokyo"
		;;
	"$Adelaide"	)
		t_zonearea="australasia"
		t_dir="Australia/Adelaide"
		;;
	"$Canberra"	)
		t_zonearea="australasia"
		t_dir="Australia/Canberra"
		;;
	"$Magadan"	)
		t_zonearea="europe"
		t_dir="Asia/Magadan"
		;;
	"$Fiji"	)
		t_zonearea="australasia"
		t_dir="Pacific/Fiji"
		;;
	*	)
		t_zonearea="asia"
		t_dir="Asia/Taipei"
		;;
esac

if [ "$1" = "" ]
then
	clock_offset="480"
else
	clock_offset="$1"
fi

if [ "$2" = "" ]
then
	server_name="time.nist.gov"
else
	server_name=$2
fi

#echo $t_zonearea
#echo $t_dir
#echo $server_name

#cd /etc/datfiles
#/bin/zic -y /etc/datfiles/yearistypecopy.sh -d /var/config/zoneinfo -L /dev/null $t_zonearea
#cp /var/config/zoneinfo/$t_dir /var/config/zoneinfo/localtime
#ping $server_name  some time server don't not reply icmp
#if [ "$?" = "0" ];then
	ntpclient -c 1 -h $server_name -s -t $clock_offset 
	date
#fi
