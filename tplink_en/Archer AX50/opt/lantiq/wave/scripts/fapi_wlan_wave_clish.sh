#!/bin/sh

script_name="$0"

## Add clishApp check , if it is running wait and kill if not free in x sec.

timestamp=`date +%Y%m%dT%H%M%S`

echo "$timestamp:EXECUTE CLISH CMD: ${@}"

check_clish_is_valid()
{
	local index
	index=0
	while [ -n "$(pgrep -f clishApp)" ] && [ $index -lt 10 ]; do
		echo "clish command is on-going. waiting ..." >/dev/console
		sleep 1
		let index=index+1
	done
	[ -n "$(pgrep -f clishApp)" ] && echo "killall clish" >/dev/console && killall clishApp
}

commit_included="${@}"
tmp_commit_included=${commit_included/"start"/}
[ "$commit_included" != "$tmp_commit_included" ] && commit_included="yes"

if [ "$#" -gt 1 ]; then 

	rm -f /tmp/clish_file_commands
	touch /tmp/clish_file_commands
	clish_command_line=""

	for param in ${@}
	do
			[ "$param" = "start" ] && continue
			[ "$param" = "show" ] && break
			if [ "$param" = "-c" ]; then
				[ "$clish_command_line" != "" ] && clish_command_line="${clish_command_line## }" && \
					echo "$clish_command_line" >> /tmp/clish_file_commands
				[ "$clish_command_line" = "configure wlan" ] && \
					echo "start" >> /tmp/clish_file_commands
				clish_command_line=""
			else
				clish_command_line="$clish_command_line $param"
			fi
	done
fi
if [ "$param" != "show" ] && [ "$#" -gt 1 ]; then
	[ "$clish_command_line" != "" ] && clish_command_line="${clish_command_line## }" && \
		echo "$clish_command_line" >> /tmp/clish_file_commands
	[ "$commit_included" != "yes" ] && echo "commit" >> /tmp/clish_file_commands
	echo "exit" >> /tmp/clish_file_commands
	check_clish_is_valid
	/usr/bin/clishApp -q /tmp/clish_file_commands > /tmp/clish_cmd_res
else
	[ "$#" = "1" ] && cat "${@}"
	check_clish_is_valid
	/usr/bin/clishApp -q "${@}" > /tmp/clish_cmd_res
	[ "$param" = "show" ] && cat /tmp/clish_cmd_res
fi
if [ "$(grep -c Failure /tmp/clish_cmd_res)" -eq "0"  ]; then
  echo "Successfully clish command"
  exit 0
else
  echo "Failed clish command"
  exit 1
fi
