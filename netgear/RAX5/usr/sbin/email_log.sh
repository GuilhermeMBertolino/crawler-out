. /lib/functions.sh

SOURCE_LOG="/tmp/log/log"
EMAIL_LOG="/tmp/log/log.txt"
SENDMAIL_LOG_PATH="/var/log/sendmail_logs"
GUI_LOG_FILE="/var/log/system.log"
CUST_LOG_FILE="/var/log/cust_system.log"
SENDMAIL_LOG_DONE="/var/log/sendmail_done"
SENDMAIL_LOG_FAILED="/var/log/sendmail_failed"
CATALOG_ROUTEROP="[RouterOp]"
EMAIL_SUB="NETGEAR RAX5 Log["$(uci -P /var/state get netgear.board.wan_mac | cut -c10-17)"]"

write_email_operate_log() {

	if [ "$2" == "full" ] && [ "$email_freq" == "LogFull" ]; then
		if [ "$1" == "1" ]; then
			touch $SENDMAIL_LOG_FAILED
		else
			touch $SENDMAIL_LOG_DONE
			rm $SOURCE_LOG
		fi
	fi

	if [ "$1" == "1" ]; then
		lineCount="$(wc -l $SOURCE_LOG | awk '{printf $1}')"
		error_logs="$(cat /var/log/sendmail_logs | grep 'Error' | cut -d':' -f2-)"
		IFS=$'\n'
		for error_line in $error_logs
		do
			if [ "$2" == "full" ] && [ "$email_freq" == "LogFull" ]; then
				# not use logger to trigger log, avoid in the loop of log full
				email_log="$CATALOG_ROUTEROP[email failed]$error_line"
				email_log=${email_log}", $(date +"%A, %B %d, %Y %H:%M:%S")"

				# use FIFO while log full
				if [ $lineCount -ge 1024 ]; then
					sed -i '1d' $SOURCE_LOG
				fi
				echo "$email_log" >> $SOURCE_LOG
			else
				email_log="[email failed]$error_line"
				logger -p user.warn -t $CATALOG_ROUTEROP "$email_log"
			fi
		done
	else
		email_log="[email sent to: $email_addr1]"
		logger -p user.warn -t $CATALOG_ROUTEROP "$email_log"
	fi
}

handle_email_log() {
	config_get email_freq $1 email_freq
	config_get email_addr1 $1 email_addr1
	config_get email_server $1 email_server
	config_get email_port $1 email_port
	config_get email_user $1 email_user
	config_get email_pwd $1 email_pwd
	config_get email_enable $1 email_enable
	config_get email_auth $1 email_auth
	config_get email_alert $1 email_alert

	email_log="[email sent to: $email_addr1]"
#	logger -p user.warn -t $CATALOG_ROUTEROP "$email_log"
#	lua /usr/lib/lua/webGetFunc/logs_data.lua

	CMD_MAILSEND="mailsend +cc +bc -starttls -v -sub '$EMAIL_SUB' "
	CMD_MAILSEND=${CMD_MAILSEND}"-smtp '$email_server' "
	CMD_MAILSEND=${CMD_MAILSEND}"-port '$email_port' "
	CMD_MAILSEND=${CMD_MAILSEND}"-name '\"root@RAX5\"' "
	CMD_MAILSEND=${CMD_MAILSEND}"-f '$email_user' "
	CMD_MAILSEND=${CMD_MAILSEND}"-t '$email_addr1' "
	#CMD_MAILSEND=${CMD_MAILSEND}"-attach '$EMAIL_LOG' "
	CMD_MAILSEND=${CMD_MAILSEND}"-mime-type 'text/plain' "
	CMD_MAILSEND=${CMD_MAILSEND}"-msg-body '$EMAIL_LOG' "

	if [ "$email_auth" == "1" ]; then
		CMD_MAILSEND=${CMD_MAILSEND}"-auth-login "
		CMD_MAILSEND=${CMD_MAILSEND}"-user '$email_user' "
		CMD_MAILSEND=${CMD_MAILSEND}"-pass '$email_pwd' "
	fi

	CMD_MAILSEND=${CMD_MAILSEND}"2> $SENDMAIL_LOG_PATH"

	if [ -f "$SENDMAIL_LOG_PATH" ]; then
		rm $SENDMAIL_LOG_PATH
	fi

	if [ "$2" == "gui_log_action" ]; then
		cp $GUI_LOG_FILE $EMAIL_LOG
	else
		cp $SOURCE_LOG $EMAIL_LOG
		# take off tags
		sed -i 's/\[MustDisplay\]//g;s/\[site_allowed\]//g;s/\[site_blocked\]//g;s/\[Webaccess\]//g;s/\[RouterOp\]//g;s/\[attack\]//g;s/\[Wlan\]//g;s/\[wlanSchedule\]//g;s/\[VPN\]//g;s/\[PortFw_Tr\]//g' $EMAIL_LOG
	fi

	if [ -z "$2" ]; then
		eval $CMD_MAILSEND
		write_email_operate_log $? $2
	elif [ "$email_enable" == "1" ]; then
		if [ "$2" == "full" ] && [ "$email_freq" == "LogFull" ]; then
			eval $CMD_MAILSEND
			write_email_operate_log $? $2
		elif [ "$2" == "gui_log_action" ]; then
			eval $CMD_MAILSEND
			write_email_operate_log $? $2
		elif [ "$2" == "alert" ] && [ "$email_alert" == "1" ]; then
			MSG=$(cat $EMAIL_LOG | grep 'site blocked' | tail -n 1)
			echo $MSG > $EMAIL_LOG
			eval $CMD_MAILSEND
			write_email_operate_log $? $2
		fi
	fi

	rm $EMAIL_LOG
}

# checking mailsend is done
if [ ! -f "$EMAIL_LOG" ]; then
	config_load email
	config_foreach handle_email_log email $1
fi
