<?
  include '../attachedDev.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getQosAppDevValue();

    echo json_encode($data);
?>
