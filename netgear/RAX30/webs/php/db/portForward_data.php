<?
  include '../portForward.php';
  include '../interface.php';
  if (!isset($data))
    $data = new stdClass();

  $data->disablePortTrigger = (object) null;
  $data->disablePortTrigger->value = getCheckboxVal_disablePortTrigger();
  $data->disablePortTrigger->type = 'checkbox';

  $data->enable = (object) null;
  $data->enable->value = getInputVal_enablePortTrigger();
  $data->enable->type = 'input';

  $data->timeout = (object) null;
  $data->timeout->value = getTextVal_portTriggerTimeout();
  $data->timeout->type = 'input';
  
  $data->lanIp = (object) null;
  $data->lanIp->value = getLanInstanceIpAddr();
  $data->lanIp->type = 'nopost';

  
  echo json_encode($data);
?>
