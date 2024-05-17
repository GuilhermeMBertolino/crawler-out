<?
  include '../rpe.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableProtectionEngine = (object) null;
  $data->enableProtectionEngine->value = getRpeEnable();
  $data->enableProtectionEngine->type = "checkbox";

  echo json_encode($data);
?>
