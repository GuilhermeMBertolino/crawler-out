<?
  include '../reservedClient.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getReservedTable();

    echo json_encode($data);
?>
