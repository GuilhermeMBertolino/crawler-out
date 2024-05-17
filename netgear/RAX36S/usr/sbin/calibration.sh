# !/bin/sh
expect_list=/etc/wlan/nvram/expect_list.nvm
caldata_nvram=/tmp/nvram/caldata.nvram
#module_name=`/bin/cat /tmp/board_model_id`
module_name=kernel
default_nvram=/etc/wlan/nvram/"$module_name".nvm
default_caldata_nvram=/tmp/nvram/"$module_name"_caldata.nvram
rfdata_nvram=/data/.kernel_nvram.setting
rfdata_nvram_bak=/data/.kernel_nvram_bak.setting
rf_to_sw_correct_nvram=/tmp/nvram/rf_to_sw_correct.nvram
rf_to_sw_error_nvram=/tmp/nvram/rf_to_sw_error.nvram
rf_to_sw_useless_nvram=/tmp/nvram/rf_to_sw_useless.nvram
sw_to_rf_correct_nvram=/tmp/nvram/sw_to_rf_correct.nvram
sw_to_rf_error_nvram=/tmp/nvram/sw_to_rf_error.nvram
sw_to_rf_useless_nvram=/tmp/nvram/sw_to_rf_useless.nvram
caldata_partdev=`part_dev caldata`
caldatabak_partdev=`part_dev caldata_bak`
verify=0
backup_all_knvram=1
ip="192.168.1.10"
download=0
#$2 is lan pc ip address, if it is null/0.0.0.0, then default ip is 192.168.1.10
if [ "x$2" != "x" -a "x$2" != "x0.0.0.0" ];then
        ip=$2
fi
#$3 value is dl  mean will download the fail caldata.bin/caldata_bak.bin, if factory callibration fail , not download relative bin file successfully, can type the command to download again
if [ "x$3" = "xdl" ];then
        download=1
fi
[ -f $rf_to_sw_correct_nvram ] && rm $rf_to_sw_correct_nvram
[ -f $rf_to_sw_error_nvram ] && rm $rf_to_sw_error_nvram
[ -f $rf_to_sw_useless_nvram ] && rm $rf_to_sw_useless_nvram
[ -f $sw_to_rf_correct_nvram ] && rm $sw_to_rf_correct_nvram
[ -f $sw_to_rf_error_nvram ] && rm $sw_to_rf_error_nvram
[ -f $sw_to_rf_useless_nvram ] && rm $sw_to_rf_useless_nvram


generate_caldata_swfile(){
[ -f $default_caldata_nvram ] && rm $default_caldata_nvram
[ ! -f $caldata_nvram ] && echo "Fail! caldata nvram file not exist, exit!" && exit
if [ "x$backup_all_knvram" == "x1" ];then
        cp $caldata_nvram $default_caldata_nvram
else
	cat $default_nvram |while read line
	do
		name=`echo $line |cut -d '=' -f 1 `
		name="${name}="
		if [ "$name" != "=" ]; then
		found=`grep "^$name" $caldata_nvram`
			if [ "x$found" == "x" ];then
        			echo $line >> $default_caldata_nvram
			fi
		fi
	done

	cat $caldata_nvram |while read line
	do
        	echo $line >> $default_caldata_nvram
	done
fi
}

verify_caldata(){
#read from rfdata nvram, then found at swdata
cat $rfdata_nvram |while read line
do
	name=`echo $line |cut -d '=' -f 1 `
	name="${name}="
	if [ "$name" != "=" ]; then
		expect=`grep "^$name" $expect_list`
		if [ "x$expect" != "x" ];then
			echo "$line is special nvram, ignore it,write to the correct nvram"
			correct_count=$(($correct_count+1))
			echo "$line $correct_count" >> $rf_to_sw_correct_nvram
		else
			found=`grep "^$line" $default_caldata_nvram`
			if [ "x$found" == "x" ];then
				error_count=$(($error_count+1))
				echo $line $error_count >> $rf_to_sw_error_nvram
			else
				correct_count=$(($correct_count+1))
				echo "$line $correct_count" >> $rf_to_sw_correct_nvram
			fi
		fi
	else
		echo "useless line: $line" >> $rf_to_sw_useless_nvram
		error=$(($error+1))
fi
done

#read from swdata nvram, then found at rfdata
cat $default_caldata_nvram |while read line
do
	name=`echo $line |cut -d '=' -f 1 `
	name="${name}="
	if [ "$name" != "=" ]; then
		expect=`grep "^$name" $expect_list`
                if [ "x$expect" != "x" ];then
                        echo "$line is special nvram, ignore it,write to the correct nvram"
			dni_correct_count=$(($dni_correct_count+1))
                        echo "$line $dni_correct_count" >> $sw_to_rf_correct_nvram
                else
			found=`grep "^$line" $rfdata_nvram`
			if [ "x$found" == "x" ];then
				dni_error_count=$(($dni_error_count+1))
				echo $line $dni_error_count >> $sw_to_rf_error_nvram
			else
				dni_correct_count=$(($dni_correct_count+1))
				echo "$line $dni_correct_count" >> $sw_to_rf_correct_nvram
			fi
		fi
	else
		dni_error=$(($dni_error+1))
		echo "useless line: $line $error" >> $sw_to_rf_useless_nvram
	fi
done

if [ -f $rf_to_sw_error_nvram -o  -f $sw_to_rf_error_nvram ];then
	echo "=======Fail!!!show the $rf_to_sw_error_nvram $sw_to_rf_error_nvram file to check=====" 
	if [ -f $rf_to_sw_error_nvram ];then
		echo "=======rf caldata information not found at sw caldata============="
		cat $rf_to_sw_error_nvram 
	fi 
	if [ -f $sw_to_rf_error_nvram ];then
		echo "=======sw caldata information not found at rf caldata=============" 
		cat $sw_to_rf_error_nvram
	fi
else
	echo "=======Success!!!===modify the $rfdata_nvram format to link file===="
	cp $rfdata_nvram $rfdata_nvram_bak
	rm $rfdata_nvram
	cp $rfdata_nvram_bak /tmp/.kernel_nvram.setting
	ln -s /tmp/.kernel_nvram.setting $rfdata_nvram
fi
}

