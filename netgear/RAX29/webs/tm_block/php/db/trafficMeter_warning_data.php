<?
  include '../trafficMeter.php';
  if (!isset($data))
    $data = new stdClass();

  
  $data->monthlyWarning = (object) null;
  $data->monthlyWarning->value = getTextVal_popMessage();
  
  $data->limitUnit = (object) null;
  $data->limitUnit->value = getMlangVal_limitUnit();
  
  $data->current_time = (object) null;
  $data->current_time->value = getSpanVal_current_time();
  
  $data->limitReachStatus = (object) null;
  $data->limitReachStatus->value = getTextVal_limitReachStatus();

  $data->warning_reached_time = (object) null;
  $data->warning_reached_time->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.messageWarningTime");
  
  echo json_encode($data);
?>
