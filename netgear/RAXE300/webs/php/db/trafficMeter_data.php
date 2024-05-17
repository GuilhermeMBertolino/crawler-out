<?
  include '../trafficMeter.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enable = (object) null;
  $data->enable->value = getCheckboxVal_enable();
  $data->enable->type = 'checkbox';
  
  $data->tm_type = (object) null;
  $data->tm_type->value = getRadioVal_tm_type();
  $data->tm_type->type = 'radio';
  
  $data->volControlType = (object) null;
  $data->volControlType->value = getSelectVal_volControlType();
  $data->volControlType->type = 'select';
  
  $data->volMonthlyLimit = (object) null;
  $data->volMonthlyLimit->value = getTextVal_volMonthlyLimit();
  $data->volMonthlyLimit->type = 'input';
  
  $data->volRoundUp = (object) null;
  $data->volRoundUp->value = getTextVal_volRoundUp();
  $data->volRoundUp->type = 'input';
  
  $data->timeControlLimit = (object) null;
  $data->timeControlLimit->value = getTextVal_timeControlLimit();
  $data->timeControlLimit->type = 'input';
  
  $data->counterHour = (object) null;
  $data->counterHour->value = getTextVal_counterHour();
  $data->counterHour->type = 'input';
  
  $data->counterMin = (object) null;
  $data->counterMin->value = getTextVal_counterMin();
  $data->counterMin->type = 'input';

  $data->amPmSel = (object) null;
  $data->amPmSel->value = getSelectVal_amPmSel();
  $data->amPmSel->type = 'select';
  
  $data->counterDay = (object) null;
  $data->counterDay->value = getSelectVal_counterDay();
  $data->counterDay->type = 'select';
  
  $data->popMessage = (object) null;
  $data->popMessage->value = getTextVal_popMessage();
  $data->popMessage->type = 'input';
  
  $data->turnLed = (object) null;
  $data->turnLed->value = getCheckboxVal_turnLed();
  $data->turnLed->type = 'checkbox';
  
  $data->disableInternet = (object) null;
  $data->disableInternet->value = getCheckboxVal_disableInternet();
  $data->disableInternet->type = 'checkbox';
  
  $data->start_time = (object) null;
  $data->start_time->value = getSpanVal_start_time();
  $data->start_time->type = 'spantext';
  
  $data->current_time = (object) null;
  $data->current_time->value = getSpanVal_current_time();
  $data->current_time->type = 'spantext';
  
  $data->left_traffic = (object) null;
  $data->left_traffic->value = getSpanVal_left_traffic();
  $data->left_traffic->type = 'spantext';
  
  $data->today_connect_time = (object) null;
  $data->today_connect_time->value = getSpanVal_today_connect_time();
  $data->today_connect_time->type = 'spantext';
  
  $data->today_upload = (object) null;
  $data->today_upload->value = getSpanVal_today_upload();
  $data->today_upload->type = 'spantext';
  
  $data->today_download = (object) null;
  $data->today_download->value = getSpanVal_today_download();
  $data->today_download->type = 'spantext';
  
  $data->today_total = (object) null;
  $data->today_total->value = getSpanVal_today_total();
  $data->today_total->type = 'spantext';
  
  $data->yesterday_connect_time = (object) null;
  $data->yesterday_connect_time->value = getSpanVal_yesterday_connect_time();
  $data->yesterday_connect_time->type = 'spantext';
  
  $data->yesterday_upload = (object) null;
  $data->yesterday_upload->value = getSpanVal_yesterday_upload();
  $data->yesterday_upload->type = 'spantext';
  
  $data->yesterday_download = (object) null;
  $data->yesterday_download->value = getSpanVal_yesterday_download();
  $data->yesterday_download->type = 'spantext';
  
  $data->yesterday_total = (object) null;
  $data->yesterday_total->value = getSpanVal_yesterday_total();
  $data->yesterday_total->type = 'spantext';
  
  $data->thisweek_connect_time = (object) null;
  $data->thisweek_connect_time->value = getSpanVal_thisweek_connect_time();
  $data->thisweek_connect_time->type = 'spantext';
  
  $data->thisweek_upload = (object) null;
  $data->thisweek_upload->value = getSpanVal_thisweek_upload();
  $data->thisweek_upload->type = 'spantext';
  
  $data->thisweek_download = (object) null;
  $data->thisweek_download->value = getSpanVal_thisweek_download();
  $data->thisweek_download->type = 'spantext';
  
  $data->thisweek_total = (object) null;
  $data->thisweek_total->value = getSpanVal_thisweek_total();
  $data->thisweek_total->type = 'spantext';
  
  $data->thismonth_connect_time = (object) null;
  $data->thismonth_connect_time->value = getSpanVal_thismonth_connect_time();
  $data->thismonth_connect_time->type = 'spantext';
  
  $data->thismonth_upload = (object) null;
  $data->thismonth_upload->value = getSpanVal_thismonth_upload();
  $data->thismonth_upload->type = 'spantext';
  
  $data->thismonth_download = (object) null;
  $data->thismonth_download->value = getSpanVal_thismonth_download();
  $data->thismonth_download->type = 'spantext';
  
  $data->thismonth_total = (object) null;
  $data->thismonth_total->value = getSpanVal_thismonth_total();
  $data->thismonth_total->type = 'spantext';
  
  $data->lastmonth_connect_time = (object) null;
  $data->lastmonth_connect_time->value = getSpanVal_lastmonth_connect_time();
  $data->lastmonth_connect_time->type = 'spantext';
  
  $data->lastmonth_upload = (object) null;
  $data->lastmonth_upload->value = getSpanVal_lastmonth_upload();
  $data->lastmonth_upload->type = 'spantext';
  
  $data->lastmonth_download = (object) null;
  $data->lastmonth_download->value = getSpanVal_lastmonth_download();
  $data->lastmonth_download->type = 'spantext';
  
  $data->lastmonth_total = (object) null;
  $data->lastmonth_total->value = getSpanVal_lastmonth_total();
  $data->lastmonth_total->type = 'spantext';
  
  $data->wanMode = (object) null;
  $data->wanMode->value = get_wanMode();
  
  echo json_encode($data);
?>
