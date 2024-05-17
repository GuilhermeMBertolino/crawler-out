<?
  include '../commonCfg.php';

  if (!isset($data))
  $data = new stdClass();

  $data->ipConflict = (object) null;
  $data->ipConflict->value = removeWanLanConflictFile();

  echo json_encode($data);
?>
