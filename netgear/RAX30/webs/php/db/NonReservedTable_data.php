<?
  include '../reservedClient.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getNonReservedClientTable();

    echo json_encode($data);
?>
