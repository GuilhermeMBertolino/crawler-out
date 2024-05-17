## HTTPS diable, put config is empty


# HTTPS enable, no auth
ssl.engine = "enable"
ssl.pemfile = "/etc/lighttpd/lighttpd.pem"
dir-listing.activate = "disable"
dir-listing.set-footer = " "
server.document-root = "/webs/"

# deny all
url.access-deny = ( "" )

$SERVER["socket"] == "[::]:29443" {
        ssl.engine = "enable"
        ssl.pemfile = "/etc/lighttpd/lighttpd.pem"
        dir-listing.activate = "disable"
        dir-listing.set-footer = " "
        server.document-root = "/webs/"

        # deny all
        url.access-deny = ( "" )
}

