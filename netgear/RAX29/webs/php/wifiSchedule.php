<?

function get2GWifiScheduleTable()
{
    $db_path = "Device.X_PEGATRON_COM_WifiScheduleRule";
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
        if ($inst["RadioName"] == "2G")
        {
            $index = $inst["RuleIndex"];
            $starttime = getStartTime($inst);
            $endtime = getEndTime($inst);
            $week = getWeek($inst);
            $output_value->{$count} = (object) null;
            $output_value->{$count}->__index = $index;
            $output_value->{$count}->__radio = $inst["RadioName"];
            $output_value->{$count}->__starttime = $starttime;
            $output_value->{$count}->__endtime = $endtime;
            $output_value->{$count}->__week = $week;
            $output_value->{$count}->__enSunday = $inst["Sunday_Enable"];
            $output_value->{$count}->__enMonday = $inst["Monday_Enable"];
            $output_value->{$count}->__enTuesday = $inst["Tuesday_Enable"];
            $output_value->{$count}->__enWednesday = $inst["Wednesday_Enable"];
            $output_value->{$count}->__enThursday = $inst["Thursday_Enable"];
            $output_value->{$count}->__enFriday = $inst["Friday_Enable"];
            $output_value->{$count}->__enSaturday = $inst["Saturday_Enable"];
            $count++;
        }
    }
    return $output_value;
}

function get5GWifiScheduleTable()
{
    $db_path = "Device.X_PEGATRON_COM_WifiScheduleRule";
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
        if ($inst["RadioName"] == "5G")
        {
            $index = $inst["RuleIndex"];
            $starttime = getStartTime($inst);
            $endtime = getEndTime($inst);
            $week = getWeek($inst);
            $output_value->{$count} = (object) null;
            $output_value->{$count}->__index = $index;
            $output_value->{$count}->__radio = $inst["RadioName"];
            $output_value->{$count}->__starttime = $starttime;
            $output_value->{$count}->__endtime = $endtime;
            $output_value->{$count}->__week = $week;
            $output_value->{$count}->__enSunday = $inst["Sunday_Enable"];
            $output_value->{$count}->__enMonday = $inst["Monday_Enable"];
            $output_value->{$count}->__enTuesday = $inst["Tuesday_Enable"];
            $output_value->{$count}->__enWednesday = $inst["Wednesday_Enable"];
            $output_value->{$count}->__enThursday = $inst["Thursday_Enable"];
            $output_value->{$count}->__enFriday = $inst["Friday_Enable"];
            $output_value->{$count}->__enSaturday = $inst["Saturday_Enable"];
            $count++;
        }
    }
    return $output_value;
}

function get5G1WifiScheduleTable()
{
    $db_path = "Device.X_PEGATRON_COM_WifiScheduleRule";
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
        if ($inst["RadioName"] == "5G1")
        {
            $index = $inst["RuleIndex"];
            $starttime = getStartTime($inst);
            $endtime = getEndTime($inst);
            $week = getWeek($inst);
            $output_value->{$count} = (object) null;
            $output_value->{$count}->__index = $index;
            $output_value->{$count}->__radio = $inst["RadioName"];
            $output_value->{$count}->__starttime = $starttime;
            $output_value->{$count}->__endtime = $endtime;
            $output_value->{$count}->__week = $week;
            $output_value->{$count}->__enSunday = $inst["Sunday_Enable"];
            $output_value->{$count}->__enMonday = $inst["Monday_Enable"];
            $output_value->{$count}->__enTuesday = $inst["Tuesday_Enable"];
            $output_value->{$count}->__enWednesday = $inst["Wednesday_Enable"];
            $output_value->{$count}->__enThursday = $inst["Thursday_Enable"];
            $output_value->{$count}->__enFriday = $inst["Friday_Enable"];
            $output_value->{$count}->__enSaturday = $inst["Saturday_Enable"];
            $count++;
        }
    }
    return $output_value;
}

