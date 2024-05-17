<?
  include '../trafficMeter.php';
  if (!isset($data))
    $data = new stdClass();

  
  $data->monthlyLimit = (object) null;
  $data->monthlyLimit->value = getSpanVal_monthlyLimit();
  
  $data->limitUnit = (object) null;
  $data->limitUnit->value = getMlangVal_limitUnit();
  
  $data->current_time = (object) null;
  $data->current_time->value = getSpanVal_current_time();

  $data->limit_reached_time = (object) null;
  $data->limit_reached_time->value = db_get("Device.X_PEGATTRON_COM_TrafficMeter.Statistics.messageLimitedTime");
  
  echo json_encode($data);
?>
