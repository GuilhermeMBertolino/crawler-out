#$HTTP["url"] =~ "^/shares/" {
#	url.access-allow = ( "" )
#	dir-listing.activate = "enable"
#	dir-listing.set-footer    = " "
#}

$HTTP["scheme"] == "http"{
	$HTTP["url"] =~ "^/shares/" {
	        url.access-allow = ( "" )
	        dir-listing.activate = "enable"
	        dir-listing.set-footer    = " "
	}
}

