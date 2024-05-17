<?
  include '../LACP.php';
  include '../vlan.php';
  if (!isset($data)) 
  $data = new stdClass();

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
