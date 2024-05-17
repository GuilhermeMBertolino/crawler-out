<?
  include '../attachedDev.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getQosDevValue();

    echo json_encode($data);
?>
