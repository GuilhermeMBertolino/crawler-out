<?
include_once 'common_utils.php';

function getCheckboxVal_disablePortTrigger()
{
    $enable = db_get("Device.NAT.X_PEGA_COM_PortTriggering.Enable");
    
    if ($enable == "1") {
        $disable = "0";
    }
    else if ($enable == "0"){
        $disable = "1";
    }
    
    return num_to_TrueFalseStr($disable);
}

function getInputVal_enablePortTrigger()
{
    $enable = db_get("Device.NAT.X_PEGA_COM_PortTriggering.Enable");
    
    return num_to_TrueFalseStr($enable);
}

function getTextVal_portTriggerTimeout()
{
    $timeout = db_get("Device.NAT.X_PEGA_COM_PortTriggering.Timeout");
    return $timeout;
}

function getPortForwardTable()
{
    $db_path = "Device.NAT.PortMapping";
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
        if ($inst["X_BROADCOM_COM_AppName"] == "PortForwarding")
        {
            $index = $inst["instanceID"];
            if ($inst["Protocol"] == "TCP or UDP") {
                $protocol = "TCP_UDP";
            }
            else {
                $protocol = $inst["Protocol"];
            }
        
            $output_value->{$count} = (object) null;
            $output_value->{$count}->__index = $index;
            $output_value->{$count}->__count = $count;
            $output_value->{$count}->__serviceName = htmlentities($inst["Description"]);
            $output_value->{$count}->__escapedServiceName = escapeBackslashSinglequote($output_value->{$count}->__serviceName);
            $output_value->{$count}->__serviceType = $protocol;
            $output_value->{$count}->__externalPort = $inst["X_PEGA_COM_ExternalPortRange"];
            $output_value->{$count}->__internalPort = $inst["X_PEGA_COM_InternalPortRange"];
            $output_value->{$count}->__serverIp = $inst["InternalClient"];
            $count++;
        }
    }
    return $output_value;        
}

function getPortTriggerTable()
{
    $db_path = "Device.NAT.X_PEGA_COM_PortTriggering.Rule";
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
        $index = $inst["instanceID"];
        
        if ($inst["Enable"] == "1") {
            $enableRule_checked = "checked";
        }
        else if ($inst["Enable"] == "0") {
            $enableRule_checked = "";
        }
        
        if ($inst["OpenProtocol"] == "TCP or UDP") {
            $ConnProtocol = "TCP_UDP";
            $DisplayConnProtocol = "TCP/UDP";
        }
        else {
            $ConnProtocol = $inst["OpenProtocol"];
            $DisplayConnProtocol = $inst["OpenProtocol"];
        }
        
        $output_value->{$count} = (object) null;
        $output_value->{$count}->__index = $index;
        $output_value->{$count}->__count = $count;
        $output_value->{$count}->__enableRule = $enableRule_checked;
        $output_value->{$count}->__serviceName = htmlentities($inst["Description"]);
        $output_value->{$count}->__escapedServiceName = escapeBackslashSinglequote($output_value->{$count}->__serviceName);
        $output_value->{$count}->__triggerProtocol = $inst["TriggerProtocol"];
        $output_value->{$count}->__triggerPort  = $inst["TriggerPort"];
        $output_value->{$count}->__inConnType  = $ConnProtocol;
        $output_value->{$count}->__displayInConnType  = $DisplayConnProtocol;
        $output_value->{$count}->__inStartPort  = $inst["OpenPortStart"];
        $output_value->{$count}->__inEndPort  = $inst["OpenPortEnd"];
        if ($inst["IPAddress"] == "0.0.0.0") {
            $output_value->{$count}->__userIp  = "any";
        }
        else {
            $output_value->{$count}->__userIp  = $inst["IPAddress"];
        }
        $count++;
    }

    return $output_value;        
}
?>
