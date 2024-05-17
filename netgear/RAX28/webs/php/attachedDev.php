<?
include_once 'wifi.php';
include_once 'dhcpv4.php';
include_once 'common_utils.php';

$dbg = FALSE;

function getQosDevInfo($type)
{
    $lookup_cmd = 'cd /var/tmp/trend && ./sample.bin -a get_qos_user_info';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $res ="";
    $devCount = 0;
    $devA = array();
    while(list($a,$b) = each($rows))
    {
        if(strstr($b,"mac  :"))
        {
            $devCount++;
            
            $uidRow = explode(" : ",$rows[$a-1]);
            $macRow = explode(" : ",$rows[$a]);
            $ipv4Row = explode(" : ",$rows[$a+1]);
            $ipv6Row = explode(" : ",$rows[$a+2]);
            $hostRow = explode(" : ",$rows[$a+3]);
            $typeIdRow = explode(" : ",$rows[$a+4]);
            $classIdRow = explode(" : ",$rows[$a+5]);
            $osIdRow = explode(" : ",$rows[$a+6]);
            $vendorIdRow = explode(" : ",$rows[$a+7]);
            $devIdRow = explode(" : ",$rows[$a+8]);
            $familyIdRow = explode(" : ",$rows[$a+9]);
            $lastUsedRow = explode(" : ",$rows[$a+10]);
            $createdRow = explode(" : ",$rows[$a+11]);
            $uptimeRow = explode(" : ",$rows[$a+12]);
            $macRow[1] = strtoupper($macRow[1]);
            $devA[$macRow[1]]["uid"] = $uidRow[1];
            $devA[$macRow[1]]["ipv4"] = $ipv4Row[1];
            $devA[$macRow[1]]["ipv6"] = $ipv6Row[1];
            $devA[$macRow[1]]["host"] = $hostRow[1];
            $devA[$macRow[1]]["type_id"] = $typeIdRow[1];
            $devA[$macRow[1]]["class_id"] = $classIdRow[1];
            $devA[$macRow[1]]["os_id"] = $osIdRow[1];
            $devA[$macRow[1]]["vendor_id"] = $vendorIdRow[1];
            $devA[$macRow[1]]["dev_id"] = $devIdRow[1];
            $devA[$macRow[1]]["family_id"] = $familyIdRow[1];
            $devA[$macRow[1]]["last_used_ts"] = $lastUsedRow[1];
            $devA[$macRow[1]]["created_ts"] = $createdRow[1];
            $devA[$macRow[1]]["uptime"] = $uptimeRow[1];
            $devA[$macRow[1]]["downRate"] = 0;
            $devA[$macRow[1]]["upRate"] = 0;
            
            for($appCount = 0 ;$appCount <= 100;$appCount ++)
            {
               if(strlen(trim($rows[$a+17+$appCount])) === 0)
               break;
            }
            $devA[$macRow[1]]["appCount"] = $appCount;
            //if($type == "app")
            {
                if($appCount >0)
                {
                    for($num = 0 ;$num < $appCount; $num++)
                    {
                      $appCols = explode("," ,trim($rows[$a+(17+$num)]));
                      //$devA[$macRow[1]]["app".($num+1)]["catId"] = trim($appCols[0]);
                      //$devA[$macRow[1]]["app".($num+1)]["appId"] = explode(" ",trim($appCols[1]))[0];
                      $devA[$macRow[1]]["app".($num+1)]["appName"] = explode("  ",trim($appCols[8]))[1];
                      $devA[$macRow[1]]["downRate"] += $devA[$macRow[1]]["app".($num+1)]["downRate"] = round(explode("(",trim($appCols[2]))[0]*8/1024/1024,2);
                      $devA[$macRow[1]]["upRate"] += $devA[$macRow[1]]["app".($num+1)]["upRate"] = round(explode("(",trim($appCols[6]))[0]*8/1024/1024,2);
                    }
                }
            }
        }

    }
    return $devA;
}


$dev_type_IconList =
array(
    "unknown",
    "Computer_(Generic)",
    "Laptop",
    "Desktop",
    "Entertainment (Generic)",
    "TV",
    "Media Streamer",
    "Gaming",
    "Smart Speaker",
    "Home Office (Generic)",
    "Printer",
    "IoT (Generic)",
    "Smart Plug",
    "Fridge",
    "Light",
    "Thermostat",
    "Frame",
    "Smart Phone (Generic)",
    "Tablet",
    "Network (Generic)",
    "NAS",
    "Router",
    "Extender",
    "IP Phone",
    "Security (Generic)",
    "Camera",
    "Doorbell",
    "Smart Lock",
    "Wearable (Generic)",
);

