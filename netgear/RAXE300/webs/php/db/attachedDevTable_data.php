<?
  include '../attachedDev.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAttachDevValue();

    echo json_encode($data);
?>
