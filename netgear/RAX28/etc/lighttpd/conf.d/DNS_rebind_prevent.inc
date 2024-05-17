# for IPv4 address
$HTTP["host"] =~ "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)((\:[0-9]{0,5})?)$" {
}
# for IPv6 address (1)
else $HTTP["host"] =~ "([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:" {
}
# for IPv6 address (2)
else $HTTP["host"] =~ "([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}" {
}
# for IPv6 address (3)
else $HTTP["host"] =~ "([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)" {
}
# for IPv6 address (4)
else $HTTP["host"] =~ "fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}" {
}
# for IPv6 address (5)
else $HTTP["host"] =~ "::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])" {
}
# for IPv6 address (6)
else $HTTP["host"] =~ "([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])" {
}
else $HTTP["host"] =~ "^(?i)(www\.routerlogin\.net|www\.routerlogin\.com|routerlogin\.net|routerlogin\.com|readyshare\.routerlogin\.net|readyshare\.routerlogin\.com)((\:[0-9]{0,5})?)$"{
}
else {
  # for traffic block page
  $SERVER["socket"] == "0.0.0.0:26081" {
  }
  else $SERVER["socket"] == "[::]:26081" {
  }
  else $SERVER["socket"] == "0.0.0.0:26443" {
  }
  else $SERVER["socket"] == "[::]:26443" {
  }
  else $SERVER["socket"] == "0.0.0.0:27081" {
  }
  else $SERVER["socket"] == "[::]:27081" {
  }
  else $SERVER["socket"] == "0.0.0.0:27443" {
  }
  else $SERVER["socket"] == "[::]:27443" {
  }
  # for access control
  else $SERVER["socket"] == "0.0.0.0:28081" {
  }
  else $SERVER["socket"] == "[::]:28081" {
  }
  else $SERVER["socket"] == "0.0.0.0:28443" {
  }
  else $SERVER["socket"] == "[::]:28443" {
  }
  else {
    url.access-deny = ("")
  }
}
