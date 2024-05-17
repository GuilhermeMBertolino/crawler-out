# HTTPS enable, need auth
ssl.engine = "enable"
ssl.pemfile = "/etc/lighttpd/lighttpd.pem"
dir-listing.activate = "enable"
dir-listing.set-footer = " "
server.document-root = "/webs/"

# deny all only allow /shares
$HTTP["url"] !~ "^/shares" {
	url.access-deny = ( "" )
}

$HTTP["url"] =~ "^/shares" {
        auth.backend = "htpasswd"
        auth.backend.htpasswd.userfile = "/var/user.htpasswd"
        auth.require = (
                "" => (
                        "method"  => "basic",
	                "realm"   => realm,
        	        "require" => "valid-user"
                )
	)
	auth.login_data = ("max-try" => "3")
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

	$HTTP["url"] =~ "^/shares" {
        	auth.backend = "htpasswd"
        	auth.backend.htpasswd.userfile = "/var/user.htpasswd"
        	auth.require = (
                	"" => (
                        	"method"  => "basic",
	                        "realm"   => realm,
        	                "require" => "valid-user"
                	)
		)
		auth.login_data = ("max-try" => "3")
	}
}

