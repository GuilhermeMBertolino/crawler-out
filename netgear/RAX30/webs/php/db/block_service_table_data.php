<?
  include '../blockServices.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getBlockServicesTableValue();

    echo json_encode($data);
?>
