<?
  include '../ipv6.php';
  if (!isset($data))
    $data = new stdClass();

  $data->v6Type = (object) null;
  $data->v6Type->value = getSelectVal_v6Type();
  $data->v6Type->type = 'select';

 
  echo json_encode($data);
?>
