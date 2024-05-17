#$HTTP["url"] =~ "^/shares/" {
#}

$HTTP["scheme"] == "http"{
	$HTTP["url"] =~ "^/shares/" {
	}
}


