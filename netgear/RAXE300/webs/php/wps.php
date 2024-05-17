<?

function wpsCheckStart($interface)
{
    $cmd_str= "hostapd_cli -p /var/run/hostapd -i {$interface} wps_get_status | grep 'PBC Status:' | awk '{print $3}'";

    exec($cmd_str, $res, $status);
    return $res[0];
}

function getWpsCheckResult()
{
   if(wpsCheckStart("wl0") === "Active" || wpsCheckStart("wl1") === "Active")
   {
      return "on" ;
   }
   else
   {
      return "off"; 
   }
}


?>