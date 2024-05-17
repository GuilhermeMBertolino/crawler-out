<?
  include '../ethernet_setting.php';
  include '../LACP.php';
  include '../vlan.php';

  if (!isset($data))
    $data = new stdClass();

  $data->ethset_ethport = (object) null;
  $data->ethset_ethport->value = getCheckboxVal_ethset_ethport_enable();
  $data->ethset_ethport->type = 'checkbox';

  $data->ethset_port1 = (object) null;
  $data->ethset_port1->value = getCheckboxVal_ethset_port1_enable();
  $data->ethset_port1->type = 'checkbox';

  $data->ethset_port2 = (object) null;
  $data->ethset_port2->value = getCheckboxVal_ethset_port2_enable();
  $data->ethset_port2->type = 'checkbox';


  $data->ethset_port3 = (object) null;
  $data->ethset_port3->value = getCheckboxVal_ethset_port3_enable();
  $data->ethset_port3->type = 'checkbox';

  $data->ethset_port4 = (object) null;
  $data->ethset_port4->value = getCheckboxVal_ethset_port4_enable();
  $data->ethset_port4->type = 'checkbox';


  $data->ethset_port5 = (object) null;
  $data->ethset_port5->value = getCheckboxVal_ethset_port5_enable();
  $data->ethset_port5->type = 'checkbox';

  $data->aggregationOption = (object) null;
  $data->aggregationOption->value = getLacpOption();
  $data->aggregationOption->type = 'radio';

  $data->aggregationStatus = (object) null;
  $data->aggregationStatus->type = 'spantext';
  $data->aggregationStatus->mlang = getLacpStatus();

  $data->enableVlan = (object) null;
  $data->enableVlan->value = getCheckboxVal_enableVlan();
  

  echo json_encode($data);
?>
