<?
  include '../wanSetup.php';
  include_once '../interface.php';
  
  if (!isset($data))
    $data = new stdClass();

  $data->disableProtection = (object) null;
  $data->disableProtection->value = getCheckboxVal_disableProtection();
  $data->disableProtection->type = 'checkbox';
  
  $data->enableProtection = (object) null;
  $data->enableProtection->value = getInputVal_enableProtection();
  $data->enableProtection->type = 'input';

  $data->enableDmz = (object) null;
  $data->enableDmz->value = getCheckboxVal_enableDmz();
  $data->enableDmz->type = 'checkbox';

  $data->dmzServer = (object) null;
  $data->dmzServer->value = getIpVal_dmzServer();
  $data->dmzServer->type = 'ip';
  $data->dmzServer->idStr_prefix = 'dmz_ipaddress';

  $data->responsePing = (object) null;
  $data->responsePing->value = getCheckboxVal_responsePing();
  $data->responsePing->type = 'checkbox';
  
  $data->disableIgmpProxy = (object) null;
  $data->disableIgmpProxy->value = getCheckboxVal_disableIgmpProxy();
  $data->disableIgmpProxy->type = 'checkbox';

  $data->enableIgmpProxy = (object) null;
  $data->enableIgmpProxy->value = getInputVal_enableIgmpProxy();
  $data->enableIgmpProxy->type = 'input';

  $data->btIgmpProxy = (object) null;
  $data->btIgmpProxy->value = getInputVal_btIgmpProxy();
  $data->btIgmpProxy->type = 'checkbox';

  $data->mtuSize = (object) null;
  $data->mtuSize->value = getInputVal_mtuSize();
  $data->mtuSize->type = 'input';

  $data->natFilter = (object) null;
  $data->natFilter->value = getRadioVal_natFilter();
  $data->natFilter->type = 'radio';

  $data->disableSipAlg = (object) null;
  $data->disableSipAlg->value = getCheckboxVal_disableSipAlg();
  $data->disableSipAlg->type = 'checkbox';

  $data->enableSipAlg = (object) null;
  $data->enableSipAlg->value = getInputVal_enableSipAlg();
  $data->enableSipAlg->type = 'input';

  $data->wanInfName = (object) null;
  $data->wanInfName->value = get_WanInfName();
  $data->wanInfName->type = 'nopost';

  $data->lanIP = (object) null;
  $data->lanIP->value = getLanInstanceIpAddr();
  
  $data->lanMask = (object) null;
  $data->lanMask->value = getLanInstanceIpMask();
  
  echo json_encode($data);
?>
