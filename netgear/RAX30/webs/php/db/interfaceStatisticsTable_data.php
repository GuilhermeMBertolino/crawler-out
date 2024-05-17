<?
  include '../statistics.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getInterfaceStatistics();

    echo json_encode($data);
?>
