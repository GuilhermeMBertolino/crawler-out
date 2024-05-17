<?
  include '../ddnsStatus.php';
  if (!isset($data))
    $data = new stdClass();

  $data->ddnsStatus = (object) null;
  $data->ddnsStatus->value = '';
  $data->ddnsStatus->type = 'spantext';
  $data->ddnsStatus->mlang = getMlang_ddnsStatus(); 

  $data->ddnsService = (object) null;
  $data->ddnsService->value = getDdnsService();
  $data->ddnsService->type = 'input';

  $data->ddnsHostname = (object) null;
  $data->ddnsHostname->value = getDdnsHostname();
  $data->ddnsHostname->type = 'input';

  $data->ddnsUpdatedTimestamp = (object) null;
  $data->ddnsUpdatedTimestamp->value = getDdnsddnsUpdatedTimestamp();
  $data->ddnsUpdatedTimestamp->type = 'input';

  echo json_encode($data);
?>
