#!/bin/sh
#
# $Id: //WIFI_SOC/release/SDK_4_1_0_0/source/user/rt2880_app/scripts/storage.sh#1 $
#
# usage: storage.sh
#
#
PART1=`mount | grep "/media/" | sed 's/^.*media/\/media/g' | sed 's/ type.*$//g' | sed -n '1p'`
#PART1="/var"
#echo "script fetch the first partition: $PART1"

setUser()
{
	CurRules=`nvram_get 2860 AdmUsers`
	if [ "$CurRules" == "" ]; then
		exit 0
	fi
	
	ftpenabled=`nvram_get 2860 FtpEnabled`
	FtpRule=`nvram_get 2860 FtpUsers`
	RulesNum=`nvram_get AdmUsers | tr ";" "\n" | wc -l`
	num=1

	while [ $num -le $RulesNum ];
	do
		ftpFind=0
		str=`nvram_get AdmUsers | cut -f$num -d\;`
		id=`expr 500 + $num`
		user=`echo $str | cut -f1 -d,`
		passwd=`echo $str | cut -f2 -d,`
		
		if [ "$ftpenabled" == "1" -a "$FtpRule" != "" ]; then
			#######Ftp need set Path######
			RULESNUM=`nvram_get FtpUsers | tr ";" "\n" | wc -l`
			NUM=1
			while [ $NUM -le $RULESNUM ];
			do
				STR=`nvram_get FtpUsers | cut -f$NUM -d\;`
				USER=`echo $STR | cut -f1 -d,`

				if [ "$user" == "$USER" ]; then
					ftpFind=1
					FTPPATH=`echo $STR | cut -f2 -d,`
				fi
				NUM=`expr $NUM + 1`
			done

			##############################
			if [ $ftpFind == "1" ]; then
				echo "$user::$id:$id:$user:$FTPPATH:/bin/sh" >> /etc/passwd
			else
				echo "$user::$id:$id:$user::/bin/sh" >> /etc/passwd
			fi			
		else
			echo "$user::$id:$id:$user::/bin/sh" >> /etc/passwd
		fi
		echo "$user:x:$id:$user" >> /etc/group
		chpasswd.sh $user $passwd
		num=`expr $num + 1`
	done
}

setUserDir()
{
	CurRules=`nvram_get 2860 AdmUsers`
	if [ "$CurRules" == "" ]; then
		exit 0
	fi
	
	RulesNum=`nvram_get AdmUsers | tr ";" "\n" | wc -l`
	num=1
	
	while [ $num -le $RulesNum ];
	do
		str=`nvram_get AdmUsers | cut -f$num -d\;`
		user=`echo $str | cut -f1 -d,`
		dir=`echo $str | cut -f6 -d,`
		`mkdir -pm 777 "${dir}/home"`
		`mkdir -pm 777 "${dir}/home/${user}"`
		num=`expr $num + 1`
	done
}

setFtp()
{
	ftpname=`nvram_get 2860 FtpName`
	ftpport=`nvram_get 2860 FtpPort`
	ftpguest=`nvram_get 2860 FtpAnonymous`
	ftpguestdir=`nvram_get 2860 FtpAnonymousDir`
	ftpmax=`nvram_get 2860 FtpMaxSessions`
	ftpadddir=`nvram_get 2860 FtpAddDir`
	ftprename=`nvram_get 2860 FtpRename`
	ftpremove=`nvram_get 2860 FtpRemove`
	ftpread=`nvram_get 2860 FtpRead`
	ftpwrite=`nvram_get 2860 FtpWrite`
	ftpdownload=`nvram_get 2860 FtpDownload`
	ftpupload=`nvram_get 2860 FtpUpload`
	admID=`nvram_get 2860 Login`
	admPW=`nvram_get 2860 Password`
	ip=`nvram_get 2860 lan_ipaddr`
	#echo "proftpd.sh server "$ftpname" $ip $ftpport $ftpmax"
	proftpd.sh server "$ftpname" $ip $ftpport $ftpmax
	if [ -e "$PART1" ]; then
		proftpd.sh user $ftpadddir $ftprename $ftpremove $ftpread $ftpwrite $ftpdownload $ftpupload
	fi
	if [ "$ftpguest" == "1" ]; then
		if [ ! -e $ftpguestdir ]; then
			mkdir -p $ftpguestdir
			chmod -R 777 $ftpguestdir
		fi
		proftpd.sh anonymous 10 $ftpguestdir
	fi
}

