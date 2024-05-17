<?
  include '../interface.php';
  include '../wifi.php';
  include '../wizard.php';
  
  if (!isset($data)) 
  $data = new stdClass();

  $data->defaultState = (object) null;
  $data->defaultState->value = getDefaultState();

  $data->wanConnectionStatus = (object) null;
  $data->wanConnectionStatus->value = getWANPortStatus();

  $data->wl_ssid = (object) null;
  $data->wl_ssid->value = getTextVal_2gSsid();

  $data->ssid_2g = (object) null;
  $data->ssid_2g->value = getTextVal_2gSsid();
  $data->ssid_2g->type = "spantext";
  
  $data->wl_password = (object) null;
  $data->wl_password->value = getTextVal_2gPasswd();

  $data->wla_ssid = (object) null;
  $data->wla_ssid->value = getTextVal_5gSsid();

  $data->wla_password = (object) null;
  $data->wla_password->value = getTextVal_5gPasswd();

  
  $data->key_2g = (object) null;
  $data->key_2g->value = getTextVal_2gPasswd();
  $data->key_2g->type = "spantext";

  $data->ssid_5g = (object) null;
  $data->ssid_5g->value = getTextVal_5gSsid();
  $data->ssid_5g->type = "spantext";
  
  $data->key_5g = (object) null;
  $data->key_5g->value = getTextVal_5gPasswd();
  $data->key_5g->type = "spantext";

  $data->currentFwVer = (object) null;
  $data->currentFwVer->value = getFirmwareVer();
  $data->currentFwVer->type = "spantext";
  
  $data->wanMac = (object) null;
  $data->wanMac->value = getWANMacDefault();
  
  $data->clientMac = (object) null;
  $data->clientMac->value = getClientMac();

  $data->wizardRestoreConfigInProgress = (object) null;
  $data->wizardRestoreConfigInProgress->value = getWizardRestoreConfigInProgress();

  $data->wizardFwUpgradeInProgress = (object) null;
  $data->wizardFwUpgradeInProgress->value = getWizardFwUpgradeInProgress();
  
  $data->wizardWifiConfigured = (object) null;
  $data->wizardWifiConfigured->value = getWizardWifiConfigured();

  echo json_encode($data);
?>
