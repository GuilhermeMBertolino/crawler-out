<?
  include '../qos.php';
  include '../interface.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableQos = (object) null;
  $data->enableQos->value = getQosState();
  $data->enableQos->type = 'checkbox';

  $data->speedMethod = (object) null;
  $data->speedMethod->value = getQoS_SpeedTestMethod();
  $data->speedMethod->type = 'radio';

  $data->manuallyDownSpeed = (object) null;
  $data->manuallyDownSpeed->value = getManuallyDownSpeed();
  $data->manuallyDownSpeed->type = 'input';
  
  $data->manuallyUpSpeed = (object) null;
  $data->manuallyUpSpeed->value = getManuallyUpSpeed();
  $data->manuallyUpSpeed->type = 'input';

  $data->downSpeed = (object) null;
  $data->downSpeed->value = getDownSpeed_hidden();
  $data->downSpeed->type = 'input';
  
  $data->upSpeed = (object) null;
  $data->upSpeed->value = getUpSpeed_hidden();
  $data->upSpeed->type = 'input';
  
  $data->enable2GWmm = (object) null;
  $data->enable2GWmm->value = getWMM_Status(0);
  $data->enable2GWmm->type = 'checkbox';

  $data->enable5GWmm = (object) null;
  $data->enable5GWmm->value = getWMM_Status(1);
  $data->enable5GWmm->type = 'checkbox';

  $data->enable6GWmm = (object) null;
  $data->enable6GWmm->value = getWMM_Status(2);
  $data->enable6GWmm->type = 'checkbox';

  $data->enableAutoUpdate = (object) null;
  $data->enableAutoUpdate->value = getAutoUpdateEnable();
  $data->enableAutoUpdate->type = 'checkbox';

  $data->updateDb_ver = (object) null;
  $data->updateDb_ver->value = getUpdateDbVersion();
  $data->updateDb_ver->type = 'spantext';

  $data->updateDb_date = (object) null;
  $data->updateDb_date->value = getUpdateDbDate();
  $data->updateDb_date->type = 'spantext';

  $data->wan_status = (object) null;
  $data->wan_status->value = getApModeInternetStatus();
  $data->wan_status->type = 'input';
  echo json_encode($data);
?>
