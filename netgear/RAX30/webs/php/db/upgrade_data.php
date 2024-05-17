<?
  include '../commonCfg.php';
  if (!isset($data)) 
    $data = new stdClass();

    $data->autoUpdate = (object) null;
    $data->autoUpdate->value = getFwAutoUpdateEnable();
    $data->autoUpdate->type = "radio";

    echo json_encode($data);
?>
