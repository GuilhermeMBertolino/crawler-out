<?
  include '../wifiSchedule.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = get2GWifiScheduleTable();

    echo json_encode($data);
?>
