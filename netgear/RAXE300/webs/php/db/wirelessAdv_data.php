<?
  include '../wifi.php';
  if (!isset($data))
    $data = new stdClass();

  $data->{'2GRadioOn'} = (object) null;
  $data->{'2GRadioOn'}->value = getCheckboxVal_2GRadioOn();
  $data->{'2GRadioOn'}->type = 'checkbox';

  $data->{'2GCtsRts'} = (object) null;
  $data->{'2GCtsRts'}->value = getTextVal_2GCtsRts();
  $data->{'2GCtsRts'}->type = 'input';

  $data->{'2GPreamble'} = (object) null;
  $data->{'2GPreamble'}->value = getSelectVal_2GPreamble();
  $data->{'2GPreamble'}->type = 'select';

  $data->{'2GTxPower'} = (object) null;
  $data->{'2GTxPower'}->value = getSelectVal_2gTxPower();
  $data->{'2GTxPower'}->type = 'select';

  $data->{'2GWifiSchedule'} = (object) null;
  $data->{'2GWifiSchedule'}->value = getCheckboxVal_2GWifiSchedule();
  $data->{'2GWifiSchedule'}->type = 'checkbox';

  $data->{'5GRadioOn'} = (object) null;
  $data->{'5GRadioOn'}->value = getCheckboxVal_5GRadioOn();
  $data->{'5GRadioOn'}->type = 'checkbox';
  
  $data->{'5GCtsRts'} = (object) null;
  $data->{'5GCtsRts'}->value = getTextVal_5GCtsRts();
  $data->{'5GCtsRts'}->type = 'input';

  $data->{'5GPreamble'} = (object) null;
  $data->{'5GPreamble'}->value = getSelectVal_5GPreamble();
  $data->{'5GPreamble'}->type = 'select';

  $data->{'5GTxPower'} = (object) null;
  $data->{'5GTxPower'}->value = getSelectVal_5gTxPower();
  $data->{'5GTxPower'}->type = 'select';

  $data->{'5GWifiSchedule'} = (object) null;
  $data->{'5GWifiSchedule'}->value = getCheckboxVal_5GWifiSchedule();
  $data->{'5GWifiSchedule'}->type = 'checkbox';
