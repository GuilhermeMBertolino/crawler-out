<?
  include '../portForward.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getPortForwardTable();

    echo json_encode($data);
?>
