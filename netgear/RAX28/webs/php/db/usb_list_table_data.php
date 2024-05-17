<?
  include '../usb.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getUsbListTable();

    echo json_encode($data);
?>
