<?
  include_once '../wizard.php';
  include_once '../commonCfg.php';

  if (!isset($data)) 
  $data = new stdClass();

  $data->upgrade_finished = (object) null;
  $data->upgrade_finished->value = getWizardFwUpgradeInProgress();

  $data->new_csrf_token = (object) null;
  $data->new_csrf_token->value = genCsrfTokenFilePhp('tokenNumber');

  echo json_encode($data);
?>