$dev_type_MlangList =
array(
    "APPE30",
    "DTYPE_01",
    "DTYPE_02",
    "DTYPE_03",
    "DTYPE_04",
    "DTYPE_05",
    "DTYPE_06",
    "DTYPE_07",
    "DTYPE_08",
    "DTYPE_09",
    "DTYPE_10",
    "DTYPE_11",
    "DTYPE_12",
    "DTYPE_13",
    "DTYPE_14",
    "DTYPE_15",
    "DTYPE_16",
    "DTYPE_17",
    "DTYPE_18",
    "DTYPE_19",
    "DTYPE_20",
    "DTYPE_21",
    "DTYPE_22",
    "DTYPE_23",
    "DTYPE_24",
    "DTYPE_25",
    "DTYPE_26",
    "DTYPE_27",
    "DTYPE_28",
);

$type_nameList = array(
"unknown",
"Computer (Generic)",
"Laptop",
"Desktop",
"Entertainment (Generic)",
"TV",
"Media Streamer",
"Gaming",
"Smart Speaker",
"Home Office (Generic)",
"Printer",
"IoT (Generic)",
"Smart Plug",
"Fridge",
"Light",
"Thermostat",
"Frame",
"Smart Phone (Generic)",
"Tablet",
"Network (Generic)",
"NAS",
"Router",
"Extender",
"IP Phone",
"Security (Generic)",
"Camera",
"Doorbell",
"Smart lock",
"Wearable (Generic)"
);

$priority_maps = array (
"4" => "AQS032",
"3" => "AQS031",
"2" => "MAD012",
"1" => "AQS034"
);
$attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
$json = db_getObj($attachedDev_path);
if($json === FALSE)
{
    return ;  
}
                                             
$attached_devices = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
if (json_last_error() != JSON_ERROR_NONE) {
  printf("JSON Error: %s", json_last_error_msg());
}

function getAttachDevNum()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $count = 0;
    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
        return $count;  
    }

//    $data = json_decode($json,true);
    $data = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
      return ;
    }

    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "1") 
        {
            $count++;
        }
    }
    
    return $count;
}

function getMlang_GeneralRuleStatus()
{
   $defaultAccessRule = db_get("Device.X_PEGATRON_COM_AccessCtrl.Rule");
   
   if($defaultAccessRule === "allow")
   {
       return "D-genie_412"; 
   }
   else if ($defaultAccessRule === "deny")
   {
       return "D-genie_413"; 
   }
}

function getMlang_AclStatus()
{
   $acl_enable = db_get("Device.X_PEGATRON_COM_AccessCtrl.Enable");
   if($acl_enable === "1")
   {
       return "genie_185"; 
   }
   else
   {
       return "genie_186"; 
   }
}

function getAclEnable()//to do
{
   $acl_enable = 1;
   return $acl_enable; 
}

function getConnectionTypeStr($if_path)
{
    global $ssid_2g, $ssid_5g, $ssid_5g1;
    global $guest_ssid_2g, $guest_ssid_5g, $guest_ssid_5g1;
    if(strpos($if_path,"Ethernet") !== FALSE)
    {
        return "genie_184";//Wired
    }

    if(strpos($if_path,"WiFi") !== FALSE)
    {
        if(strpos($if_path,"SSID.{$ssid_2g}") !== FALSE)
        {
            return "MAD032";//2G
        }
        else if(strpos($if_path,"SSID.{$ssid_5g}") !== FALSE)
        {
            return "MAD034";//5G1
        }
        else if(strpos($if_path,"SSID.{$ssid_5g1}") !== FALSE)
        {
            return "MAD036";//5G2
        }
        else if(strpos($if_path,"SSID.{$guest_ssid_2g}") !== FALSE)
        {
            return "MAD033";//Guest 2G
        }
        else if(strpos($if_path,"SSID.{$guest_ssid_5g}") !== FALSE)
        {
            return "MAD035";//Guest 5G
        }
        else if(strpos($if_path,"SSID.{$guest_ssid_5g1}") !== FALSE)//to do
        {
            return "MAD035";//Guest 5G
        }
    }
    
    if(strpos($if_path,"VPN") !== FALSE)// to do
    {
        return "AQS052";//VPN
    }
    
    return "Unknow";
}               

