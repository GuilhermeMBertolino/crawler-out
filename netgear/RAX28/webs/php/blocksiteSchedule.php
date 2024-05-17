<?
include_once 'common_utils.php';

function getCheckboxVal_isEveryDay()
{
    $en_Sunday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Sunday_Enable");
    $en_Monday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Monday_Enable");
    $en_Tuesday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Tuesday_Enable");
    $en_Wednesday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Wednesday_Enable");
    $en_Thursday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Thursday_Enable");
    $en_Friday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Friday_Enable");
    $en_Saturday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Saturday_Enable");
    
    if ($en_Sunday == "1" && $en_Monday == "1" && $en_Tuesday == "1" &&
        $en_Wednesday == "1" && $en_Thursday == "1" && $en_Friday == "1" && $en_Saturday == "1")
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getCheckboxVal_isSunday()
{
    $en_Sunday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Sunday_Enable");
    return num_to_TrueFalseStr($en_Sunday);
}

function getCheckboxVal_isMonday()
{
    $en_Monday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Monday_Enable");
    return num_to_TrueFalseStr($en_Monday);
}

function getCheckboxVal_isTuesday()
{
    $en_Tuesday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Tuesday_Enable");
    return num_to_TrueFalseStr($en_Tuesday);
}

function getCheckboxVal_isWednesday()
{
    $en_Wednesday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Wednesday_Enable");
    return num_to_TrueFalseStr($en_Wednesday);
}

function getCheckboxVal_isThursday()
{
    $en_Thursday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Thursday_Enable");
    return num_to_TrueFalseStr($en_Thursday);
}

function getCheckboxVal_isFriday()
{
    $en_Friday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Friday_Enable");
    return num_to_TrueFalseStr($en_Friday);
}

function getCheckboxVal_isSaturday()
{
    $en_Saturday = db_get("Device.X_PEGATRON_COM_BlockSchedule.Saturday_Enable");
    return num_to_TrueFalseStr($en_Saturday);
}

function getCheckboxVal_allDayBlock()
{
    $startTime = db_get("Device.X_PEGATRON_COM_BlockSchedule.FromTimeSlot");
    $endTime = db_get("Device.X_PEGATRON_COM_BlockSchedule.ToTimeSlot");
    
    if ($startTime == "0" && $endTime == "1439")
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function getTextVal_startBlockTime()
{
    $time_of_minute = intval(db_get("Device.X_PEGATRON_COM_BlockSchedule.FromTimeSlot"));
    $hour = $time_of_minute / 60;
    $min = $time_of_minute % 60;
    $starttime = sprintf("%02d:%02d", $hour, $min);
    return $starttime;
}

function getTextVal_endBlockTime()
{
    $time_of_minute = intval(db_get("Device.X_PEGATRON_COM_BlockSchedule.ToTimeSlot"));
    $hour = $time_of_minute / 60;
    $min = $time_of_minute % 60;
    $endtime = sprintf("%02d:%02d", $hour, $min);
    return $endtime;
}

function getSelectVal_timeZone()
{
    $local_timezone = db_get("Device.Time.LocalTimeZone");
    return $local_timezone;
}

function getCheckboxVal_autoDaylightSaving()
{
    $en_DaylightSaving = db_get("Device.Time.X_PEGATRON_COM_EnableDaylightSaving");
    return num_to_TrueFalseStr($en_DaylightSaving);
}

function getCheckboxVal_preferNtpServer()
{
    $prefer_server = db_get("Device.Time.X_PEGATRON_COM_PreferNTPServer");
    $server1 = db_get("Device.Time.NTPServer1");
    
    if ($prefer_server != "" && $prefer_server == $server1) {
        return "true";
    }
    else {
        return "false";
    }
}

function getTextVal_ntpServer()
{
    return db_get("Device.Time.X_PEGATRON_COM_PreferNTPServer");
}

function getTextVal_currentTime()
{
    //return db_get("Device.Time.CurrentLocalTime");
    //"Device.Time.CurrentLocalTime" has no week info, and it has timezone problem in transforming the time to have week info.
    //So use date command directly
    return shell_exec("date +%c");
}

function getTextVal_ntpResult()
{
    $ntp_status = db_get("Device.Time.Status");
	
    return $ntp_status;
}

function getTextVal_timeZonestate()
{
    $timeZone_state = db_get("Device.Time.X_PEGATRON_COM_TimeZoneState");
	
    return $timeZone_state;
}

function getVal_ActiveTimeZoneState()
{
    $activeTimeZone_state = db_get("Device.Time.X_PEGATRON_COM_ActiveTimeZoneState");

    return $activeTimeZone_state;
}

?>
