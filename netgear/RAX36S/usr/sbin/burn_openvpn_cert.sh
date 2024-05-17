#!/bin/sh

# Copyright (c) 2021 Delta, Inc.
# All Rights Reserved.
# Delta Group Confidential and Proprietary.
#
# Date: 2021/7/12

step=""
step_index=1
silent_mode=0
cert_tarball=""
tarball_md5=""
cert_start_date=""
log_file="/tmp/burn_openvpn_cert.log"
_flash_type="nand"

# Variable to store full message of VPN certificate times
cert_time_msg=

print_step()
{
	step="${1:?no step}"
	printf "$step_index) %s: RUNNING\n" "$step" >&3
}

print_result()
{
	if [ "${1:?no result}" = "0" ]; then
		printf "$step_index) %s: SUCCESS (0).\n" "$step" >&3
		step_index=$((step_index + 1))
	else
		printf "$step_index) %s: FAILURE (%s) %s\n" \
			"$step" "${step_index}${1}" "${2:?no reason}" >&3
		exit "${step_index}${1}"
	fi
}

convert_month_string2number()
{
	mon="${1:?missing month string}"

	case "$(echo "$mon" | tr 'a-z' 'A-Z')" in
	JAN)
		echo 01
		;;
	FEB)
		echo 02
		;;
	MAR)
		echo 03
		;;
	APR)
		echo 04
		;;
	MAY)
		echo 05
		;;
	JUN)
		echo 06
		;;
	JUL)
		echo 07
		;;
	AUG)
		echo 08
		;;
	SEP)
		echo 09
		;;
	OCT)
		echo 10
		;;
	NOV)
		echo 11
		;;
	DEC)
		echo 12
		;;
	esac
}

# @1: date string, format as: month day year, like: "Jun 25 2018"
format_date_string()
{
	local orig_date_string="${1:?missing date string}"
	year="$(echo "$orig_date_string" | awk '{print $3}')"
	month="$(convert_month_string2number "$(echo "$orig_date_string" | awk '{print $1}')")"
	day="$(echo "$orig_date_string" | awk '{printf "%02d\n", $2}')"

	echo "$year-$month-$day"
}

clean_up_burn_env()
{
	print_step "Prepare burn env"

	mkdir -p /tmp/openvpn/
	echo 0 >/tmp/openvpn/cert_file_status

	for n in 1 2 3; do
		pids="$(pidof openvpn)"
		if [ -n "$pids" ]; then
			kill -9 $pids
		else
			break
		fi
	done
	if [ -n "$(pidof openvpn)" ]; then
		print_result 1 "Can't kill openvpn process."
	fi

	print_result 0
}

validate_cert_tarball()
{
	#
	# Date parts (year, month, and day) of start time of VPN certificate
	# which is being examined
	#
	local start_date

	#
	# Time parts (hour, minute, and second) of start time of VPN
	# certificate which is being examined
	#
	local start_time

	#
	# Formatted start date of VPN certificate which is being # examined
	#
	# The start date will be formatted as "YYYY-MM-DD".
	#
	local formated_start_date

	# Store time message of one VPN certificate
	local cert_time_msg_one_f

	print_step "Validate OpenVPN cert tarball"

	if [ ! -f "$cert_tarball" ]; then
		print_result 1 "Cert tarball $cert_tarball not exist."
	fi

	file_md5=$(md5sum "$cert_tarball" | awk '{print $1}')
	if [ "$tarball_md5" != "$file_md5" ]; then
		print_result 2 "MD5 dismatch > file: $file_md5, cmd argument: $tarball_md5."
	fi

	board_sn="$(artmtd -r sn | awk -F':' '{if(NR == 1){print $2}}')"
	tarball_sn="$(tar -zxOf "$cert_tarball" cert.info)"

	if [ "$board_sn" != "$tarball_sn" ]; then
		print_result 3 "SN dismatch > board SN: $board_sn, tarball SN: $tarball_sn."
	fi

	for f in ca.crt server.crt client.crt; do
		cert_text="$(tar -zxOf "$cert_tarball" "$f" | openssl x509 -noout -text)"
		sig_alg="$(echo "$cert_text" | awk '/Signature Algorithm/{print $3}' | uniq)"
		start_date="$(echo "$cert_text" | awk '/Not Before/{print $3, $4, $6}')"
		formated_start_date="$(format_date_string "$start_date")"
		start_time="$(echo "$cert_text" |
		              awk '/Not Before/{print $5}')"
		if [ "$sig_alg" != "sha256WithRSAEncryption" ]; then
			print_result 4 "Signature Algorithm dismatch > $f: $sig_alg, expect: sha256WithRSAEncryption"
		fi
		cert_start_time=$(date +%s -d $cert_start_date)
		formated_start_time=$(date +%s -d $formated_start_date)
		if [ $formated_start_time -ge $cert_start_time ]; then
			end_time=$(($formated_start_time - $cert_start_time))
		else
			end_time=$(($cert_start_time - $formated_start_time))
		fi

		if [ "$end_time" -gt "86400" ]; then
			print_result 5 "Start date dismatch > $f: $formated_start_date, expect: $cert_start_date."
		fi

		# Prepare VPN certificate time message
		cert_time_msg_one_f="$(
				printf './%s: certificate time is %s %s.\n' \
				       "$f" "$formated_start_date" \
				       "$start_time")"
		cert_time_msg="${cert_time_msg:+$cert_time_msg
}$cert_time_msg_one_f"
	done

	tarball_content_md5="$(tar -zxOf "$cert_tarball" | md5sum | awk '{print $1}')"

	print_result 0
}

