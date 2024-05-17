<?
  include '../wifi.php';
  if (!isset($data))
    $data = new stdClass();

  $data->country = (object) null;
  $data->country->value = getSelectVal_Country();
  $data->country->type = 'select';
  
  $data->enableAX = (object) null;
  $data->enableAX->value = getCheckboxVal_AxEnable();
  $data->enableAX->type = 'checkbox';
  
  $data->{'2GOfdma'} = (object) null;
  $data->{'2GOfdma'}->value = getCheckboxVal_2GOfdma();
  $data->{'2GOfdma'}->type = 'checkbox';
  
  $data->{'5GOfdma'} = (object) null;
  $data->{'5GOfdma'}->value = getCheckboxVal_5GOfdma();
  $data->{'5GOfdma'}->type = 'checkbox';
  
  $data->smartConnect = (object) null;
  $data->smartConnect->value = getCheckboxVal_smartConnect();
  $data->smartConnect->type = 'checkbox';

  $data->{'2GSsidBroadcast'} = (object) null;
  $data->{'2GSsidBroadcast'}->value = getCheckboxVal_2gSsidBroadcast();
  $data->{'2GSsidBroadcast'}->type = 'checkbox';

  $data->{'2GCoex'} = (object) null;
  $data->{'2GCoex'}->value = getCheckboxVal_2GCoex();
  $data->{'2GCoex'}->type = 'checkbox';

  $data->{'2GSsid'} = (object) null;
  $data->{'2GSsid'}->value = getTextVal_2gSsid();
  $data->{'2GSsid'}->type = 'input';

  $data->{'2GChannel'} = (object) null;
  $data->{'2GChannel'}->value = getSelectVal_2gChannel();
  $data->{'2GChannel'}->type = 'select';

  $data->{'2GMode'} = (object) null;
  $data->{'2GMode'}->value = getSelectVal_2gMode();
  $data->{'2GMode'}->type = 'select';

  $data->{'2GSecurity'} = (object) null;
  $data->{'2GSecurity'}->value = getRadioVal_2gSecurity();
  $data->{'2GSecurity'}->type = 'radio';

  $data->{'2GPassword'} = (object) null;
  $data->{'2GPassword'}->value = getTextVal_2gPasswd();
  $data->{'2GPassword'}->type = 'input';

  $data->{'2GEncryptMode'} = (object) null;
  $data->{'2GEncryptMode'}->value = getSelectVal_2gEncryptMode();
  $data->{'2GEncryptMode'}->type = 'select';

  $data->{'2GGroupKeyInt'} = (object) null;
  $data->{'2GGroupKeyInt'}->value = getTextVal_2gGroupKey();
  //$data->{'2GGroupKeyInt'}->type = 'radio';

  $data->{'2GRadiusIP'} = (object) null;
  $data->{'2GRadiusIP'}->value = getIpVal_2gRadiusIP();
  $data->{'2GRadiusIP'}->type = 'ip';
  $data->{'2GRadiusIP'}->idStr_prefix = 'radius_ipaddress';

  $data->{'2GRadiusPort'} = (object) null;
  $data->{'2GRadiusPort'}->value = getTextVal_2gRadiusPort();
  $data->{'2GRadiusPort'}->type = 'input';

  $data->{'2GRadiusSecret'} = (object) null;
  $data->{'2GRadiusSecret'}->value = getTextVal_2gRadiusSecret();
  $data->{'2GRadiusSecret'}->type = 'input';

  $data->{'5GSsidBroadcast'} = (object) null;
  $data->{'5GSsidBroadcast'}->value = getCheckboxVal_5gSsidBroadcast();
  $data->{'5GSsidBroadcast'}->type = 'checkbox';

  $data->{'5GSsid'} = (object) null;
  $data->{'5GSsid'}->value = getTextVal_5gSsid();
  $data->{'5GSsid'}->type = 'input';

  $data->{'5GChannel'} = (object) null;
  $data->{'5GChannel'}->value = getSelectVal_5gChannel();
  $data->{'5GChannel'}->type = 'select';

  $data->{'5GMode'} = (object) null;
  $data->{'5GMode'}->value = getSelectVal_5gMode();
  $data->{'5GMode'}->type = 'select';

  $data->{'5GSecurity'} = (object) null;
  $data->{'5GSecurity'}->value = getRadioVal_5gSecurity();
  $data->{'5GSecurity'}->type = 'radio';

  $data->{'5GPassword'} = (object) null;
  $data->{'5GPassword'}->value = getTextVal_5gPasswd();
  $data->{'5GPassword'}->type = 'input';

  $data->{'5GEncryptMode'} = (object) null;
  $data->{'5GEncryptMode'}->value = getSelectVal_5gEncryptMode();
  $data->{'5GEncryptMode'}->type = 'select';

  $data->{'5GGroupKeyInt'} = (object) null;
  $data->{'5GGroupKeyInt'}->value = getTextVal_5gGroupKey();
  //$data->{'5GGroupKeyInt'}->type = 'radio';

  $data->{'5GRadiusIP'} = (object) null;
  $data->{'5GRadiusIP'}->value = getIpVal_5gRadiusIP();
  $data->{'5GRadiusIP'}->type = 'ip';
  $data->{'5GRadiusIP'}->idStr_prefix = 'radius_ipaddress';
  $data->{'5GRadiusIP'}->idStr_postfix = '_an';

  $data->{'5GRadiusPort'} = (object) null;
  $data->{'5GRadiusPort'}->value = getTextVal_5gRadiusPort();
  $data->{'5GRadiusPort'}->type = 'input';

  $data->{'5GRadiusSecret'} = (object) null;
  $data->{'5GRadiusSecret'}->value = getTextVal_5gRadiusSecret();
  $data->{'5GRadiusSecret'}->type = 'input';
