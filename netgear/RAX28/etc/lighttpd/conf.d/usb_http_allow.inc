#$HTTP["url"] =~ "^/shares/" {
#	url.access-allow = ( "" )
#	dir-listing.activate = "enable"
#	dir-listing.set-footer    = " "
#}

$HTTP["scheme"] == "http"{
	$HTTP["url"] =~ "^/shares" {
		server.follow-symlink = "disable"

	        static-file.exclude-extensions = ()
	        cgi.assign = ()
	        fastcgi.map-extensions = ()
	        fastcgi.server = ()
	        mimetype.assign = ()

	        url.access-allow = ( "" )
	        dir-listing.activate = "enable"
	        dir-listing.set-footer    = " "
	}
}

