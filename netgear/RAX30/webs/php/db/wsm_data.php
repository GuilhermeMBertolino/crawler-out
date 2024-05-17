<?
  include '../wsm.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableWsm = (object) null;
  $data->enableWsm->value = getWsmEnable();
  $data->enableWsm->type = "checkbox";

  echo json_encode($data);
?>