setFtp2()
{
	t_cmd="pure-ftpd -B -M -0 -9GB18030 -b -u1 -A"
	ftp_anonymous=`nvram_get 2860 ftp_anonymous`
	ftp_updown=`nvram_get 2860 ftp_updown`
	ftp_delmv=`nvram_get 2860 ftp_delmv`
	
	sed -i '/ftp/'d /etc/passwd
 	
	if [ "$ftp_anonymous" == "1" ];then
		echo "ftp::500:500:ftp:$PART1:/bin/sh" >> /etc/passwd
		#if [ "$ftp_delmv" == "1" ];then
		#	sed -i 's/anonymous::500:500/anonymous::0:0/g' /etc/passwd
		#
		#	sed -i 's/anonymous::0:0/anonymous::500:500/g' /etc/passwd
		#fi
		if [ "$ftp_updown" == "1" ];then
		t_cmd=$t_cmd" -K -e"
		fi
		if [ "$ftp_updown" == "0" ];then
		t_cmd=$t_cmd" -e -i"
		fi
		echo "$t_cmd"
		$t_cmd
		
	else
		t_cmd=$t_cmd" -E"
		ftpuser=`nvram_get 2860 ftpuser`
		ftppass=`nvram_get 2860 ftppass`
		if [ "$ftpuser" == "" ];then
			return
		fi
		sed -i "/$ftpuser/"d /etc/passwd
		echo "$ftpuser::500:500:$ftpuser:$PART1:/bin/sh" >> /etc/passwd
		if [ "$ftp_delmv" == "0" ];then
			t_cmd=$t_cmd" -K"
		fi
		chpasswd.sh $ftpuser $ftppass
		#if [ "$ftp_updown" == "1" ];then
		#t_cmd=$t_cmd" -K"
		#fi
		echo "$t_cmd"
		$t_cmd
	fi

}

setSmb()
{
	hostname=`nvram_get 2860 customer_type`
	smbnetbios=`nvram_get 2860 SmbNetBIOS`
	smbwg=`nvram_get 2860 HostName`
	echo "samba.sh "$smbnetbios" "$smbwg""
	samba.sh "$smbnetbios" "$smbwg"
	
	admID=`nvram_get 2860 Login`
	admPW=`nvram_get 2860 Password`
	echo "smbpasswd -a "$admID" "$admPW""
	smbpasswd -a "$admID" "$admPW"
	echo "samba_add_dir.sh -a NCLOUD "/media" "$admID""
	samba_add_dir.sh NCLOUD "/media" "$admID"
	
	if [ -e "$PART1" ]; then
		CurSmbRules=`nvram_get SmbUsers`
		if [ "$CurSmbRules" == "" ]; then
			echo "no Smb"
			exit 0
		fi
		
		RulesNum=`nvram_get SmbUsers | tr ";" "\n" | wc -l`
		num=1
		while [ $num -le $RulesNum ];
		do
			str=`nvram_get SmbUsers | cut -f$num -d\;`
			name=`echo $str | cut -f1 -d,`
			path=`echo $str | cut -f2 -d,`
			user=`echo $str | cut -f3 -d,`
			echo "samba_add_dir.sh "$name" "$path" "$user""
			samba_add_dir.sh "$name" "$path" "$user"
			#######Smb need get Passwd######
			RULESNUM=`nvram_get AdmUsers | tr ";" "\n" | wc -l`
			NUM=1
			while [ $NUM -le $RULESNUM ];
			do
				STR=`nvram_get AdmUsers | cut -f$NUM -d\;`
				USER=`echo $STR | cut -f1 -d,`
				passwd=`echo $STR | cut -f2 -d,`
				if [ "$user" == "$USER" ]; then
					echo "smbpasswd -a "$USER" "$passwd""
					smbpasswd -a "$USER" "$passwd"
				fi
				NUM=`expr $NUM + 1`
			done
			################################
			num=`expr $num + 1`
		done
	fi
}

