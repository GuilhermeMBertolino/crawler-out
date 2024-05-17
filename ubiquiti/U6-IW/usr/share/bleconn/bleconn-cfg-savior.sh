#!/bin/sh

name=$(basename $0)

error()
{
	logger -t "$name[$$]" -p user.err "$@"
	exit 1
}

debug()
{
	logger -t "$name[$$]" -p user.debug "$@"
}

if [ $# -lt 1 ]; then
	echo "Usage: $name <path/to/file> [<path/to/file> [<path/to/file> [...]]]"
	error "Invalid arg count"
fi

debug "Start preservation of [$#] file(s)"

persistent_dir_path=$(readlink -f "/etc/persistent" 2>/dev/null)
for cfg_file in "$@"; do
	[ -f "$cfg_file" ] || error "File \"$cfg_file\" does not exist"
	cfg_file_path=$(readlink -f "$cfg_file" 2>/dev/null)
	[ -n "$cfg_file_path" ] || error "Failed to get absolute path of \"$cfg_file\""
	echo "$cfg_file_path" | grep -q "^$persistent_dir_path/" || error "Cfg file \"$cfg_file_path\" must be placed in \"$persistent_dir_path\""
	debug " - $cfg_file"
done

syswrapper.sh save-config || error "Failed to complete preservation"

debug "Preservation done"
