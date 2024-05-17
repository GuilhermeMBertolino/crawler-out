<?
function getCheckboxVal_enable()
{   
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.traffic_on");
}

//tm = traffic meter
function getRadioVal_tm_type()
{
    $volume_contrl = db_get("Device.X_PEGATTRON_COM_TrafficMeter.volcontrl");
    $time_control = db_get("Device.X_PEGATTRON_COM_TrafficMeter.timecontrl");
    
    if ($volume_contrl == "true" && $time_control == "false") {
        return "volControl";
    }
    else if ($volume_contrl == "false" && $time_control == "true") {
        return "timeControl";
    }
}

function getSelectVal_volControlType()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.contrl_type");
    //"No limit"/"Download only"/"Both directions"
    
    //$contrl_type = db_get("Device.X_PEGATTRON_COM_TrafficMeter.contrl_type");
    
    //if ($contrl_type == "No limit") {
    //    return "1";
    //}
    //else if ($contrl_type == "Download only") {
    //    return "2";
    //}
    //else if ($contrl_type == "Both directions") {
    //    return "3";
    //}
}

function getTextVal_volMonthlyLimit()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.volume_monthly_limit");
}

function getTextVal_volRoundUp()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.round_up_volume");
}

function getTextVal_timeControlLimit()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.conntime_monthly_limit");
}

function getTextVal_counterHour()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.hour");
    //return "01";
}

function getTextVal_counterMin()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.min");
    //return "00";
}

function getSelectVal_amPmSel()
{
    // true:PM false:AM
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.ampm_sel");
}

function getSelectVal_counterDay()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.day");
}

function getTextVal_popMessage()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.waterMark");
}

function getCheckboxVal_turnLed()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.led_on");
}

function getCheckboxVal_disableInternet()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.block_on");
}

function getSpanVal_start_time()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.start_data_time");
}

function getSpanVal_current_time()
{
    //return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.current_data_time");
    //db value is not update instantly, so use date command directly
    return shell_exec("date +%c");
}

function getSpanVal_left_traffic()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.volume_left");
}

function getSpanVal_today_connect_time()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.today_conntime");
}

function getSpanVal_today_upload()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.today_upload");
}

function getSpanVal_today_download()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.today_download");
}

function getSpanVal_today_total()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.today_total");
}

function getSpanVal_yesterday_connect_time()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.yesterday_conntime");
}

function getSpanVal_yesterday_upload()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.yesterday_upload");
}

function getSpanVal_yesterday_download()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.yesterday_download");
}

function getSpanVal_yesterday_total()
{
	return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.yesterday_total");
}


function getSpanVal_thisweek_connect_time()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_conntime");
}

function getSpanVal_thisweek_upload()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_upload").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_uploadavg");
}

function getSpanVal_thisweek_download()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_download").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_downloadavg");
}

function getSpanVal_thisweek_total()
{
    return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_total").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thisweek_totalavg");
}



function getSpanVal_thismonth_connect_time()
{
	return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_conntime");
}

function getSpanVal_thismonth_upload()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_upload").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_uploadavg");
}

function getSpanVal_thismonth_download()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_download").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_downloadavg");
}

function getSpanVal_thismonth_total()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_total").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.thismonth_totalavg");
}


function getSpanVal_lastmonth_connect_time()
{
	return db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_conntime");
}

function getSpanVal_lastmonth_upload()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_upload").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_uploadavg");
}

function getSpanVal_lastmonth_download()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_download").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_downloadavg");
}

function getSpanVal_lastmonth_total()
{
	return  db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_total").'/'.db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.lastmonth_totalavg");
}

function get_wanMode()
{
    return db_get("Device.IP.X_PEGATRON_COM_IPv4Mode");
}

function getSpanVal_monthlyLimit()
{
    $tm_type = getRadioVal_tm_type();
    
    if ($tm_type == "volControl") {
        return db_get("Device.X_PEGATTRON_COM_TrafficMeter.volume_monthly_limit");
    }
    else if ($tm_type = "timeControl") {
        return db_get("Device.X_PEGATTRON_COM_TrafficMeter.conntime_monthly_limit");
    }
}

function getMlangVal_limitUnit()
{
    $tm_type = getRadioVal_tm_type();
    
    if ($tm_type == "volControl") {
        return "ATM044"; //Mbytes
    }
    else if ($tm_type = "timeControl") {
        return "ATM043";  //hours
    }
}

function getTextVal_limitReachStatus()
{
    $status = db_get("Device.X_PEGATTRON_COM_TrafficMeter.warterMarkStatus");
    
    if ($status == "1") {
        return "approach_limit";
    }
    else if($status == "3" || $status == "4") {
        return "reach_limit";
    }
    else {
        return "not_reach_limit";
    }
}
?>
