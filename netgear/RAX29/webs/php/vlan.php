<?
include_once 'common_utils.php';

function getCheckboxVal_enableVlan()
{   
    $enable = db_get("Device.X_PEGATRON_COM_VLAN.Enable");
    
    return num_to_TrueFalseStr($enable);
}

function getRadioVal_groupType()
{
    return db_get("Device.X_PEGATRON_COM_VLAN.Type");
    //return "port";
    //return "vid";
}

function getCheckboxVal_port1()
{
    $portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "port1") {
            return "true";
        }
    }
    
    return "false";
}

function getCheckboxVal_port2()
{
$portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "port2") {
            return "true";
        }
    }
    
    return "false";
}

function getCheckboxVal_port3()
{
    $portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "port3") {
            return "true";
        }
    }
    
    return "false";
}

function getCheckboxVal_port4()
{
    $portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "port4") {
            return "true";
        }
    }
    
    return "false";
}

function getCheckboxVal_wifi2g()
{
    $portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "wifi2g") {
            return "true";
        }
    }
    
    return "false";
}

function getCheckboxVal_wifi5g()
{
    $portMap = db_get("Device.X_PEGATRON_COM_VLAN.PortMaps");
    $port_array = explode(",", $portMap);
    
    foreach($port_array as $port) {
        if ($port == "wifi5g") {
            return "true";
        }
    }
    
    return "false";
}

function getVlanRuleTable()
{
    $db_path = "Device.X_PEGATRON_COM_VLAN.Group";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    
    $output_value = new stdClass();
    $count = 1;
    
    foreach($data[$db_path] as $inst)
    {
        //get index    
        $index = $inst["instanceID"];
            
        //get enable
        if ($inst["Enable"] == "1") {
            $enable = "checked";
        }
        else if ($inst["Enable"] == "0") {
            $enable = "";
        }
    
        //get port 
        $portMap = $inst["PortMaps"];
        $port_array = explode(",", $portMap);
        $port1 = "";
        $port2 = "";
        $port3 = "";
        $port4 = "";
        $wifi2g = "";
        $wifi5g = "";
    
        foreach($port_array as $port) {
            if ($port == "port1") {
                $port1 = "checked";
            }
            if ($port == "port2") {
                $port2 = "checked";
            }
            if ($port == "port3") {
                $port3 = "checked";
            }
            if ($port == "port4") {
                $port4 = "checked";
            }
            if ($port == "wifi2g") {
                $wifi2g = "checked";
            }
            if ($port == "wifi5g") {
                $wifi5g = "checked";
            }
        }
            
        
        if ($inst["Display"] == "0") {
            $display = 'style="display:none;"';
        }
        else {
            $display = "";
        }
            
            $output_value->{$count} = (object) null;
        $output_value->{$count}->__index = $index;
        $output_value->{$count}->__enableRule = $enable;
        $output_value->{$count}->__name = htmlentities($inst["GroupName"]);
        $output_value->{$count}->__escapedName = escapeBackslashSinglequote($output_value->{$count}->__name);
        $output_value->{$count}->__vlandId = $inst["Vid"];
        $output_value->{$count}->__priority = $inst["Priority"];
        $output_value->{$count}->__enPort1 = $port1;
        $output_value->{$count}->__enPort2 = $port2;
        $output_value->{$count}->__enPort3 = $port3;
        $output_value->{$count}->__enPort4 = $port4;
        $output_value->{$count}->__enWifi2g = $wifi2g;
        $output_value->{$count}->__enWifi5g = $wifi5g;
        $output_value->{$count}->__displayStyle = $display;
        $output_value->{$count}->__displayVal = $inst["Display"];
        
            $count++;
    }
    return $output_value;
}
?>
