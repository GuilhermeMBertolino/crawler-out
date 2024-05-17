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

function getWpsDevNameByMac($status, $inputMac)
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";

    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
       return "";
    }

    $attached_devices = json_decode($json, true, 512, JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
	return "";
    }

    $output_value = new stdClass();
    $count = 0;

    $connectedClientMac = strtoupper($inputMac);

    if($status === "2" || $status === "0")
    {
        foreach($attached_devices[$attachedDev_path] as $inst)
        {
            if ($inst["Active"] === "1")
            {
                $index = $count + 1;
                $dev_mac = strtoupper($inst["PhysAddress"]);
                $dev_name  = "";

                $dev_name = $inst["DisplayName"] === "" ? $inst["DeviceName"] : $inst["DisplayName"];
            }

            if($dev_mac === $connectedClientMac)
                return htmlentities($dev_name);

            $count++;
        }
    }
    return "";
}

?>
