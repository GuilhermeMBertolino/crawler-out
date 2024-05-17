<?
include_once 'attachedDev.php';
$dbg = FALSE;

$attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
$json = db_getObj($attachedDev_path);
if($json === FALSE)
{
    return ;  
}

//$attached_devices = json_decode($json,true);
$attached_devices = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
if (json_last_error() != JSON_ERROR_NONE) {
  printf("JSON Error: %s", json_last_error_msg());
}

function getAccessContorlTableValue()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $count = 0;
    $acEnable = getAcceccControlEnable();
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "1") {
            $index = $count + 1;
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_ip = $inst["IPAddress"];
            $access_status = $inst["AccessCtrlRule"] === "deny" ? "Blocked" : "Allowed"; 
            $access_color = $access_status === "Allowed" ? "green" : "red";
            $access_status_mlang = getMlang_AccessStatus($inst["AccessCtrlRule"]);
            $if_path = $inst["Layer1Interface"];
            $connection_type = getConnectionTypeStr($if_path);
            $dev_name = getDevNameFromD2($dev_mac);
            //KKHuang: Corner Case: User might add a non-existent (in D2) client into access control list
            if ($dev_name === "")
            {
                if ($inst["DisplayName"] === "")
                {
                    $dev_name = $inst["DeviceName"] === "" ? "&nbsp;" : $inst["DeviceName"];
                }
                else
                {
                    $dev_name = $inst["DisplayName"];
                }
            }
            if ($dev_name == "" || $dev_name == "unknown")
            {
                $dev_name = "n/a";
            }
            //$ssid = strpos($if_path,"SSID.") !== FALSE ? db_get($if_path) : " ";
            $ssid = strpos($if_path,"SSID.") !== FALSE ? "(" . db_get($if_path . ".SSID") . ")" : " ";

            $iid = $inst["instanceID"];
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__disabled = $acEnable == "false" ? "disabled" : "";
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__ip = $dev_ip;
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__color = $access_color;
            $output_value->{$index}->__status = $access_status_mlang;
            $output_value->{$index}->__conType = $connection_type;
            $output_value->{$index}->__ssid = htmlentities($ssid);
            $count++;
        }
    }
    return $output_value;
}

/*function getAccessContorlWhiteValue()
{
    $attachedDev_path = "Device.X_PEGATRON_COM_AccessCtrlDev";
    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $count = 0;
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["DevRule"] === "allow") 
        {
            $iid = $inst["instanceID"];
            $index = $count + 1;
            $dev_mac = strtoupper($inst["DevMacAddr"]);
            $dev_name = getDevNameByMac($dev_mac);
            if( $dev_name != " ")
                continue;
            $connection_type = "Unknown";
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__name = $dev_name;
            $output_value->{$index}->__conType = $connection_type;
            $count++;
        }
    }
    return $output_value;
}*/

function getAccessContorlWhiteValue2()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $count = 0;
    $acEnable = getAcceccControlEnable();
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "0" && $inst["AccessCtrlRule"] === "allow") 
        {
            $iid = $inst["instanceID"];
            $index = $count + 1;
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_name = getDevNameFromD2($dev_mac);
            //KKHuang: Corner Case: User might add a non-existent (in D2) client into access control list
            if ($dev_name === "")
            {
                if ($inst["DisplayName"] === "")
                {
                    $dev_name = $inst["DeviceName"] === "" ? "&nbsp;" : $inst["DeviceName"];
                }
                else
                {
                    $dev_name = $inst["DisplayName"];
                }
            }
            if ($dev_name == "" || $dev_name == "unknown")
            {
                $dev_name = "n/a";
            }
            //$connection_type = "Unknown";
            $if_path = $inst["Layer1Interface"];
            $connection_type = getConnectionTypeStr($if_path);
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__disabled = $acEnable == "false" ? "disabled" : "";
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__conType = $connection_type;
            $count++;
        }
    }
    return $output_value;
}

/*function getAccessContorlBlackValue()
{
    $attachedDev_path = "Device.X_PEGATRON_COM_AccessCtrlDev";
    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $count = 0;
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["DevRule"] === "deny") 
        {
            $iid = $inst["instanceID"];
            $index = $count + 1;
            $dev_mac = strtoupper($inst["DevMacAddr"]);
            $dev_name = getDevNameByMac($dev_mac);
            if( $dev_name != " ")
                continue;
            $connection_type = "Unknown";
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__name = $dev_name;
            $output_value->{$index}->__conType = $connection_type;
            $count++;
        }
    }
    return $output_value;
}*/

function getAccessContorlBlackValue2()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $count = 0;
    $acEnable = getAcceccControlEnable();
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "0" && $inst["AccessCtrlRule"] === "deny") 
        {
            $iid = $inst["instanceID"];
            $index = $count + 1;
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_name = getDevNameFromD2($dev_mac);
            //KKHuang: Corner Case: User might add a non-existent (in D2) client into access control list
            if ($dev_name === "")
            {
                if ($inst["DisplayName"] === "")
                {
                    $dev_name = $inst["DeviceName"] === "" ? "&nbsp;" : $inst["DeviceName"];
                }
                else
                {
                    $dev_name = $inst["DisplayName"];
                }
            }
            if ($dev_name == "" || $dev_name == "unknown")
            {
                $dev_name = "n/a";
            }
            //$connection_type = "Unknown";
            $if_path = $inst["Layer1Interface"];
            $connection_type = getConnectionTypeStr($if_path);
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__disabled = $acEnable == "false" ? "disabled" : "";
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__conType = $connection_type;
            $count++;
        }
    }
    return $output_value;
}

function getAcceccControlEnable()
{
    return db_get("Device.X_PEGATRON_COM_AccessCtrl.Enable") === "1" ? "true" : "false";  
}
function getAcceccControlRule()
{
    return db_get("Device.X_PEGATRON_COM_AccessCtrl.Rule") ;
}
?>
