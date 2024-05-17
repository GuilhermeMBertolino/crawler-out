<?
$dbg = FALSE;

function getBlockType()
{
    $enable = db_get("Device.X_BROADCOM_COM_UrlFilterCfg.Enable");
    $scheduleEnable = db_get("Device.X_BROADCOM_COM_UrlFilterCfg.ScheduleEnable");  

    if($enable === "1")
        return "always";
    else
    {
        if($scheduleEnable === "1")
            return "schedule";
        else
            return "never";
    }
}

function getBlockKeywordList()
{

    $blockList_path = "Device.X_BROADCOM_COM_UrlFilterCfg.X_BROADCOM_COM_UrlFilterListCfgObj";
    $json = db_getObj($blockList_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    $output =[];

    $count = 0;
    foreach($data[$blockList_path] as $inst)
    {
        //if ($inst["Enable"] === "1") 
        //{
            array_push($output, htmlentities($inst["UrlAddress"]));
        //}
    }
    #$output = (object)$output;
    return $output;

}

function getTrustIpEnable()
{
    $enable = db_get("Device.X_BROADCOM_COM_UrlFilterCfg.TrustIpEnable");

    if($enable === "1")
        return "true";
    else
    {
        return "false";
    }
}

function getTrustIpAddress()
{
    $addr = db_get("Device.X_BROADCOM_COM_UrlFilterCfg.TrustIpAddress");
    $lan_ip = getLanInstanceIpAddr();
    $lan_prefix = substr($lan_ip,0,strrpos($lan_ip,".")+1);
    return $addr ? $addr : $lan_prefix."0" ;
}
?>