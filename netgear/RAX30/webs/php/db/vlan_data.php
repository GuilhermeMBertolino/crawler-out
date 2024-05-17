<?
  include '../vlan.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableVlan = (object) null;
  $data->enableVlan->value = getCheckboxVal_enableVlan();
  $data->enableVlan->type = 'checkbox';
  
  $data->groupType = (object) null;
  $data->groupType->value = getRadioVal_groupType();
  $data->groupType->type = 'radio';
  
  $data->port1 = (object) null;
  $data->port1->value = getCheckboxVal_port1();
  $data->port1->type = 'checkbox';
  
  $data->port2 = (object) null;
  $data->port2->value = getCheckboxVal_port2();
  $data->port2->type = 'checkbox';
  
  $data->port3 = (object) null;
  $data->port3->value = getCheckboxVal_port3();
  $data->port3->type = 'checkbox';
  
  $data->port4 = (object) null;
  $data->port4->value = getCheckboxVal_port4();
  $data->port4->type = 'checkbox';
  
  $data->wifi2g = (object) null;
  $data->wifi2g->value = getCheckboxVal_wifi2g();
  $data->wifi2g->type = 'checkbox';
  
  $data->wifi5g = (object) null;
  $data->wifi5g->value = getCheckboxVal_wifi5g();
  $data->wifi5g->type = 'checkbox';

  echo json_encode($data);
?>