/*
  $data->{'5G1SsidBroadcast'} = (object) null;
  $data->{'5G1SsidBroadcast'}->value = getCheckboxVal_5g1SsidBroadcast();
  $data->{'5G1SsidBroadcast'}->type = 'checkbox';
  
  $data->{'5G1Ssid'} = (object) null;
  $data->{'5G1Ssid'}->value = getTextVal_5g1Ssid();
  $data->{'5G1Ssid'}->type = 'input';

  $data->{'5G1Channel'} = (object) null;
  $data->{'5G1Channel'}->value = getSelectVal_5g1Channel();
  $data->{'5G1Channel'}->type = 'select';

  $data->{'5G1Mode'} = (object) null;
  $data->{'5G1Mode'}->value = getSelectVal_5g1Mode();
  $data->{'5G1Mode'}->type = 'select';

  $data->{'5G1TxPower'} = (object) null;
  $data->{'5G1TxPower'}->value = getSelectVal_5g1TxPower();
  $data->{'5G1TxPower'}->type = 'select';

  $data->{'5G1Security'} = (object) null;
  $data->{'5G1Security'}->value = getRadioVal_5g1Security();
  $data->{'5G1Security'}->type = 'radio';

  $data->{'5G1Password'} = (object) null;
  $data->{'5G1Password'}->value = getTextVal_5g1Passwd();
  $data->{'5G1Password'}->type = 'input';

  $data->{'5G1EncryptMode'} = (object) null;
  $data->{'5G1EncryptMode'}->value = getSelectVal_5g1EncryptMode();
  $data->{'5G1EncryptMode'}->type = 'select';

  $data->{'5G1GroupKeyInt'} = (object) null;
  $data->{'5G1GroupKeyInt'}->value = '3600';
  //$data->{'5G1GroupKeyInt'}->type = 'radio';

  $data->{'5G1RadiusIP'} = (object) null;
  $data->{'5G1RadiusIP'}->value = getIpVal_5g1RadiusIP();
  $data->{'5G1RadiusIP'}->type = 'ip';

  $data->{'5G1RadiusPort'} = (object) null;
  $data->{'5G1RadiusPort'}->value = getTextVal_5g1RadiusPort();
  $data->{'5G1RadiusPort'}->type = 'input';

  $data->{'5G1RadiusSecret'} = (object) null;
  $data->{'5G1RadiusSecret'}->value = getTextVal_5g1RadiusSecret();
  $data->{'5G1RadiusSecret'}->type = 'input';
*/
  
  $data->{'5GBandwidth'} = (object) null;
  $data->{'5GBandwidth'}->value = db_get("Device.WiFi.Radio.{$radio_5g}.OperatingChannelBandwidth");
  $data->{'5GBandwidth'}->type = 'nopost';
/*
  $data->{'5G1Bandwidth'} = (object) null;
  $data->{'5G1Bandwidth'}->value = db_get("Device.WiFi.Radio.{$radio_5g1}.OperatingChannelBandwidth");
  $data->{'5G1Bandwidth'}->type = 'nopost';
*/
  $data->{'2GGuestSsid'} = (object) null;
  $data->{'2GGuestSsid'}->value = getTextVal_2gGuestSsid();
  
  $data->{'5GGuestSsid'} = (object) null;
  $data->{'5GGuestSsid'}->value = getTextVal_5gGuestSsid();
  
  $data->{'2GRadioOn'} = (object) null;
  $data->{'2GRadioOn'}->value = getCheckboxVal_2GRadioOn();
  
  $data->{'5GRadioOn'} = (object) null;
  $data->{'5GRadioOn'}->value = getCheckboxVal_5GRadioOn();

  $data->{'sku'} = (object) null;
  $data->{'sku'}->value = getSku();

  $data->{'regionNo'} = (object) null;
  $data->{'regionNo'}->value = getRegionNo();

  $data->{'enableAX256QAM'} = (object) null;
  $data->{'enableAX256QAM'}->value = getEnableAX256QAM();

  echo json_encode($data);
?>
