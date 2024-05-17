# HTTPS enable, no auth

ssl.engine = "enable"
ssl.pemfile = "/etc/lighttpd/lighttpd.pem"
dir-listing.activate = "enable"
dir-listing.set-footer = " "
server.document-root = "/webs/"

# deny all only allow /shares
$HTTP["url"] !~ "^/shares" {
	url.access-deny = ( "" )
}

$SERVER["socket"] == "[::]:29443" {
	ssl.engine = "enable"
	ssl.pemfile = "/etc/lighttpd/lighttpd.pem"
	dir-listing.activate = "enable"
	dir-listing.set-footer = " "
	server.document-root = "/webs/"

	# deny all only allow /shares
	$HTTP["url"] !~ "^/shares" {
		url.access-deny = ( "" )
	}
}

