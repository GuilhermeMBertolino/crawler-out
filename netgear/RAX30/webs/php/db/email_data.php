<?
  include '../email.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableEmail = (object) null;
  $data->enableEmail->value = getCheckboxVal_enableEmail();
  $data->enableEmail->type = 'checkbox';

  $data->emailAddr1 = (object) null;
  $data->emailAddr1->value = getTextVal_emailAddr1();
  $data->emailAddr1->type = 'input';
  
  $data->emailAddr2 = (object) null;
  $data->emailAddr2->value = getTextVal_emailAddr2();
  $data->emailAddr2->type = 'input';
  
  $data->sender = (object) null;
  $data->sender->value = getTextVal_sender();
  $data->sender->type = 'input';
  
  $data->mailServer = (object) null;
  $data->mailServer->value = getTextVal_mailServer();
  $data->mailServer->type = 'input';
  
  $data->mailServerPort = (object) null;
  $data->mailServerPort->value = getTextVal_mailServerPort();
  $data->mailServerPort->type = 'input';
  
  $data->isServerAuth = (object) null;
  $data->isServerAuth->value = getCheckboxVal_isServerAuth();
  $data->isServerAuth->type = 'checkbox';
  
  $data->username = (object) null;
  $data->username->value = getTextVal_username();
  $data->username->type = 'input';
  
  $data->password = (object) null;
  $data->password->value = getTextVal_password();
  $data->password->type = 'input';
  
  $data->sendAlert = (object) null;
  $data->sendAlert->value = getCheckboxVal_sendAlert();
  $data->sendAlert->type = 'checkbox';
  
  $data->sendLogType = (object) null;
  $data->sendLogType->value = getSelectVal_sendLogType();
  $data->sendLogType->type = 'select';
  
  $data->day = (object) null;
  $data->day->value = getSelectVal_day();
  $data->day->type = 'select';
  
  $data->hour = (object) null;
  $data->hour->value = getSelectVal_hour();
  $data->hour->type = 'select';
  
  $data->am_pm = (object) null;
  $data->am_pm->value = getRadioVal_am_pm();
  $data->am_pm->type = 'radio';
  
  $data->enableEmail_pre = (object) null;
  $data->enableEmail_pre->value = getCheckboxVal_enableEmail();
  //$data->enableEmail_pre->type = 'checkbox';

  echo json_encode($data);
?>
