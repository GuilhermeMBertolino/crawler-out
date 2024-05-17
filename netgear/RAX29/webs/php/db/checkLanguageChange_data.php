<?
  include '../language.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->changeLangResult = (object) null;
  $data->changeLangResult->value = getChangeLanguageResult();

  echo json_encode($data);
?>
