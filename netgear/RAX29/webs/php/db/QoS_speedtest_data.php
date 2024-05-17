<?
  include '../qos.php';
  if (!isset($data))
    $data = new stdClass();

  $data->speedtest_down = (object) null;
  $data->speedtest_down->value = getSpeedtestDown();
  $data->speedtest_down->type = 'spantext';
  
  $data->speedtest_up = (object) null;
  $data->speedtest_up->value = getSpeedtestUp();
  $data->speedtest_up->type = 'spantext';
  
  $data->speedtest_down_hid = (object) null;
  $data->speedtest_down_hid->value = getSpeedtestDown_hidden();
  $data->speedtest_down_hid->type = 'input';
  
  $data->speedtest_up_hid = (object) null;
  $data->speedtest_up_hid->value = getSpeedtestUp_hidden();
  $data->speedtest_up_hid->type = 'input';
  
  echo json_encode($data);
?>