write_cert_to_storage()
{
	print_step "Write OpenVPN cert into storage"

	partition_dev="$(part_dev cert)"
	if [ -z "$partition_dev" ]; then
		print_result 1 "Can't get partition device."
	fi

	flash_type="$_flash_type"
	if [ -z "$flash_type" ]; then
		print_result 2 "Can't get flash type."
	fi

	if [ "$flash_type" = "emmc" ]; then
		if ! dd if="/dev/zero" of="$partition_dev" bs="$(cat "$cert_tarball"|wc -c)" count=1; then
			print_result 3 "fail to erase $partition_dev."
		fi
		if ! dd if="$cert_tarball" of="$partition_dev"; then
			print_result 4 "fail to write $cert_tarball into $partition_dev."
		fi
	else
		flash_erase "$partition_dev" 0 0
		if ! nandwrite -p -m -q "$partition_dev" "$cert_tarball"; then
			print_result 5 "fail to write tarball into $partition_dev."
		fi
	fi

	print_result 0
}

validate_data_written_into_storage()
{
	print_step "Validate data written into storage."

	partition_dev="$(part_dev cert)"
	if [ -z "$partition_dev" ]; then
		print_result 1 "Can't get partition device."
	fi

	flash_type="$_flash_type"
	if [ -z "$flash_type" ]; then
		print_result 2 "Can't get flash type."
	fi

	if [ "$flash_type" = "emmc" ]; then
		storage_content_md5="$(dd if="$partition_dev" 2>/dev/null \
			| tar -zxOf - | md5sum | awk '{print $1}')"
	else
		storage_content_md5="$(nanddump -q "$partition_dev" 2>/dev/null \
			| tar -zxOf - | md5sum | awk '{print $1}')"
	fi

	if [ "$storage_content_md5" != "$tarball_content_md5" ]; then
		print_result 3 "MD5 dismatch > tarball content: $tarball_content_md5, storage content: $storage_content_md5."
	fi

	print_result 0
}

bootup_openvpn()
{
	print_step "Bootup openvpn"

	if ! /etc/init.d/openvpn boot; then
		print_result 1 "/etc/init.d/openvpn boot fail."
	fi

	print_result 0
}

usage()
{
	cat <<-EOF >&2
		Usage: ${0##*/} <file> <md5> <cert-start-date>
		       ${0##*/} -s <file> <md5> <cert-start-date>

		-s: silent, save output of all commands to file /tmp/burn_openvpn_cert.log
		        but still show notify and result of this script.
		<file>: path of cert tarball file.
		<md5>:  md5 checksum of ths tarball file.
		<cert-start-date>:
		        start date of all certificates.

		e.g.:
		  ${0##*/} /tmp/openvpn.tar.gz 53e38a8028b03bcd9f6eb9b50c250205 2021-01-25
	EOF
	exit 1
}

main()
{
	# Expected start date of VPN certificates ("cert")
	local cert_start_date

	if [ "$1" = "-s" ]; then
		silent_mode=1
		shift
	fi
	if [ $# -ne 3 ]; then
		usage
	else
		cert_tarball="${1:?missing tarball file}"
		tarball_md5="${2:?missing tarball md5}"
		cert_start_date="${3:?missing cert start date}"
	fi

	exec 3<&1
	if [ "$silent_mode" = "1" ]; then
		exec 1>"$log_file"
		exec 2>&1
	fi

	clean_up_burn_env
	validate_cert_tarball
	write_cert_to_storage
	validate_data_written_into_storage
	#bootup_openvpn

	printf "Burn OpenVPN Certificate: COMPLETE!\n" >&3

	echo "$cert_time_msg"
}

main "$@"
