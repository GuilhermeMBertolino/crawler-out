<?
  include '../ddns.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableDdns = (object) null;
  $data->enableDdns->value = getCheckboxVal_enableDdns();
  $data->enableDdns->type = 'checkbox';

  $data->ddnsService = (object) null;
  $data->ddnsService->value = getSelectVal_ddnsService();
  $data->ddnsService->type = 'select';
  
  $data->haveNetgearAccount = (object) null;
  $data->haveNetgearAccount->value = getRadioVal_haveNetgearAccount();
  $data->haveNetgearAccount->type = 'radio';
  
  $data->hostName = (object) null;
  $data->hostName->value = getTextVal_hostName();
  $data->hostName->type = 'input';
  
  $data->email = (object) null;
  $data->email->value = getTextVal_email();
  $data->email->type = 'input';
  
  $data->username = (object) null;
  $data->username->value = getTextVal_username();
  $data->username->type = 'input';
  
  $data->password = (object) null;
  $data->password->value = getTextVal_password();
  $data->password->type = 'input';

  $data->wildCards = (object) null;
  $data->wildCards->value = getCheckboxVal_wildCards();
  $data->wildCards->type = "checkbox";

  $data->runningHostName = (object) null;
  $data->runningHostName->value = getTextVal_hostName().".mynetgear.com";
  $data->runningHostName->type = 'spantext';
  
  $data->runningEmail = (object) null;
  $data->runningEmail->value = getTextVal_email();
  $data->runningEmail->type = 'spantext';
  
  $data->ddnsStatus = (object) null;
  $data->ddnsStatus->value = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.Status");

  $data->runningProvider = (object) null;
  $data->runningProvider->value = getSelectVal_ddnsService();
  
  $data->msgNetgearUpdateFail = (object) null;
  $data->msgNetgearUpdateFail->value = '';
  $data->msgNetgearUpdateFail->type = 'spantext';
  $data->msgNetgearUpdateFail->mlang = getMlangVal_msgNetgearUpdateFail();
  
  $data->msgNetgearUpdateFail_continue = (object) null;
  $data->msgNetgearUpdateFail_continue->value = '';
  $data->msgNetgearUpdateFail_continue->type = 'spantext';
  $data->msgNetgearUpdateFail_continue->mlang = getMlangVal_msgNetgearUpdateFail_continue();
  
  $data->msgNetgearUpdateFail_continue2 = (object) null;
  $data->msgNetgearUpdateFail_continue2->value = '';
  $data->msgNetgearUpdateFail_continue2->type = 'spantext';
  $data->msgNetgearUpdateFail_continue2->mlang = getMlangVal_msgNetgearUpdateFail_continue2();
  
  
  echo json_encode($data);
?>
