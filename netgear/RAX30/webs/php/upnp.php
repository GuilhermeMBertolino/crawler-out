<?

$dbg = FALSE;
function getUpnpEnable()
{
    if(db_get("Device.X_BROADCOM_COM_AppCfg.UpnpCfg.Enable") == "1")
        return "true";
    else
        return "false";
}

function getUpnpAdvertisementPeriod()
{
    return db_get("Device.X_BROADCOM_COM_AppCfg.UpnpCfg.Period")/60;
}

function getUpnpAdvertisementTimetoLive()
{
    return db_get("Device.X_BROADCOM_COM_AppCfg.UpnpCfg.Timetolive");
}

function getUpnpPortMappingTableValue()
{
    $table_path = "Device.NAT.PortMapping";
    $json = db_getObj($table_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $index = 0;
    foreach($data[$table_path] as $inst)
    {
        if($inst["X_BROADCOM_COM_AppName"] === "upnp")
        {
            $index++;
            $output_value->{$index} = (object) null;
            $output_value->{$index}->__protocol = $inst["Protocol"];
            $output_value->{$index}->__interPort = $inst["InternalPort"];
            $output_value->{$index}->__extPort = $inst["ExternalPort"];
            $output_value->{$index}->__ip = $inst["InternalClient"];
        }
    }
    return $output_value;
}
?>
