<?
  include '../accessControl.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAccessContorlBlackValue2();

    echo json_encode($data);
?>
