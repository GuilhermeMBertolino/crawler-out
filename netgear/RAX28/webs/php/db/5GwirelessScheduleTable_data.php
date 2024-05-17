<?
  include '../wifiSchedule.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = get5GWifiScheduleTable();

    echo json_encode($data);
?>