function getSSIDNameStr($if_path)
{
    if(strpos($if_path,"Ethernet") !== FALSE)
    {
        return "";//Wired
    }

    if(strpos($if_path,"WiFi") !== FALSE)
    {
	$ssid_name = $if_path . ".SSID";
	return db_get($ssid_name);
    }

    if(strpos($if_path,"VPN") !== FALSE)// to do
    {
        return "";//VPN
    }

    return "";
}

function getPriorityStr($pri)
{
    return $GLOBALS['priority_maps'][$pri];
}

function getAttachDevValue()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $count = 0;
    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "1") 
        {
            $index = $count + 1;
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_ip = $inst["IPAddress"];
            $access_status = $inst["AccessCtrlRule"] === "deny" ? "Blocked" : "Allowed"; 
            $access_color = $access_status === "Allowed" ? "green" : "red";
            $access_status_mlang = getMlang_AccessStatus($inst["AccessCtrlRule"]);
            $if_path = $inst["Layer1Interface"];
            $connection_type_mlang = getConnectionTypeStr($if_path);
            $dev_model = "";
            $dev_type  = "";
            $dev_name  = "";
            $dev_icon  = "";
            $res = getD2InfoViaFile($dev_mac);
            if($res != "")
            {
                $displayNameCustom  = $res["DisplayNameCustom"];
                $displayNameDPI     = $res["DisplayNameDPI"];
                $displayNameNetgear = $res["DisplayNameNetgear"];
                $deviceTypeCustom   = array_search($res["DeviceTypeCustom"], $GLOBALS['type_nameList']);
                $deviceTypeNetgear  = array_search($res["DeviceTypeNetgear"], $GLOBALS['type_nameList']);;
                $displayModelCustom = $res["DisplayModelCustom"];
                $device_model       = $res["DeviceModel"];

                // Device Name
                if ($displayNameCustom !== "")
                {
                    $dev_name = $displayNameCustom;
                }
                else
                if ($displayNameDPI !== "")
                {
                    $dev_name = $displayNameDPI;
                }
                else
                if ($displayNameNetgear !== "")
                {
                    $dev_name = $displayNameNetgear;
                }
                else
                {
                    $dev_name = "";
                }

                // Device Type/Icon
                if ($deviceTypeCustom != "")
                {
                    $dev_icon = $dev_type = $deviceTypeCustom;
                }
                else
                if ($deviceTypeNetgear != "")
                {
                    $dev_icon = $dev_type = $deviceTypeNetgear;
                }
                else
                {
                    $dev_type = "";
                    $dev_icon = 1;
                }

                //Device Model
                if ($displayModelCustom !== "")
                {
                    $dev_model = $displayModelCustom;
                }
                else
                if ($device_model !== "")
                {
                    $dev_model = $device_model;
                }
                else
                {
                    $dev_model = "---";
                }
            }
            else
            {
                $dev_model = $inst["DeviceModel"] != "" ? $inst["DeviceModel"] : ($inst["FingModel"] != "" ? $inst["FingModel"] : "---");
                $dev_type = $inst["DeviceType"] === "" ? $inst["FingType"] : $inst["DeviceType"];
                $dev_name = $inst["DisplayName"] === "" ? $inst["DeviceName"] : $inst["DisplayName"];
                $dev_icon = $dev_type === "" ? 1 : $dev_type;
            }
            $dev_type_file_name = $GLOBALS['dev_type_IconList'][$dev_icon];
            $dev_type_mlang = $GLOBALS['dev_type_MlangList'][$dev_icon];
        
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__ip = $dev_ip;
            $output_value->{$index}->__model = htmlentities($dev_model);
            $output_value->{$index}->__escapedModel = escapeBackslashSinglequote($output_value->{$index}->__model);
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__escapedName = escapeBackslashSinglequote($output_value->{$index}->__name);
            $output_value->{$index}->__devIcon = $dev_icon;
            $output_value->{$index}->__img = $dev_type_file_name;
            $output_value->{$index}->__devType = $dev_type_mlang;
            $output_value->{$index}->__color = $access_color;
            $output_value->{$index}->__status = $access_status_mlang;
            $output_value->{$index}->__conType = $connection_type_mlang;

            $ssid_name = getSSIDNameStr($if_path);
            if ($ssid_name === "")
            {
                $output_value->{$index}->__ssid = "";
            }
            else
            {
                $output_value->{$index}->__ssid = "<span mlang='SGN010'>SSID</span>: " . htmlentities($ssid_name);
            }
            $count++;
        }
    }
    return $output_value;
    //return json_encode($output_value);
}

