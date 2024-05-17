<?
  include '../commonCfg.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->defaultState = (object) null;
  $data->defaultState->value = getDefaultState();

  $data->nightHawkAppSkip = (object) null;
  $data->nightHawkAppSkip->value = getWizardNightHawkAppDisable();
  echo json_encode($data);
?>
