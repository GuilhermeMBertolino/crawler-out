<?
function getRadioVal_enableLed()
{   
    $onoff = db_get("Device.X_PEGATRON_COM_DeviceInfo.AllLedOnOff");

    if ($onoff != 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

?>
