<?
  include '../usb.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAvailableTable();

    echo json_encode($data);
?>
