<?
  include '../attachedDev.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getVpnDevValue();

    echo json_encode($data);
?>