function getPriority($pri, $dev_type)
{
//TODO: need check Netgear how to get default priority
$dev_type_PriList =
array(
    2,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    2,
    1,
    3,
    3,
    4,
    2,
    2,
    2,
    2,
    2,
);

    if ($pri == 0) //it is default value and not used defined
    {
    if ($dev_type == "") $dev_type = 0;

        return $dev_type_PriList[$dev_type];
    }
    else
    {
        return $pri;
    }
}

function getQosDevValue()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $count = 0;
    $qosDevList = getQosDevInfo("dev");

    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "1") 
        {
            $index = $count + 1;
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_ip = $inst["IPAddress"];
            $access_status = $inst["AccessCtrlRule"] === "deny" ? "Blocked" : "Allowed"; 
            $access_color = $access_status === "Allowed" ? "green" : "red";
            $access_status_mlang = getMlang_AccessStatus($inst["AccessCtrlRule"]);
            $if_path = $inst["Layer1Interface"];
            $connection_type_mlang = getConnectionTypeStr($if_path);

            $dev_model = "";
            $dev_type  = "";
            $dev_name  = "";
            $dev_icon  = "";
            $res = getD2InfoViaFile($dev_mac);
            if($res != "")
            {
                $displayNameCustom  = $res["DisplayNameCustom"];
                $displayNameDPI     = $res["DisplayNameDPI"];
                $displayNameNetgear = $res["DisplayNameNetgear"];
                $deviceTypeCustom   = array_search($res["DeviceTypeCustom"], $GLOBALS['type_nameList']);
                $deviceTypeNetgear  = array_search($res["DeviceTypeNetgear"], $GLOBALS['type_nameList']);
                $displayModelCustom = $res["DisplayModelCustom"];
                $device_model       = $res["DeviceModel"];

                // Device Name
                if ($displayNameCustom !== "")
                {
                    $dev_name = $displayNameCustom;
                }
                else
                if ($displayNameDPI !== "")
                {
                    $dev_name = $displayNameDPI;
                }
                else
                if ($displayNameNetgear !== "")
                {
                    $dev_name = $displayNameNetgear;
                }
                else
                {
                    $dev_name = "";
                }

                // Device Type/Icon
                if ($deviceTypeCustom != "")
                {
                    $dev_icon = $dev_type = $deviceTypeCustom;
                }
                else
                if ($deviceTypeNetgear != "")
                {
                    $dev_icon = $dev_type = $deviceTypeNetgear;
                }
                else
                {
                    $dev_type = "";
                    $dev_icon = 1;
                }

                //Device Model
                if ($displayModelCustom !== "")
                {
                    $dev_model = $displayModelCustom;
                }
                else
                if ($device_model !== "")
                {
                    $dev_model = $device_model;
                }
                else
                {
                    $dev_model = "---";
                }
            }
            else
            {
                $dev_model = $inst["DeviceModel"] != "" ? $inst["DeviceModel"] : ($inst["FingModel"] != "" ? $inst["FingModel"] : "---");
                $dev_type = $inst["DeviceType"] === "" ? $inst["FingType"] : $inst["DeviceType"];
                $dev_name = $inst["DisplayName"] === "" ? $inst["DeviceName"] : $inst["DisplayName"];
                $dev_icon = $dev_type === "" ? 1 : $dev_type;
            }
            $dev_type_file_name = $GLOBALS['dev_type_IconList'][$dev_icon];
            $dev_type_mlang = $GLOBALS['dev_type_MlangList'][$dev_icon];
            $dev_priority_mlang = getPriorityStr(getPriority($inst["Priority"], $dev_type));
            $dev_downSpeed = $qosDevList[$dev_mac]["downRate"];
            $dev_upSpeed = $qosDevList[$dev_mac]["upRate"];
        
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__priorityStr = $dev_priority_mlang;
            $output_value->{$index}->__priority = getPriority($inst["Priority"], $dev_type);
            $output_value->{$index}->__mac = $dev_mac;
            $output_value->{$index}->__ip = $dev_ip;
            $output_value->{$index}->__model = htmlentities($dev_model);
            $output_value->{$index}->__escapedModel = escapeBackslashSinglequote($output_value->{$index}->__model);
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__escapedName = escapeBackslashSinglequote($output_value->{$index}->__name);
            $output_value->{$index}->__devIcon = $dev_icon;
            $output_value->{$index}->__img = $dev_type_file_name;
            $output_value->{$index}->__devType = $dev_type_mlang;
            $output_value->{$index}->__color = $access_color;
            $output_value->{$index}->__status = $access_status_mlang;
            $output_value->{$index}->__conType = $connection_type_mlang;
            $output_value->{$index}->__downSpeed = $dev_downSpeed == "" ? "0" :$dev_downSpeed;
            $output_value->{$index}->__upSpeed = $dev_upSpeed == "" ? "0" :$dev_upSpeed;

            $ssid_name = getSSIDNameStr($if_path);
            if ($ssid_name === "")
            {
                $output_value->{$index}->__ssid = "";
            }
            else
            {
                $output_value->{$index}->__ssid = "<span mlang='SGN010'>SSID</span>: " . htmlentities($ssid_name);
            }

            $count++;
        }
    }
    return $output_value;
    //return json_encode($output_value);
}

