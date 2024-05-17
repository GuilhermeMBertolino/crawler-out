<?
  include '../trafficMeter.php';
  if (!isset($data))
    $data = new stdClass();

  $data->trafficMeterEnable = (object) null;
  $data->trafficMeterEnable->value = getCheckboxVal_enable();
  
  $data->thismonth_total = (object) null;
  $data->thismonth_total->value = getSpanVal_thismonth_total();
  
  $data->thismonth_download = (object) null;
  $data->thismonth_download->value = getSpanVal_thismonth_download();
  
  $data->volMonthlyLimit = (object) null;
  $data->volMonthlyLimit->value = getTextVal_volMonthlyLimit();
  
  $data->volControlType = (object) null;
  $data->volControlType->value = getSelectVal_volControlType();
  
  $data->passedDay = (object) null;
  $data->passedDay->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.runningPassedDay");
  
  $data->periodDay = (object) null;
  $data->periodDay->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.countingPeriodDay");
  
  $data->limitReachStatus = (object) null;
  $data->limitReachStatus->value = getTextVal_limitReachStatus();
  
  $data->tm_type = (object) null;
  $data->tm_type->value = getRadioVal_tm_type();

  $data->thismonth_HourUsed = (object) null;
  $data->thismonth_HourUsed->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.amountHourUsed");

  $data->thismonth_HourLimited = (object) null;
  $data->thismonth_HourLimited->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.amountHourimited");
  
  echo json_encode($data);
?>