case $1 in
	"admin")
		admID=`nvram_get 2860 Login`
		admPW=`nvram_get 2860 Password`
		###admin use /media for ftp and smb, don`t care telnet###
		echo "$admID::0:0:Adminstrator:/media:/bin/sh" > /etc/passwd
		echo "$admID:x:0:$admID" > /etc/group
		chpasswd.sh $admID $admPW
		
		ftpenabled=`nvram_get 2860 FtpEnabled`
		if [ "$ftpenabled" == "1" ]; then		
			ftpguest=`nvram_get 2860 FtpAnonymous`
			ftpguestdir=`nvram_get 2860 FtpAnonymousDir`
			if [ "$ftpguest" == "1" ]; then
				echo "anonymous::500:500:anonymous:$ftpguestdir:/bin/sh" >> /etc/passwd
				echo "anonymous:x:500:anonymous" >> /etc/group
			fi
		fi
		
		if [ -e "$PART1" ]; then
			setUserDir
			setUser
		fi
		;;
	"reparted")
		echo -e "d\n1\nd\n2\nd\n3\nd\nw\n" > /etc/delpart
		sleep 1
		#cat /etc/delpart
		fdisk /dev/sda < /etc/delpart 1>/dev/null 2>&1 
		sleep 10
		reg s 0xb01c0000
		reg w 440 1005
		sleep 10
		echo -e "n\ne\n1\n\n\nt\nf\nw\n" > /etc/extpart
		sleep 1
		#cat /etc/extpart
		fdisk /dev/sda < /etc/extpart 1>/dev/null 2>&1
		sleep 10
		if [ "$2" -gt "0" ]; then
			echo -e "n\nl\n\n+$2M\nt\n5\nb" > /etc/parted
			sleep 1
		fi
		if [ "$3" -gt "0" ]; then
			echo -e "n\nl\n\n+$3M\nt\n6\nb" >> /etc/parted
			sleep 1
		fi
		if [ "$4" -gt "0" ]; then
			echo -e "n\nl\n\n+$4M\nt\n7\nb" >> /etc/parted
			sleep 1
		fi
		if [ "$5" == "4" ]; then
			echo -e "n\nl\n\n\nt\n8\nb" >> /etc/parted
			sleep 1
		fi
		echo -e "w\n" >> /etc/parted
		sleep 1
		#cat /etc/parted
		fdisk /dev/sda < /etc/parted 1>/dev/null 2>&1
		sleep 10
		;;	
	"format")
		#echo "umount -l $2"
		umount -l $2 1>/dev/null 2>&1
		#echo "mkdosfs -F 32 $2 $3"
		mkdosfs -F 32 $2 $3 1>/dev/null 2>&1
		;;
	"restart")
		reg s 0xb01c0000
		reg w 440 5
		reg w 440 1005
		;;
	"ftp")
		killall -q proftpd
		if [ ! -e "$PART1" ]; then
			echo "1st partition does not exist"
			exit 0
		fi
		ftpenabled=`nvram_get 2860 FtpEnabled`
		if [ "$ftpenabled" == "1" ]; then
			setFtp
			proftpd
		fi
		;;
	"ftp2")
		mode=`nvram_get 2860 3g_mode`
		if [ "$mode" != "1" ]; then
			exit 0
		fi
		killall -q pure-ftpd
		if [ ! -e "$PART1" ]; then
			echo "1st partition does not exist"
			exit 0
		fi
		ftpenabled=`nvram_get 2860 ftp_enabled`
		if [ "$ftpenabled" == "1" ]; then
			setFtp2
		fi
		;;
	"samba")
		killall -q nmbd
		killall -q smbd
		rm -rf /etc/smbpasswd
		if [ ! -e "$PART1" ]; then
			umount /media
			echo "1st partition does not exist"
			exit 0
		fi
		smbenabled=`nvram_get 2860 SmbEnabled`
		if [ "$smbenabled" == "1" ]; then
			touch /etc/smbpasswd
			setSmb
		fi
		;;
	"media")
		killall -q ushare
		if [ ! -e "$PART1" ]; then
			echo "1st partition does not exist"
			exit 0
		fi
		media_enabled=`nvram_get 2860 mediaSrvEnabled`
		media_name=`nvram_get 2860 mediaSrvName`
		if [ "$media_enabled" == "1" ]; then
			echo "ushare.sh $media_name "$2" "$3" "$4" "$5""
			ushare.sh $media_name "$2" "$3" "$4" "$5"
			echo "ushare -D"
			ushare -D
		fi
		;;
esac
