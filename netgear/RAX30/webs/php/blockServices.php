<?
$dbg = FALSE;

function getBlockServicesType()
{
    return db_get("Device.X_PEGATRON_COM_BlockService.BlockType");
}

function getBlockServicesTableValue()
{

    $blockList_path = "Device.X_PEGATRON_COM_BlockService.Rule";
    $json = db_getObj($blockList_path);
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
    foreach($data[$blockList_path] as $inst)
    {
        $index = $count + 1;
        $serviceName = $inst["ServiceName"];
        $serviceType = $inst["ServiceType"];
        $protocol = $inst["Protocol"];
        $filterType =  $inst["FilterType"];
        $portStr = $inst["PortStart"] == $inst["PortEnd"] ? $inst["PortStart"] : $inst["PortStart"]."...".$inst["PortEnd"]; 
        $ipStr = $filterType == "All" ? "all" : ($filterType == "Range" ? $inst["IPAddress"]." - ".$inst["EndIPAddress"] : $inst["IPAddress"]);
        $iid = $inst["instanceID"];

        if ($inst["Target"] === "Drop") {
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__index = $index;
            $output_value->{$index}->__iid = $iid;
            $output_value->{$index}->__protocol = $protocol;
            $output_value->{$index}->__ipStr = $ipStr;
            $output_value->{$index}->__portStr = $portStr;
            $output_value->{$index}->__sName = htmlentities($serviceName);
            $output_value->{$index}->__sType = $serviceType;
            $output_value->{$index}->__filterType = $filterType;
            $count++;
        }
    }
    return $output_value;
}

?>