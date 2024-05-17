<?
  include '../accessControl.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getAccessContorlWhiteValue2();

    echo json_encode($data);
?>