re_calibration(){
	echo "erase caldata and caldata.bak content and remove the $rfdata_nvram $rfdata_nvram_bak, then reboot!"
	mtd erase $caldata_partdev
	mtd erase $caldatabak_partdev
	rm -rf $rfdata_nvram
	rm -Rf $rfdata_nvram_bak
	reboot
}

show_usage(){
	cat <<EOF
Usage: calibration <command>
Commands:
	generate      : generate SW caldata file(combine caldata and default nvram)
	verify        : verify SW caldata file whether same with RF caldata file
	help          : show this
EOF
}

case "$1" in
	generate)
		generate_caldata_swfile;;
	verify)
		#not verify now, if need verify need delete these code
		if [ "x$verify" == "x0" ];then
			if [ "x$download" = "x1" ];then
				mac=`artmtd -r mac|grep "lan mac" |cut -d ' ' -f 3| sed 's/://g'`
				[ -f $rfdata_nvram ] && tftp -l $rfdata_nvram -r old_${mac}.txt -p $ip
				[ -f $default_caldata_nvram ] && tftp -l $default_caldata_nvram -r new_${mac}.txt -p $ip
				tftp -l $caldata_partdev -r art_fail_${mac}.bin -p $ip
				tftp -l $caldatabak_partdev -r art_fail_bak_${mac}.bin -p $ip
				echo "Download Finish!"
				exit
			fi
                        if [ -s $default_caldata_nvram ]; then
				old=`md5sum $rfdata_nvram |cut -d ' ' -f 1`
				new=`md5sum $default_caldata_nvram |cut -d ' ' -f 1`
				echo "old md5: $old"
				echo "new md5: $new"
				if [ "x$old" != "x$new" ];then
					mac=`artmtd -r mac|grep "lan mac" |cut -d ' ' -f 3| sed 's/://g'`
					echo "$mac Calibration Fail, Please connect tftp server"
					echo "=========old data nvram========="
					cat $rfdata_nvram
					echo "=========flash caldata nvram========="
					hexdump $caldata_partdev
					echo "=========flash caldata_bak nvram========="
					hexdump $caldatabak_partdev
					echo "=========new data nvram========"
					cat $default_caldata_nvram
					echo "=========end========="
					[ -f $rfdata_nvram ] && tftp -l $rfdata_nvram -r old_${mac}.txt -p $ip
					[ -f $default_caldata_nvram ] && tftp -l $default_caldata_nvram -r new_${mac}.txt -p $ip
					tftp -l $caldata_partdev -r art_fail_${mac}.bin -p $ip
					tftp -l $caldatabak_partdev -r art_fail_bak_${mac}.bin -p $ip
				else
					cp $rfdata_nvram $rfdata_nvram_bak
					rm $rfdata_nvram
					cp $rfdata_nvram_bak /tmp/.kernel_nvram.setting
					ln -s /tmp/.kernel_nvram.setting $rfdata_nvram
					echo "Calibration Success"
                                fi
                        else
				mac=`artmtd -r mac|grep "lan mac" |cut -d ' ' -f 3| sed 's/://g'`
                                echo "$mac Calibration Fail, file not exist, Please connect tftp server"
				[ -f $rfdata_nvram ] && tftp -l $rfdata_nvram -r old_${mac}.txt -p $ip
				[ -f $default_caldata_nvram ] && tftp -l $default_caldata_nvram -r new_${mac}.txt -p $ip
				tftp -l $caldata_partdev -r art_fail_${mac}.bin -p $ip
				tftp -l $caldatabak_partdev -r art_fail_bak_${mac}.bin -p $ip
                        fi
		else
			#generate_caldata_swfile
			verify_caldata
		fi;;
	recal)
		re_calibration;;
	*)
		show_usage;;
esac
