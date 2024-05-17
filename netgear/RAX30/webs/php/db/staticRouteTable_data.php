<?
  include '../staticRoute.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getStaticRouteTable();

    echo json_encode($data);
?>
