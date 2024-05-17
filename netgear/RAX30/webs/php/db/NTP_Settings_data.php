<?
  include '../blocksiteSchedule.php';
  if (!isset($data))
    $data = new stdClass();

  $NtpStatus = getTextVal_ntpResult();

  $data->timeZone = (object) null;
  $data->timeZone->value = getSelectVal_timeZone();
  $data->timeZone->type = 'select';

  $data->autoDaylightSaving = (object) null;
  $data->autoDaylightSaving->value = getCheckboxVal_autoDaylightSaving();
  $data->autoDaylightSaving->type = 'checkbox';

  $data->preferNtpServer = (object) null;
  $data->preferNtpServer->value = getCheckboxVal_preferNtpServer();
  $data->preferNtpServer->type = 'radio';

  $data->ntpServer = (object) null;
  $data->ntpServer->value = getTextVal_ntpServer();
  $data->ntpServer->type = 'input';

  $data->currentTime = (object) null;
  $data->currentTime->value = getTextVal_currentTime();
  $data->currentTime->type = 'spantext';
  
  if ($NtpStatus != "Synchronized"){
    $data->NtpServerStatus = (object) null;
    $data->NtpServerStatus->value = '' ;
    $data->NtpServerStatus->type = 'spantext' ;
    $data->NtpServerStatus->mlang = "PCVP_044" ;
  }

  echo json_encode($data);
?>
