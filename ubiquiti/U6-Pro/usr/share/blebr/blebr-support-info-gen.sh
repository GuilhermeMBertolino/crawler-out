#!/bin/sh

name=$(basename $0)

error()
{
	logger -t "$name[$$]" -p user.err "$@"
	exit 1
}

warn()
{
	logger -t "$name[$$]" -p user.warn "$@"
}

get_proc_info()
{
	local app="$1"
	local tmp_dir="$2"
	local parent_pids=$(pidof $app)
	local parent_pid
	if [ -n "$parent_pids" ]; then
		for parent_pid in $parent_pids; do
			local tmp_pproc_dir="${tmp_dir}/proc/$parent_pid/"
			if mkdir -p "$tmp_pproc_dir"; then
				cp /proc/$parent_pid/status "$tmp_pproc_dir" || warn "Can't copy proc [$parent_pid] status"
				cp /proc/$parent_pid/statm "$tmp_pproc_dir" || warn "Can't copy proc [$parent_pid] statm"
				cp /proc/$parent_pid/stat "$tmp_pproc_dir" || warn "Can't copy proc [$parent_pid] stat"
				cp /proc/$parent_pid/maps "$tmp_pproc_dir" || warn "Can't copy proc [$parent_pid] maps"
				ls -lah /proc/$parent_pid/fd /proc/$parent_pid/task > "${tmp_pproc_dir}ls.txt" || warn "Can't list proc [$parent_pid] dirs"
			else
				warn "Failed to create directory \"$tmp_pproc_dir\""
			fi
		done
	else
		warn "Failed to get pid of $app"
	fi
}

if [ $# -lt 1 ]; then
	echo "Usage: $name <path/to/output/dir>"
	error "Invalid arg count"
fi

TMP_DIR="$1"

TMP_PROC_DIR="${TMP_DIR}/proc/"
if mkdir -p "$TMP_PROC_DIR"; then
	cp /proc/meminfo "$TMP_PROC_DIR" || warn "Can't copy meminfo"
	cp /proc/loadavg "$TMP_PROC_DIR" || warn "Can't copy loadavg"
	cp /proc/uptime "$TMP_PROC_DIR" || warn "Can't copy uptime"
	cp /proc/version "$TMP_PROC_DIR" || warn "Can't copy version"
	cp /proc/cpuinfo "$TMP_PROC_DIR" || warn "Can't copy cpuinfo"
else
	warn "Failed to create directory \"$TMP_PROC_DIR\""
fi

TMP_UBNTHAL_DIR="${TMP_DIR}/proc/ubnthal/"
if mkdir -p "$TMP_UBNTHAL_DIR"; then
	cp /proc/ubnthal/system.info "$TMP_UBNTHAL_DIR" || warn "Can't copy system.info"
else
	warn "Failed to create directory \"$TMP_UBNTHAL_DIR\""
fi

get_proc_info "blebrd" "$TMP_DIR"
get_proc_info "bleconnd" "$TMP_DIR"

TMP_ETC_DIR="${TMP_DIR}/etc/"
if mkdir -p "$TMP_ETC_DIR"; then
	cp /etc/resolv.conf "$TMP_ETC_DIR" || warn "Failed to copy resolv.conf"
else
	warn "Failed to create directory \"$TMP_ETC_DIR\""
fi

TMP_PER_DIR="${TMP_DIR}/etc/persistent/"
if mkdir -p "$TMP_PER_DIR"; then
	cp /etc/persistent/bleconn.json* "$TMP_PER_DIR" || warn "Failed to copy bleconn.json"
else
	warn "Failed to create directory \"$TMP_PER_DIR\""
fi

TMP_CFG_DIR="${TMP_PER_DIR}/cfg/"
if mkdir -p "$TMP_CFG_DIR"; then
	cp /etc/persistent/cfg/blebr.json* "$TMP_CFG_DIR" || warn "Failed to copy blebr.json"
	cp /etc/persistent/cfg/bleconn.json* "$TMP_CFG_DIR" || warn "Failed to copy bleconn.json"
else
	warn "Failed to create directory \"$TMP_CFG_DIR\""
fi

# We must extract storage so blebr can skip files without read permission (e.g. shadow.json)
for i in /etc/persistent/*blebr.tgz*; do
	[ -f "$i" ] || continue
	TMP_STORAGE_DIR="${TMP_DIR}${i}"
	if mkdir -p "$TMP_STORAGE_DIR"; then
		tar -xzf "$i" -C "$TMP_STORAGE_DIR" || warn "Failed to extract $i"
	else
		warn "Failed to create directory \"$TMP_STORAGE_DIR\""
	fi
done

ls -lah /etc/persistent/ /etc/persistent/cfg/ /tmp > "${TMP_DIR}/ls.txt" || warn "Can't capture output of ls"

top -b -n 1 > "${TMP_DIR}/top.txt" || warn "Can't capture output of top"
ip addr > "${TMP_DIR}/ip_addr.txt" || warn "Can't get IF list"
ip route > "${TMP_DIR}/ip_route.txt" || warn "Can't get routes"
netstat -lnp > "${TMP_DIR}/netstat.txt" || warn "Can't capture output of netstat"
logread > "${TMP_DIR}/logread.txt" || warn "Can't cpature output of logread"
