<?

$dbg = FALSE;

function getLacpInstanceId()
{
    $lag_path = "Device.Ethernet.LAG";
    $lag_list = db_getInstIDList($lag_path);

    if($lag_list !== FALSE)
    {
        $lag_list = json_decode($lag_list,true);
        foreach($lag_list[$lag_path] as $inst_id)
        {
            if (db_get("Device.Ethernet.LAG.{$inst_id}.Name") === "bond0")
            {
                return $inst_id;
            }

        }
    }
    return FALSE;
}

function getLacpEnable()
{
    $inst_id = getLacpInstanceId();
    return db_get("Device.Ethernet.LAG.{$inst_id}.Enable") === "1" ? "true" : "false";

}

function getLacpMode()
{
    $inst_id = getLacpInstanceId();
    return db_get("Device.Ethernet.LAG.{$inst_id}.X_BROADCOM_COM_Mode");
}


function getLacpOption()
{
    if(getLacpEnable() !== "true")
        return "disabled";
    else
    {
        $mode = getLacpMode();
        if($mode == "802.3ad")
        {
            return "LACP";  
        }
        //else if($mode == "static")
	else
        {
            return "static";
        }
    }
    
    return "disabled";
}


function getLacpStatus()
{
    #$inst_id = getLacpInstanceId();
    #$status = db_get("Device.Ethernet.LAG.{$inst_id}.Status");
    
    #return $status === "Up" ? "Eth_Aggr_005" : "Eth_Aggr_004";

    $cmd = "cat /sys/class/net/bond0/speed";
    $output= shell_exec($cmd);

    return (int)$output === 2000 ? "Eth_Aggr_005" : "Eth_Aggr_004";
}


?>