function getQosAppDevValue()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;
    
    $output_value = new stdClass();
    $index = 0;
    $qosDevList = getQosDevInfo("app");

    foreach($data[$attachedDev_path] as $inst)
    {
        if ($inst["Active"] === "1") 
        {
            $dev_mac = strtoupper($inst["PhysAddress"]);
            $dev_app_count = $qosDevList[$dev_mac]["appCount"];
            
            for($num = 1;$num <= $dev_app_count;$num++)
            {
                $index = $index + 1;
                $output_value->{$index} = (object) null;
                $output_value->{$index}->__index = $index;
                $output_value->{$index}->__mac = $dev_mac;
                $output_value->{$index}->__appName = $qosDevList[$dev_mac]["app".$num]["appName"];
                //$output_value->{$index}->__catId = $qosDevList[$dev_mac]["app".$num]["catId"];
                //$output_value->{$index}->__appId = $qosDevList[$dev_mac]["app".$num]["appId"];
                $output_value->{$index}->__appDownSpeed = $qosDevList[$dev_mac]["app".$num]["downRate"];
                $output_value->{$index}->__appUpSpeed = $qosDevList[$dev_mac]["app".$num]["upRate"];
            }
        }
    }
    return $output_value;

}

function getMlang_AccessStatus($AccessCtrlRule)
{
    if ($AccessCtrlRule === "deny") {
        //Blocked
        return "D-genie_416";
    }
    else if ($AccessCtrlRule === "allow") {
        //Allowed
        return "D-genie_417";
    }
}

function getDevNameFromD2File($mac)
{
    $dev_name = "";
    $cmd_str= "grep -irh {$mac} /data/dal/d2d/DeviceIdList.*.json";
    $json = exec($cmd_str);
    $d2_info = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);

    if (json_last_error() != JSON_ERROR_NONE) {
        return $dev_name;
    }

    if($d2_info != "")
    {
        // Device Name
        if ($d2_info["DisplayNameCustom"] !== "")
        {
            $dev_name = $d2_info["DisplayNameCustom"];
        }
        else
        if ($d2_info["DisplayNameDPI"] !== "")
        {
            $dev_name = $d2_info["DisplayNameDPI"];
        }
        else
        if ($d2_info["DisplayNameNetgear"] !== "")
        {
            $dev_name = $d2_info["DisplayNameNetgear"];
        }
    }

    return $dev_name;
}

function getDevNameFromD2($mac)
{
    return getDevNameFromD2File($mac);
}

function getD2InfoViaFile($mac)
{
    $cmd_str= "grep -irh {$mac} /data/dal/d2d/DeviceIdList.*.json";
    $json = exec($cmd_str);
    $d2_info = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
    if (json_last_error() != JSON_ERROR_NONE) {
        return "";
    }

    return $d2_info;
}

function isMacExisted($mac)
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data = $GLOBALS['attached_devices'];
    if ($data === null) return FALSE;

    foreach($data[$attachedDev_path] as $inst)
    {
        $dev_mac = strtoupper($inst["PhysAddress"]);
        if ($dev_mac === $mac) 
        {
            return TRUE;
        }
    }
    return FALSE;
}

