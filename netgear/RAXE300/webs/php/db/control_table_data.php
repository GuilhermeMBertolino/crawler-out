<?
  include '../accessControl.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAccessContorlTableValue();

    echo json_encode($data);
?>
