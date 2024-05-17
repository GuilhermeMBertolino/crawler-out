<?
  include '../portForward.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getPortTriggerTable();

    echo json_encode($data);
?>