function getDevNameByMac($mac)
{
    if (isMacExisted($mac) == FALSE)
    {
        return " ";
    }

    $dev_name = getDevNameFromD2($mac);
    return $dev_name;
}

/*function getAccessStatusByMac($mac)
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

    foreach($data[$attachedDev_path] as $inst)
    {
        if(strtoupper($inst["DevMacAddr"]) === $mac)
        {
            return $inst["DevRule"];
        }
    }

    return ;
}*/

function getAccessInstancIdByMac($mac)
{
    $attachedDev_path = "Device.X_PEGATRON_COM_AccessCtrlDev";
    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
        return ;  
    }

//    $data = json_decode($json,true);
    $data = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }

    foreach($data[$attachedDev_path] as $inst)
    {
        if(strtoupper($inst["DevMacAddr"]) === $mac)
        {
            return $inst["instanceID"];
        }
    }

    return "";
}

function getCurrentTime()
{
    //return db_get("Device.Time.CurrentLocalTime");
    //"Device.Time.CurrentLocalTime" has no week info, and it has timezone problem in transforming the time to have week info.
    //So use date command directly
    return shell_exec("date +%c");
}

function getVPNDevkStart()
{
    $cmd_str = "/etc/openvpncfg/genvpnclientlist.sh";
    exec($cmd_str, $res, $status);
    return $status;
}

function getVpnDevValue()
{
    if(getVPNDevkStart() == 0)
    {
        $filePath = "/tmp/openvpn/VPN_Client_json";
        
        if(!file_exists($filePath))
        {
            return "";  
        }
        else
        { 
            $fileContent = file_get_contents($filePath);
            $data = json_decode($fileContent,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
//            $data = json_decode($fileContent, true);
            if (json_last_error() != JSON_ERROR_NONE) 
            {
                printf("JSON Error: %s", json_last_error_msg());
                return ;
            }
            $output_value = new stdClass();
            $count = 0;
            foreach($data as $inst)
            {
                $index = $count + 1;
                $output_value->{$index} = (object) null;
                $output_value->{$index}->__index = $index;
                //$output_value->{$index}->__name = $inst["Common Name"];
                $remoteIP = substr($inst["Real Address"], 0, strpos($inst["Real Address"], ":"));
                $output_value->{$index}->__remoteIP = $remoteIP;
                $mac =  $inst["Virtual Address"];
                $pos = strpos($mac,":");
                if($pos === false)
                {
                    $output_value->{$index}->__localIP = $mac;
                    $output_value->{$index}->__name = "OPENVPN-TUN";
                }else{
                    $output_value->{$index}->__localIP = getVPNIpaddress($mac);//$addr;
                    $output_value->{$index}->__name = htmlentities(getVPNhostname($mac));
                }
                $output_value->{$index}->__escapedName = escapeBackslashSinglequote($output_value->{$index}->__name);
                $conTime = trim(preg_replace('/\s\s+/', ' ', $inst["Last Ref"]));
                $condate = date_create_from_format('D M d H:i:s Y', $conTime);
                $CurrentTime = getCurrentTime();
                $localTime = trim(preg_replace('/\s\s+/', ' ', $CurrentTime));
                $local_date = date_create_from_format('D M d H:i:s Y', $localTime);
                //$diffsec = abs($local_date->getTimestamp() - $date->getTimestamp());
                $intvl = $local_date->diff($condate);
                if($intvl->d > 0)
                {
                    $hours = $intvl->d*24+$intvl->h;
                    $diffstring = sprintf("%02d:%02d:%02d",$hours,$intvl->i,$intvl->s);
                    $output_value->{$index}->__time = $diffstring;
                }else {
                    $output_value->{$index}->__time = $intvl->format('%H:%I:%S');
                }

                $count++;
            }
            
            return $output_value;
        }
    }
}

function getDevAppCount($devUid)
{
    $lookup_cmd = 'cd /var/tmp/trend && ./sample.bin -a get_qos_app_info';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $appCount = 0;
    while(list($a,$b) = each($rows))
    {
        if(strstr($b,"uid        cumu"))
        {
            $uidcols = explode(" ",$rows[$a+1]);
            if(explode(" ",trim($rows[$a+1]))[0] === $devUid)
            {
                $appCount ++;
            }
        }

    }
    return $appCount;
}

function getQosAppDb()
{
  return file_get_contents("/tmp/trend/bwdpi.app.db");
}
?>
