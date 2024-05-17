<?
include_once 'attachedDev.php';
$dbg = FALSE;

$json = db_getObj("Device.X_PEGA_COM_AttachDevice.Device");
if($json === FALSE)
{
    return ;  
}
$attached_devices = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
//$attached_devices = json_decode($json,true);
if (json_last_error() != JSON_ERROR_NONE) {
    printf("JSON Error: %s", json_last_error_msg());
}


$pool_inst = getServerPoolInstId();
$json = db_getObj("Device.DHCPv4.Server.Pool.{$pool_inst}.StaticAddress");
if($json === FALSE)
{
    return FALSE;  
}

$reservedClients = json_decode($json,true);
if (json_last_error() != JSON_ERROR_NONE) 
{
    printf("JSON Error: %s", json_last_error_msg());
    return FALSE;
}

function isReservedClientByMAC($input_mac)
{
    $pool_inst = getServerPoolInstId();
    if($pool_inst === 0)
        return ;
    $reserved_path = "Device.DHCPv4.Server.Pool.{$pool_inst}.StaticAddress";
    $data = $GLOBALS['reservedClients'];
    if ($data === null) return FALSE;

    foreach($data[$reserved_path] as $inst)
    { 
       if(strcasecmp($input_mac, $inst["Chaddr"]) === 0)
       {
          return TRUE; 
       }
    }
    return FALSE;
}

function getNonReservedClientTable()
{
    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $json = db_getObj($attachedDev_path);
    if($json === FALSE)
    {
        return ;  
    }

 //   $data = json_decode($json,true);
    $data = json_decode($json,true,512,JSON_INVALID_UTF8_SUBSTITUTE|JSON_UNESCAPED_UNICODE);
    if (json_last_error() != JSON_ERROR_NONE) 
    {
        printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $count = 0;
    foreach($data[$attachedDev_path] as $inst)
    {
        $dev_mac = $inst["PhysAddress"];
        $if_path = $inst["Layer1Interface"];
        $dev_ip = $inst["IPAddress"];
        $connection_type = getConnectionTypeStr($if_path);

        if($inst["Active"] === "0" || $connection_type === "AQS052" || $connection_type === "Unknow" ||
           isReservedClientByMAC($dev_mac)
          )
        {
            continue;  
        }

        $index = $count + 1;
        $dev_ip = $inst["IPAddress"];
        $dev_name = getDevNameFromD2($dev_mac);

        $output_value->{$index} = (object) null;
        $output_value->{$index}->__index = $index;
        $output_value->{$index}->__mac = strtoupper($dev_mac);
        $output_value->{$index}->__addr = $dev_ip;
        $output_value->{$index}->__name = htmlentities($dev_name);
        $output_value->{$index}->__escapedName = escapeBackslashSinglequote($output_value->{$index}->__name);
        $output_value->{$index}->__count= $count;
        $count++;
    }
    return $output_value;
}

function findAttachedDevNameByMac($input_mac)
{
    if (isMacExisted($input_mac) == FALSE)
    {
        return " ";
    }

    return getDevNameFromD2($input_mac);
}

function getServerPoolInstId()
{
    $pool_inst_id = 0;
    $pool_inst_path = "Device.DHCPv4.Server.Pool";
    $pool_inst_list = db_getInstIDList($pool_inst_path); 
    if($pool_inst_list !== FALSE)
    {
        $pool_inst_list = json_decode($pool_inst_list,true);
        foreach($pool_inst_list[$pool_inst_path] as $inst_id)
        {
            
            if(db_get("Device.DHCPv4.Server.Pool.{$inst_id}.Enable") === "1")
            {
                return $inst_id;
            }  
        }
    }
    return $pool_inst_id;
}

function getReservedTable()
{
    $pool_inst = getServerPoolInstId();
    if($pool_inst === 0)
        return ;
    $reserved_path = "Device.DHCPv4.Server.Pool.{$pool_inst}.StaticAddress";
    $data = $GLOBALS['reservedClients'];
    if ($data === null) return FALSE;

    $attachedDev_path = "Device.X_PEGA_COM_AttachDevice.Device";
    $data_attachedDev = $GLOBALS['attached_devices'];

    $output_value = new stdClass();
    $count = 0;
    foreach($data[$reserved_path] as $inst)
    {
        if($inst["Enable"] === "0")
          continue;
        else
        {
            $iid = $inst["instanceID"];
            $index = $count + 1;
            $mac = $inst["Chaddr"];
            $addr = $inst["Yiaddr"];
            $dev_name = findAttachedDevNameByMac($mac);
            //KKHuang: Corner Case: User might add a non-existent client into reserved table
            if ($dev_name === "") {
                if ($data_attachedDev)
                {
                    foreach($data_attachedDev[$attachedDev_path] as $inst_attachedDev)
                    {
                        $dev_mac = $inst_attachedDev["PhysAddress"];
                        if(strcasecmp($dev_mac, $mac) == 0)
                        {
                            if ($inst_attachedDev["DisplayName"] === "")
                            {
                                $dev_name = $inst_attachedDev["DeviceName"] === "" ? "&nbsp;" : $inst_attachedDev["DeviceName"];
                            }
                            else
                            {
                                $dev_name = $inst_attachedDev["DisplayName"];
                            }
                            break;
                        }
                    }
                }
                if ($dev_name === "")
                {
                    $dev_name = "$nbsp;";
                }
            }
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__mac = strtoupper($mac);
            $output_value->{$index}->__addr = $addr;
            $output_value->{$index}->__name = htmlentities($dev_name);
            $output_value->{$index}->__escapedName = escapeBackslashSinglequote($output_value->{$index}->__name);
            $output_value->{$index}->__count= $count;
            $count++;
        }
    }
    return $output_value;
}

function getAllReservedByType($type)
{
    $pool_inst = getServerPoolInstId();
    if($pool_inst === 0)
        return ;
    $reserved_path = "Device.DHCPv4.Server.Pool.{$pool_inst}.StaticAddress";
    $data = $GLOBALS['reservedClients'];
    if ($data === null) return FALSE;

    $list = "";
    foreach($data[$reserved_path] as $inst)
    {
        if($inst["Enable"] === "0")
          continue;
        
        $mac = $inst["Chaddr"];
        $mac = strtoupper($mac);
        $addr = $inst["Yiaddr"];
        $dev_name = findAttachedDevNameByMac($mac);
        if($type === 1)
        {
            $list = $list.$mac." ";
        }
        else if($type === 2)
        {
            $list = $list.$addr." ";
        }
        else if($type === 3)
        {
            $list = $list.$dev_name."|";
        }

    }
    if(strlen($list) > 0)
        return $list;
}
?>
