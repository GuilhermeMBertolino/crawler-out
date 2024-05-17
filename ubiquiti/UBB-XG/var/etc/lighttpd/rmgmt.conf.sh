get_link_local() {
	ip -o -6 a | grep "link"
}

get_addr() {
	echo $1 | sed -n "s#^.*\(br[^ ]*\) .*inet6 \(.*\)/.*#\2%\1#p"
}

print_cfg () {
cat << EOF
\$SERVER["socket"] == "[$1]:57437" {
	include "/usr/etc/lighttpd/ssl.conf"
}
EOF
}

get_link_local | while read l; do
	addr=$(get_addr "$l")
	[ -z "$addr" ] || print_cfg "$addr"
done
