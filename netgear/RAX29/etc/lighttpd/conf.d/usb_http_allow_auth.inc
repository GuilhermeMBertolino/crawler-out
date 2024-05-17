## HTTP enable, need auth
#$HTTP["url"] =~ "^/shares" {
#	auth.backend = "htpasswd"
#	auth.backend.htpasswd.userfile = "/var/user.htpasswd"
#	auth.require = (
#		"" => (
#			"method"  => "basic",
#			"realm"   => "RAX30",
#			"require" => "valid-user"
#			)
#		)
#	auth.max_try = 3
#
#	dir-listing.activate      = "enable"
#	dir-listing.set-footer    = " "
#	url.access-allow = ( "" )
#}

# HTTP enable, need auth
$HTTP["scheme"] == "http"{
        $HTTP["url"] =~ "^/shares" {
                auth.backend = "htpasswd"
                auth.backend.htpasswd.userfile = "/var/user.htpasswd"
                auth.require = (
                        "" => (
                                "method"  => "basic",
                                "realm"   => "RAX30",
                                "require" => "valid-user"
                                )
                        )
                auth.login_data = ("max-try" => "3")

                server.follow-symlink = "disable"

                static-file.exclude-extensions = ()
                cgi.assign = ()
                fastcgi.map-extensions = ()
                fastcgi.server = ()
                mimetype.assign = ()

                dir-listing.activate      = "enable"
                dir-listing.set-footer    = " "
                url.access-allow = ( "" )
        }
}

