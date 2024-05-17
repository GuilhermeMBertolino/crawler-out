#!/bin/sh

usage() {
	echo "Usage: $(basename $0) <username>" 1>&2
	exit 2
}

[ $# -eq 1 ] || usage

user=$(echo "$1" | grep -E "^[a-z_][a-z0-9_-]*[$]?$")
shadow="/etc/shadow"
defaultHashId=6
machineFile="/etc/machine-id"
[ -f "$machineFile" ] || machineFile="/proc/ubnthal/system.info"

ToSaltChar() {
	# .-/ -> 46-47
	# A-Z -> 65-90
	# a-z -> 97-122
	# sum 54
	c=$(expr $1 % 54)
	if [ $c -lt 2 ]; then
		echo $((46 + $c))
	elif [ $c -lt 28 ]; then
		echo $((65 - 2 + $c))
	else
		echo $((97 - 28 + $c))
	fi
}

ToSalt() {
	for i in `echo "$@" | md5sum | head -c 32 | sed 's/.\{2\}/& /g'`; do
		printf \\$(printf "%o" $(ToSaltChar $((0x$i))))
	done
	printf "\n"
}

output=""
if [ ! -z "$user" ]; then
	output=`awk -F: '{if (NF == 9 && $1 ~ /^'"$user"'$/) {print $2; exit 0}}' "$shadow" | awk -F$ '{
		if ($2 !~ /^!.*/) {
					if (NF == 4 && length($1) == 0 && $3 ~ /^[a-zA-Z0-9\.\/]{0,16}$/ && $4 ~ /^[a-zA-Z0-9\.\/]*$/) {
						printf "\"public\":{\"type\":3,\"id\":\"%s\",\"salt\":\"%s\"},\"private\":{\"encrypted\":\"%s\",\"active\":true}\n", $2, $3, $4;
						exit 0
					} else if (NF == 2 && $1 ~ /^[a-zA-Z0-9\.\/]{0,16}$/ && $2 ~ /^[a-zA-Z0-9\.\/]*$/) {
						printf "\"public\":{\"type\":2,\"salt\":\"%s\"},\"private\":{\"encrypted\":\"%s\",\"active\":true}\n", $1, $2;
						exit 0
					} else if (NF == 1 && $1 ~ /^[a-zA-Z0-9\.\/]{13}$/) {
						printf "\"public\":{\"type\":1,\"salt\":\"%s\"},\"private\":{\"encrypted\":\"%s\",\"active\":true}\n", substr($1, 1, 2), substr($1, 3);
						exit 0
					}
				}
			}'`
fi
if [ -z "$output" ]; then
	# Let's generate a fake hash ID and salt to make brute force attack more complicated
	if [ -z "$user" ]; then
		defaultSalt=$(ToSalt "$(openssl rand -hex 16)")
	else
		defaultSalt=$(ToSalt "$user" "$(cat "$machineFile")")
	fi
	output="\"public\":{\"type\":3,\"id\":\"$defaultHashId\",\"salt\":\"$defaultSalt\"},\"private\":{\"active\":false}"
fi

# A remote peer should be able to generate private part by using public part, password and openssl (e.g. openssl passwd -6 -salt b9s/0hP. ubntubnt)
echo "{$output}"