/*  
  $data->{'5G1RadioOn'} = (object) null;
  $data->{'5G1RadioOn'}->value = getCheckboxVal_5G1RadioOn();
  $data->{'5G1RadioOn'}->type = 'checkbox';
  
  $data->{'5G1Preamble'} = (object) null;
  $data->{'5G1Preamble'}->value = getSelectVal_5G1Preamble();
  $data->{'5G1Preamble'}->type = 'select';

  $data->{'5G1WifiSchedule'} = (object) null;
  $data->{'5G1WifiSchedule'}->value = getCheckboxVal_5G1WifiSchedule();
  $data->{'5G1WifiSchedule'}->type = 'checkbox';
*/

  $data->{'6GRadioOn'} = (object) null;
  $data->{'6GRadioOn'}->value = getCheckboxVal_6GRadioOn();
  $data->{'6GRadioOn'}->type = 'checkbox';
  
  $data->{'6GCtsRts'} = (object) null;
  $data->{'6GCtsRts'}->value = getTextVal_6GCtsRts();
  $data->{'6GCtsRts'}->type = 'input';

  $data->{'6GPreamble'} = (object) null;
  $data->{'6GPreamble'}->value = getSelectVal_6GPreamble();
  $data->{'6GPreamble'}->type = 'select';

  $data->{'6GTxPower'} = (object) null;
  $data->{'6GTxPower'}->value = getSelectVal_6gTxPower();
  $data->{'6GTxPower'}->type = 'select';

  $data->{'6GWifiSchedule'} = (object) null;
  $data->{'6GWifiSchedule'}->value = getCheckboxVal_6GWifiSchedule();
  $data->{'6GWifiSchedule'}->type = 'checkbox';

  $data->{'wpsPinEnabled'} = (object) null;
  $data->{'wpsPinEnabled'}->value = getCheckboxVal_wpsPinEnabled();
  $data->{'wpsPinEnabled'}->type = 'checkbox';
  
  $data->{'wpsAutoDisablePin'} = (object) null;
  $data->{'wpsAutoDisablePin'}->value = getCheckboxVal_wpsAutoDisablePin();
  $data->{'wpsAutoDisablePin'}->type = 'checkbox';
  
  $data->{'wpsNumOfFailedPin'} = (object) null;
  $data->{'wpsNumOfFailedPin'}->value = getTextVal_wpsNumOfFailedPin();
  $data->{'wpsNumOfFailedPin'}->type = 'input';
  
  $data->{'wpsKeepSetting2G'} = (object) null;
  $data->{'wpsKeepSetting2G'}->value = getCheckboxVal_wpsKeepSetting2G();
  $data->{'wpsKeepSetting2G'}->type = 'checkbox';
  
  $data->{'wpsKeepSetting5G'} = (object) null;
  $data->{'wpsKeepSetting5G'}->value = getCheckboxVal_wpsKeepSetting5G();
  $data->{'wpsKeepSetting5G'}->type = 'checkbox';
  
  $data->{'wpsKeepSetting5G1'} = (object) null;
  $data->{'wpsKeepSetting5G1'}->value = getCheckboxVal_wpsKeepSetting5G1();
  $data->{'wpsKeepSetting5G1'}->type = 'checkbox';
  
  $data->{'enableBeamforming'} = (object) null;
  $data->{'enableBeamforming'}->value = getCheckboxVal_enableBeamforming();
  $data->{'enableBeamforming'}->type = 'checkbox';
  
  $data->{'enableMuMimo'} = (object) null;
  $data->{'enableMuMimo'}->value = getCheckboxVal_enableMuMimo();
  $data->{'enableMuMimo'}->type = 'checkbox';
  
  $data->{'disablePMF'} = (object) null;
  $data->{'disablePMF'}->value = getCheckboxVal_disablePMF();
  $data->{'disablePMF'}->type = 'checkbox';

  $data->{'enable6GWpa3H2eOnly'} = (object) null;
  $data->{'enable6GWpa3H2eOnly'}->value = getCheckboxVal_enable6GWpa3H2eOnly();
  $data->{'enable6GWpa3H2eOnly'}->type = 'checkbox';

  $data->{'2GFragLength'} = (object) null;
  $data->{'2GFragLength'}->value = "2346";
  
  $data->{'5GFragLength'} = (object) null;
  $data->{'5GFragLength'}->value = "2346";
/*  
  $data->{'5G1FragLength'} = (object) null;
  $data->{'5G1FragLength'}->value = "2346";

  $data->{'5G1CtsRts'} = (object) null;
  $data->{'5G1CtsRts'}->value = "2347";
*/  

  $data->{'6GFragLength'} = (object) null;
  $data->{'6GFragLength'}->value = "2346";

  
  $data->{'enableAX'} = (object) null;
  $data->{'enableAX'}->value = "true";

  $data->{'wpsPin'} = (object) null;
  $data->{'wpsPin'}->value = db_get("Device.WiFi.X_BROADCOM_COM_WpsCfg.WpsDevicePin");
  $data->{'wpsPin'}->type = 'spantext';
  
  $data->{'WifiBtnEnable'} = (object) null;
  $data->{'WifiBtnEnable'}->value = db_get("Device.X_PEGATRON_COM_DeviceInfo.WifiBtnEnable");
  
  $data->smartConnectEnable = (object) null;
  $data->smartConnectEnable->value = getCheckboxVal_smartConnect();
  
  $data->{'2GSecurity'} = (object) null;
  $data->{'2GSecurity'}->value = getRadioVal_2gSecurity();
  
  $data->{'5GSecurity'} = (object) null;
  $data->{'5GSecurity'}->value = getRadioVal_5gSecurity();

  $data->{'6GSecurity'} = (object) null;
  $data->{'6GSecurity'}->value = getRadioVal_6gSecurity();
  
  echo json_encode($data);
?>