function getStartTime($inst)
{
    $time_of_minute = "";
    $starttime_hour = "";
    $starttime_min = "";
    $starttime = "";
    
    if ($inst["Sunday_Enable"] == "1") {
        $time_of_minute = intval($inst["Sunday_FromTimeSlot"]);
    }
    else if ($inst["Monday_Enable"] == "1") {
        $time_of_minute = intval($inst["Monday_FromTimeSlot"]);
    }
    else if ($inst["Tuesday_Enable"] == "1") {
        $time_of_minute = intval($inst["Tuesday_FromTimeSlot"]);
    }
    else if ($inst["Wednesday_Enable"] == "1") {
        $time_of_minute = intval($inst["Wednesday_FromTimeSlot"]);
    }
    else if ($inst["Thursday_Enable"] == "1") {
        $time_of_minute = intval($inst["Thursday_FromTimeSlot"]);
    }
    else if ($inst["Friday_Enable"] == "1") {
        $time_of_minute = intval($inst["Friday_FromTimeSlot"]);
    }
    else if ($inst["Saturday_Enable"] == "1") {
        $time_of_minute = intval($inst["Saturday_FromTimeSlot"]);
    }
    
    $starttime_hour = intval($time_of_minute / 60);
    $starttime_min = $time_of_minute % 60;
    $starttime = sprintf("%02d:%02d", $starttime_hour, $starttime_min);
    
    return $starttime;
}

function getEndTime($inst)
{
    $time_of_minute = "";
    $endtime_hour = "";
    $endtime_min = "";
    $endtime = "";
    
    if ($inst["Sunday_Enable"] == "1") {
        $time_of_minute = intval($inst["Sunday_ToTimeSlot"]);
    }
    else if ($inst["Monday_Enable"] == "1") {
        $time_of_minute = intval($inst["Monday_ToTimeSlot"]);
    }
    else if ($inst["Tuesday_Enable"] == "1") {
        $time_of_minute = intval($inst["Tuesday_ToTimeSlot"]);
    }
    else if ($inst["Wednesday_Enable"] == "1") {
        $time_of_minute = intval($inst["Wednesday_ToTimeSlot"]);
    }
    else if ($inst["Thursday_Enable"] == "1") {
        $time_of_minute = intval($inst["Thursday_ToTimeSlot"]);
    }
    else if ($inst["Friday_Enable"] == "1") {
        $time_of_minute = intval($inst["Friday_ToTimeSlot"]);
    }
    else if ($inst["Saturday_Enable"] == "1") {
        $time_of_minute = intval($inst["Saturday_ToTimeSlot"]);
    }
    
    $endtime_hour = intval($time_of_minute / 60);
    $endtime_min = $time_of_minute % 60;
    $endtime = sprintf("%02d:%02d", $endtime_hour, $endtime_min);
    
    return $endtime;
}

function getWeek($inst)
{
    $week = "";

    if ($inst["Sunday_Enable"] == "1" && $inst["Monday_Enable"] == "1" &&
        $inst["Tuesday_Enable"] == "1" && $inst["Wednesday_Enable"] == "1" &&
        $inst["Thursday_Enable"] == "1" && $inst["Friday_Enable"] == "1" &&
        $inst["Saturday_Enable"] == "1") {
        $week = "Every Day";
    }
    else {
        if ($inst["Sunday_Enable"] == "1") {
            $week = "$week Sunday";
        }
        if ($inst["Monday_Enable"] == "1") {
            $week = "$week Monday";
        }
        if ($inst["Tuesday_Enable"] == "1") {
            $week = "$week Tuesday";
        }
        if ($inst["Wednesday_Enable"] == "1") {
            $week = "$week Wednesday";
        }
        if ($inst["Thursday_Enable"] == "1") {
            $week = "$week Thursday";
        }
        if ($inst["Friday_Enable"] == "1") {
            $week = "$week Friday";
        }
        if ($inst["Saturday_Enable"] == "1") {
            $week = "$week Saturday";
        }
    }
    
    return $week;
}
?>