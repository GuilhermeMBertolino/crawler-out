<?
  include '../wifiSchedule.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = get5G1WifiScheduleTable();

    echo json_encode($data);
?>
