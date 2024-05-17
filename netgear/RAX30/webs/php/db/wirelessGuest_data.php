<?
  include '../wifi.php';
  if (!isset($data))
    $data = new stdClass();

  $data->{'2GEnableGuest'} = (object) null;
  $data->{'2GEnableGuest'}->value = getCheckboxVal_2gEnableGuest();
  $data->{'2GEnableGuest'}->type = 'checkbox';

  $data->{'2GSsidBroadcast'} = (object) null;
  $data->{'2GSsidBroadcast'}->value = getCheckboxVal_2gGuestSsidBroadcast();
  $data->{'2GSsidBroadcast'}->type = 'checkbox';

  $data->{'2GAllowAccessLocal'} = (object) null;
  $data->{'2GAllowAccessLocal'}->value = getCheckboxVal_2gGuestAllowAccessLocal();
  $data->{'2GAllowAccessLocal'}->type = 'checkbox';

  $data->{'2GSsid'} = (object) null;
  $data->{'2GSsid'}->value = getTextVal_2gGuestSsid();
  $data->{'2GSsid'}->type = 'input';

  $data->{'2GSecurity'} = (object) null;
  $data->{'2GSecurity'}->value = getRadioVal_2gGuestSecurity();
  $data->{'2GSecurity'}->type = 'radio';

  $data->{'2GPassword'} = (object) null;
  $data->{'2GPassword'}->value = getTextVal_2gGuestPasswd();
  $data->{'2GPassword'}->type = 'input';

  $data->{'5GEnableGuest'} = (object) null;
  $data->{'5GEnableGuest'}->value = getCheckboxVal_5gEnableGuest();
  $data->{'5GEnableGuest'}->type = 'checkbox';

  $data->{'5GSsidBroadcast'} = (object) null;
  $data->{'5GSsidBroadcast'}->value = getCheckboxVal_5gGuestSsidBroadcast();
  $data->{'5GSsidBroadcast'}->type = 'checkbox';

  $data->{'5GAllowAccessLocal'} = (object) null;
  $data->{'5GAllowAccessLocal'}->value = getCheckboxVal_5gGuestAllowAccessLocal();
  $data->{'5GAllowAccessLocal'}->type = 'checkbox';

  $data->{'5GSsid'} = (object) null;
  $data->{'5GSsid'}->value = getTextVal_5gGuestSsid();
  $data->{'5GSsid'}->type = 'input';

  $data->{'5GSecurity'} = (object) null;
  $data->{'5GSecurity'}->value = getRadioVal_5gGuestSecurity();
  $data->{'5GSecurity'}->type = 'radio';

  $data->{'5GPassword'} = (object) null;
  $data->{'5GPassword'}->value = getTextVal_5gGuestPasswd();
  $data->{'5GPassword'}->type = 'input';
/*
  $data->{'5G1EnableGuest'} = (object) null;
  $data->{'5G1EnableGuest'}->value = getCheckboxVal_5g1EnableGuest();
  $data->{'5G1EnableGuest'}->type = 'checkbox';

  $data->{'5G1SsidBroadcast'} = (object) null;
  $data->{'5G1SsidBroadcast'}->value = getCheckboxVal_5g1GuestSsidBroadcast();
  $data->{'5G1SsidBroadcast'}->type = 'checkbox';

  $data->{'5G1AllowAccessLocal'} = (object) null;
  $data->{'5G1AllowAccessLocal'}->value = getCheckboxVal_5g1GuestAllowAccessLocal();
  $data->{'5G1AllowAccessLocal'}->type = 'checkbox';

  $data->{'5G1Ssid'} = (object) null;
  $data->{'5G1Ssid'}->value = getTextVal_5g1GuestSsid();
  $data->{'5G1Ssid'}->type = 'input';

  $data->{'5G1Security'} = (object) null;
  $data->{'5G1Security'}->value = getRadioVal_5g1GuestSecurity();
  $data->{'5G1Security'}->type = 'radio';

  $data->{'5G1Password'} = (object) null;
  $data->{'5G1Password'}->value = getTextVal_5g1GuestPasswd();
  $data->{'5G1Password'}->type = 'input';
*/  
  $data->{'2GMainSsid'} = (object) null;
  $data->{'2GMainSsid'}->value = getTextVal_2gSsid();
  
  $data->{'5GMainSsid'} = (object) null;
  $data->{'5GMainSsid'}->value = getTextVal_5gSsid();
  
  echo json_encode($data);
?>
