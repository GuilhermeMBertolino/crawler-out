<?
  include '../wifiSchedule.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = get6GWifiScheduleTable();

    echo json_encode($data);
?>
