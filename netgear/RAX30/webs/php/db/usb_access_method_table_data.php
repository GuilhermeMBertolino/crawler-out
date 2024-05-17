<?
  include '../usb.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAccessMethodTable();

    echo json_encode($data);
?>
